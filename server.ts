import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import { db, schema } from "./src/db/index.ts";
import { eq, and, desc } from "drizzle-orm";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";

function formatDbProduct(prod: any) {
  if (!prod) return null;
  const gallery = prod.gallery ? JSON.parse(prod.gallery) : [];
  return {
    ...prod,
    gallery,
    images: gallery.length > 0 ? gallery : [prod.image],
    details: prod.details ? JSON.parse(prod.details) : [],
    sizes: prod.sizes ? JSON.parse(prod.sizes) : [],
    colors: prod.colors ? JSON.parse(prod.colors) : [],
    materials: [
      "85% Virgin Wool, 15% Cashmere silk blend",
      "High-density structural lining panels",
      "Finished with hand-tailored borders"
    ],
    care: [
      "Dry clean only by certified specialists",
      "Store on contoured wooden hangers in breathable dust covers",
      "Avoid direct friction with rough surfaces"
    ]
  };
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json());

  // API - Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categoriesList = await db.select().from(schema.categories);
      res.json({ success: true, categories: categoriesList });
    } catch (error: any) {
      console.error("Database error fetching categories:", error);
      res.status(500).json({ error: "Database query failed. Please try again later." });
    }
  });

  // API - Get products with optional category, featured filters
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let queryList = db.select().from(schema.products);
      
      const conditions = [];
      if (category) {
        conditions.push(eq(schema.products.category, category as string));
      }
      if (featured === 'true') {
        conditions.push(eq(schema.products.isFeatured, true));
      }
      
      const resolvedConditions = conditions.length > 0 
        ? and(...conditions) 
        : undefined;

      const results = resolvedConditions 
        ? await queryList.where(resolvedConditions) 
        : await queryList;

      // Parse JSON fields safely before sending to client
      const parsedResults = results.map(prod => formatDbProduct(prod));

      res.json({ success: true, products: parsedResults });
    } catch (error: any) {
      console.error("Database error fetching products:", error);
      res.status(500).json({ error: "Failed to retrieve products catalog." });
    }
  });

  // API - Get product detail by unique slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const result = await db.select()
        .from(schema.products)
        .where(eq(schema.products.slug, slug))
        .limit(1);

      if (result.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const prod = result[0];
      const parsed = formatDbProduct(prod);

      res.json({ success: true, product: parsed });
    } catch (error: any) {
      console.error("Database error fetching single product detail:", error);
      res.status(500).json({ error: "Failed to load product detail" });
    }
  });

  // API - Authenticate & Sync User
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { email, uid, displayName } = req.user!;
      const name = displayName || req.body.name || '';

      const syncedUser = await db.insert(schema.users)
        .values({
          uid,
          email: email || '',
          name,
        })
        .onConflictDoUpdate({
          target: schema.users.uid,
          set: {
            email: email || '',
            name,
          }
        })
        .returning();

      res.json({ success: true, user: syncedUser[0] });
    } catch (error: any) {
      console.error("Database error syncing user:", error);
      res.status(500).json({ error: "Failed to sync user state" });
    }
  });

  // API - Get persistent cloud cart items
  app.get("/api/cart", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const list = await db.select()
        .from(schema.cartItems)
        .innerJoin(schema.products, eq(schema.cartItems.productId, schema.products.id))
        .where(eq(schema.cartItems.userId, userUid));

      const items = list.map(entry => {
        const prod = entry.products;
        return {
          id: entry.cart_items.id,
          productId: entry.cart_items.productId,
          quantity: entry.cart_items.quantity,
          size: entry.cart_items.size,
          color: entry.cart_items.color,
          product: formatDbProduct(prod)
        };
      });

      res.json({ success: true, items });
    } catch (error: any) {
      console.error("Database error reading cart:", error);
      res.status(500).json({ error: "Failed to retrieve cart items" });
    }
  });

  // API - Add item to cart
  app.post("/api/cart", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const { productId, quantity, size, color } = req.body;

      const normalizedSize = size || 'M';
      const normalizedColor = color || '';

      const existing = await db.select()
        .from(schema.cartItems)
        .where(
          and(
            eq(schema.cartItems.userId, userUid),
            eq(schema.cartItems.productId, productId),
            eq(schema.cartItems.size, normalizedSize),
            eq(schema.cartItems.color, normalizedColor)
          )
        );

      if (existing.length > 0) {
        const updated = await db.update(schema.cartItems)
          .set({ quantity: existing[0].quantity + (quantity || 1) })
          .where(eq(schema.cartItems.id, existing[0].id))
          .returning();
        res.json({ success: true, item: updated[0] });
      } else {
        const added = await db.insert(schema.cartItems)
          .values({
            userId: userUid,
            productId,
            quantity: quantity || 1,
            size: normalizedSize,
            color: normalizedColor,
          })
          .returning();
        res.json({ success: true, item: added[0] });
      }
    } catch (error: any) {
      console.error("Database error adding item to cart:", error);
      res.status(500).json({ error: "Failed to add product to cloud cart" });
    }
  });

  // API - Delete item from cart
  app.delete("/api/cart/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const cartItemId = parseInt(req.params.id);

      await db.delete(schema.cartItems)
        .where(
          and(
            eq(schema.cartItems.id, cartItemId),
            eq(schema.cartItems.userId, userUid)
          )
        );

      res.json({ success: true, message: "Item removed successfully" });
    } catch (error: any) {
      console.error("Database error removing item from cart:", error);
      res.status(500).json({ error: "Failed to remove item" });
    }
  });

  // API - Clear cart completely
  app.delete("/api/cart-clear", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      await db.delete(schema.cartItems)
        .where(eq(schema.cartItems.userId, userUid));
      res.json({ success: true, message: "Cart cleared" });
    } catch (error: any) {
      console.error("Database error clearing cloud cart:", error);
      res.status(500).json({ error: "Failed to empty cart" });
    }
  });

  // API - Get persistent wishlist
  app.get("/api/wishlist", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const list = await db.select()
        .from(schema.wishlistItems)
        .innerJoin(schema.products, eq(schema.wishlistItems.productId, schema.products.id))
        .where(eq(schema.wishlistItems.userId, userUid));

      const items = list.map(entry => {
        const prod = entry.products;
        return {
          id: entry.wishlist_items.id,
          productId: entry.wishlist_items.productId,
          product: formatDbProduct(prod)
        };
      });

      res.json({ success: true, items });
    } catch (error: any) {
      console.error("Database error loading wishlist:", error);
      res.status(500).json({ error: "Failed to retrieve wishlist items" });
    }
  });

  // API - Add to wishlist
  app.post("/api/wishlist", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const { productId } = req.body;

      const existing = await db.select()
        .from(schema.wishlistItems)
        .where(
          and(
            eq(schema.wishlistItems.userId, userUid),
            eq(schema.wishlistItems.productId, productId)
          )
        );

      if (existing.length > 0) {
        return res.json({ success: true, item: existing[0] });
      }

      const inserted = await db.insert(schema.wishlistItems)
        .values({
          userId: userUid,
          productId,
        })
        .returning();

      res.json({ success: true, item: inserted[0] });
    } catch (error: any) {
      console.error("Database error adding wishlist item:", error);
      res.status(500).json({ error: "Failed to flag wishlist item" });
    }
  });

  // API - Remove from wishlist
  app.delete("/api/wishlist/:productId", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const { productId } = req.params;

      await db.delete(schema.wishlistItems)
        .where(
          and(
            eq(schema.wishlistItems.userId, userUid),
            eq(schema.wishlistItems.productId, productId)
          )
        );

      res.json({ success: true, message: "Item removed from wishlist" });
    } catch (error: any) {
      console.error("Database error removing wishlist item:", error);
      res.status(500).json({ error: "Failed to delete wishlist item" });
    }
  });

  // API - Get orders history
  app.get("/api/orders", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const list = await db.select()
        .from(schema.orders)
        .where(eq(schema.orders.userId, userUid))
        .orderBy(desc(schema.orders.createdAt));

      const ordersList = [];
      for (const order of list) {
        const itemsList = await db.select()
          .from(schema.orderItems)
          .where(eq(schema.orderItems.orderId, order.id));
        
        const formattedItems = itemsList.map(item => ({
          id: String(item.id),
          quantity: item.quantity,
          selectedSize: item.size || 'M',
          selectedColor: { name: item.color || '', hex: '#000000' },
          product: {
            id: item.productId,
            name: item.name,
            price: item.price,
            images: [item.image, item.image], // At least 2 images
            colors: [{ name: item.color || '', hex: '#000000' }],
            sizes: [item.size || 'M'],
            slug: '',
            category: '',
            description: '',
            details: [],
            materials: [],
            care: [],
            shipping: '',
            rating: 5,
            reviewsCount: 0,
            stock: 1
          }
        }));

        ordersList.push({
          id: order.id,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) : 'N/A',
          subtotal: order.subtotal,
          shipping: order.shippingCost,
          discount: 0, 
          total: order.total,
          status: order.status === 'CONFIRMED' ? 'Processing' : order.status === 'SHIPPED' ? 'Shipped' : 'Delivered',
          paymentMethod: 'Authorized Visa / Amex Noir',
          shippingAddress: {
            fullName: `${order.firstName} ${order.lastName}`.trim(),
            email: order.email,
            address: order.addressLine1,
            city: order.city,
            zipCode: order.zipCode,
            country: order.country
          },
          items: formattedItems
        });
      }

      res.json({ success: true, orders: ordersList });
    } catch (error: any) {
      console.error("Database error reading order archives:", error);
      res.status(500).json({ error: "Failed to load order history" });
    }
  });

  // API - Create new order (Submission)
  app.post("/api/orders", requireAuth, async (req: AuthRequest, res) => {
    try {
      const userUid = req.user!.uid;
      const {
        items, subtotal, shippingCost, taxAmount, total,
        addressLine1, city, state, zipCode, country,
        firstName, lastName, email, phone, notes
      } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Cannot create an empty order" });
      }

      const orderId = 'MN-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const orderNumber = 'MN-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);

      const insertedOrder = await db.insert(schema.orders)
        .values({
          id: orderId,
          orderNumber,
          userId: userUid,
          subtotal: parseFloat(subtotal),
          shippingCost: parseFloat(shippingCost || 0),
          taxAmount: parseFloat(taxAmount || 0),
          total: parseFloat(total),
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          addressLine1: addressLine1 || '',
          city: city || '',
          state: state || '',
          zipCode: zipCode || '',
          country: country || 'US',
          phone: phone || '',
          notes: notes || '',
        })
        .returning();

      for (const item of items) {
        await db.insert(schema.orderItems)
          .values({
            orderId,
            productId: item.productId || item.product.id,
            name: item.name || item.product.name,
            image: item.image || item.product.image,
            color: item.color || '',
            size: item.size || 'M',
            price: parseFloat(item.price || item.product.price),
            quantity: parseInt(item.quantity)
          });

        const original = await db.select()
          .from(schema.products)
          .where(eq(schema.products.id, item.productId || item.product.id))
          .limit(1);

        if (original.length > 0) {
          const newStock = Math.max(0, original[0].stock - parseInt(item.quantity));
          await db.update(schema.products)
            .set({ stock: newStock })
            .where(eq(schema.products.id, original[0].id));
        }
      }

      // Clear the user's active checkout cart elements upon order processing
      await db.delete(schema.cartItems).where(eq(schema.cartItems.userId, userUid));

      const o = insertedOrder[0];
      const itemsList = await db.select()
        .from(schema.orderItems)
        .where(eq(schema.orderItems.orderId, o.id));

      const formattedItems = itemsList.map(item => ({
        id: String(item.id),
        quantity: item.quantity,
        selectedSize: item.size || 'M',
        selectedColor: { name: item.color || '', hex: '#000000' },
        product: {
          id: item.productId,
          name: item.name,
          price: item.price,
          images: [item.image, item.image],
          colors: [{ name: item.color || '', hex: '#000000' }],
          sizes: [item.size || 'M'],
          slug: '',
          category: '',
          description: '',
          details: [],
          materials: [],
          care: [],
          shipping: '',
          rating: 5,
          reviewsCount: 0,
          stock: 1
        }
      }));

      const formattedOrder = {
        id: o.id,
        date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) : 'N/A',
        subtotal: o.subtotal,
        shipping: o.shippingCost,
        discount: 0, 
        total: o.total,
        status: o.status === 'CONFIRMED' ? 'Processing' : o.status === 'SHIPPED' ? 'Shipped' : 'Delivered',
        paymentMethod: 'Authorized Visa / Amex Noir',
        shippingAddress: {
          fullName: `${o.firstName} ${o.lastName}`.trim(),
          email: o.email,
          address: o.addressLine1,
          city: o.city,
          zipCode: o.zipCode,
          country: o.country
        },
        items: formattedItems
      };

      res.json({ success: true, order: formattedOrder });
    } catch (error: any) {
      console.error("Database error submitting order:", error);
      res.status(500).json({ error: "Failed to submit and book your couture order" });
    }
  });

  // Vite development / static production fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: {
          server: server
        }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Maison Noir App running on http://localhost:${PORT}`);
  });
}

startServer();
