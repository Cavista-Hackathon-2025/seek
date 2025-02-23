import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface ActionCardType {
    bgimg: string;
    img: string;
    title: string;
    text: string;
    link: string;
}

const ActionCard = (props: ActionCardType) => {
    const {bgimg, img, title, text, link} = props
  return (
    <Link href={`/${link}`} className={`cursor-pointer group flex flex-col gap-[33px] items-center border-b-[#F3F3F3] rounded-[17px] border-b-[7px] p-[33px]  w-[227px] h-[212px] bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(${bgimg})` }}>
            <Image src={img} alt='banner' width={50} height={50} className='group-hover:scale-120 transition-all' />
            <div className='flex flex-col items-start'>
                <h2 className='text-[20px] font-medium'>{title}</h2>
                <p className='text-[13px] font-normal '>{text}</p>
            </div>
    </Link>
  )
}

export default ActionCard