"use client";
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import appLogo from '../../public/logo.svg';
import Avatar from '@mui/material/Avatar';


function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

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
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function NavBar() {
    return (
        <nav className='bg-light-black p-1 sticky top-0 drop-shadow-xl z-10'>
            <div className='flex items-center justify-between  sm:flex-row mx-12'>
                <div className='flex items-center'>
                    <Image
                        className= 'h-20 w-20'
                        src={appLogo}
                        alt="app logo" />
                    <h2 className='text-white text-xl'> JAMES WEBB </h2>
                </div>
                <Avatar  className= 'h-10 w-10 ' {...stringAvatar('Bradley Shao')} />
            </div>
        </nav>
    )
}
