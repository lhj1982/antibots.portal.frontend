import "./globals.scss";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import type { Metadata } from "next";
import React from "react";
import NavBar from "@/app/components/Navbar";
import SideMenu from "@/app/components/SideMenu";
import AuthWrapper from "@/app/components/AuthWrapper";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Antibots Portal",
  description: "the portal of the antibots tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../../public/antibots.svg" />
      </Head>
      <body className="bg-white flex flex-col">
        <StyledComponentsRegistry>
          <AuthWrapper>
            <NavBar />
            <div className="flex flex-grow overflow-y-auto">
              <div className="w-2/12 overflow-auto">
                <SideMenu />
              </div>
              <div className="flex-grow overflow-x-auto">
                <div className="min-w-full">{children}</div>
              </div>
            </div>
          </AuthWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
