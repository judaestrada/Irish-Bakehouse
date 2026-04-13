import { motion } from 'motion/react';
import { TabType } from '../types';
import { ShoppingBasket, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { toast } from 'sonner';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
}

export default function Navbar({ activeTab, onTabChange, cartCount }: NavbarProps) {
  const tabs: TabType[] = ['HOME', 'MENU', 'BAKE COURSE', 'TOUR', 'THE DAILY PROMO'];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`
            text-sm font-medium transition-all duration-300 relative py-2
            ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
            ${mobile ? 'text-2xl font-serif text-left' : ''}
          `}
        >
          {tab}
          {!mobile && activeTab === tab && (
            <motion.div 
              layoutId="nav-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      ))}
    </>
  );

  const [command, setCommand] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toUpperCase().trim();
    if (cmd === 'MENU') {
      onTabChange('MENU');
      toast.info("Opening Menu...");
    } else if (cmd === 'CART') {
      onTabChange('CART');
      toast.info("Opening Cart...");
    } else {
      toast.error("Unknown command", {
        description: "Try typing 'MENU' or 'CART'"
      });
    }
    setCommand('');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onTabChange('HOME')}
            className="flex flex-col items-start group"
          >
            <span className="text-2xl font-serif font-bold text-primary leading-none group-hover:text-secondary transition-colors">
              The Irish
            </span>
            <span className="text-sm font-serif italic text-secondary leading-none">
              Bakehouse
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleCommand} className="hidden md:block">
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type MENU or CART..."
              className="bg-muted px-4 py-1.5 rounded-full text-xs font-serif italic border border-transparent focus:border-primary outline-none transition-all w-40 focus:w-56"
            />
          </form>

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-primary/10"
            onClick={() => onTabChange('CART')}
          >
            <ShoppingBasket className={`w-6 h-6 ${activeTab === 'CART' ? 'text-primary' : 'text-muted-foreground'}`} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
                <MenuIcon className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col pt-20 gap-8">
                <NavLinks mobile />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
