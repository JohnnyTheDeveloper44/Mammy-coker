import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { MapPin, Star, Award, Briefcase, Calendar, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProfessionalProfile = () => {
  const { id } = useParams();

  // TODO: Fetch professional profile from Supabase by ID
  const professional = {
    id,
    name: 'Ibrahim Kamara',
    category: 'Carpentry',
    location: 'Freetown, Sierra Leone',
    experience: '8 years',
    rating: 4.9,
    reviews: 32,
    completedJobs: 45,
    skills: ['Furniture Making', 'Cabinet Installation', 'Custom Work', 'Woodworking', 'Repairs'],
    bio: 'Experienced carpenter with a passion for creating beautiful, functional pieces. Specializing in custom furniture and cabinet installations for residential and commercial clients.',
    availability: 'Available',
    hourlyRate: '50-80 Le/hour',
    certificates: [
      { name: 'Advanced Carpentry Certification', issuer: 'Sierra Leone Trade Institute', year: 2020 },
      { name: 'Safety Training Certificate', issuer: 'OSHA', year: 2021 },
    ],
    portfolio: [
      { id: 1, title: 'Custom Kitchen Cabinets', description: 'Modern kitchen installation' },
      { id: 2, title: 'Dining Table Set', description: 'Handcrafted wooden dining set' },
      { id: 3, title: 'Office Furniture', description: 'Complete office setup' },
    ],
    workHistory: [
      { company: 'ABC Construction', role: 'Senior Carpenter', duration: '2020 - Present' },
      { company: 'HomeWorks Ltd', role: 'Carpenter', duration: '2017 - 2020' },
    ],
    testimonials: [
      {
        name: 'John Smith',
        company: 'ABC Construction',
        rating: 5,
        comment: 'Outstanding work! Ibrahim completed our kitchen renovation perfectly.',
      },
      {
        name: 'Sarah Johnson',
        company: 'Private Client',
        rating: 5,
        comment: 'Professional, skilled, and reliable. Highly recommended!',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-6 card-shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {professional.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge className="mb-2">{professional.availability}</Badge>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h1 className="font-heading text-4xl font-bold mb-2">{professional.name}</h1>
                  <p className="text-xl text-muted-foreground mb-2">{professional.category} Specialist</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span>{professional.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" size="lg">
                    <Send className="mr-2" size={18} />
                    Hire Me
                  </Button>
                  <Button variant="outline" size="lg">
                    Message
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={20} className="fill-accent text-accent" />
                    <span className="font-heading text-2xl font-bold">{professional.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{professional.reviews} Reviews</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award size={20} className="text-primary" />
                    <span className="font-heading text-2xl font-bold">{professional.completedJobs}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Jobs Completed</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Briefcase size={20} className="text-secondary" />
                    <span className="font-heading text-2xl font-bold">{professional.experience}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Experience</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar size={20} className="text-accent" />
                    <span className="font-heading text-xl font-bold">{professional.hourlyRate}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                </div>
              </div>

              <p className="text-foreground leading-relaxed">{professional.bio}</p>
            </div>
          </div>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {professional.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="font-heading text-xl font-semibold mb-3 mt-6">Work History</h3>
              <div className="space-y-4">
                {professional.workHistory.map((work, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <Briefcase className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">{work.role}</h4>
                      <p className="text-muted-foreground">{work.company}</p>
                      <p className="text-sm text-muted-foreground">{work.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {professional.portfolio.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Briefcase size={48} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Certificates & Qualifications</h2>
              <div className="space-y-4">
                {professional.certificates.map((cert, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <Award className="text-accent mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg">{cert.name}</h3>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground">Year: {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="p-6">
              <h2 className="font-heading text-2xl font-semibold mb-4">Client Reviews</h2>
              <div className="space-y-6">
                {professional.testimonials.map((testimonial, index) => (
                  <div key={index} className="pb-6 border-b last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground italic">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
