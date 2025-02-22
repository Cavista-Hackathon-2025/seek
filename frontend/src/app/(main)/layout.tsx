'use client'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';

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
    return (
        <div className="satoshi bg-cover bg-no-repeat flex ">
            <Image src='/assets/layout-left.svg' alt='sidebar layout' width={24} height={24} className='left-10 top-10 absolute' />
            <div className='flex items-center gap-[19px] fixed top-10 right-14'>
                {['search-icon', 'plus-icon', 'calendar-icon', 'book-icon'].map((item, idx) => (
                    <Image key={idx} src={`/assets/${item}.svg`} alt='banner' width={24} height={24} />
                ))}

            </div>
            <div className='md:flex hidden flex-col gap-[310px] items-center py-[81px] pl-[81px] pr-[20px] '>
                <ul className='flex flex-col gap-[10px] w-[102px]'>
                    {['Info', 'Message', 'Template', 'Preview', 'Share'].map((item, idx) => (<li key={idx} className={`${idx == 1 ? 'text-black font-semibold' : 'text-[#0000005a]'} text-[16px]/[18px] flex items-center justify-between`}>
                        <p className='text-base font-normal'>{item}</p>
                        <Image src='/icons/arrow-up.svg' alt='arrow' width={20} height={20} className='group-hover:rotate-12 transition-all ' />
                    </li>))}
                </ul>
            </div>
            <div className={containerStyles}>
                {children}
            </div>
        </div>
    )
}