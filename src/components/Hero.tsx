
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="relative overflow-hidden mb-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"></div>
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Bizning <span className="text-primary">Kutubxonaga</span> Xush Kelibsiz
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: '100ms'}}>
            Kutubxonamizda minglab kitoblar va ilm manbalari sizni kutmoqda. O'zingizga kerakli ilm va ma'rifat manbalarini toping.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '200ms'}}>
            <form onSubmit={handleSearch} className="relative w-full sm:w-96">
              <input 
                type="text" 
                placeholder="Qidirish..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button type="submit" className="sr-only">Qidirish</button>
            </form>
            
            <Link to="/books">
              <Button size="lg" className="w-full sm:w-auto">
                Kitoblarni ko'rish
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{animationDelay: '300ms'}}>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Kitoblar</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground mt-1">O'quvchilar</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground mt-1">Kategoriyalar</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-sm text-muted-foreground mt-1">O'qilgan kitoblar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
