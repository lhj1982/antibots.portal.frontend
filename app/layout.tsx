import "./globals.scss";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import type { Metadata } from "next";
import React from "react";
import NavBar from "@/app/components/Navbar";
import SideMenu from "@/app/components/SideMenu";
import AuthWrapper from "@/app/components/AuthWrapper";

export const metadata: Metadata = {
  title: "James Webb",
  description: "the home page of webb app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white flex flex-col">
        <StyledComponentsRegistry>
          <AuthWrapper>
            <NavBar />
            <div className="flex flex-grow overflow-y-auto">
              <div className="w-2/12 overflow-auto">
                <SideMenu />
              </div>
              <div className="w-full">{children}</div>
            </div>
          </AuthWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
