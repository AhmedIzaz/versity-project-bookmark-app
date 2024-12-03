import { Form, Input } from "antd";
type TForgotPasswordFormProps = {
  is_success: boolean;
};

export default function ForgotPasswordForm({
  is_success,
}: TForgotPasswordFormProps) {
  return (
    <Form.Item>
      <Form.Item
        label={"Enter your email address"}
        name={"email"}
        hasFeedback={true}
        validateStatus={is_success ? "success" : ""}
        rules={[
          {
            required: true,
            message: "Email address is required.",
          },
          {
            type: "email",
            message: "Please enter your email address.",
          },
        ]}
      >
        <Input
          id={"forgot-password-email"}
          autoComplete={"off"}
          size={"large"}
        />
      </Form.Item>
    </Form.Item>
  );
}
