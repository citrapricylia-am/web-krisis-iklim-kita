
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Empat Pilar', href: '#framework' },
    { name: 'Fakta', href: '#facts' },
    { name: 'Aksi', href: '#action' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Ambil ID dari href (contoh: "#framework" menjadi "framework")
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-md py-3 shadow-sm border-b-2 border-stone-200' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-30 h-16">
            <img 
              src="assets/icon2.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "assets/icon2.png";
              }}
            />
          </div>
        </div>

        {/* Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-black text-stone-600 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Tombol Menu Mobile */}
        <button 
          className="md:hidden p-2 bg-white border-2 border-stone-900 rounded-lg neo-brutalism-shadow" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Tampilan Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-50 border-b-4 border-stone-900 p-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black text-stone-900 uppercase tracking-widest py-4 border-b-2 border-stone-100 flex items-center justify-between" 
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


