// TODO: Import Supabase client when backend is connected
// import { supabase } from '@/lib/supabase';

/**
 * Authentication Service
 * All functions here are prepared for Supabase integration
 */

export const authService = {
  /**
   * Sign in with email and password
   * TODO: Connect to Supabase
   * Example: const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   */
  signIn: async (email: string, password: string) => {
    // Mock implementation
    console.log('TODO: Supabase signIn', { email, password });
    return { user: null, error: null };
  },

  /**
   * Sign up new user
   * TODO: Connect to Supabase with emailRedirectTo
   * Example:
   * const { data, error } = await supabase.auth.signUp({
   *   email,
   *   password,
   *   options: {
   *     emailRedirectTo: `${window.location.origin}/`,
   *     data: { role }
   *   }
   * });
   */
  signUp: async (email: string, password: string, role: string) => {
    // Mock implementation
    console.log('TODO: Supabase signUp', { email, password, role });
    return { user: null, error: null };
  },

  /**
   * Sign out current user
   * TODO: Connect to Supabase
   * Example: await supabase.auth.signOut();
   */
  signOut: async () => {
    // Mock implementation
    console.log('TODO: Supabase signOut');
    return { error: null };
  },

  /**
   * Send password reset email
   * TODO: Connect to Supabase
   * Example:
   * await supabase.auth.resetPasswordForEmail(email, {
   *   redirectTo: `${window.location.origin}/reset-password`,
   * });
   */
  resetPassword: async (email: string) => {
    // Mock implementation
    console.log('TODO: Supabase resetPassword', { email });
    return { error: null };
  },

  /**
   * Get current session
   * TODO: Connect to Supabase
   * Example: const { data: { session } } = await supabase.auth.getSession();
   */
  getSession: async () => {
    // Mock implementation
    console.log('TODO: Supabase getSession');
    return { session: null, error: null };
  },

  /**
   * Listen to auth state changes
   * TODO: Connect to Supabase
   * Example:
   * supabase.auth.onAuthStateChange((event, session) => {
   *   callback(event, session);
   * });
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Mock implementation
    console.log('TODO: Supabase onAuthStateChange listener');
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};
