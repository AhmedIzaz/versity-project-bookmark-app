"use client";
import Image from "next/image";
import ProfileContainer from "./profile.container";
import Link from "next/link";
import { memo, useState } from "react";
import {
  FormOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useModal from "../_hooks/useModal";
import CommonModal from "./common.modal";
import CommonForm from "./common.form";
import { Button, Form } from "antd";
import CommonInput from "./common.input";
import useToast from "../_hooks/useToast";
import useStore from "../_stores";
import { changePassword } from "../server/user.server";

interface UserPopoverListProps {
  logout?: () => void;
  onPopoverItemClick?: () => void;
}

const UserPopoverList = ({
  logout,
  onPopoverItemClick,
}: UserPopoverListProps) => {
  const { user } = useStore((store) => store);
  const { handleModal, hanldeModalChange, modalState } = useModal<any>({});
  const { actionType, modalData, modalTitle, isModalOpen } = { ...modalState };
  const [isLoading, setLoading] = useState(false);
  const { openToastMessage, toastContext } = useToast();
  const [passwordForm] = Form.useForm<{
    password: string;
    confirmPassword: string;
  }>();
  return (
    <>
      <div
        className={"flex flex-col divide-y divide-[#e6e6e6] px-2 font-roboto"}
      >
        <div className={"text-[#262834] text-sm py-4"}>
          <ProfileContainer type={"popover"} />
        </div>
        {popOverItems?.map((popOverItem: any) => (
          <div
            className={"text-[#262834] text-sm py-4"}
            onClick={() => {
              onPopoverItemClick?.();
              handleModal({
                isModalOpen: true,
                actionType: "CREATE",

                modalTitle: "Change Password",
              });
            }}
          >
            <div
              className={"flex gap-[14px] items-center hover:cursor-pointer"}
            >
              {popOverItem.iconSrc}
              {popOverItem.label}
            </div>
          </div>
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
      <CommonModal
        title={modalTitle}
        open={isModalOpen}
        onCancel={() => {
          handleModal({ isModalOpen: false });
          passwordForm.resetFields();
        }}
        actionType={actionType}
      >
        <CommonForm
          form={passwordForm}
          onFinish={async ({ password }: { password: string }) => {
            await changePassword(user?.email!, password!);
            passwordForm.resetFields();
            handleModal({ isModalOpen: false });
            openToastMessage({ type: "success", message: "Password changed" });
          }}
        >
          <CommonInput
            type="password"
            label="Password"
            placeholder={"Enter Your Password"}
            name={"password"}
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              }
            ]}
          />
          <CommonInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              ({ getFieldValue }) => ({
                required: true,
                whitespace: true,
                message: "Please confirm your password",
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue("password") != value) {
                    return Promise.reject(
                      new Error("The two passwords you entered do not match!")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />

          {toastContext}
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            className="w-full mt-4"
            htmlType="submit"
          >
            Save
          </Button>
        </CommonForm>
      </CommonModal>
    </>
  );
};

export default memo(UserPopoverList);
const popOverItems = [
  {
    route: "/change_password",
    iconSrc: <FormOutlined />,

    label: "Change Password",
  },
];
