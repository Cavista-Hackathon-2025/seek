import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const SignupActions = () => {
  return (
    <div className='mt-6'>
      <Button
        className="bg-[#DFF5FA] p-[10px] border-2 max-w-[348.9px] w-full h-fit bottom-0 border-[#58ACFE] rounded-[30px] text-desktop-highlight font-bold min-h-[52px] hover:text-white"
        type="submit"
      >
        Continue
      </Button>
      {/* <div className="flex flex-col justify-between gap-8 mt-8">
        <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
        <Button
          className="mx-auto p-[10px] flex-[.7] border-2 max-w-[350px] w-full border-primary-bg-800 rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
          type="button"
        >
          <Image src="/assets/google-1.svg" width={32} height={32} alt='google' />
          Sign in with Google
        </Button>
      </div> */}
      <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[green]">Login</Link>{' '}
      </div>
    </div>
  );
};
