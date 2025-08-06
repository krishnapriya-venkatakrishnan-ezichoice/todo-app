import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ToDoPage from './pages/ToDoPage';

const App = () => {
  const [page, setPage] = useState('to-do');

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const renderPage = () => {
    switch(page) {
      case "landing":
        return <LandingPage handlePageChange={handlePageChange} />;
      case "sign-up":
        return <SignUpPage handlePageChange={handlePageChange} />;
      case "sign-in":
        return <SignInPage handlePageChange={handlePageChange} />;
      case "to-do":
        return <ToDoPage handlePageChange={handlePageChange} />;
      default:
        return <LandingPage handlePageChange={handlePageChange} />;
    }
  }

  return (
    renderPage()
  )
}

export default App