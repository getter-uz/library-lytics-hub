
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
    return data;
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
