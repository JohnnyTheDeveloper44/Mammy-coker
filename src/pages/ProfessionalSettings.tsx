import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfessionalSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  // TODO: Fetch user settings from Supabase
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+232 76 123 456',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    // TODO: Update profile in Supabase
    // const { error } = await supabase
    //   .from('profiles')
    //   .update({ name, phone })
    //   .eq('user_id', user.id);
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  const handleChangePassword = () => {
    // TODO: Update password via Supabase Auth
    // const { error } = await supabase.auth.updateUser({
    //   password: formData.newPassword
    // });
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Password Changed',
      description: 'Your password has been updated successfully.',
    });
    
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    // TODO: Save notification preferences to Supabase
    // const { error } = await supabase
    //   .from('user_settings')
    //   .upsert({ user_id, email_notifications, job_alerts, message_notifications });
    
    toast({
      title: 'Settings Saved',
      description: 'Notification preferences updated.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/professional" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Settings</h1>

        {/* Profile Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-semibold">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground mt-1">Email cannot be changed</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Button onClick={handleSaveProfile} variant="hero">
              Save Profile
            </Button>
          </div>
        </Card>

        {/* Password Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-semibold">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <Button onClick={handleChangePassword} variant="hero">
              Update Password
            </Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about new job opportunities</p>
              </div>
              <Switch checked={jobAlerts} onCheckedChange={setJobAlerts} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Message Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts for new messages</p>
              </div>
              <Switch checked={messageNotifications} onCheckedChange={setMessageNotifications} />
            </div>

            <Button onClick={handleSaveNotifications} variant="hero" className="mt-4">
              Save Preferences
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalSettings;
