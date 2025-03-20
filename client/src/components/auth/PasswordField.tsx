"use client";

import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

interface PasswordFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
const PasswordField:React.FC<PasswordFieldProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <TextField
      fullWidth
      required
      name="password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ mb: 3 }}
    />
  );
};

export default PasswordField;
