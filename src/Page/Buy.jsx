import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nev";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    pet: "Golden Retriever owner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    text: "Petology se maine apna Bruno liya. Bilkul healthy aur active pilla tha. Unka care aur support amazing hai — delivery ke baad bhi follow-up kiya. Sach mein best pet shop!",
    rating: 5,
    petEmoji: "🐶",
  },
  {
    name: "Arjun Mehta",
    city: "Bengaluru",
    pet: "Persian Cat owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    text: "Meri billi Whiskers ko yahan se liya — doctors ne full health checkup karke diya. Price fair tha aur packing bhi bahut caring thi. Highly recommend!",
    rating: 5,
    petEmoji: "🐱",
  },
  {
    name: "Sneha Patel",
    city: "Ahmedabad",
    pet: "Cockatiel owner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    text: "Birds section bahut acha hai! Maine ek Cockatiel liya — bilkul playful aur trained tha. Staff ne care tips bhi detail mein bataye. 5 stars!",
    rating: 5,
    petEmoji: "🐦",
  },
  {
    name: "Rohan Kapoor",
    city: "Delhi",
    pet: "Goldfish owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    text: "Fish section mein itni variety! Mere aquarium ke liye perfect Goldfish pair mila. Packaging waterproof thi aur fish bilkul safe paucha. Zabardast!",
    rating: 5,
    petEmoji: "🐟",
  },
];

const petCategories = [
  {
    name: "Dogs",
    emoji: "🐶",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    breeds: ["Golden Retriever", "Labrador", "Pomeranian", "Beagle", "Husky"],
    badge: "MOST POPULAR",
    badgeColor: "#3d6b4f",
    desc: "Loyal, playful aur loving companions. India ke sabse pasandida pet!",
    price: "₹8,000 se shuru",
  },
  {
    name: "Cats",
    emoji: "🐱",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    breeds: ["Persian", "British Shorthair", "Maine Coon", "Siamese", "Ragdoll"],
    badge: "PREMIUM",
    badgeColor: "#7c5cfc",
    desc: "Elegant, independent aur pyaar karne wale feline dost!",
    price: "₹5,000 se shuru",
  },
  {
    name: "Birds",
    emoji: "🐦",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    breeds: ["Cockatiel", "Budgerigar", "Love Bird", "Macaw", "African Grey"],
    badge: "NEW ARRIVALS",
    badgeColor: "#3ecf8e",
    desc: "Colorful, cheerful aur singing companions — ghar ko khushiyon se bhar dein!",
    price: "₹1,500 se shuru",
  },
  {
    name: "Fish",
    emoji: "🐟",
    img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80",
    breeds: ["Goldfish", "Betta", "Guppy", "Koi", "Angelfish"],
    badge: "STRESS-FREE",
    badgeColor: "#b8922a",
    desc: "Peaceful, beautiful aur low-maintenance aquatic friends for every home!",
    price: "₹200 se shuru",
  },
];

const stats = [
  { icon: "🐾", value: "2,400+", label: "Pets Adopted" },
  { icon: "😊", value: "98%", label: "Happy Customers" },
  { icon: "🏥", value: "Vet Certified", label: "Every Pet" },
  { icon: "🚚", value: "Pan India", label: "Safe Delivery" },
];

const whyUs = [
  { icon: "🩺", title: "Vet Certified", desc: "Har pet ko certified veterinarian se health check karaya jaata hai adopt karne se pehle." },
  { icon: "🛡️", title: "Health Guarantee", desc: "Purchase ke 30 din tak health guarantee. Koi bhi issue ho, hum zimmedaar hain." },
  { icon: "🚚", title: "Safe Delivery", desc: "AC-equipped, pet-friendly vehicles mein careful doorstep delivery across India." },
  { icon: "📞", title: "Lifetime Support", desc: "Expert team se 24/7 free advice aur support — adoption ke baad bhi, hamesha." },
];

