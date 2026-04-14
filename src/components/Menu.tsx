import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Minus, Maximize2, X, Info, ClipboardList, ShieldAlert, Scale, Clock, Activity } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

interface MenuProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [cartDetailProduct, setCartDetailProduct] = useState<Product | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (cartDetailProduct) {
      setQuantity(1);
    }
  }, [cartDetailProduct]);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 py-8 px-4"
    >
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-serif text-primary">Our Artisanal Menu</h2>
        <p className="text-muted-foreground italic">Handcrafted daily in our traditional stone ovens.</p>
      </div>

      {/* Category Navigation Menu */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 border-b border-border/50 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:justify-center pb-2">
          {categories.map(category => (
            <Button
              key={`nav-${category}`}
              variant="outline"
              className="rounded-full whitespace-nowrap border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => scrollToCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-12 pt-4">
        {categories.map(category => (
          <div key={category} id={`category-${category}`} className="space-y-6 scroll-mt-32">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-serif text-secondary whitespace-nowrap">{category}</h3>
              <div className="h-px bg-border w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter(p => p.category === category).map(product => (
              <Card 
                key={product.id} 
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all bg-white/50 backdrop-blur-sm group cursor-pointer"
                onClick={() => setCartDetailProduct(product)}
              >
                <div 
                  className="aspect-[4/3] overflow-hidden relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullScreenImage(product);
                  }}
                >
                  <img 
                    src={product.image || `https://picsum.photos/seed/${product.id}/400/300`} 
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                      <Maximize2 className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary/90">
                    ${product.price} MXN
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{product.name}</CardTitle>
                  <CardDescription className="italic line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardFooter onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setCartDetailProduct(product)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
      </div>

      {/* Full Screen Image View */}
      <Dialog open={!!fullScreenImage} onOpenChange={(open) => !open && setFullScreenImage(null)}>
        <DialogContent 
          showCloseButton={false}
          className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 overflow-hidden border-none bg-black/90 shadow-none ring-0 flex items-center justify-center sm:max-w-none rounded-none"
        >
          {fullScreenImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex items-center justify-center w-full h-full p-4 md:p-12"
            >
              <img 
                src={fullScreenImage.image || `https://picsum.photos/seed/${fullScreenImage.id}/1200/1200`} 
                alt={fullScreenImage.name}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              <button 
                onClick={() => setFullScreenImage(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Detail / Add to Cart Section */}
      <Dialog open={!!cartDetailProduct} onOpenChange={(open) => !open && setCartDetailProduct(null)}>
        <DialogContent 
          showCloseButton={false}
          className="max-w-[95vw] w-full max-h-[90vh] p-0 overflow-hidden border-none bg-background/95 backdrop-blur-2xl shadow-2xl rounded-3xl sm:max-w-5xl"
        >
          {cartDetailProduct && (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="h-48 sm:h-64 md:h-auto md:w-1/2 relative bg-muted/20 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={cartDetailProduct.image || `https://picsum.photos/seed/${cartDetailProduct.id}/1200/1200`} 
                  alt={cartDetailProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <Badge className="bg-primary/90 text-sm md:text-lg py-1 px-3 md:px-4 rounded-full shadow-lg text-white">
                    ${cartDetailProduct.price} MXN
                  </Badge>
                </div>
                <button 
                  onClick={() => setCartDetailProduct(null)}
                  className="absolute top-4 right-4 md:hidden bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Detail Section (Scrollable) */}
              <div className="md:w-1/2 flex flex-col h-full bg-white/80 overflow-hidden">
                <div className="p-4 md:p-8 border-b border-border/50 flex justify-between items-start shrink-0">
                  <div>
                    <Badge variant="outline" className="text-secondary border-secondary mb-1 md:mb-2 text-xs md:text-sm rounded-full">
                      {cartDetailProduct.category}
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-serif text-primary leading-tight mt-2">
                      {cartDetailProduct.name}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setCartDetailProduct(null)}
                    className="hidden md:flex bg-muted hover:bg-muted/80 text-muted-foreground p-2 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ScrollArea className="flex-grow p-4 md:p-8">
                  <div className="space-y-6 md:space-y-8 pb-4 md:pb-8">
                    <section className="space-y-2 md:space-y-3">
                      <div className="flex items-center gap-2 text-secondary">
                        <Info className="w-4 h-4 md:w-5 md:h-5" />
                        <h4 className="font-serif text-base md:text-lg font-medium">Description</h4>
                      </div>
                      <p className="text-sm md:text-base text-foreground italic leading-relaxed">
                        {cartDetailProduct.description}
                      </p>
                    </section>

                    {cartDetailProduct.details && (
                      <>
                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-secondary">
                            <ClipboardList className="w-5 h-5" />
                            <h4 className="font-serif text-lg font-medium">Ingredients</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cartDetailProduct.details.ingredients.map((ing, i) => (
                              <Badge key={i} variant="secondary" className="bg-muted/50 text-foreground font-normal rounded-full px-3 py-1">
                                {ing}
                              </Badge>
                            ))}
                          </div>
                        </section>

                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-secondary">
                            <ShieldAlert className="w-5 h-5" />
                            <h4 className="font-serif text-lg font-medium">Allergens</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cartDetailProduct.details.allergens.map((all, i) => (
                              <Badge key={i} variant="outline" className="text-red-500 border-red-200 bg-red-50 rounded-full px-3 py-1">
                                {all}
                              </Badge>
                            ))}
                          </div>
                        </section>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                          <section className="space-y-2">
                            <div className="flex items-center gap-2 text-secondary">
                              <Scale className="w-4 h-4" />
                              <h4 className="font-serif text-sm font-medium">Weight</h4>
                            </div>
                            <p className="text-foreground text-sm">{cartDetailProduct.details.weight}</p>
                          </section>
                          <section className="space-y-2">
                            <div className="flex items-center gap-2 text-secondary">
                              <Clock className="w-4 h-4" />
                              <h4 className="font-serif text-sm font-medium">Shelf Life</h4>
                            </div>
                            <p className="text-foreground text-sm">{cartDetailProduct.details.shelfLife}</p>
                          </section>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-8 border-t border-border/50 bg-white/90 space-y-4">
                  <div className="flex items-center justify-center gap-6 bg-muted/30 py-3 rounded-full border border-border/50">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2 hover:bg-white rounded-full transition-colors text-primary disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-serif w-12 text-center text-foreground">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-2 hover:bg-white rounded-full transition-colors text-primary"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full rounded-full py-7 text-xl font-serif shadow-lg shadow-primary/20 bg-primary text-white hover:bg-primary/90"
                    onClick={() => {
                      onAddToCart(cartDetailProduct, quantity);
                      setCartDetailProduct(null);
                    }}
                  >
                    Add {quantity > 1 ? `(${quantity})` : ''} to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
