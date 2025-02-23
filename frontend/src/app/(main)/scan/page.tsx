
import SearchProduct from '@/components/dashboard/search-product'
import Banner from '@/components/shared/banner'
import Image from 'next/image'

const Scan = () => {
    return (
        <section className='satoshi flex flex-col items-center'>

            <div className='w-fit left-0 right-0 -top-28 absolute mx-auto'>
                <Banner text='Select Scan Method' />
            </div>
            <p className='text-[22px] font-medium mt-52 max-w-[489px] mb-14 text-center '>Scan, search, or chat with Seek to get instant insights on your products.</p>

            <div className='flex items-center gap-8'>
                <div className={`cursor-pointer group flex flex-col gap-[33px] items-center border-b-[#F3F3F3] rounded-[17px] border-b-[7px] p-[33px]  w-[255px] h-[212px] bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(/assets/scan-bg1.svg)` }}>
                    <Image src='/assets/scanproduct.svg' alt='scan prod' width={50} height={50} className='group-hover:scale-120 transition-all' />
                    <div className='flex flex-col items-start'>
                        <h2 className='text-[20px] font-medium'>Scan Barcode/QR Code</h2>
                    </div>
                </div>

                <div className={`cursor-pointer group flex flex-col gap-[33px] items-center border-b-[#F3F3F3] rounded-[17px] border-b-[7px] p-[33px]  w-[255px] h-[212px] bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(/assets/scan-bg2.svg)` }}>
                    <Image src='/assets/upload.svg' alt='upload prod' width={50} height={50} className='group-hover:scale-120 transition-all' />
                    <div className='flex flex-col items-start'>
                        <h2 className='text-[20px] font-medium'>Upload an Image</h2>
                    </div>
                </div>
            </div>
            <SearchProduct />

        </section>
    )
}

export default Scan