import ActionCard from '@/components/dashboard/action-card'
import SearchProduct from '@/components/dashboard/search-product'
import Banner from '@/components/shared/banner'
import { actioncarddata } from '@/data/dashboard-actioncard'
import Image from 'next/image'
import React from 'react'

const Dashboard = () => {
  return (
    <section className='satoshi flex flex-col items-center relative'>
        <div className='w-fit left-0 right-0 -top-32 absolute mx-auto'>
        <Banner text='Good day, Segun' />
        </div>
        <p className='text-[22px] mt-52 font-medium max-w-[489px]  text-center mb-14 '>Scan, search, or chat with Seek to get instant insights on your products.</p>

        <div className='flex items-center gap-8'>
            {actioncarddata.map(card => <ActionCard {...card} />)}
        </div>
        <SearchProduct />
    </section>
  )
}

export default Dashboard