"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import rolesdata from "@/role.json";
import { Role } from "@/type";
import { useRoleStore } from "@/zustand/roleStore";
import fetchUserAccess from "@/lib/fetchUserAccess";

interface ExpandedState {
  [key: string | number]: boolean;
}

const SideMenu = () => {
  const roles = rolesdata.roles;
  const { role, setRole } = useRoleStore();
  const [expanded, setExpended] = useState<ExpandedState>({});
  const [currentMenuItem, setCurrentMenuItem] = useState(`${usePathname()}`);

  if (typeof window !== "undefined") {
    const roleInLocalStorage = window.localStorage.getItem("role");
    // console.log("Role From LocalStorage: ", roleInLocalStorage);
    if (
      roleInLocalStorage !== role &&
      window.localStorage.getItem("role") !== null
    ) {
      fetchUserAccess().then((role) => {
        setRole(role);
      });
    }
  }
  let accessList = roles[role].access;

  const toggleExpand = (index: string | number) => {
    setExpended((pre) => ({
      ...pre,
      [index]: !pre[index],
    }));
  };

  const handleMenuItemOnClick = (path: string) => {
    setCurrentMenuItem(path);
  };

  const currentPathname = usePathname();
  return (
    <div className="bg-light-black flex flex-col h-full">
      <div className="h-0.5 w-11/12 mx-auto bg-gray-700 mb-3"></div>
      <div>
        {accessList.map((item, index) =>
          item.children.length === 0 ? (
            <Link href={item.path} key={index}>
              <div
                className="flex h-12"
                onClick={() => handleMenuItemOnClick(item.path)}
              >
                <h1
                  className={`m-auto ${
                    currentMenuItem === item.path
                      ? "text-red-300 animate-bounce"
                      : "text-zinc-500"
                  } hover:text-white`}
                >
                  {item.name}
                </h1>
              </div>
            </Link>
          ) : (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  toggleExpand(index);
                  handleMenuItemOnClick(item.path);
                }}
                className="flex h-12 hover:text-white cursor-pointer "
              >
                <h1
                  className={`m-auto ${
                    currentMenuItem == item.path
                      ? "text-red-300 animate-bounce"
                      : "text-zinc-500"
                  }`}
                >
                  {item.name}
                </h1>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-linear ${expanded[index] ? 'max-h-96' : 'max-h-0'}`}>
              {expanded[index] &&
                item.children.map((subItem, subIndex) => (
                  <Link href={subItem.path} key={subIndex}>
                    <div className="flex h-10 pl-2">
                      <h2
                        className={`m-auto  hover:text-white ${
                          currentPathname == subItem.path ? "text-red-200" : "text-zinc-500"
                        }`}
                      >
                        {` - ${subItem.name}`}
                      </h2>
                    </div>
                  </Link>
                ))}
                </div>
            </React.Fragment>
          )
        )}
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
