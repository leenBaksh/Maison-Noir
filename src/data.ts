import { Product, Collection, Look, PressQuote } from './types';

// Let's seed beautiful, editorial products with dual images for seamless hover transitions
export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    slug: 'noir-oversized-structured-coat',
    name: 'Noir Structured Wool Trench',
    price: 2450,
    category: 'Outerwear',
    description: 'An architectural masterpiece crafted from Italian double-faced virgin wool. Designed with strong drop shoulders, asymmetric double-breasted closure, and a dramatic floor-sweeping length that defines of-the-moment luxury outerwear.',
    details: [
      'Relaxed, architectural oversized silhouette',
      'Asymmetric dual-button storm-collar configuration',
      'Exaggerated matching belt with brushed brass hardware',
      'Subtle internal waist-adjusters for modular structures',
      'Finished with tailored hand-stitch edges and silk linings'
    ],
    materials: [
      '85% Virgin Wool, 15% Cashmere',
      '100% Mulberry Silk interior details',
      'Responsibly-sourced horn buttons'
    ],
    care: [
      'Dry clean only by certified luxury specialists',
      'Do not wash or tumble dry',
      'Iron on low heat with press cloth'
    ],
    shipping: 'Complimentary signature white glove delivery. Delivered in an archival Maison Noir garment box with cedar storage block within 2-4 business days.',
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Noir Eclipse', hex: '#0a0a0a' },
      { name: 'Obsidian Grey', hex: '#2d3033' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 5,
    isFeatured: true
  },
  {
    id: 'prod_2',
    slug: 'avant-garde-deconstructed-blazer',
    name: 'Asymmetric Deconstructed Blazer',
    price: 1850,
    category: 'Tailoring',
    description: 'An elegant interpretation of classic tailoring. Features split lapels, an raw-edge exposed contrast inner lining, and single-button fastenings which curve across the body. Modernism redefined.',
    details: [
      'Avant-garde deconstructed asymmetric tailoring',
      'Raw-edge frayed aesthetic collar block',
      'Internal structural canvas with signature double breasting',
      'Concealed magnetic lapel clip'
    ],
    materials: [
      '90% Technical Wool, 10% Spandex for structural flex',
      '100% Cupro breathing silk-blend lining'
    ],
    care: [
      'Dry clean only',
      'Store flat or on heavy molded luxury hangers'
    ],
    shipping: 'Complimentary signature shipping. Packaged in a garment cover with silk ribbons.',
    rating: 4.8,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000' },
      { name: 'Chalk Coal', hex: '#1c1a17' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: 7,
    isFeatured: true
  },
  {
    id: 'prod_3',
    slug: 'shadow-silhouette-silk-gown',
    name: 'Liquid Shadow Silk Slip Gown',
    price: 1600,
    category: 'Gowns',
    description: 'Crafted from heaviest luxury heavy sand-washed silk. Drapes like a column of liquid ink. Features an elegant open low cowl-back with delicate gold chain closures and clean floor length raw hemline.',
    details: [
      'Liquid weight drape cut on the bias',
      'Precious 18k gold-dipped back chain toggle',
      'Double layered bust lining for seamless wear',
      'Floor grazing length'
    ],
    materials: [
      '100% Organic Mulberry Sand-washed Silk',
      '18k Gold-plated hardware hooks'
    ],
    care: [
      'Professional dry-clean only',
      'Steam gently from distance of 10 inches'
    ],
    shipping: 'Complimentary overnight delivery available. Packaged in Maison Noir luxury tissue wrap and white-glove boxed.',
    rating: 5.0,
    reviewsCount: 24,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Obsidian Night', hex: '#09090b' },
      { name: 'Champagne Dust', hex: '#d4af37' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 4,
    isFeatured: true
  },
  {
    id: 'prod_4',
    slug: 'midnight-monolith-chelsea-boots',
    name: 'Midnight Monolith Leather Boots',
    price: 1100,
    category: 'Footwear',
    description: 'Heavy structural Chelsea military boots designed with premium thick Italian box calf leather. Complete with deep-set layered hand-carved leather outsoles and a supportive structural inner framework.',
    details: [
      'Premium thick full-grain Italian calf leather',
      'Hand-welded leather stacked dynamic platform outsole',
      'Elasticized elastic side goring for snug slip-on comfort',
      'Pull tabs at front and heel'
    ],
    materials: [
      '100% Box Calf Leather outer',
      'Fine Italian goat leather lining',
      'Rubberized protective tread inserts'
    ],
    care: [
      'Clean to shine with soft dry cloth and neutral wax conditioner',
      'Always store are cedar shoe trees to retain balance'
    ],
    shipping: 'Standard elegant delivery. Sent with bespoke flannel shoe guards and branded box.',
    rating: 4.7,
    reviewsCount: 41,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nero Satin', hex: '#141414' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 12,
    isFeatured: false
  },
  {
    id: 'prod_5',
    slug: 'l-essence-noir-perfume',
    name: "L'Essence de L'Ombre Parfum",
    price: 320,
    category: 'Fragrances',
    description: "A transcendental sensory expression. Opening with top notes of crushed black pepper and sacred dark incense, transitioning into a core of midnight rose and rich vetiver, anchored in complex leather, smoke, and pure amber oud.",
    details: [
      'Concentration: Extrait de Parfum (35% essential oils)',
      'Hand-poured signature noir flacon with custom brushed brass stopper',
      'Curated using vintage artisanal botanical distillation methods',
      'Limited-edition release of 500 hand-numbered units'
    ],
    materials: [
      'Natural sandalwood extracts',
      'Handcrafted essential incense oils',
      'Brushed golden alloy stopper'
    ],
    care: [
      'Store away from direct light, humidity, or sudden climate fluctuations'
    ],
    shipping: 'Complimentary shipping. Encased in a custom velvet cylindrical box.',
    rating: 4.9,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Liquid Amber', hex: '#8b5a2b' }
    ],
    sizes: ['50ml', '100ml'],
    stock: 25,
    isFeatured: true
  },
  {
    id: 'prod_6',
    slug: 'obsidian-geometric-acetate-shades',
    name: 'Obsidian Hexagonal Acetate Shades',
    price: 490,
    category: 'Accessories',
    description: 'Chiseled black crystalline structures carved from high-density Japanese acetate. Equipped with deep dark polarizing protective Zeiss lenses and gold-etched custom side joints.',
    details: [
      'Sculpted 3D custom bevel-edge frame',
      'Dark grey polarized high-definition lenses with complete UV protection',
      'Triple gold-plated hinge assemblies',
      'Gold foil Maison Noir leaf inscriptions inside temples'
    ],
    materials: [
      '100% Japanese hand-cured Acetate',
      'Zeiss structural anti-reflective lenses'
    ],
    care: [
      'Wipe only with accompanying Microleather cloth',
      'Never wash or leave in high heat dashboards'
    ],
    shipping: 'Complimentary shipping inside soft leather magnetic folder pouch.',
    rating: 4.6,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Solid Midnight', hex: '#020202' },
      { name: 'Dark Tortoise', hex: '#3e2a1b' }
    ],
    sizes: ['Standard'],
    stock: 15,
    isFeatured: false
  },
  {
    id: 'prod_7',
    slug: 'sculptural-leather-pouch-clutch',
    name: 'Sculptural Calfskin Lock Clutch',
    price: 1350,
    category: 'Accessories',
    description: 'An architectural foldover evening bag structured from buttery French calf leather. Completed with a custom geometric heavy solid brass dial block on the lower fold.',
    details: [
      'Foldover clutch configuration with internal card pocketing',
      'Heavy solid gold brass push-lock dial',
      'Fine suede interior lining',
      'Detachable luxury fine chain shoulder strap'
    ],
    materials: [
      '100% Soft French Calfskin',
      'Solid-brass milled metal hardware'
    ],
    care: [
      'Leather lotion clean by professional specialists',
      'Keep away from wet surfaces or color-transfer indigo denim'
    ],
    shipping: 'Delivered in an archival cotton dust bag within standard cardboard boxing.',
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#111111' },
      { name: 'Rich Cream', hex: '#fbf7f0' }
    ],
    sizes: ['One Size'],
    stock: 8,
    isFeatured: true
  },
  {
    id: 'prod_8',
    slug: 'architectural-knit-midnight-turtle',
    name: 'Architectural Ribbed Cashmere Turtleneck',
    price: 780,
    category: 'Tailoring',
    description: 'An exquisitely heavy, ribbed knit pullover. Spun with ethically-sourced Mongolian grade-A pure cashmere. Featuring modern thumbhole detail cuffs and structured, drop mock collar necks.',
    details: [
      'Heavy-weight 7-gauge luxury ribbing structure',
      'High draped funnel collar with comfortable flex structure',
      'Extra elongated sleeves with tailored knit thumbholes',
      'Clean side-slit base hemline details'
    ],
    materials: [
      '100% Grade-A Mongolian Cashmere'
    ],
    care: [
      'Hand-wash in lukewarm water with cashmere mild solution',
      'Do not wring; dry flat in shade'
    ],
    shipping: 'Complimentary shipping. Packaged with a custom cedar moth-repellent ring.',
    rating: 4.8,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1516826110154-046070967837?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Onyx Rib', hex: '#0a0a0a' },
      { name: 'Pebble Melange', hex: '#7a7a7a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 14,
    isFeatured: false
  }
];

