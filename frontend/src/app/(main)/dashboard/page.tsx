import ActionCard from '@/components/dashboard/action-card'
import SearchProduct from '@/components/dashboard/search-product'
import { actioncarddata } from '@/data/dashboard-actioncard'
import Image from 'next/image'
import React from 'react'

const Dashboard = () => {
  return (
    <section className='satoshi flex flex-col items-center'>
        <div className='relative max-w-[426px]'>
            <Image src='/assets/bannerimg.svg' alt='banner' width={426} height={214} />
            <div className='flex items-center gap-[14px] absolute bottom-[52px] -rotate-1 left-0 right-0  justify-center'>            
                <Image src='/assets/seek-logo.svg' alt='seek' width={44} height={44} />
                <p className='text-[23px] font-medium'>Happy Late Night, Seyi</p>
            </div>
        </div>
        <p className='text-[22px] font-medium max-w-[489px] my-20 text-center '>Scan, search, or chat with Seek to get instant insights on your products.</p>

        <div className='flex items-center gap-8'>
            {actioncarddata.map(card => <ActionCard {...card}/>)}
        </div>
        <SearchProduct />
    </section>
  )
}

export default Dashboard