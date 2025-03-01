import React, { useContext } from "react";
import Image from "next/image";
import line from "../../../public/assets/line.png";
import { useSetupContext } from "../../context/SetupContext";
import DietCheckbox from "./DietCheckbox";
import { diettype } from "@/lib/deittype";
import { toast } from "react-toastify";

const DietType = () => {
  const { previousPage, nextPage, possibleDiseases } = useSetupContext();
  const checkForm = () => {
      if (possibleDiseases.length >= 1) {
        nextPage();
      } else {
        toast.error('Please select a health condition');
      }
    };
  return (
    <div className="font-jakarta md:py-14 md:px-10 py-9 px-3 md:mt-16 mt-10 rounded-[20px] mx-auto bg-primary-bg relative transition-opacity">
      <div>
        <div className="">
          <h1 className="md:text-[22px] text-[16px] font-bold mb-6">
            Do you follow any specific diet? (Check all that apply)
          </h1>
        </div>
        <div className="flex flex-col md:gap-5 gap-4">
          {diettype.map(({ title }) => (
            <DietCheckbox key={title} label={title} data={title} />
          ))}
        </div>
        {/* <MultiStepProgressBar currentStep={currentPage}/> */}
      </div>
      <div className="flex gap-5 mx-auto w-fit mt-3">
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={previousPage}
        >
          <Image alt="line" src={line} width="30" height="30" className="" />
        </div>
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={checkForm}
        >
          <Image alt="line" src={line} width="30" height="30" className="rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default DietType;
