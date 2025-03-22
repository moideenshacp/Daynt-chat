"use client";
import { useState } from "react";
import { registerUser, loginUser } from "@/lib/api/authApi";
import { authSchema, AuthSchemaType } from "@/lib/validation/signupValidation";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

export const useAuthForm = (type: "signup" | "signin") => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Partial<AuthSchemaType>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
    setGeneralError(null);
  };

  //handling signup -sign in
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);
    setLoading(true);

    try {
      if (type === "signup") {
        authSchema.parse(formData);
        const res = await registerUser(formData);
        if (res.status === 201) {
          setSuccessMessage("Registered successfully! Now login.");
          setTimeout(() => {
            router.push("/auth/signin");
          }, 1000);
        }
      } else {
        const res = await loginUser(formData);
        if (res.status === 200) {
          setSuccessMessage("Login successful!");
          dispatch(login({ user: res.data }));
          router.push("/chat");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        setErrors({
          name: formattedErrors.name?.[0] || "",
          email: formattedErrors.email?.[0] || "",
          password: formattedErrors.password?.[0] || "",
        });
      } else if (error instanceof Error) {
        setGeneralError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
    generalError,
    successMessage,
    loading,
  };
};
