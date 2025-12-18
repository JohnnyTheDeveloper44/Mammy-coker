import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfessionalInvitations = () => {
  const { toast } = useToast();

  // TODO: Fetch job invitations from Supabase
  const [invitations, setInvitations] = useState([
    {
      id: '1',
      jobTitle: 'Residential Carpenter Needed',
      employer: 'ABC Construction',
      location: 'Freetown',
      salary: '3,500 Le/month',
      startDate: '2024-02-01',
      status: 'pending',
      message: 'We were impressed by your portfolio and would like to invite you to work on our residential project.',
    },
    {
      id: '2',
      jobTitle: 'Commercial Furniture Making',
      employer: 'Office Interiors Ltd',
      location: 'Bo',
      salary: '4,000 Le/month',
      startDate: '2024-02-15',
      status: 'pending',
      message: 'Your experience in furniture making is exactly what we need for our upcoming commercial project.',
    },
  ]);

  const handleAccept = (id: string) => {
    // TODO: Update invitation status in Supabase
    // await supabase.from('job_invitations')
    //   .update({ status: 'accepted' })
    //   .eq('id', id);

    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, status: 'accepted' } : inv
    ));

    toast({
      title: 'Invitation Accepted',
      description: 'The employer will be notified of your acceptance.',
    });
  };

  const handleDecline = (id: string) => {
    // TODO: Update invitation status in Supabase
    // await supabase.from('job_invitations')
    //   .update({ status: 'declined' })
    //   .eq('id', id);

    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, status: 'declined' } : inv
    ));

    toast({
      title: 'Invitation Declined',
      description: 'The employer has been notified.',
    });
  };

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');
  const respondedInvitations = invitations.filter(inv => inv.status !== 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/professional" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Job Invitations</h1>

        {/* Pending Invitations */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">
            Pending Invitations ({pendingInvitations.length})
          </h2>

          {pendingInvitations.length === 0 ? (
            <Card className="p-8 text-center">
              <Briefcase className="mx-auto mb-3 text-muted-foreground" size={40} />
              <p className="text-muted-foreground">No pending invitations</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingInvitations.map((invitation) => (
                <Card key={invitation.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading text-2xl font-semibold mb-1">
                        {invitation.jobTitle}
                      </h3>
                      <p className="text-lg text-muted-foreground">{invitation.employer}</p>
                    </div>
                    <Badge>Invitation</Badge>
                  </div>

                  <p className="text-foreground mb-4">{invitation.message}</p>

                  <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span>{invitation.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-muted-foreground" />
                      <span>{invitation.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Start: {new Date(invitation.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="hero"
                      onClick={() => handleAccept(invitation.id)}
                      className="flex-1"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Accept Invitation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDecline(invitation.id)}
                      className="flex-1"
                    >
                      <X size={16} className="mr-2" />
                      Decline
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Responded Invitations */}
        {respondedInvitations.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-4">Previous Invitations</h2>
            <div className="space-y-4">
              {respondedInvitations.map((invitation) => (
                <Card key={invitation.id} className="p-6 opacity-75">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-heading text-xl font-semibold">{invitation.jobTitle}</h3>
                      <p className="text-muted-foreground">{invitation.employer}</p>
                    </div>
                    <Badge variant={invitation.status === 'accepted' ? 'default' : 'secondary'}>
                      {invitation.status === 'accepted' ? 'Accepted' : 'Declined'}
                    </Badge>
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

export default ProfessionalInvitations;
