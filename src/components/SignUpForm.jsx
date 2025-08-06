import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';


function SignUpForm({ handlePageChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { password, email });
    // You would typically send this data to an API here
    handlePageChange('to-do'); // Redirect to To-Do page after sign-up
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="xs">
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          mt: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          required
        />
        <Button variant="contained" type="submit"
        sx={{
          backgroundColor: '#43a047',
          '&:hover': { backgroundColor: '#2e7031' }
        }}>
          Sign Up With Credentials
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpForm;