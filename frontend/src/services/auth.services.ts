import { axiosKonsumeInstance } from "@/http/konsume";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


export class AuthServices {
    static BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

    static async  CheckUserService(){
        try {
            const response = await axiosKonsumeInstance.get('/api/profile/profileByUserId', {
                headers: {
                  Authorization: `Bearer ${Cookies.get('ktn')}`,
                },
                params: {
                  Userid: Cookies.get('userid'),
                },
              });           
              return response.data;
        } catch (error) {
            if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
            throw error;
        }
       
    }

    static async getProfileData(profileId: number| undefined) {
        try {
          const response = await axiosKonsumeInstance.get(`/api/profile/${profileId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("ktn")}`,
            },
          });
          return response.data;
        } catch (error) {
          if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error(error);
          throw error;
        }
    }

    static getProfileID = async (): Promise<number | undefined> => {
        try {
          
          const { data } = await axiosKonsumeInstance.get(`/api/Profile/ProfileByIdUserId`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("ktn")}`,
            },
            params: { 
              Userid: Cookies.get("userid")
             },
          });
          return data?.value;
        } catch (error) {
          // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
          
        }
      }
}

export const checkUser = async (router: ReturnType<typeof useRouter>) => {
    try {
      const profileCheck = await AuthServices.CheckUserService();
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(profileCheck);
  
      if (profileCheck?.value) {
        // Retrieve and save profile data if found
        const profileId = await AuthServices.getProfileID(); // Assuming this is defined elsewhere
        const profileData = await AuthServices.getProfileData(profileId);
  
        if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(profileData);
  
        Cookies.set("age", profileData?.value?.age);
        Cookies.set("gender", profileData?.value?.gender);
        Cookies.set("weight", profileData?.value?.weight);
        Cookies.set("diet", profileData?.value?.dietType);
        Cookies.set("possibleDiseases", profileData?.value?.allergies.$values);
        Cookies.set("goal", profileData?.value?.userGoals.$values);
  
        router.push("/dashboard");
      } else {
        router.push("/setup-account");
      }
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error("Error checking user:", error);
    }
  };