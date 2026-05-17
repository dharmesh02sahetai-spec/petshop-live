import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

let Nav = () => null;
try { Nav = require("./Nev").default; } catch (e) {}

const API      = "http://localhost/Petshop/show.php";
const WHATSAPP = "919999999999";

/* ── IMAGES ─────────────────────────────────────────────────── */
const IMGS = {
  Dogs:  [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80",
  ],
  Cats:  [
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
    "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=600&q=80",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
    "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&q=80",
  ],
  Birds: [
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
    "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&q=80",
  ],
  Fish:  [
    "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&q=80",
    "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
  ],
};
const getImg = (cat, i) => { const a = IMGS[cat] || IMGS.Dogs; return a[i % a.length]; };

/* ── DEMO PETS ───────────────────────────────────────────────── */
const DEMO = [
  { id:"d1", pname:"Golden Retriever", price:35000, cat:"Dogs", age:"3 months", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.9, reviews:203, badge:"POPULAR", desc:"India's most loved family dog. Gentle, intelligent and endlessly loyal. Perfect for families with children." },
  { id:"d2", pname:"Labrador",         price:18000, cat:"Dogs", age:"10 weeks", gender:"Female", vaccinated:true,  microchipped:false, rating:4.7, reviews:178, badge:"NEW",     desc:"Playful, obedient and easy to train. Great companion for active households." },
  { id:"d3", pname:"Pomeranian",       price:22000, cat:"Dogs", age:"8 weeks",  gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.8, reviews:142, badge:"POPULAR", desc:"Fluffy, bold and full of personality. A perfect lap dog for apartment living." },
  { id:"d4", pname:"Husky",            price:45000, cat:"Dogs", age:"12 weeks", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.9, reviews:167, badge:"PREMIUM", desc:"Striking blue eyes and a wolf-like appearance. Energetic and loves the outdoors." },
  { id:"d5", pname:"Shih Tzu",         price:15000, cat:"Dogs", age:"9 weeks",  gender:"Female", vaccinated:true,  microchipped:false, rating:4.6, reviews:98,  badge:"NEW",     desc:"Calm, affectionate and low-shedding. Ideal for seniors and smaller homes." },
  { id:"d6", pname:"German Shepherd",  price:30000, cat:"Dogs", age:"4 months", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.9, reviews:241, badge:"POPULAR", desc:"Highly intelligent and loyal. The gold standard for a guardian and family companion." },
  { id:"c1", pname:"Persian Cat",      price:18000, cat:"Cats", age:"8 weeks",  gender:"Female", vaccinated:true,  microchipped:true,  rating:4.8, reviews:189, badge:"POPULAR", desc:"Silky long fur and a calm temperament. The ultimate indoor companion for a peaceful home." },
  { id:"c2", pname:"Maine Coon",       price:28000, cat:"Cats", age:"10 weeks", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.7, reviews:134, badge:"PREMIUM", desc:"Gentle giant with a dog-like personality. Loves to follow you around and play fetch." },
  { id:"c3", pname:"Siamese",          price:14000, cat:"Cats", age:"3 months", gender:"Female", vaccinated:true,  microchipped:false, rating:4.6, reviews:91,  badge:"NEW",     desc:"Vocal, social and beautifully patterned. Will hold full conversations with you daily." },
  { id:"c4", pname:"Bengal",           price:35000, cat:"Cats", age:"2 months", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.9, reviews:167, badge:"PREMIUM", desc:"Wild leopard spots on a domestic cat. Highly playful, athletic and endlessly entertaining." },
  { id:"b1", pname:"African Grey",     price:45000, cat:"Birds", age:"6 months", gender:"Male",   vaccinated:true,  microchipped:false, rating:4.9, reviews:212, badge:"PREMIUM", desc:"The world's most intelligent talking parrot. Can learn 1000+ words and solve puzzles." },
  { id:"b2", pname:"Cockatiel",        price:5000,  cat:"Birds", age:"8 weeks",  gender:"Female", vaccinated:false, microchipped:false, rating:4.6, reviews:87,  badge:"POPULAR", desc:"Friendly, melodious and very easy to tame. Perfect first bird for any family." },
  { id:"b3", pname:"Macaw",            price:150000,cat:"Birds", age:"4 months", gender:"Male",   vaccinated:true,  microchipped:true,  rating:4.8, reviews:145, badge:"PREMIUM", desc:"Majestic and colourful — a living work of art. Can live 60+ years as your lifelong companion." },
  { id:"f1", pname:"Arowana",          price:50000, cat:"Fish",  age:"8 months", gender:null,     vaccinated:false, microchipped:false, rating:4.9, reviews:198, badge:"PREMIUM", desc:"The legendary dragon fish — symbol of luck and prosperity. Majestic silver sheen." },
  { id:"f2", pname:"Betta Fish",       price:800,   cat:"Fish",  age:"3 months", gender:"Male",   vaccinated:false, microchipped:false, rating:4.7, reviews:312, badge:"POPULAR", desc:"Stunning jewel-like colours. Easy to care for and mesmerising to watch." },
  { id:"f3", pname:"Koi",              price:12000, cat:"Fish",  age:"1 year",   gender:null,     vaccinated:false, microchipped:false, rating:4.8, reviews:156, badge:"NEW",     desc:"Graceful pond beauty with flowing fins. Symbol of perseverance and good fortune." },
];

