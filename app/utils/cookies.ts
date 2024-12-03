import { getCookie, setCookie } from "cookies-next";

export function saveLoginSession(login_response_data: TLoginResponse) {
  const expires = new Date(Date.now() + 3600 * 1000);
  const session: TCookieStoreValue = {
    user: login_response_data,
    expires: JSON.stringify(expires),
  };
  setCookie("session", JSON.stringify(session), { expires });
}

export function clearSession() {
  setCookie("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<TCookieStoreValue | {}> {
  const session = await getCookie("session", { path: "/" });
  if (!session) return {};
  return JSON.parse(session);
}
