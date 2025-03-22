
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { mockBooks } from '../utils/mockData';
import { Book, BookCategory } from '../utils/types';

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'all'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'borrowed'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Categories
  const categories: BookCategory[] = [
    'Religious',
    'Fiction',
    'Economics',
    'Child upbringing',
    'Family-related',
    'Shaykh Muhammad Sodiq',
    'Turkish literature',
    'Uzbek literature',
    'Others'
  ];

  useEffect(() => {
    // Load books
    setBooks(mockBooks);
    
    // Check for URL parameters
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category as BookCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters
    let result = [...books];
    
    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    // Availability filter
    if (availabilityFilter === 'available') {
      result = result.filter(book => book.isAvailable);
    } else if (availabilityFilter === 'borrowed') {
      result = result.filter(book => !book.isAvailable);
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredBooks(result);
  }, [books, selectedCategory, availabilityFilter, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category: BookCategory | 'all') => {
    setSelectedCategory(category);
    if (category !== 'all') {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow page-container">
        <h1 className="text-3xl font-bold mb-6">Kutubxona Katalogi</h1>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Kitob yoki muallif nomi..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 md:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filtrlar</span>
            </Button>
          </div>
          
          {showFilters && (
            <div className="glass-card p-4 mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Kategoriyalar</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-foreground hover:bg-primary/20'
                      }`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      Barchasi
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-foreground hover:bg-primary/20'
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Mavjudlik</h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        availabilityFilter === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-foreground hover:bg-primary/20'
                      }`}
                      onClick={() => setAvailabilityFilter('all')}
                    >
                      Barchasi
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        availabilityFilter === 'available'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-foreground hover:bg-primary/20'
                      }`}
                      onClick={() => setAvailabilityFilter('available')}
                    >
                      Mavjud
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        availabilityFilter === 'borrowed'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-foreground hover:bg-primary/20'
                      }`}
                      onClick={() => setAvailabilityFilter('borrowed')}
                    >
                      Berilgan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          {filteredBooks.length} ta kitob topildi
        </p>
        
        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Kitoblar topilmadi. Boshqa so'rov bilan urinib ko'ring.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
