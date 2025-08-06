import { Button, Card, CardContent, CardHeader, Container, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', boxShadow: 6, borderRadius: 4, p: 2 }}>
        <CardHeader
          title="ORGANIZE"
          titleTypographyProps={{
            align: 'center',
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: 2,
            color: '#43a047'
          }}
        />
        <Divider sx={{ mb: 2 }} />
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Plan your tasks, track your progress, and get things done!
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Welcome to your ultimate to-do list companion!
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#43a047',
                '&:hover': { backgroundColor: '#2e7031' },
                fontWeight: 600,
                px: 4
              }}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#43a047',
                color: '#43a047',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: '#2e7031',
                  color: '#2e7031',
                  backgroundColor: '#e8f5e9'
                }
              }}
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LandingPage;