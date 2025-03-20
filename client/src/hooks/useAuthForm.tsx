import { useState } from 'react';
import { registerUser, loginUser } from '@/lib/api/authApi';

export const useAuthForm = (type: 'signup' | 'signin') => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "signup") await registerUser(formData);
    else await loginUser(formData);
  };

  return { formData, handleChange, handleSubmit };
};
