'use client'
import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { axiosKonsumeInstance } from "@/http/konsume";
import { usePathname } from "next/navigation";
import { formatDateToDDMMYY } from "@/app/helpers/formatDateToDDMMYY";

interface UserContextProps {
  username: string;
    email: string;
    nationality: string;
    setNationality?: React.Dispatch<React.SetStateAction<string>>;
    userGoals: any;
    setUserGoals?:  React.Dispatch<React.SetStateAction<any>>;
    allergies: any;
    setAllergies?: React.Dispatch<React.SetStateAction<any>>;
    DOB: string;
    weight?: number;
    setWeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
    gender: string;
    setGender?: React.Dispatch<React.SetStateAction<string>>
    dietType: string;
    setDietType?: React.Dispatch<React.SetStateAction<string>>;
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
    updating: boolean;
    setDOB?: React.Dispatch<React.SetStateAction<string>>;
    streakCount: number;
    profileID: number | undefined;
    getProfileDetails: () => void;
    getProfileID: () => Promise<number | undefined>;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number>();
  const [dietType, setDietType] = useState("");
  const [DOB, setDOB] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState(0);
  const [profileID, setProfileID] = useState<number | undefined>();
  const pathname = usePathname();
  const getUserDetails = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(
        `/api/users/users/${Cookies.get("userid")}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("ktn")}`,
          },
          params: {
            id: Cookies.get("userid"),
          },
        }
      );

      if (data) {
        setUsername(data.fullName);
        setEmail(data.email);

        if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(username);
      } else {
        setUsername("");
      }
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(data);
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
      setUsername("");
    }
  };
  const getProfileDetails = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(
        `/api/Profile/${await getProfileID()}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("ktn")}`,
          },
          params: {
            id: await getProfileID(),
          },
        }
      );
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(data);
      const formattedDate = formatDateToDDMMYY(data.value.dateOfBirth);
      setNationality(data.value.nationality);
      setWeight(data.value.weight);
      if (data.value.gender == 1) {
        setGender("Male");
      } else {
        setGender("Female");
      }
      setDietType(data.value.dietType);
      setUserGoals(data.value.userGoals.$values);
      setAllergies(data.value.allergies.$values);
      setDOB(formattedDate);
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(userGoals);
      
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
    }
  };
  const getStreakCount = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(`/api/Streak/GetStreakCount/${await getProfileID()}`, {
        params: { 
          profileId: await getProfileID()
         },
      });
      setStreakCount(data.streakCount)
      // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(data);
      // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(streakCount);
      
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
      
    }
  }
  const getProfileID = async (): Promise<number | undefined> => {
    try {
      
      const { data } = await axiosKonsumeInstance.get(`/api/Profile/ProfileByIdUserId`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ktn")}`,
        },
        params: { 
          Userid: Cookies.get("userid")
         },
      });
      setProfileID(data?.value);
      // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(data?.value);
      return data?.value;
    } catch (error) {
      // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.log(error);
      
    }
  }

  useEffect(() => {
    if (pathname !== "/auth/login") {
      Promise.all([getUserDetails(), getProfileID()]).then(() =>
        Promise.all([getProfileDetails(), getStreakCount()])
      );
    }
  }, [pathname]);
  
  return (
    <UserContext.Provider
      value={{
        username,
        email,
        nationality,
        setNationality,
        allergies,
        setAllergies,
        userGoals,
        setUserGoals,
        gender,
        setGender,
        weight,
        setWeight,
        dietType,
        setDietType,
        DOB,
        setDOB,
        setUpdating,
        updating,
        streakCount,
        profileID,
        getProfileDetails,
        getProfileID
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvideProps");
  }
  return context;
};
