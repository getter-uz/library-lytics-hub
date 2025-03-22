
import { Stats } from '../utils/types';

const API_BASE_URL = 'https://library.softly.uz/api/app';

export async function fetchStats(): Promise<Stats> {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}

export async function fetchBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    // Return the items array from the data object
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function fetchBookById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
}

export async function fetchUsers() {
  // This is a mock function until we implement Supabase
  // Return mock users data
  return [
    {
      id: '1',
      name: 'Abdulloh',
      email: 'abdulloh@example.com',
      gender: 'male',
      isAdmin: true,
      borrowedBooks: ['1', '2'],
      readBooks: ['3', '4', '5']
    },
    {
      id: '2',
      name: 'Fatima',
      email: 'fatima@example.com',
      gender: 'female',
      isAdmin: false,
      borrowedBooks: ['6'],
      readBooks: ['7', '8']
    },
  ];
}
