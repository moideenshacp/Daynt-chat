'use client';

import { Box, Paper, Typography, Container } from '@mui/material';
import { useAuthForm } from '@/hooks/useAuthForm';
import NameField from './NameField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';

interface AuthFormProps {
  type: 'signup' | 'signin';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { formData, handleChange, handleSubmit } = useAuthForm(type);
  
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            {type === 'signup' ? 'Create Account' : 'Sign In'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {type === 'signup' ? 'Join us today and have fun' : 'Welcome back! Please sign in'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {type === 'signup' && <NameField value={formData.name} onChange={handleChange} />}
            <EmailField value={formData.email} onChange={handleChange} />
            <PasswordField value={formData.password} onChange={handleChange} />
            <SubmitButton type={type} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
