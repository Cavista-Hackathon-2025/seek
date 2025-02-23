import React, { useState } from 'react';
import SkinTypeCheckbox from './SkinTypeCheckbox';
import line from '../../../public/assets/line.png';
import Image from 'next/image';
import { useSetupContext } from '../../context/SetupContext';
import { toast } from 'react-toastify';
import { skinTypes } from '@/lib/skin';

const SkinType = () => {
  const { nextPage, userSkin, previousPage } = useSetupContext();
  const [test, setTest] = useState(false);
  const checkForm = () => {
    if (userSkin) {
      nextPage();
    } else {
      toast.error('Please select a goal');
    }
  };

  return (
    <div className="font-jakarta md:py-14 md:px-10 py-9 px-3 md:mt-16 mt-10 rounded-[20px] mx-auto bg-primary-bg relative transition-opacity">
      <div>
        <div className="">
          <h1 className="md:text-[22px] text-[16px] font-bold mb-6">
            What are your health and wellness goals? (Check all that apply)
          </h1>
        </div>
        <div className="flex flex-col md:gap-5 gap-4">
          {skinTypes.map(({ title }) => (
            <SkinTypeCheckbox key={title} label={title} data={title} />
          ))}
        </div>
      </div>
      <p className=" font-satoshi  text-xl md:text-[28px] font-bold text-center mt-20 text-[#0C2503]">
        Last lap!
      </p>
      <div className="flex gap-5 mx-auto w-fit mt-3">
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={previousPage}
        >
          <Image alt="line" src={line} width="30" height="30" className="" />
        </div>
      </div>
    </div>
  );
};

export default SkinType;
