'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { z } from 'zod';
import SignUpLink from '@/components/auth/login/SignUpLink';
import LoginForm from '@/components/auth/login/LoginForm';
import { toast } from 'react-toastify';
import Banner from '@/components/shared/banner';

// Schema for form validation using zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Clear session-related cookies when the component mounts
    const sessionCookies = ['age', 'gender', 'height', 'diet', 'possibleDiseases', 'goal'];
    sessionCookies.forEach((cookie) => Cookies.remove(cookie));
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission and login
    const id = toast.loading("Processing...")
    try {
      // const { data } = await axiosKonsumeInstance.post('/api/auth/login', values, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // })
      // toast.update(id, { render: `Welcome back ${data.value.fullName}👨‍🍳!`, type: "success", isLoading: false, autoClose: 2000 });
      // // Set user-specific cookies after successful login
      // Cookies.set('ktn', data.token);
      // Cookies.set('userid', data.value.id);
      // localStorage.setItem('konsumeUsername', data.value.fullName);
      checkUser();
    } catch (error: any) {
      toast.update(id, { render: `Error logging you in😞`, type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  const checkUser = async () => {
    // Check if the user's profile is complete

    try {
      const resp = await axiosKonsumeInstance.get('/api/profile/profileByUserId', {
        headers: {
          Authorization: `Bearer ${Cookies.get('ktn')}`,
        },
        params: {
          Userid: Cookies.get('userid'),
        },
      });
      console.log(resp);
      if (resp.data.value) {
        //save profile data when found
        const profileId = await getProfileID()
        const { data } = await axiosKonsumeInstance.get(`/api/profile/${profileId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('ktn')}`,
          },
        });
        console.log(data);

        Cookies.set('age', data?.value?.age);
        Cookies.set('gender', data?.value?.gender);
        Cookies.set('weight', data?.value?.weight);
        Cookies.set('diet', data?.value?.dietType);
        Cookies.set('possibleDiseases', data?.value?.allergies.$values);
        Cookies.set('goal', data?.value?.userGoals.$values);
        console.log(data);
        router.push('/dashboard');
      } else {
        router.push('/setup-account');
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="satoshi flex flex-col gap-5 w-fit mx-auto pb-5 py-10 px-2 md:px-5">
      <div className="mx-auto w-fit left-0 right-0 -top-32 absolute">
                <Banner text="Welcome Back" />
            </div>
      <h3 className='text-[22px] font-bold mt-52'>
      Seek better choices, every day. </h3>
        <p className="text-[18px] font-medium">Welcome back! Let&apos;s analyze together.</p>
      <LoginForm form={form} onSubmit={onSubmit} />
      {/* <SocialLogin /> */}
      <SignUpLink />
    </div>
  );
};

export default (Login)