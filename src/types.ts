export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  materials: string[];
  care: string[];
  shipping: string;
  rating: number;
  reviewsCount: number;
  category: string;
  images: string[]; // At least 2 images: main and hover toggle alternative
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  isFeatured?: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  label: string; // e.g. "AUTUMN / WINTER 2026"
  description: string;
  image: string;
  tagline: string;
}

export interface CartItem {
  id: string; // Unique combination of product_id + color + size
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Look {
  id: string;
  title: string;
  image: string;
  tagline: string;
}

export interface PressQuote {
  quote: string;
  publication: string;
}

export interface User {
  fullName: string;
  email: string;
  joinedDate: string;
  orders: Order[];
}
