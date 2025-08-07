import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthCallbackPage  = () => {
  
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      if (session) {
        navigate('/to-do');
      } else {
        navigate('/sign-in');
      }
    }
  }, [loading, session, navigate]);

  if (loading) {
    return (
      <Box className="w-screen h-screen flex items-center justify-center gap-4">
        <CircularProgress sx={{ color: '#43a047' }} />
        <Typography>Confirming your email...</Typography>
      </Box>
    )
  }

  return null;
}

export default AuthCallbackPage 