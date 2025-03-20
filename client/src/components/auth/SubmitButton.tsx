import { Button } from '@mui/material';
import React from 'react';

interface SubmitButtonProps  {
    type:string
}

const SubmitButton:React.FC<SubmitButtonProps> = ({ type }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ py: 1.5, bgcolor: '#002884', '&:hover': { bgcolor: '#3a59e0' }, fontWeight: 600 }}
  >
    {type === 'signup' ? 'Register Now' : 'Sign In'}
  </Button>
);

export default SubmitButton;
