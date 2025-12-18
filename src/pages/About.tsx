import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Heart, ArrowLeft } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            About Mammy Coker Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting skilled professionals with opportunities across Sierra Leone.
            Building a better future, one connection at a time.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 md:p-12 mb-12 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-primary" size={32} />
            <h2 className="font-heading text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mammy Coker Hub is dedicated to empowering Sierra Leone's skilled workforce by creating
            a transparent, accessible platform where professionals can showcase their talents and
            employers can find verified, qualified workers. We believe in fair opportunities,
            verified credentials, and building trust in Sierra Leone's growing economy.
          </p>
        </Card>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-all">
            <Users className="text-accent mb-4" size={40} />
            <h3 className="font-heading text-2xl font-semibold mb-3">Community First</h3>
            <p className="text-muted-foreground">
              We prioritize building strong connections between professionals and employers,
              fostering a supportive ecosystem for everyone.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <Award className="text-hero mb-4" size={40} />
            <h3 className="font-heading text-2xl font-semibold mb-3">Verified Skills</h3>
            <p className="text-muted-foreground">
              Every professional's credentials and certificates are verified to ensure quality
              and build trust in our platform.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <Heart className="text-primary mb-4" size={40} />
            <h3 className="font-heading text-2xl font-semibold mb-3">Fair Opportunities</h3>
            <p className="text-muted-foreground">
              We believe in equal access to opportunities, transparent processes, and fair
              treatment for all users on our platform.
            </p>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="p-8 md:p-12 mb-12 card-shadow bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">Platform Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Professionals</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-accent mb-2">200+</div>
              <div className="text-muted-foreground">Employers</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-hero mb-2">1,000+</div>
              <div className="text-muted-foreground">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a skilled professional looking for opportunities or an employer
            seeking qualified workers, Mammy Coker Hub is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?tab=signup">
              <Button variant="hero" size="xl">
                Get Started Today
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="xl">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
