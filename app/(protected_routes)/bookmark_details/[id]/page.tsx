"use client";

import CommonTitle from "@/app/_components/common.title";
import PageWrapper from "@/app/_components/pageWrapper";
import useStore from "@/app/_stores";
import {
  getBookmarkDetails,
  updateBookmarkVisibility,
} from "@/app/server/user.server";
import { BackwardOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, message, Switch } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookmarkDetails = () => {
  const { user } = useStore((store) => store);
  const param = useParams<{ id: any }>();
  const { id } = param ?? {};
  const { back, push } = useRouter();
  const [bookmark, setBookmark] = useState<TBookmark>();

  const fetch = async () => {
    if (id) {
      const response = await getBookmarkDetails(+id);
      setBookmark(response!);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      message.success("Copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy!");
    }
  };
  return (
    <>
      <PageWrapper>
        <div className="flex items-center px-4">
          {" "}
          <BackwardOutlined className="text-lg cursor-pointer" onClick={back} />
          <CommonTitle text="Bookmark Details" size="MEDIUM" />
        </div>
        {bookmark ? (
          <div className="max-w-full px-10 flex flex-col gap-4">
            <CommonTitle
              text={bookmark?.title}
              size="LARGE"
              className="text-center px-10"
            />
            {bookmark.thumbnail ? (
              <div className="flex justify-center items-center ">
                <Image
                  src={bookmark.thumbnail!}
                  alt="as"
                  className="w-[50%] rounded-md shadow-lg"
                  width={500}
                  height={500}
                />
              </div>
            ) : (
              <></>
            )}
            {bookmark.link ? (
              <div className="flex flex-col justify-between items-center ">
                <CommonTitle text="URL" size="SMALL" className="!p-0" />
                <p onClick={() => push(bookmark.link!)}>{bookmark.link}</p>
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(bookmark.link!)}
                  disabled={copied} // Disable button after copying
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className="flex flex-col justify-between items-center ">
              <CommonTitle text="Tags" size="SMALL" className="!p-0" />
              <p>{bookmark.tags}</p>
            </div>
            <div className="flex flex-col justify-between items-center pb-10">
              <CommonTitle text="Description" size="SMALL" className="!p-0" />
              <p>{bookmark.description}</p>
            </div>
            {bookmark.createdBy === user?.id && (
              <div className="flex flex-col justify-between items-center pb-10">
                <CommonTitle text="Visibility" size="SMALL" className="!p-0" />
                <p>
                  {bookmark.visibility === "PRIVATE" ? "Private" : "Public"}
                </p>
                <Switch
                  checked={bookmark.visibility !== "PRIVATE"}
                  onChange={(checked) => {
                    const exe = async () => {
                      await updateBookmarkVisibility(bookmark.id, checked);
                      await fetch();
                    };
                    exe();
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </PageWrapper>
    </>
  );
};

export default BookmarkDetails;
