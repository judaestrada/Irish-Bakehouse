import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Minus, Maximize2, X, Info, ClipboardList, ShieldAlert, Scale, Clock, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

interface MenuProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDetailProduct, setCartDetailProduct] = useState<Product | null>(null);
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
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
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
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent 
          showCloseButton={false}
          className="max-w-[100vw] max-h-[100vh] p-0 overflow-hidden border-none bg-transparent shadow-none ring-0 flex items-center justify-center sm:max-w-none"
        >
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group flex items-center justify-center w-full h-full p-4"
            >
              <img 
                src={selectedProduct.image || `https://picsum.photos/seed/${selectedProduct.id}/1200/1200`} 
                alt={selectedProduct.name}
                className="max-w-full max-h-[95vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-2xl border border-white/20 text-white px-6 py-4 md:px-10 md:py-5 rounded-3xl md:rounded-full flex flex-col sm:flex-row items-center gap-4 md:gap-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:translate-y-4 sm:group-hover:translate-y-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[90%] sm:w-auto">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-serif leading-none tracking-tight">{selectedProduct.name}</h3>
                  <p className="text-accent font-serif text-base md:text-lg mt-1 md:mt-2">${selectedProduct.price} MXN</p>
                </div>
                <div className="hidden sm:block h-10 w-px bg-white/20" />
                <Button 
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90 px-6 py-4 md:px-8 font-serif text-base md:text-lg w-full sm:w-auto"
                  onClick={() => {
                    setCartDetailProduct(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/10"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* Data Collector / Add to Cart Section */}
      <Dialog open={!!cartDetailProduct} onOpenChange={(open) => !open && setCartDetailProduct(null)}>
        <DialogContent 
          showCloseButton={false}
          className="max-w-[95vw] w-full max-h-[90vh] p-0 overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_0_50px_rgba(59,130,246,0.15)] rounded-3xl sm:max-w-5xl"
        >
          {cartDetailProduct && (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="h-48 sm:h-64 md:h-auto md:w-1/2 relative bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-zinc-800">
                <img 
                  src={cartDetailProduct.image || `https://picsum.photos/seed/${cartDetailProduct.id}/1200/1200`} 
                  alt={cartDetailProduct.name}
                  className="w-full h-full object-cover opacity-70 grayscale mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <div className="bg-black/80 border border-emerald-500/30 text-emerald-400 font-mono text-sm md:text-lg py-1 px-3 md:px-4 rounded-lg shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                    ${cartDetailProduct.price} MXN
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-zinc-300 border border-white/10">
                  ID: {cartDetailProduct.id.substring(0, 8).toUpperCase()}
                </div>
                <button 
                  onClick={() => setCartDetailProduct(null)}
                  className="absolute top-4 right-4 md:hidden bg-black/60 hover:bg-black/80 border border-zinc-700 text-white p-2 rounded-lg transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Data Collector Section (Scrollable) */}
              <div className="md:w-1/2 flex flex-col h-full bg-zinc-950 overflow-hidden">
                <div className="p-4 md:p-8 border-b border-zinc-800 flex justify-between items-start shrink-0 bg-zinc-900/50">
                  <div>
                    <div className="text-blue-400 font-mono text-xs md:text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      {cartDetailProduct.category}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-mono text-zinc-100 leading-tight">
                      {cartDetailProduct.name}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setCartDetailProduct(null)}
                    className="hidden md:flex bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white p-2 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ScrollArea className="flex-grow p-4 md:p-8">
                  <div className="space-y-6 md:space-y-8 pb-4 md:pb-8">
                    <section className="space-y-2 md:space-y-3 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Info className="w-4 h-4 md:w-5 md:h-5" />
                        <h4 className="font-mono text-sm md:text-base uppercase tracking-wider">Description</h4>
                      </div>
                      <p className="text-sm md:text-base text-zinc-400 font-mono leading-relaxed">
                        {cartDetailProduct.description}
                      </p>
                    </section>

                    {cartDetailProduct.details && (
                      <>
                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <ClipboardList className="w-5 h-5" />
                            <h4 className="font-mono text-sm uppercase tracking-wider">Components</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cartDetailProduct.details.ingredients.map((ing, i) => (
                              <div key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs px-3 py-1.5 rounded-md">
                                {ing}
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-red-400">
                            <ShieldAlert className="w-5 h-5" />
                            <h4 className="font-mono text-sm uppercase tracking-wider">Warnings / Allergens</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cartDetailProduct.details.allergens.map((all, i) => (
                              <div key={i} className="text-red-400 border border-red-500/30 bg-red-500/10 font-mono text-xs px-3 py-1.5 rounded-md">
                                {all}
                              </div>
                            ))}
                          </div>
                        </section>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                          <section className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                            <div className="flex items-center gap-2 text-purple-400 mb-2">
                              <Scale className="w-4 h-4" />
                              <h4 className="font-mono text-xs uppercase tracking-wider">Mass</h4>
                            </div>
                            <p className="text-zinc-300 font-mono text-sm">{cartDetailProduct.details.weight}</p>
                          </section>
                          <section className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                            <div className="flex items-center gap-2 text-amber-400 mb-2">
                              <Clock className="w-4 h-4" />
                              <h4 className="font-mono text-xs uppercase tracking-wider">Lifecycle</h4>
                            </div>
                            <p className="text-zinc-300 font-mono text-sm">{cartDetailProduct.details.shelfLife}</p>
                          </section>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-6 md:p-8 border-t border-zinc-800 bg-zinc-950 space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Quantity Collector</label>
                    <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-white disabled:opacity-30 disabled:hover:bg-zinc-800"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-mono font-bold text-white">{quantity}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Units</span>
                      </div>
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-white"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full rounded-xl py-7 text-lg font-mono uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                    onClick={() => {
                      onAddToCart(cartDetailProduct, quantity);
                      setCartDetailProduct(null);
                    }}
                  >
                    Commit to Cart {quantity > 1 ? `[${quantity}]` : ''}
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
