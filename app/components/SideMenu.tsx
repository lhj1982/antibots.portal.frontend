"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import rolesdata from "@/role.json";
import { Role } from "@/type";
import { useRoleStore } from "@/zustand/roleStore";
import fetchUserAccess from "@/lib/fetchUserAccess";

const SideMenu = () => {
  const roles = rolesdata.roles;
  const { role, setRole } = useRoleStore();

  if (typeof window !== "undefined" ) { 
    const roleInLocalStorage = window.localStorage.getItem('role');
    // console.log("Role From LocalStorage: ", roleInLocalStorage);
    if (roleInLocalStorage !== role && window.localStorage.getItem('role') !== null) {
      // When first time render (from okta), there will be some kind of deley when store the value to localstorage
      // So we use state to control the component
      // if state does not equal to localstorage and it is not the first time render, call api to update the state
      fetchUserAccess().then((role)=> {
        setRole(role);
      });
    }
  }
  // console.log("Role From Zustand: ", role);
  let accessList = roles[role].access;

  const currentPathname = usePathname();
  return (
    <div className="bg-light-black flex flex-col h-full">
      <div className="h-0.5 w-11/12 mx-auto bg-gray-700 mb-3"></div>
      <div>
        {
          accessList.map((item, index) => (
            <Link href={item.path} key={index}>
              <div className="flex h-12">
                <h1
                  className={`m-auto ${
                    currentPathname === item.path
                      ? "text-red-300"
                      : "text-zinc-500"
                  } hover:text-white`}
                >
                  {item.name}
                </h1>
              </div>
            </Link>
          ))
        }
      </div>
      <div className="h-0.5 w-11/12 mx-auto bg-gray-700 my-3"></div>
      <Link href="https://confluence.nike.com/pages/viewpage.action?pageId=825536585">
        <div className="flex h-12 hover:text-white">
          <h1 className="text-zinc-500 m-auto hover:text-white">
            Webb Rule Cheat Sheet
          </h1>
        </div>
      </Link>
      <Link href="https://confluence.nike.com/display/GCFairness/01.+Bot+Mitigation+Engine+Based+on+AWS+Stack">
        <div className="flex h-12">
          <h1 className="text-zinc-500 m-auto hover:text-white">About Webb</h1>
        </div>
      </Link>
    </div>
  );
};

export default SideMenu;