const TABS = [
  { id:"All",   icon:"🐾", label:"All Pets"  },
  { id:"Dogs",  icon:"🐕", label:"Dogs"      },
  { id:"Cats",  icon:"🐈", label:"Cats"      },
  { id:"Birds", icon:"🦜", label:"Birds"     },
  { id:"Fish",  icon:"🐠", label:"Fish"      },
];

const stars = (r) => "★".repeat(Math.floor(r||0)) + "☆".repeat(Math.max(0,5-Math.floor(r||0)));

const CAT_KW = {
  Dogs:  ["dog","retriever","labrador","husky","pomeranian","terrier","shih","german","dalmatian","beagle","poodle","bulldog","rottweiler","malamute","affenpinscher","alaskan","breeds","spitz"],
  Cats:  ["cat","persian","maine","siamese","bengal","ragdoll","kitten","tabby","sphynx"],
  Birds: ["bird","parrot","grey","cockatiel","macaw","budgie","canary","parakeet","finch","mynah","love"],
  Fish:  ["fish","arowana","betta","koi","goldfish","guppy","angel","oscar","cichlid","aqua"],
};
const guessCategory = (name="") => {
  const l = name.toLowerCase();
  for (const [cat,kws] of Object.entries(CAT_KW)) if (kws.some(k => l.includes(k))) return cat;
  return "Dogs";
};

