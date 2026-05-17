import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nev";

// ─── CATEGORY & SUBCATEGORY CONFIG ───────────────────────────
const CATEGORIES = [
  {
    id: "all", label: "All Products", icon: "🛍️", color: "#3d6b4f",
    sub: [],
  },
  {
    id: "dogs", label: "Dogs", icon: "🐕", color: "#8B5E3C",
    sub: [
      { id: "dog-food",      label: "Food & Nutrition",  icon: "🥩" },
      { id: "dog-toys",      label: "Toys & Games",       icon: "🎾" },
      { id: "dog-grooming",  label: "Grooming",           icon: "✂️" },
      { id: "dog-house",     label: "Dog Houses",         icon: "🏠" },
      { id: "dog-accessories",label: "Accessories",       icon: "🦮" },
      { id: "dog-pharmacy",  label: "Pharmacy",           icon: "💊" },
      { id: "dog-bodywash",  label: "Body Wash & Shampoo",icon: "🧴" },
      { id: "dog-tools",     label: "Tools & Training",   icon: "🔧" },
    ],
  },
  {
    id: "cats", label: "Cats", icon: "🐈", color: "#7c5cfc",
    sub: [
      { id: "cat-food",      label: "Food & Nutrition",  icon: "🍗" },
      { id: "cat-toys",      label: "Toys & Laser",      icon: "🪀" },
      { id: "cat-grooming",  label: "Grooming",          icon: "✂️" },
      { id: "cat-litter",    label: "Litter & Hygiene",  icon: "🪣" },
      { id: "cat-accessories",label: "Accessories",      icon: "🎀" },
      { id: "cat-pharmacy",  label: "Pharmacy",          icon: "💊" },
      { id: "cat-bodywash",  label: "Body Wash & Shampoo",icon:"🧴" },
      { id: "cat-scratch",   label: "Scratch & Climb",   icon: "🧗" },
    ],
  },
  {
    id: "birds", label: "Birds", icon: "🦜", color: "#3ecf8e",
    sub: [
      { id: "bird-food",     label: "Seeds & Food",      icon: "🌾" },
      { id: "bird-cage",     label: "Cages & Nests",     icon: "🏡" },
      { id: "bird-toys",     label: "Toys & Perches",    icon: "🪆" },
      { id: "bird-accessories",label: "Accessories",     icon: "🎵" },
      { id: "bird-grooming", label: "Grooming",          icon: "🪮" },
      { id: "bird-pharmacy", label: "Pharmacy",          icon: "💊" },
      { id: "bird-nests",    label: "Nests & Bedding",   icon: "🪹" },
      { id: "bird-vitamins", label: "Vitamins & Supplements",icon:"🌿"},
    ],
  },
  {
    id: "fish", label: "Fish", icon: "🐠", color: "#2196F3",
    sub: [
      { id: "fish-food",     label: "Fish Food",         icon: "🦐" },
      { id: "fish-aquarium", label: "Aquariums & Tanks", icon: "🐟" },
      { id: "fish-filter",   label: "Filters & Pumps",   icon: "⚙️" },
      { id: "fish-decor",    label: "Decor & Plants",    icon: "🪸" },
      { id: "fish-swimming", label: "Swimming Pools",    icon: "🌊" },
      { id: "fish-pharmacy", label: "Pharmacy",          icon: "💊" },
      { id: "fish-lighting", label: "Lighting",          icon: "💡" },
      { id: "fish-tools",    label: "Tools & Testing",   icon: "🧪" },
    ],
  },
];

