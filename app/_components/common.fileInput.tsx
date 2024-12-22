import { Button, Form, Upload, UploadProps } from "antd";
import { FormItemProps, Rule } from "antd/es/form";
import classNames from "classnames";
import { uploadAndGetFileURL } from "../server/user.server";

export type CommonFileInputProps = UploadProps & {
  containerClass?: string;
  name?: string;
  rules?: Rule[];
  label?: string;
  formItemProps?: FormItemProps;
  isTextBlack?: boolean;
  comment?: string;
};

// eslint-disable-next-line react/display-name
const CommonFileInput = ({
  label,
  containerClass,
  name,
  rules,
  formItemProps,
  className,
  isTextBlack = true,
  comment,
  ...rest
}: CommonFileInputProps) => {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const url = await uploadAndGetFileURL(formData, "image");
    console.log({ url });
    if (url) {
      // setImageUrl(url)
    }
  };
  //   const uploadProps: UploadProps =
  return (
    // @ts-ignore
    <Form.Item noStyle shouldUpdate={true} rules={rules}>
      {({ getFieldError, isFieldTouched, setFieldValue }) => {
        const hasError = getFieldError(name) && isFieldTouched(name);
        return (
          <>
            <label>{label}</label>

            <Form.Item rules={rules} name={name}>
              <Upload
                className={classNames(
                  "border border-gray-300 flex items-center gap-2 !py-3 !px-6  !rounded-lg ",
                  className
                )}
                beforeUpload={(file) => {
                  // console.log({file})
                  setFieldValue(name, file);
                //   handleUpload(file);
                  return false; // Prevent the default upload behavior
                }}
                //   {...uploadProps}
              >
                <Button size="small">Choose File</Button>
              </Upload>
            </Form.Item>

            {comment ? (
              <p
                className={`text-[#7b7d7f] m-0 ${
                  hasError ? "mt-[-16px]" : "mt-[-16px]"
                }`}
              >
                {comment}
              </p>
            ) : (
              ""
            )}
          </>
        );
      }}
    </Form.Item>
  );
};

export default CommonFileInput;
