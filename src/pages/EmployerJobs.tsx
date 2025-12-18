import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, DollarSign, Users, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmployerJobs = () => {
  const { toast } = useToast();

  // TODO: Fetch employer's jobs from Supabase
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Experienced Carpenter Needed',
      category: 'Carpentry',
      location: 'Freetown',
      salary: '3,000-5,000 Le/month',
      type: 'Full-time',
      status: 'active',
      applicants: 12,
      posted: '2024-01-15',
    },
    {
      id: '2',
      title: 'Licensed Electrician',
      category: 'Electrical',
      location: 'Bo',
      salary: '4,000-6,000 Le/month',
      type: 'Full-time',
      status: 'active',
      applicants: 8,
      posted: '2024-01-10',
    },
    {
      id: '3',
      title: 'Plumbing Specialist',
      category: 'Plumbing',
      location: 'Kenema',
      salary: '3,500-5,500 Le/month',
      type: 'Contract',
      status: 'closed',
      applicants: 15,
      posted: '2024-01-05',
    },
  ]);

  const handleDeleteJob = (id: string) => {
    // TODO: Delete job from Supabase
    // await supabase.from('jobs').delete().eq('id', id);

    setJobs(jobs.filter(job => job.id !== id));
    toast({
      title: 'Job Deleted',
      description: 'The job listing has been removed.',
    });
  };

  const handleToggleStatus = (id: string) => {
    // TODO: Update job status in Supabase
    // await supabase.from('jobs')
    //   .update({ status: newStatus })
    //   .eq('id', id);

    setJobs(jobs.map(job =>
      job.id === id
        ? { ...job, status: job.status === 'active' ? 'closed' : 'active' }
        : job
    ));

    toast({
      title: 'Job Updated',
      description: 'Job status has been changed.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/employer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl font-bold">My Job Postings</h1>
          <Link to="/dashboard/employer/create-job">
            <Button variant="hero">
              <Plus size={16} className="mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <Card className="p-12 text-center">
            <h3 className="font-heading text-xl font-semibold mb-2">No Jobs Posted Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first job posting to start finding qualified professionals
            </p>
            <Link to="/dashboard/employer/create-job">
              <Button variant="hero">Post Your First Job</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="font-heading text-2xl font-semibold mb-2">{job.title}</h2>
                        <div className="flex flex-wrap gap-2">
                          <Badge>{job.category}</Badge>
                          <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                            {job.status === 'active' ? 'Active' : 'Closed'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {job.applicants} applicants
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Posted: {new Date(job.posted).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <Link to={`/dashboard/employer/jobs/${job.id}/applicants`} className="flex-1 lg:flex-initial">
                      <Button variant="hero" className="w-full">
                        View Applicants ({job.applicants})
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 lg:flex-initial"
                      onClick={() => handleToggleStatus(job.id)}
                    >
                      {job.status === 'active' ? 'Close Job' : 'Reopen Job'}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 lg:flex-initial"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 lg:flex-initial"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
