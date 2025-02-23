
import SearchProduct from '@/components/dashboard/search-product'
import Banner from '@/components/shared/banner'
import Image from 'next/image'
import { ChangeEvent } from 'react';

const Scan = () => {
    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement> | any
      ): void => {
        const file: any = event.target.files[0];
    
        if (file) {
          getBase64(file)
            .then((file: any) => {
              setImage(file);
            })
            .catch((e) => {
              if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(e)
        });
    
          generativeFile(file).then((img: any) => {
            setBitImage(img);
          });
        }
      };
    
      const generativeFile = async (file: any) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader: any = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(file);
        });
    
        return {
          inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
      };
      const getBase64 = (file: File) =>
        new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(`Error: ${error}`);
        });
    
      const handleRecognize = async (): Promise<void> => {
        if (image) {
          setShowScanner((prev:any) => !prev)
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          try {
            setLoading(prev => !prev);
          const result: any = await model.generateContent([queryText, bitImage]);
    
            const response = await result.response;
            const text = await response.text();
            setResult(text);
          } catch (error) {
            if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error("Error fetching result:", error);
            setResult("");
          } finally {
            setLoading(prev => !prev);
          }
          if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(queryText);
        } else {
          toast.error("Input an image!");
        }
      };
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
                    <div className="file-input-wrapper">
              <input type="file" id="fileInput" onChange={handleImageChange} />
              <label className="file-input-label" htmlFor="fileInput">
                Choose a file
              </label>
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