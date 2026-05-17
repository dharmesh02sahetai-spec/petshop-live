import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nev';

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
    --border2: rgba(184,146,42,0.18);
    --text:    #1c2b22;
    --text2:   #3a4a3f;
    --muted:   #7a907f;
    --dim:     #aab8ac;
    --ivory:   #fdf9f2;
    --shadow:  0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
    --radius:  20px;
    --red:     #e05252;
    --red-xs:  rgba(224,82,82,0.08);
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:var(--sage); border-radius:10px; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes popIn    { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }

  .reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease,transform 0.65s ease; }
  .reveal.visible { opacity:1; transform:none; }

  /* HERO */
  .ct-hero {
    background: linear-gradient(160deg,#1e3a28 0%,#2a5a3c 55%,#1a4030 100%);
    padding: 100px 64px 50px;
    position: relative; overflow: hidden;
  }
  .ct-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px); }
  .ct-orb-1 { width:500px;height:500px; background:radial-gradient(circle,rgba(90,148,112,0.25),transparent 65%); top:-200px;right:-100px; animation:orbDrift 10s ease-in-out infinite; }
  .ct-orb-2 { width:350px;height:350px; background:radial-gradient(circle,rgba(184,146,42,0.15),transparent 65%); bottom:-80px;left:-60px; animation:orbDrift 13s ease-in-out infinite reverse; }
  .ct-hero-inner { position:relative;z-index:2; max-width:1200px; margin:0 auto; }
  .ct-breadcrumb { display:flex;align-items:center;gap:8px;font-size:0.75rem;color:rgba(255,255,255,0.4);margin-bottom:16px; }
  .ct-breadcrumb a { color:rgba(255,255,255,0.55);text-decoration:none;transition:color 0.2s; }
  .ct-breadcrumb a:hover { color:var(--gold-l); }
  .ct-hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(2.4rem,5vw,4rem); font-weight:700; line-height:0.95;
    color:#fff; animation:fadeUp 0.5s ease both;
  }
  .ct-hero-title em { font-style:italic; color:var(--gold-l); }
  .ct-hero-sub { font-size:0.92rem; color:rgba(255,255,255,0.45); margin-top:10px; animation:fadeUp 0.5s 0.1s ease both; }

  /* MAIN */
  .ct-wrap { max-width:1200px; margin:0 auto; padding:0 64px; }
  .ct-main  { padding:48px 0 80px; background:var(--bg); }
  .ct-layout { display:grid; grid-template-columns:1fr 360px; gap:28px; align-items:start; }

  .label-tag { font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--sage);display:flex;align-items:center;gap:8px;margin-bottom:8px; }
  .label-tag::before { content:'';width:24px;height:2px;background:var(--sage);border-radius:2px; }

  /* CART TABLE */
  .ct-table-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius); overflow:hidden;
    box-shadow:var(--shadow);
  }
  .ct-table-top {
    display:flex; align-items:center; justify-content:space-between;
    padding:22px 28px; border-bottom:1px solid var(--border);
    background:var(--card);
  }
  .ct-table-title {
    font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:700; color:var(--text);
  }
  .ct-count-badge {
    background:var(--sage); color:#fff; padding:5px 14px;
    border-radius:50px; font-size:0.78rem; font-weight:700;
  }
  .ct-thead {
    display:grid; grid-template-columns:2.5fr 1fr 1.5fr 1fr 0.7fr;
    padding:12px 28px; background:var(--bg2);
    border-bottom:1px solid var(--border);
    font-size:0.7rem; font-weight:700; color:var(--muted);
    text-transform:uppercase; letter-spacing:0.12em;
  }
  .ct-row {
    display:grid; grid-template-columns:2.5fr 1fr 1.5fr 1fr 0.7fr;
    padding:18px 28px; border-bottom:1px solid var(--border);
    align-items:center; transition:background 0.2s;
  }
  .ct-row:last-of-type { border-bottom:none; }
  .ct-row:hover { background:var(--sage-xs); }

  .ct-product-cell { display:flex; align-items:center; gap:14px; }
  .ct-product-img {
    width:60px; height:60px; border-radius:12px; object-fit:cover;
    border:1px solid var(--border); flex-shrink:0; background:var(--card);
  }
  .ct-product-img-placeholder {
    width:60px; height:60px; border-radius:12px; flex-shrink:0;
    background:linear-gradient(135deg,var(--sage-xs),var(--gold-xs));
    border:1px solid var(--border);
    display:flex; align-items:center; justify-content:center; font-size:1.8rem;
  }
  .ct-product-name {
    font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:700;
    color:var(--text); margin-bottom:3px; line-height:1.2;
  }
  .ct-product-category {
    font-size:0.72rem; color:var(--muted); font-weight:500;
    background:var(--sage-xs); border:1px solid var(--border);
    border-radius:50px; padding:2px 8px; display:inline-block;
  }

  .ct-price {
    font-family:'Cormorant Garamond',serif; font-size:1.1rem;
    font-weight:700; color:var(--sage-d);
  }

  .ct-qty { display:flex; align-items:center; gap:8px; }
  .ct-qty-btn {
    width:32px; height:32px; border-radius:10px;
    border:1.5px solid var(--border); background:var(--surface);
    color:var(--sage); font-weight:700; font-size:1.1rem;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:all 0.2s;
  }
  .ct-qty-btn:hover { background:var(--sage); color:#fff; border-color:var(--sage); }
  .ct-qty-btn:disabled { opacity:0.4; cursor:not-allowed; }
  .ct-qty-num {
    font-weight:700; min-width:26px; text-align:center; color:var(--text);
    font-family:'Cormorant Garamond',serif; font-size:1.15rem;
  }

  .ct-row-total {
    font-family:'Cormorant Garamond',serif; font-size:1.1rem;
    font-weight:700; color:var(--text);
  }

  .ct-del-btn {
    width:34px; height:34px; border-radius:10px;
    background:var(--red-xs); border:1px solid rgba(224,82,82,0.2);
    color:var(--red); cursor:pointer; font-size:1rem;
    display:flex; align-items:center; justify-content:center;
    transition:all 0.22s;
  }
  .ct-del-btn:hover { background:var(--red); color:#fff; border-color:var(--red); transform:scale(1.08); }
  .ct-del-btn:disabled { opacity:0.4; cursor:not-allowed; transform:none; }

  /* SUMMARY */
  .ct-summary-section {
    padding:22px 28px; background:var(--card);
    border-top:2px solid var(--border);
  }
  .ct-summary-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:9px 0; font-size:0.9rem; color:var(--text2);
    border-bottom:1px dashed var(--border);
  }
  .ct-summary-row:last-of-type { border-bottom:none; }
  .ct-summary-label { font-weight:500; }
  .ct-summary-val { font-weight:600; }
  .ct-summary-free { color:var(--sage-l); font-weight:700; }
  .ct-summary-total-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 0 4px; border-top:2px solid var(--border); margin-top:8px;
  }
  .ct-summary-total-label {
    font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--text);
  }
  .ct-summary-total-val {
    font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; color:var(--sage-d);
  }

  .ct-btn-row { display:flex; gap:12px; padding:20px 28px; border-top:1px solid var(--border); }
  .ct-continue-btn {
    flex:1; padding:13px 20px; border-radius:50px;
    background:var(--surface); color:var(--text2);
    border:1.5px solid var(--border); cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:600; font-size:0.88rem;
    transition:all 0.25s;
  }
  .ct-continue-btn:hover { border-color:rgba(61,107,79,0.4); color:var(--sage); background:var(--sage-xs); }
  .ct-checkout-btn {
    flex:2.5; padding:14px 24px; border-radius:50px;
    background:var(--sage-l); color:#fff;
    border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem;
    transition:all 0.25s; box-shadow:0 8px 28px rgba(61,107,79,0.3);
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .ct-checkout-btn:hover { background:var(--sage-d); transform:translateY(-2px); }

  /* SIDEBAR */
  .ct-sidebar { display:flex; flex-direction:column; gap:16px; position:sticky; top:96px; }

  .ct-promo-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius); padding:22px 24px; box-shadow:var(--shadow);
  }
  .ct-promo-title {
    font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700;
    color:var(--text); margin-bottom:14px;
  }
  .ct-promo-row { display:flex; gap:8px; }
  .ct-promo-input {
    flex:1; padding:11px 16px; border-radius:12px;
    border:1.5px solid var(--border); background:var(--card);
    font-family:'Outfit',sans-serif; font-size:0.85rem; color:var(--text);
    outline:none; transition:all 0.22s;
  }
  .ct-promo-input:focus { border-color:var(--sage); box-shadow:0 0 0 3px rgba(61,107,79,0.1); }
  .ct-promo-input::placeholder { color:var(--dim); }
  .ct-promo-btn {
    padding:11px 18px; border-radius:12px;
    background:var(--sage); color:#fff; border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:700; font-size:0.82rem;
    transition:all 0.22s;
  }
  .ct-promo-btn:hover { background:var(--sage-d); }
  .ct-promo-btn:disabled { opacity:0.6; cursor:not-allowed; }

  .ct-order-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--radius); padding:24px; box-shadow:var(--shadow);
  }
  .ct-order-title {
    font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700;
    color:var(--text); margin-bottom:18px; padding-bottom:14px;
    border-bottom:1px solid var(--border);
  }
  .ct-order-row { display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.87rem; }
  .ct-order-label { color:var(--muted); font-weight:500; }
  .ct-order-val { color:var(--text); font-weight:600; }
  .ct-order-divider { border:none; border-top:1px solid var(--border); margin:14px 0; }
  .ct-order-total-label { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--text); }
  .ct-order-total-val { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--sage-d); }

  .ct-checkout-big-btn {
    width:100%; padding:16px; border-radius:50px;
    background:linear-gradient(135deg,var(--sage-l),var(--sage-d));
    color:#fff; border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:700; font-size:1rem;
    margin-top:18px; box-shadow:0 10px 32px rgba(61,107,79,0.35);
    transition:all 0.28s; display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .ct-checkout-big-btn:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(61,107,79,0.42); }

  .ct-secure-badges { display:flex; gap:8px; justify-content:center; margin-top:14px; flex-wrap:wrap; }
  .ct-secure-badge {
    display:flex; align-items:center; gap:4px;
    font-size:0.7rem; color:var(--muted); font-weight:500;
    background:var(--sage-xs); border:1px solid var(--border);
    border-radius:50px; padding:4px 10px;
  }

  .ct-trust-card {
    background:linear-gradient(135deg,var(--sage-xs),var(--gold-xs));
    border:1px solid var(--border2); border-radius:var(--radius);
    padding:20px 22px;
  }
  .ct-trust-item { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .ct-trust-item:last-child { margin-bottom:0; }
  .ct-trust-icon { font-size:1.3rem; flex-shrink:0; }
  .ct-trust-text { font-size:0.8rem; color:var(--text2); font-weight:500; line-height:1.5; }
  .ct-trust-text strong { color:var(--sage-d); display:block; font-size:0.83rem; }

  /* EMPTY */
  .ct-empty {
    text-align:center; padding:70px 40px;
    display:flex; flex-direction:column; align-items:center;
  }
  .ct-empty-icon { font-size:72px; margin-bottom:20px; animation:popIn 0.5s ease both; }
  .ct-empty-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:var(--text); margin-bottom:10px; }
  .ct-empty-sub { font-size:0.9rem; color:var(--muted); margin-bottom:28px; line-height:1.7; max-width:380px; }
  .ct-empty-cats { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:32px; }
  .ct-empty-cat {
    display:flex; align-items:center; gap:6px; padding:8px 16px;
    border-radius:50px; border:1.5px solid var(--border); background:var(--surface);
    font-size:0.82rem; font-weight:600; color:var(--text2); cursor:pointer;
    transition:all 0.25s;
  }
  .ct-empty-cat:hover { background:var(--sage); color:#fff; border-color:var(--sage); transform:translateY(-2px); }
  .ct-shop-btn {
    padding:14px 36px; border-radius:50px;
    background:var(--sage-l); color:#fff; border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem;
    box-shadow:0 8px 28px rgba(61,107,79,0.3); transition:all 0.25s;
  }
  .ct-shop-btn:hover { background:var(--sage-d); transform:translateY(-2px); }

  /* LOADING */
  .ct-loading { text-align:center; padding:70px 40px; }
  .ct-spinner {
    width:44px; height:44px; border:3px solid var(--border);
    border-top:3px solid var(--sage); border-radius:50%;
    animation:spin 0.8s linear infinite; margin:0 auto 20px;
  }
  .ct-loading-text { font-size:0.9rem; color:var(--muted); }

  /* RESPONSIVE */
  @media(max-width:1100px){
    .ct-layout { grid-template-columns:1fr; }
    .ct-sidebar { position:static; }
    .ct-wrap { padding:0 36px; }
    .ct-hero { padding:100px 36px 44px; }
  }
  @media(max-width:680px){
    .ct-wrap { padding:0 16px; }
    .ct-hero { padding:90px 16px 36px; }
    .ct-thead { display:none; }
    .ct-row { grid-template-columns:1fr; gap:10px; padding:18px; }
    .ct-btn-row { flex-direction:column; }
    .ct-continue-btn,.ct-checkout-btn { flex:none; width:100%; }
    .ct-table-top { padding:16px 18px; }
    .ct-summary-section { padding:18px; }
    .ct-promo-row { flex-direction:column; }
    .ct-promo-btn { width:100%; }
  }
`;

// ─── Helpers ───────────────────────────────────────────────────
const BASE = "http://localhost/Petshop";

const getCategoryEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("dog") || n.includes("puppy") || n.includes("golden") || n.includes("labrador") || n.includes("husky") || n.includes("terrier") || n.includes("alaskan") || n.includes("malamute") || n.includes("affenpinscher")) return "🐕";
  if (n.includes("cat") || n.includes("kitten") || n.includes("persian") || n.includes("maine")) return "🐱";
  if (n.includes("bird") || n.includes("parrot") || n.includes("ringneck") || n.includes("cockatiel")) return "🦜";
  if (n.includes("fish") || n.includes("aqua") || n.includes("arowana") || n.includes("betta")) return "🐠";
  if (n.includes("rabbit")) return "🐇";
  return "🐾";
};

const getCategory = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("dog") || n.includes("puppy") || n.includes("golden") || n.includes("labrador") || n.includes("husky") || n.includes("terrier") || n.includes("alaskan") || n.includes("malamute") || n.includes("affenpinscher")) return "Dog";
  if (n.includes("cat") || n.includes("kitten") || n.includes("persian") || n.includes("maine")) return "Cat";
  if (n.includes("bird") || n.includes("parrot") || n.includes("ringneck")) return "Bird";
  if (n.includes("fish") || n.includes("aqua") || n.includes("arowana")) return "Fish";
  if (n.includes("rabbit")) return "Rabbit";
  return "Pet";
};

// ─── Component ────────────────────────────────────────────────
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [promoCode, setPromoCode]       = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  // Per-item loading state to disable buttons during API calls
  const [busyItems, setBusyItems]       = useState({});

  // ── Safe uid retrieval ────────────────────────────────────
  const uid = (() => {
    try { return localStorage.getItem("id") || "1"; }
    catch(e) { return "1"; }
  })();

  // ── Parse showcart.php response ───────────────────────────
const parseCartData = (data) => {
  if (!Array.isArray(data)) return [];
  return data
    .filter(item => item && (item.pname || item.name))
    .map((item) => ({
      cart_id: parseInt(item.cart_id || item.id || 0),
      pid:     parseInt(item.pid || item.product_id || 0), // ✅ pid clearly parse karo
      pname:   item.pname || item.name || "Unknown",
      price:   parseFloat(item.price || 0),
      quantity: parseInt(item.quantity || 1),
      image:   item.image || "",
    }))
    .filter(item => item.pid > 0); // ✅ pid=0 wale items reject karo
};

  // ── Load cart from DB ─────────────────────────────────────
  function loadCart() {
    setLoading(true);
    fetch(`${BASE}/showcart.php?uid=${uid}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(text => {
        let data = [];
        try { data = JSON.parse(text); }
        catch(e) { data = []; }
        setCartItems(parseCartData(data));
        setLoading(false);
      })
      .catch(() => {
        setCartItems([]);
        setLoading(false);
      });
  }

  useEffect(() => { loadCart(); }, []);

  useEffect(() => {
    if (!loading) {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.07 }
      );
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }
  }, [loading]);

  // ── Mark item as busy/free ─────────────────────────────────
  const setBusy = (pid, val) =>
    setBusyItems(prev => ({ ...prev, [pid]: val }));

  // ── ✅ FIX: increaseQty — calls updatecart.php ─────────────
  const increaseQty = (item) => {
    if (busyItems[item.pid]) return;
    const newQty = item.quantity + 1;

    // Optimistic UI update
    setCartItems(prev =>
      prev.map(i => i.pid === item.pid ? { ...i, quantity: newQty } : i)
    );
    setBusy(item.pid, true);

    fetch(`${BASE}/updatecart.php?uid=${uid}&pid=${item.pid}&quantity=${newQty}`)
      .then(res => res.json())
      .then(data => {
        if (data.status !== "updated") {
          // Rollback on failure
          setCartItems(prev =>
            prev.map(i => i.pid === item.pid ? { ...i, quantity: item.quantity } : i)
          );
        }
      })
      .catch(() => {
        // Rollback on network error
        setCartItems(prev =>
          prev.map(i => i.pid === item.pid ? { ...i, quantity: item.quantity } : i)
        );
      })
      .finally(() => setBusy(item.pid, false));
  };

  // ── ✅ FIX: decreaseQty — calls updatecart.php or deletecart.php ──
  const decreaseQty = (item) => {
    if (busyItems[item.pid]) return;
    if (item.quantity <= 1) {
      // If qty becomes 0, delete the item
      deleteItem(item);
      return;
    }
    const newQty = item.quantity - 1;

    // Optimistic UI update
    setCartItems(prev =>
      prev.map(i => i.pid === item.pid ? { ...i, quantity: newQty } : i)
    );
    setBusy(item.pid, true);

    fetch(`${BASE}/updatecart.php?uid=${uid}&pid=${item.pid}&quantity=${newQty}`)
      .then(res => res.json())
      .then(data => {
        if (data.status !== "updated") {
          setCartItems(prev =>
            prev.map(i => i.pid === item.pid ? { ...i, quantity: item.quantity } : i)
          );
        }
      })
      .catch(() => {
        setCartItems(prev =>
          prev.map(i => i.pid === item.pid ? { ...i, quantity: item.quantity } : i)
        );
      })
      .finally(() => setBusy(item.pid, false));
  };

  // ── ✅ FIX: deleteItem — calls deletecart.php ──────────────
  const deleteItem = (item) => {
    if (busyItems[item.pid]) return;

    // Optimistic UI remove
    setCartItems(prev => prev.filter(i => i.pid !== item.pid));
    setBusy(item.pid, true);

    fetch(`${BASE}/deletecart.php?uid=${uid}&pid=${item.pid}`)
      .then(res => res.json())
      .then(data => {
        if (data.status !== "deleted") {
          // Rollback — re-add item back
          setCartItems(prev => [...prev, item].sort((a, b) => b.cart_id - a.cart_id));
        }
      })
      .catch(() => {
        // Rollback on network error
        setCartItems(prev => [...prev, item].sort((a, b) => b.cart_id - a.cart_id));
      })
      .finally(() => setBusy(item.pid, false));
  };

  // ── Totals ────────────────────────────────────────────────
  const calcTotal = () => cartItems.reduce((t, i) => t + (i.price * i.quantity), 0);
  const calcItems = () => cartItems.reduce((t, i) => t + i.quantity, 0);
  const discount   = promoApplied ? Math.round(calcTotal() * 0.1) : 0;
  const finalTotal = calcTotal() - discount;

  function goCheckout() {
    try {
      localStorage.setItem("totalitem", calcItems());
      localStorage.setItem("item", finalTotal);
    } catch(e) {}
    navigate('/checkout');
  }

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "PETOLOGY10") {
      setPromoApplied(true);
    } else {
      alert("❌ Invalid promo code.\nTry: PETOLOGY10");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <Nav />

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-orb ct-orb-1" />
        <div className="ct-orb ct-orb-2" />
        <div className="ct-hero-inner">
          <div className="ct-breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <span style={{ color:"rgba(255,255,255,0.6)" }}>Shopping Cart</span>
          </div>
          <h1 className="ct-hero-title">Your <em>Cart</em></h1>
          <p className="ct-hero-sub">
            {loading
              ? "Loading your items..."
              : cartItems.length === 0
              ? "Your cart is empty — explore our pets!"
              : `${calcItems()} item${calcItems() > 1 ? "s" : ""} waiting for you`}
          </p>
        </div>
      </section>

      {/* MAIN */}
      <div className="ct-main">
        <div className="ct-wrap">

          {loading ? (
            <div className="ct-table-card ct-loading reveal">
              <div className="ct-spinner" />
              <div className="ct-loading-text">Cart load ho raha hai...</div>
            </div>

          ) : cartItems.length === 0 ? (
            <div className="ct-table-card reveal">
              <div className="ct-empty">
                <div className="ct-empty-icon">🛒</div>
                <div className="ct-empty-title">Cart Khali Hai!</div>
                <p className="ct-empty-sub">
                  Koi item nahi hai abhi. Pets explore karein aur apna favourite add karein!
                </p>
                <div className="ct-empty-cats">
                  {[["🐕","Dogs"],["🐱","Cats"],["🦜","Birds"],["🐠","Fish"]].map(([icon,label])=>(
                    <div className="ct-empty-cat" key={label} onClick={()=>navigate('/product')}>
                      {icon} {label}
                    </div>
                  ))}
                </div>
                <button className="ct-shop-btn" onClick={()=>navigate('/product')}>
                  🐾 Shop Now
                </button>
              </div>
            </div>

          ) : (
            <div className="ct-layout">

              {/* LEFT — Items */}
              <div>
                <div className="ct-table-card reveal">
                  <div className="ct-table-top">
                    <div className="ct-table-title">Shopping Cart</div>
                    <div className="ct-count-badge">{calcItems()} items</div>
                  </div>

                  {/* Desktop header */}
                  <div className="ct-thead">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <span></span>
                  </div>

                  {/* Rows */}
                  {cartItems.map(item => (
                    <div className="ct-row" key={item.pid}>

                      {/* Product cell */}
                      <div className="ct-product-cell">
                        {item.image && item.image.trim()
                          ? (
                            <img
                              className="ct-product-img"
                              src={item.image}
                              alt={item.pname}
                              onError={e => { e.target.onerror=null; e.target.style.display="none"; }}
                            />
                          )
                          : (
                            <div className="ct-product-img-placeholder">
                              {getCategoryEmoji(item.pname)}
                            </div>
                          )
                        }
                        <div>
                          <div className="ct-product-name">{item.pname}</div>
                          <span className="ct-product-category">
                            {getCategoryEmoji(item.pname)}&nbsp;{getCategory(item.pname)}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="ct-price">
                        ₹{(item.price || 0).toLocaleString("en-IN")}
                      </div>

                      {/* Qty — buttons disabled while API call in progress */}
                      <div className="ct-qty">
                        <button
                          className="ct-qty-btn"
                          onClick={() => decreaseQty(item)}
                          disabled={!!busyItems[item.pid]}
                        >−</button>
                        <span className="ct-qty-num">{item.quantity}</span>
                        <button
                          className="ct-qty-btn"
                          onClick={() => increaseQty(item)}
                          disabled={!!busyItems[item.pid]}
                        >+</button>
                      </div>

                      {/* Row total */}
                      <div className="ct-row-total">
                        ₹{((item.price || 0) * item.quantity).toLocaleString("en-IN")}
                      </div>

                      {/* Delete */}
                      <button
                        className="ct-del-btn"
                        onClick={() => deleteItem(item)}
                        disabled={!!busyItems[item.pid]}
                        title="Remove"
                      >
                        🗑
                      </button>
                    </div>
                  ))}

                  {/* Summary */}
                  <div className="ct-summary-section">
                    <div className="ct-summary-row">
                      <span className="ct-summary-label">Subtotal ({calcItems()} items)</span>
                      <span className="ct-summary-val">₹{calcTotal().toLocaleString("en-IN")}</span>
                    </div>
                    {promoApplied && (
                      <div className="ct-summary-row">
                        <span className="ct-summary-label">🎉 Discount (10%)</span>
                        <span className="ct-summary-val" style={{color:"var(--red)"}}>
                          − ₹{discount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="ct-summary-row">
                      <span className="ct-summary-label">Delivery</span>
                      <span className="ct-summary-free">FREE 🎁</span>
                    </div>
                    <div className="ct-summary-total-row">
                      <span className="ct-summary-total-label">Total</span>
                      <span className="ct-summary-total-val">₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="ct-btn-row">
                    <button className="ct-continue-btn" onClick={() => navigate('/product')}>
                      ← Continue Shopping
                    </button>
                    <button className="ct-checkout-btn" onClick={goCheckout}>
                      🔐 Proceed to Checkout →
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT — Sidebar */}
              <div className="ct-sidebar">

                {/* Promo */}
                <div className="ct-promo-card reveal">
                  <div className="label-tag">Promo Code</div>
                  <div className="ct-promo-title">Have a Coupon?</div>
                  <div className="ct-promo-row">
                    <input
                      className="ct-promo-input"
                      placeholder="e.g. PETOLOGY10"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button className="ct-promo-btn" onClick={handlePromo} disabled={promoApplied}>
                      {promoApplied ? "✓ Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p style={{fontSize:"0.75rem",color:"var(--sage)",marginTop:"10px",fontWeight:600}}>
                      ✅ 10% discount applied!
                    </p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="ct-order-card reveal">
                  <div className="ct-order-title">Order Summary</div>

                  {cartItems.map(item => (
                    <div className="ct-order-row" key={item.pid}>
                      <span className="ct-order-label">
                        {getCategoryEmoji(item.pname)} {item.pname}
                        <span style={{color:"var(--dim)",marginLeft:4}}>×{item.quantity}</span>
                      </span>
                      <span className="ct-order-val">
                        ₹{((item.price || 0) * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}

                  <hr className="ct-order-divider" />

                  <div className="ct-order-row">
                    <span className="ct-order-label">Subtotal</span>
                    <span className="ct-order-val">₹{calcTotal().toLocaleString("en-IN")}</span>
                  </div>
                  {promoApplied && (
                    <div className="ct-order-row">
                      <span className="ct-order-label">Discount</span>
                      <span className="ct-order-val" style={{color:"var(--red)"}}>
                        −₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="ct-order-row">
                    <span className="ct-order-label">Delivery</span>
                    <span className="ct-order-val" style={{color:"var(--sage-l)"}}>FREE</span>
                  </div>

                  <hr className="ct-order-divider" />

                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span className="ct-order-total-label">Grand Total</span>
                    <span className="ct-order-total-val">₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>

                  <button className="ct-checkout-big-btn" onClick={goCheckout}>
                    🔐 Secure Checkout →
                  </button>

                  <div className="ct-secure-badges">
                    <span className="ct-secure-badge">🔒 SSL Secure</span>
                    <span className="ct-secure-badge">✅ Razorpay</span>
                    <span className="ct-secure-badge">📱 UPI Ready</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="ct-trust-card reveal">
                  {[
                    {icon:"🚚", strong:"Free Delivery", text:"On all orders — pets & products"},
                    {icon:"🔄", strong:"Easy Returns",  text:"7-day return policy on all products"},
                    {icon:"🐾", strong:"Health Guarantee", text:"All pets: 7-day health guarantee"},
                    {icon:"💬", strong:"24/7 Support",  text:"WhatsApp us anytime for help"},
                  ].map((t,i) => (
                    <div className="ct-trust-item" key={i}>
                      <span className="ct-trust-icon">{t.icon}</span>
                      <div className="ct-trust-text">
                        <strong>{t.strong}</strong>
                        {t.text}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;