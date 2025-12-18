import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowLeft, Briefcase, MapPin, Clock, Building, DollarSign, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PaginationControls from '@/components/ui/PaginationControls';
import { usePagination } from '@/hooks/usePagination';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

// TODO: Supabase Integration - Fetch applications
// 1. Create 'applications' table: id, job_id, professional_id, status, cover_letter, applied_at
// 2. Enable RLS for user-specific access
// 3. Fetch with join:
//    const { data } = await supabase
//      .from('applications')
//      .select('*, jobs(title, company, location, salary, type)')
//      .eq('professional_id', user.id)
//      .order('applied_at', { ascending: false })

const ProfessionalApplications = () => {
  const { toast } = useToast();
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobId: '101',
      jobTitle: 'Experienced Carpenter Needed',
      company: 'ABC Construction',
      location: 'Freetown',
      salary: '3,000-5,000 Le/month',
      type: 'Full-time',
      appliedDate: '2024-01-15',
      status: 'pending',
    },
    {
      id: '2',
      jobId: '102',
      jobTitle: 'Licensed Electrician',
      company: 'PowerTech Solutions',
      location: 'Bo',
      salary: '4,000-6,000 Le/month',
      type: 'Full-time',
      appliedDate: '2024-01-12',
      status: 'reviewed',
    },
    {
      id: '3',
      jobId: '103',
      jobTitle: 'Master Carpenter',
      company: 'Premium Woodworks',
      location: 'Freetown',
      salary: '6,000-8,000 Le/month',
      type: 'Full-time',
      appliedDate: '2024-01-10',
      status: 'accepted',
    },
    {
      id: '4',
      jobId: '104',
      jobTitle: 'Construction Foreman',
      company: 'BuildTech Ltd',
      location: 'Kenema',
      salary: '5,000-7,000 Le/month',
      type: 'Contract',
      appliedDate: '2024-01-08',
      status: 'rejected',
    },
    {
      id: '5',
      jobId: '105',
      jobTitle: 'Plumbing Specialist',
      company: 'WaterWorks Ltd',
      location: 'Makeni',
      salary: '3,500-5,500 Le/month',
      type: 'Full-time',
      appliedDate: '2024-01-05',
      status: 'pending',
    },
  ]);

  const { currentPage, totalPages, paginatedItems, goToPage, hasNextPage, hasPrevPage } = usePagination({
    items: applications,
    itemsPerPage: 5,
  });

  const handleWithdraw = (applicationId: string) => {
    // TODO: Supabase - Delete application
    // await supabase.from('applications').delete().eq('id', applicationId)
    setApplications(prev => prev.filter(app => app.id !== applicationId));
    toast({
      title: 'Application Withdrawn',
      description: 'Your application has been withdrawn successfully.',
    });
  };

  const getStatusBadge = (status: Application['status']) => {
    const variants: Record<Application['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'secondary', label: 'Pending' },
      reviewed: { variant: 'outline', label: 'Under Review' },
      accepted: { variant: 'default', label: 'Accepted' },
      rejected: { variant: 'destructive', label: 'Rejected' },
    };
    return variants[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/professional" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">
            Track the status of your job applications
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{applications.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {applications.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {applications.filter(a => a.status === 'accepted').length}
            </div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {applications.filter(a => a.status === 'rejected').length}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </Card>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Card className="p-12 text-center">
            <Briefcase className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-heading text-xl font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start applying to jobs to see your applications here
            </p>
            <Link to="/jobs">
              <Button variant="hero">Browse Jobs</Button>
            </Link>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedItems.map((application) => {
                const statusInfo = getStatusBadge(application.status);
                return (
                  <Card key={application.id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading text-xl font-semibold">
                              {application.jobTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <Building size={14} />
                              <span>{application.company}</span>
                            </div>
                          </div>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            {application.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {application.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            Applied {formatDate(application.appliedDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2">
                        <Link to={`/jobs/${application.jobId}`} className="flex-1 md:flex-initial">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Eye size={14} />
                            View Job
                          </Button>
                        </Link>
                        {application.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleWithdraw(application.id)}
                            className="flex-1 md:flex-initial text-destructive hover:text-destructive gap-1"
                          >
                            <X size={14} />
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalApplications;