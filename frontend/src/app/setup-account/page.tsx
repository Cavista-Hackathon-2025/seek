"use client"

import React, { useEffect, useState } from "react";
import Form from "@/modules/setup-account/Form";
import { useSetupContext } from "../../context/SetupContext";
import { useRouter } from "next/navigation";
import { axiosKonsumeInstance } from "../../http/konsume";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/modules/ProgressBar";
import MultiStepProgressBar from "@/modules/MultiStepProgressBar";
import withHigherAuth from "@/app/helpers/withHigherAuth";
import { useUserContext } from "@/context/UserContext";
import CreateProfileLoader from "@/components/animated-visual-cues/CreateProfileLoader";

const SetupAccount = () => {
  const {
    currentPage,
    userGoal,
    possibleDiseases,
    setPossibleDiseases,
    setUserGoal,
    age,
    nationality,
    gender,
    weight,
    diet,
    userSkin
  } = useSetupContext();
  const { username } = useUserContext();
  const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
  const [showLoader, setShowLoader] = useState(false);

  const MIN_DURATION = 5000; // 5 seconds
    const startTime = Date.now();

  useEffect(() => {
    setFirstName(username?.split(" ")[0] ?? "");
  }, [username]);
  useEffect(() => {
    setPossibleDiseases([]);
    setUserGoal("");
    Cookies.remove("possibleDiseases");
    Cookies.remove("userGoal");
  }, []);
  const route = useRouter();
  const submitForm = async () => {
    const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_DURATION - elapsedTime;
    setShowLoader(true);
    try {
      if (diet !== "") {
        await toast.promise(
          axiosKonsumeInstance.post(
            "/api/profile/create",
            {
              dateOfBirth: age,
              gender: gender,
              height: "2",
              weight: weight,
              nationality: nationality,
              bodyFat: "",
              dietType: diet,
              snackPreference: "",
              noOfMealPerDay: "",
              allergies: possibleDiseases,
              userGoals: [userGoal],
              skinType: userSkin
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("ktn")}`,
              },
              params: {
                userId: Cookies.get("userid"),
              },
            }
          ),
          {
            pending: "Processing...",
            success: `Profile created!👌`,
            error: `Failed to create your account profile🤯`,
          }
        );
        Cookies.set("age", age);
        Cookies.set("gender", gender);
        Cookies.set("diet", diet);
        Cookies.set("possibleDiseases", possibleDiseases);
        Cookies.set("goal", userGoal);
        route.push("/dashboard");
        if (remainingTime > 0) {
          setTimeout(() => {
            setShowLoader(false);
          }, remainingTime);
        } else {
          setShowLoader(false);
        }
      } else {
        setShowLoader(false)
        toast.error("Please select your diet");
        return;
      }
    } catch {
      toast.error("Error creating profile");
    }
  };
  const totalSteps = 5;
  return (
    <div className=" m-auto 2xl:p-32 md:py-20  md:px-32 py-20 px-4 md:bg-base-white bg-[white] relative ">
      {showLoader && <CreateProfileLoader texts={["Creating your profile...",
  "Analyzing your preferences...",
  "Curating personalized meal plans just for you...",
  "Finalizing your personalized profile experience..."
]} />}
      <Image
        src="/bg.png"
        alt="bg"
        width={1407}
        height={377}
        className=" top-0 absolute   w-full left-0 md:block hidden"
      />
      <Image
        src="/bg-mobile.png"
        alt="bg mobile"
        height={58.49}
        width={1053.92}
        className="absolute w-full h-full right-0  -rotate-[150] block md:hidden"
      />
      <div className=" px-3 py-5 md:py-14 md:px-11 font-satoshi bg-[#ffffffb5] relative z-10 backdrop-blur-lg ">
        <div className=" bg-[white] w-full h-full"></div>
        <Link
          href="/auth/login"
          className="flex gap-[10px] items-center cursor-pointer"
        >
          <Image
            src="/backbtn.png"
            alt="back"
            width={48.3}
            height={100}
            className="m-[3px] mb-4"
          />
        </Link>
        {/* <Steps /> */}
        <div className="relative">
          <div className="flex items-center">
            <div className="relative w-fit mx-auto">
              <Image
                src="/curved_line.svg"
                alt="curved line"
                height={500}
                width={282}
                className="2xl:w-[282px] lg:w-[250px] w-[123.16px] lg:h-auto h-[22px] absolute 2xl:top-5 bottom-0 md:top-auto top-0 my-auto 2xl:-right-[14px] right-0 -z-10"
              />
              <h1 className="lg:text-[48.9px]/[79.5px] text-[23px]/[40px] font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] z-50">
                Welcome onboard {firstName ? firstName : ""} !{" "}
              </h1>
            </div>
            <div className="md:block hidden">
              <ProgressBar currentStep={currentPage} totalSteps={totalSteps} />
            </div>
          </div>
          <p className=" md:text-[17.7px] text-[16px] text-center mt-1">
            Let&apos;s begin your personalised wellness Journey! To get started,
            please tell us a bit about yourself. Sign up for yourself
            <span className="hidden md:inline">
              <br />
            </span>
            and get personalized meal recommendations, progress tracking, and
            more.
          </p>
        </div>
        <div className="2xl:w-[413.93px] w-[271px] 2xl:h-[201.42px] h-[160px] rounded-[61469.42px] mx-auto bg-neutrals-100/70 fixed top-[180px] left-0 right-0 -z-10 blur-[170.6px]"></div>
        <div className="md:block hidden">
          <MultiStepProgressBar currentStep={currentPage} />
        </div>

        <Form />
        {currentPage == 5 && (
          <Button
            type="submit"
            className="mt-16 flex items-center justify-center mx-auto p-2 w-full md:w-[400px] h-[2.9rem] text-primary-bg-100 bg-primarygtext"
            onClick={submitForm}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default withHigherAuth(SetupAccount);
