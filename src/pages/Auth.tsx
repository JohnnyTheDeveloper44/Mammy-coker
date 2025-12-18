import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { Loader2 } from 'lucide-react';
import { loginSchema, signupSchema, resetPasswordSchema } from '@/lib/validations';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(searchParams.get('role') || 'professional');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      if (user.role === 'professional') {
        navigate('/dashboard/professional');
      } else if (user.role === 'employer') {
        navigate('/dashboard/employer');
      } else if (user.role === 'admin') {
        navigate('/dashboard/admin');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Welcome back!');
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ email, password, confirmPassword, role });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, role);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Account created! Redirecting to onboarding...');
    setLoading(false);

    if (role === 'professional') {
      navigate('/onboarding/professional');
    } else {
      navigate('/onboarding/employer');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = resetPasswordSchema.safeParse({ email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Password reset email sent!');
    setLoading(false);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Mammy Coker Hub" className="h-16 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="font-heading text-3xl font-bold mb-2">Welcome to Mammy Coker Hub</h1>
          <p className="text-muted-foreground">Your gateway to skilled professionals</p>
        </div>

        <Card className="p-6 card-shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="reset">Reset</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Login'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label>I am a</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      type="button"
                      variant={role === 'professional' ? 'hero' : 'outline'}
                      onClick={() => setRole('professional')}
                    >
                      Professional
                    </Button>
                    <Button
                      type="button"
                      variant={role === 'employer' ? 'hero' : 'outline'}
                      onClick={() => setRole('employer')}
                    >
                      Employer
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="reset">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
