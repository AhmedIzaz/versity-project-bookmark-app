"use server";
import shortid from "shortid";
import CacheService from "../config/cacheService";
import CacheKeys from "../config/cacheKey";
import globalPrisma from "../config/prismaConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { exec } from "child_process";
import { TablePaginationConfig } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { TBookmarkForm } from "../types/commonType";
import { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import Mime from "mime";
const { USER_BY_EMAIL, BOOKMARK_BY_ID } = CacheKeys;
const JWT_SECRET = process.env.JWT_SECRET || "thisisasecretkeygeneration";
import nodemailer from "nodemailer";
enum OrderEnum {
  descend = "desc",
  ascend = "asc",
}

const getCommonLandingFilter = ({
  pageSize,
  current,
  orderBy,
  orderField,
}: {
  pageSize?: number;
  current?: number;
  orderBy?: string;
  orderField?: string;
}) => {
  return {
    skip: pageSize && current ? pageSize * (current - 1) : undefined,
    take: pageSize,
    orderBy: {
      ...(orderField ? { [orderField]: orderBy } : {}),
    },
  };
};

export const getUserByEmail = async (email: string) => {
  try {
    // const cachedUser = await CacheService.get(USER_BY_EMAIL + email, true);
    // console.log({ cachedUser, email });
    // if (cachedUser) return cachedUser as TUser;

    const userFromDB = await globalPrisma.user.findUnique({ where: { email } });
    console.log({ userFromDB });
    if (!userFromDB) return null;

    // await CacheService.set(USER_BY_EMAIL + email, userFromDB, undefined, true); // cache for 1 hour
    return userFromDB;
  } catch (err) {
    return null;
  }
};

export const userLogin = async (payload: TLoginForm) => {
  const { email: givenEmail, password: givenPassword } = payload;
  console.log({ givenEmail, givenPassword });
  try {
    const user = await getUserByEmail(givenEmail);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (!(await bcrypt.compare(givenPassword, user?.password!))) {
      throw new Error("Invalid email or password");
    }

    // generate response data set
    const { password: _, ...userData } = user ?? {};
    const { email, name } = userData ?? {};
    // generate JWT token
    // The payload (data) to be encoded in the token
    const tokenPayload = { email, name };
    // Options for the token (e.g., expiration time)
    const options = {
      expiresIn: "1h", // Token expires in 1 hour
    };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, options);

    return { ...userData, accessToken };
  } catch (error: any) {
    console.log({ error });
    throw new Error(error?.message ?? "Failed to login user");
  }
};

export const userSignup = async (payload: TUser) => {
  const { name, email, password, profilePicture } = payload ?? {};
  try {
    // check in the mean time a user with that email already exists in system
    if (await getUserByEmail(email)) {
      throw new Error("User with this email already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password!, 10);
    // now everything is clear to go, create a new user with the email and pasword

    const newUser = await globalPrisma.user.create({
      data: { name, email, password: hashedPassword, profilePicture },
    });

    // cache the user data
    // await CacheService.set(USER_BY_EMAIL + email, newUser, undefined, true);

    return { message: "User Signup successfully" };
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during user signup confirmation");
  }
};

export const getBookmarkList = async (
  userId: number,
  filters: TBookmarkListFilter,
  pagination?: TablePaginationConfig,
  sorter?: SorterResult<any>
) => {
  try {
    const { pageSize, current } = pagination ?? {};
    const { field, order } = sorter ?? {};
    const { search } = filters ?? {};

    const { skip, take, orderBy } = getCommonLandingFilter({
      pageSize,
      current,
      orderBy: OrderEnum[order!],
      orderField: field as string,
    });

    const args = {
      skip,
      take,
      orderBy,
    };
    const [data, total] = await Promise.all([
      globalPrisma.bookmark.findMany({
        ...args,
        where: {
          OR: [
            { visibility: "PUBLIC" },
            {
              AND: [
                { visibility: "PRIVATE" },
                { createdBy: userId }, // Show private bookmarks created by the logged-in user
              ],
            },
          ],
          AND: search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { tags: { contains: search, mode: "insensitive" } },
                ],
              }
            : undefined,
        },
      }),
      globalPrisma.bookmark.count({
        where: {
          OR: [
            { visibility: "PUBLIC" },
            {
              AND: [{ visibility: "PRIVATE" }, { createdBy: userId }],
            },
          ],
          AND: search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { tags: { contains: search, mode: "insensitive" } },
                ],
              }
            : undefined,
        },
      }),
    ]);

    return { data, total };
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during fetching bookmarks");
  }
};

