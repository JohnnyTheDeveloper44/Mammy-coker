import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Clock, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SavedJobs = () => {
  const { toast } = useToast();

  // TODO: Fetch saved jobs from Supabase
  // const { data: savedJobs } = await supabase
  //   .from('saved_jobs')
  //   .select('*, jobs(*)')
  //   .eq('professional_id', userId);

  const [savedJobs, setSavedJobs] = useState([
    {
      id: '1',
      title: 'Experienced Carpenter Needed',
      company: 'ABC Construction',
      location: 'Freetown',
      category: 'Carpentry',
      salary: '3,000-5,000 Le/month',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Looking for an experienced carpenter for residential construction projects. Must have at least 5 years experience.',
    },
    {
      id: '2',
      title: 'Licensed Electrician',
      company: 'PowerTech Solutions',
      location: 'Bo',
      category: 'Electrical',
      salary: '4,000-6,000 Le/month',
      type: 'Full-time',
      posted: '4 days ago',
      description: 'Commercial electrician needed for large-scale installations and maintenance work.',
    },
    {
      id: '3',
      title: 'Plumbing Specialist',
      company: 'WaterWorks Ltd',
      location: 'Kenema',
      category: 'Plumbing',
      salary: '3,500-5,500 Le/month',
      type: 'Contract',
      posted: '1 week ago',
      description: 'Residential and commercial plumbing repairs and installations needed for various projects.',
    },
  ]);

  const handleUnsave = (id: string) => {
    // TODO: Remove from saved_jobs in Supabase
    // await supabase
    //   .from('saved_jobs')
    //   .delete()
    //   .eq('professional_id', userId)
    //   .eq('job_id', id);

    setSavedJobs(savedJobs.filter(job => job.id !== id));
    toast({
      title: 'Removed from Saved',
      description: 'Job has been removed from your saved list.',
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link to="/dashboard/professional" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <Bookmark className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-heading text-xl font-semibold mb-2">No Saved Jobs</h3>
            <p className="text-muted-foreground mb-6">
              Browse jobs and save them for later
            </p>
            <Link to="/jobs">
              <Button variant="hero">Browse Jobs</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="font-heading text-xl font-semibold mb-1">{job.title}</h2>
                        <p className="text-muted-foreground mb-2">{job.company}</p>
                      </div>
                      <Badge>{job.category}</Badge>
                    </div>

                    <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {job.posted}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Link to={`/jobs/${job.id}`} className="flex-1 md:flex-initial">
                      <Button variant="hero" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 md:flex-initial" onClick={() => handleUnsave(job.id)}>
                      <Bookmark size={16} className="mr-2 fill-current" />
                      Unsave
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SavedJobs;
