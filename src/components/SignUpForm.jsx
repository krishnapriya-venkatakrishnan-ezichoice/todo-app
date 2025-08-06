import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';


function SignUpForm() {

  const { supabase } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/auth/callback",
        }
      });

      if (error) {
        setMessage(`Error signing up: ${error.message}`);
      } else {
        console.log('Sign up successful:', data);
        setMessage('Check your email for the confirmation link!');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error signing up:', error.message); 
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
    
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
          {loading ? "Signing up..." : "Sign Up With Credentials"}
        </Button>
        {message && (
          <Typography
          color={message.includes('Error') ? 'error.main' : 'success.main'}
          sx={{textAlign: 'center'}}
          >{message}</Typography>
        )}
      </Box>
    </Container>
  );
}

export default SignUpForm;