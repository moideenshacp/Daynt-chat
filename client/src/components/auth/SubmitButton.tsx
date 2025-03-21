import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface SubmitButtonProps {
  type: string;
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type, loading }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      py: 1.5,
      bgcolor: "#002884",
      "&:hover": { bgcolor: "#3a59e0" },
      fontWeight: 600,
    }}
  >
    {loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : type === "signup" ? (
      "Sign Up"
    ) : (
      "Sign In"
    )}
  </Button>
);

export default SubmitButton;
