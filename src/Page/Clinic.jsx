import React, { useEffect, useRef } from "react";

// Replace Nav import with your actual Nav component path
// import Nav from "./Nav";

function Clinic() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.13 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const services = [
    {
      icon: "🩺",
      title: "General Consultation",
      desc: "Expert health check-ups and routine examinations for all pet species — dogs, cats, birds, and fish.",
      tag: "Available Daily",
    },
    {
      icon: "💉",
      title: "Vaccination & Deworming",
      desc: "Complete immunization schedules and parasite prevention tailored for your pet's breed and age.",
      tag: "Walk-in Welcome",
    },
    {
      icon: "🔬",
      title: "Diagnostic Lab",
      desc: "In-house blood work, urinalysis, X-rays, and ultrasound for fast and accurate diagnosis.",
      tag: "Same-Day Reports",
    },
    {
      icon: "🏥",
      title: "Surgery & ICU",
      desc: "State-of-the-art surgical suite with 24/7 intensive care monitoring for critical patients.",
      tag: "24/7 Emergency",
    },
    {
      icon: "✂️",
      title: "Grooming & Spa",
      desc: "Professional grooming, dental cleaning, and spa treatments to keep your pet looking their best.",
      tag: "By Appointment",
    },
    {
      icon: "🐠",
      title: "Aquatic & Avian Care",
      desc: "Specialist care for exotic birds and aquarium fish — disease diagnosis, nutrition, and habitat advice.",
      tag: "Specialist Clinic",
    },
  ];

  const vets = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Veterinarian",
      spec: "Small Animals & Surgery",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
      exp: "12 yrs exp.",
    },
    {
      name: "Dr. Arjun Mehta",
      role: "Senior Vet",
      spec: "Exotic Birds & Reptiles",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
      exp: "8 yrs exp.",
    },
    {
      name: "Dr. Sneha Patel",
      role: "Aquatic Specialist",
      spec: "Fish & Marine Life",
      img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
      exp: "6 yrs exp.",
    },
  ];

  const stats = [
    { num: "12,000+", label: "Happy Pets Treated" },
    { num: "98%", label: "Recovery Rate" },
    { num: "24/7", label: "Emergency Care" },
    { num: "15+", label: "Years of Trust" },
  ];

  return (
    <>
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

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 10px; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes slideL   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.6} }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity: 1; transform: none; }

        /* ── HERO ─────────────────────────────────── */
        .clinic-hero {
          position: relative;
          min-height: 92vh;
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .clinic-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80') center/cover no-repeat;
          opacity: 0.13;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          animation: orbDrift 14s ease-in-out infinite;
        }
        .hero-orb-1 { width:420px; height:420px; background:rgba(90,148,112,0.22); top:-80px; right:-60px; animation-delay:-4s; }
        .hero-orb-2 { width:280px; height:280px; background:rgba(184,146,42,0.14); bottom:60px; left:30px; animation-delay:-9s; }

        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 50px;
          padding: 6px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a8d8b9;
          margin-bottom: 24px;
          animation: fadeUp 0.8s ease both;
        }
        .hero-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: #3ecf8e; animation: pulse 2s infinite; }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 20px;
          animation: fadeUp 0.9s 0.15s ease both;
        }
        .hero-title em { color: var(--gold-l); font-style: italic; }
        .hero-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          margin-bottom: 36px;
          animation: fadeUp 1s 0.25s ease both;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 1s 0.35s ease both;
        }
        .btn-sage {
          background: var(--sage-l);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(90,148,112,0.35);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-sage:hover { background: var(--sage-d); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(42,78,57,0.4); }
        .btn-glass {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-glass:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
        .btn-gold {
          background: var(--gold);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(184,146,42,0.3);
          transition: background 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-gold:hover { background: var(--gold-l); transform: translateY(-2px); }

        /* Hero Right — Clinic Image Card */
        .hero-img-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeUp 1s 0.4s ease both;
        }
        .hero-img-card img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
        }
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,64,48,0.7) 0%, transparent 55%);
        }
        .hero-img-tag {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 14px;
          padding: 12px 18px;
          color: #fff;
        }
        .hero-img-tag strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; }
        .hero-img-tag span { font-size: 0.78rem; opacity: 0.8; }
        .hero-rating-chip {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--gold);
          color: #fff;
          border-radius: 50px;
          padding: 6px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
        }

        /* ── STATS ─────────────────────────────────── */
        .stats-band {
          background: var(--sage-d);
          padding: 50px 40px;
        }
        .stats-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          text-align: center;
        }
        .stat-item {}
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--gold-l);
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.72);
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── LABEL TAG ─────────────────────────────── */
        .label-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sage);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .label-tag::before {
          content: '';
          width: 24px;
          height: 2px;
          background: var(--sage);
          border-radius: 2px;
        }
        .label-tag-gold {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .label-tag-gold::before {
          content: '';
          width: 24px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.9rem);
          font-weight: 700;
          color: var(--text);
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .section-heading em { color: var(--sage); font-style: italic; }
        .section-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.65;
          max-width: 560px;
        }

        /* ── ABOUT SECTION ─────────────────────────── */
        .about-section {
          background: var(--bg);
          padding: 100px 40px;
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .about-img-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: visible;
        }
        .about-img-main {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          display: block;
        }
        .about-img-float {
          position: absolute;
          bottom: -28px;
          right: -28px;
          width: 180px;
          height: 180px;
          border-radius: 18px;
          object-fit: cover;
          border: 4px solid var(--surface);
          box-shadow: var(--shadow);
          animation: floatY 5s ease-in-out infinite;
        }
        .about-badge {
          position: absolute;
          top: 24px;
          left: -20px;
          background: var(--gold);
          color: #fff;
          border-radius: 14px;
          padding: 14px 20px;
          text-align: center;
          box-shadow: 0 6px 24px rgba(184,146,42,0.3);
        }
        .about-badge strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 700; }
        .about-badge span { font-size: 0.75rem; font-weight: 600; opacity: 0.9; }

        .about-content { padding: 20px 0; }
        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        .about-feat {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: var(--ivory);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px;
        }
        .about-feat-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
        .about-feat-text strong {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 3px;
        }
        .about-feat-text span { font-size: 0.78rem; color: var(--muted); }

        /* ── SERVICES SECTION ──────────────────────── */
        .services-section {
          background: var(--bg2);
          padding: 100px 40px;
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 56px;
          gap: 30px;
          flex-wrap: wrap;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .service-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 28px;
          position: relative;
          transition: transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.3s;
          cursor: default;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 56px rgba(61,107,79,0.14);
          border-color: rgba(61,107,79,0.3);
        }
        .service-icon-wrap {
          width: 60px;
          height: 60px;
          background: var(--sage-xs);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.7rem;
          margin-bottom: 20px;
        }
        .service-tag {
          position: absolute;
          top: 24px;
          right: 20px;
          background: var(--sage-xs);
          color: var(--sage);
          border-radius: 50px;
          padding: 4px 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }
        .service-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.65;
        }
        .service-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--sage);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .service-arrow:hover { gap: 10px; }

        /* ── VETS SECTION ──────────────────────────── */
        .vets-section {
          background: var(--ivory);
          padding: 100px 40px;
        }
        .vets-inner { max-width: 1200px; margin: 0 auto; }
        .vets-header { text-align: center; margin-bottom: 56px; }
        .vets-header .section-sub { margin: 0 auto; }
        .vets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .vet-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s, border-color 0.3s;
        }
        .vet-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(61,107,79,0.3);
        }
        .vet-img-wrap { position: relative; height: 280px; overflow: hidden; }
        .vet-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .vet-card:hover .vet-img-wrap img { transform: scale(1.06); }
        .vet-exp-badge {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: var(--sage);
          color: #fff;
          border-radius: 50px;
          padding: 5px 13px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .vet-info { padding: 24px; }
        .vet-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }
        .vet-role {
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          color: var(--sage);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .vet-spec {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: var(--muted);
        }

        /* ── APPOINTMENT SECTION ───────────────────── */
        .appointment-section {
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          padding: 100px 40px;
          position: relative;
          overflow: hidden;
        }
        .appointment-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=80') center/cover no-repeat;
          opacity: 0.06;
        }
        .appt-orb-1 { position:absolute; width:500px; height:500px; border-radius:50%; background:rgba(90,148,112,0.15); filter:blur(90px); top:-150px; right:-100px; pointer-events:none; animation: orbDrift 16s ease-in-out infinite; }
        .appt-orb-2 { position:absolute; width:320px; height:320px; border-radius:50%; background:rgba(184,146,42,0.12); filter:blur(70px); bottom:-80px; left:10%; pointer-events:none; animation: orbDrift 20s ease-in-out infinite reverse; }
        .appt-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }
        .appt-left {}
        .appt-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.9rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 18px;
        }
        .appt-title em { color: var(--gold-l); font-style: italic; }
        .appt-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.65;
          margin-bottom: 36px;
        }
        .appt-info-list { display: flex; flex-direction: column; gap: 16px; }
        .appt-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          backdrop-filter: blur(8px);
        }
        .appt-info-icon { font-size: 1.3rem; }
        .appt-info-text { font-family: 'Outfit', sans-serif; font-size: 0.92rem; color: rgba(255,255,255,0.85); }
        .appt-info-text strong { color: #fff; font-weight: 600; }

        /* Form */
        .appt-form-card {
          background: var(--surface);
          border-radius: 24px;
          padding: 38px 36px;
          box-shadow: var(--shadow-lg);
        }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .form-sub { font-family: 'Outfit', sans-serif; font-size: 0.88rem; color: var(--muted); margin-bottom: 28px; }
        .form-group { margin-bottom: 18px; }
        .form-group label {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text2);
          margin-bottom: 7px;
          letter-spacing: 0.03em;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.93rem;
          color: var(--text);
          background: var(--bg);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          appearance: none;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--sage);
          box-shadow: 0 0 0 4px rgba(61,107,79,0.1);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-submit {
          width: 100%;
          background: var(--sage-l);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 15px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 6px;
          box-shadow: 0 6px 24px rgba(90,148,112,0.3);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.03em;
        }
        .form-submit:hover { background: var(--sage-d); transform: translateY(-2px); box-shadow: 0 10px 32px rgba(42,78,57,0.35); }

        /* ── INFO STRIP ────────────────────────────── */
        .info-strip {
          background: var(--bg2);
          padding: 60px 40px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .info-strip-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s, border-color 0.3s;
        }
        .info-item:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow);
          border-color: rgba(61,107,79,0.28);
        }
        .info-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .info-icon-box.green { background: var(--sage-xs); }
        .info-icon-box.gold { background: var(--gold-xs); }
        .info-text-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .info-text-val {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
        }

        /* ── TESTIMONIALS ──────────────────────────── */
        .reviews-section {
          background: var(--bg);
          padding: 100px 40px;
        }
        .reviews-inner { max-width: 1200px; margin: 0 auto; }
        .reviews-header { text-align: center; margin-bottom: 56px; }
        .reviews-header .section-sub { margin: 0 auto; }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .review-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 30px 28px;
          transition: transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s;
        }
        .review-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 50px rgba(61,107,79,0.12);
        }
        .review-stars { color: var(--gold); font-size: 1rem; letter-spacing: 2px; margin-bottom: 16px; }
        .review-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.93rem;
          color: var(--text2);
          line-height: 1.7;
          margin-bottom: 22px;
        }
        .review-author { display: flex; align-items: center; gap: 12px; }
        .review-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border);
        }
        .review-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text);
        }
        .review-pet { font-size: 0.78rem; color: var(--muted); }

        /* ── RESPONSIVE ────────────────────────────── */
        @media (max-width: 1100px) {
          .hero-inner { grid-template-columns: 1fr; gap: 50px; }
          .about-inner { grid-template-columns: 1fr; gap: 50px; }
          .appt-inner { grid-template-columns: 1fr; gap: 50px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .vets-grid { grid-template-columns: repeat(2, 1fr); }
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .services-grid, .vets-grid, .reviews-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .info-strip-inner { grid-template-columns: 1fr; }
          .about-features { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .hero-inner { padding: 60px 20px; }
          .about-section, .services-section, .vets-section,
          .appointment-section, .reviews-section { padding: 70px 20px; }
          .hero-img-float { display: none; }
          .about-badge { left: 12px; }
          .services-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div>
        {/* ── HEADER / NAV ── */}
        <header className="header_section">
          <div className="container-fluid">
            {/* <Nav /> */}
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="clinic-hero">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-inner">
            <div>
              <div className="hero-badge">
                <span className="dot" />
                Petology Certified Clinic
              </div>
              <h1 className="hero-title">
                Where Every Pet Gets{" "}
                <em>World-Class</em> Care
              </h1>
              <p className="hero-desc">
                From routine check-ups to critical surgeries — our expert veterinarians
                are dedicated to keeping your dogs, cats, birds, and fish happy, healthy,
                and thriving every day of the year.
              </p>
              <div className="hero-actions">
                <a href="#appointment" className="btn-sage">Book Appointment</a>
                <a href="tel:+01234567890" className="btn-glass">📞 Emergency Line</a>
              </div>
            </div>
            <div>
              <div className="hero-img-card">
                <img
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80"
                  alt="Vet with dog"
                />
                <div className="hero-img-overlay" />
                <div className="hero-img-tag">
                  <strong>NABL Accredited</strong>
                  <span>Fully certified veterinary lab</span>
                </div>
                <div className="hero-rating-chip">⭐ 4.9 · 2,400+ reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAND ── */}
        <div className="stats-band">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item" key={i} ref={addReveal} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <section className="about-section">
          <div className="about-inner">
            <div ref={addReveal} className="reveal about-img-wrap">
              <img
                className="about-img-main"
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                alt="Veterinary clinic"
              />
              <img
                className="about-img-float"
                src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&q=80"
                alt="Happy cat"
              />
              <div className="about-badge">
                <strong>15+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
            <div className="about-content reveal" ref={addReveal}>
              <div className="label-tag">About Our Clinic</div>
              <h2 className="section-heading">
                Trusted Pet Healthcare{" "}
                <em>For Every Species</em>
              </h2>
              <p className="section-sub" style={{ marginBottom: 16 }}>
                At Petology Clinic, we believe every pet deserves the highest standard of
                care. Our NABL-accredited facility is equipped with the latest diagnostic
                and surgical technology, staffed by specialists across all species.
              </p>
              <p className="section-sub">
                Whether you have a Golden Retriever, a Persian cat, a parrot, or a
                beautiful aquarium — our team has the expertise to provide comprehensive
                care tailored to your pet's unique needs.
              </p>
              <div className="about-features">
                {[
                  { icon: "🏥", title: "Modern Facility", sub: "State-of-the-art equipment" },
                  { icon: "👨‍⚕️", title: "Expert Vets", sub: "12+ qualified specialists" },
                  { icon: "🕐", title: "24/7 Emergency", sub: "Always available for you" },
                  { icon: "💊", title: "In-house Pharmacy", sub: "Medicines & supplements" },
                ].map((f, i) => (
                  <div className="about-feat" key={i}>
                    <div className="about-feat-icon">{f.icon}</div>
                    <div className="about-feat-text">
                      <strong>{f.title}</strong>
                      <span>{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <a href="#appointment" className="btn-sage">Book a Visit</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="services-section">
          <div className="services-inner">
            <div className="services-header">
              <div>
                <div className="label-tag">Our Services</div>
                <h2 className="section-heading" style={{ marginBottom: 0 }}>
                  Complete Care for <em>All Pets</em>
                </h2>
              </div>
              <a href="#appointment" className="btn-sage">View All Services</a>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <div
                  className="service-card reveal"
                  ref={addReveal}
                  key={i}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="service-tag">{s.tag}</div>
                  <div className="service-icon-wrap">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <a href="#appointment" className="service-arrow">
                    Book Now →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VETS ── */}
        <section className="vets-section">
          <div className="vets-inner">
            <div className="vets-header reveal" ref={addReveal}>
              <div className="label-tag" style={{ justifyContent: "center" }}>Meet the Team</div>
              <h2 className="section-heading">Our Expert <em>Veterinarians</em></h2>
              <p className="section-sub">
                Compassionate, certified professionals dedicated to your pet's wellbeing.
              </p>
            </div>
            <div className="vets-grid">
              {vets.map((v, i) => (
                <div
                  className="vet-card reveal"
                  ref={addReveal}
                  key={i}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="vet-img-wrap">
                    <img src={v.img} alt={v.name} />
                    <div className="vet-exp-badge">{v.exp}</div>
                  </div>
                  <div className="vet-info">
                    <div className="vet-role">{v.role}</div>
                    <div className="vet-name">{v.name}</div>
                    <div className="vet-spec">Specialization: {v.spec}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPOINTMENT ── */}
        <section className="appointment-section" id="appointment">
          <div className="appt-orb-1" />
          <div className="appt-orb-2" />
          <div className="appt-inner">
            <div className="reveal" ref={addReveal}>
              <div className="label-tag-gold">Book Online</div>
              <h2 className="appt-title">
                Schedule Your Pet's <em>Visit Today</em>
              </h2>
              <p className="appt-desc">
                Booking is quick and easy. Choose your preferred time and our team will
                confirm within 30 minutes. Emergency slots always available.
              </p>
              <div className="appt-info-list">
                <div className="appt-info-item">
                  <span className="appt-info-icon">📍</span>
                  <div className="appt-info-text">
                    <strong>Petology Clinic</strong><br />
                    123 Green Park, Ahmedabad — 380015, Gujarat
                  </div>
                </div>
                <div className="appt-info-item">
                  <span className="appt-info-icon">📞</span>
                  <div className="appt-info-text">
                    <strong>+91 98765 43210</strong><br />
                    Mon–Sun, 8:00 AM – 10:00 PM
                  </div>
                </div>
                <div className="appt-info-item">
                  <span className="appt-info-icon">✉️</span>
                  <div className="appt-info-text">
                    <strong>clinic@petology.in</strong><br />
                    Response within 1–2 hours
                  </div>
                </div>
                <div className="appt-info-item">
                  <span className="appt-info-icon">🚨</span>
                  <div className="appt-info-text">
                    <strong>Emergency: +91 98765 00000</strong><br />
                    Available 24 hours, 7 days a week
                  </div>
                </div>
              </div>
            </div>

            <div className="appt-form-card reveal" ref={addReveal}>
              <h3 className="form-title">Book an Appointment</h3>
              <p className="form-sub">Fill in the details below and we'll confirm your slot.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Rahul Sharma" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Pet Type</label>
                  <select>
                    <option value="">Select pet</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Fish</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Service Needed</label>
                  <select>
                    <option value="">Select service</option>
                    <option>General Check-up</option>
                    <option>Vaccination</option>
                    <option>Surgery</option>
                    <option>Grooming</option>
                    <option>Diagnostic Tests</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select>
                    <option>Morning (8–11 AM)</option>
                    <option>Noon (11 AM–2 PM)</option>
                    <option>Afternoon (2–6 PM)</option>
                    <option>Evening (6–10 PM)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea rows={3} placeholder="Any specific symptoms or concerns…" style={{ resize: "none" }} />
              </div>
              <button className="form-submit">Confirm My Appointment →</button>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="reviews-section">
          <div className="reviews-inner">
            <div className="reviews-header reveal" ref={addReveal}>
              <div className="label-tag" style={{ justifyContent: "center" }}>Happy Pet Parents</div>
              <h2 className="section-heading">What Our <em>Clients Say</em></h2>
              <p className="section-sub">Thousands of pets treated. Countless families reassured.</p>
            </div>
            <div className="reviews-grid">
              {[
                {
                  text: "Dr. Priya saved my golden retriever Bruno's life after a serious accident. The 24/7 ICU facility is truly world-class. Will never go anywhere else!",
                  name: "Meera Patel", pet: "Bruno — Golden Retriever",
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
                },
                {
                  text: "Amazing experience for my Persian cat Noor's dental cleaning. The staff is incredibly gentle and the facility is spotless and modern. Highly recommended!",
                  name: "Aryan Joshi", pet: "Noor — Persian Cat",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                },
                {
                  text: "Dr. Sneha diagnosed my aquarium fish's fungal infection instantly. They even advised on water chemistry. Incredible specialist knowledge — my fish are healthy again!",
                  name: "Divya Mehta", pet: "Aquarium — 15 Fish",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
                },
              ].map((r, i) => (
                <div
                  className="review-card reveal"
                  ref={addReveal}
                  key={i}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"{r.text}"</p>
                  <div className="review-author">
                    <img className="review-avatar" src={r.img} alt={r.name} />
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-pet">🐾 {r.pet}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <div className="info-strip">
          <div className="info-strip-inner">
            <a href="#" className="info-item reveal" ref={addReveal}>
              <div className="info-icon-box green">📍</div>
              <div>
                <div className="info-text-label">Find Us</div>
                <div className="info-text-val">123 Green Park, Ahmedabad</div>
              </div>
            </a>
            <a href="tel:+919876543210" className="info-item reveal" ref={addReveal} style={{ transitionDelay: "0.1s" }}>
              <div className="info-icon-box gold">📞</div>
              <div>
                <div className="info-text-label">Call Us</div>
                <div className="info-text-val">+91 98765 43210</div>
              </div>
            </a>
            <a href="mailto:clinic@petology.in" className="info-item reveal" ref={addReveal} style={{ transitionDelay: "0.2s" }}>
              <div className="info-icon-box green">✉️</div>
              <div>
                <div className="info-text-label">Email Us</div>
                <div className="info-text-val">clinic@petology.in</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clinic;