export const createUpdateBookmark = async (
  userId: number,
  actionType: TActionType,
  payload: TBookmarkForm,
  id?: number
) => {
  try {
    let message = `Bookmark ${
      actionType === "CREATE" ? "created" : "updated"
    } successfully`;

    let { title, thumbnail, link, tags, visibility, description } =
      payload ?? {};

    thumbnail = (thumbnail as string) ?? undefined;

    const shortCode = shortid.generate();

    const isLocalFilePath = /^[a-zA-Z]:\\|^\//.test(link!);

    let shortURL = `http://localhost:3000/shorten/${shortCode}`;
    let modifiedLink;
    if (isLocalFilePath) {
      modifiedLink = `file:///${link?.replace(/\\/g, "/")}`;
    } else {
      modifiedLink = link;
    }

    let theBookmark = undefined;

    if (actionType === "UPDATE") {
      theBookmark = await globalPrisma.bookmark.update({
        where: { id },
        data: {
          title,
          thumbnail,
          link: shortURL,
          mainLink: modifiedLink,
          shortCode,
          tags: tags!,
          visibility: visibility ? "PUBLIC" : "PRIVATE",
          description,
        },
      });
      // await CacheService.del(BOOKMARK_BY_ID + theBookmark.id);
    } else {
      theBookmark = await globalPrisma.bookmark.create({
        data: {
          title: title!,
          thumbnail,
          link: shortURL,
          mainLink: modifiedLink!,
          tags: tags!,
          shortCode,
          visibility: visibility ? "PUBLIC" : "PRIVATE",
          description,
          createdBy: userId,
        },
      });
    }

    // await CacheService.set(
    //   BOOKMARK_BY_ID + theBookmark.id,
    //   theBookmark,
    //   undefined,
    //   true
    // ); // cache for 1 hour

    return message;
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during bookmarks action");
  }
};

export const updateBookmarkVisibility = async (
  id: number,
  checked: boolean
) => {
  try {
    await globalPrisma.bookmark.update({
      where: { id },
      data: { visibility: checked ? "PUBLIC" : "PRIVATE" },
    });
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Error during updating bookmark visibility"
    );
  }
};

export const getBookmarkDetails = async (id: number) => {
  try {
    const bookmark = await globalPrisma.bookmark.findUnique({ where: { id } });
    return bookmark;
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during deleting bookmarks");
  }
};

export const getBookmarkByShortCode = async (shortCode: string) => {
  try {
    const bookmark = await globalPrisma.bookmark.findFirst({
      where: { shortCode },
    });
    return bookmark;
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during deleting bookmarks");
  }
};

export const bookmarkDelete = async (id: number) => {
  try {
    await globalPrisma.bookmark.delete({ where: { id } });
    // await CacheService.del(BOOKMARK_BY_ID + id);
    return "Bookmark deleted successfully";
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during deleting bookmarks");
  }
};

export const uploadAndGetFileURL = async (obj: FormData, field: string) => {
  try {
    let file = obj.get(field) as File;
    console.log({ file });
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${Mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
      console.log({ fileUrl });
      return fileUrl;
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
    }
  } catch (error) {
    console.error("Error getting form data:", error);
  }
};

export const openLocal = async (filePath: string) => {
  exec(`start "" "${filePath}"`, (error) => {
    if (error) {
      console.error("Error opening file:", error);
    }
  });
};

export const sendOTP = async (email: string) => {
  try {
    // Generate OTP and email payload
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    let emailTransporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ee89808678a152",
        pass: "b79c41cc779da9",
      },
    });
    await emailTransporter.sendMail({
      from: '"Bookmark" <no-reply@yourdomain.com>',
      to: email,
      subject: "Password forgot OTP",
      html: `
  <p>Your email verification OTP: <strong>${OTP}</strong></p>
  <p>This OTP is valid for 1 hour.</p>
`,
    });
    const hashedPassword = await bcrypt.hash(OTP!, 10);
    await globalPrisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  } catch (ero: any) {
    console.log(ero.message);
  }
};

export const changePassword = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password!, 10);
    await globalPrisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
