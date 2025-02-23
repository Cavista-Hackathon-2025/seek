"use client"

import React, { useContext, useEffect, useState } from "react";
import ScannerBody from "@/modules/scanner/ScannerBody";
import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import SetupContext from "@/context/SetupContext";
import { useUserContext } from "@/context/UserContext";
import SearchProduct from '@/components/dashboard/search-product'
import Banner from '@/components/shared/banner'
import ScannerContext from "@/context/ScannerContext";
import { Button } from "@/components/ui/button";

const Scanner = () => {
  const { setShowScanner }: any = useContext(SetupContext);
  const { loading, image, handleRecognize, handleImageChange, result, showScanner }: any = useContext(ScannerContext)

  const { username } = useUserContext();
  const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
  useEffect(() => {

    setFirstName(username?.split(" ")[0] ?? "");
  }, [username]);

  return (
    <div className="font-satoshi">
      <MainLayout fixedTopbar={true} includeMarginTop={true}>
        {/* <div
          className="min-h-screen"
        >
          <div className="flex justify-between mb-4">
            <div className="flex flex-col gap-7">

              <div className="relative w-fit">
                <Image src='/multipleline.svg' alt='multi line' height={141} width={153} className='md:w-[153px] w-[60px]  absolute bottom-0 top-0 my-auto right-0 -z-50' />
                <h1 className="md:text-desktop-heading1 text-[28px]/[40px] font-bold z-50">Hello, {firstName ? firstName : '..'}  </h1>
              </div>
              <p className=" text-mobile-feature md:text-desktop-highlight italic max-w-[450px]">Chat with our AI bot for personalized nutrition tips, recipes, and meal plans. Get instant, tailored advice to reach your health goals!</p>
            </div>
            <div onClick={() => setShowScanner(true)}>
              <Image src='/tryscanner.svg' alt='multi line' height={141} width={153} className=' ' />
            </div>
          </div>
          <ScannerBody />
        </div> */}

        <section className='satoshi flex flex-col items-center'>

          <div className='w-fit left-0 right-0 -top-28 absolute mx-auto'>
            <Banner text='Select Scan Method' />
          </div>
          <p className='text-[22px] font-medium mt-52 max-w-[489px] mb-14 text-center '>Scan, search, or chat with Seek to get instant insights on your products.</p>
          {image !== "" && (
            <Image
              src={image}
              width={150}
              height={150}
              alt="img"
              className="w-[150px] rounded-md flex-[.5]"
            />
          )}
          <div className='flex items-center gap-8'>
            <div onClick={() => setShowScanner(true)} className={`cursor-pointer group flex flex-col gap-[33px] items-center border-b-[#F3F3F3] rounded-[17px] border-b-[7px] p-[33px]  min-w-[255px] min-h-[212px] bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(/assets/scan-bg1.svg)` }}>
              <Image src='/assets/scanproduct.svg' alt='scan prod' width={50} height={50} className='group-hover:scale-120 transition-all' />
              <div className='flex flex-col items-start'>
                <h2 className='text-[20px] font-medium'>Scan Barcode/QR Code</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-3 items-center justify-center bg-base-white rounded-[19.7px] mx-auto font-jakarta">
                <div className="flex flex-col gap-4 items-center mx-auto flex-[.5] border">
                  <div className="file-input-wrapper">
                    <input type="file" id="fileInput" onChange={handleImageChange} />
                    <label className="file-input-label" htmlFor="fileInput">
                      Choose a file
                    </label>
                  </div>
                  <div id="fileName"></div>
                </div>
              </div>

            </div>

            <div className={`cursor-pointer group flex flex-col gap-[33px] items-center border-b-[#F3F3F3] rounded-[17px] border-b-[7px] p-[33px]  min-w-[255px] min-h-[212px] bg-cover bg-no-repeat bg-center`} style={{ backgroundImage: `url(/assets/scan-bg2.svg)` }}>
              <Image src='/assets/upload.svg' alt='upload prod' width={50} height={50} className='group-hover:scale-120 transition-all' />
              <div className='flex flex-col items-start'>
                <h2 className='text-[20px] font-medium'>Upload an Image</h2>
              </div>
              <div className="flex flex-col gap-4 items-center mx-auto flex-[.5] border">
                  <div className="file-input-wrapper">
                    <input type="file" id="fileInput" onChange={handleImageChange} />
                    <label className="file-input-label" htmlFor="fileInput">
                      Choose a file
                    </label>
                  </div>
                  <div id="fileName"></div>
                </div>
            </div>
          </div>
          <Button
            className=" p-4 w-fit bg-[#B0D2C1] mx-auto flex mt-3"
            onClick={handleRecognize}
          >
            Scan
          </Button>
          <SearchProduct />
        </section>
      </MainLayout>
    </div>
  );
};

export default (Scanner);

