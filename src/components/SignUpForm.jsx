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
import { useAuth } from '../context/AuthContext';

function SignUpForm() {
  const { supabase } = useAuth();
  const [username, setUsername] = useState('');
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
          data: { username }
        }
      });

      if (error) {
        setMessage(`Error signing up: ${error.message}`);
      } else {
        setMessage('Check your email for the confirmation link!');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%', p: 2, boxShadow: 3 }}>
        <CardHeader
          title="Create Account"
          subheader="Sign up to start organizing your tasks"
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
              label="Username"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
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
              helperText="At least 6 characters"
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
              {loading ? "Signing up..." : "Sign Up"}
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

export default SignUpForm;