/* ── CSS ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --bg:      #f4f1eb; --bg2:     #ede8de; --surface: #ffffff; --card:    #faf8f4;
  --sage:    #3d6b4f; --sage-d:  #2a4e39; --sage-l:  #5a9470;
  --sage-xs: rgba(61,107,79,0.09); --sage-sm: rgba(61,107,79,0.18);
  --gold:    #b8922a; --gold-l:  #d4ac48; --gold-xs: rgba(184,146,42,0.12);
  --border:  rgba(61,107,79,0.13); --border2: rgba(184,146,42,0.18);
  --text:    #1c2b22; --text2:   #3a4a3f; --muted:   #7a907f; --dim:     #aab8ac;
  --ivory:   #fdf9f2;
  --shadow:  0 4px 24px rgba(30,50,35,0.08);
  --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
  --radius:  20px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:var(--sage);border-radius:10px;}

@keyframes fadeUp  {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes floatY  {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes shimmer {0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes scaleIn {from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
@keyframes orbDrift{0%,100%{transform:translate(0,0)}40%{transform:translate(40px,-28px)}70%{transform:translate(-18px,18px)}}

.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.visible{opacity:1;transform:none;}

.pet-root{min-height:100vh;background:var(--bg);font-family:'Outfit',sans-serif;color:var(--text);}

/* ── HERO ── */
.pet-hero{background:linear-gradient(160deg,#1e3a28,#2a5a3c,#1a4030);
  padding:90px 24px 120px;position:relative;overflow:hidden;}
.pet-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.25;pointer-events:none;animation:orbDrift 16s ease-in-out infinite;}
.pet-orb1{width:500px;height:500px;background:radial-gradient(circle,#5a9470,transparent 70%);top:-150px;left:-100px;}
.pet-orb2{width:380px;height:380px;background:radial-gradient(circle,#b8922a,transparent 70%);bottom:-100px;right:-80px;animation-delay:-8s;}
.pet-wave{position:absolute;bottom:0;left:0;right:0;height:70px;background:var(--bg);clip-path:ellipse(58% 100% at 50% 100%);}
.pet-hero-in{position:relative;z-index:2;max-width:780px;margin:0 auto;text-align:center;}

.label-tag{font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
  display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;}
.label-tag::before{content:'';width:24px;height:2px;border-radius:2px;}
.label-tag.light{color:rgba(255,255,255,0.7);}
.label-tag.light::before{background:rgba(255,255,255,0.5);}
.label-tag.sage{color:var(--sage);}
.label-tag.sage::before{background:var(--sage);}
.label-tag.gold{color:var(--gold-l);}
.label-tag.gold::before{background:var(--gold-l);}

.pet-hero-in h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,6vw,5.5rem);
  font-weight:700;line-height:1.05;color:#fff;margin-bottom:16px;}
.pet-hero-in h1 em{font-style:italic;color:var(--gold-l);}
.pet-hero-in p{color:rgba(255,255,255,0.6);font-size:1rem;font-weight:300;
  max-width:520px;margin:0 auto 40px;line-height:1.8;}
.pet-hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

.btn-white{padding:13px 28px;border-radius:50px;background:#fff;border:none;
  color:var(--sage-d);font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;
  cursor:pointer;transition:all 0.2s;box-shadow:0 6px 24px rgba(0,0,0,0.15);}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,0.2);}
.btn-glass{padding:13px 28px;border-radius:50px;
  background:rgba(255,255,255,0.12);border:1.5px solid rgba(255,255,255,0.3);
  color:#fff;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:600;
  cursor:pointer;transition:all 0.2s;backdrop-filter:blur(8px);}
.btn-glass:hover{background:rgba(255,255,255,0.2);transform:translateY(-2px);}

.pet-hero-stats{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;margin-top:48px;}
.pet-stat-num{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:var(--gold-l);display:block;}
.pet-stat-lbl{font-size:0.68rem;color:rgba(255,255,255,0.4);letter-spacing:0.18em;text-transform:uppercase;}

/* ── SEARCH BAR ── */
.pet-bar{max-width:1200px;margin:-32px auto 0;padding:0 28px;position:relative;z-index:10;}
.pet-bar-in{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:20px 24px;box-shadow:var(--shadow-lg);display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
.pet-search{flex:1;min-width:200px;display:flex;align-items:center;gap:10px;
  background:var(--card);border:1.5px solid var(--border);border-radius:50px;padding:11px 20px;transition:0.2s;}
.pet-search:focus-within{border-color:var(--sage);box-shadow:0 0 0 3px rgba(61,107,79,0.1);}
.pet-search input{border:none;background:transparent;outline:none;
  font-family:'Outfit',sans-serif;font-size:0.875rem;color:var(--text);width:100%;}
.pet-search input::placeholder{color:var(--dim);}
.pet-sort{background:var(--card);border:1.5px solid var(--border);border-radius:50px;
  padding:11px 18px;font-family:'Outfit',sans-serif;font-size:0.85rem;
  font-weight:500;color:var(--text);cursor:pointer;outline:none;transition:0.2s;}
.pet-sort:focus{border-color:var(--sage);}
.pet-vbtns{display:flex;gap:6px;}
.pet-vbtn{width:40px;height:40px;border-radius:50%;border:1.5px solid var(--border);
  background:transparent;cursor:pointer;font-size:16px;display:flex;align-items:center;
  justify-content:center;transition:0.2s;color:var(--muted);}
.pet-vbtn.on{background:var(--sage-xs);border-color:var(--sage);color:var(--sage);}

/* ── TABS ── */
.pet-tabs-wrap{max-width:1200px;margin:24px auto 0;padding:0 28px;}
.pet-tabs{display:flex;gap:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;}
.pet-tabs::-webkit-scrollbar{display:none;}
.pet-tab{flex-shrink:0;display:flex;align-items:center;gap:12px;padding:16px 26px;
  border-radius:16px;border:1.5px solid var(--border);background:var(--surface);
  cursor:pointer;transition:all 0.25s cubic-bezier(.34,1.56,.64,1);min-width:140px;}
.pet-tab:hover{border-color:var(--sage);background:var(--sage-xs);transform:translateY(-2px);}
.pet-tab.on{background:linear-gradient(135deg,var(--sage),var(--sage-d));
  border-color:transparent;box-shadow:0 8px 28px rgba(61,107,79,0.35);transform:translateY(-2px);}
.pet-tab-icon{font-size:1.8rem;line-height:1;}
.pet-tab-info{text-align:left;}
.pet-tab-label{font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;
  color:var(--text);display:block;line-height:1.2;}
.pet-tab.on .pet-tab-label{color:#fff;}
.pet-tab-count{font-size:0.7rem;color:var(--muted);}
.pet-tab.on .pet-tab-count{color:rgba(255,255,255,0.7);}

/* ── INFO ROW ── */
.pet-info{max-width:1200px;margin:16px auto 0;padding:0 28px;
  display:flex;justify-content:space-between;align-items:center;}
.pet-info-txt{font-family:'Outfit',sans-serif;font-size:0.82rem;color:var(--muted);}
.pet-info-txt strong{color:var(--text);font-weight:600;}
.pet-clear{font-size:0.78rem;color:var(--sage);cursor:pointer;font-weight:600;
  background:none;border:none;font-family:'Outfit',sans-serif;}

/* ── GRID ── */
.pet-grid{max-width:1200px;margin:22px auto 0;padding:0 28px 100px;
  display:grid;gap:24px;grid-template-columns:repeat(4,1fr);}
.pet-grid.lv{grid-template-columns:1fr;}
@media(max-width:1100px){.pet-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:680px){.pet-grid{grid-template-columns:1fr;gap:16px;padding:0 16px 80px;}}

/* ── CARD ── */
.pet-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  overflow:hidden;cursor:pointer;position:relative;
  box-shadow:var(--shadow);
  transition:transform 0.4s cubic-bezier(.34,1.56,.64,1),box-shadow 0.35s,border-color 0.3s;
  animation:fadeUp 0.45s ease both;}
.pet-card:hover{transform:translateY(-10px);
  box-shadow:0 24px 60px rgba(61,107,79,0.16);
  border-color:rgba(61,107,79,0.3);}
.pet-card.lv{display:grid;grid-template-columns:260px 1fr;border-radius:16px;}
.pet-card.lv:hover{transform:translateY(-5px);}

/* Image */
.pet-img-wrap{position:relative;overflow:hidden;aspect-ratio:4/3;background:var(--bg2);}
.pet-card.lv .pet-img-wrap{aspect-ratio:unset;min-height:220px;}
.pet-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.55s ease;}
.pet-card:hover .pet-img{transform:scale(1.07);}
.pet-img-overlay{position:absolute;inset:0;
  background:linear-gradient(to top,rgba(30,58,40,0.55) 0%,transparent 55%);
  opacity:0;transition:opacity 0.3s;}
.pet-card:hover .pet-img-overlay{opacity:1;}

/* Badge */
.pet-badge{position:absolute;top:14px;left:14px;padding:4px 12px;border-radius:50px;
  font-family:'Outfit',sans-serif;font-size:0.62rem;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;color:#fff;}
.pet-badge.POPULAR{background:var(--sage);}
.pet-badge.NEW{background:#3ecf8e;}
.pet-badge.PREMIUM{background:#7c5cfc;}
.pet-badge.VERIFIED{background:var(--gold);}

/* Wish */
.pet-wish{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;
  background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);
  border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:1rem;transition:all 0.25s;opacity:0;transform:scale(0.8);}
.pet-card:hover .pet-wish,.pet-wish.on{opacity:1;transform:scale(1);}
.pet-wish:hover{transform:scale(1.2)!important;background:#fff;}

/* Quick view */
.pet-qv{position:absolute;bottom:14px;left:50%;transform:translateX(-50%) translateY(8px);
  background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);
  border:1px solid var(--border);border-radius:50px;
  padding:8px 20px;font-family:'Outfit',sans-serif;font-size:0.75rem;
  font-weight:600;color:var(--sage-d);cursor:pointer;white-space:nowrap;
  opacity:0;transition:0.25s;}
.pet-card:hover .pet-qv{opacity:1;transform:translateX(-50%) translateY(0);}

/* Body */
.pet-body{padding:20px 22px 22px;}
.pet-card.lv .pet-body{padding:24px 28px;display:flex;flex-direction:column;justify-content:center;}
.pet-cat-tag{font-family:'Outfit',sans-serif;font-size:0.68rem;font-weight:700;
  letter-spacing:0.16em;text-transform:uppercase;color:var(--sage);
  margin-bottom:6px;display:flex;align-items:center;gap:5px;}
.pet-cat-tag::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--sage-l);display:inline-block;}
.pet-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;
  color:var(--text);margin:0 0 4px;line-height:1.2;}
