
import SearchProduct from '@/components/dashboard/search-product'
import Image from 'next/image'

const Scan = () => {
    return (
        <section className='satoshi flex flex-col items-center'>
            
            <div className='relative max-w-[426px]'>
                <Image src='/assets/bannerimg.svg' alt='banner' width={426} height={214} />
                <div className='flex items-center gap-[14px] absolute bottom-[52px] -rotate-1 left-0 right-0  justify-center'>
                    <Image src='/assets/seek-logo.svg' alt='seek' width={44} height={44} />
                    <p className='text-[23px] font-medium'>Select Scan Method</p>
                </div>
            </div>
            <p className='text-[22px] font-medium max-w-[489px] my-20 text-center '>Scan, search, or chat with Seek to get instant insights on your products.</p>

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