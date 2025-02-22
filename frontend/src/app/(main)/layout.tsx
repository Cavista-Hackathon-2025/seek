'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { motion } from "motion/react"

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    const isProductPage = pathname.startsWith('/products/');

    // Define dynamic styles based on the current route
    const containerStyles = twMerge(
        'w-fit mx-auto sm:mx-0 md:ml-[150px] md:mr-auto xl:mx-auto',
        isProductPage && '!mx-0'
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="satoshi bg-cover bg-no-repeat flex">
            {/* Sidebar Toggle Button */}
            <Image
                src='/assets/layout-left.svg'
                alt='sidebar layout'
                width={24}
                height={24}
                className='left-10 top-10 absolute cursor-pointer'
                onClick={toggleSidebar}
            />

            {/* Top Right Icons */}
            <div className='flex items-center gap-[19px] fixed top-10 right-14'>
                {['search-icon', 'plus-icon', 'calendar-icon', 'book-icon'].map((item, idx) => (
                    <Image key={idx} src={`/assets/${item}.svg`} alt='banner' width={24} height={24} />
                ))}
            </div>

            {/* Sidebar with Animation */}
            <motion.div
                initial={{ width: 252 }} // Initial width
                animate={{ width: isSidebarOpen ? 252 : 0 }} // Animate width toggle
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={twMerge(
                    'md:flex hidden flex-col bg-[#F3F3F3] min-h-screen items-center py-[81px] pr-[20px]',
                    isSidebarOpen ? 'pl-[41px]' : 'pl-0 overflow-hidden'
                )}
            >
                <Image src='/assets/logo2.svg' alt='logo' width={86} height={96} className='group-hover:rotate-12 mb-6 transition-all' />

                <ul className='flex flex-col gap-[10px]'>
                    {['Home', 'Dashboard', 'Scan', 'Routine', 'Reports', 'Integrations', 'Reports', 'History', 'Chat with Seek ai'].map((item, idx) => (
                        <li key={idx} className={`${idx == 1 ? 'text-black font-semibold' : 'text-[#0000005a]'} text-[16px]/[18px] flex items-center gap-3`}>
                            <Image src='/assets/seek-logo.svg' alt='arrow' width={20} height={20} className='group-hover:rotate-12 transition-all' />
                            <p className='text-base font-normal'>{item}</p>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Main Content */}
            <div className="w-fit mx-auto sm:mx-0 md:ml-[150px] md:mr-auto xl:mx-auto">
                {children}
            </div>
        </div>
    )
}