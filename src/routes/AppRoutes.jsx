import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthCallbackPage from '../pages/AuthCallbackPage';
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ToDoPage from "../pages/ToDoPage";

const AppRoutes = () => {

  const { session, loading } = useAuth();
  
  console.log("Session in App:", session);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {
          session ? (
            <>
            {/* Protected Routes */}
              <Route path="/to-do" element={<ToDoPage />} />
              <Route path="/*" element={<Navigate to="/to-do" replace />} />
            </>
          ) : (
            <>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/*" element={<Navigate to="/" replace />} />
            </>
          )
        }
      </Routes>
  )
}

export default AppRoutes