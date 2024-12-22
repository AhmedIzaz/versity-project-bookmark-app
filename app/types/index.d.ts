type TCookieStoreValue = {
  user?: TLoginResponse;
  expires?: string;
};

type TActionType =
  | "GET"
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "NONE"
  | "UPLOAD"
  | "VIEW"
  | "RESET"
  | "ASSIGN"
  | "APPROVE"
  | "REJECT"
  | "REVERT"
  | "DOWNLOAD";
type TServerErrorType = "ValidationError" | any; // add any server error type you need which you formatted from backend end for custom error handing for different kind

type TSize = "LARGE" | "MEDIUM" | "SMALL";

type TChipType = "SUCCESS" | "DANGER" | "DEFAULT";
type TDDLOption = {
  label: string;
  value?: number | string;
  [key: string]: any;
};

type TEmptyTableProps = { emptySubText?: string; emptyText?: string };
type TFormResponseError = {
  status?: "success" | "error" | "failed";
  message?: string;
  errors?: { type?: TServerErrorType; fields?: { [key: string]: string } };
  error?: string;
};
type TChildren = {
  children: React.ReactNode;
};

type TPaginatedDataResponse<T> = {
  data?: T;
  pageInfo?: TPaginationResponseObj;
};

type TPaginationResponseObj = {
  total?: number;
  current?: number;
  pageSize?: number;
};

type TChangePasswordPaylaod = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type TSidebarToggle = {
  isClosed?: boolean;
  updateCloseStatus: (value: boolean) => void;
};

type TMenuItem = {
  id: number;
  name: string;
  route: string;
  icon_src_regular: string;
  icon_src_active: string;
  actions: TMenuActions[];
};

type TAuthType = "GOOGLE" | "FACEBOOK" | "APPLE";
type TActiveStatus = "ACTIVE" | "INACTIVE";

type TUser = {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  profilePicture?: string | null;
};

type TLoginResponse = TUser & {
  accessToken: string;
};

type TBookmark = {
  id: number;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  link?: string | null;
  mainLink?: string | null;
  tags?: string | null;
  createdAt: any;
  createdBy: number;
  favourite: boolean;
  visibility: "PUBLIC" | "PRIVATE";
};

type TBookmarkListFilter = {
  search?: string;
};
