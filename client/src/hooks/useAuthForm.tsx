import { useState } from "react";
import { registerUser, loginUser } from "@/lib/api/authApi";
import { authSchema, AuthSchemaType } from "@/lib/api/signupValidation";
import { ZodError } from "zod";

export const useAuthForm = (type: "signup" | "signin") => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<AuthSchemaType>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors({})
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      authSchema.parse(formData);

      if (type === "signup") await registerUser(formData);
      else await loginUser(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        setErrors({
          name: formattedErrors.name?.[0] || "",
          email: formattedErrors.email?.[0] || "",
          password: formattedErrors.password?.[0] || "",
        });
      }
    }

    console.log("formdata", formData);
  };

  return { formData, handleChange, handleSubmit, errors };
};
