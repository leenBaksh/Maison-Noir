import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as schema from './schema.ts';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

const db = drizzle(pool, { schema });

const SEED_CATEGORIES = [
  {
    id: 'Outerwear',
    name: 'la nuit Autumn (Outerwear)',
    slug: 'outerwear',
    description: 'A cinematic study of form and shadow. Structured tailored trench coats, thick wool wraps, and long drapes.',
    image: 'https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=1200'
  },
  {
    id: 'Tailoring',
    name: 'The Avant-Garde (Tailoring)',
    slug: 'tailoring',
    description: 'Disrupting traditional lines. Raw geometric hems, asymmetric closures, drop shoulders, and double-breasted panels.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200'
  },
  {
    id: 'Gowns',
    name: 'Liquid Silhouette (Gowns)',
    slug: 'gowns',
    description: 'Fluid evening elegance designed to turn heads. Slinky silk silhouettes crafted on bias drapes.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200'
  },
  {
    id: 'Footwear',
    name: 'Les Chaussures (Footwear)',
    slug: 'footwear',
    description: 'Heavy structural Chelsea military boots designed with premium thick Italian box calf leather.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200'
  },
  {
    id: 'Fragrances',
    name: "L'Essence Fragrances",
    slug: 'fragrances',
    description: 'A dark sensory exploration. Intoxicating Extrait de Parfums blending notes of raw pepper, amber, and incense.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200'
  },
  {
    id: 'Accessories',
    name: 'Les Accessoires (Accessories)',
    slug: 'accessories',
    description: 'Precision accessories balancing form with high functionality.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200'
  }
];

