"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useSession from "@/hooks/useSession";
import appLogo from "@/public/antibots.svg";
import React from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();
  const isAuthCallbackPage = pathname === "/callback";
  const { session } = useSession({ keepRenderIfNoSession: isAuthCallbackPage });

  return (
    <>
      {(session || isAuthCallbackPage) && children}
      {!session && !isAuthCallbackPage && (
        <div className="w-screen h-screen flex items-center justify-center bg-black">
          <div className="flex items-center">
            <Image className="h-12 w-12" src={appLogo} alt="app logo" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-4xl">
              {" "}
              Loading...
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
