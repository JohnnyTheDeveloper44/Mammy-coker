import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Create a professional profile',
      'Apply to up to 5 jobs/month',
      'Basic search & filters',
      'Direct messaging',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/auth?tab=signup&role=professional',
    popular: false,
  },
  {
    name: 'Professional',
    price: 'Le 50,000',
    period: '/month',
    description: 'Best for active job seekers',
    features: [
      'Everything in Basic',
      'Unlimited job applications',
      'Priority in search results',
      'Profile verification badge',
      'Skills assessments',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Upgrade Now',
    href: '/auth?tab=signup&role=professional',
    popular: true,
  },
  {
    name: 'Employer Basic',
    price: 'Free',
    description: 'Try our hiring tools',
    features: [
      'Post 1 job listing',
      'Browse professional profiles',
      'Basic applicant management',
      'Direct messaging',
      'Email support',
    ],
    cta: 'Start Hiring',
    href: '/auth?tab=signup&role=employer',
    popular: false,
  },
  {
    name: 'Employer Pro',
    price: 'Le 150,000',
    period: '/month',
    description: 'For serious recruiters',
    features: [
      'Unlimited job postings',
      'Featured job listings',
      'Advanced search & filters',
      'Applicant tracking system',
      'Team collaboration',
      'Analytics & reports',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for you. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 flex flex-col relative ${
                plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 hero-gradient">
                  <Sparkles size={14} className="mr-1" />
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.href}>
                <Button
                  variant={plan.popular ? 'hero' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Need help choosing? Contact our team for personalized recommendations.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