.pet-card.lv .pet-name{font-size:1.7rem;}
.pet-meta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px;}
.pet-chip{font-size:0.7rem;font-weight:500;padding:3px 10px;border-radius:50px;
  background:var(--sage-xs);color:var(--sage-d);border:1px solid var(--border);}
.pet-desc{font-size:0.8rem;color:var(--muted);line-height:1.65;margin-bottom:12px;display:none;}
.pet-card.lv .pet-desc{display:block;}
.pet-rat{display:flex;align-items:center;gap:5px;margin-bottom:14px;}
.pet-stars{color:var(--gold);font-size:0.78rem;letter-spacing:1px;}
.pet-revs{font-size:0.7rem;color:var(--dim);}
.pet-price-row{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.pet-price{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;
  color:var(--sage-d);line-height:1;}
.pet-price sup{font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:500;color:var(--muted);}
.pet-btns{display:flex;gap:7px;align-items:center;}

.btn-sage{padding:9px 18px;border-radius:50px;border:none;
  background:var(--sage-l);color:#fff;font-family:'Outfit',sans-serif;
  font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.22s;white-space:nowrap;
  display:flex;align-items:center;gap:5px;
  box-shadow:0 4px 14px rgba(90,148,112,0.35);}
.btn-sage:hover{background:var(--sage);transform:translateY(-1px);box-shadow:0 6px 20px rgba(61,107,79,0.4);}
.btn-sage.ok{background:#10b981;box-shadow:0 4px 14px rgba(16,185,129,0.35);}
.btn-wa{width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border);
  background:var(--sage-xs);cursor:pointer;font-size:14px;transition:0.2s;
  display:flex;align-items:center;justify-content:center;}
.btn-wa:hover{border-color:var(--sage);transform:scale(1.1);}

/* ── SKELETON ── */
.pet-skel{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;}
.pet-skel-img{height:200px;
  background:linear-gradient(90deg,var(--bg2) 25%,var(--bg) 50%,var(--bg2) 75%);
  background-size:200%;animation:shimmer 1.5s ease infinite;}
.pet-skel-body{padding:20px;}
.pet-skel-line{height:12px;border-radius:6px;margin-bottom:10px;
  background:linear-gradient(90deg,var(--bg2) 25%,var(--bg) 50%,var(--bg2) 75%);
  background-size:200%;animation:shimmer 1.5s ease infinite;}
.pet-skel-line.w70{width:70%;}.pet-skel-line.w50{width:50%;}

/* ── EMPTY ── */
.pet-empty{grid-column:1/-1;text-align:center;padding:80px 20px;}
.pet-empty-icon{font-size:64px;display:block;margin-bottom:16px;}
.pet-empty h3{font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:var(--text);margin-bottom:8px;}
.pet-empty p{font-size:0.875rem;color:var(--muted);}

/* ── MODAL ── */
.pet-modal-bg{position:fixed;inset:0;background:rgba(20,40,28,0.75);z-index:9999;
  display:flex;align-items:center;justify-content:center;padding:20px;
  backdrop-filter:blur(12px);animation:fadeUp 0.2s ease;}
.pet-modal{background:var(--surface);border:1px solid var(--border);border-radius:28px;
  max-width:700px;width:100%;max-height:92vh;overflow-y:auto;position:relative;
  box-shadow:0 40px 100px rgba(30,50,35,0.25);animation:scaleIn 0.3s cubic-bezier(.22,1,.36,1);}
.pet-modal-img{width:100%;height:300px;object-fit:cover;display:block;border-radius:28px 28px 0 0;}
.pet-modal-close{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;
  background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);
  border:1px solid var(--border);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;color:var(--text);transition:0.22s;}
