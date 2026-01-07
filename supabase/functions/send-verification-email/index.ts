import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  type: "signup" | "recovery" | "magiclink";
  redirectTo?: string;
}

const getEmailContent = (type: string, confirmationUrl: string, appName: string) => {
  const year = new Date().getFullYear();
  
  const templates: Record<string, { subject: string; html: string }> = {
    signup: {
      subject: `Welcome to ${appName} - Verify Your Email`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">${appName}</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Your Healthcare Career Platform</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #18181b;">Welcome aboard! 🎉</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #52525b;">
                Thank you for signing up. To complete your registration and start exploring opportunities, please verify your email address.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #ffffff; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);">
                      Verify My Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #71717a;">
                If you didn't create an account, you can safely ignore this email.
              </p>
              <div style="margin-top: 32px; padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #71717a;">If the button doesn't work, copy and paste this link:</p>
                <p style="margin: 0; font-size: 12px; word-break: break-all; color: #4f46e5;">${confirmationUrl}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; text-align: center; background-color: #fafafa; border-radius: 0 0 12px 12px; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">© ${year} ${appName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    },
    recovery: {
      subject: `${appName} - Reset Your Password`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">${appName}</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Your Healthcare Career Platform</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #18181b;">Reset Your Password 🔐</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #52525b;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #ffffff; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #71717a;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
              <div style="margin-top: 32px; padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #71717a;">If the button doesn't work, copy and paste this link:</p>
                <p style="margin: 0; font-size: 12px; word-break: break-all; color: #4f46e5;">${confirmationUrl}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; text-align: center; background-color: #fafafa; border-radius: 0 0 12px 12px; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">© ${year} ${appName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    },
    magiclink: {
      subject: `${appName} - Your Login Link`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Link</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">${appName}</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Your Healthcare Career Platform</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #18181b;">Login to Your Account ✨</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #52525b;">
                Click the button below to securely log in to your account.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #ffffff; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);">
                      Log In
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #71717a;">
                If you didn't request this link, you can safely ignore this email.
              </p>
              <div style="margin-top: 32px; padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #71717a;">If the button doesn't work, copy and paste this link:</p>
                <p style="margin: 0; font-size: 12px; word-break: break-all; color: #4f46e5;">${confirmationUrl}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; text-align: center; background-color: #fafafa; border-radius: 0 0 12px 12px; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">© ${year} ${appName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    },
  };

  return templates[type] || templates.signup;
};

const sendEmail = async (to: string, subject: string, html: string, appName: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `${appName} <onboarding@resend.dev>`,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send email");
  }

  return response.json();
};

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, redirectTo }: VerificationEmailRequest = await req.json();
    
    const appName = "Mammy Coker Hub";
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Generate the appropriate link based on type
    const baseRedirectTo = redirectTo || "https://dctvrcfdlkkvtprsojwl.lovableproject.com/auth";
    
    let linkResponse;
    
    if (type === "recovery") {
      // Use recovery link generation
      linkResponse = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email,
        options: {
          redirectTo: baseRedirectTo,
        },
      });
    } else if (type === "magiclink") {
      // Use magic link generation
      linkResponse = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
        options: {
          redirectTo: baseRedirectTo,
        },
      });
    } else {
      // For signup verification, we use invite link which sends email confirmation
      linkResponse = await supabaseAdmin.auth.admin.generateLink({
        type: "invite",
        email,
        options: {
          redirectTo: baseRedirectTo,
        },
      });
    }

    if (linkResponse?.error) {
      console.error("Error generating link:", linkResponse.error);
      throw new Error(linkResponse.error.message);
    }

    const confirmationUrl = linkResponse?.data?.properties?.action_link || "";
    
    if (!confirmationUrl) {
      throw new Error("Failed to generate confirmation URL");
    }

    const emailContent = getEmailContent(type, confirmationUrl, appName);

    console.log(`Sending ${type} email to ${email}`);

    const emailResponse = await sendEmail(email, emailContent.subject, emailContent.html, appName);

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
