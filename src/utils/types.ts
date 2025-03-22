
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: BookCategory;
  isAvailable: boolean;
  description: string;
  publishedYear: number;
  totalBorrows: number;
  currentReader?: string;
  dueDate?: Date;
}

export type BookCategory = 
  | 'Religious'
  | 'Fiction'
  | 'Economics'
  | 'Child upbringing'
  | 'Family-related'
  | 'Shaykh Muhammad Sodiq'
  | 'Turkish literature'
  | 'Uzbek literature'
  | 'Others';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  isAdmin: boolean;
  borrowedBooks: string[];
  readBooks: string[];
}

export interface Stats {
  totalReaders: number;
  totalBorrowedBooks: number;
  totalBooksRead: number;
  totalBooks: number;
  genderDistribution: {
    male: number;
    female: number;
  };
  currentlyBeingRead: number;
  overdueBooks: number;
  borrowedToday: number;
  borrowedThisWeek: number;
  borrowedThisMonth: number;
  borrowedLast24Hours: number;
  mostReadBooksThisWeek: Book[];
  top100Books: Book[];
}

export interface DonationNeeds {
  id: string;
  title: string;
  author: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedPrice: number;
}
