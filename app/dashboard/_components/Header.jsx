"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
    const path = usePathname();
    useEffect(
        () => {
            //console.log(path);
        }, [path]
    )
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <a href='/'><Image src={'/logo.svg'} width={160} height={100} alt='logo'/></a>
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-primary font-bold'}`}><a href='/dashboard'>Dashboard</a></li>
                {/*<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions</li>*/}
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}><a href='/dashboard/upgrade'>Upgrades</a></li>
                {/*<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/info'&&'text-primary font-bold'}`}>How it Works</li>*/}
            </ul>
            <UserButton />
        </div>
    )
}

export default Header;