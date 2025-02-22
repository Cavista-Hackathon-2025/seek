import { ingredients } from '@/data/ingredients'
import Image from 'next/image'
import React from 'react'

const MoreProductDetails = () => {
  return (
    <div>

    </div>
  )
}

export default MoreProductDetails

export const Ingredients = () => {
  return (
    <div className='min-w-[319px]'>
        <div className='flex justify-between items-center mb-[30px] '>
            <h2 className='text-[22px] font-bold'>Ingredients</h2>
            <p className='text-[#087DEE] text-[22px] font-medium'>See all</p>
        </div>
        {ingredients.map(({name, desc}) => (
            <li className='flex items-start gap-2'>
                <div className='flex flex-col gap-2 max-w-[277px]'>
                    <h2 className='text-[22px] font-bold '>{name}</h2>
                    <p className='text-[16px]'>{desc}</p>
                </div>
                <Image src='/assets/infoo.svg' alt='info' width={20} height={20} />
            </li>
        ))}
    </div>
  )
}
