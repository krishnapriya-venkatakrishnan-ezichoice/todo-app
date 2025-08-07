import { createClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("AuthContext useEffect mounted", import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
    // Define the handler function first.
    const handleAuthChange = async (event, currentSession) => 
    
      {
      console.log("AuthContext useEffect triggered with event:", event, "and session:", currentSession);
      try {
        setSession(currentSession);
      setProfile(null);
      setTasks([]);
      setIsAuthenticated(!!currentSession?.user?.email_confirmed_at);

      if (currentSession && currentSession.user.email_confirmed_at) {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentSession.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          const newProfile = {
            id: currentSession.user.id,
            username: currentSession.user.user_metadata.username || currentSession.user.user_metadata.name || currentSession.user.email,
          };
          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError.message);
          } else {
            setProfile(createdProfile);
          }
        } else if (profileData) {
          setProfile(profileData);
        } else {
          console.error('Error fetching profile:', profileError ? profileError.message : 'No data returned');
        }

        // Fetch tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", currentSession.user.id);
        
        if (tasksError) {
          console.error('Error fetching tasks:', tasksError.message);
        } else {
          setTasks(tasksData);
        }
      }
      } catch (err) {
        console.error('Auth handler error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Now, call the functions that use the handler.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    console.log("Before getSession");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("After getSession", session);
      handleAuthChange('INITIAL', session);
    }).catch((error) => {
    console.error('Error getting session:', error);
    setLoading(false);
  });

    return () => subscription.unsubscribe();
  }, []);

  const value = { supabase, session, loading, profile, tasks, isAuthenticated, setTasks };

  console.log("AuthContext value:", value);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};