export default function Buy() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="buy-page">
      <style>{`
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
          --shadow:    0 4px 24px rgba(30,50,35,0.08);
          --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
          --radius:    20px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 10px; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-28px) scale(1.07)} 70%{transform:translate(-18px,18px) scale(0.96)} }
        @keyframes shimmerSlide { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pawBounce { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-8px) rotate(5deg)} }

        .reveal { opacity:0; transform:translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity:1; transform:none; }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        .buy-page {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Outfit', sans-serif;
          color: var(--text);
        }

        /* ═══════════════════════════════
           HERO
        ═══════════════════════════════ */
        .buy-hero {
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          min-height: 88vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-img {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=25') center/cover;
          opacity: 0.1;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-orb-1 { width:500px; height:500px; top:-120px; right:-80px; background:radial-gradient(circle,rgba(90,148,112,0.2),transparent 70%); animation:orbDrift 12s ease-in-out infinite; }
        .hero-orb-2 { width:300px; height:300px; bottom:-60px; left:5%; background:radial-gradient(circle,rgba(184,146,42,0.15),transparent 70%); animation:floatY 8s ease-in-out infinite; animation-delay:2s; }
        .hero-orb-3 { width:180px; height:180px; top:30%; left:40%; background:radial-gradient(circle,rgba(90,148,112,0.12),transparent 70%); animation:floatY 6s ease-in-out infinite; animation-delay:1s; }

        .hero-nav-wrap { position:relative; z-index:10; }

        .hero-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
          position: relative;
          z-index: 2;
        }
        .hero-content {
          text-align: center;
          max-width: 720px;
          animation: fadeUp 0.8s ease both;
        }

        .label-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-l);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .label-tag::before, .label-tag::after { content:''; width:28px; height:2px; background:var(--gold-l); border-radius:2px; }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }
        .hero-title em { color: var(--gold-l); font-style: italic; }
        .hero-title span { display: block; }

        .hero-desc {
          color: rgba(255,255,255,0.65);
          font-size: 1rem;
          line-height: 1.75;
          max-width: 520px;
          margin: 0 auto 32px;
          font-weight: 400;
        }

        .hero-cta-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }

        .btn-gold {
          padding: 14px 32px;
          background: var(--gold);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(184,146,42,0.4);
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }
        .btn-gold:hover { background: var(--gold-l); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(184,146,42,0.5); }

        .btn-glass {
          padding: 14px 32px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
        }
        .btn-glass:hover { background: rgba(255,255,255,0.18); transform: translateY(-3px); }

        /* pet category chips in hero */
        .hero-pet-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero-pet-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          padding: 8px 18px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.82);
          font-weight: 500;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .hero-pet-chip:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); color:#fff; }
        .hero-pet-chip .chip-emoji { font-size: 18px; }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.4);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: floatY 2.5s ease-in-out infinite;
        }
        .scroll-arrow { font-size: 20px; opacity: 0.5; }

        /* ═══════════════════════════════
           STATS BAR
        ═══════════════════════════════ */
        .stats-bar {
          background: linear-gradient(135deg, var(--sage-d), var(--sage));
          padding: 28px 0;
        }
        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat-item {
          text-align: center;
          padding: 8px 20px;
          border-right: 1px solid rgba(255,255,255,0.15);
          animation: fadeUp 0.6s ease both;
        }
        .stat-item:last-child { border-right: none; }
        .stat-icon { font-size: 24px; margin-bottom: 6px; animation: pawBounce 3s ease-in-out infinite; }
        .stat-item:nth-child(2) .stat-icon { animation-delay: 0.5s; }
        .stat-item:nth-child(3) .stat-icon { animation-delay: 1s; }
        .stat-item:nth-child(4) .stat-icon { animation-delay: 1.5s; }
        .stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-lbl {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ═══════════════════════════════
           SECTION COMMON
        ═══════════════════════════════ */
        .section-wrap {
          padding: 80px 0;
        }
        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-head {
          text-align: center;
          margin-bottom: 52px;
        }
        .section-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sage);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .section-eyebrow::before { content:''; width:24px; height:2px; background:var(--sage); border-radius:2px; }
        .section-eyebrow::after  { content:''; width:24px; height:2px; background:var(--sage); border-radius:2px; }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--text);
          line-height: 1.15;
          margin-bottom: 14px;
        }
        .section-title em { color: var(--sage); font-style: italic; }
        .section-sub {
          font-size: 0.92rem;
          color: var(--muted);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ═══════════════════════════════
           PET CATEGORIES GRID
        ═══════════════════════════════ */
        .pet-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .pet-card {
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.38s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.3s ease;
          box-shadow: var(--shadow);
          position: relative;
        }
        .pet-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(61,107,79,0.3);
        }

        .pet-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .pet-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pet-card:hover .pet-card-img { transform: scale(1.08); }

        .pet-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          z-index: 2;
        }
        .pet-card-emoji {
          position: absolute;
          bottom: 12px;
          right: 12px;
          font-size: 28px;
          background: rgba(255,255,255,0.9);
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items:center; justify-content:center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          backdrop-filter: blur(4px);
        }

        .pet-card-body { padding: 18px 18px 20px; }
        .pet-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pet-card-desc {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .breed-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 14px;
        }
        .breed-tag {
          background: var(--sage-xs);
          border: 1px solid var(--border);
          color: var(--sage-d);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 50px;
        }

        .pet-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .pet-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--sage-d);
        }
        .btn-card-cta {
          padding: 7px 18px;
          background: var(--sage-l);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          transition: all 0.22s ease;
          box-shadow: 0 3px 10px rgba(61,107,79,0.25);
        }
        .btn-card-cta:hover { background: var(--sage); transform: translateY(-1px); }

        /* ═══════════════════════════════
           WHY US SECTION
        ═══════════════════════════════ */
        .why-bg { background: var(--bg2); }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .why-card {
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 28px 22px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: transform 0.38s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.3s;
        }
        .why-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: rgba(61,107,79,0.25); }
        .why-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--sage-xs), var(--gold-xs));
          border: 1px solid var(--border2);
          border-radius: 16px;
          display: flex; align-items:center; justify-content:center;
          font-size: 26px;
          margin: 0 auto 16px;
        }
        .why-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .why-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.7; }

        /* ═══════════════════════════════
           HERO CTA BANNER (middle)
        ═══════════════════════════════ */
        .cta-banner {
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          padding: 72px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=20') center/cover;
          opacity: 0.07;
        }
        .cta-orb { position:absolute; border-radius:50%; background:radial-gradient(circle,rgba(90,148,112,0.2),transparent 70%); }
        .cta-orb-1 { width:350px;height:350px;top:-80px;right:-40px; animation:floatY 8s ease-in-out infinite; }
        .cta-orb-2 { width:220px;height:220px;bottom:-50px;left:10%; animation:floatY 6s ease-in-out infinite; animation-delay:2s; }
        .cta-inner { position:relative; z-index:2; max-width:600px; margin:0 auto; }
        .cta-eyebrow {
          font-size: 0.68rem; font-weight:700; letter-spacing:0.2em; text-transform:uppercase;
          color:var(--gold-l); display:inline-flex; align-items:center; gap:8px; margin-bottom:16px;
        }
        .cta-eyebrow::before,.cta-eyebrow::after { content:''; width:24px; height:2px; background:var(--gold-l); border-radius:2px; }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 14px;
        }
        .cta-title em { color: var(--gold-l); font-style: italic; }
        .cta-sub { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 30px; line-height: 1.7; }
        .btn-white {
          padding: 14px 36px;
          background: #fff;
          color: var(--sage-d);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          transition: all 0.25s ease;
        }
        .btn-white:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.25); }

        /* ═══════════════════════════════
           TESTIMONIALS
        ═══════════════════════════════ */
        .testimonials-bg { background: var(--ivory); }

        .testimonial-slider {
          position: relative;
          max-width: 780px;
          margin: 0 auto;
        }
        .testimonial-card {
          background: var(--surface);
          border-radius: 24px;
          border: 1px solid var(--border);
          padding: 36px 40px;
          box-shadow: var(--shadow-lg);
          text-align: center;
          animation: scaleIn 0.4s ease both;
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 20px; left: 30px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem;
          color: var(--sage-xs);
          line-height: 1;
          pointer-events: none;
          font-weight: 700;
        }

        .t-avatar {
          width: 72px; height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--border2);
          margin: 0 auto 14px;
          display: block;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .t-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 2px;
        }
        .t-meta { font-size: 0.75rem; color: var(--muted); margin-bottom: 6px; }
        .t-stars { color: var(--gold); font-size: 0.9rem; margin-bottom: 16px; letter-spacing: 2px; }
        .t-text {
          font-size: 0.9rem;
          color: var(--text2);
          line-height: 1.75;
          font-style: italic;
          max-width: 520px;
          margin: 0 auto;
        }

        .t-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }
        .t-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        .t-dot.active { background: var(--sage); width: 24px; border-radius: 4px; }

        .t-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        .t-nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--surface);
          border: 1.5px solid var(--border);
          cursor: pointer;
          font-size: 16px;
          color: var(--sage);
          display: flex; align-items:center; justify-content:center;
          transition: all 0.22s ease;
          box-shadow: var(--shadow);
        }
        .t-nav-btn:hover { background: var(--sage); color: #fff; border-color: var(--sage); }

        /* ═══════════════════════════════
           CONTACT / INFO SECTION
        ═══════════════════════════════ */
        .contact-bg { background: var(--bg2); }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        .contact-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 24px;
          text-align: center;
          box-shadow: var(--shadow);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s, border-color 0.3s;
          text-decoration: none;
          display: block;
        }
        .contact-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: rgba(61,107,79,0.3); }
        .contact-icon-wrap {
          width: 58px; height: 58px;
          background: linear-gradient(135deg, var(--sage-xs), var(--gold-xs));
          border: 1px solid var(--border2);
          border-radius: 16px;
          display: flex; align-items:center; justify-content:center;
          font-size: 26px;
          margin: 0 auto 14px;
        }
        .contact-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }
        .contact-val { font-size: 0.82rem; color: var(--muted); }

        /* Newsletter */
        .newsletter-box {
          background: linear-gradient(135deg, var(--sage-d), var(--sage));
          border-radius: 24px;
          padding: 40px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          box-shadow: var(--shadow-lg);
        }
        .nl-left { flex: 1; min-width: 240px; }
        .nl-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .nl-sub { font-size: 0.82rem; color: rgba(255,255,255,0.65); }
        .nl-form { display: flex; gap: 10px; flex: 1; min-width: 260px; }
        .nl-input {
          flex: 1;
          padding: 12px 18px;
          border-radius: 50px;
          border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          outline: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.5); }
        .nl-input:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.2); }
        .nl-btn {
          padding: 12px 24px;
          background: var(--gold);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          white-space: nowrap;
          transition: all 0.22s ease;
          box-shadow: 0 4px 14px rgba(184,146,42,0.4);
        }
        .nl-btn:hover { background: var(--gold-l); transform: translateY(-2px); }

        /* ═══════════════════════════════
           FOOTER
        ═══════════════════════════════ */
        .buy-footer {
          background: linear-gradient(160deg, #1a2e20, #1e3a28);
          padding: 56px 0 0;
          color: rgba(255,255,255,0.65);
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-desc { font-size: 0.8rem; line-height: 1.75; color: rgba(255,255,255,0.5); max-width: 260px; }
        .footer-col-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gold-l);
          margin-bottom: 16px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links li a, .footer-links li button {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          cursor: pointer;
          background: none; border: none;
          font-family: 'Outfit', sans-serif;
          transition: color 0.2s;
          padding: 0;
          text-align: left;
        }
        .footer-links li a:hover, .footer-links li button:hover { color: rgba(255,255,255,0.9); }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 24px;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-copy { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
        .footer-copy a { color: var(--gold-l); text-decoration: none; }
        .footer-pets { font-size: 1.2rem; letter-spacing: 4px; opacity: 0.5; }

        .ornament { text-align:center; color:var(--gold); font-size:0.9rem; letter-spacing:8px; opacity:0.35; padding: 24px 0 0; }

        /* ═══════════════════════════════
           RESPONSIVE
        ═══════════════════════════════ */
        @media (max-width: 1100px) {
          .pet-grid, .why-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .pet-grid, .why-grid, .contact-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .footer-inner { grid-template-columns: 1fr; }
          .newsletter-box { flex-direction: column; }
          .testimonial-card { padding: 28px 20px; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="buy-hero">
        <div className="hero-bg-img" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-nav-wrap">
          <Nav />
        </div>
        <div className="hero-body">
          <div className="hero-content">
            <div className="label-tag">Petology — India's Premium Pet Store</div>
            <h1 className="hero-title">
              Apna Perfect
              <span><em>Companion</em> Chunein</span>
            </h1>
            <p className="hero-desc">
              Vet-certified, healthy aur loving pets — dogs, cats, birds aur fish —
              seedha aapke ghar tak. Har pet ki poori dekhbhal hum karte hain.
            </p>
            <div className="hero-cta-row">
              <button className="btn-gold" onClick={() => navigate('/pet')}>
                🐾 Pets Dekhein
              </button>
              <button className="btn-glass" onClick={() => navigate('/product')}>
                🛒 Products Browse Karein
              </button>
            </div>
            <div className="hero-pet-row">
              {petCategories.map(p => (
                <div key={p.name} className="hero-pet-chip">
                  <span className="chip-emoji">{p.emoji}</span>
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span className="scroll-arrow">↓</span>
          scroll
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PET CATEGORIES ── */}
      <section className="section-wrap" style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="section-eyebrow">Hamare Pets</div>
            <h2 className="section-title">
              4 Categories mein <em>Chunein</em>
            </h2>
            <p className="section-sub">
              Har category mein vet-certified, healthy aur caring environment mein pale pets milenge
            </p>
          </div>
          <div className="pet-grid">
            {petCategories.map((pet, i) => (
              <div
                key={pet.name}
                className={`pet-card reveal reveal-delay-${i + 1}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate('/pet')}
              >
                <div className="pet-card-img-wrap">
                  <img src={pet.img} alt={pet.name} className="pet-card-img" />
                  <div className="pet-card-badge" style={{ background: pet.badgeColor }}>
                    {pet.badge}
                  </div>
                  <div className="pet-card-emoji">{pet.emoji}</div>
                </div>
                <div className="pet-card-body">
                  <div className="pet-card-name">{pet.name}</div>
                  <p className="pet-card-desc">{pet.desc}</p>
                  <div className="breed-tags">
                    {pet.breeds.slice(0, 3).map(b => (
                      <span key={b} className="breed-tag">{b}</span>
                    ))}
                    <span className="breed-tag">+{pet.breeds.length - 3} more</span>
                  </div>
                  <div className="pet-card-footer">
                    <div className="pet-price">{pet.price}</div>
                    <button className="btn-card-cta">Dekhein →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner reveal">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-inner">
          <div className="cta-eyebrow">Limited Time Offer</div>
          <h2 className="cta-title">
            Pehla Order pe<br /><em>Free Delivery</em> + Vet Consultation
          </h2>
          <p className="cta-sub">
            ₹999 se upar ke orders par FREE pan-India delivery. Naya pet adopt karein
            aur pehle mahine free vet support paayein!
          </p>
          <button className="btn-white" onClick={() => navigate('/pet')}>
            🐾 Abhi Adopt Karein
          </button>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section-wrap why-bg">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="section-eyebrow">Kyun Chunein Humein</div>
            <h2 className="section-title">
              Petology ka <em>Vaada</em>
            </h2>
            <p className="section-sub">
              Aapके pet ki khushi aur sehat hamare liye sabse pehle hai — hamesha
            </p>
          </div>
          <div className="why-grid">
            {whyUs.map((w, i) => (
              <div key={i} className={`why-card reveal reveal-delay-${i + 1}`}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-wrap testimonials-bg">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="section-eyebrow">Happy Families</div>
            <h2 className="section-title">
              Hamare <em>Grahakoon</em> ki Baat
            </h2>
            <p className="section-sub">
              2,400+ families ne Petology se apna pyaara companion liya hai
            </p>
          </div>

          <div className="testimonial-slider reveal">
            <div className="testimonial-card">
              <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} className="t-avatar" />
              <div className="t-name">{testimonials[activeTestimonial].name}</div>
              <div className="t-meta">{testimonials[activeTestimonial].city} · {testimonials[activeTestimonial].pet}</div>
              <div className="t-stars">{'★'.repeat(testimonials[activeTestimonial].rating)}</div>
              <p className="t-text">"{testimonials[activeTestimonial].text}"</p>
            </div>

            <div className="t-nav">
              <button className="t-nav-btn" onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}>←</button>
              <button className="t-nav-btn" onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}>→</button>
            </div>

            <div className="t-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`t-dot${i === activeTestimonial ? ' active' : ''}`} onClick={() => setActiveTestimonial(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / INFO ── */}
      <section className="section-wrap contact-bg">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="section-eyebrow">Humse Milein</div>
            <h2 className="section-title">
              Hum Hain <em>Yahaan</em>
            </h2>
            <p className="section-sub">Koi bhi sawaal ho — call karein, email karein, ya seedha aaiye</p>
          </div>

          <div className="contact-grid">
            {[
              { icon: '📍', label: 'Hamara Clinic', val: 'MG Road, Bengaluru — Mon–Sat, 9am–7pm' },
              { icon: '📞', label: 'Call Karein', val: '+91 98765 43210' },
              { icon: '✉️', label: 'Email Karein', val: 'hello@petology.in' },
            ].map((c, i) => (
              <div key={i} className={`contact-card reveal reveal-delay-${i + 1}`}>
                <div className="contact-icon-wrap">{c.icon}</div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="newsletter-box reveal">
            <div className="nl-left">
              <div className="nl-title">🐾 Pet Tips & Offers Paayein</div>
              <div className="nl-sub">Weekly newsletter — care tips, new arrivals, exclusive discounts</div>
            </div>
            <div className="nl-form">
              <input className="nl-input" type="email" placeholder="aapki@email.com" />
              <button className="nl-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="buy-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">🐾 Petology</div>
            <p className="footer-brand-desc">
              India ka sabse caring pet store. Vet-certified pets aur premium products —
              aapke pyaare companions ke liye, pyaar ke saath.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Pets</div>
            <ul className="footer-links">
              {['🐶 Dogs','🐱 Cats','🐦 Birds','🐟 Fish'].map(p => (
                <li key={p}><button onClick={() => navigate('/pet')}>{p}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <ul className="footer-links">
              {['Pet Food','Accessories','Grooming','Medicines','Toys'].map(p => (
                <li key={p}><button onClick={() => navigate('/product')}>{p}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              {['My Orders','Track Order','Returns','FAQs','Contact Us'].map(p => (
                <li key={p}><button onClick={() => navigate('/')}>{p}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ornament">✦ ✦ ✦</div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 Petology. Made with ❤️ for pets & their humans.<br />
              <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
            </div>
            <div className="footer-pets">🐶 🐱 🐦 🐟</div>
          </div>
        </div>
      
// ... (all your existing code, imports, styles, component logic)

      </footer>
    </div>
  );
}
// ❌ REMOVE this line → export default Buy;