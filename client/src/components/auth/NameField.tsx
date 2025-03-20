import { TextField, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface NameFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const NameField: React.FC<NameFieldProps> = ({ value, onChange ,error}) => (
  <TextField
    fullWidth
    required
    name="name"
    label="Full Name"
    value={value}
    onChange={onChange}
    margin="normal"
    error={!!error} 
    helperText={error}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon color="action" />
        </InputAdornment>
      ),
    }}
    sx={{ mb: 2 }}
  />
);

export default NameField;
