import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { searchProductFormDef } from "@/models/validations/searchproduct.validation";

interface ChatInputProps {
  userMessage: string;
  handleMessage: (e: any) => void;
  handleEnter: (event: any) => void;
  sendMessage: (event: any) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  userMessage,
  handleMessage,
  handleEnter,
  sendMessage,
}) => {

  async function onSubmit(values: searchProductFormDef) {
    console.log(values);
    // setError("");
    // setLoading(true);
    // try {
    //     // const userId = "677088ed4b1b61e1808a75f6"; 
    //     const product = values.product;
    //     let response;
    //     response = await ProductServices.SearchProductService({ product });
    //     // setProduct(response.data.shorturl);
    //     console.log(response);

    //     form.reset();
    //     setLoading(false);
    // } catch {
    //     setError("Error getting product");
    // }
  }
  return (

    <form className="relative mt-[46px]">
      <Image src='/assets/file.svg' alt='file' width={13} height={18} className='absolute top-[26px]  left-[25px] my-auto' />
      <Input value={userMessage ?? ""} onKeyDown={handleEnter} onChange={handleMessage} placeholder="Search for a Product" className="border-1 border-[#E2E2E4] py-[21px] px-[25px] pl-[60px] text-[16px]/[21px] h-full md:min-w-[771px] min-w-full rounded-[48px] text-black" />

      <div className='flex items-center gap-3 absolute right-[31px]    top-0 bottom-0 my-auto  text-base font-semibold  '>
        <Image src='/assets/voice.svg' alt='voice' width={16} height={16} className='' />
        <Button onClick={sendMessage} className="p-0 rounded-[48px] hover:drop-shadow-[10px_9px_22px_rgba(20,78,227,0.38)]" >
          <div className='p-[10px] bg-[#001534] rounded-full'><Image src='/assets/whitesearch1.svg' alt='search' width={20} height={20} /></div>
        </Button>

      </div>
    </form>
  );
};

export default ChatInput;
