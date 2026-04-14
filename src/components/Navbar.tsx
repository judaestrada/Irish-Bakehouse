import { motion } from 'motion/react';
import { TabType } from '../types';
import { ShoppingBasket } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
}

export default function Navbar({ activeTab, onTabChange, cartCount }: NavbarProps) {
  const tabs: TabType[] = ['HOME', 'MENU', 'BAKE COURSE', 'TOUR', 'THE DAILY PROMO'];

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
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <button 
          onClick={() => onTabChange('HOME')}
          className="flex flex-col items-start group shrink-0"
        >
          <span className="text-xl sm:text-2xl font-serif font-bold text-primary leading-none group-hover:text-secondary transition-colors">
            The Irish
          </span>
          <span className="text-xs sm:text-sm font-serif italic text-secondary leading-none">
            Bakehouse
          </span>
        </button>

        {/* Navigation Buttons - Scrollable on mobile, aligned right */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => onTabChange(tab)}
              className={`rounded-full whitespace-nowrap text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'shadow-md bg-primary text-primary-foreground' 
                  : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <form onSubmit={handleCommand} className="hidden lg:block">
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
            <ShoppingBasket className={`w-5 h-5 sm:w-6 sm:h-6 ${activeTab === 'CART' ? 'text-primary' : 'text-muted-foreground'}`} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-secondary text-[9px] sm:text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

      </div>
    </nav>
  );
}
