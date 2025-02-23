import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const ProductBasicDetails = () => {
    return (
        <div className='h-[155px] w-full flex justify-between gap-5'>
            <div className='flex items-center gap-[10px]'>
                <Image src='/assets/cerave.png' alt='product' width={179} height={155} />
                <div className='flex flex-col h-full justify-between'>
                    <div className=''>
                        <p className='text-[27px] font-bold'>Hydrating lotion for healthy skin.</p>
                        <p className='text-[22px] font-medium'>CeraVe</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[red] w-[15px] h-[15px] rounded-full'/>
                        <p className='text-[26px] font-medium'>70/100</p>
                    </div>
                </div>

            </div>

            <div className='flex h-full max-w-[400px]'>
                <div className='flex flex-col gap-[15px] w-[147px] h-full text-[22px] text-[#6C6D71] font-bold'>
                    <p>Category -  </p>
                    <p>Usage -</p>
                </div>
                <div className='text-[20px] gap-[17px] h-full text-[#000000] font-medium flex flex-col'>
                    <p>Skincare - Face & Body</p>
                    <p>Daily hydration for normal to dry skin</p>
                </div>
            </div>

            <div className='flex flex-col justify-between'>
                <div className='flex gap-5'>
                <Image src='/assets/add-square3.svg' alt='add square' width={30} height={30} />
                <Image src='/assets/share.svg' alt='share' width={30} height={30} />
                <Image src='/assets/download-03.svg' alt='download' width={30} height={30} />
                </div>

                <Button className='text-[14px] font-medium bg-[#EFEEF4] rounded-sm text-black p-[10px]'>
                More info with Seek AI
                </Button>
            </div>
        </div>
    )
}

export default ProductBasicDetails