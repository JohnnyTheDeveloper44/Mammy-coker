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
import { professionalStep1Schema, professionalStep2Schema } from '@/lib/validations';

const ProfessionalOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    category: '',
    yearsExperience: '',
    skills: '',
    bio: '',
    portfolio: [] as File[],
    certificates: [] as File[],
    profilePicture: null as File | null,
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const validateStep = () => {
    setErrors({});
    
    if (step === 1) {
      const result = professionalStep1Schema.safeParse({
        fullName: formData.fullName,
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
      const result = professionalStep2Schema.safeParse({
        category: formData.category,
        yearsExperience: formData.yearsExperience,
        skills: formData.skills,
        bio: formData.bio,
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
    // TODO: Supabase Integration - Save Professional Profile
    // 1. Upload profile picture to Supabase Storage 'avatars' bucket:
    //    const { data: avatarData } = await supabase.storage.from('avatars').upload(`${userId}/profile.jpg`, formData.profilePicture)
    // 2. Upload certificates to 'certificates' bucket:
    //    for (const cert of formData.certificates) { await supabase.storage.from('certificates').upload(`${userId}/${cert.name}`, cert) }
    // 3. Upload portfolio images to 'portfolio' bucket
    // 4. Insert profile into 'professionals' table:
    //    await supabase.from('professionals').insert({
    //      user_id: userId,
    //      full_name: formData.fullName,
    //      phone: formData.phone,
    //      location: formData.location,
    //      category: formData.category,
    //      years_experience: formData.yearsExperience,
    //      skills: formData.skills.split(',').map(s => s.trim()),
    //      bio: formData.bio,
    //      avatar_url: avatarData?.path
    //    })
    console.log('TODO: Save professional profile to Supabase', formData);
    toast.success('Profile created successfully!');
    navigate('/dashboard/professional');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img src={logo} alt="Mammy Coker Hub" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold mb-2">Professional Onboarding</h1>
          <p className="text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card className="p-6 md:p-8 card-shadow-lg">
          {step === 1 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Basic Information</h2>
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className={errors.fullName ? 'border-destructive' : ''}
                />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
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
              <h2 className="font-heading text-2xl font-semibold mb-6">Professional Details</h2>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Carpentry, Electrical, Plumbing"
                  className={errors.category ? 'border-destructive' : ''}
                />
                {errors.category && <p className="text-destructive text-sm mt-1">{errors.category}</p>}
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  placeholder="5"
                  className={errors.yearsExperience ? 'border-destructive' : ''}
                />
                {errors.yearsExperience && <p className="text-destructive text-sm mt-1">{errors.yearsExperience}</p>}
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated) *</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Woodworking, Furniture Making, Cabinet Installation"
                  className={errors.skills ? 'border-destructive' : ''}
                />
                {errors.skills && <p className="text-destructive text-sm mt-1">{errors.skills}</p>}
              </div>
              <div>
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell employers about your experience and what makes you unique..."
                  rows={4}
                  className={errors.bio ? 'border-destructive' : ''}
                />
                {errors.bio && <p className="text-destructive text-sm mt-1">{errors.bio}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Documents & Portfolio</h2>
              <div>
                <Label>Profile Picture</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Button variant="outline" className="relative">
                    <Upload className="mr-2" size={16} />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, profilePicture: e.target.files[0] });
                        }
                      }}
                    />
                  </Button>
                  {formData.profilePicture && (
                    <span className="text-sm text-muted-foreground">{formData.profilePicture.name}</span>
                  )}
                </div>
              </div>
              <div>
                <Label>Certificates (Optional)</Label>
                <div className="mt-2">
                  <Button variant="outline" className="relative">
                    <Upload className="mr-2" size={16} />
                    Upload Certificates
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, certificates: Array.from(e.target.files) });
                        }
                      }}
                    />
                  </Button>
                  {formData.certificates.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {formData.certificates.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label>Portfolio Images (Optional)</Label>
                <div className="mt-2">
                  <Button variant="outline" className="relative">
                    <Upload className="mr-2" size={16} />
                    Upload Portfolio
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, portfolio: Array.from(e.target.files) });
                        }
                      }}
                    />
                  </Button>
                  {formData.portfolio.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {formData.portfolio.length} image(s) selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-slide-in">
              <h2 className="font-heading text-2xl font-semibold mb-6">Review & Submit</h2>
              <Card className="p-4 bg-muted/30">
                <h3 className="font-semibold mb-3">Profile Summary</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Name:</dt>
                    <dd className="font-medium">{formData.fullName || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Phone:</dt>
                    <dd className="font-medium">{formData.phone || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd className="font-medium">{formData.location || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category:</dt>
                    <dd className="font-medium">{formData.category || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Experience:</dt>
                    <dd className="font-medium">{formData.yearsExperience || '0'} years</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Profile Photo:</dt>
                    <dd className="font-medium">{formData.profilePicture ? 'Uploaded' : 'Not uploaded'}</dd>
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
                Complete Profile
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalOnboarding;
