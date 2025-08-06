import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthCallbackPage from '../pages/AuthCallbackPage';
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ToDoPage from "../pages/ToDoPage";

const RedirectToToDo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/to-do');
  }, [navigate]);

  return null;
}

const RedirectToLanding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

const AppRoutes = () => {

  const { supabase, session, loading } = useAuth();
  
  console.log("Session in App:", session);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
        <Route path="/auth/callback" element={<AuthCallbackPage supabase={supabase} />} />

        {
          session ? (
            <>
            {/* Protected Routes */}
              <Route path="/to-do" element={<ToDoPage />} />
              <Route path="/*" element={<RedirectToToDo />} />
            </>
          ) : (
            <>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/*" element={<RedirectToLanding />} />
            </>
          )
        }
      </Routes>
  )
}

export default AppRoutes