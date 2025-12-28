import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">IFMC Institute</h3>
            <p className="text-gray-300 text-sm mb-4">
              India's leading institute for stock market education. ISO 9001:2015 certified with 50,000+ trained students.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-red-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/course/1" className="text-gray-300 hover:text-white transition-colors">
                  Technical Analysis
                </Link>
              </li>
              <li>
                <Link to="/course/2" className="text-gray-300 hover:text-white transition-colors">
                  UDTS Strategy
                </Link>
              </li>
              <li>
                <Link to="/course/3" className="text-gray-300 hover:text-white transition-colors">
                  Options Trading
                </Link>
              </li>
              <li>
                <Link to="/course/4" className="text-gray-300 hover:text-white transition-colors">
                  Stock Market Basics
                </Link>
              </li>
              <li>
                <Link to="/mock-test" className="text-gray-300 hover:text-white transition-colors">
                  Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="flex-shrink-0 mt-1 text-red-400" />
                <span className="text-gray-300">
                  IFMC Institute, New Delhi, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0 text-red-400" />
                <a href="tel:+919870510511" className="text-gray-300 hover:text-white transition-colors">
                  +91 98 705 10511
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0 text-red-400" />
                <a href="mailto:info@ifmcinstitute.com" className="text-gray-300 hover:text-white transition-colors">
                  info@ifmcinstitute.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} IFMC Institute. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-300 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;