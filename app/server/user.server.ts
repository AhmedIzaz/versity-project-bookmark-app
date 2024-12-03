"use server";

import CacheService from "../config/cacheService";
import CacheKeys from "../config/cacheKey";
import globalPrisma from "../config/prismaConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { USER_BY_EMAIL } = CacheKeys;
const JWT_SECRET = process.env.JWT_SECRET || "thisisasecretkeygeneration";

export const getUserByEmail = async (email: string) => {
  try {
    const cachedUser = await CacheService.get(USER_BY_EMAIL + email, true);
    console.log({ cachedUser, email });
    if (cachedUser) return cachedUser as TUser;

    const userFromDB = await globalPrisma.user.findUnique({ where: { email } });
    console.log({ userFromDB });
    if (!userFromDB) return null;

    await CacheService.set(USER_BY_EMAIL + email, userFromDB, undefined, true); // cache for 1 hour
    return userFromDB;
  } catch (err) {
    return null
  }
};

export const userLogin = async (payload: TLoginForm) => {
  const { email: givenEmail, password: givenPassword } = payload;
  console.log({ givenEmail, givenPassword });
  try {
    const user = await getUserByEmail(givenEmail);
    if (!user){
      throw new Error("Invalid email or password");
    }
    if(!(await bcrypt.compare(givenPassword, user?.password!))){
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
    await CacheService.set(USER_BY_EMAIL + email, newUser, undefined, true);

    return { message: "User Signup successfully" };
  } catch (error: any) {
    throw new Error(error?.message ?? "Error during user signup confirmation");
  }
};
