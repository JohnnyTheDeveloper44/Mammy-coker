import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import logo from '@/assets/logo.png';
import { toast } from 'sonner';
import { employerStep1Schema, employerStep2Schema } from '@/lib/validations';

const EmployerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    companySize: '',
    industry: '',
    description: '',
    website: '',
    companyLogo: null as File | null,
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const validateStep = () => {
    setErrors({});
    
    if (step === 1) {
      const result = employerStep1Schema.safeParse({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        return false;
      }
    }
    
    if (step === 2) {
      const result = employerStep2Schema.safeParse({
        companySize: formData.companySize,
        industry: formData.industry,
        description: formData.description,
        website: formData.website,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: Supabase Integration - Save Employer Profile
    // 1. Upload company logo to Supabase Storage 'logos' bucket:
    //    const { data: logoData } = await supabase.storage.from('logos').upload(`${userId}/logo.jpg`, formData.companyLogo)
    // 2. Insert profile into 'employers' table:
    //    await supabase.from('employers').insert({
    //      user_id: userId,
    //      company_name: formData.companyName,
    //      contact_name: formData.contactName,
    //      email: formData.email,
    //      phone: formData.phone,
    //      location: formData.location,
    //      company_size: formData.companySize,
    //      industry: formData.industry,
    //      description: formData.description,
    //      website: formData.website,
    //      logo_url: logoData?.path
    //    })
    console.log('TODO: Save employer profile to Supabase', formData);
    toast.success('Company profile created!');
    navigate('/dashboard/employer');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img src={logo} alt="Mammy Coker Hub" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold mb-2">Employer Onboarding</h1>
          <p className="text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card className="p-6 md:p-8 card-shadow-lg">
          {step === 1 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Company Information</h2>
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="ABC Construction Ltd."
                  className={errors.companyName ? 'border-destructive' : ''}
                />
                {errors.companyName && <p className="text-destructive text-sm mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <Label htmlFor="contactName">Contact Person Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="John Doe"
                  className={errors.contactName ? 'border-destructive' : ''}
                />
                {errors.contactName && <p className="text-destructive text-sm mt-1">{errors.contactName}</p>}
              </div>
              <div>
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+232 XX XXX XXXX"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Freetown, Sierra Leone"
                  className={errors.location ? 'border-destructive' : ''}
                />
                {errors.location && <p className="text-destructive text-sm mt-1">{errors.location}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Business Details</h2>
              <div>
                <Label htmlFor="companySize">Company Size *</Label>
                <Input
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  placeholder="e.g., 10-50 employees"
                  className={errors.companySize ? 'border-destructive' : ''}
                />
                {errors.companySize && <p className="text-destructive text-sm mt-1">{errors.companySize}</p>}
              </div>
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Construction, Manufacturing"
                  className={errors.industry ? 'border-destructive' : ''}
                />
                {errors.industry && <p className="text-destructive text-sm mt-1">{errors.industry}</p>}
              </div>
              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.yourcompany.com"
                  className={errors.website ? 'border-destructive' : ''}
                />
                {errors.website && <p className="text-destructive text-sm mt-1">{errors.website}</p>}
              </div>
              <div>
                <Label htmlFor="description">Company Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell professionals about your company, projects, and work culture..."
                  rows={4}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
              </div>
              <div>
                <Label>Company Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Button variant="outline" className="relative">
                    <Upload className="mr-2" size={16} />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, companyLogo: e.target.files[0] });
                        }
                      }}
                    />
                  </Button>
                  {formData.companyLogo && (
                    <span className="text-sm text-muted-foreground">{formData.companyLogo.name}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Review & Submit</h2>
              <Card className="p-4 bg-muted/30">
                <h3 className="font-semibold mb-3">Company Summary</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Company:</dt>
                    <dd className="font-medium">{formData.companyName || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Contact:</dt>
                    <dd className="font-medium">{formData.contactName || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email:</dt>
                    <dd className="font-medium">{formData.email || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd className="font-medium">{formData.location || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Industry:</dt>
                    <dd className="font-medium">{formData.industry || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Company Logo:</dt>
                    <dd className="font-medium">{formData.companyLogo ? 'Uploaded' : 'Not uploaded'}</dd>
                  </div>
                </dl>
              </Card>
              <p className="text-sm text-muted-foreground">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-2" size={16} />
              Back
            </Button>
            {step < totalSteps ? (
              <Button variant="hero" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2" size={16} />
              </Button>
            ) : (
              <Button variant="hero" onClick={handleSubmit}>
                Complete Setup
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployerOnboarding;
