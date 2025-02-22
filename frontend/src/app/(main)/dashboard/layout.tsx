
import Image from 'next/image';
import React from 'react'

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="satoshi bg-cover bg-no-repeat flex ">
            <div className='md:flex hidden flex-col gap-[310px] items-center py-[81px] pl-[81px] pr-[20px] '>
                <ul className='flex flex-col gap-[10px] w-[102px]'>
                    {['Info', 'Message', 'Template', 'Preview', 'Share'].map((item, idx) => ( <li key={idx} className={`${idx == 1 ? 'text-black font-semibold' : 'text-[#0000005a]'} text-[16px]/[18px] flex items-center justify-between`}>
                        <p className='text-base font-normal'>{item}</p>
                        <Image src='/icons/arrow-up.svg' alt='arrow' width={20} height={20} className='group-hover:rotate-12 transition-all ' />
                    </li>))}
                </ul>
            </div>
            <div className='w-fit md:mr-auto md:ml-[150px] xl:mx-auto sm:mx-0 mx-auto  '>

                {children}
            </div>
        </div>
    )
}