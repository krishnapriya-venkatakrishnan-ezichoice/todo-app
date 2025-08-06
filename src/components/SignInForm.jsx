import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignInForm() {

  const { supabase } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      }
    });

    if (error) {
      setMessage(`Error signing in with Google: ${error.message}`);
    } else {
      console.log('Redirecting to Google sign-in', data);
      setMessage('Redirecting to Google sign-in...');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(`Error signing in: ${error.message}`);
      } else {
        console.log('Sign in successful:', data);
        setMessage('Sign in successful! Redirecting...');
        setEmail('');
        setPassword('');
        navigate('/to-do');
      }
    } catch (error) {
      console.error('Error signing in:', error.message); 
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
          {loading ? "Signing in..." : "Sign In With Credentials"}
        </Button>
        <Button variant="contained" onClick={handleSignInWithGoogle} disabled={loading}
        sx={{
          backgroundColor: '#4285f4',
          '&:hover': { backgroundColor: '#3c79da' }
        }}>
          Sign In With Google
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

export default SignInForm;