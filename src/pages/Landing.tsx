import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout/Navbar';
import { Search, Briefcase, Users, Star, CheckCircle, Hammer, Zap, Home as HomeIcon, Wrench, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const categories = [
  { name: 'Carpentry', icon: Hammer, count: '150+ Professionals' },
  { name: 'Electrical', icon: Zap, count: '120+ Professionals' },
  { name: 'Plumbing', icon: Wrench, count: '90+ Professionals' },
  { name: 'Construction', icon: HomeIcon, count: '200+ Professionals' },
];

const testimonials = [
  {
    name: 'Ibrahim Kamara',
    role: 'Construction Company Owner',
    content: 'Mammy Coker Hub helped me find skilled workers quickly. The quality of professionals here is outstanding!',
    rating: 5,
  },
  {
    name: 'Fatmata Sesay',
    role: 'Electrical Engineer',
    content: 'As a professional, this platform connected me with great opportunities. I now have steady work!',
    rating: 5,
  },
  {
    name: 'Mohamed Bangura',
    role: 'Homeowner',
    content: 'Found an excellent carpenter for my home renovation. Professional, skilled, and reliable!',
    rating: 5,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              Connect with
              <span className="text-gradient gradient-text-animate"> Skilled Professionals </span>
              in Sierra Leone
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up stagger-2 opacity-0">
              Find trusted carpenters, electricians, plumbers, and more. Build your future with verified talent.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-3 opacity-0">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search for professionals or skills..."
                  className="pl-10 h-14 text-lg"
                />
              </div>
              <Button variant="hero" size="xl" className="btn-ripple hover-glow">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground animate-fade-in stagger-4 opacity-0">
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary" />
                Verified Professionals
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary" />
                Secure Payments
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary" />
                Quality Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Popular Categories
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in stagger-1 opacity-0">
              Explore skilled professionals across various trades
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 hover-lift cursor-pointer group card-shadow animate-fade-in-up opacity-0 stagger-${index + 1}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10 animate-fade-in stagger-5 opacity-0">
            <Link to="/professionals">
              <Button variant="outline" size="lg" className="hover-scale">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up opacity-0 stagger-1 hover-scale">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
              <div className="font-heading text-4xl font-bold mb-2">2,500+</div>
              <p className="text-muted-foreground">Verified Professionals</p>
            </div>
            <div className="animate-fade-in-up opacity-0 stagger-2 hover-scale">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="font-heading text-4xl font-bold mb-2">5,000+</div>
              <p className="text-muted-foreground">Jobs Completed</p>
            </div>
            <div className="animate-fade-in-up opacity-0 stagger-3 hover-scale">
              <Star className="w-12 h-12 mx-auto mb-4 text-accent animate-float" style={{ animationDelay: '1s' }} />
              <div className="font-heading text-4xl font-bold mb-2">4.8/5</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in stagger-1 opacity-0">
              Simple steps to find or offer services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up opacity-0 stagger-1">
              <div className="w-16 h-16 rounded-full hero-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-scale animate-pulse-glow">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Create Profile</h3>
              <p className="text-muted-foreground">
                Sign up and complete your professional or employer profile
              </p>
            </div>
            <div className="text-center animate-fade-in-up opacity-0 stagger-2">
              <div className="w-16 h-16 rounded-full hero-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-scale animate-pulse-glow">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Search & Connect</h3>
              <p className="text-muted-foreground">
                Find the right match using our advanced search and filters
              </p>
            </div>
            <div className="text-center animate-fade-in-up opacity-0 stagger-3">
              <div className="w-16 h-16 rounded-full hero-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-scale animate-pulse-glow">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Get Work Done</h3>
              <p className="text-muted-foreground">
                Collaborate, complete projects, and build your reputation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in stagger-1 opacity-0">
              Real stories from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`p-6 card-shadow hover-lift animate-fade-in-up opacity-0 stagger-${index + 1}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-accent fill-accent" size={20} />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up stagger-1">
            Join thousands of professionals and employers on Sierra Leone's leading hiring platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Link to="/auth?tab=signup&role=professional">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto hover-scale btn-ripple">
                <Users className="mr-2" />
                Join as Professional
              </Button>
            </Link>
            <Link to="/auth?tab=signup&role=employer">
              <Button variant="accent" size="xl" className="w-full sm:w-auto hover-scale btn-ripple">
                <Briefcase className="mr-2" />
                Hire Professionals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
