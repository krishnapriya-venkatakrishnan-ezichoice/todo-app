import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

const SignInPage = () => {
  const navigate = useNavigate();
  
  return (
    <main className='w-screen h-screen flex items-center justify-center flex-col gap-4'>
      <SignInForm />
      <p>Don't have an account, <span className='underline cursor-pointer' onClick={() => navigate('/sign-up')}>Sign Up!</span></p>
    </main>
  )
}

export default SignInPage