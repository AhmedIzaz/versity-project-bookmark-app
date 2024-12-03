import Image from "next/image";
import ProfileContainer from "./profile.container";
import Link from "next/link";
import { memo } from "react";
import {
  FormOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface UserPopoverListProps {
  logout?: () => void;
  onPopoverItemClick?: () => void;
}

const UserPopoverList = ({
  logout,
  onPopoverItemClick,
}: UserPopoverListProps) => {
  return (
    <div className={"flex flex-col divide-y divide-[#e6e6e6] px-2 font-roboto"}>
      <div className={"text-[#262834] text-sm py-4"}>
        <ProfileContainer type={"popover"} />
      </div>
      {popOverItems?.map((popOverItem) => (
        <Link href={popOverItem.route} onClick={onPopoverItemClick}>
          <div className={"text-[#262834] text-sm py-4"}>
            <div
              className={"flex gap-[14px] items-center hover:cursor-pointer"}
            >
              {popOverItem.iconSrc}
              {popOverItem.label}
            </div>
          </div>
        </Link>
      ))}

      <div className={"text-[#262834] text-sm py-4"}>
        <div
          className={"flex gap-4 items-center hover:cursor-pointer"}
          onClick={logout}
        >
          <LogoutOutlined />
          <span>{"Logout"}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(UserPopoverList);
const popOverItems = [
  {
    route: "/settings",
    iconSrc: <SettingOutlined />,
    label: "Profile Settings",
  },
  {
    route: "/change_password",
    iconSrc: <FormOutlined />,

    label: "Change Password",
  },
];
