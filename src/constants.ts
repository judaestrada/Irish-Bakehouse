import { Product } from './types';

export const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Panqué de limón', 
    price: 200, 
    category: 'Pastries', 
    description: 'Nuestro famoso panqué bañado de limón amarillo con un toque de almendras.', 
    image: '/panque-limon-amarillo.jpg',
    details: {
      ingredients: ['Harina de trigo', 'Limón amarillo', 'Almendras fileteadas', 'Mantequilla irlandesa', 'Azúcar glass'],
      allergens: ['Gluten', 'Frutos secos', 'Lácteos'],
      weight: '450g',
      shelfLife: '5 días'
    }
  },
  { 
    id: '2', 
    name: 'Pan integral de Guinness', 
    price: 90, 
    category: 'Breads', 
    description: 'Traditional Irish brown bread made with Guinness stout.',
    details: {
      ingredients: ['Harina integral', 'Guinness Draught', 'Melaza', 'Avena', 'Bicarbonato de sodio'],
      allergens: ['Gluten'],
      weight: '600g',
      shelfLife: '3 días'
    }
  },
  { 
    id: '3', 
    name: 'Hojaldres de salchicha (4 pzas)', 
    price: 160, 
    category: 'Savory', 
    description: 'Flaky puff pastry filled with seasoned sausage.',
    details: {
      ingredients: ['Pasta hojaldre', 'Salchicha artesanal', 'Hierbas irlandesas', 'Huevo para barnizar'],
      allergens: ['Gluten', 'Huevo'],
      weight: '320g',
      shelfLife: '2 días'
    }
  },
  { 
    id: '4', 
    name: 'Pay de res & Guinness', 
    price: 400, 
    category: 'Savory', 
    description: 'Hearty beef and Guinness stew in a buttery crust.',
    details: {
      ingredients: ['Corte de res premium', 'Guinness Extra Stout', 'Zanahorias', 'Cebollas', 'Mantequilla'],
      allergens: ['Gluten', 'Lácteos'],
      weight: '800g',
      shelfLife: '4 días'
    }
  },
  { 
    id: '5', 
    name: 'Galletas de jengibre (5 pzas)', 
    price: 50, 
    category: 'Pastries', 
    description: 'Spiced gingerbread cookies with a hint of molasses.',
    image: '/galletas-jengibre.jpg',
    details: {
      ingredients: ['Jengibre fresco', 'Canela', 'Clavo', 'Melaza', 'Mantequilla'],
      allergens: ['Gluten', 'Lácteos'],
      weight: '150g',
      shelfLife: '15 días'
    }
  },
  { 
    id: '6', 
    name: 'Scones (6 pzas, chocolate/pasas)', 
    price: 120, 
    category: 'Pastries', 
    description: 'Classic Irish scones with your choice of chocolate or raisins.',
    image: '/scones-chocolate.jpg',
    details: {
      ingredients: ['Harina', 'Crema espesa', 'Mantequilla', 'Chispas de chocolate o Pasas', 'Azúcar'],
      allergens: ['Gluten', 'Lácteos'],
      weight: '400g',
      shelfLife: '4 días'
    }
  },
  { 
    id: '7', 
    name: 'Panqué de zanahoria', 
    price: 250, 
    category: 'Cakes', 
    description: 'Moist carrot cake with walnuts and cream cheese frosting.',
    image: '/panque-zanahoria.jpg',
    details: {
      ingredients: ['Zanahoria rallada', 'Nueces', 'Queso crema', 'Canela', 'Aceite vegetal'],
      allergens: ['Gluten', 'Frutos secos', 'Lácteos', 'Huevo'],
      weight: '500g',
      shelfLife: '5 días'
    }
  },
  { 
    id: '8', 
    name: 'Panqué de jengibre Baileys', 
    price: 250, 
    category: 'Cakes', 
    description: 'Spiced ginger cake infused with Baileys Irish Cream.',
    details: {
      ingredients: ['Jengibre', 'Baileys Irish Cream', 'Mantequilla', 'Harina', 'Huevo'],
      allergens: ['Gluten', 'Lácteos', 'Huevo', 'Alcohol'],
      weight: '500g',
      shelfLife: '7 días'
    }
  },
  { 
    id: '9', 
    name: 'Pastel de chocolate Guinness', 
    price: 350, 
    category: 'Cakes', 
    description: 'Rich, dark chocolate cake with the depth of Guinness.',
    details: {
      ingredients: ['Cacao amargo', 'Guinness Draught', 'Queso crema', 'Mantequilla', 'Vainilla'],
      allergens: ['Gluten', 'Lácteos', 'Huevo'],
      weight: '700g',
      shelfLife: '5 días'
    }
  },
  { 
    id: '10', 
    name: 'Pay de manzana crumble', 
    price: 350, 
    category: 'Pastries', 
    description: 'Traditional apple pie topped with a buttery crumble.',
    image: '/pay-manzana-crumble.jpg',
    details: {
      ingredients: ['Manzana Granny Smith', 'Canela', 'Mantequilla', 'Harina', 'Azúcar morena'],
      allergens: ['Gluten', 'Lácteos'],
      weight: '800g',
      shelfLife: '4 días'
    }
  },
  { 
    id: '11', 
    name: 'Tarta de Reina Victoria', 
    price: 400, 
    category: 'Cakes', 
    description: 'Classic Victoria Sponge with jam and cream.',
    image: '/tarta-victoria.jpg',
    details: {
      ingredients: ['Harina leudante', 'Mantequilla', 'Mermelada de frambuesa', 'Crema batida', 'Azúcar'],
      allergens: ['Gluten', 'Lácteos', 'Huevo'],
      weight: '600g',
      shelfLife: '3 días'
    }
  },
  { 
    id: '12', 
    name: 'Bruce (pastel de triple chocolate)', 
    price: 400, 
    category: 'Cakes', 
    description: 'Decadent triple chocolate cake for true cocoa lovers.',
    details: {
      ingredients: ['Chocolate amargo', 'Chocolate de leche', 'Chocolate blanco', 'Crema', 'Mantequilla'],
      allergens: ['Lácteos', 'Huevo', 'Soya'],
      weight: '900g',
      shelfLife: '6 días'
    }
  },
  { 
    id: '13', 
    name: 'Pavlova de fresas', 
    price: 400, 
    category: 'Pastries', 
    description: 'Light meringue topped with fresh strawberries and cream.',
    image: '/pavlova-fresas.jpg',
    details: {
      ingredients: ['Claras de huevo', 'Azúcar', 'Fresas frescas', 'Crema batida', 'Vainilla'],
      allergens: ['Huevo', 'Lácteos'],
      weight: '500g',
      shelfLife: '1 día'
    }
  },
  { 
    id: '14', 
    name: 'Pastel de Margarita', 
    price: 400, 
    category: 'Cakes', 
    description: 'Refreshing lime and tequila infused cake.',
    details: {
      ingredients: ['Limón', 'Tequila reposado', 'Harina', 'Mantequilla', 'Sal de mar'],
      allergens: ['Gluten', 'Lácteos', 'Huevo', 'Alcohol'],
      weight: '600g',
      shelfLife: '5 días'
    }
  },
  { 
    id: '15', 
    name: 'Cheesecake de Baileys', 
    price: 600, 
    category: 'Cakes', 
    description: 'Creamy cheesecake with a generous splash of Baileys.',
    details: {
      ingredients: ['Queso crema', 'Baileys Irish Cream', 'Base de galleta', 'Mantequilla', 'Azúcar'],
      allergens: ['Gluten', 'Lácteos', 'Huevo', 'Alcohol'],
      weight: '1.2kg',
      shelfLife: '7 días'
    }
  },
];
