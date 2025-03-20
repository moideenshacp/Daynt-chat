

import { TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';


interface EmailFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
const EmailField:React.FC<EmailFieldProps> = ({ value, onChange,error }) => (
  <TextField
    fullWidth
    required
    name="email"
    label="Email Address"
    value={value}
    onChange={onChange}
    margin="normal"
    error={!!error} 
    helperText={error}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon color="action" />
        </InputAdornment>
      ),
    }}
    sx={{ mb: 2 }}
  />
);

export default EmailField;
