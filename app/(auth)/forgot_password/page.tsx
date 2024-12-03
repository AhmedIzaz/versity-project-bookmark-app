"use client";
import Image from "next/image";
import { Button, Form } from "antd";
import classNames from "classnames";
import { useState } from "react";
import ForgotPasswordForm from "../_components/forgot.password.form";

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const [is_succeed, setIsSucceed] = useState(false);
  const [is_submit_loading, setIsSubmitLoading] = useState(false);
  const [success_msg, setSuccessMsg] = useState("");

  const handle_on_submit = async ({ email }: { email: string }) => {
    setIsSubmitLoading(true);
    setSuccessMsg("");
    try {
      // const { data } = await forgotPassword({ email }) // Assuming role is 'admin'
      // console.log('response: ', data)
      // setSuccessMsg(data.message || 'An Email has been sent.')
      setIsSucceed(true);
    } catch (error) {
      alert((error as any).message);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const form_label = "Forgot Password";
  const form_label_description =
    "Please enter your email address below to receive a password reset link";
  const submit_button_label = "Submit";

  return (
    <div className={"h-dvh w-full p-[26px]"}>
      <div className={"bg-[#FEFEFE] h-full rounded-2xl p-5 grid grid-cols-2"}>
        <div className={"relative h-full w-full rounded-2xl overflow-hidden"}>
          <Image
            src={"/logos/bookmark_app_logo.png"}
            alt={"did_signage_cover_bg"}
            fill={true}
            objectFit={"cover"}
            priority={true}
          />
        </div>
        <div className={"p-4"}>
          <div className="col-span-full md:col-span-2 flex flex-col justify-center items-center p-6 h-full">
            <div
              className={
                "flex flex-col gap-4 justify-start w-full px-2 lg:px-16"
              }
            >
              <div className={"flex gap-5 justify-start items-center"}>
                <div className={"flex flex-col"}>
                  <h4
                    className={
                      "text-[#292F3F] text-[30px] font-bold uppercase leading-none"
                    }
                  >
                    {form_label}
                  </h4>
                  {form_label_description && (
                    <h4 className={"text-[#4C596B] text-[18px]"}>
                      {form_label_description}
                    </h4>
                  )}
                </div>
              </div>
              <Form
                form={form}
                onFinish={handle_on_submit} // This calls the handle_on_submit function with form values
                layout={"vertical"}
                requiredMark={false}
              >
                <ForgotPasswordForm is_success={is_succeed} />
                {is_succeed && success_msg && (
                  <Form.Item noStyle={true}>
                    <div className={"text-[#29CC39] text-xl"}>
                      {success_msg}
                    </div>
                  </Form.Item>
                )}
                <Form.Item>
                  <Button
                    type={"primary"}
                    size={"large"}
                    htmlType={"submit"}
                    block
                    className={classNames({
                      "!bg-[#4582E9]": !is_succeed && is_submit_loading,
                      "!bg-[#29CC39]": is_succeed,
                    })}
                    loading={is_submit_loading}
                  >
                    {submit_button_label}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
