"use client";
import React from "react";
import Image from "next/image";
import appLogo from "../../public/antibots.svg";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "react-tooltip";
import { useUserStore } from "@/zustand/userStore";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  if (string.length === 0 ) {
    return "#F68475";
  }
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function NavBar() {
  const { username, email } = useUserStore((state) => ({
    username: state.username,
    email: state.email,
  }));

  const {setEmail, setUsername} = useUserStore();

  // same as side menu: always use the value in state to control the component rather than using localstorage
  // if state lost during the page refresh, update the state by using localstorage
  if (typeof window !== "undefined") {
    // console.log("Nav Bar Username from LocalStorage: ", window.localStorage.getItem("username"));
    if(username === "H i" && window.localStorage.getItem("username") !== null){
      setUsername(window.localStorage.getItem("username") as string);
    }
    // console.log("Nav Bar Username from state: ", username);
    // console.log("Nav Bar Email from LocalStorage: ", window.localStorage.getItem("email"));
    if((email === "User@nike.com" || "") && window.localStorage.getItem("email") !== null){
      setEmail(window.localStorage.getItem("email") as string);
    }
    // console.log("Nav Bar Email from state: ", email);
  }
  return (
    <nav className="bg-light-black p-1 sticky top-0 drop-shadow-xl z-10">
      <div className="flex items-center justify-between  sm:flex-row mx-12">
        <div className="flex items-center">
          <Image className="h-16 w-16" src={appLogo} alt="app logo" />
          <h2 className="text-white text-xl"> ANTIBOT PORTAL </h2>
        </div>
        <Avatar
          className="user-avatar h-10 w-10 "
          {...stringAvatar(username)}
        />
        <Tooltip anchorSelect=".user-avatar" place="left">
          {email}
        </Tooltip>
      </div>
    </nav>
  );
}
