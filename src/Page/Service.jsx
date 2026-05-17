import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nev";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:      #f4f1eb;
    --bg2:     #ede8de;
    --surface: #ffffff;
    --card:    #faf8f4;
    --sage:    #3d6b4f;
    --sage-d:  #2a4e39;
    --sage-l:  #5a9470;
    --sage-xs: rgba(61,107,79,0.09);
    --sage-sm: rgba(61,107,79,0.18);
    --gold:    #b8922a;
    --gold-l:  #d4ac48;
    --gold-xs: rgba(184,146,42,0.12);
    --border:  rgba(61,107,79,0.13);
    --text:    #1c2b22;
    --text2:   #3a4a3f;
    --muted:   #7a907f;
    --dim:     #aab8ac;
    --ivory:   #fdf9f2;
    --shadow:  0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
    --radius:  20px;
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:var(--sage); border-radius:10px; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
  @keyframes slideL  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:none} }
  @keyframes orbDrift{ 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(61,107,79,0.35)} 50%{box-shadow:0 0 0 14px rgba(61,107,79,0)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-l { opacity:0; transform:translateX(-24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal-l.visible { opacity:1; transform:none; }

  /* ══ HERO ══ */
  .sv-hero {
    min-height: 58vh;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(160deg,#1e3a28 0%,#2a5a3c 50%,#1a4030 100%);
    padding: 130px 64px 90px;
  }
  .sv-hero-noise {
    position:absolute; inset:0; pointer-events:none; opacity:0.035;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .sv-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px); }
  .sv-orb-1 { width:700px;height:700px; background:radial-gradient(circle,rgba(90,148,112,0.28),transparent 65%); top:-250px;right:-150px; animation:orbDrift 10s ease-in-out infinite; }
  .sv-orb-2 { width:500px;height:500px; background:radial-gradient(circle,rgba(184,146,42,0.16),transparent 65%); bottom:-100px;left:-80px; animation:orbDrift 13s ease-in-out infinite reverse; }

  .sv-hero-inner { position:relative; z-index:2; max-width:1320px; margin:0 auto; width:100%; }
  .sv-hero-chip {
    display:inline-flex; align-items:center; gap:10px;
    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18);
    border-radius:50px; padding:8px 22px;
    font-size:0.72rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;
    color:rgba(255,255,255,0.75); margin-bottom:24px;
    animation:fadeUp 0.5s ease both; backdrop-filter:blur(10px);
  }
  .sv-hero-dot { width:7px;height:7px;background:#5a9470;border-radius:50%;animation:pulse 2s infinite; }
  .sv-hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(3.2rem,6vw,6rem); line-height:0.92; font-weight:700;
    color:#fff; margin-bottom:22px; animation:fadeUp 0.55s 0.1s ease both;
    letter-spacing:-0.01em;
  }
  .sv-hero-title em { font-style:italic; color:var(--gold-l); }
  .sv-hero-sub {
    font-size:1.05rem; color:rgba(255,255,255,0.48); line-height:1.8;
    max-width:560px; animation:fadeUp 0.55s 0.2s ease both; margin-bottom:40px;
  }
  .sv-hero-stats {
    display:flex; gap:40px; animation:fadeUp 0.55s 0.3s ease both; flex-wrap:wrap;
  }
  .sv-hero-stat-num {
    font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:700;
    color:#fff; line-height:1;
  }
  .sv-hero-stat-label { font-size:0.75rem; color:rgba(255,255,255,0.45); font-weight:500; margin-top:3px; text-transform:uppercase; letter-spacing:0.1em; }

  /* ══ WRAP ══ */
  .sv-wrap { max-width:1320px; margin:0 auto; padding:0 64px; }

  /* ══ LABEL TAG ══ */
  .label-tag { font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--sage);display:flex;align-items:center;gap:8px;margin-bottom:10px; }
  .label-tag::before { content:'';width:24px;height:2px;background:var(--sage);border-radius:2px; }
  .label-tag-gold { color:var(--gold-l); }
  .label-tag-gold::before { background:var(--gold-l); }

  /* ══ CATEGORY TABS ══ */
  .sv-tabs-section { background:var(--bg); padding:60px 0 0; }
  .sv-tabs-header { text-align:center; margin-bottom:48px; }
  .sv-tabs-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4vw,3.2rem); font-weight:700; color:var(--text); margin-bottom:12px; line-height:1.1; }
  .sv-tabs-sub { font-size:0.95rem; color:var(--muted); max-width:520px; margin:0 auto; line-height:1.75; }

  .sv-tabs { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:0; }
  .sv-tab {
    display:flex; align-items:center; gap:10px;
    padding:14px 28px; border-radius:50px;
    border:1.5px solid var(--border);
    background:var(--surface); cursor:pointer;
    font-family:'Outfit',sans-serif; font-size:0.88rem; font-weight:600;
    color:var(--muted); transition:all 0.28s;
  }
  .sv-tab:hover { border-color:rgba(61,107,79,0.35); color:var(--sage); background:var(--sage-xs); transform:translateY(-2px); box-shadow:var(--shadow); }
  .sv-tab.active { background:var(--sage); color:#fff; border-color:var(--sage); box-shadow:0 8px 28px rgba(61,107,79,0.32); transform:translateY(-2px); }
  .sv-tab-icon { font-size:1.2rem; }
  .sv-tab-count { background:rgba(255,255,255,0.22); border-radius:20px; padding:2px 8px; font-size:0.7rem; font-weight:700; }
  .sv-tab.active .sv-tab-count { background:rgba(255,255,255,0.25); }
  .sv-tab:not(.active) .sv-tab-count { background:var(--sage-xs); color:var(--sage); }

  /* ══ SERVICE GRID ══ */
  .sv-grid-section { background:var(--bg); padding:48px 0 80px; }
  .sv-grid {
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:24px;
  }

  /* ── SERVICE CARD ── */
  .sv-card {
    background:var(--surface);
    border:1px solid var(--border);
    border-radius:var(--radius);
    overflow:hidden;
    transition:all 0.45s cubic-bezier(.34,1.56,.64,1);
    cursor:pointer;
    position:relative;
  }
  .sv-card:hover {
    transform:translateY(-10px);
    box-shadow:0 20px 60px rgba(30,50,35,0.14);
    border-color:rgba(61,107,79,0.3);
  }
  .sv-card-img-wrap {
    position:relative; overflow:hidden; height:220px;
  }
  .sv-card-img {
    width:100%; height:100%; object-fit:cover;
    transition:transform 0.6s ease;
  }
  .sv-card:hover .sv-card-img { transform:scale(1.07); }
  .sv-card-badge {
    position:absolute; top:14px; left:14px;
    padding:5px 12px; border-radius:50px;
    font-size:0.68rem; font-weight:700; color:#fff;
    letter-spacing:0.08em; text-transform:uppercase;
    backdrop-filter:blur(8px);
  }
  .sv-card-badge-popular { background:var(--sage); }
  .sv-card-badge-premium { background:#7c5cfc; }
  .sv-card-badge-new     { background:#3ecf8e; }
  .sv-card-badge-care    { background:var(--gold); }

  .sv-card-body { padding:24px 26px 26px; }
  .sv-card-icon { font-size:2rem; margin-bottom:12px; display:block; }
  .sv-card-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:700; color:var(--text); margin-bottom:8px; line-height:1.2; }
  .sv-card-desc { font-size:0.84rem; color:var(--muted); line-height:1.75; margin-bottom:18px; }
  .sv-card-features { list-style:none; margin-bottom:20px; display:flex; flex-direction:column; gap:6px; }
  .sv-card-features li { display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--text2); font-weight:500; }
  .sv-card-features li::before { content:'✓'; color:var(--sage-l); font-weight:700; font-size:0.85rem; }
  .sv-card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:16px; border-top:1px solid var(--border); }
  .sv-card-price { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:700; color:var(--sage-d); }
  .sv-card-price span { font-family:'Outfit',sans-serif; font-size:0.72rem; color:var(--muted); font-weight:400; margin-left:2px; }
  .sv-card-btn {
    padding:9px 20px; border-radius:50px;
    background:var(--sage-l); color:#fff;
    border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-size:0.8rem; font-weight:700;
    transition:all 0.25s; box-shadow:0 4px 14px rgba(61,107,79,0.28);
  }
  .sv-card-btn:hover { background:var(--sage-d); transform:translateY(-1px); box-shadow:0 8px 22px rgba(61,107,79,0.38); }

  /* ══ WHY US ══ */
  .sv-why-section { background:var(--bg2); padding:80px 0; border-top:1px solid var(--border); }
  .sv-why-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
  .sv-why-card {
    background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
    padding:30px 26px; text-align:center;
    transition:all 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .sv-why-card:hover { transform:translateY(-8px); box-shadow:var(--shadow-lg); border-color:rgba(61,107,79,0.28); }
  .sv-why-icon { font-size:2.4rem; margin-bottom:14px; display:block; }
  .sv-why-title { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:var(--text); margin-bottom:8px; }
  .sv-why-desc { font-size:0.82rem; color:var(--muted); line-height:1.75; }

  /* ══ CTA BANNER ══ */
  .sv-cta-section {
    background:linear-gradient(160deg,#1e3a28 0%,#2a5a3c 55%,#1a4030 100%);
    padding:80px 64px; text-align:center; position:relative; overflow:hidden;
  }
  .sv-cta-section::before {
    content:''; position:absolute; inset:0; pointer-events:none; opacity:0.03;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .sv-cta-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(90px); }
  .sv-cta-orb-1 { width:500px;height:500px; background:radial-gradient(circle,rgba(90,148,112,0.25),transparent 65%); top:-180px;right:-100px; animation:orbDrift 10s ease-in-out infinite; }
  .sv-cta-orb-2 { width:400px;height:400px; background:radial-gradient(circle,rgba(184,146,42,0.15),transparent 65%); bottom:-100px;left:-60px; animation:orbDrift 13s ease-in-out infinite reverse; }
  .sv-cta-inner { position:relative; z-index:2; }
  .sv-cta-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4vw,3.5rem); font-weight:700; color:#fff; margin-bottom:14px; line-height:1.1; }
  .sv-cta-title em { font-style:italic; color:var(--gold-l); }
  .sv-cta-sub { font-size:1rem; color:rgba(255,255,255,0.5); max-width:520px; margin:0 auto 36px; line-height:1.8; }
  .sv-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .sv-btn-white { padding:14px 34px; border-radius:50px; background:#fff; color:var(--sage-d); border:none; cursor:pointer; font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; transition:all 0.25s; box-shadow:0 8px 28px rgba(0,0,0,0.18); }
  .sv-btn-white:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(0,0,0,0.25); }
  .sv-btn-glass { padding:14px 34px; border-radius:50px; background:rgba(255,255,255,0.1); color:#fff; border:1.5px solid rgba(255,255,255,0.25); cursor:pointer; font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; transition:all 0.25s; backdrop-filter:blur(8px); }
  .sv-btn-glass:hover { background:rgba(255,255,255,0.18); transform:translateY(-2px); }

  /* ══ INFO BAR ══ */
  .sv-info-bar { background:var(--ivory); border-top:1px solid var(--border); padding:40px 0; }
  .sv-info-bar-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .sv-info-item { display:flex; align-items:center; gap:16px; }
  .sv-info-icon-box { width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--sage-l),var(--sage-d));display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;box-shadow:0 6px 18px rgba(61,107,79,0.25); }
  .sv-info-text-title { font-weight:700; color:var(--text); font-size:0.88rem; margin-bottom:2px; }
  .sv-info-text-sub { font-size:0.78rem; color:var(--muted); }

  /* ══ RESPONSIVE ══ */
  @media(max-width:1100px){
    .sv-grid { grid-template-columns:repeat(2,1fr); }
    .sv-why-grid { grid-template-columns:repeat(2,1fr); }
    .sv-wrap { padding:0 36px; }
    .sv-hero { padding:110px 36px 80px; }
    .sv-info-bar-grid { grid-template-columns:1fr; gap:16px; }
  }
  @media(max-width:680px){
    .sv-grid { grid-template-columns:1fr; }
    .sv-why-grid { grid-template-columns:1fr; }
    .sv-wrap { padding:0 20px; }
    .sv-hero { padding:100px 20px 70px; }
    .sv-tabs { gap:8px; }
    .sv-tab { padding:10px 18px; font-size:0.8rem; }
    .sv-cta-section { padding:60px 20px; }
    .sv-hero-stats { gap:24px; }
  }
