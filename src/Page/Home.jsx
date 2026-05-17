import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "./Nev";

const API = "http://localhost/Petshop";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const PET_DATA = {
  dogs: {
    label: "Dogs", emoji: "🐕",
    hero: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85",
    tagline: "Man's Best Friend",
    pets: [
      { name:"Affenpinscher",    price:"₹10,000",   badge:"POPULAR",     desc:"Curious, lively & loyal",     img:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80" },
      { name:"Alaskan Husky",    price:"₹20,000",   badge:"NEW ARRIVAL", desc:"Energetic & friendly",        img:"https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500&q=80" },
      { name:"Golden Retriever", price:"₹35,000",   badge:null,          desc:"Loyal family companion",      img:"https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500&q=80" },
      { name:"Airedale Terrier", price:"₹4,00,000", badge:"PREMIUM",     desc:"King of terriers",            img:"https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80" },
      { name:"Labrador",         price:"₹18,000",   badge:"POPULAR",     desc:"Playful & gentle",            img:"https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&q=80" },
      { name:"German Shepherd",  price:"₹25,000",   badge:null,          desc:"Brave & intelligent",         img:"https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&q=80" },
      { name:"Beagle",           price:"₹12,000",   badge:"NEW ARRIVAL", desc:"Friendly & curious",          img:"https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&q=80" },
      { name:"Shih Tzu",         price:"₹22,000",   badge:"PREMIUM",     desc:"Elegant & affectionate",      img:"https://images.unsplash.com/photo-1617895153857-82fe79b5a935?w=500&q=80" },
    ],
    services: [
      { icon:"✂️",  title:"Dog Grooming Studio",     desc:"Professional grooming, spa bath, nail clipping & breed-specific styling. Your dog will look show-ready every visit." },
      { icon:"🦮",  title:"Obedience Training",       desc:"Certified trainers using positive reinforcement. Puppy basics to advanced commands — we shape good habits from day one." },
      { icon:"🏃",  title:"Dog Walking & Exercise",   desc:"Daily structured walks by trained handlers. Keeps your dog physically fit, mentally stimulated and socially active." },
      { icon:"🏥",  title:"Canine Health Checkup",    desc:"Comprehensive vet examination, vaccination schedule, dental care and parasite prevention — all under one roof." },
      { icon:"🛁",  title:"Luxury Dog Spa",           desc:"Deep conditioning, aromatherapy bath, teeth brushing, ear cleaning and paw massage. A full wellness experience." },
      { icon:"🏨",  title:"Dog Boarding",             desc:"Air-conditioned suites, 24/7 CCTV, daily exercise routines and home-cooked meals while you travel." },
    ],
    products: [
      { sec:"🍖 Food & Nutrition",      items:[
        { name:"Premium Dry Dog Food",    price:"₹899",   img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80" },
        { name:"Wet Dog Food Pouches",    price:"₹199",   img:"https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80" },
        { name:"Puppy Starter Kibble",    price:"₹749",   img:"https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80" },
        { name:"Freeze-Dried Treats",     price:"₹399",   img:"https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=400&q=80" },
      ]},
      { sec:"💊 Pharmacy & Healthcare", items:[
        { name:"Deworming Tablets",       price:"₹180",   img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
        { name:"Flea & Tick Spot-On",     price:"₹550",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
        { name:"Multivitamin Chews",      price:"₹650",   img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
        { name:"Probiotic Supplement",    price:"₹490",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
      ]},
      { sec:"🛁 Body Wash & Grooming",  items:[
        { name:"Anti-Tick Dog Shampoo",   price:"₹399",   img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80" },
        { name:"Deep Conditioner",        price:"₹349",   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
        { name:"Waterless Dry Shampoo",   price:"₹299",   img:"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80" },
        { name:"Paw Protection Balm",     price:"₹249",   img:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" },
      ]},
      { sec:"🧸 Toys & Games",          items:[
        { name:"Braided Chew Rope",       price:"₹199",   img:"https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=400&q=80" },
        { name:"Indestructible Ball Set", price:"₹349",   img:"https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&q=80" },
        { name:"Squeaky Plush Toy",       price:"₹129",   img:"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&q=80" },
        { name:"IQ Puzzle Feeder Bowl",   price:"₹699",   img:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" },
      ]},
      { sec:"🔧 Tools & Accessories",   items:[
        { name:"Slicker Grooming Brush",  price:"₹299",   img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80" },
        { name:"Stainless Nail Clipper",  price:"₹249",   img:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80" },
        { name:"Retractable Leash",       price:"₹449",   img:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" },
        { name:"Adjustable Harness",      price:"₹799",   img:"https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&q=80" },
      ]},
    ],
  },
  cats: {
    label: "Cats", emoji: "🐱",
    hero: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1400&q=85",
    tagline: "Graceful Companions",
    pets: [
      { name:"Persian Cat",       price:"₹15,000", badge:"POPULAR",     desc:"Elegant & affectionate",  img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80" },
      { name:"Maine Coon",        price:"₹25,000", badge:"PREMIUM",     desc:"Gentle giant of cats",    img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=500&q=80" },
      { name:"Siamese",           price:"₹12,000", badge:"NEW ARRIVAL", desc:"Vocal & social beauty",   img:"https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&q=80" },
      { name:"British Shorthair", price:"₹18,000", badge:null,          desc:"Calm & independent",      img:"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&q=80" },
      { name:"Scottish Fold",     price:"₹30,000", badge:"PREMIUM",     desc:"Adorably unique ears",    img:"https://images.unsplash.com/photo-1567270671170-f48dd4d6c42f?w=500&q=80" },
      { name:"Ragdoll",           price:"₹28,000", badge:"POPULAR",     desc:"Floppy & gentle",         img:"https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&q=80" },
      { name:"Bengal",            price:"₹40,000", badge:"NEW ARRIVAL", desc:"Wild patterned beauty",   img:"https://images.unsplash.com/photo-1586289883499-f11d28aaf52f?w=500&q=80" },
      { name:"Abyssinian",        price:"₹20,000", badge:null,          desc:"Athletic & playful",      img:"https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=500&q=80" },
    ],
    services: [
      { icon:"✂️", title:"Cat Grooming & Styling",  desc:"Breed-specific cuts, de-matting, bath, nail trim and ear cleaning. Zero stress grooming in a calm environment." },
      { icon:"🏥", title:"Feline Health Clinic",    desc:"Specialized cat vet consultations, vaccination packages, dental scaling and senior cat wellness check-ups." },
      { icon:"🛁", title:"Cat Spa & Massage",       desc:"Stress-relief massage, coat conditioning, paw treatment and calming aromatherapy — designed for feline comfort." },
      { icon:"🏨", title:"Cat Boarding",            desc:"Private suites with climbing structures, natural light and personalized feeding routines. No cages, ever." },
      { icon:"🎓", title:"Kitten Socialization",    desc:"Structured socialization sessions to ensure your kitten grows into a confident, friendly and well-adjusted adult." },
      { icon:"🔬", title:"Allergy & Skin Testing",  desc:"Comprehensive allergy testing, skin condition diagnosis and custom diet planning for sensitive cats." },
    ],
    products: [
      { sec:"🍖 Food & Nutrition",      items:[
        { name:"Premium Dry Cat Food",    price:"₹799",   img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" },
        { name:"Tuna Wet Food Pouches",   price:"₹149",   img:"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80" },
        { name:"Hairball Control Food",   price:"₹899",   img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80" },
        { name:"Kitten Starter Pack",     price:"₹550",   img:"https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&q=80" },
      ]},
      { sec:"💊 Pharmacy & Healthcare", items:[
        { name:"Anti-Hairball Paste",     price:"₹350",   img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
        { name:"Flea & Tick Collar",      price:"₹299",   img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" },
        { name:"Cat Multivitamin Drops",  price:"₹499",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
        { name:"Dental Hygiene Gel",      price:"₹280",   img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
      ]},
      { sec:"🛁 Body Wash & Grooming",  items:[
        { name:"Whitening Cat Shampoo",   price:"₹349",   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
        { name:"De-matting Spray",        price:"₹299",   img:"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80" },
        { name:"Hypoallergenic Wipes",    price:"₹199",   img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80" },
        { name:"Coat Gloss Spray",        price:"₹349",   img:"https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&q=80" },
      ]},
      { sec:"🧸 Toys & Games",          items:[
        { name:"Feather Wand Toy",        price:"₹149",   img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" },
        { name:"Laser Pointer",           price:"₹99",    img:"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80" },
        { name:"Catnip Mice Pack",        price:"₹129",   img:"https://images.unsplash.com/photo-1567270671170-f48dd4d6c42f?w=400&q=80" },
        { name:"Cardboard Cat Scratcher", price:"₹499",   img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80" },
      ]},
      { sec:"🔧 Tools & Accessories",   items:[
        { name:"Deshedding Furminator",   price:"₹349",   img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" },
        { name:"Self-Cleaning Litter Box",price:"₹1,499", img:"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80" },
        { name:"Soft Cat Carrier",        price:"₹999",   img:"https://images.unsplash.com/photo-1567270671170-f48dd4d6c42f?w=400&q=80" },
        { name:"Cosy Donut Cat Bed",      price:"₹699",   img:"https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80" },
      ]},
    ],
  },
  birds: {
    label: "Birds", emoji: "🦜",
    hero: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1400&q=85",
    tagline: "Songs of Joy",
    pets: [
      { name:"African Grey",  price:"₹35,000",   badge:"PREMIUM",     desc:"Smartest talking bird",  img:"https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=500&q=80" },
      { name:"Cockatiel",     price:"₹5,000",    badge:"POPULAR",     desc:"Friendly & melodious",   img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=500&q=80" },
      { name:"Budgerigar",    price:"₹2,500",    badge:null,          desc:"Colorful & cheerful",    img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80" },
      { name:"Lovebird",      price:"₹8,000",    badge:"NEW ARRIVAL", desc:"Sweet & affectionate",   img:"https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=500&q=80" },
      { name:"Macaw",         price:"₹1,20,000", badge:"PREMIUM",     desc:"Majestic & colorful",    img:"https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&q=80" },
      { name:"Conure",        price:"₹15,000",   badge:"POPULAR",     desc:"Playful little parrot",  img:"https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&q=80" },
      { name:"Finch",         price:"₹1,500",    badge:null,          desc:"Tiny & tuneful",         img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80" },
      { name:"Cockatoo",      price:"₹80,000",   badge:"PREMIUM",     desc:"Affectionate & loud",    img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=500&q=80" },
    ],
    services: [
      { icon:"🪮", title:"Bird Wing Clipping",       desc:"Safe, stress-free wing trimming by avian specialists to ensure your bird's safety without causing harm." },
      { icon:"🏥", title:"Avian Health Clinic",      desc:"Specialized bird vet consultations, beak and nail trimming, parasite control and nutritional counselling." },
      { icon:"🛁", title:"Bird Bath & Grooming",     desc:"Supervised bath sessions, feather conditioning and gentle beak polishing for a healthy, shiny bird." },
      { icon:"🎓", title:"Parrot Talk Training",     desc:"Expert speech training sessions for parrots. Personalized programs to teach your bird words, songs and tricks." },
      { icon:"🏨", title:"Bird Boarding",            desc:"Spacious cages, proper diet, fresh fruits daily and expert supervision while you're away from home." },
      { icon:"🔬", title:"DNA Sexing & Testing",     desc:"Accurate DNA-based sexing and disease panel testing for all bird species. Get verified health certificates." },
    ],
    products: [
      { sec:"🌾 Food & Nutrition",      items:[
        { name:"Premium Seed Mix",        price:"₹199",   img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
        { name:"Pellet Diet Food",        price:"₹349",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { name:"Egg Food Supplement",     price:"₹249",   img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },
        { name:"Mineral & Cuttlebone",    price:"₹99",    img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
      ]},
      { sec:"💊 Pharmacy & Healthcare", items:[
        { name:"Avian Vitamin Drops",     price:"₹249",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
        { name:"Mite & Lice Spray",       price:"₹299",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { name:"Calcium Supplement",      price:"₹199",   img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },
        { name:"Probiotic Bird Drops",    price:"₹349",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
      ]},
      { sec:"🛁 Grooming & Care",       items:[
        { name:"Bird Bath Tub",           price:"₹349",   img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
        { name:"Feather Conditioning Spray",price:"₹199", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { name:"Nail & Beak File Kit",    price:"₹149",   img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },
        { name:"Perch Cleaner Spray",     price:"₹129",   img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
      ]},
      { sec:"🧸 Toys & Games",          items:[
        { name:"Stainless Hanging Bell",  price:"₹199",   img:"https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80" },
        { name:"Bird Mirror Toy",         price:"₹149",   img:"https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80" },
        { name:"Rope Swing Perch",        price:"₹249",   img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
        { name:"Foraging Puzzle Box",     price:"₹399",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      ]},
      { sec:"🔧 Cages & Accessories",   items:[
        { name:"Large Flight Cage",       price:"₹2,499", img:"https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&q=80" },
        { name:"Natural Wood Perch Set",  price:"₹299",   img:"https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80" },
        { name:"Stainless Feeder Bowl",   price:"₹99",    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { name:"Portable Travel Carrier", price:"₹799",   img:"https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80" },
      ]},
    ],
  },
  fish: {
    label: "Fish", emoji: "🐠",
    hero: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=1400&q=85",
    tagline: "Aquatic Wonders",
    pets: [
      { name:"Arowana",    price:"₹50,000", badge:"PREMIUM",     desc:"The lucky dragon fish",   img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500&q=80" },
      { name:"Betta Fish", price:"₹500",    badge:"POPULAR",     desc:"Stunning & easy care",    img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=500&q=80" },
      { name:"Koi Fish",   price:"₹10,000", badge:null,          desc:"Graceful pond beauty",    img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80" },
      { name:"Clownfish",  price:"₹1,500",  badge:"NEW ARRIVAL", desc:"Nemo's real cousin",      img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80" },
      { name:"Discus",     price:"₹8,000",  badge:"PREMIUM",     desc:"King of the aquarium",    img:"https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=500&q=80" },
      { name:"Goldfish",   price:"₹200",    badge:"POPULAR",     desc:"Classic & cheerful",      img:"https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&q=80" },
      { name:"Oscar Fish", price:"₹2,000",  badge:null,          desc:"Bold & intelligent",      img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500&q=80" },
      { name:"Angelfish",  price:"₹3,000",  badge:"NEW ARRIVAL", desc:"Elegant & graceful",      img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=500&q=80" },
    ],
    services: [
      { icon:"🏊", title:"Aquarium Setup Service",  desc:"Complete tank setup — substrate, filtration, lighting, live plants and decoration — done by our aquascaping experts." },
      { icon:"🔬", title:"Water Quality Testing",   desc:"Professional water parameter analysis including pH, ammonia, nitrite and hardness. Free report and correction guide." },
      { icon:"🏥", title:"Fish Health Clinic",      desc:"Expert diagnosis of infections, parasites and deficiencies. Treatment plans and medication provided on-site." },
      { icon:"🌿", title:"Aquascaping Design",      desc:"Custom aquarium landscape design using live plants, hardscape stones and driftwood — from nano to large tanks." },
      { icon:"🚚", title:"Live Fish Delivery",      desc:"Safe, oxygen-packed home delivery of live fish with temperature-controlled packaging across India." },
      { icon:"🔧", title:"Equipment Maintenance",  desc:"Regular servicing of filters, heaters, lights and pumps. Keeps your aquarium running at peak performance." },
    ],
    products: [
      { sec:"🌿 Food & Nutrition",      items:[
        { name:"Colour-Enhancing Flakes", price:"₹149",   img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80" },
        { name:"Sinking Pellet Food",     price:"₹199",   img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&q=80" },
        { name:"Freeze-Dried Bloodworms", price:"₹249",   img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80" },
        { name:"Spirulina Wafers",        price:"₹179",   img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
      ]},
      { sec:"💊 Pharmacy & Healthcare", items:[
        { name:"Anti-Fungal Treatment",   price:"₹199",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
        { name:"Aquarium Salt 1kg",       price:"₹149",   img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80" },
        { name:"Bio Water Conditioner",   price:"₹249",   img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&q=80" },
        { name:"Ich-X Treatment",         price:"₹299",   img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80" },
      ]},
      { sec:"🏊 Aquarium & Decor",      items:[
        { name:"20L Planted Tank",        price:"₹1,999", img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80" },
        { name:"Live Aquatic Plants",     price:"₹299",   img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80" },
        { name:"Natural River Gravel",    price:"₹199",   img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
        { name:"Resin Castle Ornament",   price:"₹349",   img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&q=80" },
      ]},
      { sec:"🧸 Toys & Enrichment",     items:[
        { name:"Floating Mirror Ball",    price:"₹99",    img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80" },
        { name:"Air Stone Bubble Toy",    price:"₹149",   img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80" },
        { name:"Natural Driftwood Log",   price:"₹399",   img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
        { name:"PVC Tunnel Hideout",      price:"₹249",   img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&q=80" },
      ]},
      { sec:"🔧 Equipment & Tools",     items:[
        { name:"Canister Filter System",  price:"₹1,499", img:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80" },
        { name:"Silent Air Pump",         price:"₹599",   img:"https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&q=80" },
        { name:"Titanium Aqua Heater",    price:"₹799",   img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80" },
        { name:"Fine Mesh Fish Net",      price:"₹99",    img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
      ]},
    ],
  },
};

// Top Picks Real Product Photos (real Unsplash images)
const TOP_PICKS = [
  {
    name: "Royal Canin Dog Food",
    category: "Dog Nutrition",
    price: "₹1,299",
    rating: "4.9",
    reviews: "2.4k",
    badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=600&q=85",
  },
  {
    name: "Cat Grooming Brush",
    category: "Grooming Tools",
    price: "₹499",
    rating: "4.8",
    reviews: "1.8k",
    badge: "TOP RATED",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=85",
  },
  {
    name: "Adjustable Pet Harness",
    category: "Dog Accessories",
    price: "₹799",
    rating: "4.7",
    reviews: "3.1k",
    badge: "HOT",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85",
  },
  {
    name: "Bird Seed Premium Mix",
    category: "Bird Nutrition",
    price: "₹349",
    rating: "4.8",
    reviews: "987",
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=85",
  },
];

const BADGE_CFG = {
  POPULAR:      { bg:"#d4a843", text:"#fff" },
  "NEW ARRIVAL":{ bg:"#3ecf8e", text:"#fff" },
  PREMIUM:      { bg:"#7c5cfc", text:"#fff" },
};

const HOME_SERVICES = [
  {icon:"🏥",title:"Pet Health Clinic",     text:"In-house vet consultations, vaccination drives, dental care and health check-ups by certified doctors."},
  {icon:"🏨",title:"Pet Hotel & Boarding",  text:"Safe, comfortable boarding with 24/7 supervision, proper nutrition and daily exercise routines."},
  {icon:"🚨",title:"Emergency Care",        text:"Round-the-clock emergency support. If your pet needs urgent attention, our vet team is just a call away."},
  {icon:"✂️",title:"Grooming Studio",      text:"Professional grooming, spa baths, nail trimming and breed-specific styling for all pets."},
  {icon:"🎓",title:"Pet Training",          text:"Expert trainers using positive reinforcement — from puppy basics to advanced obedience and tricks."},
  {icon:"🛒",title:"Pet Accessories",       text:"Premium food, toys, beds, leashes and grooming kits from top brands — all under one roof."},
];

/* ══════════════════════════════════════════════════════════
   STYLES — Luxury Sage & Ivory Theme
══════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:        #f4f1eb;
    --bg2:       #ede8de;
    --surface:   #ffffff;
    --card:      #faf8f4;
    --sage:      #3d6b4f;
    --sage-d:    #2a4e39;
    --sage-l:    #5a9470;
    --sage-xs:   rgba(61,107,79,0.09);
    --sage-sm:   rgba(61,107,79,0.18);
    --gold:      #b8922a;
    --gold-l:    #d4ac48;
    --gold-xs:   rgba(184,146,42,0.12);
    --border:    rgba(61,107,79,0.13);
    --border2:   rgba(184,146,42,0.18);
    --text:      #1c2b22;
    --text2:     #3a4a3f;
    --muted:     #7a907f;
    --dim:       #aab8ac;
    --ivory:     #fdf9f2;
    --white:     #ffffff;
    --red:       #e05252;
    --radius:    20px;
    --shadow:    0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
  }

  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--sage); border-radius:10px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideL   { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:none} }
  @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes floatPill{ 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
  @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0.25} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes shimmerL { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  @keyframes leafSpin { 0%,100%{transform:rotate(-8deg) scale(1)} 50%{transform:rotate(8deg) scale(1.05)} }

  .reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-l { opacity:0; transform:translateX(-24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal-l.visible { opacity:1; transform:none; }

  /* ═══ HERO ═══ */
  .hero {
    min-height:100vh; position:relative;
    display:flex; align-items:center; overflow:hidden;
    background:linear-gradient(160deg, #1e3a28 0%, #2a5a3c 35%, #1a4030 65%, #0f2a1c 100%);
  }
  .hero-noise {
    position:absolute; inset:0; pointer-events:none; opacity:0.04;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
  .hero-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(70px); }
  .hero-orb-1 { width:700px;height:700px; background:radial-gradient(circle,rgba(90,148,112,0.35),transparent 65%); top:-200px;right:-150px; animation:orbDrift 9s ease-in-out infinite; }
  .hero-orb-2 { width:500px;height:500px; background:radial-gradient(circle,rgba(184,146,42,0.2),transparent 65%); bottom:-100px;left:-100px; animation:orbDrift 11s ease-in-out infinite reverse; }
  .hero-orb-3 { width:350px;height:350px; background:radial-gradient(circle,rgba(61,107,79,0.4),transparent 65%); top:50%;left:38%; animation:orbDrift 13s ease-in-out infinite 2s; }

  .hero-content {
    position:relative; z-index:2; width:100%; max-width:1360px;
    margin:0 auto; padding:140px 64px 90px;
    display:grid; grid-template-columns:1.1fr 0.9fr; gap:80px; align-items:center;
  }
  .hero-chip {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.2);
    border-radius:50px; padding:7px 20px;
    font-size:0.7rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase;
    color:rgba(255,255,255,0.8); margin-bottom:30px; animation:fadeUp 0.6s ease both;
    backdrop-filter:blur(8px);
  }
  .hero-dot { width:7px;height:7px; background:#5a9470; border-radius:50%; animation:blink 1.4s infinite; box-shadow:0 0 8px #5a9470; }

  .hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(3.5rem,6vw,6.5rem); line-height:0.95; font-weight:700;
    color:#ffffff; margin-bottom:30px; animation:fadeUp 0.6s 0.1s ease both;
    letter-spacing:-0.01em;
  }
  .hero-title em {
    font-style:italic; color:var(--gold-l);
    background:linear-gradient(135deg,#d4ac48,#f0cc70,#b8922a);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .hero-title span.line-accent {
    display:block; position:relative; width:fit-content;
  }
  .hero-title span.line-accent::after {
    content:''; position:absolute; bottom:-4px; left:0; right:0;
    height:2px; background:linear-gradient(90deg,var(--gold-l),transparent); border-radius:2px;
  }

  .hero-sub {
    font-size:1.05rem; color:rgba(255,255,255,0.5); line-height:1.9;
    max-width:500px; margin-bottom:46px; font-weight:300; animation:fadeUp 0.6s 0.2s ease both;
  }
  .hero-btns { display:flex; gap:14px; animation:fadeUp 0.6s 0.3s ease both; flex-wrap:wrap; }

  .btn {
    padding:14px 32px; border-radius:50px;
    font-family:'Outfit',sans-serif; font-size:0.9rem; font-weight:600;
    cursor:pointer; text-decoration:none; transition:all 0.3s; border:none;
    display:inline-flex; align-items:center; gap:9px; letter-spacing:0.01em;
  }
  .btn-sage { background:var(--sage-l); color:#fff; box-shadow:0 10px 30px rgba(61,107,79,0.4); }
  .btn-sage:hover { background:var(--sage); transform:translateY(-3px); box-shadow:0 16px 40px rgba(61,107,79,0.5); color:#fff; text-decoration:none; }
  .btn-glass { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.85); border:1.5px solid rgba(255,255,255,0.2) !important; backdrop-filter:blur(10px); }
  .btn-glass:hover { border-color:rgba(255,255,255,0.4) !important; background:rgba(255,255,255,0.15); text-decoration:none; color:#fff; }
  .btn-gold { background:var(--gold); color:#fff; box-shadow:0 10px 30px rgba(184,146,42,0.35); }
  .btn-gold:hover { background:#9a7820; transform:translateY(-3px); color:#fff; text-decoration:none; box-shadow:0 16px 40px rgba(184,146,42,0.45); }
  .btn-outline-sage { background:transparent; color:var(--sage); border:1.5px solid var(--sage) !important; }
  .btn-outline-sage:hover { background:var(--sage); color:#fff; text-decoration:none; }
  .btn-white { background:#fff; color:var(--sage-d); box-shadow:0 8px 24px rgba(0,0,0,0.12); }
  .btn-white:hover { transform:translateY(-3px); color:var(--sage-d); text-decoration:none; box-shadow:0 14px 36px rgba(0,0,0,0.18); }
  .btn-outline-w { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.4) !important; }
  .btn-outline-w:hover { border-color:#fff !important; background:rgba(255,255,255,0.1); text-decoration:none; color:#fff; }

  .hero-stats {
    display:flex; gap:44px; margin-top:52px;
    padding-top:36px; border-top:1px solid rgba(255,255,255,0.1);
    animation:fadeUp 0.6s 0.4s ease both;
  }
  .hero-stat-num { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; color:var(--gold-l); }
  .hero-stat-lbl { font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.12em; margin-top:3px; }

  /* ── HERO VISUAL ── */
  .hero-visual { position:relative; display:flex; justify-content:center; animation:slideL 0.9s 0.25s ease both; }
  .hero-card {
    width:360px; height:460px;
    border-radius:36px; overflow:hidden; position:relative;
    box-shadow:0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
  }
  .hero-card img { width:100%;height:100%;object-fit:cover;display:block; }
  .hero-card::before { content:''; position:absolute;inset:0; background:linear-gradient(to top,rgba(10,30,15,0.85) 0%,transparent 55%); z-index:1; }
  .hero-card-info { position:absolute; bottom:0; left:0; right:0; padding:28px; z-index:2; }
  .hero-card-tag { display:inline-block; background:var(--gold); color:#fff; padding:4px 14px; border-radius:20px; font-size:0.67rem; font-weight:700; letter-spacing:0.07em; margin-bottom:9px; }
  .hero-card-name { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; color:#fff; line-height:1.1; }
  .hero-card-price { color:rgba(255,255,255,0.5); font-size:0.85rem; margin-top:5px; }
  .hero-card-live { position:absolute; top:20px; right:20px; z-index:2; display:flex; align-items:center; gap:7px; background:rgba(255,255,255,0.12); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.15); border-radius:20px; padding:6px 14px; font-size:0.72rem; color:#fff; font-weight:600; }
  .live-dot { width:7px;height:7px;background:#3ecf8e;border-radius:50%;animation:blink 1.2s infinite; }

  .float-pill {
    position:absolute; background:rgba(255,255,255,0.95);
    backdrop-filter:blur(14px); border-radius:18px;
    padding:14px 18px; box-shadow:0 20px 50px rgba(0,0,0,0.18);
    border:1px solid rgba(255,255,255,0.5);
  }
  .float-pill:nth-child(2) { top:-14px;right:-28px; animation:floatPill 4s ease-in-out infinite; }
  .float-pill:nth-child(3) { bottom:90px;left:-36px; animation:floatPill 4.5s ease-in-out infinite -2.2s; }
  .fp-icon { font-size:1.5rem; }
  .fp-label { font-size:0.65rem; color:#7a907f; margin-top:2px; font-weight:500; }
  .fp-val { font-size:0.9rem; font-weight:700; color:#1c2b22; }

  /* ═══ MARQUEE TRUST BAR ═══ */
  .trust-bar { background:var(--sage-d); padding:0; overflow:hidden; border-top:2px solid var(--gold); border-bottom:2px solid var(--gold); }
  .trust-track { display:flex; gap:0; animation:marquee 22s linear infinite; width:max-content; }
  .trust-item { display:flex; align-items:center; gap:10px; padding:16px 40px; white-space:nowrap; color:rgba(255,255,255,0.75); font-size:0.82rem; font-weight:500; border-right:1px solid rgba(255,255,255,0.12); }
  .trust-item-icon { font-size:1.1rem; }
  .trust-sep { color:var(--gold-l); font-size:1.2rem; }

  /* ═══ LAYOUT ═══ */
  .wrap { max-width:1360px; margin:0 auto; padding:0 64px; }
  .section { padding:96px 0; }
  .label-tag { font-size:0.7rem; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--sage); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .label-tag::before { content:''; width:24px; height:2px; background:var(--sage); border-radius:2px; }
  .h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,3.5vw,3rem); font-weight:700; line-height:1.1; color:var(--text); }
  .section-hd { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:56px; gap:16px; flex-wrap:wrap; }

  /* ═══ NAV TABS ═══ */
  .tab-nav { background:var(--surface); border-bottom:1px solid var(--border); box-shadow:0 2px 12px rgba(30,50,35,0.05); }
  .tab-nav-inner { max-width:1360px; margin:0 auto; padding:0 64px; display:flex; overflow-x:auto; }
  .tab-btn {
    padding:20px 34px; font-size:0.88rem; font-weight:600;
    color:var(--muted); border:none; background:none; cursor:pointer;
    border-bottom:3px solid transparent; transition:all 0.25s; white-space:nowrap;
    font-family:'Outfit',sans-serif; display:flex; align-items:center; gap:8px;
  }
  .tab-btn:hover { color:var(--sage); }
  .tab-btn.active { color:var(--sage); border-bottom-color:var(--sage); }

  /* ═══ PET HERO BANNER ═══ */
  .pet-hero { position:relative; height:360px; overflow:hidden; }
  .pet-hero img { width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.4) saturate(0.8); }
  .pet-hero-ov { position:absolute;inset:0; background:linear-gradient(to right,rgba(15,42,28,0.92) 40%,rgba(15,42,28,0.3)); }
  .pet-hero-text { position:absolute;inset:0;display:flex;align-items:center; }
  .pet-hero-emoji { font-size:4.5rem; margin-bottom:14px; }
  .pet-hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,5vw,4rem); font-weight:700; color:#fff; line-height:1; margin-bottom:10px; }
  .pet-hero-sub { color:rgba(255,255,255,0.55); font-size:1rem; }

  /* ═══ SUB TABS ═══ */
  .sub-tabs { background:var(--card); border-bottom:1px solid var(--border); }
  .sub-tabs-inner { max-width:1360px; margin:0 auto; padding:0 64px; display:flex; overflow-x:auto; }
  .sub-btn {
    padding:16px 26px; font-size:0.83rem; font-weight:600;
    color:var(--muted); border:none; background:none; cursor:pointer;
    border-bottom:2px solid transparent; transition:all 0.22s; white-space:nowrap;
    font-family:'Outfit',sans-serif;
  }
  .sub-btn:hover { color:var(--sage); }
  .sub-btn.active { color:var(--sage); border-bottom-color:var(--sage); }

  /* ═══ PET CARDS ═══ */
  .pets-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
  .pet-card {
    background:var(--surface); border-radius:var(--radius);
    overflow:hidden; border:1px solid var(--border);
    transition:transform 0.34s cubic-bezier(.34,1.56,.64,1), box-shadow 0.34s ease;
    cursor:pointer;
  }
  .pet-card:hover { transform:translateY(-10px); box-shadow:0 24px 60px rgba(61,107,79,0.16); border-color:rgba(61,107,79,0.3); }
  .pet-img-wrap { height:210px; overflow:hidden; position:relative; }
  .pet-img-wrap img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease; }
  .pet-card:hover .pet-img-wrap img { transform:scale(1.07); }
  .badge { position:absolute; top:12px; left:12px; padding:5px 13px; border-radius:20px; font-size:0.65rem; font-weight:700; letter-spacing:0.08em; }
  .wish-btn { position:absolute; top:10px; right:10px; width:36px;height:36px; border-radius:50%; background:rgba(255,255,255,0.88); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1rem; transition:all 0.25s; backdrop-filter:blur(6px); box-shadow:0 4px 12px rgba(0,0,0,0.1); }
  .wish-btn:hover { background:var(--sage); transform:scale(1.18); }
  .pet-body { padding:18px 20px 22px; }
  .pet-breed { font-size:0.65rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:5px; }
  .pet-name  { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:var(--text); margin-bottom:5px; }
  .pet-desc  { font-size:0.78rem; color:var(--muted); margin-bottom:14px; }
  .pet-tags  { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
  .pet-tag   { background:var(--sage-xs); color:var(--sage); border:1px solid var(--border); border-radius:20px; padding:3px 10px; font-size:0.65rem; font-weight:600; }
  .pet-foot  { display:flex; align-items:center; justify-content:space-between; }
  .price     { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--sage-d); }
  .price small { font-family:'Outfit',sans-serif; font-size:0.68rem; color:var(--dim); font-weight:400; }
  .cart-btn  { width:42px;height:42px; background:var(--sage); border:none; border-radius:13px; color:#fff; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.28s; box-shadow:0 6px 18px rgba(61,107,79,0.3); }
  .cart-btn:hover { background:var(--sage-d); transform:scale(1.15) rotate(6deg); }
  .cart-btn.done { background:#3ecf8e; }

  .view-more { display:flex; justify-content:center; margin-top:46px; }

  /* ═══ PRODUCT CARDS ═══ */
  .prod-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  .prod-card {
    background:var(--surface); border-radius:18px;
    overflow:hidden; border:1px solid var(--border);
    transition:transform 0.28s ease, box-shadow 0.28s ease;
    cursor:pointer;
  }
  .prod-card:hover { transform:translateY(-6px); box-shadow:0 16px 44px rgba(61,107,79,0.13); border-color:rgba(61,107,79,0.25); }
  .prod-img { height:150px; overflow:hidden; }
  .prod-img img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s; }
  .prod-card:hover .prod-img img { transform:scale(1.07); }
  .prod-body { padding:14px 16px 18px; }
  .prod-name { font-size:0.85rem; font-weight:600; color:var(--text); margin-bottom:10px; line-height:1.4; }
  .prod-foot { display:flex; align-items:center; justify-content:space-between; }
  .prod-price { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:700; color:var(--sage-d); }
  .prod-add { background:var(--sage); color:#fff; border:none; padding:7px 16px; border-radius:50px; font-size:0.73rem; font-weight:700; cursor:pointer; transition:all 0.22s; font-family:'Outfit',sans-serif; }
  .prod-add:hover { background:var(--sage-d); transform:scale(1.05); }
  .prod-add.done { background:#3ecf8e; }
  .prod-sec-hd { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; padding-bottom:14px; border-bottom:1px solid var(--border); }
  .prod-sec-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:700; color:var(--text); }

  /* ═══ TOP PICKS SECTION ═══ */
  .top-picks-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
  .tp-card {
    background:var(--surface); border-radius:22px;
    overflow:hidden; border:1px solid var(--border);
    transition:all 0.34s cubic-bezier(.34,1.4,.64,1);
    cursor:pointer; position:relative;
  }
  .tp-card:hover { transform:translateY(-12px) scale(1.01); box-shadow:0 28px 70px rgba(61,107,79,0.18); border-color:rgba(61,107,79,0.3); }
  .tp-img-wrap { height:220px; overflow:hidden; position:relative; }
  .tp-img-wrap img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease; }
  .tp-card:hover .tp-img-wrap img { transform:scale(1.1); }
  .tp-badge { position:absolute; top:14px; left:14px; padding:5px 13px; border-radius:20px; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; }
  .tp-badge-bs { background:var(--sage); color:#fff; }
  .tp-badge-tr { background:var(--gold); color:#fff; }
  .tp-badge-hot { background:#e05252; color:#fff; }
  .tp-badge-new { background:#3ecf8e; color:#fff; }
  .tp-body { padding:18px 20px 22px; }
  .tp-category { font-size:0.65rem; color:var(--sage); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:5px; font-weight:600; }
  .tp-name { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:var(--text); margin-bottom:10px; }
  .tp-rating { display:flex; align-items:center; gap:6px; margin-bottom:14px; }
  .tp-stars { color:#d4a843; font-size:0.85rem; letter-spacing:1px; }
  .tp-rating-num { font-size:0.78rem; font-weight:700; color:var(--text); }
  .tp-reviews { font-size:0.73rem; color:var(--muted); }
  .tp-foot { display:flex; align-items:center; justify-content:space-between; }
  .tp-price { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--sage-d); }
  .tp-add { background:var(--sage); color:#fff; border:none; padding:9px 20px; border-radius:50px; font-size:0.78rem; font-weight:700; cursor:pointer; transition:all 0.25s; font-family:'Outfit',sans-serif; box-shadow:0 6px 18px rgba(61,107,79,0.28); }
  .tp-add:hover { background:var(--sage-d); transform:scale(1.06); }

  /* ═══ SERVICE CARDS ═══ */
  .svc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
  .svc-card {
    background:var(--surface); border-radius:var(--radius);
    padding:36px 28px; border:1px solid var(--border);
    transition:all 0.32s; position:relative; overflow:hidden;
  }
  .svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--sage-l),var(--gold)); opacity:0; transition:opacity 0.3s; }
  .svc-card:hover { transform:translateY(-8px); border-color:rgba(61,107,79,0.3); box-shadow:0 20px 56px rgba(61,107,79,0.1); }
  .svc-card:hover::before { opacity:1; }
  .svc-icon { font-size:2.2rem; width:62px;height:62px; background:var(--sage-xs); border:1px solid var(--border); border-radius:18px; display:flex; align-items:center; justify-content:center; margin-bottom:22px; transition:background 0.3s; }
  .svc-card:hover .svc-icon { background:var(--sage-sm); }
  .svc-title { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:var(--text); margin-bottom:12px; }
  .svc-desc  { font-size:0.84rem; color:var(--muted); line-height:1.8; }

  /* ═══ ABOUT ═══ */
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:90px; align-items:center; }
  .about-img-wrap { position:relative; }
  .about-img-main {
    width:100%; height:520px; border-radius:36px; overflow:hidden;
    box-shadow:0 40px 100px rgba(30,50,35,0.2);
    border:1px solid var(--border);
  }
  .about-img-main img { width:100%;height:100%;object-fit:cover;display:block; }
  .about-badge-box {
    position:absolute; bottom:-24px; right:-24px;
    background:var(--sage-d); border-radius:24px; padding:24px 28px;
    text-align:center; box-shadow:0 16px 50px rgba(30,50,35,0.3);
    border:2px solid var(--gold);
  }
  .about-yrs { font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:700; color:#fff; line-height:1; }
  .about-yrs-lbl { font-size:0.72rem; color:rgba(255,255,255,0.6); margin-top:3px; letter-spacing:0.1em; text-transform:uppercase; }
  .about-text { font-size:0.95rem; color:var(--muted); line-height:1.9; margin-bottom:32px; }
  .about-pts { display:flex; flex-direction:column; gap:14px; margin-bottom:36px; }
  .about-pt { display:flex; align-items:flex-start; gap:12px; }
  .chk { width:26px;height:26px; flex-shrink:0; background:var(--sage-xs); border:1px solid var(--sage-sm); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.82rem; color:var(--sage); }
  .pt-txt { font-size:0.9rem; color:var(--text2); line-height:1.7; }

  /* ═══ GALLERY ═══ */
  .gallery-bg { background:var(--sage-d); padding:100px 0; }
  .gallery-bg .label-tag { color:var(--gold-l); }
  .gallery-bg .label-tag::before { background:var(--gold-l); }
  .gallery-bg .h2 { color:#fff; }
  .gallery-grid { display:grid; grid-template-columns:repeat(5,1fr); grid-template-rows:200px 200px; gap:14px; margin-top:52px; }
  .gal-item { border-radius:18px; overflow:hidden; cursor:pointer; position:relative; }
  .gal-item img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease; }
  .gal-item:hover img { transform:scale(1.08); }
  .gal-item::after { content:'View'; position:absolute;inset:0;background:rgba(61,107,79,0.78);display:flex;align-items:center;justify-content:center;font-size:0.88rem;font-weight:700;color:#fff;letter-spacing:0.12em;opacity:0;transition:opacity 0.3s; }
  .gal-item:hover::after { opacity:1; }
  .gal-item:nth-child(1),.gal-item:nth-child(5) { grid-column:span 2; }

  /* ═══ TESTIMONIALS ═══ */
  .testi-bg { background:var(--bg2); padding:100px 0; }
  .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
  .testi-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:34px; transition:all 0.3s; position:relative; overflow:hidden; }
  .testi-card::after { content:'"'; position:absolute; top:-10px; right:20px; font-family:'Cormorant Garamond',serif; font-size:9rem; color:var(--sage-xs); line-height:1; pointer-events:none; }
  .testi-card:hover { border-color:rgba(61,107,79,0.28); transform:translateY(-5px); box-shadow:var(--shadow-lg); }
  .testi-stars { font-size:0.95rem; margin-bottom:14px; letter-spacing:2px; color:#d4a843; }
  .testi-text { font-size:0.9rem; color:var(--muted); line-height:1.9; margin-bottom:24px; font-style:italic; position:relative; z-index:1; }
  .testi-author { display:flex; align-items:center; gap:14px; }
  .testi-avatar { width:46px;height:46px; border-radius:50%; background:linear-gradient(135deg,var(--sage-l),var(--sage-d)); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:#fff; }
  .testi-name { font-weight:600; color:var(--text); font-size:0.9rem; }
  .testi-city { font-size:0.73rem; color:var(--muted); }

  /* ═══ CTA BANNER ═══ */
  .cta-bg {
    background:linear-gradient(135deg, #1e3a28 0%, #2a5a3c 50%, #1a4030 100%);
    padding:100px 64px; text-align:center; position:relative; overflow:hidden;
  }
  .cta-bg::before { content:'🌿'; position:absolute; font-size:20rem; opacity:0.04; top:-60px;right:-40px; line-height:1; pointer-events:none; animation:leafSpin 8s ease-in-out infinite; }
  .cta-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(184,146,42,0.08),transparent 60%); pointer-events:none; }
  .cta-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,4.5vw,4rem); font-weight:700; color:#fff; margin-bottom:18px; position:relative; z-index:1; }
  .cta-sub   { color:rgba(255,255,255,0.6); font-size:1rem; max-width:520px; margin:0 auto 44px; line-height:1.8; position:relative; z-index:1; }
  .cta-btns  { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }

  /* ═══ CONTACT ═══ */
  .contact-bg { background:var(--bg); padding:100px 0; }
  .contact-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:90px; align-items:start; }
  .ci-item { display:flex; gap:18px; margin-bottom:32px; }
  .ci-icon { width:52px;height:52px; flex-shrink:0; background:linear-gradient(135deg,var(--sage-l),var(--sage-d)); border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; box-shadow:0 8px 22px rgba(61,107,79,0.25); }
  .ci-title { font-weight:600; color:var(--text); margin-bottom:4px; font-size:0.9rem; }
  .ci-text  { font-size:0.85rem; color:var(--muted); line-height:1.7; white-space:pre-line; }
  .form-box { background:var(--surface); border:1px solid var(--border); border-radius:32px; padding:50px; box-shadow:var(--shadow); }
  .form-title { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700; color:var(--text); margin-bottom:8px; }
  .form-sub   { color:var(--muted); font-size:0.84rem; margin-bottom:28px; }
  .ph-input { width:100%; padding:14px 20px; border:1.5px solid var(--border); border-radius:13px; font-family:'Outfit',sans-serif; font-size:0.9rem; color:var(--text); background:var(--card); margin-bottom:14px; transition:border-color 0.2s,box-shadow 0.2s; outline:none; }
  .ph-input:focus { border-color:var(--sage); box-shadow:0 0 0 3px rgba(61,107,79,0.1); }
  .ph-input::placeholder { color:var(--dim); }
  .ph-textarea { height:110px; resize:vertical; }
  .ph-submit { width:100%; padding:16px; background:var(--sage); color:#fff; border:none; border-radius:13px; font-family:'Outfit',sans-serif; font-size:0.95rem; font-weight:700; cursor:pointer; transition:all 0.3s; margin-top:6px; box-shadow:0 8px 24px rgba(61,107,79,0.3); }
  .ph-submit:hover { background:var(--sage-d); transform:translateY(-2px); box-shadow:0 14px 36px rgba(61,107,79,0.4); }
  .ph-submit:disabled { opacity:0.6; cursor:not-allowed; }
  .ph-success { background:rgba(62,207,142,0.1); border:1px solid rgba(62,207,142,0.3); color:#1a9e68; border-radius:12px; padding:12px 18px; font-size:0.85rem; margin-bottom:14px; display:flex; gap:8px; }

  /* ═══ TOAST ═══ */
  .toast {
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
    padding:13px 28px; border-radius:50px; z-index:9999;
    font-size:0.88rem; font-weight:600; font-family:'Outfit',sans-serif;
    box-shadow:0 12px 36px rgba(0,0,0,0.18);
    animation:fadeUp 0.3s ease both;
    border:1px solid rgba(255,255,255,0.15);
  }
  .toast-success { background:var(--sage-d); color:#fff; }
  .toast-error   { background:#5a1000; color:#ff8a8a; }

  /* ═══ RESPONSIVE ═══ */
  @media(max-width:1100px){
    .hero-content { grid-template-columns:1fr; padding:110px 36px 60px; }
    .hero-card { display:none; }
    .pets-grid,.top-picks-grid { grid-template-columns:repeat(2,1fr); }
    .prod-grid { grid-template-columns:repeat(2,1fr); }
    .svc-grid { grid-template-columns:repeat(2,1fr); }
    .testi-grid { grid-template-columns:1fr; }
    .about-grid,.contact-grid { grid-template-columns:1fr; }
    .gallery-grid { grid-template-columns:repeat(3,1fr); grid-template-rows:auto; }
    .gal-item { grid-column:span 1 !important; height:180px; }
    .wrap,.tab-nav-inner,.sub-tabs-inner { padding:0 36px; }
  }
  @media(max-width:680px){
    .wrap,.tab-nav-inner,.sub-tabs-inner { padding:0 20px; }
    .pets-grid,.top-picks-grid,.prod-grid { grid-template-columns:1fr 1fr; }
    .svc-grid { grid-template-columns:1fr; }
    .hero-stats { gap:22px; flex-wrap:wrap; }
    .cta-bg { padding:80px 24px; }
    .gallery-grid { grid-template-columns:repeat(2,1fr); }
  }
`;

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
function Home() {
  const [uname,       setusername]   = useState("");
  const [email,       setemail]      = useState("");
  const [message,     setmessage]    = useState("");
  const [mobile,      setmobile]     = useState("");
  const [products,    setProducts]   = useState([]);
  const [sending,     setSending]    = useState(false);
  const [sent,        setSent]       = useState(false);
  const [toast,       setToast]      = useState(null);
  const [prodPage,    setProdPage]   = useState("dogs");
  const [prodSubTab,  setProdSubTab] = useState("breeds");
  const [svcPage,     setSvcPage]    = useState("dogs");
  const [wishlist,    setWishlist]   = useState({});
  const [cartAdded,   setCartAdded]  = useState({});
  const [prodCart,    setProdCart]   = useState({});
  const [tpCart,      setTpCart]     = useState({});
  const [showAll,     setShowAll]    = useState(false);
  const heroRef  = useRef(null);
  const navigate = useNavigate();

  const SUB_TABS = [
    { key:"breeds", label:"🐾 Breeds" },
    { key:"food",   label:"🍖 Food" },
    { key:"pharma", label:"💊 Pharmacy" },
    { key:"wash",   label:"🛁 Grooming" },
    { key:"toys",   label:"🧸 Toys" },
    { key:"tools",  label:"🔧 Tools" },
  ];
  const PROD_TAB_MAP = { food:0, pharma:1, wash:2, toys:3, tools:4 };

  useEffect(() => {
    axios.get(`${API}/show.php`).then(r => setProducts(r.data||[])).catch(()=>setProducts([]));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal,.reveal-l").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [products, prodPage, prodSubTab, svcPage]);

  useEffect(() => {
    const h = () => {
      if (heroRef.current)
        heroRef.current.style.setProperty("--scroll", `${window.scrollY * 0.3}px`);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (pid) => {
    const uid = localStorage.getItem("uid") || 1;
    axios.get(`${API}/insert.php?pid=${pid}&uid=${uid}`)
      .then((res) => {
        if (res.data.status === "updated") {
          showToast(`Quantity updated ×${res.data.quantity} 🛒`);
        } else {
          showToast("Added to cart! 🛒");
        }
      })
      .catch(() => showToast("Please login first 🔐", "error"));
};

  const toggleWish = (key) => setWishlist(w => ({ ...w, [key]: !w[key] }));
  const addPetCart = (key) => {
    setCartAdded(c => ({...c,[key]:true}));
    setTimeout(() => setCartAdded(c => ({...c,[key]:false})), 1600);
    showToast("Added to cart! 🛒");
  };
  const addProdCart = (key) => {
    setProdCart(c => ({...c,[key]:true}));
    setTimeout(() => setProdCart(c => ({...c,[key]:false})), 1500);
  };
  const addTpCart = (i) => {
    setTpCart(c => ({...c,[i]:true}));
    setTimeout(() => setTpCart(c => ({...c,[i]:false})), 1500);
    showToast("Added to cart! 🛒");
  };

  function handleForm(e) {
    e.preventDefault(); setSending(true);
    const data = { name:uname, email, mobile, message };
    axios({ method:"post", url:`${API}/contact.php`, data, headers:{"Content-Type":"multipart/form-data"} })
      .then(() => { setSending(false); setSent(true); setTimeout(()=>setSent(false),4000); navigate(0); })
      .catch(() => setSending(false));
  }

  const CAT   = PET_DATA[prodPage];
  const SVCAT = PET_DATA[svcPage];
  const displayPets = showAll ? CAT.pets : CAT.pets.slice(0,4);

  const TRUST_ITEMS = [
    "🏥 Vet Certified Pets","🚚 Pan-India Delivery","📜 KCI Registered","💬 Lifetime Support",
    "💉 100% Vaccinated","🔒 Secure Payments","⭐ 5-Star Rated","🐾 2,000+ Happy Families",
  ];

  return (
    <>
      <style>{STYLES}</style>

      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      <Nav />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="hero-content">
          <div>
            <div className="hero-chip">
              <span className="hero-dot" />
              India's #1 Premium Pet Store
            </div>
            <h1 className="hero-title">
              Find Your<br />
              <em>Perfect</em><br />
              <span className="line-accent">Companion</span>
            </h1>
            <p className="hero-sub">
              Handpicked, purebred pets — each one health-certified, vaccinated
              and ready to fill your home with unconditional love. Trusted by
              2,000+ families across India.
            </p>
            <div className="hero-btns">
              <button className="btn btn-sage"
                onClick={() => document.getElementById("products-section")?.scrollIntoView({behavior:"smooth"})}>
                Shop Pets 🐾
              </button>
              <button className="btn btn-glass"
                onClick={() => document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"})}>
                Contact Us
              </button>
            </div>
            <div className="hero-stats">
              {[["50+","Breeds"],["2K+","Happy Families"],["100%","Health Certified"],["5★","Avg Rating"]].map(([n,l])=>(
                <div key={l}>
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <img src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=700&q=85" alt="Golden Retriever" />
              <div className="hero-card-live"><span className="live-dot"/>Live Stock</div>
              <div className="hero-card-info">
                <div className="hero-card-tag">⭐ Featured</div>
                <div className="hero-card-name">Golden Retriever</div>
                <div className="hero-card-price">Starting ₹25,000</div>
              </div>
            </div>
            <div className="float-pill">
              <div className="fp-icon">🏠</div>
              <div className="fp-label">Happy Homes</div>
              <div className="fp-val">2,400+</div>
            </div>
            <div className="float-pill">
              <div className="fp-icon">💉</div>
              <div className="fp-label">Vaccinated</div>
              <div className="fp-val">100%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE TRUST BAR
      ═══════════════════════════════════════════ */}
      <div className="trust-bar">
        <div className="trust-track">
          {[...TRUST_ITEMS,...TRUST_ITEMS].map((t,i)=>(
            <div className="trust-item" key={i}>
              <span className="trust-item-icon">{t.split(" ")[0]}</span>
              {t.split(" ").slice(1).join(" ")}
              {i % TRUST_ITEMS.length !== TRUST_ITEMS.length-1 && <span className="trust-sep" style={{marginLeft:16}}>✦</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRODUCTS SECTION
      ═══════════════════════════════════════════ */}
      <div id="products-section">
        <div className="tab-nav">
          <div className="tab-nav-inner">
            {Object.entries(PET_DATA).map(([key,d])=>(
              <button key={key}
                className={`tab-btn${prodPage===key?" active":""}`}
                onClick={()=>{setProdPage(key);setProdSubTab("breeds");setShowAll(false);}}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Hero Banner */}
        <div className="pet-hero">
          <img src={CAT.hero} alt={CAT.label} />
          <div className="pet-hero-ov" />
          <div className="pet-hero-text">
            <div className="wrap" style={{width:"100%"}}>
              <div style={{animation:"fadeUp 0.5s ease both"}}>
                <div className="pet-hero-emoji">{CAT.emoji}</div>
                <div className="pet-hero-title">{CAT.label}</div>
                <div className="pet-hero-sub">{CAT.tagline} — {CAT.pets.length} breeds available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="sub-tabs">
          <div className="sub-tabs-inner">
            {SUB_TABS.map(t=>(
              <button key={t.key}
                className={`sub-btn${prodSubTab===t.key?" active":""}`}
                onClick={()=>setProdSubTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Breeds Tab */}
        {prodSubTab==="breeds" && (
          <div style={{background:"var(--bg)",padding:"60px 0"}}>
            <div className="wrap">
              <div className="section-hd">
                <div>
                  <div className="label-tag">Pure Breeds</div>
                  <h2 className="h2">Find Your Dream {CAT.label.replace(/s$/,"")}</h2>
                </div>
                <span style={{fontSize:"0.85rem",color:"var(--muted)"}}>{CAT.pets.length} breeds available</span>
              </div>

              <div className="pets-grid">
                {displayPets.map((pet,i)=>{
                  const key=`${prodPage}-${i}`;
                  return (
                    <div className="pet-card reveal" key={key}>
                      <div className="pet-img-wrap">
                        <img src={pet.img} alt={pet.name}/>
                        {pet.badge && (
                          <span className="badge" style={{background:BADGE_CFG[pet.badge]?.bg,color:BADGE_CFG[pet.badge]?.text}}>
                            {pet.badge}
                          </span>
                        )}
                        <button className="wish-btn" onClick={()=>toggleWish(key)}>
                          {wishlist[key]?"❤️":"🤍"}
                        </button>
                      </div>
                      <div className="pet-body">
                        <div className="pet-breed">Pure Breed · {CAT.label.replace(/s$/,"")}</div>
                        <div className="pet-name">{pet.name}</div>
                        <div className="pet-desc">{pet.desc}</div>
                        <div className="pet-tags">
                          {["💉 Vaccinated","📜 KCI Certified","🏠 Rehomeable"].map(t=>(
                            <span className="pet-tag" key={t}>{t}</span>
                          ))}
                        </div>
                        <div className="pet-foot">
                          <div className="price">{pet.price}<small> onwards</small></div>
                          <button className={`cart-btn${cartAdded[key]?" done":""}`} onClick={()=>addPetCart(key)}>
                            {cartAdded[key]?"✓":"🛒"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!showAll && CAT.pets.length>4 && (
                <div className="view-more">
                  <button className="btn btn-sage" onClick={()=>setShowAll(true)}>
                    View All {CAT.label} ({CAT.pets.length-4} more) →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Tabs */}
        {prodSubTab!=="breeds" && (
          <div style={{background:"var(--bg)",padding:"60px 0"}}>
            <div className="wrap">
              {(()=>{
                const tabIdx=PROD_TAB_MAP[prodSubTab];
                const sec=CAT.products[tabIdx];
                if(!sec) return null;
                return (
                  <>
                    <div className="section-hd">
                      <div>
                        <div className="label-tag">{CAT.emoji} {CAT.label} Products</div>
                        <h2 className="h2">{sec.sec}</h2>
                      </div>
                    </div>
                    <div className="prod-grid">
                      {sec.items.map((item,ii)=>{
                        const pk=`${prodPage}-${prodSubTab}-${ii}`;
                        return (
                          <div className="prod-card reveal" key={pk}>
                            <div className="prod-img"><img src={item.img} alt={item.name}/></div>
                            <div className="prod-body">
                              <div className="prod-name">{item.name}</div>
                              <div className="prod-foot">
                                <div className="prod-price">{item.price}</div>
                                <button className={`prod-add${prodCart[pk]?" done":""}`} onClick={()=>addProdCart(pk)}>
                                  {prodCart[pk]?"✓ Added":"+ Add"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {CAT.products.map((s,si)=>{
                      if(si===tabIdx) return null;
                      return (
                        <div key={si} style={{marginTop:56}}>
                          <div className="prod-sec-hd">
                            <div className="prod-sec-title">{s.sec}</div>
                            <span style={{fontSize:"0.78rem",color:"var(--muted)"}}>{s.items.length} products</span>
                          </div>
                          <div className="prod-grid">
                            {s.items.map((item,ii)=>{
                              const pk2=`${prodPage}-s${si}-${ii}`;
                              return (
                                <div className="prod-card reveal" key={pk2}>
                                  <div className="prod-img"><img src={item.img} alt={item.name}/></div>
                                  <div className="prod-body">
                                    <div className="prod-name">{item.name}</div>
                                    <div className="prod-foot">
                                      <div className="prod-price">{item.price}</div>
                                      <button className={`prod-add${prodCart[pk2]?" done":""}`} onClick={()=>addProdCart(pk2)}>
                                        {prodCart[pk2]?"✓ Added":"+ Add"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          TOP PICKS THIS MONTH (Real Photos)
      ═══════════════════════════════════════════ */}
      <div style={{background:"var(--bg2)",padding:"100px 0",borderTop:"1px solid var(--border)"}}>
        <div className="wrap">
          <div className="section-hd">
            <div>
              <div className="label-tag">Curated Selection</div>
              <h2 className="h2">Top Picks This Month</h2>
            </div>
            <NavLink to="product" style={{color:"var(--sage)",fontSize:"0.9rem",fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
              View All Products →
            </NavLink>
          </div>

          <div className="top-picks-grid">
            {(products.length > 0 ? products.slice(0,4).map((p,i) => ({
              name: p.pname,
              category: ["Dog Nutrition","Grooming Tools","Dog Accessories","Bird Nutrition"][i%4],
              price: `₹${parseInt(p.price).toLocaleString("en-IN")}`,
              rating: ["4.9","4.8","4.7","4.8"][i%4],
              reviews: ["2.4k","1.8k","3.1k","987"][i%4],
              badge: ["BESTSELLER","TOP RATED","HOT","NEW"][i%4],
              img: TOP_PICKS[i%4].img,
            })) : TOP_PICKS).map((item,i)=>{
              const badgeCls = {"BESTSELLER":"tp-badge-bs","TOP RATED":"tp-badge-tr","HOT":"tp-badge-hot","NEW":"tp-badge-new"}[item.badge]||"tp-badge-bs";
              return (
                <div className="tp-card reveal" key={i}>
                  <div className="tp-img-wrap">
                    <img src={item.img} alt={item.name}/>
                    <span className={`tp-badge ${badgeCls}`}>{item.badge}</span>
                  </div>
                  <div className="tp-body">
                    <div className="tp-category">{item.category}</div>
                    <div className="tp-name">{item.name}</div>
                    <div className="tp-rating">
                      <span className="tp-stars">★★★★★</span>
                      <span className="tp-rating-num">{item.rating}</span>
                      <span className="tp-reviews">({item.reviews} reviews)</span>
                    </div>
                    <div className="tp-foot">
                      <div className="tp-price">{item.price}</div>
                      <button className={`tp-add${tpCart[i]?" done":""}`} onClick={()=>{ addTpCart(i); if(products[i]) handleAddToCart(products[i].id); }}>
                        {tpCart[i]?"✓ Added":"Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════ */}
      <div id="services-section" style={{background:"var(--bg)"}}>
        <div style={{background:"var(--surface)",borderBottom:"1px solid var(--border)",borderTop:"1px solid var(--border)"}}>
          <div className="tab-nav-inner">
            <button className={`tab-btn${svcPage==="home"?" active":""}`} onClick={()=>setSvcPage("home")}>🏥 All Services</button>
            {Object.entries(PET_DATA).map(([key,d])=>(
              <button key={key} className={`tab-btn${svcPage===key?" active":""}`} onClick={()=>setSvcPage(key)}>
                {d.emoji} {d.label} Care
              </button>
            ))}
          </div>
        </div>

        <div className="wrap" style={{paddingTop:80,paddingBottom:80}}>
          {svcPage==="home" ? (
            <>
              <div className="section-hd">
                <div>
                  <div className="label-tag">What We Offer</div>
                  <h2 className="h2">Our Services</h2>
                </div>
              </div>
              <div className="svc-grid">
                {HOME_SERVICES.map((s,i)=>(
                  <div className="svc-card reveal" key={i}>
                    <div className="svc-icon">{s.icon}</div>
                    <div className="svc-title">{s.title}</div>
                    <p className="svc-desc">{s.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="section-hd">
                <div>
                  <div className="label-tag">{SVCAT.emoji} {SVCAT.label} Specialist Services</div>
                  <h2 className="h2">{SVCAT.label} Care Services</h2>
                </div>
                <p style={{color:"var(--muted)",fontSize:"0.9rem",maxWidth:400,lineHeight:1.75,margin:0}}>
                  Expert services tailored for your {SVCAT.label.toLowerCase()}'s health & happiness.
                </p>
              </div>
              <div style={{borderRadius:24,overflow:"hidden",height:260,marginBottom:48,position:"relative"}} className="reveal">
                <img src={SVCAT.hero} alt={SVCAT.label} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.35) saturate(0.7)"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(15,42,28,0.95) 35%,rgba(15,42,28,0.3))"}}>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 60px",gap:24}}>
                    <span style={{fontSize:"4rem"}}>{SVCAT.emoji}</span>
                    <div>
                      <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2.2rem",color:"#fff",fontWeight:700}}>{SVCAT.label} Care Centre</h3>
                      <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.95rem",marginTop:6}}>{SVCAT.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="svc-grid">
                {SVCAT.services.map((s,i)=>(
                  <div className="svc-card reveal" key={i}>
                    <div className="svc-icon">{s.icon}</div>
                    <div className="svc-title">{s.title}</div>
                    <p className="svc-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════ */}
      <div style={{background:"var(--ivory)",padding:"100px 0",borderTop:"1px solid var(--border)"}}>
        <div className="wrap">
          <div className="about-grid">
            <div className="reveal-l" style={{position:"relative"}}>
              <div className="about-img-main">
                <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=85" alt="about"/>
              </div>
              <div className="about-badge-box">
                <div className="about-yrs">5+</div>
                <div className="about-yrs-lbl">Years of Trust</div>
              </div>
            </div>
            <div className="reveal">
              <div className="label-tag">Our Story</div>
              <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2rem,3vw,2.8rem)",fontWeight:700,color:"var(--text)",marginBottom:24,lineHeight:1.15}}>
                More Than a Pet Shop —<br/>A Family for Your Family
              </h2>
              <p className="about-text">
                Petology started with one simple belief: every pet deserves a loving home,
                and every family deserves a healthy, happy companion. We work directly with
                responsible breeders across India to bring you certified, well-cared-for pets —
                never from puppy mills.
              </p>
              <div className="about-pts">
                {[
                  "All pets are vet-examined and vaccinated before going home",
                  "KCI/CFAB pedigree registration for all purebred animals",
                  "Pan-India safe delivery with temperature-controlled transport",
                  "Post-purchase support — we're with you for your pet's whole life",
                ].map((pt,i)=>(
                  <div className="about-pt" key={i}>
                    <div className="chk">✓</div>
                    <div className="pt-txt">{pt}</div>
                  </div>
                ))}
              </div>
              <button className="btn btn-sage"
                onClick={()=>document.getElementById("products-section")?.scrollIntoView({behavior:"smooth"})}>
                Meet Our Pets 🐕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════ */}
      <div className="gallery-bg" id="gallery-section">
        <div className="wrap">
          <div className="label-tag">Our Gallery</div>
          <h2 className="h2">Happy Pets, Happy Homes</h2>
          <div className="gallery-grid reveal">
            {[
              "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
              "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
              "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
              "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
              "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&q=80",
            ].map((src,i)=>(
              <div className="gal-item" key={i}>
                <img src={src} alt={`gallery-${i}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <div className="testi-bg">
        <div className="wrap">
          <div className="section-hd">
            <div>
              <div className="label-tag">Happy Customers</div>
              <h2 className="h2">What Families Say</h2>
            </div>
          </div>
          <div className="testi-grid">
            {[
              {name:"Priya Sharma",city:"Mumbai",init:"P",text:"We got our Golden Retriever from Petology last year — the entire process was seamless. The pup arrived healthy, vaccinated, and full of energy. The team even followed up a week later!"},
              {name:"Rahul Mehta",city:"Ahmedabad",init:"R",text:"Best pet store experience by far. The staff guided us through choosing the right breed for our apartment. Our Shih Tzu is an absolute delight — perfectly adapted to our home."},
              {name:"Anjali Patel",city:"Surat",init:"A",text:"The grooming service is exceptional. My Persian cat gets treated like royalty every visit. The vets here are genuinely knowledgeable — you can feel they love animals."},
            ].map((t,i)=>(
              <div className="testi-card reveal" key={i}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <div className="cta-bg">
        <h2 className="cta-title">Ready to Find Your Furry Friend?</h2>
        <p className="cta-sub">
          Join 2,000+ Indian families who found their perfect companion through Petology.
          Create a free account and start browsing today.
        </p>
        <div className="cta-btns">
          <button className="btn btn-gold"
            onClick={()=>document.getElementById("products-section")?.scrollIntoView({behavior:"smooth"})}>
            Browse Pets 🐾
          </button>
          <button className="btn btn-outline-w"
            onClick={()=>document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"})}>
            Talk to Us
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════ */}
      <div className="contact-bg" id="contact-section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="reveal">
              <div className="label-tag">Get in Touch</div>
              <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2rem,3vw,2.6rem)",fontWeight:700,color:"var(--text)",marginBottom:40,lineHeight:1.15}}>
                We'd Love to<br/>Hear From You
              </h2>
              {[
                {icon:"📍",title:"Visit Us",text:"Shop No. 12, Pet Paradise Complex\nRing Road, Surat, Gujarat — 395007"},
                {icon:"📞",title:"Call Us",text:"+91 98765 43210\nMon–Sat, 9:00 AM – 7:00 PM"},
                {icon:"✉️",title:"Email Us",text:"hello@petology.in\nReply within 24 hours"},
              ].map((c,i)=>(
                <div className="ci-item" key={i}>
                  <div className="ci-icon">{c.icon}</div>
                  <div>
                    <div className="ci-title">{c.title}</div>
                    <div className="ci-text">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-box reveal">
              <div className="form-title">Send a Message</div>
              <p className="form-sub">We'll get back to you within 24 hours.</p>
              {sent && <div className="ph-success">✅ Thank you! We'll contact you soon.</div>}
              <form onSubmit={handleForm}>
                <input className="ph-input" type="text"  placeholder="Your Name *"     onChange={e=>setusername(e.target.value)} required/>
                <input className="ph-input" type="tel"   placeholder="Phone Number *"  onChange={e=>setmobile(e.target.value)} required/>
                <input className="ph-input" type="email" placeholder="Email Address *" onChange={e=>setemail(e.target.value)} required/>
                <textarea className="ph-input ph-textarea" placeholder="Your Message..." onChange={e=>setmessage(e.target.value)}/>
                <button className="ph-submit" type="submit" disabled={sending}>
                  {sending?"Sending…":"Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;