import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/layout/Navbar';
import { MapPin, DollarSign, Briefcase, Clock, Building, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetails = () => {
  const { id } = useParams();

  // TODO: Fetch job details from Supabase by ID
  const job = {
    id,
    title: 'Experienced Carpenter Needed',
    company: 'ABC Construction',
    location: 'Freetown',
    category: 'Carpentry',
    salary: '3,000-5,000 Le/month',
    type: 'Full-time',
    posted: '2 days ago',
    description: `We are seeking an experienced carpenter for various residential construction projects across Freetown. The ideal candidate will have proven experience in custom furniture making, cabinet installation, and general carpentry work.`,
    requirements: [
      'Minimum 5 years of carpentry experience',
      'Expertise in reading blueprints and technical drawings',
      'Proficiency with hand and power tools',
      'Strong attention to detail',
      'Ability to work independently and in teams',
    ],
    responsibilities: [
      'Construct, install, and repair structures and fixtures made of wood and other materials',
      'Measure, cut, shape, assemble and join materials',
      'Build foundations, install floor beams, lay subflooring and erect walls and roof systems',
      'Fit and install trim items, such as doors, stairs, molding and hardware',
    ],
    companyInfo: {
      name: 'ABC Construction',
      size: '50-100 employees',
      industry: 'Construction & Real Estate',
      description: 'Leading construction company in Sierra Leone with over 15 years of experience.',
    },
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send application to Supabase job_applications table
    console.log('TODO: Submit application to Supabase');
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <Card className="p-8 mb-6 card-shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge>{job.category}</Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <h1 className="font-heading text-4xl font-bold mb-3">{job.title}</h1>
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                <Building size={20} />
                <span className="font-semibold">{job.company}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {job.salary}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  Posted {job.posted}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero" size="lg" className="w-full">
                    <Send className="mr-2" size={18} />
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleApply} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="cover-letter">Cover Letter</Label>
                      <Textarea
                        id="cover-letter"
                        placeholder="Tell the employer why you're the best fit..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="w-full">
                Save Job
              </Button>
            </div>
          </div>
        </Card>

        {/* Job Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Job Description</h2>
              <p className="text-foreground leading-relaxed">{job.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2"></div>
                    <span className="text-foreground">{resp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Company Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">About {job.companyInfo.name}</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Company Size</span>
                  <p className="font-medium">{job.companyInfo.size}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Industry</span>
                  <p className="font-medium">{job.companyInfo.industry}</p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-4">{job.companyInfo.description}</p>
              <Button variant="outline" className="w-full">View Company Profile</Button>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about this job? Contact our support team.
              </p>
              <Button variant="outline" size="sm">Contact Support</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
