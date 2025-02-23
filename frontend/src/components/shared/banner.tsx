import Image from 'next/image'
import React from 'react'

interface BannerText {
    text: string;
}
const Banner = ({text}: BannerText) => {
    return (
        <div className='relative max-w-[426px]'>
            <Image src='/assets/bannerimg.svg' alt='banner' width={426} height={214} />
            <div className='flex items-center gap-[14px] absolute bottom-[52px] -rotate-1 left-0 right-0  justify-center'>
                <Image src='/assets/seek-logo.svg' alt='seek' width={44} height={44} />
                <p className='text-[23px] font-medium'>{text}</p>
            </div>
        </div>
    )
}

export default Banner