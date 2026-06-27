import { create } from 'zustand';
import { CartItem, Product, User, Order } from '../types';

interface CartState {
  cart: CartItem[];
  wishlist: string[]; // List of product IDs
  orders: any[]; // User's cloud orders
  promoCode: string | null;
  promoDiscount: number; // percentage
  user: User | null; // Keep for layout backward compatibility
  firebaseUser: any | null; // holds raw firebase user
  idToken: string | null; // in-memory bearer token
  activeRoute: string; // Dynamic simulated route path
  routeHistory: string[];
  products: Product[]; // Sync'd from db
  categories: any[]; // Sync'd from db
  
  // Actions
  setProductsAndCategories: (products: Product[], categories: any[]) => void;
  setCredentials: (firebaseUser: any, idToken: string | null) => void;
  syncLocalToCloudCart: () => Promise<void>;
  addToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string | number) => Promise<void>;
  updateQuantity: (itemId: string | number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Wishlist
  toggleWishlist: (product: Product) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  
  // Promo
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  // Navigation
  navigateTo: (route: string) => void;
  navigateBack: () => void;
  
  // Auth & Cloud Sync
  login: (email: string, fullName: string) => void; // local mock fallback
  logout: () => Promise<void>;
  syncAuthAndFetch: () => Promise<void>;
  placeOrder: (shippingDetails: any) => Promise<any>;
  addOrder: (order: Order) => void;
}

