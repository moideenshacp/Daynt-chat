import axios, { AxiosError } from "axios";

export const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/chat/fetchMessage`,
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