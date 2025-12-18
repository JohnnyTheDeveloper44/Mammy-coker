import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Account information (name, email, phone number, location)</li>
              <li>Profile information (skills, experience, portfolio)</li>
              <li>Job listings and applications</li>
              <li>Messages between users</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Connect professionals with employers</li>
              <li>Send you notifications and updates</li>
              <li>Process payments</li>
              <li>Respond to your inquiries</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We share your information only with your consent or as necessary to provide our services. Your public profile information is visible to other users. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data at any time.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage, and for security purposes. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for users under 18 years of age. We do not knowingly collect information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about this Privacy Policy, please contact us at privacy@mammycokerhub.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
