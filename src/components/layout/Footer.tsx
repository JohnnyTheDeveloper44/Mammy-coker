import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="Mammy Coker Hub" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Connecting skilled professionals with opportunities across Sierra Leone
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth?tab=signup&role=professional" className="hover:text-primary transition-colors">Create Profile</Link></li>
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth?tab=signup&role=employer" className="hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link to="/professionals" className="hover:text-primary transition-colors">Find Talent</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mammy Coker Hub. All rights reserved. Built for Sierra Leone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;