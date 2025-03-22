
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/searchService';
import { Book } from '../utils/types';
import { Button } from '@/components/ui/button';

const Books = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const results = await searchBooks(searchQuery);
        setBooks(results);
        setError(null);
      } catch (err) {
        console.error('Error searching books:', err);
        setError('Kitoblarni qidirishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kutubxona Kitoblari</h1>
          {searchQuery && (
            <p className="text-muted-foreground">
              "{searchQuery}" uchun qidiruv natijalari ({books.length})
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Qayta urinib ko'ring
            </Button>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">Kitoblar topilmadi</p>
            {searchQuery && (
              <p className="text-muted-foreground">
                "{searchQuery}" bo'yicha natijalar topilmadi. Boshqa so'z bilan qidirib ko'ring.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
