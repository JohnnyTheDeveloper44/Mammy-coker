import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  prompt: string;
  context?: string;
  type?: 'general' | 'job-match' | 'profile-suggestion' | 'cover-letter';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context, type = 'general' }: AIRequest = await req.json();

    console.log('AI Assistant request:', { type, promptLength: prompt.length });

    let systemPrompt = '';
    switch (type) {
      case 'job-match':
        systemPrompt = `You are a job matching assistant for Mammy Coker Hub, a platform connecting skilled professionals with employers in Sierra Leone. 
        Analyze the user's skills and experience to suggest the best job matches. Be concise and helpful.`;
        break;
      case 'profile-suggestion':
        systemPrompt = `You are a career advisor for Mammy Coker Hub. Help professionals improve their profiles to attract more employers. 
        Provide specific, actionable suggestions for their bio, skills, and portfolio.`;
        break;
      case 'cover-letter':
        systemPrompt = `You are a professional writing assistant. Help users write compelling cover letters for job applications. 
        Keep the tone professional but personable, and highlight relevant skills.`;
        break;
      default:
        systemPrompt = `You are a helpful assistant for Mammy Coker Hub, a platform connecting skilled professionals with employers in Sierra Leone. 
        Answer questions about finding jobs, hiring professionals, and using the platform.`;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    if (context) {
      messages.push({ role: 'user', content: `Context: ${context}` });
    }
    
    messages.push({ role: 'user', content: prompt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in ai-assistant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
