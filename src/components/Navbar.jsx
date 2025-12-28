import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Courses', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex flex-col items-center transition-transform group-hover:scale-105">
                <div className="flex items-end gap-0.5 mb-1">
                  <div className="w-1.5 h-5 bg-accent-red rounded-full"></div>
                  <div className="w-1.5 h-7 bg-accent-red rounded-full"></div>
                  <div className="w-1.5 h-9 bg-accent-red rounded-full"></div>
                  <div className="w-1.5 h-11 bg-accent-red rounded-full"></div>
                  <div className="w-1.5 h-5 bg-navy rounded-full"></div>
                  <div className="w-1.5 h-7 bg-navy rounded-full"></div>
                  <div className="w-1.5 h-9 bg-navy rounded-full"></div>
                  <div className="w-1.5 h-11 bg-navy rounded-full"></div>
                </div>
                <span className="text-xl font-bold text-slate-900">IFMC</span>
              </div>
              <div className="border-l border-slate-200 pl-3 h-12 flex flex-col justify-center">
                <p className="text-xs leading-tight text-slate-900 font-medium">Institute of Financial</p>
                <p className="text-xs text-slate-500 leading-tight">Market Courses</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-slate-600 hover:text-navy font-medium text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 ml-4">
                <a href="tel:+919870510511" className="text-slate-500 hover:text-navy transition-colors">
                  <Phone size={18} />
                </a>
                <a href="mailto:info@ifmcinstitute.com" className="text-slate-500 hover:text-navy transition-colors">
                  <Mail size={18} />
                </a>
              </div>
              <div className="flex items-center gap-3 ml-2">
                <Button variant="ghost" size="sm" className="text-slate-700 hover:text-navy font-medium">
                  Login
                </Button>
                <Button size="sm" className="bg-navy hover:bg-navy-dark text-white font-medium rounded-lg px-6 shadow-soft">
                  Sign Up
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-slate-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-3 text-slate-600 hover:text-navy hover:bg-slate-50 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 px-4 flex flex-col gap-2">
                <Button variant="ghost" className="text-slate-700 w-full justify-center">
                  Login
                </Button>
                <Button className="bg-navy hover:bg-navy-dark text-white w-full rounded-lg">
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;