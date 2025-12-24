import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Youtube } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { name: 'HOME', path: '/' },
    { 
      name: 'TRADING STRATEGIES COURSES', 
      path: '/courses/trading-strategies',
      dropdown: true
    },
    { 
      name: 'INVESTOR & TRADER COURSES', 
      path: '/courses/investor-trader',
      dropdown: true
    },
    { 
      name: 'JOB ORIENTED COURSES', 
      path: '/courses/job-oriented',
      dropdown: true
    },
    { 
      name: 'NISM/NCFM MODULE', 
      path: '/courses/nism-ncfm',
      dropdown: true
    },
    { 
      name: 'MOCK TEST', 
      path: '/mock-test',
      dropdown: true
    },
    { 
      name: 'More', 
      path: '#',
      dropdown: true
    }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#B91C1C] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <Menu size={16} />
              <span>Fees Submission</span>
            </a>
            <a href="tel:+919870510511" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <Phone size={16} />
              <span>+91 98 705 10511</span>
            </a>
            <a href="mailto:info@ifmcinstitute.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <Mail size={16} />
              <span>info@ifmcinstitute.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-red-700">
              Login
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-red-700">
              Register
            </Button>
            <div className="flex items-center gap-2 bg-white text-red-600 px-3 py-1 rounded-full">
              <Youtube size={20} className="fill-red-600" />
              <span className="font-semibold">14+ Million Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#1e3a5f] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-end gap-0.5 mb-1">
                  <div className="w-2 h-6 bg-red-600"></div>
                  <div className="w-2 h-8 bg-red-600"></div>
                  <div className="w-2 h-10 bg-red-600"></div>
                  <div className="w-2 h-12 bg-red-600"></div>
                  <div className="w-2 h-6 bg-blue-400"></div>
                  <div className="w-2 h-8 bg-blue-400"></div>
                  <div className="w-2 h-10 bg-blue-400"></div>
                  <div className="w-2 h-12 bg-blue-400"></div>
                </div>
                <span className="text-2xl font-bold">IFMC</span>
              </div>
              <div className="border-l border-white/30 pl-3 h-14 flex flex-col justify-center">
                <p className="text-xs leading-tight">Institute of Financial Market Courses</p>
                <p className="text-xs text-gray-300 leading-tight">Your Ladder to Financial Success</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-white/10 rounded transition-colors"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={16} />}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Currency Selector */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-[#1e3a5f] text-white">
          <button className="block px-3 py-2 text-sm border-b border-white/20 hover:bg-white/10 transition-colors">
            INR ₹
          </button>
          <button className="block px-3 py-2 text-sm hover:bg-white/10 transition-colors">
            USD $
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;