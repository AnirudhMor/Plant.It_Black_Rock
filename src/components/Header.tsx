import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string, sectionId?: string) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    if (path === location.pathname && sectionId) {
      // Same page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Different page, navigate and scroll to top
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/30 backdrop-blur-md shadow-xl border border-white/10' 
          : 'bg-white/95 backdrop-blur-sm shadow-lg border border-slate-200/50'
      } rounded-2xl`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => handleNavigation('/')}
            className={`flex items-center font-bold text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-800 hover:text-emerald-600'
            }`}
          >
            <img 
              src="/WhatsApp Image 2025-06-19 at 14.55.50_447a090d.jpg" 
              alt="Plant.It Logo" 
              className="mr-3 w-10 h-10 object-contain rounded-full ring-2 ring-emerald-100 hover:ring-emerald-300 transition-all duration-300"
            />
            Plant.It
          </button>
          
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`font-medium transition-colors duration-300 relative group ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/scan')}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Scan Plant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/products')}
                  className={`font-medium transition-colors duration-300 relative group ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  Products
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`font-medium transition-colors duration-300 relative group ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/checkout')}
                  className={`relative transition-colors duration-300 p-2 rounded-lg hover:bg-emerald-50/80 ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => handleNavigation('/checkout')}
              className={`relative transition-colors duration-300 p-2 rounded-lg hover:bg-emerald-50/80 ${
                isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 p-2 rounded-lg hover:bg-emerald-50/80 ${
                isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t py-4 rounded-b-xl -mx-6 px-6 ${
            isScrolled 
              ? 'bg-white/40 backdrop-blur-md border-white/20' 
              : 'bg-white/95 backdrop-blur-sm border-slate-200/50'
          }`}>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleNavigation('/')}
                  className={`block font-medium transition-colors duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-emerald-50/80 ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/scan')}
                  className="block bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 w-fit shadow-lg"
                >
                  Scan Plant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/products')}
                  className={`block font-medium transition-colors duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-emerald-50/80 ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`block font-medium transition-colors duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-emerald-50/80 ${
                    isScrolled ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  About
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;