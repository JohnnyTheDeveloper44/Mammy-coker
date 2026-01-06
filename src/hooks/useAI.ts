import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type AIRequestType = 'general' | 'job-match' | 'profile-suggestion' | 'cover-letter';

interface UseAIOptions {
  type?: AIRequestType;
  context?: string;
}

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAI = async (prompt: string, options: UseAIOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt,
          type: options.type || 'general',
          context: options.context,
        },
      });

      if (fnError) throw fnError;
      
      return data.response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get AI response';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getJobMatches = async (skills: string[], experience: string) => {
    const context = `Skills: ${skills.join(', ')}. Experience: ${experience}`;
    return askAI('Based on my skills and experience, what types of jobs would be a good match for me?', {
      type: 'job-match',
      context,
    });
  };

  const getProfileSuggestions = async (currentBio: string, skills: string[]) => {
    const context = `Current bio: ${currentBio}. Skills: ${skills.join(', ')}`;
    return askAI('How can I improve my professional profile to attract more employers?', {
      type: 'profile-suggestion',
      context,
    });
  };

  const generateCoverLetter = async (jobTitle: string, company: string, skills: string[]) => {
    const context = `Job: ${jobTitle} at ${company}. My skills: ${skills.join(', ')}`;
    return askAI('Write a compelling cover letter for this job application.', {
      type: 'cover-letter',
      context,
    });
  };

  return {
    askAI,
    getJobMatches,
    getProfileSuggestions,
    generateCoverLetter,
    loading,
    error,
  };
};
