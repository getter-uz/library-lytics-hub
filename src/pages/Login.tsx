
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
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
            
            <TabsContent value="login">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-login"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="password-login" className="block text-sm font-medium text-foreground mb-1">
                    Parol
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password-login"
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                
                <Button className="w-full">
                  Kirish
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-foreground mb-1">
                      Ism
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-foreground mb-1">
                      Familiya
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email-register" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-register"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Jins
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        className="h-4 w-4 text-primary border-border focus:ring-primary"
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
                      />
                      <label htmlFor="gender-female" className="ml-2 block text-sm text-foreground">
                        Ayol
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password-register" className="block text-sm font-medium text-foreground mb-1">
                    Parol
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password-register"
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
                    <span>Men </span>
                    <a href="#" className="text-primary hover:underline">
                      shartlar va qoidalar
                    </a>
                    <span> bilan tanishdim va roziman</span>
                  </label>
                </div>
                
                <Button className="w-full">
                  Ro'yxatdan o'tish
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
