
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border mt-12 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="h-6 w-6 text-primary"
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="text-lg font-bold text-primary">Kutubxona</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Bizning kutubxona jamiyatimizni ma'rifat va ilm bilan boyitish uchun xizmat qiladi.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Kitoblar
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Homiylik
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Kirish
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Kategoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?category=Religious" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Diniy
                </Link>
              </li>
              <li>
                <Link to="/books?category=Fiction" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Badiiy
                </Link>
              </li>
              <li>
                <Link to="/books?category=Economics" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Iqtisod
                </Link>
              </li>
              <li>
                <Link to="/books?category=Family-related" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Oilaviy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Aloqa</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Toshkent, Uzbekistan</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+998 90 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@kutubxona.uz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Kutubxona. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-muted-foreground text-sm">Muhabbat bilan yaratilgan</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
