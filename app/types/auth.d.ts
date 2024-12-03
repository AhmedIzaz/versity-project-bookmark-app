type TLoginResponse = TUser & {
  accessToken: string;
};

type TResetPasswordPayload = {
  userId: number;
  token: string;
  password: string;
};

type TForgotPasswordPayload = {
  email: string;
};

type TLoginForm = {
  email: string;
  password: string;
};
