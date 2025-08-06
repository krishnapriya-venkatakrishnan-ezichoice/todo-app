import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <section className="min-w-xl border-2 border-green-700 shadow-2xl p-8 rounded-xl">
        <h1 className="text-center text-2xl font-medium">ORGANIZE</h1>
        <div className="text-center mt-4 flex flex-col gap-1">
          <h2>Plan your tasks, track your progress, and get things done!</h2>
          <h2>Welcome to your ultimate to-do list companion!</h2>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Stack direction="row" spacing={2}>
            <Button variant="contained"
            sx={{
              backgroundColor: '#43a047',
              '&:hover': { backgroundColor: '#2e7031' }
            }}
            onClick={() => navigate('/sign-in')}
            >Sign In</Button>
            <Button variant="contained"
            sx={{
              backgroundColor: '#43a047',
              '&:hover': { backgroundColor: '#2e7031' }
            }}
            onClick={() => navigate('/sign-up')}
            >Sign Up</Button>
          </Stack>
        </div>
      </section>
    </main>
  )
}

export default LandingPage