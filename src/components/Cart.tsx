import { motion } from 'motion/react';
import { CartItem } from '../types';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 space-y-6 text-center"
      >
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif">Your cart is empty</h2>
          <p className="text-muted-foreground italic">Fill it with some Irish goodness!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto py-8 px-4 space-y-8"
    >
      <h2 className="text-4xl font-serif text-primary text-center">Your Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <ScrollArea className="h-[60vh] pr-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 py-4 px-4 mb-4 bg-card text-card-foreground rounded-2xl shadow-sm border border-border/50 group hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${item.id}/200/200`} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl font-bold text-primary">{item.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-full"
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">${item.price} MXN each</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Collector */}
                    <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-full border border-border/50">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 rounded-full shadow-sm hover:shadow-md transition-all"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold text-lg w-6 text-center text-foreground">{item.quantity}</span>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 rounded-full shadow-sm hover:shadow-md transition-all"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Payment Amount */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                      <p className="text-xl font-serif font-bold text-primary">
                        ${item.price * item.quantity} MXN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
            <h3 className="text-xl font-serif border-b pb-2">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal} MXN</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span className="text-primary font-medium">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-serif">
              <span>Total</span>
              <span>${total} MXN</span>
            </div>
            <Button className="w-full rounded-full py-6 text-lg font-serif" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground italic">
            * Prices are in Mexican Pesos (MXN). <br />
            Traditional Irish quality guaranteed.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
