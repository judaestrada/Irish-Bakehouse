/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType, Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import BakeCourse from './components/BakeCourse';
import Tour from './components/Tour';
import DailyPromo from './components/DailyPromo';
import Cart from './components/Cart';
import ExpertAgent from './components/ExpertAgent';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`${quantity}x ${product.name} added to cart!`, {
      description: "Traditional Irish goodness on its way.",
      action: {
        label: "View Cart",
        onClick: () => setActiveTab('CART')
      }
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const checkout = () => {
    toast.success("Order placed successfully!", {
      description: "Thank you for choosing The Irish Bakehouse. Sláinte!",
    });
    setCart([]);
    setActiveTab('HOME');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME': return <Home onNavigate={setActiveTab} />;
      case 'MENU': return <Menu onAddToCart={addToCart} />;
      case 'BAKE COURSE': return <BakeCourse />;
      case 'TOUR': return <Tour />;
      case 'THE DAILY PROMO': return <DailyPromo />;
      case 'CART': return (
        <Cart 
          items={cart} 
          onUpdateQuantity={updateQuantity} 
          onRemove={removeFromCart} 
          onCheckout={checkout}
        />
      );
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />

      <main className="flex-grow container mx-auto px-4 pt-8 pb-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a smooth, snappy mega-menu feel
            }}
            className="w-full h-full origin-top"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-primary">The Irish Bakehouse</h3>
            <p className="text-sm text-muted-foreground italic">
              Bringing the warmth of the Irish hearth to your table. Artisanal, traditional, and always fresh.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Visit Us</h4>
            <p className="text-sm text-muted-foreground">
              Margaritas 40A,<br />
              Jardines de Queretaro, 76020 Santiago de Querétaro, Qro.<br />
              Mon-Sun: 7:00 AM - 7:00 PM
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Connect</h4>
            <div className="flex justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground italic">
          &copy; {new Date().getFullYear()} The Irish Bakehouse. All rights reserved. Sláinte!
        </div>
      </footer>

      <ExpertAgent />
      <Toaster position="bottom-right" />
    </div>
  );
}
