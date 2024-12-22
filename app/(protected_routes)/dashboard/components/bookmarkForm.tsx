import CommonFileInput from "@/app/_components/common.fileInput";
import CommonForm from "@/app/_components/common.form";
import CommonInput from "@/app/_components/common.input";
import { TBookmarkForm, TToastContext } from "@/app/types/commonType";
import { Button, FormInstance } from "antd";

type TBookmarkFormProps = {
  actionType?: TActionType;
  isLoading: boolean;
  toastContext: TToastContext;
  bookmarkForm: FormInstance<TBookmarkForm>;
  onBookmarkFormSubmit: (values: TBookmarkForm) => Promise<void>;
};
const BookmarkForm = ({
  isLoading,
  toastContext,
  bookmarkForm,
  onBookmarkFormSubmit,
  actionType,
}: TBookmarkFormProps) => {
  return (
    <CommonForm form={bookmarkForm} onFinish={onBookmarkFormSubmit}>
      <CommonInput
        label="Title"
        name="title"
        rules={[{ required: true }, { min: 3, max: 100 }]}
      />
      <CommonInput
        label="Link"
        name="link"
        rules={[{ required: true }, { min: 3, max: 100 }]}
      />
      <CommonFileInput
        label={actionType === "UPDATE" ? "New Thumbnail" : "Thumbnail"}
        name="thumbnail"
        rules={actionType === "UPDATE" ? undefined : [{ required: true }]}
      />
      <CommonInput
        label="Description"
        name="description"
        rules={[{ required: true }, { min: 3, max: 100 }]}
      />

      <CommonInput
        label="Tags"
        name="tags"
        rules={[{ required: true }, { min: 3, max: 100 }]}
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
  );
};

export default BookmarkForm;
