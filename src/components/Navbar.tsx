import { motion } from 'motion/react';
import { TabType } from '../types';
import { ShoppingBasket, Menu as MenuIcon } from 'lucide-react';
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [command, setCommand] = useState('');

  const handleTabChange = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

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

        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2 px-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => onTabChange(tab)}
              className={`rounded-full whitespace-nowrap text-xs lg:text-sm font-medium transition-all duration-300 ${
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
                <MenuIcon className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col pt-20 gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      text-2xl font-serif text-left transition-all duration-300 py-2
                      ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </nav>
  );
}
