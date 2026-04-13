import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, Timer, Gift } from 'lucide-react';

export default function DailyPromo() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-12 px-4 space-y-12"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Today's Special
        </div>
        <h2 className="text-5xl font-serif text-primary">The Daily Promo</h2>
        <p className="text-xl text-muted-foreground italic">
          Fresh offers for a fresh day. Don't miss out!
        </p>
      </div>

      <Card className="relative overflow-hidden border-none bg-primary text-white p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-white text-primary hover:bg-white/90">
              20% OFF
            </Badge>
            <h3 className="text-4xl font-serif">Guinness Bread & Scones Bundle</h3>
            <p className="text-primary-foreground/80 text-lg">
              Get a full loaf of our Guinness Brown Bread and a 6-pack of Scones for a special price. Perfect for a family breakfast.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>Ends in 4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Free Jam included</span>
              </div>
            </div>
            <Button variant="secondary" size="lg" className="w-full md:w-auto rounded-full px-8">
              Claim Offer - $180 MXN
            </Button>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/promo/600/600" 
              alt="Promo bundle" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Early Bird", desc: "10% off before 9 AM", icon: Timer },
          { title: "Student Treat", desc: "Free cookie with any coffee", icon: Gift },
          { title: "Baker's Dozen", desc: "Buy 12, get 1 free on all buns", icon: Sparkles },
        ].map((item) => (
          <Card key={item.title} className="border-none bg-muted/50 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <item.icon className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="font-serif text-xl">{item.title}</h4>
            <p className="text-sm text-muted-foreground italic">{item.desc}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