.pet-modal-close:hover{transform:rotate(90deg);background:var(--sage-xs);}
.pet-modal-body{padding:28px 32px 36px;}
.pet-modal-name{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;
  color:var(--text);margin:0 0 8px;}
.pet-modal-price{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;
  color:var(--sage-d);margin:0 0 20px;}
.pet-modal-feats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:22px;}
.pet-feat{background:var(--card);border:1px solid var(--border);border-radius:14px;
  padding:14px 16px;font-size:0.82rem;color:var(--muted);}
.pet-feat strong{display:block;font-size:0.8rem;font-weight:700;color:var(--text);margin-bottom:3px;}
.pet-modal-acts{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;}
.pet-modal-cart{flex:1;min-width:140px;padding:14px 22px;
  background:linear-gradient(135deg,var(--sage-l),var(--sage));color:#fff;border:none;
  border-radius:50px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 6px 20px rgba(61,107,79,0.35);transition:0.22s;}
.pet-modal-cart:hover{background:linear-gradient(135deg,var(--sage),var(--sage-d));}
.pet-modal-wa{padding:14px 22px;border-radius:50px;border:1.5px solid var(--border);
  background:var(--sage-xs);font-family:'Outfit',sans-serif;font-size:0.9rem;
  font-weight:600;color:var(--sage);cursor:pointer;display:flex;align-items:center;gap:7px;transition:0.22s;}
