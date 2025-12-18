import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Mammy Coker Hub ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mammy Coker Hub is an online platform that connects skilled professionals with employers in Sierra Leone. We provide tools for job posting, professional profiles, messaging, and job applications.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">4. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Post false, misleading, or fraudulent information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to the Platform</li>
              <li>Use the Platform for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">5. Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of content you submit to the Platform. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">6. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some features of the Platform require payment. All fees are non-refundable except as required by law. We reserve the right to change our pricing at any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy of information posted by users or the quality of services provided by professionals.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mammy Coker Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at legal@mammycokerhub.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
