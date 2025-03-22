import { Isignin } from "@/interface/IsignIn";
import { Isignup } from "@/interface/IsignUp";
import axios, { AxiosError } from "axios";

//register
export const registerUser = async (formData: Isignup) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/signup`,
      {
        formData,
      },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Something went wrong");
    } else {
      throw new Error("Network Error. Please try again.");
    }
  }
};

//login
export const loginUser = async (formData: Isignin) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/signin`,
      {
        formData,
      },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Something went wrong");
    } else {
      throw new Error("Network Error. Please try again.");
    }
  }
};