const SEED_PRODUCTS = [
  {
    id: 'prod_1',
    slug: 'noir-oversized-structured-coat',
    name: 'Noir Structured Wool Trench',
    price: 2450,
    originalPrice: 2850,
    category: 'Outerwear',
    description: 'An architectural masterpiece crafted from Italian double-faced virgin wool. Designed with strong drop shoulders, asymmetric double-breasted closure, and a dramatic floor-sweeping length that defines of-the-moment luxury outerwear.',
    details: JSON.stringify([
      'Relaxed, architectural oversized silhouette',
      'Asymmetric dual-button storm-collar configuration',
      'Exaggerated matching belt with brushed brass hardware',
      'Subtle internal waist-adjusters for modular structures',
      'Finished with tailored hand-stitch edges and silk linings'
    ]),
    sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
    colors: JSON.stringify([
      { name: 'Noir Eclipse', hex: '#0a0a0a' },
      { name: 'Obsidian Grey', hex: '#2d3033' }
    ]),
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 5,
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    shipping: 'Complimentary signature white glove delivery. Delivered in an archival Maison Noir garment box with cedar storage block within 2-4 business days.'
  },
  {
    id: 'prod_2',
    slug: 'avant-garde-deconstructed-blazer',
    name: 'Asymmetric Deconstructed Blazer',
    price: 1850,
    originalPrice: 2100,
    category: 'Tailoring',
    description: 'An elegant interpretation of classic tailoring. Features split lapels, an raw-edge exposed contrast inner lining, and single-button fastenings which curve across the body. Modernism redefined.',
    details: JSON.stringify([
      'Avant-garde deconstructed asymmetric tailoring',
      'Raw-edge frayed aesthetic collar block',
      'Internal structural canvas with signature double breasting',
      'Concealed magnetic lapel clip'
    ]),
    sizes: JSON.stringify(['S', 'M', 'L']),
    colors: JSON.stringify([
      { name: 'Pitch Black', hex: '#000000' },
      { name: 'Chalk Coal', hex: '#1c1a17' }
    ]),
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 7,
    rating: 4.8,
    reviewsCount: 19,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    shipping: 'Complimentary signature shipping. Packaged in a garment cover with silk ribbons.'
  },
  {
    id: 'prod_3',
    slug: 'shadow-silhouette-silk-gown',
    name: 'Liquid Shadow Silk Slip Gown',
    price: 1600,
    originalPrice: null,
    category: 'Gowns',
    description: 'Crafted from heaviest luxury heavy sand-washed silk. Drapes like a column of liquid ink. Features an elegant open low cowl-back with delicate gold chain closures and clean floor length raw hemline.',
    details: JSON.stringify([
      'Liquid weight drape cut on the bias',
      'Precious 18k gold-dipped back chain toggle',
      'Double layered bust lining for seamless wear',
      'Floor grazing length'
    ]),
    sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
    colors: JSON.stringify([
      { name: 'Obsidian Night', hex: '#09090b' },
      { name: 'Champagne Dust', hex: '#d4af37' }
    ]),
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 4,
    rating: 5.0,
    reviewsCount: 24,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    shipping: 'Complimentary overnight delivery available. Packaged in Maison Noir luxury tissue wrap and white-glove boxed.'
  },
  {
    id: 'prod_4',
    slug: 'midnight-monolith-chelsea-boots',
    name: 'Midnight Monolith Leather Boots',
    price: 1100,
    originalPrice: 1250,
    category: 'Footwear',
    description: 'Heavy structural Chelsea military boots designed with premium thick Italian box calf leather. Complete with deep-set layered hand-carved leather outsoles and a supportive structural inner framework.',
    details: JSON.stringify([
      'Premium thick full-grain Italian calf leather',
      'Hand-welded leather stacked dynamic platform outsole',
      'Elasticized elastic side goring for snug slip-on comfort',
      'Pull tabs at front and heel'
    ]),
    sizes: JSON.stringify(['38', '39', '40', '41', '42', '43', '44']),
    colors: JSON.stringify([
      { name: 'Nero Satin', hex: '#141414' }
    ]),
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 12,
    rating: 4.7,
    reviewsCount: 41,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    shipping: 'Standard elegant delivery. Sent with bespoke flannel shoe guards and branded box.'
  },
  {
    id: 'prod_5',
    slug: 'l-essence-noir-perfume',
    name: "L'Essence de L'Ombre Parfum",
    price: 320,
    originalPrice: null,
    category: 'Fragrances',
    description: "A transcendental sensory expression. Opening with top notes of crushed black pepper and sacred dark incense, transitioning into a core of midnight rose and rich vetiver, anchored in complex leather, smoke, and pure amber oud.",
    details: JSON.stringify([
      'Concentration: Extrait de Parfum (35% essential oils)',
      'Hand-poured signature noir flacon with custom brushed brass stopper',
      'Curated using vintage artisanal botanical distillation methods',
      'Limited-edition release of 500 hand-numbered units'
    ]),
    sizes: JSON.stringify(['50ml', '100ml']),
    colors: JSON.stringify([
      { name: 'Liquid Amber', hex: '#8b5a2b' }
    ]),
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 25,
    rating: 4.9,
    reviewsCount: 56,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    shipping: 'Complimentary shipping. Encased in a custom velvet cylindrical box.'
  },
  {
    id: 'prod_6',
    slug: 'obsidian-geometric-acetate-shades',
    name: 'Obsidian Hexagonal Acetate Shades',
    price: 490,
    originalPrice: null,
    category: 'Accessories',
    description: 'Chiseled black crystalline structures carved from high-density Japanese acetate. Equipped with deep dark polarizing protective Zeiss lenses and gold-etched custom side joints.',
    details: JSON.stringify([
      'Sculpted 3D custom bevel-edge frame',
      'Dark grey polarized high-definition lenses with complete UV protection',
      'Triple gold-plated hinge assemblies',
      'Gold foil Maison Noir leaf inscriptions inside temples'
    ]),
    sizes: JSON.stringify(['Standard']),
    colors: JSON.stringify([
      { name: 'Solid Midnight', hex: '#020202' },
      { name: 'Dark Tortoise', hex: '#3e2a1b' }
    ]),
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 15,
    rating: 4.6,
    reviewsCount: 15,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    shipping: 'Complimentary shipping inside soft leather magnetic folder pouch.'
  },
  {
    id: 'prod_7',
    slug: 'sculptural-leather-pouch-clutch',
    name: 'Sculptural Calfskin Lock Clutch',
    price: 1350,
    originalPrice: 1500,
    category: 'Accessories',
    description: 'An architectural foldover evening bag structured from buttery French calf leather. Completed with a custom geometric heavy solid brass dial block on the lower fold.',
    details: JSON.stringify([
      'Foldover clutch configuration with internal card pocketing',
      'Heavy solid gold brass push-lock dial',
      'Fine suede interior lining',
      'Detachable luxury fine chain shoulder strap'
    ]),
    sizes: JSON.stringify(['One Size']),
    colors: JSON.stringify([
      { name: 'Matte Onyx', hex: '#111111' },
      { name: 'Rich Cream', hex: '#fbf7f0' }
    ]),
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 8,
    rating: 4.9,
    reviewsCount: 22,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    shipping: 'Delivered in an archival cotton dust bag within standard cardboard boxing.'
  },
  {
    id: 'prod_8',
    slug: 'architectural-knit-midnight-turtle',
    name: 'Architectural Ribbed Cashmere Turtleneck',
    price: 780,
    originalPrice: null,
    category: 'Tailoring',
    description: 'An exquisitely heavy, ribbed knit pullover. Spun with ethically-sourced Mongolian grade-A pure cashmere. Featuring modern thumbhole detail cuffs and structured, drop mock collar necks.',
    details: JSON.stringify([
      'Heavy-weight 7-gauge luxury ribbing structure',
      'High draped funnel collar with comfortable flex structure',
      'Extra elongated sleeves with tailored knit thumbholes',
      'Clean side-slit base hemline details'
    ]),
    sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
    colors: JSON.stringify([
      { name: 'Onyx Rib', hex: '#0a0a0a' },
      { name: 'Pebble Melange', hex: '#7a7a7a' }
    ]),
    image: 'https://images.unsplash.com/photo-1516826110154-046070967837?q=80&w=800&auto=format&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1516826110154-046070967837?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
    ]),
    stock: 14,
    rating: 4.8,
    reviewsCount: 31,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    shipping: 'Complimentary shipping. Packaged with a custom cedar moth-repellent ring.'
  }
];

async function seed() {
  console.log('Starting seed...');
  try {
    // Clean tables
    await db.delete(schema.products);
    await db.delete(schema.categories);
    console.log('Cleaned old seed data.');

    // Seed categories
    for (const cat of SEED_CATEGORIES) {
      await db.insert(schema.categories).values(cat);
    }
    console.log(`Seeded ${SEED_CATEGORIES.length} categories.`);

    // Seed products
    for (const prod of SEED_PRODUCTS) {
      await db.insert(schema.products).values(prod);
    }
    console.log(`Seeded ${SEED_PRODUCTS.length} products.`);
    
    console.log('Database seeding successfully completed.');
  } catch (err) {
    console.error('Database seeding failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
