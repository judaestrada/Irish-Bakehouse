import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { History, Wheat, Flame, Heart } from 'lucide-react';

export default function Tour() {
  const steps = [
    {
      title: "The Hearth",
      description: "Our stone ovens are the heart of the bakehouse, firing at precise temperatures to achieve that perfect Irish crust.",
      icon: Flame,
      image: "https://picsum.photos/seed/tour1/800/600"
    },
    {
      title: "The Grain",
      description: "We source our flour from traditional mills, ensuring every loaf has the authentic texture of the Emerald Isle.",
      icon: Wheat,
      image: "https://picsum.photos/seed/tour2/800/600"
    },
    {
      title: "Our Heritage",
      description: "Founded on recipes passed down through four generations of the O'Sullivan family.",
      icon: History,
      image: "https://picsum.photos/seed/tour3/800/600"
    },
    {
      title: "The Craft",
      description: "Every pastry is hand-folded and every loaf hand-shaped. No shortcuts, just dedication.",
      icon: Heart,
      image: "https://picsum.photos/seed/tour4/800/600"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-12 px-4 space-y-16"
    >
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-serif text-primary">A Virtual Tour</h2>
        <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
          Step inside our world and see where the magic happens.
        </p>
      </div>

      <div className="space-y-24">
        {steps.map((step, index) => (
          <div key={step.title} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-4xl font-serif text-secondary">{step.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="flex-1 w-full">
              <Card className="overflow-hidden border-none shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
