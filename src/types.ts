export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Breads' | 'Pastries' | 'Cakes' | 'Savory';
  description: string;
  image?: string;
  details?: {
    ingredients: string[];
    allergens: string[];
    weight?: string;
    shelfLife?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
  specialInstructions?: string;
}

export type TabType = 'HOME' | 'MENU' | 'BAKE COURSE' | 'TOUR' | 'THE DAILY PROMO' | 'CART';
