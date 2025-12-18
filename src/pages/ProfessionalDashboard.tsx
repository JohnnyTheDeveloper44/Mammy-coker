import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, MessageSquare, Settings, FileText, Award, TrendingUp, DollarSign, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const ProfessionalDashboard = () => {
  // TODO: Fetch user data from Supabase user table and professionals table
  const mockData = {
    profile: {
      name: 'John Doe',
      category: 'Carpentry',
      completeness: 85,
    },
    stats: {
      jobInvitations: 12,
      completedJobs: 45,
      earnings: '45,000 Le',
      rating: 4.8,
    },
    recentInvitations: [
      { id: '1', title: 'Kitchen Cabinet Installation', company: 'ABC Construction', date: '2 days ago' },
      { id: '2', title: 'Furniture Repair Project', company: 'HomeWorks Ltd', date: '5 days ago' },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Mammy Coker Hub" className="h-10 w-auto" />
              <span className="font-heading font-bold text-lg hidden sm:block">
                Professional Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare size={20} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </Link>
              <Link to="/dashboard/professional/settings">
                <Button variant="ghost" size="icon">
                  <Settings size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">
            Welcome back, {mockData.profile.name}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your profile today</p>
        </div>

        {/* Profile Completeness */}
        {mockData.profile.completeness < 100 && (
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold mb-1">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  {mockData.profile.completeness}% complete - Add more details to get noticed
                </p>
              </div>
              <Button variant="outline" size="sm">Complete Now</Button>
            </div>
            <Progress value={mockData.profile.completeness} className="h-2" />
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Job Invitations</span>
              <Briefcase className="text-primary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.jobInvitations}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 new this week</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Completed Jobs</span>
              <Award className="text-secondary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.completedJobs}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Earnings</span>
              <DollarSign className="text-accent" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.earnings}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Rating</span>
              <TrendingUp className="text-primary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.rating}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 32 reviews</p>
          </Card>
        </div>

        {/* Recent Invitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-semibold">Recent Job Invitations</h2>
              <Link to="/dashboard/professional/invitations">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.recentInvitations.map((invitation) => (
                <Card key={invitation.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{invitation.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{invitation.company}</p>
                      <span className="text-xs text-muted-foreground">{invitation.date}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="hero">View</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </div>
                </Card>
              ))}
              {/* TODO: Fetch job invitations from Supabase job_invitations table */}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/jobs">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Browse Jobs</h3>
                      <p className="text-sm text-muted-foreground">Find new opportunities</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/professional/applications">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ClipboardList className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">My Applications</h3>
                      <p className="text-sm text-muted-foreground">Track application status</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/professional/profile">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Edit Profile</h3>
                      <p className="text-sm text-muted-foreground">Update your information</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/professional/certificates">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Manage Certificates</h3>
                      <p className="text-sm text-muted-foreground">Add or update certificates</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/messages">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Messages</h3>
                      <p className="text-sm text-muted-foreground">Check your conversations</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
