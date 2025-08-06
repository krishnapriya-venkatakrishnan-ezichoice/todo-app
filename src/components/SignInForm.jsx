import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
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
    setLoading(true);
    setMessage('');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      }
    });

    if (error) {
      setMessage(`Error signing in with Google: ${error.message}`);
    } else {
      setMessage('Redirecting to Google sign-in...');
    }
    setLoading(false);
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
        setMessage('Sign in successful! Redirecting...');
        setEmail('');
        setPassword('');
        navigate('/to-do');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm" sx={{ py: '6', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%', p: 2, boxShadow: 3 }}>
        <CardHeader
          title="Sign In"
          subheader="Access your to-do list"
          titleTypographyProps={{ align: 'center', fontWeight: 700, fontSize: 28 }}
          subheaderTypographyProps={{ align: 'center' }}
        />
        <Divider sx={{ mb: 2 }} />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
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
              required
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
            />
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#43a047',
                '&:hover': { backgroundColor: '#2e7031' },
                fontWeight: 600,
                fontSize: 16,
                py: 1.5,
              }}
            >
              {loading ? "Signing in..." : "Sign In With Credentials"}
            </Button>
            <Button
              variant="contained"
              onClick={handleSignInWithGoogle}
              disabled={loading}
              sx={{
                backgroundColor: '#4285f4',
                '&:hover': { backgroundColor: '#3c79da' },
                fontWeight: 600,
                fontSize: 16,
                py: 1.5,
              }}
            >
              Sign In With Google
            </Button>
            {message && (
              <Alert
                severity={message.includes('Error') ? 'error' : 'success'}
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {message}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignInForm;