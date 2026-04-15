import { motion } from 'motion/react';
import { Button } from './ui/button';
import { TabType } from '../types';
import { Star } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: TabType) => void;
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Liam O.",
    quote: "The best sourdough in Querétaro! Authentic taste and perfect crust.",
    image: "https://picsum.photos/seed/liam/100/100"
  },
  {
    id: 2,
    name: "Sarah M.",
    quote: "Their lemon pound cake is to die for. Reminds me of home.",
    image: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 3,
    name: "Carlos R.",
    quote: "A hidden gem. The atmosphere and the pastries are absolutely wonderful.",
    image: "https://picsum.photos/seed/carlos/100/100"
  }
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-120px)] w-full flex items-center justify-center overflow-hidden rounded-3xl mt-4">
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
          className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-12 py-12 px-4 sm:px-6 max-w-5xl"
        >
          <div className="space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white leading-tight drop-shadow-2xl"
            >
              A Taste of Ireland, <br />
              <span className="italic text-accent">Baked with Love.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-serif italic max-w-3xl mx-auto drop-shadow-lg"
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
              className="rounded-full px-8 py-6 text-lg sm:px-12 sm:py-8 sm:text-xl md:px-16 md:py-10 md:text-2xl font-serif bg-white text-primary hover:bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all hover:scale-105"
              onClick={() => onNavigate('MENU')}
            >
              Explore Our Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-primary">What Our Customers Say</h2>
          <p className="text-muted-foreground italic text-lg">Don't just take our word for it.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-border/50 flex flex-col items-center text-center space-y-6"
            >
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg italic text-foreground flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-border/50 w-full justify-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-serif font-medium text-primary">{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
