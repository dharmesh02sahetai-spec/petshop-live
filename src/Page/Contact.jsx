/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           PETOLOGY — CONTACT PAGE                        ║
 * ║  Theme : Luxury Sage Green + Ivory + Gold                ║
 * ║  COLOR FIX: Map + FAQ sections now dark & readable       ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Nav from "./Nev";

/* ── CONFIGURE THESE ──────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_8s1d4jp";
const EMAILJS_TEMPLATE_ID = "template_giv6oxj";
const EMAILJS_PUBLIC_KEY  = "tQIW3xfwTsPtAQefW";
const WHATSAPP_NUMBER     = "919409335704";
const INSTAGRAM_HANDLE    = "pethology";
const STORE_EMAIL         = "dharmesh.220180107013@gmail.com";
const STORE_PHONE         = "+91 9409335704";
const STORE_ADDRESS       = "Shop No. 12, Pet Paradise Complex\nRing Road, Surat, Gujarat — 395007";
const STORE_HOURS         = "Mon–Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 5:00 PM";
/* ─────────────────────────────────────────────────────────── */

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
    --border:    rgba(61,107,79,0.13);
    --text:      #1c2b22;
    --text2:     #3a4a3f;
    --muted:     #7a907f;
    --dim:       #aab8ac;
    --ivory:     #fdf9f2;
    --shadow:    0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg: 0 20px 60px rgba(30,50,35,0.15);
    --radius:    20px;
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:var(--sage); border-radius:10px; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideL  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:none} }
  @keyframes slideR  { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:none} }
  @keyframes orbDrift{ 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(61,107,79,0.35)} 50%{box-shadow:0 0 0 12px rgba(61,107,79,0)} }
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes checkPop{ 0%{transform:scale(0) rotate(-15deg)} 70%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0)} }
  @keyframes spin    { to{transform:rotate(360deg)} }

  .reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-l { opacity:0; transform:translateX(-24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal-l.visible { opacity:1; transform:none; }
  .reveal-r { opacity:0; transform:translateX(24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal-r.visible { opacity:1; transform:none; }

  /* ══ HERO ══ */
  .ct-hero {
    min-height:52vh; position:relative;
    display:flex; align-items:center; overflow:hidden;
    background:linear-gradient(160deg,#1e3a28 0%,#2a5a3c 45%,#1a4030 100%);
    padding:120px 64px 80px;
  }
  .ct-hero-noise {
    position:absolute; inset:0; pointer-events:none; opacity:0.03;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .ct-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(70px); }
  .ct-orb-1 { width:600px;height:600px; background:radial-gradient(circle,rgba(90,148,112,0.3),transparent 65%); top:-200px;right:-100px; animation:orbDrift 9s ease-in-out infinite; }
  .ct-orb-2 { width:400px;height:400px; background:radial-gradient(circle,rgba(184,146,42,0.18),transparent 65%); bottom:-80px;left:-60px; animation:orbDrift 11s ease-in-out infinite reverse; }

  .ct-hero-inner { position:relative;z-index:2; max-width:1360px; margin:0 auto; width:100%; }
  .ct-hero-chip {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.2);
    border-radius:50px; padding:7px 20px;
    font-size:0.7rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase;
    color:rgba(255,255,255,0.8); margin-bottom:20px;
    animation:fadeUp 0.6s ease both; backdrop-filter:blur(8px);
  }
  .ct-live-dot { width:7px;height:7px; background:#5a9470; border-radius:50%; animation:blink 1.4s infinite; box-shadow:0 0 8px #5a9470; }
  .ct-hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(3rem,5.5vw,5.5rem); line-height:0.95; font-weight:700;
    color:#fff; margin-bottom:20px; animation:fadeUp 0.6s 0.1s ease both;
  }
  .ct-hero-title em { font-style:italic; color:var(--gold-l); }
  .ct-hero-sub { font-size:1rem; color:rgba(255,255,255,0.5); line-height:1.85; max-width:520px; animation:fadeUp 0.6s 0.2s ease both; }

  .ct-breadcrumb { display:flex; align-items:center; gap:8px; font-size:0.78rem; color:rgba(255,255,255,0.4); margin-bottom:22px; }
  .ct-breadcrumb a { color:rgba(255,255,255,0.55); text-decoration:none; }
  .ct-breadcrumb a:hover { color:var(--gold-l); }
  .ct-breadcrumb span { color:rgba(255,255,255,0.25); }

  .ct-channels { display:flex; gap:12px; margin-top:32px; flex-wrap:wrap; animation:fadeUp 0.6s 0.3s ease both; }
  .ct-channel-pill {
    display:flex; align-items:center; gap:8px;
    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
    border-radius:50px; padding:8px 18px; font-size:0.78rem; font-weight:600;
    color:rgba(255,255,255,0.75); text-decoration:none; transition:all 0.25s;
    backdrop-filter:blur(8px); cursor:pointer;
  }
  .ct-channel-pill:hover { background:rgba(255,255,255,0.16); color:#fff; transform:translateY(-2px); }
  .ct-channel-pill.wa { border-color:rgba(37,211,102,0.4); }
  .ct-channel-pill.wa:hover { background:rgba(37,211,102,0.15); border-color:rgba(37,211,102,0.7); }
  .ct-channel-pill.ig { border-color:rgba(225,48,108,0.4); }
  .ct-channel-pill.ig:hover { background:rgba(225,48,108,0.12); border-color:rgba(225,48,108,0.7); }
  .ct-channel-pill.em { border-color:rgba(184,146,42,0.4); }
  .ct-channel-pill.em:hover { background:rgba(184,146,42,0.12); border-color:rgba(184,146,42,0.7); }

  /* ══ MAIN LAYOUT ══ */
  .ct-wrap { max-width:1360px; margin:0 auto; padding:0 64px; }
  .ct-main { padding:80px 0 100px; background:var(--bg); }
  .ct-grid { display:grid; grid-template-columns:1fr 1.35fr; gap:64px; align-items:start; }

  .label-tag { font-size:0.7rem; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--sage); display:flex; align-items:center; gap:8px; margin-bottom:10px; }
  .label-tag::before { content:''; width:24px; height:2px; background:var(--sage); border-radius:2px; }
  .label-tag-light { color:var(--gold-l) !important; }
  .label-tag-light::before { background:var(--gold-l) !important; }

  /* ── LEFT PANEL ── */
  .ct-left-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.9rem,3vw,2.6rem); font-weight:700; color:var(--text); margin-bottom:14px; line-height:1.15; }
  .ct-left-sub { font-size:0.92rem; color:var(--muted); line-height:1.85; margin-bottom:44px; }

  .ct-info-list { display:flex; flex-direction:column; gap:16px; margin-bottom:44px; }
  .ct-info-card {
    display:flex; gap:18px; align-items:flex-start;
    background:var(--surface); border:1px solid var(--border); border-radius:18px;
    padding:22px 24px; transition:all 0.3s; cursor:default;
  }
  .ct-info-card:hover { border-color:rgba(61,107,79,0.3); box-shadow:var(--shadow); transform:translateX(4px); }
  .ct-info-icon {
    width:50px; height:50px; flex-shrink:0;
    background:linear-gradient(135deg,var(--sage-l),var(--sage-d));
    border-radius:15px; display:flex; align-items:center; justify-content:center;
    font-size:1.3rem; box-shadow:0 8px 20px rgba(61,107,79,0.25);
  }
  .ct-info-title { font-weight:700; color:var(--text); font-size:0.88rem; margin-bottom:5px; }
  .ct-info-val   { font-size:0.85rem; color:var(--muted); line-height:1.7; white-space:pre-line; }
  .ct-info-val a { color:var(--sage); text-decoration:none; }
  .ct-info-val a:hover { color:var(--sage-d); text-decoration:underline; }

  .ct-channels-section { margin-bottom:44px; }
  .ct-channels-title { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--text); margin-bottom:16px; }
  .ct-channel-btns { display:flex; flex-direction:column; gap:12px; }
  .ct-ch-btn {
    display:flex; align-items:center; gap:14px;
    border-radius:16px; padding:16px 22px;
    text-decoration:none; font-family:'Outfit',sans-serif; font-size:0.88rem; font-weight:600;
    transition:all 0.28s; border:1.5px solid transparent; cursor:pointer;
  }
  .ct-ch-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.12); }
  .ct-ch-btn-wa { background:#e8f8ee; border-color:#a8ddb5; color:#1a7a3a; }
  .ct-ch-btn-wa:hover { background:#d0f0db; border-color:#25d366; }
  .ct-ch-btn-ig { background:#fef0f4; border-color:#f4a0b8; color:#c0335a; }
  .ct-ch-btn-ig:hover { background:#fde0ea; border-color:#e1306c; }
  .ct-ch-btn-ph { background:var(--sage-xs); border-color:rgba(61,107,79,0.25); color:var(--sage-d); }
  .ct-ch-btn-ph:hover { background:var(--sage-sm); border-color:var(--sage); }
  .ct-ch-btn-em { background:#fdf5e4; border-color:#e8cc88; color:#8a6010; }
  .ct-ch-btn-em:hover { background:#faecc8; border-color:var(--gold); }
  .ct-ch-icon { width:38px;height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
  .ct-ch-icon-wa { background:rgba(37,211,102,0.15); }
  .ct-ch-icon-ig { background:rgba(225,48,108,0.12); }
  .ct-ch-icon-ph { background:var(--sage-xs); }
  .ct-ch-icon-em { background:rgba(184,146,42,0.12); }
  .ct-ch-text { flex:1; }
  .ct-ch-label { font-size:0.88rem; font-weight:700; margin-bottom:1px; }
  .ct-ch-hint  { font-size:0.72rem; opacity:0.65; font-weight:400; }
  .ct-ch-arrow { font-size:1rem; opacity:0.5; transition:transform 0.25s; }
  .ct-ch-btn:hover .ct-ch-arrow { transform:translateX(4px); opacity:1; }

  /* ── FORM ── */
  .ct-form-box {
    background:var(--surface); border:1px solid var(--border);
    border-radius:28px; padding:52px 48px;
    box-shadow:var(--shadow); position:sticky; top:100px;
  }
  .ct-form-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:var(--text); margin-bottom:6px; }
  .ct-form-sub { color:var(--muted); font-size:0.84rem; margin-bottom:32px; line-height:1.65; }
  .ct-form-tabs { display:flex; gap:0; background:var(--card); border-radius:13px; padding:4px; margin-bottom:28px; border:1px solid var(--border); }
  .ct-form-tab { flex:1; padding:10px; border-radius:10px; border:none; background:none; font-family:'Outfit',sans-serif; font-size:0.8rem; font-weight:600; color:var(--muted); cursor:pointer; transition:all 0.22s; }
  .ct-form-tab.active { background:var(--sage); color:#fff; box-shadow:0 4px 14px rgba(61,107,79,0.3); }
  .ct-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .ct-input { width:100%; padding:14px 18px; border:1.5px solid var(--border); border-radius:13px; font-family:'Outfit',sans-serif; font-size:0.88rem; color:var(--text); background:var(--card); margin-bottom:14px; outline:none; transition:border-color 0.22s, box-shadow 0.22s; }
  .ct-input:focus { border-color:var(--sage); background:#fff; box-shadow:0 0 0 3px rgba(61,107,79,0.1); }
  .ct-input::placeholder { color:var(--dim); }
  .ct-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a907f' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; padding-right:40px; cursor:pointer; }
  .ct-textarea { min-height:120px; resize:vertical; }
  .ct-input-label { display:block; font-size:0.73rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; }
  .ct-field { margin-bottom:14px; }
  .ct-field .ct-input { margin-bottom:0; }
  .ct-char { text-align:right; font-size:0.7rem; color:var(--dim); margin-top:4px; }
  .ct-submit { width:100%; padding:17px; background:var(--sage); color:#fff; border:none; border-radius:13px; font-family:'Outfit',sans-serif; font-size:0.95rem; font-weight:700; cursor:pointer; transition:all 0.3s; margin-top:8px; box-shadow:0 8px 24px rgba(61,107,79,0.32); display:flex; align-items:center; justify-content:center; gap:10px; }
  .ct-submit:hover:not(:disabled) { background:var(--sage-d); transform:translateY(-2px); box-shadow:0 14px 36px rgba(61,107,79,0.42); }
  .ct-submit:disabled { opacity:0.7; cursor:not-allowed; }
  .ct-submit-spinner { width:18px;height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
  .ct-success-box { text-align:center; padding:40px 20px; animation:fadeIn 0.5s ease both; }
  .ct-success-icon { width:80px;height:80px; border-radius:50%; background:linear-gradient(135deg,#3ecf8e,#1a9e68); display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin:0 auto 20px; box-shadow:0 16px 40px rgba(62,207,142,0.35); animation:checkPop 0.5s cubic-bezier(.34,1.56,.64,1) both; }
  .ct-success-title { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700; color:var(--text); margin-bottom:10px; }
  .ct-success-text  { color:var(--muted); font-size:0.9rem; line-height:1.75; margin-bottom:24px; }
  .ct-success-channels { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
  .ct-success-chip { display:flex; align-items:center; gap:6px; background:var(--sage-xs); border:1px solid var(--border); border-radius:50px; padding:6px 14px; font-size:0.75rem; font-weight:600; color:var(--sage); }
  .ct-error { background:#fef0f0; border:1px solid #fcc; border-radius:12px; padding:12px 16px; font-size:0.83rem; color:#c0335a; margin-bottom:14px; display:flex; gap:8px; align-items:center; }

  /* ══════════════════════════════════════════════
     MAP SECTION — DARK GREEN (FIXED)
  ══════════════════════════════════════════════ */
  .ct-map-section {
    background: linear-gradient(160deg,#1e3a28 0%,#2a5a3c 55%,#1a4030 100%);
    padding:80px 0;
    border-top:1px solid rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
  }
  .ct-map-section::before {
    content:''; position:absolute; inset:0; pointer-events:none; opacity:0.03;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .ct-map-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:56px; align-items:center; position:relative; z-index:2; }
  .ct-map-frame { border-radius:24px; overflow:hidden; border:1px solid rgba(255,255,255,0.12); box-shadow:0 20px 60px rgba(0,0,0,0.35); height:380px; }
  .ct-map-frame iframe { width:100%; height:100%; border:none; display:block; filter:saturate(0.85) contrast(1.05); }

  /* Map section text — all white/light */
  .ct-map-info-title {
    font-family:'Cormorant Garamond',serif; font-size:1.7rem; font-weight:700;
    color:#ffffff; margin-bottom:12px;
  }
  .ct-map-info-text { font-size:0.88rem; color:rgba(255,255,255,0.6); line-height:1.85; margin-bottom:28px; }

  .ct-hours-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:28px; }
  .ct-hour-card {
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.14);
    border-radius:14px; padding:16px 18px;
    backdrop-filter: blur(8px);
  }
  .ct-hour-day  { font-size:0.75rem; font-weight:700; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
  .ct-hour-time { font-size:0.88rem; font-weight:600; color:#ffffff; }

  /* Map section label-tag override */
  .ct-map-section .label-tag { color:var(--gold-l); }
  .ct-map-section .label-tag::before { background:var(--gold-l); }

  .ct-open-badge {
    display:inline-flex; align-items:center; gap:7px;
    border-radius:50px; padding:7px 16px; font-size:0.78rem; font-weight:700;
  }
  .ct-open-badge-dark {
    background:rgba(62,207,142,0.15);
    border:1px solid rgba(62,207,142,0.35);
    color:#4eeaa8;
  }
  .ct-open-badge-closed-dark {
    background:rgba(224,82,82,0.15);
    border:1px solid rgba(224,82,82,0.35);
    color:#ff8a8a;
  }
  .ct-open-dot { width:7px;height:7px; border-radius:50%; animation:pulse 2s infinite; }

  /* ══════════════════════════════════════════════
     FAQ SECTION — WARM DARK (FIXED)
  ══════════════════════════════════════════════ */
  .ct-faq-section {
    background: #1c2b22;
    padding:80px 0;
    border-top:1px solid rgba(255,255,255,0.06);
  }

  /* FAQ section heading overrides */
  .ct-faq-section .faq-main-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(2rem,3vw,2.8rem); font-weight:700;
    color:#ffffff; margin-bottom:10px;
  }
  .ct-faq-section .faq-sub {
    color:rgba(255,255,255,0.45); font-size:0.9rem; max-width:480px; margin:0 auto;
  }
  .ct-faq-section .label-tag { color:var(--gold-l); justify-content:center; }
  .ct-faq-section .label-tag::before { background:var(--gold-l); }

  .ct-faq-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:48px; }

  /* FAQ Cards — dark style */
  .ct-faq-card {
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:18px; padding:26px 28px;
    cursor:pointer; transition:all 0.28s;
  }
  .ct-faq-card:hover {
    border-color:rgba(90,148,112,0.5);
    background:rgba(61,107,79,0.12);
    box-shadow:0 8px 32px rgba(0,0,0,0.25);
  }
  .ct-faq-card.open {
    border-color:rgba(90,148,112,0.55);
    background:rgba(61,107,79,0.15);
    box-shadow:0 8px 32px rgba(0,0,0,0.25);
  }
  .ct-faq-q { display:flex; justify-content:space-between; align-items:center; gap:14px; }
  .ct-faq-qtext { font-weight:600; color:#ffffff; font-size:0.9rem; line-height:1.5; }
  .ct-faq-arrow {
    width:28px;height:28px; border-radius:50%;
    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14);
    display:flex; align-items:center; justify-content:center;
    font-size:0.75rem; color:rgba(255,255,255,0.6);
    flex-shrink:0; transition:transform 0.25s,background 0.25s;
  }
  .ct-faq-card.open .ct-faq-arrow { transform:rotate(180deg); background:var(--sage-l); color:#fff; border-color:var(--sage-l); }
  .ct-faq-a {
    font-size:0.84rem; color:rgba(255,255,255,0.55);
    line-height:1.8; margin-top:14px; padding-top:14px;
    border-top:1px solid rgba(255,255,255,0.1); display:none;
  }
  .ct-faq-card.open .ct-faq-a { display:block; animation:fadeUp 0.3s ease; }

  /* FAQ Bottom CTA — dark card */
  .ct-faq-cta {
    text-align:center; margin-top:56px; padding:44px;
    background:rgba(255,255,255,0.05);
    border-radius:24px; border:1px solid rgba(255,255,255,0.1);
  }
  .ct-faq-cta h3 {
    font-family:'Cormorant Garamond',serif; font-size:1.7rem; font-weight:700;
    color:#ffffff; margin-bottom:10px;
  }
  .ct-faq-cta p {
    color:rgba(255,255,255,0.45); font-size:0.9rem;
    margin:0 auto 24px; max-width:400px;
  }

  /* ── TOAST ── */
  .ct-toast {
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
    padding:13px 28px; border-radius:50px; z-index:9999;
    font-size:0.86rem; font-weight:600; font-family:'Outfit',sans-serif;
    box-shadow:0 12px 36px rgba(0,0,0,0.15); animation:fadeUp 0.3s ease both;
    display:flex; align-items:center; gap:8px;
  }
  .ct-toast-ok  { background:var(--sage-d); color:#fff; }
  .ct-toast-err { background:#5a1000; color:#ffa0a0; }

  /* ── RESPONSIVE ── */
  @media(max-width:1100px){
    .ct-grid,.ct-map-grid { grid-template-columns:1fr; gap:40px; }
    .ct-form-box { position:static; }
    .ct-wrap { padding:0 36px; }
    .ct-hero { padding:110px 36px 70px; }
    .ct-faq-grid { grid-template-columns:1fr; }
  }
  @media(max-width:680px){
    .ct-wrap { padding:0 20px; }
    .ct-hero { padding:100px 20px 60px; }
    .ct-form-box { padding:32px 24px; }
    .ct-row { grid-template-columns:1fr; }
    .ct-hours-grid { grid-template-columns:1fr; }
  }
`;

const FAQ_DATA = [
  { q:"How soon will you reply to my message?", a:"We reply to all emails and form submissions within 24 hours on working days. For urgent queries, WhatsApp is the fastest way to reach us — usually within a few minutes." },
  { q:"Can I visit the store without an appointment?", a:"Yes! Walk-ins are welcome Mon–Sat from 9 AM to 7 PM and Sunday 10 AM–5 PM. However, for consultations about a specific breed, we recommend booking a slot in advance." },
  { q:"Do you deliver pets across India?", a:"Yes, we provide safe, temperature-controlled transport for pets to all major cities across India. We partner with certified live-animal courier services." },
  { q:"What documents do I get with my pet?", a:"Every pet comes with a KCI/CFAB registration certificate, vet health certificate, vaccination record, deworming history, and a microchip report where applicable." },
  { q:"Do you offer a health guarantee on pets?", a:"Yes. All pets come with a 7-day vet-certified health guarantee. If any congenital issue is detected in this period, we offer a full refund or replacement." },
  { q:"How do I track my order/pet delivery?", a:"Once your pet or product is dispatched, you will receive a tracking link via SMS and WhatsApp. Our team also calls you on the day of arrival." },
];

const INTEREST_OPTIONS = [
  "Dog — Puppy","Dog — Adult","Cat — Kitten","Cat — Adult",
  "Bird — Parrot","Bird — Other","Fish / Aquarium","Pet Products",
  "Grooming Service","Pet Boarding","General Query",
];

export default function Contact() {
  const [tab,       setTab]    = useState("general");
  const [form,      setForm]   = useState({ name:"",email:"",phone:"",subject:"",interest:"",message:"",urgency:"normal" });
  const [charCount, setCharCount] = useState(0);
  const [sending,   setSending] = useState(false);
  const [sent,      setSent]   = useState(false);
  const [error,     setError]  = useState("");
  const [toast,     setToast]  = useState(null);
  const [faqOpen,   setFaqOpen] = useState(null);
  const [isOpen,    setIsOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const now = new Date(); const day = now.getDay(); const mins = now.getHours()*60+now.getMinutes();
    if(day>=1&&day<=6) setIsOpen(mins>=540&&mins<1140);
    else               setIsOpen(mins>=600&&mins<1020);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold:0.08 }
    );
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  }, []);

  const showToast = (msg,type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),4000); };
  const handleChange = (e) => {
    const {name,value}=e.target;
    setForm(f=>({...f,[name]:value}));
    if(name==="message") setCharCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if(!form.name||!form.email||!form.message){ setError("Please fill in all required fields."); return; }
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:form.name, from_email:form.email, phone:form.phone||"Not provided",
        subject:form.subject||(tab==="adoption"?"Pet Adoption Enquiry":"General Contact"),
        pet_interest:form.interest||"Not specified", message:form.message,
        urgency:form.urgency, reply_to:form.email, to_email:STORE_EMAIL,
      }, EMAILJS_PUBLIC_KEY);
      setSending(false); setSent(true); showToast("Message sent! We'll reply soon 🐾","ok");
    } catch(err) {
      setSending(false); setError("Failed to send. Please use WhatsApp or call us.");
      showToast("Send failed — try WhatsApp","err");
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hi Petology! 🐾\nName: ${form.name||"[name]"}\nQuery: ${form.message||"[message]"}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,"_blank");
  };
  const openInstagram = () => window.open(`https://instagram.com/${INSTAGRAM_HANDLE}`,"_blank");
  const callUs = () => { window.location.href=`tel:${STORE_PHONE.replace(/\s/g,"")}`; };
  const openEmail = () => {
    window.location.href=`mailto:${STORE_EMAIL}?subject=${encodeURIComponent(form.subject||"Enquiry — Petology")}&body=${encodeURIComponent(form.message||"")}`;
  };
  const resetForm = () => { setSent(false); setForm({name:"",email:"",phone:"",subject:"",interest:"",message:"",urgency:"normal"}); setCharCount(0); };

  return (
    <>
      <style>{STYLES}</style>
      {toast && <div className={`ct-toast ct-toast-${toast.type}`}>{toast.msg}</div>}
      <Nav />

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-noise" />
        <div className="ct-orb ct-orb-1" />
        <div className="ct-orb ct-orb-2" />
        <div className="ct-hero-inner">
          <div className="ct-breadcrumb">
            <a href="/">Home</a><span>›</span>
            <span style={{color:"rgba(255,255,255,0.6)"}}>Contact Us</span>
          </div>
          <div className="ct-hero-chip">
            <span className="ct-live-dot" />
            {isOpen ? "Store is Open Right Now" : "Store Currently Closed"}
          </div>
          <h1 className="ct-hero-title">Let's Start a<br/><em>Conversation</em></h1>
          <p className="ct-hero-sub">Whether you're adopting your first pet, need expert advice, or want to book a service — we're just one message away.</p>
          <div className="ct-channels">
            <button className="ct-channel-pill wa" onClick={openWhatsApp}>💬 WhatsApp</button>
            <button className="ct-channel-pill ig" onClick={openInstagram}>📸 Instagram</button>
            <button className="ct-channel-pill em" onClick={openEmail}>✉️ Email Us</button>
            <button className="ct-channel-pill" onClick={callUs}>📞 Call Now</button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="ct-main">
        <div className="ct-wrap">
          <div className="ct-grid">
            {/* LEFT */}
            <div>
              <div className="reveal-l">
                <div className="label-tag">Reach Us</div>
                <h2 className="ct-left-title">We're Here<br/>For You & Your Pet</h2>
                <p className="ct-left-sub">Got a question? Want to adopt a pet? Choose your preferred channel — every message reaches us instantly.</p>
              </div>
              <div className="ct-info-list reveal">
                {[
                  {icon:"📍",title:"Visit Our Store",val:STORE_ADDRESS},
                  {icon:"📞",title:"Call Us",val:STORE_PHONE+"\n"+STORE_HOURS.split("\n")[0]},
                  {icon:"✉️",title:"Email Us",val:STORE_EMAIL+"\nReply within 24 hours"},
                  {icon:"⏰",title:"Working Hours",val:STORE_HOURS},
                ].map((item,i)=>(
                  <div className="ct-info-card" key={i}>
                    <div className="ct-info-icon">{item.icon}</div>
                    <div><div className="ct-info-title">{item.title}</div><div className="ct-info-val">{item.val}</div></div>
                  </div>
                ))}
              </div>
              <div className="ct-channels-section reveal">
                <div className="ct-channels-title">Reach Us Instantly On</div>
                <div className="ct-channel-btns">
                  <button className="ct-ch-btn ct-ch-btn-wa" onClick={openWhatsApp}>
                    <div className="ct-ch-icon ct-ch-icon-wa">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                    <div className="ct-ch-text"><div className="ct-ch-label">WhatsApp</div><div className="ct-ch-hint">Usually replies in minutes</div></div>
                    <span className="ct-ch-arrow">→</span>
                  </button>
                  <button className="ct-ch-btn ct-ch-btn-ig" onClick={openInstagram}>
                    <div className="ct-ch-icon ct-ch-icon-ig">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#e1306c"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </div>
                    <div className="ct-ch-text"><div className="ct-ch-label">Instagram DM</div><div className="ct-ch-hint">@{INSTAGRAM_HANDLE}</div></div>
                    <span className="ct-ch-arrow">→</span>
                  </button>
                  <button className="ct-ch-btn ct-ch-btn-ph" onClick={callUs}>
                    <div className="ct-ch-icon ct-ch-icon-ph">📞</div>
                    <div className="ct-ch-text"><div className="ct-ch-label">Call Directly</div><div className="ct-ch-hint">{STORE_PHONE} · Mon–Sat 9AM–7PM</div></div>
                    <span className="ct-ch-arrow">→</span>
                  </button>
                  <button className="ct-ch-btn ct-ch-btn-em" onClick={openEmail}>
                    <div className="ct-ch-icon ct-ch-icon-em">✉️</div>
                    <div className="ct-ch-text"><div className="ct-ch-label">Send Email</div><div className="ct-ch-hint">{STORE_EMAIL}</div></div>
                    <span className="ct-ch-arrow">→</span>
                  </button>
                </div>
              </div>
              <div className="reveal" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <div className={`ct-open-badge ${isOpen?"ct-open-badge-dark":"ct-open-badge-closed-dark"}`}>
                  <span className="ct-open-dot" style={{background:isOpen?"#3ecf8e":"#e05252"}}/>
                  {isOpen?"Store Open Now":"Store Closed"}
                </div>
                <div className="ct-open-badge" style={{background:"rgba(37,211,102,0.12)",border:"1px solid rgba(37,211,102,0.3)",color:"#4eeaa8"}}>
                  <span style={{fontSize:"0.9rem"}}>💬</span> WhatsApp Active 24/7
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="ct-form-box reveal-r">
              {!sent ? (
                <>
                  <div className="ct-form-title">Send a Message</div>
                  <p className="ct-form-sub">Fill this form and we'll reach you on email + WhatsApp.<br/>Average response: <strong style={{color:"var(--sage)"}}>under 2 hours</strong>.</p>
                  <div className="ct-form-tabs">
                    {[["general","💬 General Enquiry"],["adoption","🐾 Pet Adoption"]].map(([key,label])=>(
                      <button key={key} className={`ct-form-tab${tab===key?" active":""}`} onClick={()=>setTab(key)}>{label}</button>
                    ))}
                  </div>
                  {error && <div className="ct-error">⚠️ {error}</div>}
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="ct-row">
                      <div className="ct-field"><label className="ct-input-label">Full Name *</label><input className="ct-input" name="name" type="text" placeholder="e.g. Rahul Mehta" value={form.name} onChange={handleChange} required /></div>
                      <div className="ct-field"><label className="ct-input-label">Phone Number</label><input className="ct-input" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} /></div>
                    </div>
                    <div className="ct-field"><label className="ct-input-label">Email Address *</label><input className="ct-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div>
                    {tab==="adoption" && (
                      <div className="ct-field"><label className="ct-input-label">I'm Interested In</label><select className="ct-input ct-select" name="interest" value={form.interest} onChange={handleChange}><option value="">Select pet type...</option>{INTEREST_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
                    )}
                    <div className="ct-field"><label className="ct-input-label">Subject</label><input className="ct-input" name="subject" type="text" placeholder={tab==="adoption"?"e.g. Golden Retriever puppy query":"e.g. Grooming appointment"} value={form.subject} onChange={handleChange} /></div>
                    <div className="ct-field"><label className="ct-input-label">How Urgent?</label><select className="ct-input ct-select" name="urgency" value={form.urgency} onChange={handleChange}><option value="normal">🟢 No rush — reply anytime</option><option value="soon">🟡 Soon — within today</option><option value="urgent">🔴 Urgent — ASAP please</option></select></div>
                    <div className="ct-field"><label className="ct-input-label">Your Message *</label><textarea className="ct-input ct-textarea" name="message" placeholder={tab==="adoption"?"Tell us about your home, lifestyle, and what pet you're looking for...":"How can we help you today?"} value={form.message} onChange={handleChange} maxLength={1000} required /><div className="ct-char">{charCount}/1000</div></div>
                    <button className="ct-submit" type="submit" disabled={sending}>
                      {sending ? <><span className="ct-submit-spinner"/>Sending…</> : "Send Message → We'll reply on Email & WhatsApp"}
                    </button>
                    <p style={{fontSize:"0.72rem",color:"var(--dim)",textAlign:"center",marginTop:14,lineHeight:1.65}}>No spam, ever. We only reply to your query.</p>
                  </form>
                </>
              ) : (
                <div className="ct-success-box">
                  <div className="ct-success-icon">✓</div>
                  <div className="ct-success-title">Message Received!</div>
                  <p className="ct-success-text">Thank you, <strong>{form.name||"friend"}</strong>! We'll reach you within 2 hours.</p>
                  <div className="ct-success-channels" style={{marginBottom:28}}>
                    <div className="ct-success-chip">✉️ Email reply coming</div>
                    {form.phone && <div className="ct-success-chip">💬 WhatsApp reply coming</div>}
                    <div className="ct-success-chip">⏱ Within 2 hours</div>
                  </div>
                  <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                    <button style={{padding:"12px 28px",borderRadius:"50px",background:"var(--sage)",color:"#fff",border:"none",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:"0.88rem"}} onClick={openWhatsApp}>💬 Also WhatsApp us</button>
                    <button style={{padding:"12px 28px",borderRadius:"50px",background:"transparent",color:"var(--sage)",border:"1.5px solid var(--sage)",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:"0.88rem"}} onClick={resetForm}>Send Another</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAP SECTION — DARK GREEN */}
      <div className="ct-map-section">
        <div className="ct-wrap">
          <div className="ct-map-grid">
            <div className="reveal-l">
              <div className="label-tag label-tag-light">Find Us</div>
              <div className="ct-map-info-title">Come Visit Our Store</div>
              <p className="ct-map-info-text">We're located in the heart of Surat's Pet Paradise Complex — easily accessible from Ring Road. Parking available. Walk-ins welcome!</p>
              <div className="ct-hours-grid">
                {[
                  {day:"Mon – Sat",time:"9:00 AM – 7:00 PM"},
                  {day:"Sunday",time:"10:00 AM – 5:00 PM"},
                  {day:"Public Holidays",time:"10:00 AM – 4:00 PM"},
                  {day:"Emergency",time:"WhatsApp 24/7"},
                ].map((h,i)=>(
                  <div className="ct-hour-card" key={i}>
                    <div className="ct-hour-day">{h.day}</div>
                    <div className="ct-hour-time">{h.time}</div>
                  </div>
                ))}
              </div>
              <div className={`ct-open-badge ${isOpen?"ct-open-badge-dark":"ct-open-badge-closed-dark"}`}>
                <span className="ct-open-dot" style={{background:isOpen?"#3ecf8e":"#e05252"}}/>
                {isOpen ? "Open Right Now — Come on in! 🐾" : "Currently Closed — WhatsApp us anytime"}
              </div>
            </div>
            <div className="ct-map-frame reveal-r">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.7754267448977!2d72.8310!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjciTiA3MsKwNDknNTEuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                title="Petology Store Location" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION — DARK */}
      <div className="ct-faq-section">
        <div className="ct-wrap">
          <div style={{textAlign:"center",marginBottom:0}}>
            <div className="label-tag" style={{justifyContent:"center",color:"var(--gold-l)"}}>
              <span style={{display:"inline-block",width:24,height:2,background:"var(--gold-l)",borderRadius:2,marginRight:8}}/>
              FAQ
            </div>
            <h2 className="faq-main-title">Common Questions</h2>
            <p className="faq-sub">Can't find your answer? Just WhatsApp us — it's the fastest.</p>
          </div>

          <div className="ct-faq-grid">
            {FAQ_DATA.map((faq,i)=>(
              <div key={i} className={`ct-faq-card reveal${faqOpen===i?" open":""}`} onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                <div className="ct-faq-q">
                  <div className="ct-faq-qtext">{faq.q}</div>
                  <div className="ct-faq-arrow">▾</div>
                </div>
                <div className="ct-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="ct-faq-cta reveal">
            <div style={{fontSize:"2.5rem",marginBottom:14}}>🐾</div>
            <h3>Still Have Questions?</h3>
            <p>Our team loves hearing from pet parents. Reach out on any channel — we're always happy to help.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button
                style={{padding:"13px 28px",borderRadius:"50px",background:"#25d366",color:"#fff",border:"none",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:700,fontSize:"0.88rem",display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 24px rgba(37,211,102,0.3)"}}
                onClick={openWhatsApp}>💬 Chat on WhatsApp</button>
              <button
                style={{padding:"13px 28px",borderRadius:"50px",background:"var(--sage-l)",color:"#fff",border:"none",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:700,fontSize:"0.88rem",boxShadow:"0 8px 24px rgba(61,107,79,0.35)"}}
                onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>📝 Send a Message</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}