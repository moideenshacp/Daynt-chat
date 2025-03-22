"use client";

import {
  Box,
  Paper,
  Typography,
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAuthForm } from "@/hooks/useAuthForm";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AuthFormProps {
  type: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    errors,
    generalError,
    successMessage,
    loading,
  } = useAuthForm(type);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (successMessage) {
      setOpen(true);
    }
  }, [successMessage]);
  return (
    <Container maxWidth="sm" sx={{ mt: 15, mb: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            {type === "signup" ? "Create Account" : "Sign In"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {type === "signup"
              ? "Join us today and have fun"
              : "Welcome back! Please sign in"}
          </Typography>
          {generalError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {generalError}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {type === "signup" && (
              <NameField
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
            )}
            <EmailField
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PasswordField
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <SubmitButton type={type} loading={loading} />
          </Box>
          {type === "signup" && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                style={{
                  textDecoration: "none",
                  color: "#002884",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Link>
            </Typography>
          )}
          {type === "signin" && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Don&#39;t you have an account?{" "}
              <Link
                href="/auth/signup"
                style={{
                  textDecoration: "none",
                  color: "#002884",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Link>
            </Typography>
          )}

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              variant="filled"
            >
              {successMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
