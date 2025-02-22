import ActionCard from '@/components/dashboard/action-card'
import SearchProduct from '@/components/dashboard/search-product'
import Banner from '@/components/shared/banner'
import { actioncarddata } from '@/data/dashboard-actioncard'
import Image from 'next/image'
import React from 'react'

const Dashboard = () => {
  return (
    <section className='satoshi flex flex-col items-center'>
        <Banner />
        <p className='text-[22px] font-medium max-w-[489px] my-20 text-center '>Scan, search, or chat with Seek to get instant insights on your products.</p>

        <div className='flex items-center gap-8'>
            {actioncarddata.map(card => <ActionCard {...card} />)}
        </div>
        <SearchProduct />
    </section>
  )
}

export default Dashboard