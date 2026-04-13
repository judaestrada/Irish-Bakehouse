import { motion } from 'motion/react';
import { Button } from './ui/button';
import { TabType } from '../types';

interface HomeProps {
  onNavigate: (tab: TabType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full flex items-center justify-center overflow-hidden rounded-3xl my-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/portada-irish-bakehouse.jpg" 
          alt="The Irish Bakehouse Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center text-center space-y-12 py-12 px-6 max-w-5xl"
      >
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif text-white leading-tight drop-shadow-2xl"
          >
            A Taste of Ireland, <br />
            <span className="italic text-accent">Baked with Love.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 font-serif italic max-w-3xl mx-auto drop-shadow-lg"
          >
            Welcome to The Irish Bakehouse. From our hearth to your home, we bring you the finest artisanal breads and pastries, crafted with traditional recipes and a touch of Irish magic.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full justify-center"
        >
          <Button 
            size="lg" 
            className="rounded-full px-16 py-10 text-2xl font-serif bg-white text-primary hover:bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all hover:scale-105"
            onClick={() => onNavigate('MENU')}
          >
            Explore Our Menu
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
