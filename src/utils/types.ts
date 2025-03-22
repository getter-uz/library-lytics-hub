export interface Book {
  id: number;
  name: string;
  author?: {
    name: string;
  };
  category?: string;
  publishedYear?: string;
  stocks?: {
    busy: boolean;
  }[];
  image?: string;
  totalBorrows?: number;
  description?: string;
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

export interface Librarian {
  lastName: string;
  count: string;
  user_id: number;
}

export interface Gender {
  male: string;
  female: string;
}

export interface DailyRent {
  day: string;
  count: string;
}

export interface TopBookLastWeek {
  count: string;
  name: string;
  id: number;
}

export interface FewBook {
  total: string;
  bookId: number;
  name: string;
  busies: string;
  few?: number;
}

export interface Stats {
  top_librarians: Librarian[];
  gender: Gender;
  reading_books_count: string;
  librarians_count: string;
  books_count: string;
  top_books: Book[];
  rents_count: number;
  expired_leases: string;
  dayly_leasing_books_avarage_count_of_last_month: number;
  leased_books_count_of_last_month: string;
  leased_books_count_of_last_week: string;
  leased_books_count_of_last_24_hours: string;
  one_month_leased_rents_by_day: DailyRent[];
  one_month_returned_rents_by_day: DailyRent[];
  top_books_last_week: TopBookLastWeek[];
  new_users_count_last_month: number;
  new_users_count_last_24_hours: number;
  few_books: FewBook[];
}

export interface DonationNeeds {
  id: string;
  title: string;
  author: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedPrice: number;
}
