import MoreProductDetails from '@/components/products/more-product-details'
import ProductBasicDetails from '@/components/products/product-basic-details'
import Image from 'next/image'
import React from 'react'

const Product = () => {
  return (
    <div className='flex flex-col items-start mt-20'>
        <Image src='/assets/seek-logo.svg' alt='seek' width={44} height={44} className='mb-[50px]'/>
        <ProductBasicDetails />
        <MoreProductDetails />
    </div>
  )
}

export default Product