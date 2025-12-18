import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Globe, Users, Building, Briefcase, Calendar, Mail, Phone, Star } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const CompanyProfile = () => {
  const { id } = useParams();

  // TODO: Fetch company profile from Supabase by ID
  // const { data: company } = await supabase
  //   .from('employers')
  //   .select('*, jobs(*)')
  //   .eq('id', id)
  //   .single();

  const company = {
    id,
    name: 'ABC Construction Ltd',
    industry: 'Construction & Building',
    location: 'Freetown, Sierra Leone',
    founded: '2010',
    employees: '50-100',
    website: 'www.abcconstruction.sl',
    email: 'careers@abcconstruction.sl',
    phone: '+232 76 123456',
    description: 'ABC Construction is a leading construction company in Sierra Leone, specializing in residential and commercial building projects. With over a decade of experience, we have built a reputation for quality craftsmanship and reliable service.',
    about: 'Founded in 2010, ABC Construction has grown from a small family business to one of the most trusted construction companies in Sierra Leone. We take pride in our work and are committed to delivering projects on time and within budget. Our team consists of skilled professionals who are passionate about their craft.',
    benefits: [
      'Competitive salary packages',
      'Health insurance for employees',
      'Professional development opportunities',
      'Transport allowance',
      'Meals provided on site',
      'Safety equipment provided',
    ],
    openJobs: [
      {
        id: '1',
        title: 'Experienced Carpenter Needed',
        location: 'Freetown',
        type: 'Full-time',
        salary: '3,000-5,000 Le/month',
        posted: '2 days ago',
      },
      {
        id: '2',
        title: 'Construction Foreman',
        location: 'Freetown',
        type: 'Full-time',
        salary: '5,000-7,000 Le/month',
        posted: '1 week ago',
      },
      {
        id: '3',
        title: 'Site Supervisor',
        location: 'Bo',
        type: 'Contract',
        salary: '4,500-6,000 Le/month',
        posted: '3 days ago',
      },
    ],
    reviews: [
      {
        name: 'John K.',
        role: 'Carpenter',
        rating: 5,
        comment: 'Great company to work for. Good pay and supportive management.',
        date: '2 months ago',
      },
      {
        name: 'Fatmata S.',
        role: 'Electrician',
        rating: 4,
        comment: 'Professional work environment. Learned a lot during my time here.',
        date: '3 months ago',
      },
    ],
    rating: 4.5,
    totalReviews: 28,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Company Header */}
          <Card className="p-8 mb-6 card-shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                    {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="mb-2">{company.industry}</Badge>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h1 className="font-heading text-4xl font-bold mb-2">{company.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin size={18} />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < Math.floor(company.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'} 
                        />
                      ))}
                      <span className="ml-2 font-semibold">{company.rating}</span>
                      <span className="text-muted-foreground">({company.totalReviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/messages?company=${company.id}`}>
                      <Button variant="hero" size="lg">
                        <Mail className="mr-2" size={18} />
                        Contact
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Building size={20} className="mx-auto mb-1 text-primary" />
                    <span className="font-heading text-lg font-bold block">{company.founded}</span>
                    <span className="text-sm text-muted-foreground">Founded</span>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Users size={20} className="mx-auto mb-1 text-primary" />
                    <span className="font-heading text-lg font-bold block">{company.employees}</span>
                    <span className="text-sm text-muted-foreground">Employees</span>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Briefcase size={20} className="mx-auto mb-1 text-primary" />
                    <span className="font-heading text-lg font-bold block">{company.openJobs.length}</span>
                    <span className="text-sm text-muted-foreground">Open Jobs</span>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Globe size={20} className="mx-auto mb-1 text-primary" />
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="font-heading text-lg font-bold block hover:text-primary transition-colors truncate">
                      Website
                    </a>
                    <span className="text-sm text-muted-foreground">Visit</span>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed">{company.description}</p>
              </div>
            </div>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Open Jobs ({company.openJobs.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card className="p-6">
                <h2 className="font-heading text-2xl font-semibold mb-4">About {company.name}</h2>
                <p className="text-foreground leading-relaxed mb-6">{company.about}</p>

                <h3 className="font-heading text-xl font-semibold mb-3">Benefits & Perks</h3>
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {company.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-heading text-xl font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={16} />
                    <a href={`mailto:${company.email}`} className="hover:text-primary transition-colors">
                      {company.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={16} />
                    <span>{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe size={16} />
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {company.website}
                    </a>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <div className="space-y-4">
                {company.openJobs.map((job) => (
                  <Card key={job.id} className="p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {job.type}
                          </span>
                          <span>{job.salary}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="hero">View Job</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="p-6">
                <h2 className="font-heading text-2xl font-semibold mb-4">Employee Reviews</h2>
                <div className="space-y-6">
                  {company.reviews.map((review, index) => (
                    <div key={index} className="pb-6 border-b last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={16} className="fill-accent text-accent" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-foreground italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyProfile;
