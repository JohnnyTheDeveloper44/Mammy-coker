import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createJobSchema } from '@/lib/validations';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    type: 'Full-time' as 'Full-time' | 'Part-time' | 'Contract' | 'Temporary',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  const categories = [
    'Carpentry',
    'Electrical',
    'Plumbing',
    'Construction',
    'Masonry',
    'Painting',
    'Welding',
    'Tailoring',
    'Catering',
    'Landscaping',
    'Driving',
    'Security',
    'Cleaning',
    'Other'
  ];

  useEffect(() => {
    // TODO: Fetch job data from Supabase
    // const { data: job } = await supabase
    //   .from('jobs')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // Simulate loading mock data
    setTimeout(() => {
      setFormData({
        title: 'Experienced Carpenter Needed',
        category: 'Carpentry',
        location: 'Freetown',
        type: 'Full-time',
        salaryMin: '3000',
        salaryMax: '5000',
        description: 'Looking for an experienced carpenter for residential construction projects. Must have at least 5 years experience in furniture making and cabinet installation.',
        requirements: '- Minimum 5 years experience\n- Own tools preferred\n- Strong attention to detail\n- Ability to work independently',
        benefits: '- Competitive salary\n- Transport allowance\n- Meal provided on site\n- Opportunity for permanent position',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = createJobSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);

    // TODO: Update job in Supabase
    // const { error } = await supabase
    //   .from('jobs')
    //   .update({
    //     title: formData.title,
    //     category: formData.category,
    //     location: formData.location,
    //     type: formData.type,
    //     salary_min: formData.salaryMin ? parseInt(formData.salaryMin) : null,
    //     salary_max: formData.salaryMax ? parseInt(formData.salaryMax) : null,
    //     description: formData.description,
    //     requirements: formData.requirements,
    //     benefits: formData.benefits,
    //   })
    //   .eq('id', id);

    setTimeout(() => {
      setSaving(false);
      toast.success('Job updated successfully!');
      navigate('/dashboard/employer/jobs');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/employer/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to My Jobs
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Edit Job Listing</h1>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <h2 className="font-heading text-2xl font-semibold mb-6">Job Details</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Experienced Carpenter Needed"
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-destructive text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Freetown"
                    className={errors.location ? 'border-destructive' : ''}
                  />
                  {errors.location && <p className="text-destructive text-sm mt-1">{errors.location}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Employment Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary') => 
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salaryMin">Min Salary (Le/month)</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    placeholder="3000"
                  />
                </div>

                <div>
                  <Label htmlFor="salaryMax">Max Salary (Le/month)</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    className={errors.salaryMax ? 'border-destructive' : ''}
                  />
                  {errors.salaryMax && <p className="text-destructive text-sm mt-1">{errors.salaryMax}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                  placeholder="List required skills, experience, and qualifications..."
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={3}
                  placeholder="What benefits do you offer? (e.g., transport, meals, insurance)"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" variant="hero" size="lg" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            <Link to="/dashboard/employer/jobs">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
