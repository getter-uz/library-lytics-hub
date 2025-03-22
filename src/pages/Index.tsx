
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BookMarked, Clock, TrendingUp, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import StatCard from '../components/StatCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockBooks, mockStats } from '../utils/mockData';

const Index = () => {
  // Get featured books (top 4 by total borrows)
  const featuredBooks = [...mockBooks]
    .sort((a, b) => b.totalBorrows - a.totalBorrows)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Books */}
        <section className="page-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Mashhur Kitoblar</h2>
            <Link to="/books">
              <Button variant="ghost">
                Hammasini ko'rish
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
        
        {/* Stats */}
        <section className="page-container py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Kutubxona Statistikasi</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Jami o'quvchilar"
              value={mockStats.totalReaders}
              icon={<Users className="h-6 w-6" />}
              trend={{ value: 12, isPositive: true }}
            />
            
            <StatCard
              title="Jami kitoblar"
              value={mockStats.totalBooks}
              icon={<BookOpen className="h-6 w-6" />}
              trend={{ value: 5, isPositive: true }}
            />
            
            <StatCard
              title="O'qilgan kitoblar"
              value={mockStats.totalBooksRead}
              icon={<BookMarked className="h-6 w-6" />}
              trend={{ value: 8, isPositive: true }}
            />
            
            <StatCard
              title="Hozirda o'qilayotgan"
              value={mockStats.currentlyBeingRead}
              icon={<Clock className="h-6 w-6" />}
            />
            
            <StatCard
              title="Shu oyda berilgan"
              value={mockStats.borrowedThisMonth}
              icon={<TrendingUp className="h-6 w-6" />}
              trend={{ value: 15, isPositive: true }}
            />
            
            <StatCard
              title="Eng faol o'quvchilar"
              value="87"
              icon={<Award className="h-6 w-6" />}
              description="so'nggi 30 kunda"
            />
          </div>
        </section>
        
        {/* Categories */}
        <section className="bg-primary/5 py-16">
          <div className="page-container">
            <h2 className="text-2xl font-bold mb-8 text-center">Kitob Kategoriyalari</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Diniy', count: 120 },
                { name: 'Badiiy', count: 95 },
                { name: 'Iqtisod', count: 45 },
                { name: 'Bolalar tarbiyasi', count: 30 },
                { name: 'Oilaviy', count: 50 },
                { name: 'Shayx Muhammad Sodiq', count: 25 },
                { name: 'Turk adabiyoti', count: 35 },
                { name: 'O\'zbek adabiyoti', count: 80 }
              ].map((category) => (
                <Link to={`/books?category=${category.name}`} key={category.name} className="group">
                  <div className="glass-card p-4 text-center transition-all group-hover:shadow-md group-hover:bg-white/90">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count} kitob</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="page-container py-16">
          <h2 className="text-2xl font-bold mb-2 text-center">Qanday Ishlaydi</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Kutubxonamizdan foydalanish oson va qulay. Atigi uch qadamda kitoblarni o'qishingiz mumkin.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Ro'yxatdan o'ting</h3>
              <p className="text-sm text-muted-foreground">
                Tizimda ro'yxatdan o'ting va o'zingizga profil yarating.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Kitobni tanlang</h3>
              <p className="text-sm text-muted-foreground">
                Katalogimizdan o'zingizga kerakli kitobni toping.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Kitobni oling</h3>
              <p className="text-sm text-muted-foreground">
                Kutubxonaga kelib, tanlagan kitobingizni oling va o'qing.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login">
              <Button>
                Hoziroq boshlang
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
