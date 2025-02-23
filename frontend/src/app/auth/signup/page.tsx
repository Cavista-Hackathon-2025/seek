"use client"

import { SignupForm } from "@/components/auth/signup/SignupForm";
import Banner from "@/components/shared/banner";

const Signup = () => {
  return (
    <div className='satoshi py-10 px-4 mx-auto max-w-[583px] font-satoshi'>
      <div className="mx-auto w-fit left-0 right-0 -top-32 absolute">
                <Banner text="Welcome Back" />
            </div>
      <div className="mt-44 flex flex-col items-center mb-8 gap-2">
        <h3 className='text-[22px] font-bold '>
        Seek more clarity with AI.        </h3>
        <p className="text-[18px] font-medium">AI-powered insights for food, Health-Products, and medicine.</p>
      </div>
      <div className="max-w-[358px] mx-auto">
      <SignupForm />
      </div>
    </div>
  );
}

export default Signup;