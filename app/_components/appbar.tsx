import Image from "next/image";
import Link from "next/link";
import UserPopoverContainer from "./user.popover.container";
import ProfileContainer from "./profile.container";
import { MoreOutlined } from "@ant-design/icons";
export default function Appbar() {
  return (
    <div
      className={
        "h-[70px] flex items-center justify-between gap-4 px-9 shadow z-10 border-b border-b-slate-300"
      }
    >
      <Link href={"/dashboard"} className={"hover:cursor-pointer"}>
        <Image
          src={"/logos/bookmark_app_logo.png"}
          alt={"logo"}
          width={304}
          height={40}
          className=" object-cover w-full h-full max-w-[40px]"
        />
      </Link>
      <div
        className={
          "flex rounded-md items-center gap-2.5 h-14 border border-gray-500 my-2"
        }
      >
        <div className="rounded-[10px] pl-3 flex items-center justify-between gap-6 w-full h-full">
          <ProfileContainer />
          <UserPopoverContainer>
            <div className={"h-full flex justify-center items-center pr-4"}>
              <MoreOutlined className="cursor-pointer"/>
            </div>
          </UserPopoverContainer>
        </div>
      </div>
    </div>
  );
}
