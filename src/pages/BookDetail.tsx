
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CalendarDays, User, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { fetchBookById } from '../services/api';
import { formatDistanceToNow } from 'date-fns';

const BookDetail = () => {
  const { id } = useParams<{id: string}>();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id || ''),
    enabled: !!id,
  });
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow page-container py-6">
        <Link to="/books" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Orqaga</span>
        </Link>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>Kitob ma'lumotlarini yuklashda xatolik yuz berdi.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Qayta urinib ko'ring
            </Button>
          </div>
        ) : book ? (
          <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full rounded-lg shadow-md object-cover object-center"
                  />
                  <div className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium text-white rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                    {book.isAvailable ? 'Mavjud' : 'Berilgan'}
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>Kategoriya: <span className="text-foreground">{book.category}</span></span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    <span>Nashr yili: <span className="text-foreground">{book.publishedYear}</span></span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <UserCheck className="h-5 w-5 mr-2" />
                    <span>O'qilgan: <span className="text-foreground">{book.totalBorrows} marta</span></span>
                  </div>
                  
                  {!book.isAvailable && book.dueDate && (
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-5 w-5 mr-2" />
                      <span>Qaytarilish kuni: <span className="text-foreground">
                        {new Date(book.dueDate).toLocaleDateString()}
                      </span> ({formatDistanceToNow(new Date(book.dueDate), { addSuffix: true })})</span>
                    </div>
                  )}
                </div>
                
                {book.isAvailable && (
                  <Button className="w-full mt-6">
                    Kitobni olish
                  </Button>
                )}
              </div>
              
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{book.author}</p>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium mb-3">Kitob haqida</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-medium mb-3">Tavsiyalar</h2>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Bu kitobni o'qigan insonlar quyidagi kitoblarni ham o'qishni tavsiya etishadi:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Hadis va Hayot</li>
                        <li>Ruhiy tarbiya</li>
                        <li>Iqtisod asoslari</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Kitob topilmadi.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
