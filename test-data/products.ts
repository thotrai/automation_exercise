import { Product } from '../types/Product';

export const products = {
  blueTop: {
    id: 1,
    name: 'Blue Top',
    category: 'Tops',
    price: 'Rs. 500',
    availability: 'In Stock',
    condition: 'New',
    brand: 'Polo',
  },
  menTshirt: {
    id: 2,
    name: 'Men Tshirt',
    category: 'Tshirts',
    price: 'Rs. 400',
    availability: 'In Stock',
    condition: 'New',
    brand: 'H&M',
  },
} satisfies Record<string, Product>;