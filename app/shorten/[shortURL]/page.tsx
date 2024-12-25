"use client";
import useStore from "@/app/_stores";
import { getBookmarkByShortCode } from "@/app/server/user.server";
import { message } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

const ShortURLPage = () => {
  const { user } = useStore((store) => store);
  const para = useParams<{ shortURL: any }>();
  const { shortURL } = para ?? {};
  const { back } = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // get main url and redirect

    const fetcher = async () => {
      if (shortURL) {
        const response = await getBookmarkByShortCode(shortURL as string);
        if (
          response?.visibility === "PUBLIC" ||
          (response?.visibility === "PRIVATE" &&
            response.createdBy === user?.id)
        ) {
          if (response) {
            window.open(response.mainLink!, "_blank");
            buttonRef?.current?.click();
          } else {
            // handle case when no bookmark found
          }
        } else {
          message.warning("You are not authorized to access this bookmark.");
          back();
        }
      }
    };
    fetcher();
  }, [shortURL]);

  return (
    <div>
      <button ref={buttonRef} onClick={back}></button>
      {shortURL}
    </div>
  );
};

export default ShortURLPage;
