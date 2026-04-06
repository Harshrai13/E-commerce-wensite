const products = [
  // ===== CLOTHES =====
  {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1999,
    category: "clothes",
    description: "Premium quality cotton blend hoodie with a minimalist design. Perfect for layering or wearing solo. Features a kangaroo pocket and adjustable drawstring hood.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=700&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    rating: 4.8,
    reviews: 234,
    badge: "Bestseller",
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      rows: [
        ["XS", "36", "26", "16"],
        ["S", "38", "27", "17"],
        ["M", "40", "28", "18"],
        ["L", "42", "29", "19"],
        ["XL", "44", "30", "20"],
        ["XXL", "46", "31", "21"]
      ]
    }
  },
  {
    id: 2,
    name: "Premium White T-Shirt",
    price: 899,
    category: "clothes",
    description: "Crafted from 100% organic Supima cotton. Ultra-soft feel with a relaxed fit that's perfect for everyday wear. Pre-shrunk and fade-resistant.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Off-White"],
    rating: 4.6,
    reviews: 187,
    badge: null,
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      rows: [
        ["XS", "34", "25", "15.5"],
        ["S", "36", "26", "16.5"],
        ["M", "38", "27", "17.5"],
        ["L", "40", "28", "18.5"],
        ["XL", "42", "29", "19.5"],
        ["XXL", "44", "30", "20.5"]
      ]
    }
  },
  {
    id: 3,
    name: "Vintage Denim Jacket",
    price: 2499,
    category: "clothes",
    description: "Classic denim jacket with a vintage wash finish. Features button closure, chest pockets, and a timeless silhouette that never goes out of style.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=700&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue Wash", "Dark Indigo"],
    rating: 4.7,
    reviews: 156,
    badge: "New Arrival",
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      rows: [
        ["S", "38", "25", "17"],
        ["M", "40", "26", "18"],
        ["L", "42", "27", "19"],
        ["XL", "44", "28", "20"],
        ["XXL", "46", "29", "21"]
      ]
    }
  },
  {
    id: 4,
    name: "Casual Polo Shirt",
    price: 1299,
    category: "clothes",
    description: "Elegant piqué cotton polo with ribbed collar and cuffs. A versatile piece that transitions seamlessly from casual to semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=700&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Forest Green", "Burgundy"],
    rating: 4.5,
    reviews: 98,
    badge: null,
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      rows: [
        ["S", "37", "26", "16.5"],
        ["M", "39", "27", "17.5"],
        ["L", "41", "28", "18.5"],
        ["XL", "43", "29", "19.5"],
        ["XXL", "45", "30", "20.5"]
      ]
    }
  },
  {
    id: 5,
    name: "Slim Fit Chinos",
    price: 1799,
    category: "clothes",
    description: "Tailored slim-fit chinos made from stretch cotton twill. Comfortable all-day wear with a modern, streamlined silhouette.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=700&fit=crop",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Olive"],
    rating: 4.4,
    reviews: 142,
    badge: null,
    sizeChart: {
      headers: ["Size", "Waist (in)", "Length (in)", "Hip (in)"],
      rows: [
        ["28", "28", "40", "36"],
        ["30", "30", "40", "38"],
        ["32", "32", "41", "40"],
        ["34", "34", "41", "42"],
        ["36", "36", "42", "44"],
        ["38", "38", "42", "46"]
      ]
    }
  },
  {
    id: 6,
    name: "Oversized Sweatshirt",
    price: 1599,
    category: "clothes",
    description: "Cozy oversized sweatshirt in a premium fleece-lined fabric. Drop shoulders and a boxy fit create the perfect streetwear aesthetic.",
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=700&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "Black", "Sage"],
    rating: 4.9,
    reviews: 312,
    badge: "Trending",
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      rows: [
        ["S", "42", "27", "20"],
        ["M", "44", "28", "21"],
        ["L", "46", "29", "22"],
        ["XL", "48", "30", "23"]
      ]
    }
  },

  // ===== SHOES =====
  {
    id: 7,
    name: "Urban Street Sneakers",
    price: 3499,
    category: "shoes",
    description: "Contemporary street-style sneakers with a chunky sole and premium leather upper. Cushioned insole for all-day comfort.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=700&fit=crop",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White/Black", "All White"],
    rating: 4.7,
    reviews: 278,
    badge: "Bestseller",
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 6", "US 7", "EU 40", "25.0"],
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"],
        ["UK 11", "US 12", "EU 45", "28.5"]
      ]
    }
  },
  {
    id: 8,
    name: "Classic Leather Boots",
    price: 4999,
    category: "shoes",
    description: "Handcrafted leather boots with Goodyear welt construction. Durable rubber sole and padded collar for superior comfort and style.",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=700&fit=crop",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Brown", "Black"],
    rating: 4.8,
    reviews: 195,
    badge: "Premium",
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"],
        ["UK 11", "US 12", "EU 45", "28.5"]
      ]
    }
  },
  {
    id: 9,
    name: "Performance Running Shoes",
    price: 2999,
    category: "shoes",
    description: "Engineered for speed and comfort. Features responsive cushioning, breathable mesh upper, and a lightweight design for peak performance.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=700&fit=crop",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Red/Black", "Blue/White"],
    rating: 4.6,
    reviews: 421,
    badge: "Top Rated",
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 6", "US 7", "EU 40", "25.0"],
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"],
        ["UK 11", "US 12", "EU 45", "28.5"]
      ]
    }
  },
  {
    id: 10,
    name: "Canvas Slip-On Shoes",
    price: 1499,
    category: "shoes",
    description: "Effortless style in a lightweight canvas slip-on. Elastic side accents and padded insole make these the ultimate go-to casual shoe.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=700&fit=crop",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    colors: ["Black", "Navy", "White"],
    rating: 4.3,
    reviews: 89,
    badge: null,
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 6", "US 7", "EU 40", "25.0"],
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"]
      ]
    }
  },
  {
    id: 11,
    name: "High-Top Basketball Shoes",
    price: 3999,
    category: "shoes",
    description: "Dominate the court with these high-top basketball shoes. Ankle support, impact-absorbing sole, and aggressive traction pattern for quick cuts.",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=700&fit=crop",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Black/Gold", "White/Red"],
    rating: 4.5,
    reviews: 167,
    badge: null,
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"],
        ["UK 11", "US 12", "EU 45", "28.5"]
      ]
    }
  },
  {
    id: 12,
    name: "Formal Oxford Shoes",
    price: 4499,
    category: "shoes",
    description: "Elegant Oxford shoes crafted from genuine leather with a polished finish. Blake-stitched construction and leather sole for a refined look.",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=700&fit=crop",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Tan", "Black"],
    rating: 4.7,
    reviews: 134,
    badge: "Premium",
    sizeChart: {
      headers: ["UK Size", "US Size", "EU Size", "Foot Length (cm)"],
      rows: [
        ["UK 7", "US 8", "EU 41", "25.5"],
        ["UK 8", "US 9", "EU 42", "26.5"],
        ["UK 9", "US 10", "EU 43", "27.0"],
        ["UK 10", "US 11", "EU 44", "28.0"],
        ["UK 11", "US 12", "EU 45", "28.5"]
      ]
    }
  }
];

const promoCodes = [
  {
    code: "SAVE200",
    discount: 200,
    description: "Get ₹200 off on all products",
    active: true
  },
  {
    code: "WELCOME100",
    discount: 100,
    description: "Welcome offer - ₹100 off on your first order",
    active: true
  }
];

module.exports = { products, promoCodes };
