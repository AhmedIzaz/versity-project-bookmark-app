"use client";

// import components
import { Button, Form, Input } from "antd";
import Link from "next/link";
import useLogin from "../hook/useLogin";

const LoginForm = () => {
  const { loginForm, onLoginSubmit, isLoading, toastContext } = useLogin();

  return (
    <div className="col-span-full md:col-span-2 flex flex-col justify-center items-center p-6 h-full gap-2">
      <div className={"flex flex-col gap-6 justify-start w-full px-2 lg:px-16"}>
        <div className={"flex gap-5 justify-start items-center"}>
          <div className={"flex flex-col"}>
            <h4
              className={
                "text-[#292F3F] text-[30px] font-bold uppercase leading-none"
              }
            >
              {"LOG IN"}
            </h4>
            <h4 className={"text-[#4C596B] text-[18px]"}>
            {"Welcome to Bookmark APP Platform"}
            </h4>
          </div>
        </div>
        <Form
          form={loginForm}
          onFinish={onLoginSubmit}
          layout={"vertical"}
          requiredMark={false}
        >
          <Form.Item
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
          >
            <Input
              id={"login-email"}
              autoComplete={"off"}
              size={"large"}
              placeholder={"Enter Your Email"}
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
          >
            <Input.Password
              size={"large"}
              placeholder={"Enter Your Password"}
              autoComplete={"off"}
              id={"login-password"}
            />
          </Form.Item>
          <div className={"flex justify-end items-center pb-3"}>
            <Link href={"/forgot_password"}>{"Forgot Password?"}</Link>
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
            {"Login"}
          </Button>
        </Form>
        <Link href="/signup">
          <Button type="default" size={"large"} block>
            {"Signup"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
