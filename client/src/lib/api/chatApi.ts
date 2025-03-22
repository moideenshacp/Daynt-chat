import axios, { AxiosError } from "axios";

//fetch all message when loading
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


//upload file to cloudinary
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        process.env.NEXT_PUBLIC_CLOUDINARY_NAME
      }/upload`,
      formData
    );

    const fileUrl = response.data.secure_url;
    console.log(fileUrl,"filelllllllllllllllll");
    
    return fileUrl;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Something went wrong");
    } else {
      throw new Error("Network Error. Please try again.");
    }
  }
};
