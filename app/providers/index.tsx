"use client";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import AuthProvider from "./authProvider";
import { StyleProvider } from "@ant-design/cssinjs";
import { global_theme } from "../utils/theme.global";

type TRootProviderProps = TChildren & {
  children: ReactNode;
};
const RootProvider = ({ children }: TRootProviderProps) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={global_theme}>
        <StyleProvider hashPriority={"high"}>
          <App>
            <AuthProvider>{children}</AuthProvider>
          </App>
        </StyleProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default RootProvider;
