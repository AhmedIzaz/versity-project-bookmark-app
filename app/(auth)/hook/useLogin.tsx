import { Form } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "@/app/_stores";
import useToast from "@/app/_hooks/useToast";
import useAuth from "@/app/_hooks/useAuth";
import { saveLoginSession } from "@/app/utils/cookies";
import { userLogin } from "@/app/server/user.server";

const useLogin = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginForm] = Form.useForm<TLoginForm>();
  const { openToastMessage, toastContext } = useToast();
  const { setAuthInformation } = useStore((state) => state);
  const { clearSessionWithInfo } = useAuth();
  // login submit
  const onLoginSubmit = async (values: TLoginForm) => {
    setIsLoading(true);
    try {
      const userData = await userLogin(values);
      setAuthInformation({
        authLoading: true,
        isAuthenticated: true,
        user: userData,
      });
      saveLoginSession(userData);
      push("/");
    } catch (errors: any) {
      const message = errors?.message 
      openToastMessage({ type: "error", message });
      clearSessionWithInfo();
    } finally {
      setIsLoading(false);
    }
  };
  return { push, isLoading, loginForm, onLoginSubmit, toastContext };
};

export default useLogin;
