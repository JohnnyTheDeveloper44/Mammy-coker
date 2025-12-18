import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationsDropdown } from '@/components/notifications/NotificationsDropdown';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'professional':
        return '/dashboard/professional';
      case 'employer':
        return '/dashboard/employer';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Mammy Coker Hub" className="h-10 w-auto" />
            <span className="font-heading font-bold text-xl hidden sm:block">
              Mammy Coker Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">
              Find Jobs
            </Link>
            <Link to="/professionals" className="text-foreground hover:text-primary transition-colors">
              Find Professionals
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>

            <ThemeToggle />

            {user ? (
              <>
                <NotificationsDropdown />

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profile?.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.profile?.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden lg:block">
                        {user.profile?.name || user.email.split('@')[0]}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()} className="cursor-pointer">
                        <User size={16} className="mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to={`/dashboard/${user.role}/settings`} 
                        className="cursor-pointer"
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            {user && <NotificationsDropdown />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-in">
            <Link
              to="/jobs"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/professionals"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Professionals
            </Link>
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {user ? (
              <div className="pt-2 space-y-2 border-t border-border">
                <Link
                  to={getDashboardLink()}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to={`/dashboard/${user.role}/settings`}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-destructive hover:text-destructive/80"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/auth?tab=signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="hero" className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
