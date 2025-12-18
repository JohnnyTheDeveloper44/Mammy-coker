import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, CheckCircle, X, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobApplicants = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // TODO: Fetch job details and applicants from Supabase
  const jobTitle = 'Experienced Carpenter Needed';

  const [applicants, setApplicants] = useState([
    {
      id: '1',
      name: 'John Kamara',
      category: 'Carpentry',
      location: 'Freetown',
      rating: 4.8,
      experience: '10 years',
      skills: ['Carpentry', 'Furniture Making', 'Cabinet Installation'],
      status: 'pending',
      appliedDate: '2024-01-20',
      avatar: null,
    },
    {
      id: '2',
      name: 'Mohamed Sesay',
      category: 'Carpentry',
      location: 'Freetown',
      rating: 4.6,
      experience: '7 years',
      skills: ['Carpentry', 'Construction', 'Woodworking'],
      status: 'pending',
      appliedDate: '2024-01-19',
      avatar: null,
    },
    {
      id: '3',
      name: 'Ibrahim Koroma',
      category: 'Carpentry',
      location: 'Bo',
      rating: 4.9,
      experience: '12 years',
      skills: ['Carpentry', 'Roofing', 'Furniture Making'],
      status: 'accepted',
      appliedDate: '2024-01-18',
      avatar: null,
    },
  ]);

  const handleAccept = (applicantId: string) => {
    // TODO: Update application status in Supabase
    // await supabase
    //   .from('applications')
    //   .update({ status: 'accepted' })
    //   .eq('id', applicationId);

    setApplicants(applicants.map(app =>
      app.id === applicantId ? { ...app, status: 'accepted' } : app
    ));

    toast({
      title: 'Applicant Accepted',
      description: 'The professional has been notified.',
    });
  };

  const handleReject = (applicantId: string) => {
    // TODO: Update application status in Supabase
    setApplicants(applicants.map(app =>
      app.id === applicantId ? { ...app, status: 'rejected' } : app
    ));

    toast({
      title: 'Applicant Rejected',
      description: 'The professional has been notified.',
    });
  };

  const pendingApplicants = applicants.filter(app => app.status === 'pending');
  const acceptedApplicants = applicants.filter(app => app.status === 'accepted');
  const rejectedApplicants = applicants.filter(app => app.status === 'rejected');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/employer/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to My Jobs
        </Link>

        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2">{jobTitle}</h1>
          <p className="text-muted-foreground">
            {applicants.length} total applicants
          </p>
        </div>

        {/* Pending Applicants */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">
            Pending Applications ({pendingApplicants.length})
          </h2>

          {pendingApplicants.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No pending applications</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingApplicants.map((applicant) => (
                <Card key={applicant.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={applicant.avatar || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-semibold mb-1">{applicant.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-accent text-accent" />
                            <span>{applicant.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{applicant.experience} experience</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{applicant.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {applicant.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Link to={`/professionals/${applicant.id}`} className="flex-1 lg:flex-initial">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="hero"
                        className="flex-1 lg:flex-initial"
                        onClick={() => handleAccept(applicant.id)}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 lg:flex-initial"
                        onClick={() => handleReject(applicant.id)}
                      >
                        <X size={16} className="mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Accepted Applicants */}
        {acceptedApplicants.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-semibold mb-4">
              Accepted ({acceptedApplicants.length})
            </h2>
            <div className="space-y-4">
              {acceptedApplicants.map((applicant) => (
                <Card key={applicant.id} className="p-6 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={applicant.avatar || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground">{applicant.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500">Accepted</Badge>
                      <Link to={`/messages?user=${applicant.id}`}>
                        <Button variant="outline" size="sm">
                          <Mail size={14} className="mr-2" />
                          Message
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
