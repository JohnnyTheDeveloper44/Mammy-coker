import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email'),
  subject: z.string().trim().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().trim().min(20, 'Message must be at least 20 characters').max(1000),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    // TODO: Supabase Integration - Send email via Edge Function
    // 1. Create Edge Function 'send-contact-email' in supabase/functions/
    // 2. Add RESEND_API_KEY secret for email sending
    // 3. Call: await supabase.functions.invoke('send-contact-email', { body: result.data })
    // 4. Optionally store in 'contact_submissions' table for records
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    15 Wilkinson Road<br />
                    Freetown, Sierra Leone
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm">
                    hello@mammycokerhub.com<br />
                    support@mammycokerhub.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm">
                    +232 76 XXX XXXX<br />
                    +232 77 XXX XXXX
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8">
            <h2 className="font-heading text-2xl font-semibold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className={errors.subject ? 'border-destructive' : ''}
                />
                {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={sending}>
                {sending ? 'Sending...' : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
