import React, { createContext, useContext, useState, useEffect } from 'react';

// TODO: Supabase Integration - Authentication Setup
// 1. Import supabase client: import { supabase } from '@/integrations/supabase/client'
// 2. Import types: import { User, Session } from '@supabase/supabase-js'
// 3. Create 'profiles' table linked to auth.users
// 4. Create 'user_roles' table for role management (admin, professional, employer)
// 5. Set up trigger to create profile on user signup

interface User {
  id: string;
  email: string;
  role: 'professional' | 'employer' | 'admin';
  profile?: {
    name: string;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, role: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Connect to Supabase Auth
    // const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });
    
    // Simulate checking for existing session
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);

    // return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // TODO: Supabase Auth - signIn
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) return { error: error.message };
    // setUser(data.user);
    
    // Mock implementation
    const mockUser = {
      id: '1',
      email,
      role: 'professional' as const,
      profile: { name: 'John Doe' }
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return {};
  };

  const signUp = async (email: string, password: string, role: string) => {
    // TODO: Supabase Auth - signUp with emailRedirectTo
    // const redirectUrl = `${window.location.origin}/`;
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: redirectUrl,
    //     data: { role }
    //   }
    // });
    // if (error) return { error: error.message };
    
    // Mock implementation
    const mockUser = {
      id: Math.random().toString(),
      email,
      role: role as 'professional' | 'employer',
      profile: { name: email.split('@')[0] }
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return {};
  };

  const signOut = async () => {
    // TODO: Supabase Auth - signOut
    // await supabase.auth.signOut();
    
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const resetPassword = async (email: string) => {
    // TODO: Supabase Auth - resetPasswordForEmail
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${window.location.origin}/reset-password`,
    // });
    // if (error) return { error: error.message };
    
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
