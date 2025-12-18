import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Briefcase, MessageSquare, Settings, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const EmployerDashboard = () => {
  // TODO: Fetch employer data from Supabase employers table
  const mockData = {
    company: {
      name: 'ABC Construction',
    },
    stats: {
      activeJobs: 5,
      totalApplicants: 28,
      savedProfessionals: 15,
    },
    recentJobs: [
      { id: '1', title: 'Senior Carpenter Needed', applicants: 8, posted: '3 days ago', status: 'Active' },
      { id: '2', title: 'Electrician for Commercial Project', applicants: 12, posted: '1 week ago', status: 'Active' },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1">
                <img src={logo} alt="Mammy Coker Hub" className="h-8 w-auto" />
              </div>
              <span className="font-heading font-bold text-lg hidden sm:block">
                Employer Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare size={20} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    2
                  </Badge>
                </Button>
              </Link>
              <Link to="/dashboard/employer/settings">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">
              Welcome, {mockData.company.name}!
            </h1>
            <p className="text-muted-foreground">Manage your jobs and find great talent</p>
          </div>
          <Link to="/dashboard/employer/create-job">
            <Button variant="hero" size="lg">
              <Plus className="mr-2" size={20} />
              Post a Job
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Active Jobs</span>
              <Briefcase className="text-primary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently hiring</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Applicants</span>
              <Users className="text-secondary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.totalApplicants}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all jobs</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Saved Professionals</span>
              <Star className="text-accent" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold">{mockData.stats.savedProfessionals}</div>
            <p className="text-xs text-muted-foreground mt-1">For future projects</p>
          </Card>
        </div>

        {/* Recent Jobs & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-semibold">Your Job Postings</h2>
              <Link to="/dashboard/employer/jobs">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.recentJobs.map((job) => (
                <Card key={job.id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {job.applicants} applicants
                        </span>
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/dashboard/employer/jobs/${job.id}/applicants`}>
                        <Button size="sm" variant="hero">View Applicants</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
              {/* TODO: Fetch jobs from Supabase jobs table where employer_id = current user */}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/professionals">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Find Professionals</h3>
                      <p className="text-sm text-muted-foreground">Search skilled workers</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/employer/saved">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Saved Professionals</h3>
                      <p className="text-sm text-muted-foreground">View bookmarked talent</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/messages">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Messages</h3>
                      <p className="text-sm text-muted-foreground">Chat with candidates</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/employer/create-job">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer group bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Post New Job</h3>
                      <p className="text-sm text-muted-foreground">Hire skilled professionals</p>
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

export default EmployerDashboard;
