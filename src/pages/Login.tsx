
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  
  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      toast({
        title: "Muvaffaqiyatli kirish!",
        description: "Tizimga muvaffaqiyatli kirdingiz.",
      });
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Shartlar va qoidalarni qabul qilishingiz kerak');
      return;
    }
    
    if (!gender) {
      setError('Jinsni tanlang');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(
        registerEmail, 
        registerPassword, 
        {
          first_name: firstName,
          last_name: lastName,
          gender
        }
      );
      
      if (error) {
        setError(error.message);
        return;
      }
      
      toast({
        title: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
        description: "Hisobingiz yaratildi. Email manzilingizni tasdiqlang.",
      });
      
    } catch (err: any) {
      setError(err.message || "Ro'yxatdan o'tib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="glass-card p-6 animate-scale-in">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Kirish</TabsTrigger>
              <TabsTrigger value="register">Ro'yxatdan o'tish</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    type="email"
                    id="email-login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password-login">Parol</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password-login"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                      Eslab qolish
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Parolni unutdingizmi?
                    </a>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Kirish...' : 'Kirish'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">Ism</Label>
                    <Input
                      type="text"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="last-name">Familiya</Label>
                    <Input
                      type="text"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    type="email"
                    id="email-register"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Jins</Label>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        className="h-4 w-4 text-primary border-border focus:ring-primary"
                        value="male"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        required
                      />
                      <label htmlFor="gender-male" className="ml-2 block text-sm text-foreground">
                        Erkak
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-female"
                        name="gender"
                        className="h-4 w-4 text-primary border-border focus:ring-primary"
                        value="female"
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                      />
                      <label htmlFor="gender-female" className="ml-2 block text-sm text-foreground">
                        Ayol
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password-register">Parol</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password-register"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
                    <span>Men </span>
                    <a href="#" className="text-primary hover:underline">
                      shartlar va qoidalar
                    </a>
                    <span> bilan tanishdim va roziman</span>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
