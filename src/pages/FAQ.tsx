import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle, Users, Building, CreditCard, Shield } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      title: 'For Professionals',
      icon: Users,
      questions: [
        {
          question: 'How do I create a profile?',
          answer: 'To create a profile, click "Get Started" on the homepage and select "I\'m a Professional". Fill in your details including your skills, experience, and upload any certificates. Your profile will be visible to employers once completed.',
        },
        {
          question: 'Is it free to join as a professional?',
          answer: 'Yes! Creating a profile and applying to jobs is completely free. We offer premium features for professionals who want to boost their visibility and get priority access to new job postings.',
        },
        {
          question: 'How do I apply for jobs?',
          answer: 'Browse available jobs on the Jobs page, click on a job that interests you, and click "Apply Now". You can also save jobs for later. Employers will be notified of your application and may contact you through our messaging system.',
        },
        {
          question: 'Can I upload certificates and qualifications?',
          answer: 'Yes! You can upload certificates, licenses, and other qualifications to your profile. Verified certificates help build trust with employers and can increase your chances of getting hired.',
        },
        {
          question: 'How do I get more job invitations?',
          answer: 'Keep your profile complete and up-to-date, add a professional photo, and respond quickly to messages. Professionals with complete profiles and good response rates appear higher in search results.',
        },
      ],
    },
    {
      title: 'For Employers',
      icon: Building,
      questions: [
        {
          question: 'How do I post a job?',
          answer: 'Sign up as an employer, complete your company profile, and click "Post a Job" from your dashboard. Fill in the job details including title, description, requirements, and salary range. Your job will be visible to professionals immediately.',
        },
        {
          question: 'How much does it cost to post a job?',
          answer: 'We offer flexible pricing plans for employers. Basic job posts are available with a free trial, and premium plans include featured listings, unlimited job posts, and access to our professional database for direct outreach.',
        },
        {
          question: 'How do I find and contact professionals?',
          answer: 'Browse our Professionals directory to find skilled workers. You can filter by category, location, rating, and availability. Click "View Profile" to see their full details and "Message" to start a conversation.',
        },
        {
          question: 'Can I save professionals for later?',
          answer: 'Yes! You can save professionals to your favorites list for easy access later. This is helpful when you\'re reviewing multiple candidates or planning future hires.',
        },
        {
          question: 'How do I manage applicants?',
          answer: 'All applications appear in your dashboard under each job posting. You can review profiles, send messages, and update application status (Pending, Accepted, Rejected) to keep track of your hiring process.',
        },
      ],
    },
    {
      title: 'Account & Billing',
      icon: CreditCard,
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings from your dashboard and select the Security tab. Enter your current password and your new password to update it. For security, we recommend using a strong, unique password.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept mobile money (Orange Money, Africell Money), bank transfers, and international cards. All payments are processed securely through our payment partners.',
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription anytime from your Settings page. Your premium features will remain active until the end of your billing period.',
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Navigate to your dashboard and click "Edit Profile" or go to Settings. You can update your personal information, skills, experience, and profile photo at any time.',
        },
      ],
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      questions: [
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We never share your personal contact information with third parties without your consent.',
        },
        {
          question: 'Who can see my profile?',
          answer: 'For professionals, your public profile is visible to registered employers. You control what information is displayed. For employers, your company profile is public to attract professionals.',
        },
        {
          question: 'How do I report suspicious activity?',
          answer: 'If you encounter suspicious behavior or fraudulent job postings, please contact us immediately through the Contact page or email support@mammycokerhub.sl. We investigate all reports promptly.',
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can request account deletion from Settings. This will permanently remove all your data from our platform. Please note this action cannot be undone.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="mx-auto mb-4 text-primary" size={48} />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about using Mammy Coker Hub.
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="text-primary" size={24} />
                    </div>
                    <h2 className="font-heading text-2xl font-semibold">{category.title}</h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              ))}
            </div>

            {/* Contact CTA */}
            <Card className="p-8 mt-12 text-center bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="font-heading text-2xl font-semibold mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help. Get in touch and we'll respond as soon as possible.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Contact Support
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
