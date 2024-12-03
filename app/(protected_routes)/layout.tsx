"use client";
import { Button, Layout, Result } from "antd";
import Link from "next/link";
import Appbar from "../_components/appbar";
import useStore from "../_stores";

const ProtectedRouteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // check is present route is permitted for the user or not
  return (
    <Layout
      hasSider
      className="h-screen w-screen  box-border   overflow-hidden"
    >
      <div className="flex-1 h-screen ">
        <div className="h-full flex flex-col">
          <Appbar />
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProtectedRouteLayout;
