
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  BarChart, 
  Settings, 
  PlusCircle, 
  Edit, 
  Trash, 
  Search,
  ChevronLeft,
  BookMarked,
  Clock,
  AlertTriangle,
  UserPlus,
  TrendingUp
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchStats } from '../services/api';
import { Book } from '../utils/types';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewBookDialogOpen, setIsNewBookDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    category: '',
    publishedYear: '',
    description: '',
    image: ''
  });
  const { toast } = useToast();
  
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  const { data: books, isLoading: booksLoading, error: booksError } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      return data.map((profile: any) => ({
        id: profile.id,
        name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A',
        email: '', // Email is not stored in profiles table
        gender: profile.gender || 'N/A',
        borrowedBooks: [],
        readBooks: [],
        isAdmin: false
      }));
    },
  });

  const isLoading = statsLoading || booksLoading || usersLoading;
  const error = statsError || booksError;
  
  const handleAddBook = () => {
    // This would typically submit the new book to your API or Supabase
    toast({
      title: "Kitob qo'shildi",
      description: "Yangi kitob muvaffaqiyatli qo'shildi",
    });
    setIsNewBookDialogOpen(false);
    setNewBook({
      name: '',
      author: '',
      category: '',
      publishedYear: '',
      description: '',
      image: ''
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Qidirish..."
                className="pl-10 pr-4 py-2 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button onClick={() => setIsNewBookDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Yangi kitob</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              <span>Statistika</span>
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Kitoblar</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Foydalanuvchilar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>Sozlamalar</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">
                <p>Statistikani yuklashda xatolik yuz berdi.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Qayta urinib ko'ring
                </Button>
              </div>
            ) : stats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="Jami kitoblar"
                    value={Number(stats.books_count) || 0}
                    icon={<BookOpen className="h-6 w-6" />}
                    trend={{ value: 5, isPositive: true }}
                  />
                  <StatCard
                    title="Jami o'quvchilar"
                    value={Number(stats.librarians_count) || 0}
                    icon={<Users className="h-6 w-6" />}
                    trend={{ value: 12, isPositive: true }}
                  />
                  <StatCard
                    title="Berilgan kitoblar"
                    value={Number(stats.reading_books_count) || 0}
                    icon={<BookMarked className="h-6 w-6" />}
                    trend={{ value: 3, isPositive: true }}
                  />
                  <StatCard
                    title="Muddati o'tgan"
                    value={Number(stats.expired_leases) || 0}
                    icon={<AlertTriangle className="h-6 w-6" />}
                    trend={{ value: 2, isPositive: false }}
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-card p-6">
                    <h2 className="font-medium mb-4">So'nggi faoliyat</h2>
                    <div className="space-y-4">
                      {[
                        { user: "Abdulaziz Kamolov", action: "kitob oldi", book: "Hadis va Hayot", time: "5 daqiqa oldin" },
                        { user: "Malika Rahimova", action: "kitob qaytardi", book: "Iqtisod Asoslari", time: "2 soat oldin" },
                        { user: "Admin", action: "yangi kitob qo'shdi", book: "Ruhiy Tarbiya", time: "5 soat oldin" },
                        { user: "Shohruh Ismoilov", action: "ro'yxatdan o'tdi", book: "", time: "1 kun oldin" },
                        { user: "Admin", action: "kitob yangiladi", book: "Farzand Tarbiyasi", time: "2 kun oldin" }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                            {activity.action.includes("kitob oldi") ? (
                              <BookOpen className="h-4 w-4" />
                            ) : activity.action.includes("qaytardi") ? (
                              <BookMarked className="h-4 w-4" />
                            ) : activity.action.includes("qo'shdi") || activity.action.includes("yangiladi") ? (
                              <Edit className="h-4 w-4" />
                            ) : (
                              <UserPlus className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-muted-foreground"> {activity.action} </span>
                              {activity.book && <span className="font-medium">{activity.book}</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass-card p-6">
                    <h2 className="font-medium mb-4">Tez yordam</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        <span>Yangi kitob qo'shish</span>
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        <span>Foydalanuvchi qo'shish</span>
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <BookMarked className="h-4 w-4 mr-2" />
                        <span>Kitob berish</span>
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Muddati o'tganlar</span>
                      </Button>
                    </div>
                    
                    {stats && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Tez statistika</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Bugun berilgan kitoblar</span>
                            <span className="text-sm font-medium">{stats.leased_books_count_of_last_24_hours}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Shu hafta berilgan kitoblar</span>
                            <span className="text-sm font-medium">{stats.leased_books_count_of_last_week}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Shu oy berilgan kitoblar</span>
                            <span className="text-sm font-medium">{stats.leased_books_count_of_last_month}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Erkaklar / Ayollar</span>
                            <span className="text-sm font-medium">
                              {stats.gender.male} / {stats.gender.female}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="books">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium">Barcha kitoblar ({books ? books.length : 0})</h2>
              <Button onClick={() => setIsNewBookDialogOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Yangi kitob</span>
              </Button>
            </div>
            
            {booksLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : booksError ? (
              <div className="text-center py-12 text-destructive">
                <p>Kitoblarni yuklashda xatolik yuz berdi.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Qayta urinib ko'ring
                </Button>
              </div>
            ) : books && books.length > 0 ? (
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sarlavha</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Muallif</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kategoriya</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nashr yili</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Holati</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book: Book) => (
                        <tr key={book.id} className="border-b border-border hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              <img
                                src={book.image || 'https://via.placeholder.com/70x100'}
                                alt={book.name}
                                className="h-10 w-7 object-cover rounded mr-3"
                              />
                              {book.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{book.author?.name || 'Nomalum'}</td>
                          <td className="px-4 py-3 text-sm">{book.category || 'Nomalum'}</td>
                          <td className="px-4 py-3 text-sm">{book.publishedYear || 'Nomalum'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              book.stocks && book.stocks.some(stock => !stock.busy)
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {book.stocks && book.stocks.some(stock => !stock.busy) ? 'Mavjud' : 'Berilgan'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-1 text-muted-foreground hover:text-primary">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-muted-foreground hover:text-destructive">
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Kitoblar topilmadi.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="users">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium">Barcha foydalanuvchilar ({users ? users.length : 0})</h2>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Yangi foydalanuvchi</span>
              </Button>
            </div>
            
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ism</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Jins</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kitoblar</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rol</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm">{user.name}</td>
                        <td className="px-4 py-3 text-sm">{user.gender === 'male' ? 'Erkak' : user.gender === 'female' ? 'Ayol' : 'Kiritilmagan'}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <span className="mr-2">{user.borrowedBooks?.length || 0} berilgan</span>
                            <span>/ {user.readBooks?.length || 0} o'qilgan</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isAdmin 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.isAdmin ? 'Admin' : 'Foydalanuvchi'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-1 text-muted-foreground hover:text-primary">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-muted-foreground hover:text-destructive">
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="glass-card p-6 max-w-3xl">
              <h2 className="font-medium mb-6">Tizim sozlamalari</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Asosiy ma'lumotlar</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="library-name" className="block text-sm text-muted-foreground mb-1">
                        Kutubxona nomi
                      </label>
                      <input
                        type="text"
                        id="library-name"
                        defaultValue="Kutubxona"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="library-address" className="block text-sm text-muted-foreground mb-1">
                        Kutubxona manzili
                      </label>
                      <input
                        type="text"
                        id="library-address"
                        defaultValue="Toshkent, Uzbekistan"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="library-phone" className="block text-sm text-muted-foreground mb-1">
                        Aloqa telefoni
                      </label>
                      <input
                        type="text"
                        id="library-phone"
                        defaultValue="+998 90 123 45 67"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Tizim sozlamalari</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Kitob berish muddati</p>
                        <p className="text-xs text-muted-foreground">Standart kitob berish muddati</p>
                      </div>
                      <select className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                        <option>7 kun</option>
                        <option>14 kun</option>
                        <option selected>21 kun</option>
                        <option>30 kun</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Muddati o'tgan jarimasi</p>
                        <p className="text-xs text-muted-foreground">Har bir kechikkan kun uchun jarima</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="1000"
                        className="w-32 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Foydalanuvchi kitoblari</p>
                        <p className="text-xs text-muted-foreground">Bir vaqtda olinishi mumkin bo'lgan kitoblar soni</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="3"
                        className="w-32 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Saqlash</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* New Book Dialog */}
      <Dialog open={isNewBookDialogOpen} onOpenChange={setIsNewBookDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Yangi kitob qo'shish</DialogTitle>
            <DialogDescription>
              Yangi kitob ma'lumotlarini kiriting. Barcha maydonlarni to'ldiring.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="book-title">Kitob nomi</Label>
                <Input
                  id="book-title"
                  value={newBook.name}
                  onChange={(e) => setNewBook({...newBook, name: e.target.value})}
                  placeholder="Kitob nomini kiriting"
                />
              </div>
              <div>
                <Label htmlFor="book-author">Muallif</Label>
                <Input
                  id="book-author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  placeholder="Muallif ismi"
                />
              </div>
              <div>
                <Label htmlFor="book-year">Nashr yili</Label>
                <Input
                  id="book-year"
                  value={newBook.publishedYear}
                  onChange={(e) => setNewBook({...newBook, publishedYear: e.target.value})}
                  placeholder="Nashr yilini kiriting"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="book-category">Kategoriya</Label>
                <Input
                  id="book-category"
                  value={newBook.category}
                  onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                  placeholder="Kitob kategoriyasini kiriting"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="book-image">Rasm URL</Label>
                <Input
                  id="book-image"
                  value={newBook.image}
                  onChange={(e) => setNewBook({...newBook, image: e.target.value})}
                  placeholder="Kitob rasmi uchun URL"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="book-description">Tavsif</Label>
                <textarea
                  id="book-description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                  placeholder="Kitob haqida qisqacha ma'lumot"
                  className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBookDialogOpen(false)}>Bekor qilish</Button>
            <Button onClick={handleAddBook}>Kitobni qo'shish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