export const COLLECTIONS: Collection[] = [
  {
    slug: 'la-nuit',
    name: 'La Nuit Autumn',
    label: 'AUTUMN / WINTER 2026',
    description: 'A cinematic study of form and shadow. Structured tailored trench coats, thick wool wraps, and long drapes that sweep through moon-lit midnight streets. Each silhouette is engineered to command presence, crafted from world-sourced virgin fibers.',
    image: 'https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Where darkness meets pure tailored precision'
  },
  {
    slug: 'avant-garde',
    name: 'The Avant-Garde',
    label: 'MIDNIGHT ESSENTIALS',
    description: 'Disrupting traditional lines. Raw geometric hems, asymmetric closures, drop shoulders, and double-breasted panels that form-fit like protective, beautiful armor. Tailoring rebuilt for the modern rebel.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Defying lines, embracing shadows'
  },
  {
    slug: 'les-accessoires',
    name: 'Les Accessoires',
    label: 'CRAFTED LEATHER & GLASS',
    description: 'Precision accessories balancing form with high functionality. Elegant box-calf boots, chiseled crystalline sunglasses, and sculptural minimalist evening bags, heavily finished with solid-milled golden metals.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Archival structures to elevate any ensemble'
  },
  {
    slug: 'l-essence',
    name: "L'Essence Fragrances",
    label: 'BOTANICAL Midnight Distillations',
    description: 'A dark sensory exploration. Intoxicating Extrait de Parfums blending notes of raw pepper, warm sandalwood, amber, leather and smoky incense. Designed for individualist expression in artisanal glass bottles.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The olfactory signature of absolute luxury'
  }
];