.pet-modal-wa:hover{background:var(--sage);color:#fff;border-color:var(--sage);}
.pet-modal-wl{padding:13px 16px;border-radius:50px;border:1.5px solid var(--border);
  background:transparent;font-size:18px;cursor:pointer;transition:0.22s;}
.pet-modal-wl:hover{background:var(--sage-xs);}
.pet-buy-now{width:100%;padding:15px;
  background:linear-gradient(135deg,var(--sage),var(--sage-d));
  color:#fff;border:none;border-radius:50px;font-family:'Outfit',sans-serif;
  font-size:0.95rem;font-weight:700;cursor:pointer;transition:0.22s;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 8px 28px rgba(61,107,79,0.35);}
.pet-buy-now:hover{opacity:0.9;transform:translateY(-2px);}

/* ── TOAST ── */
.pet-toast{position:fixed;bottom:28px;right:28px;z-index:99999;
  background:var(--sage-d);color:#fff;border-radius:50px;
  padding:14px 24px;font-family:'Outfit',sans-serif;font-size:0.875rem;font-weight:500;
  box-shadow:0 8px 32px rgba(30,50,35,0.3);display:flex;align-items:center;gap:10px;
  transform:translateY(80px);opacity:0;transition:all 0.35s cubic-bezier(.34,1.46,.64,1);pointer-events:none;}
.pet-toast.on{transform:translateY(0);opacity:1;}

/* RESPONSIVE */
@media(max-width:768px){
  .pet-hero{padding:70px 16px 100px;}
  .pet-hero-stats{gap:28px;}
  .pet-bar{padding:0 16px;}
  .pet-tabs-wrap,.pet-info,.pet-grid{padding-left:16px;padding-right:16px;}
  .pet-modal-feats{grid-template-columns:1fr;}
  .pet-modal-body{padding:20px 18px 28px;}
  .pet-tab{min-width:120px;padding:14px 18px;}
  .pet-card.lv{grid-template-columns:1fr;}
}
`;

/* ── COMPONENT ────────────────────────────────────────────────── */
export default function Pet() {
  const navigate = useNavigate();
  const [pets,    setPets]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [tab,     setTab]     = useState("All");
  const [sort,    setSort]    = useState("default");
  const [view,    setView]    = useState("grid");
  const [wl,      setWl]      = useState([]);
  const [added,   setAdded]   = useState({});
  const [modal,   setModal]   = useState(null);
  const [toast,   setToast]   = useState({ on:false, msg:"" });

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  // Fetch
  useEffect(() => {
    let done = false;
    const t = setTimeout(() => { if (!done) { done=true; load(DEMO); } }, 3000);
    fetch(API)
      .then(r => { if (!r.ok) throw 0; return r.json(); })
      .then(data => {
        if (done) return; done=true; clearTimeout(t);
        const arr = Array.isArray(data) ? data.filter(p => p?.pname) : [];
        load(arr.length ? arr : DEMO);
      })
      .catch(() => { if (done) return; done=true; clearTimeout(t); load(DEMO); });
    return () => clearTimeout(t);
  }, []);

  function load(src) {
    setPets(src.map((p, i) => {
      const cat = p.cat || guessCategory(p.pname);
      return {
        id: String(p.id||i+1), pname:p.pname||"Pet",
        price: parseInt(p.price)||0, cat,
        age: p.age||"8 weeks", gender:p.gender||null,
        vaccinated: p.vaccinated??true, microchipped:p.microchipped??false,
        rating: p.rating||parseFloat((4.5+((i*7)%5)/10).toFixed(1)),
        reviews: p.reviews||(40+((i*37)%200)),
        badge: p.badge||["POPULAR","NEW","PREMIUM","VERIFIED"][i%4],
        img: (p.image&&String(p.image).trim()) ? p.image : getImg(cat,i),
        desc: p.desc||"A healthy, vaccinated companion ready for a loving home.",
      };
    }));
    setLoading(false);
  }

  const showToast = (msg) => {
    setToast({on:true,msg}); setTimeout(()=>setToast({on:false,msg:""}),3000);
  };
  const toggleWl = (id,e) => { if(e)e.stopPropagation(); setWl(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); };
  const addCart = (pet, e) => {
  if (e) e.stopPropagation();
  if (!localStorage.getItem("islogin")) { navigate("/login"); return; }
  const uid = localStorage.getItem("id");

  // ✅ Pehle UI update karo — user ko instant feedback do
  setAdded(a => ({ ...a, [pet.id]: true }));
  setTimeout(() => setAdded(a => ({ ...a, [pet.id]: false })), 1600);
  showToast("🛒 " + pet.pname + " added to cart!");

  // Background mein DB update karo
  fetch(`http://localhost/Petshop/insert.php?uid=${uid}&pid=${pet.id}`)
    .then(res => res.json())
    .catch(() => {});
};
  
  const buyNow = (pet) => { addCart(pet); setTimeout(()=>navigate("/cart"),300); };
  const waInquiry = (pet,e) => {
    if(e)e.stopPropagation();
    const msg = encodeURIComponent("Hi! I'm interested in *"+pet.pname+"* at ₹"+pet.price.toLocaleString("en-IN")+". Please share details.");
    window.open("https://wa.me/"+WHATSAPP+"?text="+msg,"_blank");
  };

  const catCount = (c) => c==="All" ? pets.length : pets.filter(p=>p.cat===c).length;
  const filtered = pets
    .filter(p=>tab==="All"||p.cat===tab)
    .filter(p=>p.pname.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
      if(sort==="price-asc") return a.price-b.price;
      if(sort==="price-desc") return b.price-a.price;
      if(sort==="rating") return b.rating-a.rating;
      if(sort==="name") return a.pname.localeCompare(b.pname);
      return 0;
    });

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}} />
      <div className="pet-root">
        <Nav />

        {/* HERO */}
        <div className="pet-hero">
          <div className="pet-orb pet-orb1" />
          <div className="pet-orb pet-orb2" />
          <div className="pet-hero-in">
            <div className="label-tag light">🐾 Live Pet Marketplace</div>
            <h1>Find Your Perfect<br /><em>Companion</em></h1>
            <p>Hand-picked, health-certified and vaccinated pets from India's most trusted breeders — delivered to your door.</p>
            <div className="pet-hero-btns">
              <button className="btn-white" onClick={()=>setTab("Dogs")}>Browse Dogs</button>
              <button className="btn-glass" onClick={()=>document.querySelector(".pet-tabs-wrap")?.scrollIntoView({behavior:"smooth"})}>All Categories ↓</button>
            </div>
            <div className="pet-hero-stats">
              {[{num:pets.length?pets.length+"+":"50+",lbl:"Pets Available"},{num:"100%",lbl:"Health Verified"},{num:"4.9★",lbl:"Avg Rating"},{num:"Free",lbl:"Home Delivery"}].map((s,i)=>(
                <div key={i}><span className="pet-stat-num">{s.num}</span><span className="pet-stat-lbl">{s.lbl}</span></div>
              ))}
            </div>
          </div>
          <div className="pet-wave" />
        </div>

        {/* SEARCH */}
        <div className="pet-bar reveal">
          <div className="pet-bar-in">
            <div className="pet-search">
              <span style={{color:"var(--sage)",fontSize:"1rem"}}>🔍</span>
              <input placeholder="Search breed, type..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <select className="pet-sort" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">A → Z</option>
            </select>
            <div className="pet-vbtns">
              <button className={"pet-vbtn"+(view==="grid"?" on":"")} onClick={()=>setView("grid")}>⊞</button>
              <button className={"pet-vbtn"+(view==="list"?" on":"")} onClick={()=>setView("list")}>☰</button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="pet-tabs-wrap reveal">
          <div className="pet-tabs">
            {TABS.map(t=>(
              <button key={t.id} className={"pet-tab"+(tab===t.id?" on":"")} onClick={()=>setTab(t.id)}>
                <span className="pet-tab-icon">{t.icon}</span>
                <div className="pet-tab-info">
                  <span className="pet-tab-label">{t.label}</span>
                  <span className="pet-tab-count">{catCount(t.id)} pets</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="pet-info">
          <span className="pet-info-txt">Showing <strong>{filtered.length}</strong> of <strong>{pets.length}</strong> pets{search&&<> for "<strong>{search}</strong>"</>}</span>
          {(search||tab!=="All")&&<button className="pet-clear" onClick={()=>{setSearch("");setTab("All");}}>Clear ✕</button>}
        </div>

        {/* GRID */}
        <div className={"pet-grid"+(view==="list"?" lv":"")}>
          {loading
            ? Array(8).fill(0).map((_,i)=>(
                <div className="pet-skel" key={i}>
                  <div className="pet-skel-img"/>
                  <div className="pet-skel-body">
                    <div className="pet-skel-line"/><div className="pet-skel-line w70"/><div className="pet-skel-line w50"/>
                  </div>
                </div>
              ))
            : filtered.length===0
            ? (
              <div className="pet-empty">
                <span className="pet-empty-icon">{tab==="Dogs"?"🐕":tab==="Cats"?"🐈":tab==="Birds"?"🦜":tab==="Fish"?"🐠":"🐾"}</span>
                <h3>No {tab==="All"?"pets":tab.toLowerCase()} found</h3>
                <p>Try adjusting your search or category</p>
              </div>
            )
            : filtered.map((pet,i)=>(
              <div key={pet.id} className={"pet-card reveal"+(view==="list"?" lv":"")}
                style={{animationDelay:(i%12)*0.05+"s"}} onClick={()=>setModal(pet)}>
                <div className="pet-img-wrap">
                  <img src={pet.img} alt={pet.pname} className="pet-img"
                    onError={e=>{e.target.onerror=null;e.target.src=getImg(pet.cat,i);}}/>
                  <div className="pet-img-overlay"/>
                  <span className={"pet-badge "+(pet.badge||"POPULAR")}>{pet.badge}</span>
                  <button className={"pet-wish"+(wl.includes(pet.id)?" on":"")} onClick={e=>toggleWl(pet.id,e)}>
                    {wl.includes(pet.id)?"❤️":"🤍"}
                  </button>
                  <button className="pet-qv" onClick={e=>{e.stopPropagation();setModal(pet);}}>View Details →</button>
                </div>
                <div className="pet-body">
                  <div className="pet-cat-tag">{pet.cat}</div>
                  <div className="pet-name">{pet.pname}</div>
                  <div className="pet-meta">
                    <span className="pet-chip">🐣 {pet.age}</span>
                    {pet.gender&&<span className="pet-chip">{pet.gender==="Male"?"♂":"♀"} {pet.gender}</span>}
                    {pet.vaccinated&&<span className="pet-chip">💉 Vaccinated</span>}
                    {pet.microchipped&&<span className="pet-chip">📡 Microchipped</span>}
                  </div>
                  <div className="pet-desc">{pet.desc}</div>
                  <div className="pet-rat">
                    <span className="pet-stars">{stars(pet.rating)}</span>
                    <span className="pet-revs">({pet.reviews} reviews)</span>
                  </div>
                  <div className="pet-price-row">
                    <div className="pet-price"><sup>₹</sup>{pet.price.toLocaleString("en-IN")}</div>
                    <div className="pet-btns">
                      <button className={"btn-sage"+(added[pet.id]?" ok":"")} onClick={e=>addCart(pet,e)}>
                        {added[pet.id]?"✓ Added":"🛒 Add"}
                      </button>
                      <button className="btn-wa" title="WhatsApp" onClick={e=>waInquiry(pet,e)}>💬</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* MODAL */}
        {modal&&(
          <div className="pet-modal-bg" onClick={()=>setModal(null)}>
            <div className="pet-modal" onClick={e=>e.stopPropagation()}>
              <img src={modal.img} alt={modal.pname} className="pet-modal-img"
                onError={e=>{e.target.onerror=null;e.target.src=getImg(modal.cat,0);}}/>
              <button className="pet-modal-close" onClick={()=>setModal(null)}>✕</button>
              <div className="pet-modal-body">
                <div className="pet-cat-tag" style={{marginBottom:8}}>{modal.cat}</div>
                <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:6}}>
                  <div className="pet-modal-name">{modal.pname}</div>
                  <span className={"pet-badge "+(modal.badge||"POPULAR")} style={{position:"static"}}>{modal.badge}</span>
                </div>
                <div className="pet-rat" style={{marginBottom:10}}>
                  <span className="pet-stars">{stars(modal.rating)}</span>
                  <span className="pet-revs">({modal.reviews} reviews)</span>
                </div>
                <div className="pet-modal-price">₹{modal.price.toLocaleString("en-IN")}</div>
                <p style={{fontSize:"0.9rem",color:"var(--muted)",lineHeight:1.75,marginBottom:20}}>{modal.desc} Comes with health certificate, vaccination record & 7-day health guarantee.</p>
                <div className="pet-modal-feats">
                  {[
                    {label:"Health Status", val:"✅ Vaccinated & Certified"},
                    {label:"Delivery",      val:"🚚 Free Pan India"},
                    {label:"Age",           val:"🐣 "+modal.age+" old"},
                    {label:"Gender",        val:modal.gender?(modal.gender==="Male"?"♂ Male":"♀ Female"):"—"},
                    {label:"Microchipped",  val:modal.microchipped?"📡 Yes":"Not yet"},
                    {label:"Guarantee",     val:"🛡️ 7-day Health Cover"},
                  ].map((f,i)=>(
                    <div className="pet-feat" key={i}><strong>{f.label}</strong>{f.val}</div>
                  ))}
                </div>
                <div className="pet-modal-acts">
                  <button className="pet-modal-cart" onClick={()=>{addCart(modal);setModal(null);}}>🛒 Add to Cart — ₹{modal.price.toLocaleString("en-IN")}</button>
                  <button className="pet-modal-wa" onClick={e=>waInquiry(modal,e)}>💬 WhatsApp</button>
                  <button className="pet-modal-wl" onClick={e=>toggleWl(modal.id,e)}>{wl.includes(modal.id)?"❤️":"🤍"}</button>
                </div>
                <button className="pet-buy-now" onClick={()=>{setModal(null);buyNow(modal);}}>⚡ Buy Now</button>
              </div>
            </div>
          </div>
        )}

        <div className={"pet-toast"+(toast.on?" on":"")}>{toast.msg}</div>
      </div>
    </>
  );
}