`;

/* ══════════════════════════════════════
   SERVICE DATA — Category wise
══════════════════════════════════════ */
const ALL_SERVICES = {
  dogs: [
    {
      icon: "🐕",
      badge: "popular",
      badgeText: "Popular",
      title: "Dog Grooming & Spa",
      desc: "Full-body luxury grooming session including bath, blow-dry, haircut, nail trimming, ear cleaning, and teeth brushing for your furry best friend.",
      features: ["Breed-specific styling", "Medicated shampoo", "Deodorizing treatment", "Bow & bandana finish"],
      price: "₹799",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    },
    {
      icon: "🩺",
      badge: "care",
      badgeText: "Healthcare",
      title: "Dog Vaccination & Checkup",
      desc: "Comprehensive health examination with vaccination schedule management, deworming, flea & tick prevention by our certified veterinarians.",
      features: ["Full body checkup", "Core vaccines available", "Deworming & tick care", "Health certificate issued"],
      price: "₹499",
      per: "/ visit",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    },
    {
      icon: "🏡",
      badge: "premium",
      badgeText: "Premium",
      title: "Dog Boarding & Hotel",
      desc: "Luxury overnight stay for your dog with individual cozy kennels, outdoor play area, meals, and 24/7 supervised care while you're away.",
      features: ["Private cozy kennel", "3 meals per day", "Outdoor play sessions", "Daily update photos"],
      price: "₹599",
      per: "/ night",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    },
    {
      icon: "🎓",
      badge: "new",
      badgeText: "New",
      title: "Dog Training Classes",
      desc: "Professional obedience training with certified trainers. From basic commands to advanced tricks, we make learning fun and rewarding for your dog.",
      features: ["Basic obedience training", "Puppy socialization", "Behavioral correction", "Fun tricks & agility"],
      price: "₹1,299",
      per: "/ month",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    },
    {
      icon: "🚿",
      badge: "popular",
      badgeText: "Popular",
      title: "Dog Bath & Dry",
      desc: "Quick refreshing bath with premium pet-safe shampoo, blow dry, and basic brush-out. Perfect for regular maintenance between full grooming sessions.",
      features: ["Premium shampoo & conditioner", "High-velocity blow dry", "Brush-out & detangling", "Ear cleaning included"],
      price: "₹399",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    },
    {
      icon: "🚑",
      badge: "care",
      badgeText: "Emergency",
      title: "24/7 Dog Emergency Care",
      desc: "Round-the-clock emergency veterinary services for your dog. Accidents don't wait — neither do we. Immediate care when your pet needs it most.",
      features: ["24/7 availability", "Emergency surgery", "ICU monitoring", "Ambulance support"],
      price: "₹999",
      per: "/ consultation",
      img: "https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=600&q=80",
    },
  ],

  cats: [
    {
      icon: "🐱",
      badge: "popular",
      badgeText: "Popular",
      title: "Cat Grooming & Styling",
      desc: "Specialized cat grooming with gentle handling, lion cut or breed-specific trims, soft shampoo, blow dry, and nail clipping for your feline beauty.",
      features: ["Stress-free handling", "De-shedding treatment", "Nail clipping & filing", "Perfume & bow finish"],
      price: "₹699",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    },
    {
      icon: "🩺",
      badge: "care",
      badgeText: "Healthcare",
      title: "Cat Vaccination & Wellness",
      desc: "Complete feline healthcare with FVRCP & rabies vaccinations, parasite control, and comprehensive wellness checks by our cat-specialist vets.",
      features: ["FVRCP core vaccines", "Rabies vaccination", "Flea & tick prevention", "Dental health check"],
      price: "₹449",
      per: "/ visit",
      img: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=600&q=80",
    },
    {
      icon: "🏡",
      badge: "premium",
      badgeText: "Premium",
      title: "Cat Boarding Retreat",
      desc: "Private luxury cat suites with climbing trees, window views, interactive toys, and personalized attention. Your cat will feel at home away from home.",
      features: ["Private luxury suite", "Climbing trees & toys", "Window perch views", "Pheromone diffusers"],
      price: "₹499",
      per: "/ night",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
    },
    {
      icon: "💉",
      badge: "care",
      badgeText: "Healthcare",
      title: "Cat Sterilization & Neuter",
      desc: "Safe and professional spay/neuter surgery performed by experienced veterinarians with full pre-op checks, anesthesia monitoring, and post-op care.",
      features: ["Pre-surgery blood test", "Safe anesthesia", "Post-op pain management", "Recovery monitoring"],
      price: "₹2,999",
      per: "/ procedure",
      img: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=600&q=80",
    },
    {
      icon: "🧴",
      badge: "new",
      badgeText: "New",
      title: "Cat Skin & Coat Treatment",
      desc: "Specialized dermatology treatment for cats with skin allergies, dandruff, or coat issues. Includes medicated bath, oatmeal soak, and conditioning mask.",
      features: ["Skin allergy treatment", "Medicated shampoo", "Oatmeal soothing soak", "Coat conditioning mask"],
      price: "₹849",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=80",
    },
    {
      icon: "🚑",
      badge: "care",
      badgeText: "Emergency",
      title: "Cat Emergency & ICU",
      desc: "Specialized feline emergency unit with 24/7 monitoring, oxygen therapy, fluid therapy, and immediate diagnostic services for critical cases.",
      features: ["24/7 feline ICU", "Oxygen & fluid therapy", "Emergency diagnostics", "Specialist on call"],
      price: "₹899",
      per: "/ consultation",
      img: "https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=600&q=80",
    },
  ],

  birds: [
    {
      icon: "🦜",
      badge: "popular",
      badgeText: "Popular",
      title: "Bird Wing & Nail Clipping",
      desc: "Safe and stress-minimized wing trimming and nail clipping for parrots, cockatiels, and all pet birds. Done by avian handling specialists.",
      features: ["Painless wing trim", "Nail filing & clipping", "Beak check & shaping", "Post-trim behavior check"],
      price: "₹299",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    },
    {
      icon: "🩺",
      badge: "care",
      badgeText: "Healthcare",
      title: "Avian Health Checkup",
      desc: "Full-spectrum bird health examination including feather condition, respiratory health, weight, diet assessment, and parasite checks by avian vets.",
      features: ["Feather & skin exam", "Respiratory check", "Weight & diet review", "Parasite screening"],
      price: "₹399",
      per: "/ visit",
      img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80",
    },
    {
      icon: "🏡",
      badge: "premium",
      badgeText: "Premium",
      title: "Bird Boarding & Aviary",
      desc: "Spacious individual aviaries with natural perches, species-appropriate diet, UV lighting, and daily social interaction for your birds while you travel.",
      features: ["Individual aviary cage", "Species-specific diet", "UV lighting & enrichment", "Daily interaction time"],
      price: "₹349",
      per: "/ night",
      img: "https://images.unsplash.com/photo-1590767950092-42b8362368da?w=600&q=80",
    },
    {
      icon: "🎓",
      badge: "new",
      badgeText: "New",
      title: "Parrot Speech Training",
      desc: "Specialized speech and trick training sessions for parrots and talking birds. Our certified trainers use positive reinforcement methods for best results.",
      features: ["Basic word teaching", "Trick training", "Positive reinforcement", "Recorded progress videos"],
      price: "₹999",
      per: "/ month",
      img: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=600&q=80",
    },
    {
      icon: "🌿",
      badge: "care",
      badgeText: "Nutrition",
      title: "Bird Diet & Nutrition Consult",
      desc: "Personalized nutrition planning and diet consultation for your bird species. Includes seed mix preparation, supplement advice, and feeding schedule.",
      features: ["Species-specific diet plan", "Custom seed & pellet mix", "Supplement guidance", "Feeding schedule chart"],
      price: "₹449",
      per: "/ consultation",
      img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    },
    {
      icon: "🚑",
      badge: "care",
      badgeText: "Emergency",
      title: "Avian Emergency Care",
      desc: "Immediate emergency care for birds with specialized avian equipment, oxygen support, and experienced avian veterinarians available on priority call.",
      features: ["Priority avian vet", "Oxygen support unit", "Emergency crop treatment", "24hr monitoring"],
      price: "₹799",
      per: "/ consultation",
      img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80",
    },
  ],

  fish: [
    {
      icon: "🐠",
      badge: "popular",
      badgeText: "Popular",
      title: "Aquarium Deep Cleaning",
      desc: "Professional full aquarium cleaning service including substrate vacuuming, algae removal, glass scrubbing, filter cleaning, and water parameter testing.",
      features: ["Full substrate vacuum", "Algae scrubbing & removal", "Filter media cleaning", "Water parameter test"],
      price: "₹599",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&q=80",
    },
    {
      icon: "💧",
      badge: "care",
      badgeText: "Maintenance",
      title: "Water Quality Management",
      desc: "Regular water change, pH balancing, ammonia & nitrite testing, and chemical treatment to maintain the perfect aquatic environment for your fish.",
      features: ["25-30% water change", "pH & ammonia testing", "Chemical balancing", "Water conditioner added"],
      price: "₹399",
      per: "/ visit",
      img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
    },
    {
      icon: "🏠",
      badge: "premium",
      badgeText: "Premium",
      title: "Aquarium Setup & Design",
      desc: "Complete custom aquarium setup from scratch — tank selection, substrate layering, plant & décor arrangement, cycling, and stocking recommendations.",
      features: ["Custom tank design", "Live plant arrangement", "Substrate & décor setup", "Nitrogen cycle guidance"],
      price: "₹2,499",
      per: "/ setup",
      img: "https://images.unsplash.com/photo-1520637836993-5c1e87f7767d?w=600&q=80",
    },
    {
      icon: "🩺",
      badge: "care",
      badgeText: "Healthcare",
      title: "Fish Disease Treatment",
      desc: "Expert diagnosis and treatment of common fish diseases like Ich, fin rot, velvet, and bacterial infections with proper medication and quarantine protocols.",
      features: ["Disease identification", "Medication treatment", "Quarantine tank setup", "Recovery monitoring"],
      price: "₹499",
      per: "/ treatment",
      img: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&q=80",
    },
    {
      icon: "🌱",
      badge: "new",
      badgeText: "New",
      title: "Live Plant Care & Aquascaping",
      desc: "Specialized live plant maintenance including trimming, fertilization dosing, CO2 system setup, and aquascaping redesign for planted tank enthusiasts.",
      features: ["Plant trimming & pruning", "Fertilizer dosing plan", "CO2 system check", "Aquascape redesign"],
      price: "₹799",
      per: "/ session",
      img: "https://images.unsplash.com/photo-1520637836993-5c1e87f7767d?w=600&q=80",
    },
    {
      icon: "🔧",
      badge: "care",
      badgeText: "Maintenance",
      title: "Filter & Equipment Service",
      desc: "Complete maintenance of aquarium filters, pumps, heaters, UV sterilizers, and protein skimmers. Includes inspection, cleaning, and performance check.",
      features: ["Filter deep clean", "Pump & heater check", "UV sterilizer service", "Equipment efficiency test"],
      price: "₹449",
      per: "/ service",
      img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
    },
  ],
};

const CATEGORIES = [
  { key: "dogs",  label: "Dogs",  icon: "🐕", count: 6 },
  { key: "cats",  label: "Cats",  icon: "🐱", count: 6 },
  { key: "birds", label: "Birds", icon: "🦜", count: 6 },
  { key: "fish",  label: "Fish & Aquarium", icon: "🐠", count: 6 },
];

const WHY_US = [
  { icon: "🏥", title: "Expert Vets On-Site", desc: "Our in-house veterinarians are available 6 days a week for checkups, treatments, and emergency care." },
  { icon: "❤️", title: "Pet-First Approach", desc: "Every service is designed with your pet's comfort and well-being at the center. No stress, no shortcuts." },
  { icon: "✅", title: "Certified & Safe", desc: "All groomers and trainers are certified professionals. We use only pet-safe, vet-approved products." },
  { icon: "📱", title: "Real-Time Updates", desc: "Get live photos and updates during every service. Your peace of mind is as important as your pet's comfort." },
];

export default function Service() {
  const [activeTab, setActiveTab] = useState("dogs");
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal,.reveal-l").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab]);

  const services = ALL_SERVICES[activeTab] || [];
  const badgeClass = (b) => ({ popular:"sv-card-badge-popular", premium:"sv-card-badge-premium", new:"sv-card-badge-new", care:"sv-card-badge-care" }[b] || "sv-card-badge-popular");

  return (
    <>
      <style>{STYLES}</style>
      <Nav />

      {/* ══ HERO ══ */}
      <section className="sv-hero">
        <div className="sv-hero-noise" />
        <div className="sv-orb sv-orb-1" />
        <div className="sv-orb sv-orb-2" />
        <div className="sv-hero-inner">
          <div className="sv-hero-chip">
            <span className="sv-hero-dot" />
            Premium Pet Care Services
          </div>
          <h1 className="sv-hero-title">
            Every Pet Deserves<br/>the <em>Best Care</em>
          </h1>
          <p className="sv-hero-sub">
            From luxury grooming and expert veterinary care to professional training and boarding —
            we offer everything your beloved pet needs, all under one roof.
          </p>
          <div className="sv-hero-stats">
            {[["500+","Happy Pets Served"],["15+","Expert Professionals"],["6","Service Categories"],["24/7","Emergency Support"]].map(([num,label],i)=>(
              <div key={i}>
                <div className="sv-hero-stat-num">{num}</div>
                <div className="sv-hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORY TABS + SERVICES ══ */}
      <section className="sv-tabs-section">
        <div className="sv-wrap">
          <div className="sv-tabs-header reveal">
            <div className="label-tag" style={{justifyContent:"center"}}>Our Services</div>
            <h2 className="sv-tabs-title">Choose Your Pet's Category</h2>
            <p className="sv-tabs-sub">Dedicated services crafted specifically for each type of pet. Select a category to explore all available services.</p>
          </div>
          <div className="sv-tabs reveal">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`sv-tab${activeTab===cat.key?" active":""}`}
                onClick={()=>setActiveTab(cat.key)}
              >
                <span className="sv-tab-icon">{cat.icon}</span>
                {cat.label}
                <span className="sv-tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICE GRID ══ */}
      <section className="sv-grid-section">
        <div className="sv-wrap">
          <div className="sv-grid">
            {services.map((svc, i) => (
              <div className="sv-card reveal" key={i} style={{animationDelay:`${i*0.07}s`}}>
                <div className="sv-card-img-wrap">
                  <img className="sv-card-img" src={svc.img} alt={svc.title} loading="lazy" />
                  <span className={`sv-card-badge ${badgeClass(svc.badge)}`}>{svc.badgeText}</span>
                </div>
                <div className="sv-card-body">
                  <span className="sv-card-icon">{svc.icon}</span>
                  <div className="sv-card-title">{svc.title}</div>
                  <p className="sv-card-desc">{svc.desc}</p>
                  <ul className="sv-card-features">
                    {svc.features.map((f,j)=><li key={j}>{f}</li>)}
                  </ul>
                  <div className="sv-card-footer">
                    <div className="sv-card-price">
                      {svc.price}<span>{svc.per}</span>
                    </div>
                    <button
                      className="sv-card-btn"
                      onClick={() => navigate('/contact')}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="sv-why-section">
        <div className="sv-wrap">
          <div style={{textAlign:"center"}} className="reveal">
            <div className="label-tag" style={{justifyContent:"center"}}>Why Petology</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,2.8rem)",fontWeight:700,color:"var(--text)",marginBottom:10,lineHeight:1.1}}>
              The Standard You & Your Pet Deserve
            </h2>
            <p style={{color:"var(--muted)",fontSize:"0.92rem",maxWidth:500,margin:"0 auto",lineHeight:1.8}}>
              We don't just offer services — we build relationships with every pet family that walks through our doors.
            </p>
          </div>
          <div className="sv-why-grid">
            {WHY_US.map((w,i)=>(
              <div className="sv-why-card reveal" key={i}>
                <span className="sv-why-icon">{w.icon}</span>
                <div className="sv-why-title">{w.title}</div>
                <p className="sv-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sv-cta-section">
        <div className="sv-cta-orb sv-cta-orb-1" />
        <div className="sv-cta-orb sv-cta-orb-2" />
        <div className="sv-cta-inner reveal">
          <div className="label-tag label-tag-gold" style={{justifyContent:"center",marginBottom:16}}>Book a Service</div>
          <h2 className="sv-cta-title">
            Ready to Pamper<br/>Your <em>Beloved Pet?</em>
          </h2>
          <p className="sv-cta-sub">
            Book any service in under 2 minutes. WhatsApp us for instant confirmation or
            fill our contact form and our team will reach you within the hour.
          </p>
          <div className="sv-cta-btns">
            <button
              className="sv-btn-white"
              onClick={() => window.open("https://wa.me/919409335704?text=Hi Petology! I want to book a pet service.", "_blank")}
            >
              💬 WhatsApp to Book
            </button>
            <button className="sv-btn-glass" onClick={() => navigate('/contact')}>
              📝 Contact Form →
            </button>
          </div>
        </div>
      </section>

      {/* ══ INFO BAR ══ */}
      <section className="sv-info-bar">
        <div className="sv-wrap">
          <div className="sv-info-bar-grid">
            {[
              {icon:"📍",title:"Visit Our Store",sub:"Shop No. 12, Pet Paradise Complex, Ring Road, Surat"},
              {icon:"📞",title:"Call Us Anytime",sub:"+91 9409335704 · Mon–Sat 9AM–7PM"},
              {icon:"✉️",title:"Email Support",sub:"dharmesh.220180107013@gmail.com"},
            ].map((item,i)=>(
              <div className="sv-info-item reveal" key={i}>
                <div className="sv-info-icon-box">{item.icon}</div>
                <div>
                  <div className="sv-info-text-title">{item.title}</div>
                  <div className="sv-info-text-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}