// ─── MOCK PRODUCTS — Har subcategory ke 2 products, verified images ─────────
const MOCK_PRODUCTS = [

  // ══ DOGS ══════════════════════════════════════════════════════════════════

  // dog-food (2)
  { id:101, name:"Royal Canin Adult Dog Food — Chicken 3kg",    price:1299, oldPrice:1599, category:"dogs", sub:"dog-food",       badge:"POPULAR", img:"https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&q=80", rating:4.8, reviews:412 },
  { id:102, name:"Pedigree Puppy Starter Milk & Chicken 1.2kg", price:549,  oldPrice:699,  category:"dogs", sub:"dog-food",       badge:null,      img:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80", rating:4.5, reviews:187 },

  // dog-toys (2)
  { id:103, name:"Rope Tug & Chew Toy Combo Set",               price:349,  oldPrice:499,  category:"dogs", sub:"dog-toys",       badge:"NEW",     img:"https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80", rating:4.4, reviews:93  },
  { id:104, name:"Squeaky Rubber Ball Pack of 3",               price:199,  oldPrice:null,  category:"dogs", sub:"dog-toys",      badge:null,      img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating:4.2, reviews:61  },

  // dog-grooming (2)
  { id:105, name:"Professional Dog Grooming Scissor Kit",       price:899,  oldPrice:1200, category:"dogs", sub:"dog-grooming",   badge:"PREMIUM", img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80", rating:4.7, reviews:145 },
  { id:106, name:"Stainless Steel Dog Nail Clipper",            price:249,  oldPrice:null,  category:"dogs", sub:"dog-grooming",  badge:null,      img:"https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=400&q=80", rating:4.3, reviews:78  },

  // dog-house (2)
  { id:107, name:"Wooden Indoor Dog Kennel — Medium",           price:3299, oldPrice:4500, category:"dogs", sub:"dog-house",      badge:"POPULAR", img:"https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400&q=80", rating:4.9, reviews:55  },
  { id:108, name:"Soft Foldable Travel Dog House",              price:1199, oldPrice:1599, category:"dogs", sub:"dog-house",      badge:"NEW",     img:"https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80", rating:4.5, reviews:34  },

  // dog-accessories (2)
  { id:109, name:"Adjustable Nylon Dog Harness — Blue",         price:499,  oldPrice:699,  category:"dogs", sub:"dog-accessories",badge:null,      img:"https://images.unsplash.com/photo-1601758174493-5a89b9e7e6b5?w=400&q=80", rating:4.4, reviews:119 },
  { id:110, name:"Reflective Dog Leash 1.5m",                   price:299,  oldPrice:null,  category:"dogs", sub:"dog-accessories",badge:null,     img:"https://images.unsplash.com/photo-1527244329-5c6d0e02e1d1?w=400&q=80", rating:4.2, reviews:88  },

  // dog-pharmacy (2)
  { id:111, name:"NexGard Tick & Flea Chewable Tablet",         price:699,  oldPrice:899,  category:"dogs", sub:"dog-pharmacy",   badge:"POPULAR", img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", rating:4.8, reviews:302 },
  { id:112, name:"Multivitamin Supplement Chews for Dogs",      price:349,  oldPrice:null,  category:"dogs", sub:"dog-pharmacy",  badge:null,      img:"https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=400&q=80", rating:4.5, reviews:143 },

  // dog-bodywash (2)
  { id:113, name:"Organic Oatmeal & Aloe Dog Shampoo 500ml",   price:349,  oldPrice:499,  category:"dogs", sub:"dog-bodywash",   badge:"NEW",     img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", rating:4.6, reviews:97  },
  { id:114, name:"Anti-Tick Medicated Dog Body Wash 300ml",     price:279,  oldPrice:null,  category:"dogs", sub:"dog-bodywash",  badge:null,      img:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80", rating:4.3, reviews:54  },

  // dog-tools (2)
  { id:115, name:"Positive Reinforcement Training Clicker",     price:149,  oldPrice:199,  category:"dogs", sub:"dog-tools",      badge:null,      img:"https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80", rating:4.1, reviews:47  },
  { id:116, name:"Retractable Measuring Training Lead 5m",      price:399,  oldPrice:null,  category:"dogs", sub:"dog-tools",     badge:"NEW",     img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80", rating:4.4, reviews:29  },

  // ══ CATS ══════════════════════════════════════════════════════════════════

  // cat-food (2)
  { id:201, name:"Whiskas Tuna & Salmon Wet Food Pouches 12pk", price:649,  oldPrice:849,  category:"cats", sub:"cat-food",       badge:"POPULAR", img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80", rating:4.8, reviews:521 },
  { id:202, name:"Royal Canin Kitten Dry Food 2kg",             price:899,  oldPrice:1199, category:"cats", sub:"cat-food",       badge:null,      img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80", rating:4.7, reviews:289 },

  // cat-toys (2)
  { id:203, name:"Interactive Feather Wand Cat Teaser",         price:249,  oldPrice:349,  category:"cats", sub:"cat-toys",       badge:"NEW",     img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80", rating:4.6, reviews:178 },
  { id:204, name:"Electronic Laser Pointer Auto Toy",           price:399,  oldPrice:549,  category:"cats", sub:"cat-toys",       badge:"POPULAR", img:"https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&q=80", rating:4.5, reviews:134 },

  // cat-grooming (2)
  { id:205, name:"Soft Silicone Cat Grooming Brush Glove",      price:349,  oldPrice:null,  category:"cats", sub:"cat-grooming",  badge:null,      img:"https://images.unsplash.com/photo-1518715308788-3005759c5f49?w=400&q=80", rating:4.4, reviews:87  },
  { id:206, name:"Deshedding Stainless Comb for Long Hair Cats",price:449,  oldPrice:599,  category:"cats", sub:"cat-grooming",   badge:"PREMIUM", img:"https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&q=80", rating:4.6, reviews:112 },

  // cat-litter (2)
  { id:207, name:"Clumping Bentonite Cat Litter 10kg",          price:699,  oldPrice:899,  category:"cats", sub:"cat-litter",     badge:"POPULAR", img:"https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&q=80", rating:4.7, reviews:334 },
  { id:208, name:"Self-Cleaning Automatic Litter Box",          price:3499, oldPrice:4999, category:"cats", sub:"cat-litter",     badge:"PREMIUM", img:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80", rating:4.9, reviews:98  },

  // cat-accessories (2)
  { id:209, name:"Leather Cat Collar with Safety Buckle",       price:199,  oldPrice:null,  category:"cats", sub:"cat-accessories",badge:null,     img:"https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&q=80", rating:4.2, reviews:65  },
  { id:210, name:"Cat Bed Cave — Fleece Cozy Igloo",            price:799,  oldPrice:1099, category:"cats", sub:"cat-accessories", badge:"NEW",    img:"https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&q=80", rating:4.5, reviews:91  },

  // cat-pharmacy (2)
  { id:211, name:"Deworming Tablet for Cats — 4 Tabs",         price:199,  oldPrice:299,  category:"cats", sub:"cat-pharmacy",   badge:null,      img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", rating:4.5, reviews:201 },
  { id:212, name:"Profender Spot-On Anti-Parasite for Cats",   price:549,  oldPrice:699,  category:"cats", sub:"cat-pharmacy",   badge:"POPULAR", img:"https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=400&q=80", rating:4.7, reviews:156 },

  // cat-bodywash (2)
  { id:213, name:"Tearless Cat Shampoo — Lavender 250ml",      price:299,  oldPrice:null,  category:"cats", sub:"cat-bodywash",  badge:"NEW",     img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", rating:4.3, reviews:48  },
  { id:214, name:"Waterless Cat Foam Shampoo 200ml",            price:249,  oldPrice:349,  category:"cats", sub:"cat-bodywash",   badge:null,      img:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80", rating:4.4, reviews:73  },

  // cat-scratch (2)
  { id:215, name:"5-Level Cat Scratch Tower with Hammock",      price:1999, oldPrice:2799, category:"cats", sub:"cat-scratch",    badge:"POPULAR", img:"https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=400&q=80", rating:4.8, reviews:267 },
  { id:216, name:"Sisal Rope Cat Scratching Post 60cm",         price:599,  oldPrice:799,  category:"cats", sub:"cat-scratch",    badge:null,      img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating:4.5, reviews:134 },

  // ══ BIRDS ═════════════════════════════════════════════════════════════════

  // bird-food (2)
  { id:301, name:"Premium Sunflower & Millet Seed Mix 1kg",    price:249,  oldPrice:349,  category:"birds", sub:"bird-food",      badge:"POPULAR", img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80", rating:4.6, reviews:223 },
  { id:302, name:"Egg & Biscuit Softfood for Parrots 500g",    price:199,  oldPrice:null,  category:"birds", sub:"bird-food",     badge:null,      img:"https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&q=80", rating:4.4, reviews:87  },

  // bird-cage (2)
  { id:303, name:"Wrought Iron Bird Cage XL with Stand",        price:2799, oldPrice:3999, category:"birds", sub:"bird-cage",     badge:"PREMIUM", img:"https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=400&q=80", rating:4.8, reviews:76  },
  { id:304, name:"Acrylic Transparent Bird Cage — Medium",      price:1299, oldPrice:1799, category:"birds", sub:"bird-cage",     badge:"NEW",     img:"https://images.unsplash.com/photo-1559181567-c3190ca9d786?w=400&q=80", rating:4.5, reviews:44  },

  // bird-toys (2)
  { id:305, name:"Wooden Swing & Bell Perch Set",               price:299,  oldPrice:null,  category:"birds", sub:"bird-toys",    badge:null,      img:"https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80", rating:4.3, reviews:67  },
  { id:306, name:"Colorful Foraging Toy Bundle for Parrots",    price:399,  oldPrice:549,  category:"birds", sub:"bird-toys",     badge:"NEW",     img:"https://images.unsplash.com/photo-1508247967583-7d982ea01526?w=400&q=80", rating:4.5, reviews:52  },

  // bird-accessories (2)
  { id:307, name:"Stainless Steel Bird Food & Water Bowls Set", price:249,  oldPrice:349,  category:"birds", sub:"bird-accessories",badge:null,    img:"https://images.unsplash.com/photo-1555169062-013468b47731?w=400&q=80", rating:4.4, reviews:89  },
  { id:308, name:"Bird Ankle Ring ID Bands — Pack of 10",       price:149,  oldPrice:null,  category:"birds", sub:"bird-accessories",badge:null,   img:"https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=400&q=80", rating:4.0, reviews:31  },

  // bird-grooming (2)
  { id:309, name:"Aloe Vera Bird Conditioning Spray 250ml",     price:199,  oldPrice:null,  category:"birds", sub:"bird-grooming", badge:"NEW",   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", rating:4.3, reviews:42  },
  { id:310, name:"Bird Nail & Beak Trimming Kit",               price:349,  oldPrice:499,  category:"birds", sub:"bird-grooming",  badge:null,    img:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80", rating:4.2, reviews:27  },

  // bird-pharmacy (2)
  { id:311, name:"Anti-Mite & Parasite Spray for Birds 200ml", price:279,  oldPrice:349,  category:"birds", sub:"bird-pharmacy",  badge:null,     img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", rating:4.4, reviews:64  },
  { id:312, name:"Bird Probiotic & Digestive Health Drops",     price:229,  oldPrice:null,  category:"birds", sub:"bird-pharmacy", badge:null,    img:"https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=400&q=80", rating:4.3, reviews:38  },

  // bird-nests (2)
  { id:313, name:"Natural Coconut Fiber Bird Nesting Box",      price:349,  oldPrice:499,  category:"birds", sub:"bird-nests",     badge:null,     img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80", rating:4.5, reviews:93  },
  { id:314, name:"Warm Fleece Bird Nest Hut — Small",           price:299,  oldPrice:null,  category:"birds", sub:"bird-nests",    badge:"NEW",    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating:4.4, reviews:57  },

  // bird-vitamins (2)
  { id:315, name:"Parrot MultiVitamin & Mineral Drops 30ml",   price:299,  oldPrice:null,  category:"birds", sub:"bird-vitamins", badge:null,     img:"https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&q=80", rating:4.4, reviews:48  },
  { id:316, name:"Calcium & Vitamin D3 Supplement for Birds",  price:199,  oldPrice:249,  category:"birds", sub:"bird-vitamins",  badge:"POPULAR",img:"https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&q=80", rating:4.5, reviews:72  },

  // ══ FISH ══════════════════════════════════════════════════════════════════

  // fish-food (2)
  { id:401, name:"Tetra Min Tropical Fish Flakes 200g",        price:299,  oldPrice:null,  category:"fish", sub:"fish-food",       badge:"POPULAR", img:"https://images.unsplash.com/photo-1520637836993-5cd2e4060db0?w=400&q=80", rating:4.7, reviews:387 },
  { id:402, name:"Hikari Goldfish Pellets Floating 300g",      price:249,  oldPrice:349,  category:"fish", sub:"fish-food",        badge:null,       img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80", rating:4.5, reviews:189 },

  // fish-aquarium (2)
  { id:403, name:"Boyu 60L Glass Aquarium Starter Kit",        price:4999, oldPrice:6500, category:"fish", sub:"fish-aquarium",   badge:"PREMIUM",  img:"https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=400&q=80", rating:4.9, reviews:134 },
  { id:404, name:"Aqua Culture 20L Acrylic Fish Tank",         price:1799, oldPrice:2499, category:"fish", sub:"fish-aquarium",   badge:"NEW",       img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80", rating:4.6, reviews:78  },

  // fish-filter (2)
  { id:405, name:"Fluval 207 External Canister Filter 300L/h", price:3299, oldPrice:4199, category:"fish", sub:"fish-filter",     badge:"PREMIUM",  img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80", rating:4.8, reviews:112 },
  { id:406, name:"Sponge Bio Filter — Internal Aquarium Pump", price:499,  oldPrice:699,  category:"fish", sub:"fish-filter",     badge:null,        img:"https://images.unsplash.com/photo-1534361960057-19f4434a337f?w=400&q=80", rating:4.4, reviews:67  },

  // fish-decor (2)
  { id:407, name:"Artificial Coral & Reef Decor Set 5 Pieces", price:699,  oldPrice:999,  category:"fish", sub:"fish-decor",      badge:null,        img:"https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&q=80", rating:4.4, reviews:91  },
  { id:408, name:"Natural River Rocks & Gravel Substrate 2kg", price:349,  oldPrice:null,  category:"fish", sub:"fish-decor",     badge:null,        img:"https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400&q=80", rating:4.2, reviews:53  },

  // fish-swimming (2)
  { id:409, name:"Garden Pond Preformed Swimming Pool 500L",   price:4499, oldPrice:5999, category:"fish", sub:"fish-swimming",   badge:null,        img:"https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&q=80", rating:4.5, reviews:38  },
  { id:410, name:"Outdoor Koi Pond Kit with Pump & Filter",    price:6999, oldPrice:9500, category:"fish", sub:"fish-swimming",   badge:"PREMIUM",   img:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80", rating:4.8, reviews:25  },

  // fish-pharmacy (2)
  { id:411, name:"API Melafix Bacterial Infection Treatment",  price:449,  oldPrice:599,  category:"fish", sub:"fish-pharmacy",   badge:null,        img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80", rating:4.5, reviews:142 },
  { id:412, name:"Seachem Prime Water Conditioner 250ml",      price:599,  oldPrice:799,  category:"fish", sub:"fish-pharmacy",   badge:"POPULAR",   img:"https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=400&q=80", rating:4.8, reviews:203 },

  // fish-lighting (2)
  { id:413, name:"Aquarium LED Light Bar 60cm Full Spectrum",  price:1299, oldPrice:1799, category:"fish", sub:"fish-lighting",   badge:"POPULAR",   img:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80", rating:4.7, reviews:167 },
  { id:414, name:"Submersible Colour Changing LED Strip 1m",   price:549,  oldPrice:749,  category:"fish", sub:"fish-lighting",   badge:"NEW",       img:"https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400&q=80", rating:4.4, reviews:88  },

  // fish-tools (2)
  { id:415, name:"API 5-in-1 Aquarium Water Test Strips 100pk",price:399,  oldPrice:549,  category:"fish", sub:"fish-tools",     badge:"NEW",        img:"https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=400&q=80", rating:4.6, reviews:211 },
  { id:416, name:"Gravel Vacuum Siphon Cleaner with Pump",     price:299,  oldPrice:null,  category:"fish", sub:"fish-tools",     badge:null,         img:"https://images.unsplash.com/photo-1527244329-5c6d0e02e1d1?w=400&q=80", rating:4.3, reviews:76  },
];

const BADGE_STYLES = {
  POPULAR: { bg: "#3d6b4f", text: "#fff" },
  PREMIUM: { bg: "#7c5cfc", text: "#fff" },
  NEW:     { bg: "#3ecf8e", text: "#fff" },
};

const SORT_OPTIONS = [
  { value: "default",    label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "popular",    label: "Most Popular" },
];

// ─── CSS ─────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:       #f4f1eb;
    --bg2:      #ede8de;
    --surface:  #ffffff;
    --card:     #faf8f4;
    --sage:     #3d6b4f;
    --sage-d:   #2a4e39;
    --sage-l:   #5a9470;
    --sage-xs:  rgba(61,107,79,0.09);
    --sage-sm:  rgba(61,107,79,0.18);
    --gold:     #b8922a;
    --gold-l:   #d4ac48;
    --gold-xs:  rgba(184,146,42,0.12);
    --border:   rgba(61,107,79,0.13);
    --border2:  rgba(184,146,42,0.18);
    --text:     #1c2b22;
    --text2:    #3a4a3f;
    --muted:    #7a907f;
    --dim:      #aab8ac;
    --ivory:    #fdf9f2;
    --shadow:   0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg:0 16px 60px rgba(30,50,35,0.14);
    --radius:   20px;
  }

  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:5px;}
  ::-webkit-scrollbar-thumb{background:var(--sage);border-radius:10px;}

  @keyframes fadeUp  {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
  @keyframes slideL  {from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:none}}
  @keyframes floatY  {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes orbDrift{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(40px,-30px) scale(1.08)}70%{transform:translate(-20px,20px) scale(0.96)}}
  @keyframes shimmer {0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes popIn   {0%{transform:scale(0.85);opacity:0}100%{transform:scale(1);opacity:1}}
  @keyframes spin    {to{transform:rotate(360deg)}}

  .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
  .reveal.visible{opacity:1;transform:none;}

  /* ── Page ── */
  .pr-page{min-height:100vh;background:var(--bg);font-family:'Outfit',sans-serif;color:var(--text);}

  /* ── Hero ── */
  .pr-hero{
    background:linear-gradient(160deg,#1e3a28,#2a5a3c,#1a4030);
    padding:64px 24px 52px;text-align:center;position:relative;overflow:hidden;
  }
  .pr-hero-orb{
    position:absolute;width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle,rgba(90,148,112,0.2),transparent 70%);
    pointer-events:none;animation:orbDrift 14s ease-in-out infinite;
  }
  .pr-hero-orb1{top:-100px;left:-80px;}
  .pr-hero-orb2{bottom:-120px;right:-60px;animation-delay:-6s;}
  .pr-hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto;}
  .pr-label-tag{
    display:inline-flex;align-items:center;gap:8px;
    font-size:0.68rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;
    color:#d4ac48;margin-bottom:14px;animation:fadeUp 0.5s ease;
  }
  .pr-label-tag::before{content:'';width:24px;height:2px;background:#d4ac48;border-radius:2px;}
  .pr-hero-title{
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(34px,7vw,58px);font-weight:700;color:#fff;line-height:1.08;
    margin-bottom:14px;animation:fadeUp 0.55s ease;
  }
  .pr-hero-title em{font-style:italic;color:#d4ac48;}
  .pr-hero-sub{font-size:14px;color:rgba(255,255,255,0.5);animation:fadeUp 0.6s ease;letter-spacing:0.5px;}
  .pr-hero-stats{
    display:flex;gap:32px;justify-content:center;flex-wrap:wrap;
    margin-top:32px;animation:fadeUp 0.65s ease;
  }
  .pr-stat{text-align:center;}
  .pr-stat-num{
    font-family:'Cormorant Garamond',serif;
    font-size:32px;font-weight:700;color:#fff;line-height:1;
  }
  .pr-stat-label{font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;margin-top:3px;}

  /* ── Search bar ── */
  .pr-search-wrap{
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:18px 24px;position:sticky;top:0;z-index:100;
    box-shadow:0 2px 12px rgba(30,50,35,0.06);
  }
  .pr-search-inner{max-width:900px;margin:0 auto;display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
  .pr-search-box{
    flex:1;min-width:200px;display:flex;align-items:center;gap:10px;
    background:var(--ivory);border:1.5px solid var(--border);border-radius:50px;
    padding:10px 18px;transition:all 0.2s;
  }
  .pr-search-box:focus-within{border-color:var(--sage);box-shadow:0 0 0 3px rgba(61,107,79,0.1);}
  .pr-search-icon{font-size:16px;color:var(--muted);}
  .pr-search-input{
    flex:1;border:none;background:transparent;outline:none;
    font-family:'Outfit',sans-serif;font-size:14px;color:var(--text);
  }
  .pr-search-input::placeholder{color:var(--dim);}
  .pr-sort-select{
    padding:10px 16px;border:1.5px solid var(--border);border-radius:50px;
    background:var(--ivory);color:var(--text2);font-family:'Outfit',sans-serif;
    font-size:13px;font-weight:500;outline:none;cursor:pointer;
    transition:border-color 0.2s;
  }
  .pr-sort-select:focus{border-color:var(--sage);}
  .pr-count{font-size:12px;color:var(--muted);white-space:nowrap;font-weight:500;}

  /* ── Main layout ── */
  .pr-main{max-width:1200px;margin:0 auto;padding:40px 20px 80px;display:flex;gap:32px;align-items:flex-start;}

  /* ── Sidebar ── */
  .pr-sidebar{
    width:260px;flex-shrink:0;position:sticky;top:72px;
  }
  .pr-sidebar-card{
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);
  }
  .pr-sidebar-head{
    padding:18px 20px 14px;border-bottom:1px solid var(--border);
  }
  .pr-sidebar-eye{
    display:flex;align-items:center;gap:8px;
    font-size:0.65rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
    color:var(--sage);margin-bottom:4px;
  }
  .pr-sidebar-eye::before{content:'';width:20px;height:2px;background:var(--sage);border-radius:2px;}
  .pr-sidebar-title{
    font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--text);
  }

  /* Category tabs */
  .pr-cat-list{padding:10px 12px;}
  .pr-cat-btn{
    width:100%;display:flex;align-items:center;gap:10px;
    padding:10px 12px;border-radius:12px;border:none;background:transparent;
    cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;
    color:var(--text2);transition:all 0.2s;text-align:left;margin-bottom:2px;
  }
  .pr-cat-btn:hover{background:var(--sage-xs);color:var(--sage);}
  .pr-cat-btn.active{background:var(--sage-xs);color:var(--sage-d);font-weight:700;}
  .pr-cat-btn.active .pr-cat-bar{width:3px;background:var(--sage);border-radius:2px;height:100%;opacity:1;}
  .pr-cat-icon{font-size:18px;width:28px;text-align:center;}
  .pr-cat-name{flex:1;}
  .pr-cat-count{
    font-size:10px;background:var(--sage-xs);color:var(--sage);
    padding:2px 7px;border-radius:20px;font-weight:600;
  }

  /* Subcategory */
  .pr-sub-list{padding:6px 12px 12px 52px;}
  .pr-sub-btn{
    display:flex;align-items:center;gap:7px;
    width:100%;padding:7px 10px;border-radius:8px;border:none;background:transparent;
    cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;
    color:var(--muted);transition:all 0.18s;text-align:left;margin-bottom:1px;
  }
  .pr-sub-btn:hover{background:var(--sage-xs);color:var(--sage);}
  .pr-sub-btn.active{color:var(--sage);font-weight:600;}
  .pr-sub-icon{font-size:13px;}

  /* Price filter */
  .pr-price-section{padding:16px 20px;border-top:1px solid var(--border);}
  .pr-price-title{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
  .pr-price-row{display:flex;gap:8px;}
  .pr-price-input{
    flex:1;padding:8px 12px;border:1.5px solid var(--border);border-radius:10px;
    background:var(--ivory);font-family:'Outfit',sans-serif;font-size:12px;
    color:var(--text);outline:none;transition:border-color 0.2s;
  }
  .pr-price-input:focus{border-color:var(--sage);}
  .pr-price-apply{
    padding:8px 16px;border-radius:10px;border:none;
    background:var(--sage);color:#fff;font-family:'Outfit',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;transition:background 0.2s;
  }
  .pr-price-apply:hover{background:var(--sage-d);}

  /* Rating filter */
  .pr-rating-section{padding:0 20px 16px;border-top:1px solid var(--border);}
  .pr-rating-title{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin:14px 0 10px;}
  .pr-rating-row{display:flex;flex-wrap:wrap;gap:6px;}
  .pr-rating-chip{
    padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);
    background:transparent;cursor:pointer;font-family:'Outfit',sans-serif;
    font-size:12px;color:var(--muted);transition:all 0.18s;
  }
  .pr-rating-chip.active,.pr-rating-chip:hover{
    border-color:var(--gold);background:var(--gold-xs);color:var(--gold);
  }

  /* ── Products grid ── */
  .pr-content{flex:1;min-width:0;}
  .pr-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
  }

  /* ── Product card ── */
  .pr-card{
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius);overflow:hidden;
    transition:transform 0.35s cubic-bezier(.34,1.56,.64,1),
               box-shadow 0.35s ease,border-color 0.3s;
    cursor:pointer;
  }
  .pr-card:hover{
    transform:translateY(-10px);
    box-shadow:0 20px 50px rgba(30,50,35,0.14);
    border-color:rgba(61,107,79,0.3);
  }
  .pr-card-img-wrap{
    position:relative;overflow:hidden;
    height:200px;background:var(--bg2);
  }
  .pr-card-img{
    width:100%;height:100%;object-fit:cover;
    transition:transform 0.5s ease;
  }
  .pr-card:hover .pr-card-img{transform:scale(1.08);}
  .pr-card-badge{
    position:absolute;top:12px;left:12px;
    padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;
    letter-spacing:0.5px;font-family:'Outfit',sans-serif;
  }
  .pr-card-wish{
    position:absolute;top:10px;right:10px;
    width:34px;height:34px;border-radius:50%;border:none;
    background:rgba(255,255,255,0.9);cursor:pointer;font-size:16px;
    display:flex;align-items:center;justify-content:center;
    transition:all 0.2s;backdrop-filter:blur(4px);
  }
  .pr-card-wish:hover{background:#fff;transform:scale(1.15);}
  .pr-card-body{padding:16px 18px 18px;}
  .pr-card-cat{
    font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--muted);margin-bottom:6px;display:flex;align-items:center;gap:5px;
  }
  .pr-card-name{
    font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;
    color:var(--text);margin-bottom:8px;line-height:1.25;
  }
  .pr-card-stars{display:flex;align-items:center;gap:5px;margin-bottom:10px;}
  .pr-stars-row{display:flex;gap:1px;}
  .pr-star{font-size:12px;}
  .pr-reviews{font-size:11px;color:var(--muted);}
  .pr-card-price-row{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
  .pr-price{
    font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--sage-d);
  }
  .pr-old-price{
    font-size:13px;color:var(--dim);text-decoration:line-through;
    font-family:'Outfit',sans-serif;
  }
  .pr-discount{
    font-size:11px;font-weight:700;color:#3ecf8e;
    background:rgba(62,207,142,0.1);padding:2px 7px;border-radius:10px;
  }
  .pr-card-btn{
    width:100%;padding:12px;border-radius:50px;border:none;
    background:var(--sage);color:#fff;
    font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.25s;letter-spacing:0.3px;
  }
  .pr-card-btn:hover{background:var(--sage-d);transform:translateY(-1px);box-shadow:0 6px 20px rgba(61,107,79,0.3);}
  .pr-card-btn.added{background:#3ecf8e;transform:scale(1.02);}

  /* ── Empty state ── */
  .pr-empty{
    text-align:center;padding:80px 20px;
    grid-column:1/-1;
  }
  .pr-empty-icon{font-size:60px;margin-bottom:16px;display:block;animation:floatY 3s ease-in-out infinite;}
  .pr-empty-title{
    font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;
    color:var(--text);margin-bottom:8px;
  }
  .pr-empty-sub{font-size:14px;color:var(--muted);}

  /* ── Section title (above grid) ── */
  .pr-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap;}
  .pr-section-eye{
    display:flex;align-items:center;gap:8px;
    font-size:0.68rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;
    color:var(--sage);margin-bottom:4px;
  }
  .pr-section-eye::before{content:'';width:24px;height:2px;background:var(--sage);border-radius:2px;}
  .pr-section-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--text);line-height:1.1;}

  /* ── Mobile toggle ── */
  .pr-filter-toggle{
    display:none;padding:10px 18px;border-radius:50px;
    border:1.5px solid var(--border);background:var(--surface);
    font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
    color:var(--sage);cursor:pointer;gap:6px;align-items:center;
  }

  /* ── Toast ── */
  .pr-toast{
    position:fixed;bottom:28px;left:50%;
    transform:translateX(-50%) translateY(100px);
    background:var(--text);border-radius:50px;
    padding:12px 24px;color:#fff;font-size:13px;font-weight:500;
    box-shadow:var(--shadow-lg);z-index:9999;
    transition:transform 0.3s ease;white-space:nowrap;
    font-family:'Outfit',sans-serif;
  }
  .pr-toast.show{transform:translateX(-50%) translateY(0);}

  /* ── Skeleton loader ── */
  .pr-skeleton{
    background:linear-gradient(90deg,var(--bg2) 25%,var(--bg) 50%,var(--bg2) 75%);
    background-size:200% auto;animation:shimmer 1.5s linear infinite;
    border-radius:var(--radius);height:300px;
  }

  /* ── Responsive ── */
  @media(max-width:1100px){
    .pr-grid{grid-template-columns:repeat(2,1fr);}
    .pr-sidebar{width:220px;}
  }
  @media(max-width:768px){
    .pr-main{flex-direction:column;padding:24px 12px 60px;}
    .pr-sidebar{width:100%;position:static;}
    .pr-grid{grid-template-columns:repeat(2,1fr);gap:14px;}
    .pr-filter-toggle{display:flex;}
    .pr-sidebar.hidden{display:none;}
  }
  @media(max-width:480px){
    .pr-grid{grid-template-columns:1fr;}
    .pr-hero{padding:48px 16px 40px;}
    .pr-search-inner{gap:8px;}
  }
`;

// ─── Stars Component ──────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="pr-stars-row">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className="pr-star" style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>⭐</span>
      ))}
    </div>
  );
}

// ─── Discount calc ────────────────────────────────────────────
function getDiscount(price, oldPrice) {
  if (!oldPrice) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

// ─── Main Component ───────────────────────────────────────────
export default function Product() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSub,      setActiveSub]      = useState(null);
  const [search,         setSearch]         = useState("");
  const [sort,           setSort]           = useState("default");
  const [wishlist,       setWishlist]       = useState([]);
  const [added,          setAdded]          = useState({});
  const [toast,          setToast]          = useState("");
  const [showToast,      setShowToast]      = useState(false);
  const [minPrice,       setMinPrice]       = useState("");
  const [maxPrice,       setMaxPrice]       = useState("");
  const [priceFilter,    setPriceFilter]    = useState({ min: 0, max: Infinity });
  const [minRating,      setMinRating]      = useState(0);
  const [showFilter,     setShowFilter]     = useState(false);
  const [loading,        setLoading]        = useState(false);
  // API products — if your backend returns products, merge here
  const [apiProducts,    setApiProducts]    = useState([]);

  const navigate = useNavigate();
  const uid      = localStorage.getItem("id") || 0;

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeCategory, activeSub]);

  // Optional: fetch from your API
  useEffect(() => {
    axios.get("http://localhost/Petshop/getproducts.php")
      .then((res) => { if (Array.isArray(res.data)) setApiProducts(res.data); })
      .catch(() => {});
  }, []);

  const msg = (text) => {
    setToast(text); setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  // All products = mock + api
  const allProducts = [...MOCK_PRODUCTS, ...apiProducts];

  // Category count
  const catCount = (catId) =>
    catId === "all"
      ? allProducts.length
      : allProducts.filter((p) => p.category === catId).length;

  // Filter & sort
  const filtered = allProducts
    .filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (activeSub && p.sub !== activeSub) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price < priceFilter.min || p.price > priceFilter.max) return false;
      if (p.rating < minRating) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      if (sort === "popular")    return b.reviews - a.reviews;
      return 0;
    });

  const handleCategory = (catId) => {
    setActiveCategory(catId);
    setActiveSub(null);
    setSearch("");
  };

const handleAddCart = (product) => {
  if (!localStorage.getItem("islogin")) { navigate("/login"); return; }
  const uid = localStorage.getItem("id");

  setAdded(prev => ({ ...prev, [product.id]: true }));
  setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1800);
  msg(`✅ "${product.name}" added to cart!`);

  const realDbIds = [1,2,3,4,5,7,8,9,101,102,103,104,105,201,202,301,401,501,502,503,504,505,506,507,508,509,510];
  if (realDbIds.includes(Number(product.id))) {
    fetch(`http://localhost/Petshop/insert.php?uid=${uid}&pid=${product.id}`)
      .then(res => res.json())
      .catch(() => {});
  }
};

  const toggleWish = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      <style>{css}</style>
      <div className="pr-page">
        <Nav />

        {/* ── HERO ── */}
        <div className="pr-hero">
          <div className="pr-hero-orb pr-hero-orb1" />
          <div className="pr-hero-orb pr-hero-orb2" />
          <div className="pr-hero-inner">
            <div className="pr-label-tag">Premium Pet Store</div>
            <h1 className="pr-hero-title">
              Everything Your<br /><em>Pet Deserves</em>
            </h1>
            <p className="pr-hero-sub">Dogs · Cats · Birds · Fish — 200+ curated products</p>
            <div className="pr-hero-stats">
              {[
                { num: "200+", label: "Products" },
                { num: "4",    label: "Categories" },
                { num: "50K+", label: "Happy Pets" },
                { num: "4.8★", label: "Avg Rating" },
              ].map((s, i) => (
                <div className="pr-stat" key={i}>
                  <div className="pr-stat-num">{s.num}</div>
                  <div className="pr-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="pr-search-wrap">
          <div className="pr-search-inner">
            <div className="pr-search-box">
              <span className="pr-search-icon">🔍</span>
              <input
                className="pr-search-input"
                placeholder="Search products, brands…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <span
                  style={{ cursor:"pointer", color:"var(--muted)", fontSize:14 }}
                  onClick={() => setSearch("")}
                >✕</span>
              )}
            </div>
            <select
              className="pr-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pr-count">{filtered.length} products</span>
            <button
              className="pr-filter-toggle"
              onClick={() => setShowFilter((p) => !p)}
            >
              🎛️ Filters
            </button>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="pr-main">

          {/* ── SIDEBAR ── */}
          <aside className={`pr-sidebar reveal ${showFilter ? "" : "hidden-mobile"}`}
            style={{ display: showFilter || window.innerWidth > 768 ? "block" : "none" }}>
            <div className="pr-sidebar-card">
              <div className="pr-sidebar-head">
                <div className="pr-sidebar-eye">Browse</div>
                <div className="pr-sidebar-title">Categories</div>
              </div>
              <div className="pr-cat-list">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id}>
                    <button
                      className={`pr-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => handleCategory(cat.id)}
                    >
                      <span className="pr-cat-icon">{cat.icon}</span>
                      <span className="pr-cat-name">{cat.label}</span>
                      <span className="pr-cat-count">{catCount(cat.id)}</span>
                    </button>
                    {activeCategory === cat.id && cat.sub.length > 0 && (
                      <div className="pr-sub-list">
                        {cat.sub.map((s) => (
                          <button
                            key={s.id}
                            className={`pr-sub-btn ${activeSub === s.id ? "active" : ""}`}
                            onClick={() => setActiveSub(activeSub === s.id ? null : s.id)}
                          >
                            <span className="pr-sub-icon">{s.icon}</span>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Price filter */}
              <div className="pr-price-section">
                <div className="pr-price-title">Price Range (₹)</div>
                <div className="pr-price-row">
                  <input
                    className="pr-price-input" placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    className="pr-price-input" placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <button
                    className="pr-price-apply"
                    onClick={() => setPriceFilter({
                      min: minPrice ? parseInt(minPrice) : 0,
                      max: maxPrice ? parseInt(maxPrice) : Infinity,
                    })}
                  >Go</button>
                </div>
                {(priceFilter.min > 0 || priceFilter.max < Infinity) && (
                  <button
                    style={{ marginTop:8, fontSize:11, color:"var(--muted)", background:"none", border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}
                    onClick={() => { setPriceFilter({ min:0, max:Infinity }); setMinPrice(""); setMaxPrice(""); }}
                  >✕ Clear filter</button>
                )}
              </div>

              {/* Rating filter */}
              <div className="pr-rating-section">
                <div className="pr-rating-title">Min Rating</div>
                <div className="pr-rating-row">
                  {[0,3,4,4.5].map((r) => (
                    <button
                      key={r}
                      className={`pr-rating-chip ${minRating === r ? "active" : ""}`}
                      onClick={() => setMinRating(r)}
                    >
                      {r === 0 ? "All" : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── PRODUCTS CONTENT ── */}
          <div className="pr-content">
            <div className="pr-section-head reveal">
              <div>
                <div className="pr-section-eye">
                  {activeCat?.icon} {activeSub
                    ? activeCat?.sub.find((s) => s.id === activeSub)?.label
                    : activeCat?.label}
                </div>
                <div className="pr-section-title">
                  {activeSub
                    ? activeCat?.sub.find((s) => s.id === activeSub)?.label
                    : activeCategory === "all"
                      ? "All Pet Products"
                      : `${activeCat?.label} Products`}
                </div>
              </div>
              {activeSub && (
                <button
                  style={{
                    padding:"8px 16px", borderRadius:"50px", border:"1.5px solid var(--border)",
                    background:"transparent", cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                    fontSize:12, color:"var(--muted)", transition:"all 0.2s",
                  }}
                  onClick={() => setActiveSub(null)}
                >✕ Clear</button>
              )}
            </div>

            {/* Grid */}
            <div className="pr-grid">
              {filtered.length === 0 ? (
                <div className="pr-empty">
                  <span className="pr-empty-icon">🐾</span>
                  <div className="pr-empty-title">No products found</div>
                  <div className="pr-empty-sub">Try a different category or search term</div>
                </div>
              ) : (
                filtered.map((product, i) => {
                  const disc    = getDiscount(product.price, product.oldPrice);
                  const wished  = wishlist.includes(product.id);
                  const isAdded = added[product.id];
                  const subCat  = CATEGORIES
                    .find((c) => c.id === product.category)
                    ?.sub.find((s) => s.id === product.sub);

                  return (
                    <div
                      key={product.id}
                      className="pr-card reveal"
                      style={{ animationDelay: `${(i % 6) * 0.06}s` }}
                    >
                      {/* Image */}
                      <div className="pr-card-img-wrap">
                        <img
                          className="pr-card-img"
                          src={product.img || product.image
                            ? (product.img || `http://localhost/Petshop/images/${product.image}`)
                            : "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80"
                          }
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80"; }}
                        />
                        {product.badge && (
                          <span
                            className="pr-card-badge"
                            style={{
                              background: BADGE_STYLES[product.badge]?.bg || "#3d6b4f",
                              color: BADGE_STYLES[product.badge]?.text || "#fff",
                            }}
                          >{product.badge}</span>
                        )}
                        <button
                          className="pr-card-wish"
                          onClick={(e) => { e.stopPropagation(); toggleWish(product.id); }}
                          title={wished ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {wished ? "❤️" : "🤍"}
                        </button>
                      </div>

                      {/* Body */}
                      <div className="pr-card-body">
                        <div className="pr-card-cat">
                          {subCat?.icon} {subCat?.label || product.category}
                        </div>
                        <div className="pr-card-name">{product.name || product.pname}</div>
                        <div className="pr-card-stars">
                          <Stars rating={product.rating || 4} />
                          <span className="pr-reviews">({product.reviews || 0})</span>
                        </div>
                        <div className="pr-card-price-row">
                          <span className="pr-price">₹{(product.price).toLocaleString("en-IN")}</span>
                          {product.oldPrice && (
                            <span className="pr-old-price">₹{product.oldPrice.toLocaleString("en-IN")}</span>
                          )}
                          {disc && <span className="pr-discount">{disc}% off</span>}
                        </div>
                        <button
                          className={`pr-card-btn ${isAdded ? "added" : ""}`}
                          onClick={() => handleAddCart(product)}
                        >
                          {isAdded ? "✅ Added!" : "🛒 Add to Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className={`pr-toast ${showToast ? "show" : ""}`}>{toast}</div>
      </div>
    </>
  );
}