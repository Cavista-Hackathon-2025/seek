'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { axiosKonsumeInstance } from '@/http/konsume';
import Header from '@/modules/auth/login/Header';
import LoginForm from '@/modules/auth/login/LoginForm';
import SocialLogin from '@/modules/auth/login/SocialLogin';
import Cookies from 'js-cookie';
import { z } from 'zod';
import SignUpLink from '@/modules/auth/login/SignUpLink';
import withoutAuth from '@/app/helpers/withoutAuth';
import { checkUser } from '@/services/auth.services';


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
      const { data } = await axiosKonsumeInstance.post('/api/auth/login', values, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.update(id, { render: `Welcome back ${data.value.fullName}👨‍🍳!`, type: "success", isLoading: false, autoClose: 2000 });
      // Set user-specific cookies after successful login
      Cookies.set('ktn', data.token);
      Cookies.set('userid', data.value.id);
      localStorage.setItem('konsumeUsername', data.value.fullName);
      checkUser(router);
    } catch (error: any) {
      toast.update(id, { render: `Error logging you in😞`, type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  // const checkUser = async () => {
  //   // Check if the user's profile is complete

  //   try {
  //     const profileCheck = await AuthServices.CheckUserService();
  //   if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(profileCheck);
  //   if (profileCheck?.value) {
  //     // Retrieve and save profile data if found
  //     const profileId = await AuthServices.getProfileID(); // Assuming this is defined elsewhere
  //     const profileData = await AuthServices.getProfileData(profileId);

  //     if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(profileData);

  //     Cookies.set("age", profileData?.value?.age);
  //     Cookies.set("gender", profileData?.value?.gender);
  //     Cookies.set("weight", profileData?.value?.weight);
  //     Cookies.set("diet", profileData?.value?.dietType);
  //     Cookies.set("possibleDiseases", profileData?.value?.allergies.$values);
  //     Cookies.set("goal", profileData?.value?.userGoals.$values);

  //     router.push("/dashboard");
  //   } else {
  //     router.push("/setup-account");
  //   }
  //   } catch (error) {
  //     if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error(error);
  //   }
  // }
  return (
    <div className="font-satoshi flex flex-col gap-5 w-fit mx-auto pb-5 py-10 px-2 md:px-5">
      <Header />
      <LoginForm form={form} onSubmit={onSubmit} />
      <SocialLogin />
      <SignUpLink />
    </div>
  );
};

export default withoutAuth(Login)