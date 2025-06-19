import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Users } from 'lucide-react';

const Footer = () => {
  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/WhatsApp Image 2025-06-19 at 14.55.50_447a090d.jpg" 
                alt="Plant.It Logo" 
                className="mr-3 w-8 h-8 object-contain rounded-full"
              />
              <span className="text-2xl font-bold">Plant.It</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              AI-powered plant disease detection and treatment solutions. 
              Connecting plant lovers with expert care and local nurseries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  onClick={() => handleNavigation('/')}
                  className="text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/scan" 
                  onClick={() => handleNavigation('/scan')}
                  className="text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Plant Scanner
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  onClick={() => handleNavigation('/products')}
                  className="text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <a href="#about" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="text-slate-300">AI Plant Diagnosis</li>
              <li className="text-slate-300">Treatment Recommendations</li>
              <li className="text-slate-300">Product Delivery</li>
              <li className="text-slate-300">Expert Consultation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 text-emerald-400" size={18} />
                <a href="mailto:plantit@gmail.com" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  plantit@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-emerald-400" size={18} />
                <a href="tel:+919728618297" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  +91 9728618297
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 text-emerald-400 mt-1" size={18} />
                <span className="text-slate-300">
                  Manipal University Jaipur<br />
                  Rajasthan, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nursery Registration CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="mr-3 text-white" size={32} />
            <h3 className="text-2xl font-bold text-white">Partner with Us</h3>
          </div>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Are you a nursery owner? Join our network of trusted partners and reach more customers 
            while helping plant lovers get the best care products delivered locally.
          </p>
          <Link
            to="/nursery-registration"
            onClick={() => handleNavigation('/nursery-registration')}
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors transform hover:scale-105"
          >
            Register Your Nursery
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 Plant.It. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;