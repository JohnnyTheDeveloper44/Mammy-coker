import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfessionalProfileEdit = () => {
  const { toast } = useToast();

  // TODO: Fetch professional profile from Supabase
  const [formData, setFormData] = useState({
    bio: 'Experienced carpenter with 10 years in residential and commercial construction.',
    hourlyRate: '50',
    location: 'Freetown',
    availability: 'available',
  });

  const [skills, setSkills] = useState(['Carpentry', 'Construction', 'Furniture Making']);
  const [newSkill, setNewSkill] = useState('');

  const [workHistory, setWorkHistory] = useState([
    { id: 1, title: 'Senior Carpenter', company: 'ABC Construction', years: '2018-2023' },
    { id: 2, title: 'Carpenter', company: 'BuildRight Ltd', years: '2014-2018' },
  ]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = () => {
    // TODO: Update professional profile in Supabase
    // const { error } = await supabase
    //   .from('professionals')
    //   .update({ bio, hourly_rate, location, availability, skills })
    //   .eq('user_id', user.id);
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/professional" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Edit Profile</h1>

        <Card className="p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold mb-6">Professional Information</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell employers about your experience and expertise..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (Le)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <select
                id="availability"
                className="w-full h-10 px-3 rounded-md border border-border bg-background"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              >
                <option value="available">Available for Work</option>
                <option value="busy">Currently Busy</option>
                <option value="unavailable">Not Available</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold mb-4">Skills</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <Badge key={skill} className="px-3 py-1 flex items-center gap-2">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button onClick={handleAddSkill} variant="outline">
              <Plus size={16} />
            </Button>
          </div>
        </Card>

        {/* Work History */}
        <Card className="p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold mb-4">Work History</h2>
          
          <div className="space-y-4">
            {workHistory.map((job) => (
              <div key={job.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.years}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4">
            <Plus size={16} className="mr-2" />
            Add Work Experience
          </Button>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleSave} variant="hero" size="lg">
            Save Changes
          </Button>
          <Link to="/dashboard/professional">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileEdit;
