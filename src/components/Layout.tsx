import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Coaching', path: '/coaching' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Court', path: '/book-court' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || !isHome ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className={`text-2xl font-black tracking-tighter ${isScrolled || !isHome ? 'text-blue-700' : 'text-white'}`}>
            ACE RESERVE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    isScrolled || !isHome ? 'text-gray-900' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/book-court">
                <button className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  isScrolled || !isHome 
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}>
                  Book a Court
                </button>
              </Link>
              <Link to="/membership">
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  Join Membership
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled || !isHome ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled || !isHome ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-900 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/book-court" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <button className="w-full bg-blue-50 text-blue-700 px-5 py-3 rounded-full text-sm font-semibold text-center">
                  Book a Court
                </button>
              </Link>
              <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-full text-sm font-semibold text-center">
                  Join Membership
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-blue-600 text-white pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-3xl font-black tracking-tighter mb-6 block">
                ACE RESERVE
              </Link>
              <p className="text-blue-100 max-w-sm mb-8 text-sm leading-relaxed">
                Ace Reserve Tennis Club is Miami's premier tennis facility offering world-class courts, coaching, events, and tournaments.
              </p>
              <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-500/30">
                <h4 className="font-semibold mb-4">Get updates on programs, events, and exclusive sessions.</h4>
                <div className="flex bg-white/10 p-1 rounded-full border border-white/20">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-transparent border-none outline-none text-white px-4 py-2 w-full placeholder:text-blue-200 text-sm"
                  />
                  <button className="bg-white text-blue-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Explore</h4>
              <ul className="space-y-4 text-blue-100">
                <li><Link to="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                <li><Link to="/coaching" className="hover:text-white transition-colors">Coaching</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/tournaments" className="hover:text-white transition-colors">Tournaments</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Club Info</h4>
              <ul className="space-y-4 text-blue-100 text-sm">
                <li>123 Championship Way, Miami, FL 33131</li>
                <li>Mon - Fri: 7:00 AM - 10:00 PM</li>
                <li>Sat - Sun: 8:00 AM - 8:00 PM</li>
                <li>contact@acereserve.com</li>
                <li>+1 (305) 555-0199</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-500/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © 2025 Ace Reserve Tennis Club. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-blue-200 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
              <div className="w-5 h-5 bg-blue-200 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
              <div className="w-5 h-5 bg-blue-200 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
              <div className="w-5 h-5 bg-blue-200 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
