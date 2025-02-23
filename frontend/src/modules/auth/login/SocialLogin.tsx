'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, {useEffect} from 'react'
import { showConnect } from '@stacks/connect'
import { useUserSession } from '@/hooks/useUserSession'
import { useRouter } from 'next/navigation'
import { axiosKonsumeInstance } from '@/http/konsume'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'
import { AuthServices, checkUser } from '@/services/auth.services'

const SocialLogin = () => {
  // const loginWithStacks = () => {
  //   showConnect({
  //     appDetails: {
  //       name: 'Konsume',
  //       icon: window.location.origin + '/favicon.ico',
  //     },
  //     redirectTo: '/',
  //     onFinish: async () => {
  //       let userData = userSession.loadUserData();
  //       if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(userData);
  //       // const {data} = await axiosKonsumeInstance.post('/api/auth/login', userData, {
  //       //   headers: { 'Content-Type': 'multipart/form-data' },
  //       // })
  //       route.push('/dashboard')
  //     },
  //     userSession,
  //   });
  // }
  const { data: session } = useSession();
  const userSession = useUserSession();
  const router = useRouter()
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(session)
  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error("Google Sign-In Error:", error);
      alert("An error occurred during sign-in. Please try again.");
    }
  };

  // Handle the backend call once redirected back
  // useEffect(() => {
  //   const sendIdTokenToBackend = async () => {
  //     if (session && session.idToken) {
  //       try {
  //         const response = await axiosKonsumeInstance.post(
  //           '/api/auth/google-login',
  //           {
  //             tokenId: session.idToken,
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           }
  //         );
  
  //         if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log('Backend Response:', response.data);
  //         toast.success(`Welcome back ${response.data.value.fullName}👨‍🍳!`);
  
  //         // Set user-specific cookies after successful login
  //         Cookies.set('ktn', response.data.token);
  //         Cookies.set('userid', response.data.value.id);
  //         localStorage.setItem('konsumeUsername', response.data.value.fullName);
  
  //         await checkUser(router);
  //       } catch (error) {
  //         if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error('Error in backend call:', error);
  //       }
  //     }
  //   };
  
  //   // Only trigger the function if a valid session exists
  //   if (session && session.idToken) {
  //     sendIdTokenToBackend();
  //   }
  // }, [session, router]);
  

  return (
    <div className="flex flex-col justify-between gap-4 mt-4">
      <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
      <div className='flex flex-col gap-3 items-center h-full'>
      <Button className="mx-auto p-[10px] h-full flex-[.7] border-2 md:w-[350px] w-full hover:bg-primary-bg-800 hover:text-white border-primary-bg-800 text-primarygtext rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold" onClick={handleSignIn}>
        <Image src="/assets/google.png" width={32} height={32} alt='google' />
        Sign in with Google
      </Button>
      {/* <Button className="mx-auto p-[10px] h-full flex-[.7] border-2 md:w-[350px] w-full hover:bg-orange-400 hover:text-white border-orange-400 text-primarygtext rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold" onClick={() => loginWithStacks()}>
        <Image src="/stacks.svg" width={32} height={32} alt='stacks' />
        Sign in with Stacks Connect
      </Button> */}
      </div>
      {/* <button onClick={() => {
        signOut({ redirect: false })
      }
      }>Sign Out</button> */}
    </div>
  )
}

export default SocialLogin