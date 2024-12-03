"use client";
import CommonForm from "@/app/_components/common.form";
import CommonInput from "@/app/_components/common.input";
import useToast from "@/app/_hooks/useToast";
import { userSignup } from "@/app/server/user.server";
import { Button, Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const { push } = useRouter();
  const [signupForm] = Form.useForm<TUser>();
  const { openToastMessage, toastContext } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSingupSubmit = async (values: TUser) => {
    setIsLoading(true);
    try {
      const { message } = await userSignup(values);
      openToastMessage({ type: "success", message });

      push("/login");
    } catch (errors: any) {
      openToastMessage({ type: "error", message: errors?.message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={"h-dvh w-full p-[26px]"}>
      <div
        className={
          "bg-[#FEFEFE] h-full w-full rounded-2xl p-5 grid grid-cols-2"
        }
      >
        <div className={"relative h-full w-full rounded-2xl overflow-hidden"}>
          <Image
            src={"/logos/bookmark_app_logo.png"}
            alt={"did_signage_cover_bg"}
            fill={true}
            objectFit={"cover"}
            priority={true}
          />
        </div>
        <div
          className={
            "p-4 px-20 flex flex-col justify-center items-center w-full"
          }
        >
          <div className={"flex gap-5 justify-start items-center w-full"}>
            <div className={"flex flex-col"}>
              <h4
                className={
                  "text-[#292F3F] text-[30px] font-bold uppercase leading-none"
                }
              >
                {"Signup"}
              </h4>
              <h4 className={"text-[#4C596B] text-[18px]"}>
                {"Welcome to Bookmark APP Platform"}
              </h4>
            </div>
          </div>
          <div className="w-full">
            <CommonForm form={signupForm} onFinish={onSingupSubmit}>
              <CommonInput
                label="Name"
                placeholder={"Enter Your Name"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "This field is required.",
                  },
                  {
                    min: 3,
                    max: 100,
                    message: "Name must be between 3 and 100 characters.",
                  },
                ]}
              />
              <CommonInput
                label="Email"
                type="email"
                placeholder={"Enter Your Email"}
                name={"email"}
                rules={[
                  {
                    required: true,

                    message: "This field is required.",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                ]}
              />
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
                          new Error(
                            "The two passwords you entered do not match!"
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              />

              <div className={"flex justify-end items-center pb-3"}>
                <Link href={"/login"}>{"Already have an account?"}</Link>
              </div>
              {toastContext}
              <Button
                type={"primary"}
                size={"large"}
                htmlType={"submit"}
                block
                className={"bg-[#4582E9]"}
                loading={isLoading}
              >
                {"Signup"}
              </Button>
            </CommonForm>
          </div>
        </div>
      </div>
    </div>
  );
}
