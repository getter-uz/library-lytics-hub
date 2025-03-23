
import React, { useState } from 'react';
import { CreditCard, DollarSign, BookOpen, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockDonationNeeds } from '../utils/mockData';
import { useToast } from "@/components/ui/use-toast";

const Donate = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const { toast } = useToast();

  const paymentMethods = [
    {
      id: 'click',
      name: 'Click',
      logo: 'https://click.uz/app/images/logo.png',
      description: 'O\'zbekistondagi eng mashhur to\'lov tizimi'
    },
    {
      id: 'payme',
      name: 'Payme',
      logo: 'https://cdn.paycom.uz/documentation_assets/payme_01.png',
      description: 'Tez va qulay to\'lov tizimi'
    }
  ];

  const handleDonateClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPaymentMethod(paymentId);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      toast({
        variant: "destructive",
        title: "To'lov usuli tanlanmagan",
        description: "To'lov usulini tanlang",
      });
      return;
    }

    if (!donationAmount || Number(donationAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Noto'g'ri summa",
        description: "Iltimos, to'g'ri summani kiriting",
      });
      return;
    }

    // Here we would redirect to the payment system
    let paymentUrl = '';
    const cardNumber = '5555366073770086';
    const amount = donationAmount;

    if (selectedPaymentMethod === 'click') {
      // Simulate Click payment redirect
      paymentUrl = `https://my.click.uz/pay?service_id=123456&merchant_id=987654&amount=${amount}&transaction_param=${Date.now()}&card_number=${cardNumber}`;
    } else if (selectedPaymentMethod === 'payme') {
      // Simulate Payme payment redirect
      paymentUrl = `https://checkout.paycom.uz?merchant=123456&amount=${Number(amount) * 100}&account[card_number]=${cardNumber}&callback=https://kutubxona.uz/donate/success`;
    }

    // In a real implementation, we'd redirect to actual payment gateways
    toast({
      title: "To'lov tizimiga yo'naltirilmoqda",
      description: `${selectedPaymentMethod === 'click' ? 'Click' : 'Payme'} orqali to'lov amalga oshirilmoqda`,
    });
    
    // Simulate successful payment (in real world would redirect to payment URL)
    setTimeout(() => {
      toast({
        title: "To'lov muvaffaqiyatli amalga oshirildi",
        description: `${amount} so'm homiylik muvaffaqiyatli yuborildi`,
      });
      setIsPaymentModalOpen(false);
      setSelectedPaymentMethod(null);
      setDonationAmount('');
    }, 2000);
    
    // In real implementation: window.location.href = paymentUrl;
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kutubxonamizni qo'llab-quvvatlang</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Sizning xayriyangiz yangi kitoblar sotib olish, binoni ta'mirlash va hamjamiyatimiz uchun yangi imkoniyatlar yaratishga yordam beradi.
            </p>
            <Button size="lg" className="animate-bounce-slow" onClick={handleDonateClick}>
              <DollarSign className="h-4 w-4 mr-2" />
              <span>Homiylik qilish</span>
            </Button>
          </div>
        </section>
        
        {/* Why Donate */}
        <section className="page-container py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Homiylik orqali nimalarga erishamiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Yangi kitoblar</h3>
              <p className="text-sm text-muted-foreground">
                Homiylik tufayli bizning katalogimiz yangi va qiziqarli kitoblar bilan boyitiladi.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Bepul dasturlar</h3>
              <p className="text-sm text-muted-foreground">
                Kutubxonamiz yangi o'qish dasturlari va ta'lim tadbirlarini o'tkazishi mumkin.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Yaxshilangan sharoitlar</h3>
              <p className="text-sm text-muted-foreground">
                Kutubxona binosi yangilanishi va yaxshilanishi mumkin, bu esa yaxshiroq o'qish sharoitlarini ta'minlaydi.
              </p>
            </div>
          </div>
        </section>
        
        {/* Books Needed */}
        <section className="bg-primary/5 py-16">
          <div className="page-container">
            <h2 className="text-2xl font-bold mb-2 text-center">Kutubxonamizga kerak bo'lgan kitoblar</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              Bu kitoblar hozirda eng ko'p talab qilinadi. Ularni sotib olish uchun homiylik qilishingiz mumkin.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDonationNeeds.map((book) => (
                <div key={book.id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">{book.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      book.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : book.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {book.priority === 'high' ? 'Yuqori' : book.priority === 'medium' ? 'O\'rta' : 'Past'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
                  <p className="text-sm mb-4">{book.reason}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{book.estimatedPrice.toLocaleString()} so'm</span>
                    <Button variant="outline" size="sm" onClick={handleDonateClick}>
                      Homiylik qilish
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Payment Methods */}
        <section className="page-container py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">To'lov usullari</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {paymentMethods.map((method) => (
              <div key={method.id} className="glass-card p-6">
                <div className="flex items-center mb-4">
                  <img src={method.logo} alt={method.name} className="h-12 w-auto mr-4" />
                  <h3 className="font-medium">{method.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{method.description}</p>
                <Button className="w-full" onClick={() => {
                  setSelectedPaymentMethod(method.id);
                  handleDonateClick();
                }}>
                  {method.name} orqali to'lash
                </Button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Donation Form */}
        <section className="page-container pb-16">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Homiylik qilish</h2>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              handleDonateClick();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Ism
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                  Homiylik miqdori (so'm)
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="50,000"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  Xabar (ixtiyoriy)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Kutubxonaga tilaklaringiz..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-foreground">
                  Anonim homiylik qilish
                </label>
              </div>
              
              <Button type="submit" className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Homiylik qilish</span>
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>To'lov usulini tanlang</DialogTitle>
            <DialogDescription>
              Homiylik qilish uchun to'lov usulini tanlang
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-primary transition-colors ${
                    selectedPaymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handlePaymentSelect(method.id)}
                >
                  <img src={method.logo} alt={method.name} className="h-12 w-auto mb-3" />
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
              ))}
            </div>
            
            <div>
              <label htmlFor="modal-amount" className="block text-sm font-medium mb-2">
                Homiylik miqdori (so'm)
              </label>
              <input
                type="number"
                id="modal-amount"
                className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="50,000"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
            
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                To'lov <span className="font-medium">5555366073770086</span> kartasiga o'tkaziladi
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>Bekor qilish</Button>
            <Button onClick={handlePaymentSubmit}>To'lovni amalga oshirish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Donate;
