'use client'
import { checkUser } from '@/services/auth.services';
import { Button } from '@/components/ui/button';
import { axiosKonsumeInstance } from '@/http/konsume';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const SignupActions = () => {
  const { data: session } = useSession();
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(session);
  const router = useRouter()
  
  // const sendHandler = async function () {
  //   if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log("sent", session)
  //   const result = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/LoginWithGoogle`, // Make sure the URL has the correct endpoint
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // Indicating the body is JSON
  //       },
  //       body: JSON.stringify({
  //         email: session?.user?.email, // Replace with actual email value
  //         fullName: session?.user?.name, // Replace with actual full name value
  //         token: session?.authToken, // Replace with the actual token
  //       }),
  //     }
  //   );
    
  // }
    // useEffect(() => {
    //   sendHandler()
    // }, [])

    const handleSignIn = async () => {
      try {
        await signIn("google");
      } catch (error) {
        if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error("Google Sign-In Error:", error);
        alert("An error occurred during sign-in. Please try again.");
      }
    };

    useEffect(() => {
      const sendIdTokenToBackend = async () => {
        if (session?.idToken) {
          try {
            const response = await axiosKonsumeInstance.post('/api/auth/google-login', {
              tokenId: session.idToken,
            }, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
  
            console.log('Backend Response:', response.data);
            toast.success(`Welcome back ${response.data.value.fullName}👨‍🍳!`);
      // Set user-specific cookies after successful login
      Cookies.set('ktn', response.data.token);
      Cookies.set('userid', response.data.value.id);
      localStorage.setItem('konsumeUsername', response.data.value.fullName);
            await checkUser(router);
            // Redirect to the dashboard
            // router.push('/dashboard');
          } catch (error) {
            if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error('Error in backend call:', error);
          }
        }
        if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(session);
        
      };
  
      sendIdTokenToBackend();
    }, [session]);
  return (
    <div className='mt-6'>
      <Button
        className="bg-[#8DCF384D] p-[10px] border-2 max-w-[348.9px] w-full h-fit bottom-0 border-[#D6FBC4] rounded-[30px] text-desktop-highlight font-bold min-h-[52px]"
        type="submit"
      >
        Continue
      </Button>
      <div className="flex flex-col justify-between gap-8 mt-8">
        <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
        <Button
        onClick={handleSignIn}
          className="mx-auto p-[10px] h-full flex-[.7] border-2 md:w-[350px] w-full hover:bg-primary-bg-800 hover:text-white border-primary-bg-800 text-primarygtext rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
          type="button"
        >
          <Image src="/assets/google.png" width={32} height={32} alt='google' />
          Sign in with Google
        </Button>
      </div>
      <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
        Already have an account?{' '}
        <Link href="/auth/login" className="text-secondary">Login</Link>{' '}
      </div>
    </div>
  );
};
