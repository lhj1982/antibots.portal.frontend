"use client";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import appLogo from "@/public/logo.svg";
import React from "react";

export default function NotFound() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };
    return (
        <div className="grid h-full px-4 bg-white place-content-center w-full">
            <div className="text-center flex flex-col items-center">
                <h2 className="text-gray-200 text-9xl">404</h2>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    👽 Sorry, the page was kidnapped 🛸
                </h2>
                <button
                    type="button"
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-red-200 rounded hover:bg-red-400 focus:outline-none focus:ring"
                    onClick={handleClick}
                >Back</button>
            </div>
        </div>
    );
}
