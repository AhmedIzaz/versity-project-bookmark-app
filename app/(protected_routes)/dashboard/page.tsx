"use client";
import { Button, Card, message, Pagination } from "antd";
import useDashboard from "./hooks/useDashboard";
import PageWrapper from "@/app/_components/pageWrapper";
import CommonTitle from "@/app/_components/common.title";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CommonModal from "@/app/_components/common.modal";
import CommonCustomConfirmation from "@/app/_components/common.customConfirmation";
import BookmarkForm from "./components/bookmarkForm";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const { push } = useRouter();
  const {
    filterFields,
    BookmarkDetails,
    BookmarkList,
    hanldeModalChange,
    isLoading,
    toastContext,
    BookmarkForm: bookmarkForm,
    onBookmarkFormSubmit,
    setPagination,
    handleAction,
    modalState,
    onFormCancel,
    pagination,
    handleTableChange,
  } = useDashboard();
  const { modalTitle, isModalOpen, actionType } = modalState ?? {};
  const { total, pageSize, current } = pagination;

  const [copied, setCopied] = useState<string>();

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(textToCopy);
      alert("Copied to clipboard")
      message.success("Copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy!");
    }
  };
  return (
    <>
      <PageWrapper className="overflow-hidden">
        <div className="flex justify-between items-center px-4">
          <CommonTitle text="Bookmark list" size="MEDIUM" />
          <div className="flex  justify-end gap-2">
            {/* render all the filter fields up here, which have we defined in the useRole hook */}
            {filterFields?.map((field) => (
              <>{field}</>
            ))}
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleAction("CREATE")}
            >
              Add Bookmark
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 p-4">
          {BookmarkList?.map((bookmark) => (
            <div
              onClick={() => push(`/bookmark_details/${bookmark.id}`)}
              className="p-4 cursor-pointer flex flex-col bg-white relative shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg"
              style={{ height: 200 }}
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <CopyOutlined
                  // disabled={copied === bookmark.link}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(bookmark.link!);
                  }}
                
                />
                <EditOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("UPDATE", bookmark);
                  }}
                  className="text-gray-600 hover:text-blue-500 cursor-pointer text-lg"
                />
                <DeleteOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("DELETE", bookmark);
                  }}
                  className="text-gray-600 hover:text-red-500 cursor-pointer text-lg"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 ">
                {bookmark.title}
              </h2>

              <p className="flex-1 relative max-w-full max-h-[60%]">
                <p className="absolute text-sm text-gray-600 mt-1 ml-1 text-stroke-white font-extrabold">
                  {bookmark.tags}
                </p>
                {bookmark.thumbnail && (
                  <Image
                    src={bookmark.thumbnail}
                    className="!w-full !h-full !object-cover "
                    alt="a"
                    width={100}
                    height={150}
                  />
                )}
              </p>
              <div className="flex justify-end mt-4">
                {bookmark.mainLink ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(bookmark.mainLink!, "_blank");
                    }}
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Learn More
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          className="justify-center"
          total={total}
          pageSize={pageSize}
          current={current}
          onChange={(newPage, newPageSize) =>
            handleTableChange({ pageSize: newPageSize, current: newPage })
          }
        />
      </PageWrapper>
      <CommonModal
        title={modalTitle}
        open={isModalOpen}
        onCancel={onFormCancel}
        actionType={actionType}
      >
        {["UPDATE", "CREATE"].includes(actionType!) ? (
          <BookmarkForm
            actionType={actionType}
            toastContext={toastContext}
            isLoading={isLoading}
            bookmarkForm={bookmarkForm}
            onBookmarkFormSubmit={onBookmarkFormSubmit}
          />
        ) : actionType === "DELETE" ? (
          <CommonCustomConfirmation
            confirmFn={onBookmarkFormSubmit}
            cancelFn={onFormCancel}
            isLoading={isLoading}
            toastContext={toastContext}
          />
        ) : (
          <></>
        )}
      </CommonModal>
    </>
  );
};

export default Dashboard;
