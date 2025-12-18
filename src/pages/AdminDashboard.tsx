import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, Briefcase, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const AdminDashboard = () => {
  // TODO: Fetch admin statistics from Supabase
  const stats = {
    totalUsers: 2547,
    totalProfessionals: 1823,
    totalEmployers: 724,
    activeJobs: 156,
    pendingVerifications: 23,
    totalRevenue: '1,250,000 Le',
  };

  // TODO: Fetch recent users from Supabase users table
  const recentUsers = [
    { id: '1', name: 'Ibrahim Kamara', role: 'Professional', status: 'Active', joined: '2024-01-15' },
    { id: '2', name: 'ABC Construction', role: 'Employer', status: 'Active', joined: '2024-01-14' },
    { id: '3', name: 'Fatmata Sesay', role: 'Professional', status: 'Pending', joined: '2024-01-13' },
  ];

  // TODO: Fetch pending verifications from Supabase
  const pendingVerifications = [
    { id: '1', user: 'Mohamed Bangura', type: 'Certificate', submitted: '2 days ago' },
    { id: '2', user: 'BuildCo Ltd', type: 'Business License', submitted: '4 days ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Mammy Coker Hub" className="h-10 w-auto" />
              <span className="font-heading font-bold text-lg">
                Admin Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Reports</Button>
              <Button variant="ghost">Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Platform Overview</h1>
          <p className="text-muted-foreground">Monitor and manage the Mammy Coker Hub platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Users</span>
              <Users className="text-primary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold mb-1">{stats.totalUsers}</div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{stats.totalProfessionals} Professionals</span>
              <span>{stats.totalEmployers} Employers</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Active Jobs</span>
              <Briefcase className="text-secondary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold mb-1">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Pending Verifications</span>
              <AlertTriangle className="text-accent" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold mb-1">{stats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Platform Revenue</span>
              <DollarSign className="text-primary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold mb-1">{stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Growth Rate</span>
              <TrendingUp className="text-secondary" size={20} />
            </div>
            <div className="font-heading text-3xl font-bold mb-1">+18%</div>
            <p className="text-xs text-muted-foreground">Month over month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">System Status</span>
              <CheckCircle className="text-primary" size={20} />
            </div>
            <div className="font-heading text-2xl font-bold mb-1">Operational</div>
            <p className="text-xs text-muted-foreground">All systems running</p>
          </Card>
        </div>

        {/* Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-semibold">Recent Users</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* TODO: Fetch from Supabase users table with pagination */}
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-semibold">Pending Verifications</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {pendingVerifications.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.user}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                      <p className="text-xs text-muted-foreground">Submitted {item.submitted}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="hero">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  </div>
                </Card>
              ))}
              {/* TODO: Fetch from Supabase pending verification queue */}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-heading text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">User Management</h3>
                  <p className="text-xs text-muted-foreground">Manage all users</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Briefcase className="text-secondary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Job Management</h3>
                  <p className="text-xs text-muted-foreground">Review job postings</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <AlertTriangle className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Reports Center</h3>
                  <p className="text-xs text-muted-foreground">Review user reports</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-xs text-muted-foreground">View detailed stats</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
