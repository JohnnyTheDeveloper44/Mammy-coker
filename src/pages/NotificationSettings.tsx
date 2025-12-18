import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, MessageSquare, Briefcase, Star, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  newMessages: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
  reviews: boolean;
  marketing: boolean;
}

const NotificationSettings = () => {
  // TODO: Supabase Integration
  // 1. Create 'user_preferences' table: id, user_id, email_notifications, push_notifications, etc.
  // 2. Fetch on mount: supabase.from('user_preferences').select('*').eq('user_id', userId).single()
  // 3. Create default preferences on first visit if none exist
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    newMessages: true,
    jobAlerts: true,
    applicationUpdates: true,
    reviews: true,
    marketing: false,
  });

  const [saving, setSaving] = useState(false);

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: Supabase - Save preferences to database
    // await supabase.from('user_preferences').upsert({
    //   user_id: userId,
    //   email_notifications: preferences.emailNotifications,
    //   push_notifications: preferences.pushNotifications,
    //   new_messages: preferences.newMessages,
    //   job_alerts: preferences.jobAlerts,
    //   application_updates: preferences.applicationUpdates,
    //   reviews: preferences.reviews,
    //   marketing: preferences.marketing,
    // })
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Notification preferences saved');
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard/professional"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-2">Notification Settings</h1>
        <p className="text-muted-foreground mb-8">
          Choose how you want to be notified about activity
        </p>

        <div className="space-y-6">
          {/* General Settings */}
          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} />
              General
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email" className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={preferences.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push" className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch
                  id="push"
                  checked={preferences.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>
            </div>
          </Card>

          {/* Activity Notifications */}
          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="messages" className="text-base">New Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    When someone sends you a message
                  </p>
                </div>
                <Switch
                  id="messages"
                  checked={preferences.newMessages}
                  onCheckedChange={() => handleToggle('newMessages')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="applications" className="text-base">Application Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    When your application status changes
                  </p>
                </div>
                <Switch
                  id="applications"
                  checked={preferences.applicationUpdates}
                  onCheckedChange={() => handleToggle('applicationUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reviews" className="text-base">Reviews</Label>
                  <p className="text-sm text-muted-foreground">
                    When you receive a new review
                  </p>
                </div>
                <Switch
                  id="reviews"
                  checked={preferences.reviews}
                  onCheckedChange={() => handleToggle('reviews')}
                />
              </div>
            </div>
          </Card>

          {/* Job Alerts */}
          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={20} />
              Job Alerts
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="jobs" className="text-base">Job Matches</Label>
                  <p className="text-sm text-muted-foreground">
                    When new jobs match your skills
                  </p>
                </div>
                <Switch
                  id="jobs"
                  checked={preferences.jobAlerts}
                  onCheckedChange={() => handleToggle('jobAlerts')}
                />
              </div>
            </div>
          </Card>

          {/* Marketing */}
          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail size={20} />
              Marketing
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing" className="text-base">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Tips, offers, and updates about Mammy Coker Hub
                  </p>
                </div>
                <Switch
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={() => handleToggle('marketing')}
                />
              </div>
            </div>
          </Card>

          <Button variant="hero" onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
