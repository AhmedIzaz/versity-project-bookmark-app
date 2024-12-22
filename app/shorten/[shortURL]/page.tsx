"use client";
import { getBookmarkByShortCode } from "@/app/server/user.server";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

const ShortURLPage = () => {
  const { shortURL } = useParams();
  const { back } = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // get main url and redirect

    const fetcher = async () => {
      if (shortURL) {
        const response = await getBookmarkByShortCode(shortURL as string);
        if (response) {
          window.open(response.mainLink!, "_blank");
          buttonRef?.current?.click();
        } else {
          // handle case when no bookmark found
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