const INITIAL_USER: User = {
  fullName: 'Alexander Mercer',
  email: 'alexander.mercer@noir.vip',
  joinedDate: 'November 2025',
  orders: []
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  wishlist: [],
  orders: [],
  promoCode: null,
  promoDiscount: 0,
  user: INITIAL_USER,
  firebaseUser: null,
  idToken: null,
  activeRoute: '/',
  routeHistory: ['/'],
  products: [],
  categories: [],

  setProductsAndCategories: (products, categories) => {
    set({ products, categories });
  },

  setCredentials: (firebaseUser, idToken) => {
    if (firebaseUser) {
      set({ 
        firebaseUser, 
        idToken,
        user: {
          fullName: firebaseUser.displayName || 'Alexander Mercer',
          email: firebaseUser.email || 'alexander@noir.vip',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          orders: []
        }
      });
    } else {
      set({ firebaseUser: null, idToken: null, user: null, cart: [], wishlist: [], orders: [] });
    }
  },

  syncLocalToCloudCart: async () => {
    const { idToken, cart } = get();
    if (!idToken || cart.length === 0) return;

    try {
      for (const item of cart) {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({
            productId: item.product.id,
            quantity: item.quantity,
            size: item.selectedSize,
            color: item.selectedColor.name
          })
        });
      }
      // Re-fetch cloud cart
      const response = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      const data = await response.json();
      if (data.success) {
        set({ cart: data.items });
      }
    } catch (error) {
      console.error('Failed to sync local cart with Cloud SQL:', error);
    }
  },

  syncAuthAndFetch: async () => {
    const { idToken } = get();
    if (!idToken) return;

    try {
      // Sync user profile to Postgres
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      // Synchronize cloud cart
      const cartResponse = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      const cartData = await cartResponse.json();
      if (cartData.success) {
        set({ cart: cartData.items });
      }

      // Synchronize cloud wishlist
      const wlResponse = await fetch('/api/wishlist', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      const wlData = await wlResponse.json();
      if (wlData.success) {
        set({ wishlist: wlData.items.map((it: any) => it.productId) });
      }

      // Synchronize orders count List
      const orderResponse = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      const orderData = await orderResponse.json();
      if (orderData.success) {
        set({ orders: orderData.orders });
      }
    } catch (e) {
      console.error('Failed to synchronise states on authentication:', e);
    }
  },

  addToCart: async (product, color, size, quantity = 1) => {
    const { idToken } = get();
    if (idToken) {
      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
            size,
            color: color.name
          })
        });
        const data = await res.json();
        if (data.success) {
          // Re-fetch database cart
          const cartRes = await fetch('/api/cart', {
            headers: { 'Authorization': `Bearer ${idToken}` }
          });
          const cartData = await cartRes.json();
          if (cartData.success) {
            set({ cart: cartData.items });
          }
        }
      } catch (err) {
        console.error('Cloud SQL Error on addToCart:', err);
      }
    } else {
      // client-side local fallback
      set((state) => {
        const itemId = `${product.id}-${color.name}-${size}`;
        const existingItem = state.cart.find((item) => item.id === itemId);

        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
            )
          };
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity
          };
          return { cart: [...state.cart, newItem] };
        }
      });
    }
  },

  removeFromCart: async (itemId) => {
    const { idToken } = get();
    if (idToken && typeof itemId === 'number') {
      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${idToken}` }
        });
        if (res.ok) {
          set((state) => ({
            cart: state.cart.filter((item) => String(item.id) !== String(itemId))
          }));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      set((state) => ({
        cart: state.cart.filter((item) => String(item.id) !== String(itemId))
      }));
    }
  },

  updateQuantity: async (itemId, quantity) => {
    const { idToken } = get();
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }

    if (idToken && typeof itemId === 'number') {
      try {
        // Since we want simple update helper, we can just delete and recreate, or update directly.
        // Let's call POST with correct override setup
        const existingItem = get().cart.find((item) => String(item.id) === String(itemId));
        if (existingItem) {
          const diffQuant = quantity - existingItem.quantity;
          await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({
              productId: existingItem.product.id,
              quantity: diffQuant,
              size: existingItem.selectedSize,
              color: existingItem.selectedColor.name
            })
          });

          const cartRes = await fetch('/api/cart', {
            headers: { 'Authorization': `Bearer ${idToken}` }
          });
          const cartData = await cartRes.json();
          if (cartData.success) {
            set({ cart: cartData.items });
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      set((state) => ({
        cart: state.cart.map((item) =>
          String(item.id) === String(itemId) ? { ...item, quantity } : item
        )
      }));
    }
  },

  clearCart: async () => {
    const { idToken } = get();
    if (idToken) {
      try {
        await fetch('/api/cart-clear', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${idToken}` }
        });
      } catch (e) {
        console.error(e);
      }
    }
    set({ cart: [] });
  },

  toggleWishlist: async (product) => {
    const { idToken, wishlist } = get();
    if (!idToken) {
      // Local fallback
      set((state) => {
        const isCurrently = state.wishlist.includes(product.id);
        const next = isCurrently 
          ? state.wishlist.filter(id => id !== product.id)
          : [...state.wishlist, product.id];
        return { wishlist: next };
      });
      return;
    }

    const isCurrently = wishlist.includes(product.id);
    try {
      if (isCurrently) {
        await fetch(`/api/wishlist/${product.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${idToken}` }
        });
        set({ wishlist: wishlist.filter(id => id !== product.id) });
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({ productId: product.id })
        });
        set({ wishlist: [...wishlist, product.id] });
      }
    } catch (e) {
      console.error(e);
    }
  },

  isWishlisted: (productId) => {
    return get().wishlist.includes(productId);
  },

  applyPromoCode: (code) => {
    const formattedCode = code.toUpperCase().trim();
    if (formattedCode === 'NOIR20' || formattedCode === 'VIP20') {
      set({ promoCode: formattedCode, promoDiscount: 20 });
      return true;
    } else if (formattedCode === 'WELCOME10') {
      set({ promoCode: formattedCode, promoDiscount: 10 });
      return true;
    }
    return false;
  },

  removePromoCode: () => set({ promoCode: null, promoDiscount: 0 }),

  navigateTo: (route) => {
    window.location.hash = route;
    set((state) => ({
      activeRoute: route,
      routeHistory: [...state.routeHistory, route]
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigateBack: () => {
    set((state) => {
      if (state.routeHistory.length > 1) {
        const historyCopy = [...state.routeHistory];
        historyCopy.pop();
        const previousRoute = historyCopy[historyCopy.length - 1];
        window.location.hash = previousRoute;
        return {
          activeRoute: previousRoute,
          routeHistory: historyCopy
        };
      }
      return state;
    });
    window.scrollTo({ top: 0 });
  },

  login: (email, fullName) => {
    set({
      user: {
        fullName,
        email,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        orders: []
      }
    });
  },

  logout: async () => {
    const { auth: clientAuth, signOut: clientSignOut } = await import('../lib/firebase.ts');
    await clientSignOut(clientAuth);
    set({ firebaseUser: null, idToken: null, user: null, cart: [], wishlist: [], orders: [] });
  },

  placeOrder: async (shippingDetails) => {
    const { idToken, cart, promoDiscount } = get();
    if (!idToken) {
      throw new Error("You must be logged in to submit a couture placement");
    }

    const subtotal = cart.reduce((acc, it) => acc + (it.product.price * it.quantity), 0);
    const discountAmount = subtotal * (promoDiscount / 100);
    const shippingCost = 0; // Complimentary White Glove Deluxe
    const taxAmount = (subtotal - discountAmount) * 0.0825; // 8.25% standard tax
    const total = subtotal - discountAmount + shippingCost + taxAmount;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          items: cart,
          subtotal,
          shippingCost,
          taxAmount,
          total,
          firstName: shippingDetails.firstName || shippingDetails.fullName.split(' ')[0],
          lastName: shippingDetails.lastName || shippingDetails.fullName.split(' ')[1] || 'Guest',
          email: shippingDetails.email,
          addressLine1: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state || 'Paris',
          zipCode: shippingDetails.zipCode,
          country: shippingDetails.country || 'France',
          phone: shippingDetails.phone || 'N/A',
          notes: shippingDetails.notes || ''
        })
      });

      const data = await res.json();
      if (data.success) {
        // Update local state orders list
        set((state) => ({
          orders: [data.order, ...state.orders],
          cart: [] // Clear local active cart state
        }));
        return data.order;
      } else {
        throw new Error(data.error || "Failed to submit order.");
      }
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  },

  addOrder: (order) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          orders: [order, ...state.user.orders]
        }
      };
    });
  }
}));
