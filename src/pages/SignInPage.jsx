import SignInForm from '../components/SignInForm'

const SignInPage = ({ handlePageChange }) => {
  return (
    <main className='w-screen h-screen flex items-center justify-center flex-col gap-4'>
      <SignInForm handlePageChange={handlePageChange} />
      <p>Don't have an account, <span className='underline cursor-pointer' onClick={() => handlePageChange('sign-up')}>Sign Up!</span></p>
    </main>
  )
}

export default SignInPage