export const LOOKBOOK_LOOKS: Look[] = [
  {
    id: 'look_01',
    title: 'Autumn Shadow Outline',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    tagline: 'Look 01: Noir structured trench coat paired with cashmere mockup turtleneck and crystalline obsidian sunglasses.'
  },
  {
    id: 'look_02',
    title: 'The Unstructured Soul',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    tagline: 'Look 02: Asymmetric blazer loosely draped over liquid silk cowl slip dress.'
  },
  {
    id: 'look_03',
    title: 'Onyx Monolith Stride',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop',
    tagline: 'Look 03: Heavy cashmere ribbed pullover with box-calf leather side pouches and monolith combat boots.'
  },
  {
    id: 'look_04',
    title: 'The Dark Scent Silhouette',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    tagline: 'Look 04: Structured tailoring in deep slate charcoal, spray accentuated with warm L’Ombre Parfum.'
  }
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    quote: "Maison Noir redefines what it means to dress with absolute purpose and elegant shadow.",
    publication: "VOGUE Paris"
  },
  {
    quote: "An extraordinary masterclass in severe luxury, moody structuralism, and premium midnight aesthetics. The trench is archival.",
    publication: "The New York Times Style"
  },
  {
    quote: "Where pristine tailoring joins exquisite darkness. Maison Noir remains the crown jewel of modern high fashion.",
    publication: "Harper's BAZAAR"
  }
];

export const INSTAGRAM_FEED_IMAGES = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&h=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400&h=400&auto=format&fit=crop'
];
