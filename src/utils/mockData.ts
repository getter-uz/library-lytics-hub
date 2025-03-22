
import { Book, BookCategory, Stats, User, DonationNeeds } from './types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Hadis va Hayot',
    author: 'Shaykh Muhammad Sodiq Muhammad Yusuf',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/hilol-nashr-kitoblari/muhammad-sodiq-muhammad-yusuf/hadis-va-hayot-10-jild-web-500x750.jpg',
    category: 'Shaykh Muhammad Sodiq',
    isAvailable: true,
    description: 'Hadis va Hayot is a comprehensive collection of hadiths with commentary.',
    publishedYear: 2018,
    totalBorrows: 120
  },
  {
    id: '2',
    title: 'Ruhiy Tarbiya',
    author: 'Shaykh Muhammad Sodiq Muhammad Yusuf',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/001_hilol_nashr/001-Qattiq-muqova/ruhi-tarbiya-web-500x750.jpg',
    category: 'Religious',
    isAvailable: false,
    description: 'A guide to spiritual education in Islam.',
    publishedYear: 2015,
    totalBorrows: 95,
    currentReader: 'Abdulaziz Komilov',
    dueDate: new Date('2023-12-15')
  },
  {
    id: '3',
    title: 'Iqtisod Asoslari',
    author: 'Adam Smith',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/91gUQMJmKKL.jpg',
    category: 'Economics',
    isAvailable: true,
    description: 'The fundamental principles of economics explained.',
    publishedYear: 2019,
    totalBorrows: 78
  },
  {
    id: '4',
    title: 'Oila Saodati',
    author: 'Shaykh Muhammad Sodiq Muhammad Yusuf',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/hilol-nashr-kitoblari/oila-saodati-web-500x750.jpg',
    category: 'Family-related',
    isAvailable: false,
    description: 'A guide to building a happy family according to Islamic teachings.',
    publishedYear: 2016,
    totalBorrows: 150,
    currentReader: 'Malika Rahimova',
    dueDate: new Date('2023-12-20')
  },
  {
    id: '5',
    title: 'Farzand Tarbiyasi',
    author: 'Abdullah Muborak',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/003_boshqa_nashrlar/001_diniy/farzand-tarbiyasi-web-500x750.jpg',
    category: 'Child upbringing',
    isAvailable: true,
    description: 'A comprehensive guide to raising children with proper values.',
    publishedYear: 2020,
    totalBorrows: 65
  },
  {
    id: '6',
    title: 'Shaytanat',
    author: 'Tohir Malik',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/002-Badiiy/shaytanat-5-jild-web-500x750.jpg',
    category: 'Uzbek literature',
    isAvailable: true,
    description: 'A famous Uzbek novel about crime and punishment.',
    publishedYear: 2005,
    totalBorrows: 200
  },
  {
    id: '7',
    title: 'Dunyoning Ishlari',
    author: 'O\'tkir Hoshimov',
    coverImage: 'https://kitoblardunyosi.uz/image/cache/catalog/001-Kitoblar/002-Badiiy/o-tkir-hoshimov-dunyoning-ishlari-web-500x750.jpg',
    category: 'Uzbek literature',
    isAvailable: false,
    description: 'A collection of stories about daily life in Uzbekistan.',
    publishedYear: 2010,
    totalBorrows: 180,
    currentReader: 'Shohruh Ismoilov',
    dueDate: new Date('2023-12-01')
  },
  {
    id: '8',
    title: 'Ishq Fasli',
    author: 'Orhan Pamuk',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDUbi7xGZQUfgK_G9IR9TlTnkZuU8UQBuZQ&usqp=CAU',
    category: 'Turkish literature',
    isAvailable: true,
    description: 'A novel about love and passion in Istanbul.',
    publishedYear: 2017,
    totalBorrows: 90
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Abdulaziz Komilov',
    email: 'abdulaziz@example.com',
    gender: 'male',
    isAdmin: true,
    borrowedBooks: ['2'],
    readBooks: ['1', '3', '5']
  },
  {
    id: '2',
    name: 'Malika Rahimova',
    email: 'malika@example.com',
    gender: 'female',
    isAdmin: false,
    borrowedBooks: ['4'],
    readBooks: ['3', '6']
  },
  {
    id: '3',
    name: 'Shohruh Ismoilov',
    email: 'shohruh@example.com',
    gender: 'male',
    isAdmin: false,
    borrowedBooks: ['7'],
    readBooks: ['1', '6']
  }
];

export const mockStats: Stats = {
  totalReaders: 150,
  totalBorrowedBooks: 42,
  totalBooksRead: 1245,
  totalBooks: 487,
  genderDistribution: {
    male: 87,
    female: 63
  },
  currentlyBeingRead: 42,
  overdueBooks: 12,
  borrowedToday: 8,
  borrowedThisWeek: 35,
  borrowedThisMonth: 120,
  borrowedLast24Hours: 8,
  mostReadBooksThisWeek: mockBooks.slice(0, 5),
  top100Books: mockBooks.slice(0, 8)
};

export const mockDonationNeeds: DonationNeeds[] = [
  {
    id: '1',
    title: 'Tafsiri Hilol',
    author: 'Shaykh Muhammad Sodiq Muhammad Yusuf',
    reason: 'High demand from readers',
    priority: 'high',
    estimatedPrice: 350000
  },
  {
    id: '2',
    title: 'Sahih Al-Bukhari',
    author: 'Imam Bukhari',
    reason: 'Essential religious text',
    priority: 'medium',
    estimatedPrice: 280000
  },
  {
    id: '3',
    title: 'Moliyaviy Mustaqillik',
    author: 'Robert Kiyosaki',
    reason: 'Popular economics book',
    priority: 'low',
    estimatedPrice: 120000
  }
];
