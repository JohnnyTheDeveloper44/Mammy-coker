import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, FileText, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfessionalCertificates = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // TODO: Fetch certificates from Supabase
  const [certificates, setCertificates] = useState([
    {
      id: '1',
      name: 'Master Carpenter Certification',
      issuer: 'Sierra Leone Trade Institute',
      date: '2020-05-15',
      status: 'verified',
      fileUrl: null,
    },
    {
      id: '2',
      name: 'Safety Training Certificate',
      issuer: 'Construction Safety Board',
      date: '2022-03-10',
      status: 'pending',
      fileUrl: null,
    },
  ]);

  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    date: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewCertificate({ ...newCertificate, file: e.target.files[0] });
    }
  };

  const handleAddCertificate = async () => {
    // TODO: Upload certificate file to Supabase Storage
    // const filePath = `certificates/${userId}/${Date.now()}_${newCertificate.file.name}`;
    // const { data: uploadData, error: uploadError } = await supabase.storage
    //   .from('certificates')
    //   .upload(filePath, newCertificate.file);

    // TODO: Insert certificate record into Supabase
    // const { error } = await supabase.from('certificates').insert({
    //   professional_id: userId,
    //   name: newCertificate.name,
    //   issuer: newCertificate.issuer,
    //   issue_date: newCertificate.date,
    //   file_url: filePath,
    //   status: 'pending'
    // });

    const mockCertificate = {
      id: Date.now().toString(),
      name: newCertificate.name,
      issuer: newCertificate.issuer,
      date: newCertificate.date,
      status: 'pending' as const,
      fileUrl: null,
    };

    setCertificates([...certificates, mockCertificate]);
    setNewCertificate({ name: '', issuer: '', date: '', file: null });
    setIsDialogOpen(false);

    toast({
      title: 'Certificate Added',
      description: 'Your certificate has been submitted for verification.',
    });
  };

  const handleDeleteCertificate = (id: string) => {
    // TODO: Delete from Supabase
    // await supabase.from('certificates').delete().eq('id', id);
    // await supabase.storage.from('certificates').remove([filePath]);

    setCertificates(certificates.filter(cert => cert.id !== id));
    toast({
      title: 'Certificate Deleted',
      description: 'Certificate has been removed from your profile.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/professional" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl font-bold">Certificates & Credentials</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus size={16} className="mr-2" />
                Add Certificate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Certificate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="certName">Certificate Name</Label>
                  <Input
                    id="certName"
                    value={newCertificate.name}
                    onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                    placeholder="e.g., Master Electrician License"
                  />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input
                    id="issuer"
                    value={newCertificate.issuer}
                    onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                    placeholder="e.g., Sierra Leone Trade Institute"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Issue Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newCertificate.date}
                    onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="file">Certificate Document</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload PDF, JPG, or PNG (max 5MB)
                  </p>
                </div>
                <Button
                  onClick={handleAddCertificate}
                  variant="hero"
                  className="w-full"
                  disabled={!newCertificate.name || !newCertificate.issuer || !newCertificate.date}
                >
                  Submit for Verification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {certificates.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-heading text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your professional certificates to boost your credibility
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <FileText className="text-primary" size={32} />
                  <Badge variant={cert.status === 'verified' ? 'default' : 'secondary'}>
                    {cert.status === 'verified' ? (
                      <><CheckCircle size={14} className="mr-1" /> Verified</>
                    ) : (
                      <><Clock size={14} className="mr-1" /> Pending</>
                    )}
                  </Badge>
                </div>

                <h3 className="font-heading text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-muted-foreground mb-1">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Issued: {new Date(cert.date).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCertificate(cert.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCertificates;
