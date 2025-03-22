
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../utils/types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="group">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:shadow-md h-full flex flex-col animate-fade-in">
        <div className="relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
            {book.isAvailable ? 'Mavjud' : 'Berilgan'}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{book.author}</p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {book.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {book.publishedYear}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
