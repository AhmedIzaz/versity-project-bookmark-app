import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Switch, TableColumnsType, TablePaginationConfig } from "antd";
import useToast from "@/app/_hooks/useToast";
import useModal from "@/app/_hooks/useModal";
import useTableChange from "@/app/_hooks/useTableChange";
import { TBookmarkForm, TUploadedFile } from "@/app/types/commonType";

import CommonInput from "@/app/_components/common.input";

import { SorterResult } from "antd/es/table/interface";
import {
  bookmarkDelete,
  createUpdateBookmark,
  getBookmarkList,
  uploadAndGetFileURL,
} from "@/app/server/user.server";
import useStore from "@/app/_stores";
//  as much as possible use useCallback and useMemo and memo() for optimize large component or methods reference saving to memory at once

const useDashboard = () => {
  const { user } = useStore((state) => state);
  const [isLoading, setLoading] = useState(false);
  const { openToastMessage, toastContext } = useToast();
  const { handleModal, hanldeModalChange, modalState } = useModal<TBookmark>(
    {}
  );
  const { actionType, modalData } = { ...modalState };
  const {
    initialPagination,
    pagination,
    sortInfo,
    setPagination,
    handleTableChange,
    resetPagination,
  } = useTableChange({
    onTableChange: (newPagination, _, newSorter) => {
      onGetBookmarkList(newPagination, newSorter);
    },
  });

  const [BookmarkForm] = Form.useForm<TBookmarkForm>();
  const [BookmarkDetails, setBookmarkDetails] = useState<TBookmark | undefined>(
    undefined
  );
  const [BookmarkList, setBookmarkList] = useState<TBookmark[]>();
  const [filters, setFilters] = useState<TBookmarkListFilter>({
    search: "",
  });

  // Fetch helper, for 2 api call of same structure for this hook
  const onGetBookmarkList = useCallback(
    async (
      newPagination?: TablePaginationConfig,
      newSorter?: SorterResult<any>
    ) => {
      setLoading(true);
      try {
        const { data, total } = await getBookmarkList(
          filters,
          newPagination ?? pagination,
          newSorter ?? sortInfo
        );
        setBookmarkList(data);
        setPagination((prev) => ({ ...prev, total }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination, sortInfo]
  );
  // Fetch Bookmark list

  // Fetch Bookmark list,
  useEffect(() => {
    onGetBookmarkList();
  }, [filters]);

  // on edit permission, reset form and form's permission's check value of every module and their permission action
  const onEdit = useCallback((data: TBookmark) => {
    const { title, description, link, tags } = data;
    BookmarkForm.setFieldsValue({ title, description, link, tags });
  }, []);

  // during create, update and delete button click
  const handleAction = useCallback(
    (actionType: TActionType, modalData?: TBookmark) => {
      handleModal({
        isModalOpen: true,
        actionType,
        modalData,
        modalTitle: modalTitle[actionType],
      });
      if (actionType === "UPDATE") onEdit(modalData!);
      if (actionType === "VIEW") {
      }
    },
    [onEdit]
  );

  // during reseting form's value and other data list
  const onFormCancel = useCallback(() => {
    BookmarkForm.resetFields();
    handleModal({ isModalOpen: false });
    setBookmarkDetails(undefined);
  }, []);

  // after create update delete, or any kind of api call success, this method is helpful for running some remaining procedures
  const onSuccess = useCallback(
    (message?: string) => {
      openToastMessage({ type: "success", message });
      onFormCancel();
      if (actionType === "DELETE" && BookmarkList?.length === 1) {
        resetPagination();
        onGetBookmarkList(initialPagination);
      } else {
        onGetBookmarkList();
      }
    },
    [openToastMessage, onFormCancel, onGetBookmarkList]
  );

  // create update delete  Bookmark
  const onBookmarkFormSubmit = useCallback(
    async (values?: TBookmarkForm) => {
      setLoading(true);
      try {
        let message = "";
        if (actionType === "DELETE") {
          message = await bookmarkDelete(modalData?.id!);
        } else {
          const { title, thumbnail, description, link, tags, visibility } =
            values ?? {};
          let thumbnailUrl = undefined;
          if (thumbnail) {
            const formData = new FormData();
            const file = (thumbnail as TUploadedFile).file;
            formData.append("thumbnail", file);
            thumbnailUrl = await uploadAndGetFileURL(formData, "thumbnail");
            
          }
          const payload: TBookmarkForm = {
            title,
            thumbnail: thumbnailUrl,
            description,

            link,
            tags,

            visibility,
          };

          message = await createUpdateBookmark(
            user?.id!,
            actionType!,
            payload,
            modalData?.id
          );
        }

        onSuccess(message);
      } catch (err: any) {
        console.log(err.message); // this will popup every error message also will setup validation errors of form
      } finally {
        setLoading(false);
      }
    },
    [actionType, modalData, openToastMessage]
  );

  // Bookmark list filter value change function,
  // just send field name and updated value
  const onFilterValueChange = (
    field: keyof TBookmarkListFilter,
    value: TBookmarkListFilter[keyof TBookmarkListFilter]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    resetPagination();
  };

  // the filter components for Bookmark landing pages
  const filterFields = useMemo(
    () => [
      <CommonInput
        allowClear // this props will enable clear (x) icon for clear the search text in the field
        placeholder="Search (Title/Tags)"
        value={filters.search}
        onChange={(e) => onFilterValueChange("search", e.target.value)}
      />,
    ],
    [filters]
  );

  return {
    filterFields,
    BookmarkDetails,
    BookmarkList,
    hanldeModalChange,
    isLoading,
    toastContext,
    BookmarkForm,
    onBookmarkFormSubmit,
    setPagination,
    handleAction,
    modalState,
    onFormCancel,
    pagination,
    handleTableChange,
  };
};

export default useDashboard;

const modalTitle = {
  VIEW: "Bookmark Details",
  CREATE: "Create Bookmark",
  UPDATE: "Update Bookmark",
  DELETE: "Delete Bookmark",
} as Partial<Record<TActionType, string>>;
