import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RootProvider from "./providers";

export const metadata: Metadata = {
  title: "Bookmark App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <RootProvider>{children}</RootProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
