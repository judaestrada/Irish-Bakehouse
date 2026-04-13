import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';

export default function BakeCourse() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-12 px-4 space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-serif text-primary">Baking Workshops</h2>
        <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
          Master the art of traditional Irish baking. From soda bread to Guinness cakes, learn the secrets passed down through generations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden border-none bg-muted/30">
          <img 
            src="https://picsum.photos/seed/course1/600/400" 
            alt="Baking class" 
            className="aspect-video object-cover"
            referrerPolicy="no-referrer"
          />
          <CardHeader>
            <CardTitle className="text-2xl font-serif">The Soda Bread Masterclass</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Learn the science and soul behind Ireland's most famous bread. No yeast, just magic.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>3 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span>Max 8 people</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>Every Saturday</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Main Kitchen</span>
              </div>
            </div>
            <Button className="w-full rounded-full">Book Your Spot - $1,200 MXN</Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-muted/30">
          <img 
            src="https://picsum.photos/seed/course2/600/400" 
            alt="Pastry class" 
            className="aspect-video object-cover"
            referrerPolicy="no-referrer"
          />
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Irish Tea Time Treats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Perfect your scones, shortbreads, and the legendary Victoria Sponge.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>4 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span>Max 6 people</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>Every Sunday</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Pastry Studio</span>
              </div>
            </div>
            <Button className="w-full rounded-full">Book Your Spot - $1,500 MXN</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
