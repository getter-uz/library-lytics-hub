
import { Book } from '../utils/types';
import { fetchBooks } from './api';

export async function searchBooks(query: string): Promise<Book[]> {
  // Fetch all books
  const books = await fetchBooks();
  
  // If no query, return all books
  if (!query.trim()) {
    return books;
  }
  
  // Filter books based on search query
  const normalizedQuery = query.toLowerCase().trim();
  
  return books.filter((book: Book) => {
    return (
      book.name?.toLowerCase().includes(normalizedQuery) ||
      book.author?.name?.toLowerCase().includes(normalizedQuery) ||
      book.category?.toLowerCase().includes(normalizedQuery)
    );
  });
}
