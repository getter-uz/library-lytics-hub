
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, User, Calendar, Clock, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockBooks } from '../utils/mockData';
import { Book } from '../utils/types';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundBook = mockBooks.find(b => b.id === id);
      setBook(foundBook || null);
      
      if (foundBook) {
        // Find related books in the same category
        const related = mockBooks
          .filter(b => b.category === foundBook.category && b.id !== foundBook.id)
          .slice(0, 4);
        setRelatedBooks(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-primary/20 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-primary/20 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-primary/20 rounded"></div>
                <div className="h-4 bg-primary/20 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Kitob topilmadi</h1>
            <Link to="/books">
              <Button variant="outline">Barcha kitoblar</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow page-container">
        <Link to="/books" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Barcha kitoblar</span>
        </Link>
        
        <div className="glass-card overflow-hidden p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                {book.isAvailable ? 'Mavjud' : 'Berilgan'}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{book.author}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Kategoriya</span>
                  <span className="font-medium">{book.category}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Nashr yili</span>
                  <span className="font-medium">{book.publishedYear}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Jami berilgan</span>
                  <span className="font-medium">{book.totalBorrows} marta</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Holati</span>
                  <span className={`font-medium ${book.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                    {book.isAvailable ? 'Mavjud' : 'Berilgan'}
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium mb-2">Tavsif</h2>
                <p className="text-muted-foreground">{book.description}</p>
              </div>
              
              {!book.isAvailable && book.currentReader && book.dueDate && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
                  <h3 className="font-medium text-red-700 mb-2">Kitob ma'lumotlari</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">
                        <span className="text-muted-foreground">O'quvchi: </span>
                        {book.currentReader}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">
                        <span className="text-muted-foreground">Qaytarish sanasi: </span>
                        {new Date(book.dueDate).toLocaleDateString('uz-UZ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                {book.isAvailable ? (
                  <Button className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Kitobni olish</span>
                  </Button>
                ) : (
                  <Button disabled className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Kitob qaytishini kuting</span>
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Xarid qilish</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">O'xshash kitoblar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedBooks.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id} className="group">
                  <div className="glass-card overflow-hidden transition-all duration-300 group-hover:shadow-md">
                    <div className="relative">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                        {book.isAvailable ? 'Mavjud' : 'Berilgan'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{book.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
