
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-morphism py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-aagami-sage to-aagami-blue bg-clip-text text-transparent">
                Aagami
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="animated-link text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="animated-link text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/features" className="animated-link text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link to="/contact" className="animated-link text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                Contact
              </Link>
              <Link 
                to="/login" 
                className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="ml-2 bg-aagami-terracotta hover:bg-aagami-terracotta/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-primary/10 hover:bg-primary/20 inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 mt-4 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-aagami-terracotta text-white hover:bg-aagami-terracotta/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
