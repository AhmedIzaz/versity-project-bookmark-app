"use client";
import classNames from "classnames";
import Link from "next/link";
import useStore from "../_stores";

type TProfileContainerProps = {
  type?: "appbar" | "popover";
};

export default function ProfileContainer({
  type = "appbar",
}: TProfileContainerProps) {
  const _user = useStore((state) => state.user);
  return (
    <div className={"flex items-center gap-3"}>
      <div
        className={classNames({
          "rounded-full bg-gray-600 flex items-center justify-center text-white":
            true,
          "h-10 w-10": type === "appbar",
          "h-12 w-12": type === "popover",
        })}
      >
        {_user?.name?.toUpperCase().charAt(0)}
      </div>
      <div className={"flex flex-col justify-start"}>
        <div
          className={classNames({
            "text-[#354252] font-semibold": true,
            "text-sm": type === "appbar",
            "text-base": type === "popover",
          })}
        >
          {_user?.name}
        </div>
        <div
          className={classNames({
            "text-[#6C7683]": true,
            "text-xs": type === "appbar",
            "text-sm": type === "popover",
          })}
        >
          {_user?.email}
        </div>
      </div>
    </div>
  );
}
