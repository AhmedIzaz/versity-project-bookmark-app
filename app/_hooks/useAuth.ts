import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getSession } from "../utils/cookies";
import { unAuthenticatedRoutes } from "../utils/constant.values";
import useStore from "../_stores";
const useAuth = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [isAuthLoading, setAuthLoading] = useState(true);

  const {
    setAuthInformation,
    authLoading,
    setAuthLoading: _setAuthLoading,
    user,
  } = useStore((state) => state);

  const atAuthRoute = useMemo(
    () => unAuthenticatedRoutes.includes(pathname),
    [pathname]
  );

  //
  useEffect(() => {
    const checkAuthorization = async () => {
      // check user is authenticated or not
      const userSessionInfo = (await getSession()) as TCookieStoreValue;
      await authorizationHandler(userSessionInfo);
    };
    checkAuthorization();
    // eslint-disable-next-line
  }, [pathname]);

  const authorizationHandler = useCallback(
    async (userSessionInfo: TCookieStoreValue) => {
      const { user: sessionUser } = userSessionInfo ?? {};
      const { accessToken } = sessionUser ?? {};
      const isAuthorized = Boolean(accessToken);
      if (!isAuthorized) {
        clearSessionWithInfo();
        // when the user is not authenticated but want to route to authenticated route, just redirect them back to login page
        if (!atAuthRoute) push("/login");
      } else {
        // when user authenticated but the user information is not in local context, just set them up
        if (!user)
          setAuthInformation({ user: sessionUser, isAuthenticated: true });
        // when user authenticated but try to go to authentication related pages, just redirect them to dashboard
        if (atAuthRoute) push("/");
      }
      // after all stop all loaders
      finilizeLoading();
    },
    [user, atAuthRoute, pathname]
  );

  // use this method whenever you want to logout
  const logout = useCallback(() => {
    push("/login");
    clearSessionWithInfo();
  }, []);

  // clear the project related all session and reset the local context
  const clearSessionWithInfo = useCallback(() => {
    clearSession();
    setAuthInformation?.({ user: undefined, isAuthenticated: false });
  }, []);

  // make all loaders stop
  const finilizeLoading = useCallback(() => {
    setAuthLoading(false);
    _setAuthLoading(false);
  }, []);

  return {
    pathname,
    logout,
    atAuthRoute,
    isAuthLoading: authLoading || isAuthLoading,
    clearSessionWithInfo,
  };
};

export default useAuth;
