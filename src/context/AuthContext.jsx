import { createClient } from '@supabase/supabase-js';

import { createContext, useContext, useEffect, useState } from 'react';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const url = import.meta.env.VITE_SUPABASE_REDIRECT_URL || 'http://localhost:5173';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      });

    return () => subscription.unsubscribe();
  }, []);
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error)
        throw new Error('Error signing out:', error.message);
    } catch (error) {
      throw new Error('Sign out failed:', error.message);
    }
  }

  const signUp = async (username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${url}/auth/callback`,
          data: { username }
        }
      });
      
      if (error)
        throw new Error('Error signing up: ', error.message);
    } catch (error) {
      throw new Error('Sign up functionality is not implemented yet.', error.message);
    }
  }

  const signInWithPassword = async(email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error)
        throw new Error('Error signing in: ', error.message);
    } catch (error) {
      throw new Error('An unexpected error occurred. Please try again later.', error.message);
    }
  }

  const signInWithOAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${url}/auth/callback`,
        }
      });

      if (error)
        throw new Error('Error signing in with Google: ', error.message);
    } catch (error) {
      throw new Error('An unexpected error occurred. Please try again later.', error.message);
    }
  }

  const value = { supabase, session, loading, signOut, signUp, signInWithPassword, signInWithOAuth };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
}
