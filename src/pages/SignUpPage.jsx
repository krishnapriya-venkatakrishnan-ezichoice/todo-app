import SignUpForm from '../components/SignUpForm'

const SignUpPage = ({ handlePageChange }) => {
  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <SignUpForm handlePageChange={handlePageChange} />
    </main>
  )
}

export default SignUpPage