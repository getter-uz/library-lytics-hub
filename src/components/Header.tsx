
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="glass-card sticky top-0 z-50 py-4 px-6 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="h-8 w-8 text-primary"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span className="text-xl font-bold text-primary">Kutubxona</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary button-transition">
            Bosh sahifa
          </Link>
          <Link to="/books" className="text-foreground hover:text-primary button-transition">
            Kitoblar
          </Link>
          <Link to="/donate" className="text-foreground hover:text-primary button-transition">
            Homiylik
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Kitob qidirish..."
              className="pl-10 pr-4 py-2 rounded-full text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-40 focus:w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Link to="/login">
            <Button variant="outline" className="ml-4">
              Kirish
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-slide-down p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-primary py-2" onClick={toggleMenu}>
              Bosh sahifa
            </Link>
            <Link to="/books" className="text-foreground hover:text-primary py-2" onClick={toggleMenu}>
              Kitoblar
            </Link>
            <Link to="/donate" className="text-foreground hover:text-primary py-2" onClick={toggleMenu}>
              Homiylik
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Kitob qidirish..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">
                Kirish
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
