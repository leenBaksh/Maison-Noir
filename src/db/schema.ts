import { pgTable, serial, text, integer, real, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (UID is Firebase UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // slug or uuid
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  image: text('image'),
});

// Products table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(), // matches category ID/slug
  price: real('price').notNull(),
  originalPrice: real('original_price'),
  image: text('image').notNull(),
  gallery: text('gallery'), // JSON stringified array of images
  description: text('description').notNull(),
  details: text('details'), // JSON stringified array of bullets
  sizes: text('sizes'), // JSON stringified array of size strings
  colors: text('colors'), // JSON stringified array of color strings
  stock: integer('stock').notNull().default(10),
  rating: real('rating').notNull().default(5),
  reviewsCount: integer('reviews_count').notNull().default(0),
  isNewArrival: boolean('is_new_arrival').default(false),
  isFeatured: boolean('is_featured').default(false),
  isBestSeller: boolean('is_best_seller').default(false),
  shipping: text('shipping'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cart Items table for persistent cloud cart
export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Firebase Auth UID
  productId: text('product_id').notNull(), // references products.id
  quantity: integer('quantity').notNull().default(1),
  size: text('size'),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Wishlist Items table for persistent cloud wishlist
export const wishlistItems = pgTable('wishlist_items', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Firebase Auth UID
  productId: text('product_id').notNull(), // references products.id
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
  id: text('id').primaryKey(), // custom ID, e.g. "MN-2026-XXXXX" or uuid
  orderNumber: text('order_number').notNull().unique(),
  userId: text('user_id').notNull(), // Firebase Auth UID
  subtotal: real('subtotal').notNull(),
  shippingCost: real('shipping_cost').notNull().default(0),
  taxAmount: real('tax_amount').notNull().default(0),
  total: real('total').notNull(),
  status: text('status').notNull().default('PENDING'), // PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
  paymentStatus: text('payment_status').notNull().default('UNPAID'), // UNPAID, PAID, FAILED, REFUNDED
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  addressLine1: text('address_line1').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  country: text('country').notNull().default('US'),
  phone: text('phone').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').notNull(),
  productId: text('product_id').notNull(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  color: text('color'),
  size: text('size'),
  price: real('price').notNull(),
  quantity: integer('quantity').notNull(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
