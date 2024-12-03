"use client";

import { Suspense } from "react";
import Loading from "../_components/loading";
import useAuth from "../_hooks/useAuth";

const AuthProvider = ({ children }: TChildren) => {
  const { isAuthLoading } = useAuth();
  return (
    <Suspense fallback={<Loading fullscreen />}>
      {isAuthLoading ? <Loading fullscreen /> : <>{children}</>}
    </Suspense>
  );
};

export default AuthProvider;
