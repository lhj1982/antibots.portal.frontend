'use client'
import React from 'react';
import Link from "next/link";
import {usePathname} from 'next/navigation';

const SideMenu = () => {
    return (
        <div className='bg-light-black flex flex-col h-full'>
            <div className='h-0.5 w-11/12 mx-auto bg-gray-700 mb-3'></div>
            <Link href='/namelist'>
                <div className='flex h-12'>
                    <h1 className={`m-auto ${usePathname() === '/namelist' ? 'text-red-300' : 'text-zinc-500'} hover:text-white`}>Name List</h1>
                </div>
            </Link>
            <Link href='/webbrule'>
                <div className='flex h-12'>
                    <h1 className={`m-auto ${usePathname() === '/webbrule' ? 'text-red-300' : 'text-zinc-500'} hover:text-white`}>Create Webb Rule</h1>
                </div>
            </Link>
            <Link href='/webbrulelist'>
                <div className='flex h-12'>
                    <h1 className={`m-auto ${usePathname() === '/webbrulelist' ? 'text-red-300' : 'text-zinc-500'} hover:text-white`}>Webb Rule List</h1>
                </div>
            </Link>
            <Link href='/artemisrule'>
                <div className='flex h-12'>
                    <h1 className={`m-auto ${usePathname() === '/artemisrule' ? 'text-red-300' : 'text-zinc-500'} hover:text-white`}>Create Artemis Rule</h1>
                </div>
            </Link>
            <div className='h-0.5 w-11/12 mx-auto bg-gray-700 my-3'></div>
            <Link href='https://confluence.nike.com/pages/viewpage.action?pageId=825536585'>
                <div className='flex h-12 hover:text-white'>
                    <h1 className='text-zinc-500 m-auto hover:text-white'>Webb Rule Cheat Sheet</h1>
                </div>
            </Link>
            <Link href='https://confluence.nike.com/display/GCFairness/01.+Bot+Mitigation+Engine+Based+on+AWS+Stack'>
                <div className='flex h-12'>
                    <h1 className='text-zinc-500 m-auto hover:text-white'>About Webb</h1>
                </div>
            </Link>
        </div>
    );
}

export default SideMenu;
