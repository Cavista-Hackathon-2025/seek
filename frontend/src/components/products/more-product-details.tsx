'use client'

import { ingredients } from '@/data/ingredients'
import { prodanalysis } from '@/data/prod-analysis'
import Image from 'next/image'
import React, { useState } from 'react'

const MoreProductDetails = () => {
    return (
        <div className='flex justify-between mt-[50px] gap-[70px] w-full'>
            <Ingredients />
            <div className='flex flex-col w-full gap-8'>
            <ProductDetails />
            <AlternativeProd />
            </div>
            <ProdAnalysis />
        </div>
    )
}

export default MoreProductDetails

const Ingredients = () => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (index: number) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index], // Toggle the state for this item
        }));
    };
    return (
        <div className='min-w-[319px]'>
            <div className='flex justify-between items-center mb-[30px] '>
                <h2 className='text-[22px] font-bold'>Ingredients</h2>
                <p className='text-[#087DEE] text-[22px] font-medium cursor-pointer hover:underline'>See all</p>
            </div>
            <ul className='flex flex-col gap-4'>
                {ingredients.map(({ name, desc }, index) => (
                    <li key={index} className='flex items-center gap-2'>
                        <div className='flex flex-col gap-2 max-w-[277px]'>
                            <h2 className='text-[22px] font-bold'>{name}</h2>
                            <p className='text-[16px]'>
                                {expanded[index] ? desc : `${desc.slice(0, 50)}...`}
                            </p>
                        </div>
                        <Image
                            src='/assets/infoo.svg'
                            alt='info'
                            width={20}
                            height={20}
                            className='cursor-pointer'
                            onClick={() => toggleExpand(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ProductDetails = () => {
    return (
        <div className='max-w-[319px]'>
            <div className='flex justify-between items-center mb-[30px] '>
                <h2 className='text-[22px] font-bold'>Details</h2>
                <p className='text-[#087DEE] text-[22px] font-medium cursor-pointer hover:underline'>See all</p>
            </div>
            <p className='text-base font-medium text-[#6C6D71]'>
                A lightweight, non-greasy moisturizing lotion designed to hydrate and restore the skin’s natural barrier. Formulated with essential ceramides and hyaluronic acid, it provides long-lasting moisture while being gentle on sensitive skin. Fragrance-free, non-comedogenic, and developed with dermatologists, making it suitable for all skin types, including dry and sensitive skin.
            </p>
        </div>
    )
}

const ProdAnalysis = () => {
    return (
        <div className='max-w-[540px] w-full'>
            <div className='flex justify-between items-center mb-[30px] '>
                <h2 className='text-[22px] font-bold'>Product Analysis</h2>
                <p className='text-[#087DEE] text-[22px] font-medium cursor-pointer hover:underline'>See all</p>
            </div>
            <div className='flex flex-col w-full gap-5'>
                {prodanalysis.map(item => <ProdAnalysisCard  {...item} />)}
            </div>
        </div>
    )
}



interface CardType {
    bg: string;
    title: string;
    text: string;
}
const ProdAnalysisCard = (props: CardType) => {
    const { bg, title, text } = props;

    return (
        <div className='flex justify-between items-center gap-5 p-3 rounded-sm' style={{ backgroundColor: bg }}>
            <div className='flex flex-col gap-3'>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <Image
                src='/assets/infoo.svg'
                alt='info'
                width={20}
                height={20}
                className='cursor-pointer'
            />
        </div>
    )
}


const AlternativeProd = () => {
    return (
        <div className='max-w-[319px] w-full'>
            <div className='flex justify-between items-center mb-[30px] '>
                <h2 className='text-[22px] font-bold'>Alternative Product</h2>
                <p className='text-[#087DEE] text-[22px] font-medium cursor-pointer hover:underline'>See all</p>
            </div>
            <ul className='flex flex-col w-full gap-5'>
                <li className='flex items-center justify-between w-full gap-2'>
                    <div className='flex flex-col gap-2 w-full justify-between'>
                        <h2 className='text-[22px] font-bold'>La Roche-Posay</h2>
                        <div className='flex items-center gap-3'>
                            <div className='bg-[red] w-[15px] h-[15px] rounded-full' />
                            <p className='text-[26px] font-medium'>70/100</p>
                        </div>
                        <div className='px-5 py-1 bg-[#BDFFCF] rounded-sm w-fit'>
                            <p>Highly Recommended ✅</p>
                        </div>
                    </div>
                    <Image
                        src='/assets/infoo.svg'
                        alt='info'
                        width={20}
                        height={20}
                        className='cursor-pointer'
                    />
                </li>
            </ul>
        </div>
    )
}


