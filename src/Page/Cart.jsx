import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nev';

// ─── API URLs ─────────────────────────────────────────────────
const BASE        = "http://localhost/Petshop";
const SHOWCART    = `${BASE}/showcart.php`;
const DELETECART  = `${BASE}/deletecart.php`;
const ADDTOCART   = `${BASE}/addtocart.php`;

// ─── Safe localStorage ────────────────────────────────────────
const ls = {
  get: (k)    => { try { return localStorage.getItem(k); }    catch(e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); }        catch(e) {} },
};

// ─── Helpers ──────────────────────────────────────────────────
const getEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("dog")||n.includes("golden")||n.includes("labrador")||
      n.includes("husky")||n.includes("terrier")||n.includes("alaskan")||
      n.includes("affenpinscher")||n.includes("malamute")) return "🐕";
  if (n.includes("cat")||n.includes("persian")||n.includes("maine"))  return "🐱";
  if (n.includes("bird")||n.includes("parrot")||n.includes("ringneck")) return "🦜";
  if (n.includes("fish")||n.includes("arowana")||n.includes("betta"))  return "🐠";
  if (n.includes("rabbit")) return "🐇";
  return "🐾";
};

const getCat = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("dog")||n.includes("golden")||n.includes("labrador")||
      n.includes("husky")||n.includes("terrier")||n.includes("alaskan")||
      n.includes("affenpinscher")||n.includes("malamute")) return "Dog";
  if (n.includes("cat")||n.includes("persian")||n.includes("maine"))  return "Cat";
  if (n.includes("bird")||n.includes("parrot")||n.includes("ringneck")) return "Bird";
  if (n.includes("fish")||n.includes("arowana")||n.includes("betta"))  return "Fish";
  if (n.includes("rabbit")) return "Rabbit";
  return "Pet";
};

// ─── STYLES ───────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --bg:#f4f1eb; --bg2:#ede8de; --surface:#fff; --card:#faf8f4;
  --sage:#3d6b4f; --sage-d:#2a4e39; --sage-l:#5a9470;
  --sage-xs:rgba(61,107,79,0.09); --sage-sm:rgba(61,107,79,0.18);
  --gold:#b8922a; --gold-l:#d4ac48; --gold-xs:rgba(184,146,42,0.12);
  --border:rgba(61,107,79,0.13); --border2:rgba(184,146,42,0.18);
  --text:#1c2b22; --text2:#3a4a3f; --muted:#7a907f; --dim:#aab8ac;
  --ivory:#fdf9f2;
  --shadow:0 4px 24px rgba(30,50,35,0.08);
  --shadow-lg:0 16px 60px rgba(30,50,35,0.14);
  --radius:20px;
  --red:#e05252; --red-xs:rgba(224,82,82,0.08);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--sage);border-radius:10px;}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes orbDrift{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(40px,-30px) scale(1.08)}70%{transform:translate(-20px,20px) scale(0.96)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes popIn{0%{transform:scale(0.85);opacity:0}70%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
@keyframes slideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(60px)}}

.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.visible{opacity:1;transform:none;}

/* ── HERO ── */
.ct-hero{
  background:linear-gradient(160deg,#1e3a28 0%,#2a5a3c 55%,#1a4030 100%);
  padding:100px 64px 50px; position:relative; overflow:hidden;
}
.ct-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px);}
.ct-orb-1{width:500px;height:500px;background:radial-gradient(circle,rgba(90,148,112,0.25),transparent 65%);top:-200px;right:-100px;animation:orbDrift 10s ease-in-out infinite;}
.ct-orb-2{width:350px;height:350px;background:radial-gradient(circle,rgba(184,146,42,0.15),transparent 65%);bottom:-80px;left:-60px;animation:orbDrift 13s ease-in-out infinite reverse;}
.ct-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;}
.ct-breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.75rem;color:rgba(255,255,255,0.4);margin-bottom:16px;}
.ct-breadcrumb a{color:rgba(255,255,255,0.55);text-decoration:none;}
.ct-breadcrumb a:hover{color:var(--gold-l);}
.ct-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5vw,4rem);font-weight:700;line-height:0.95;color:#fff;animation:fadeUp 0.5s ease both;}
.ct-hero-title em{font-style:italic;color:var(--gold-l);}
.ct-hero-sub{font-size:0.92rem;color:rgba(255,255,255,0.45);margin-top:10px;animation:fadeUp 0.5s 0.1s ease both;}

/* ── LAYOUT ── */
.ct-main{padding:48px 0 80px;background:var(--bg);}
.ct-wrap{max-width:1200px;margin:0 auto;padding:0 64px;}
.ct-layout{display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start;}

.label-tag{font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--sage);display:flex;align-items:center;gap:8px;margin-bottom:8px;}
.label-tag::before{content:'';width:24px;height:2px;background:var(--sage);border-radius:2px;}

/* ── CART TABLE ── */
.ct-table-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);}
.ct-table-top{display:flex;align-items:center;justify-content:space-between;padding:22px 28px;border-bottom:1px solid var(--border);background:var(--card);}
.ct-table-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:var(--text);}
.ct-count-badge{background:var(--sage);color:#fff;padding:5px 14px;border-radius:50px;font-size:0.78rem;font-weight:700;}

.ct-thead{display:grid;grid-template-columns:2.5fr 1fr 1.5fr 1fr 0.7fr;padding:12px 28px;background:var(--bg2);border-bottom:1px solid var(--border);font-size:0.7rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;}

/* ── ITEM ROW ── */
.ct-row{
  display:grid;grid-template-columns:2.5fr 1fr 1.5fr 1fr 0.7fr;
  padding:18px 28px;border-bottom:1px solid var(--border);
  align-items:center;transition:background 0.2s, opacity 0.3s, transform 0.3s;
}
.ct-row:last-of-type{border-bottom:none;}
.ct-row:hover{background:var(--sage-xs);}
.ct-row.removing{opacity:0;transform:translateX(60px);pointer-events:none;}

.ct-product-cell{display:flex;align-items:center;gap:14px;}
.ct-product-img{width:60px;height:60px;border-radius:12px;object-fit:cover;border:1px solid var(--border);flex-shrink:0;background:var(--card);}
.ct-product-placeholder{width:60px;height:60px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,var(--sage-xs),var(--gold-xs));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.8rem;}
.ct-product-name{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:3px;line-height:1.2;}
.ct-product-cat{font-size:0.72rem;color:var(--muted);font-weight:500;background:var(--sage-xs);border:1px solid var(--border);border-radius:50px;padding:2px 8px;display:inline-block;}

.ct-price{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--sage-d);}

/* ── QUANTITY ── */
.ct-qty{display:flex;align-items:center;gap:8px;}
.ct-qty-btn{
  width:32px;height:32px;border-radius:10px;
  border:1.5px solid var(--border);background:var(--surface);
  color:var(--sage);font-weight:700;font-size:1.1rem;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all 0.2s;
}
.ct-qty-btn:hover{background:var(--sage);color:#fff;border-color:var(--sage);}
.ct-qty-btn:disabled{opacity:0.4;cursor:not-allowed;}
.ct-qty-num{font-weight:700;min-width:26px;text-align:center;color:var(--text);font-family:'Cormorant Garamond',serif;font-size:1.15rem;}

.ct-row-total{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--text);}

/* ── DELETE BTN ── */
.ct-del-btn{
  width:34px;height:34px;border-radius:10px;
  background:var(--red-xs);border:1px solid rgba(224,82,82,0.2);
  color:var(--red);cursor:pointer;font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.22s;
}
.ct-del-btn:hover{background:var(--red);color:#fff;border-color:var(--red);transform:scale(1.08);}
.ct-del-btn:disabled{opacity:0.4;cursor:not-allowed;}

/* ── SUMMARY ── */
.ct-summary-section{padding:22px 28px;background:var(--card);border-top:2px solid var(--border);}
.ct-summary-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;font-size:0.9rem;color:var(--text2);border-bottom:1px dashed var(--border);}
.ct-summary-row:last-of-type{border-bottom:none;}
.ct-summary-label{font-weight:500;}
.ct-summary-val{font-weight:600;}
.ct-summary-free{color:var(--sage-l);font-weight:700;}
.ct-summary-total-row{display:flex;justify-content:space-between;align-items:center;padding:16px 0 4px;border-top:2px solid var(--border);margin-top:8px;}
.ct-summary-total-label{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:var(--text);}
.ct-summary-total-val{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;color:var(--sage-d);}

.ct-btn-row{display:flex;gap:12px;padding:20px 28px;border-top:1px solid var(--border);}
.ct-continue-btn{flex:1;padding:13px 20px;border-radius:50px;background:var(--surface);color:var(--text2);border:1.5px solid var(--border);cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;font-size:0.88rem;transition:all 0.25s;}
.ct-continue-btn:hover{border-color:rgba(61,107,79,0.4);color:var(--sage);background:var(--sage-xs);}
.ct-checkout-btn{flex:2.5;padding:14px 24px;border-radius:50px;background:var(--sage-l);color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:0.95rem;transition:all 0.25s;box-shadow:0 8px 28px rgba(61,107,79,0.3);display:flex;align-items:center;justify-content:center;gap:8px;}
.ct-checkout-btn:hover{background:var(--sage-d);transform:translateY(-2px);}

/* ── SIDEBAR ── */
.ct-sidebar{display:flex;flex-direction:column;gap:16px;position:sticky;top:96px;}

.ct-promo-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px 24px;box-shadow:var(--shadow);}
.ct-promo-title{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;color:var(--text);margin-bottom:14px;}
.ct-promo-row{display:flex;gap:8px;}
.ct-promo-input{flex:1;padding:11px 16px;border-radius:12px;border:1.5px solid var(--border);background:var(--card);font-family:'Outfit',sans-serif;font-size:0.85rem;color:var(--text);outline:none;transition:all 0.22s;}
.ct-promo-input:focus{border-color:var(--sage);box-shadow:0 0 0 3px rgba(61,107,79,0.1);}
.ct-promo-input::placeholder{color:var(--dim);}
.ct-promo-btn{padding:11px 18px;border-radius:12px;background:var(--sage);color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:0.82rem;transition:all 0.22s;}
.ct-promo-btn:hover{background:var(--sage-d);}
.ct-promo-btn:disabled{opacity:0.6;cursor:not-allowed;}

.ct-order-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow);}
.ct-order-title{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:var(--text);margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--border);}
.ct-order-row{display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.87rem;}
.ct-order-label{color:var(--muted);font-weight:500;}
.ct-order-val{color:var(--text);font-weight:600;}
.ct-order-divider{border:none;border-top:1px solid var(--border);margin:14px 0;}
.ct-order-total-label{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--text);}
.ct-order-total-val{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:var(--sage-d);}

.ct-checkout-big-btn{width:100%;padding:16px;border-radius:50px;background:linear-gradient(135deg,var(--sage-l),var(--sage-d));color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;margin-top:18px;box-shadow:0 10px 32px rgba(61,107,79,0.35);transition:all 0.28s;display:flex;align-items:center;justify-content:center;gap:8px;}
.ct-checkout-big-btn:hover{transform:translateY(-3px);box-shadow:0 16px 44px rgba(61,107,79,0.42);}

.ct-secure-badges{display:flex;gap:8px;justify-content:center;margin-top:14px;flex-wrap:wrap;}
.ct-secure-badge{display:flex;align-items:center;gap:4px;font-size:0.7rem;color:var(--muted);font-weight:500;background:var(--sage-xs);border:1px solid var(--border);border-radius:50px;padding:4px 10px;}

.ct-trust-card{background:linear-gradient(135deg,var(--sage-xs),var(--gold-xs));border:1px solid var(--border2);border-radius:var(--radius);padding:20px 22px;}
.ct-trust-item{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.ct-trust-item:last-child{margin-bottom:0;}
.ct-trust-icon{font-size:1.3rem;flex-shrink:0;}
.ct-trust-text{font-size:0.8rem;color:var(--text2);font-weight:500;line-height:1.5;}
.ct-trust-text strong{color:var(--sage-d);display:block;font-size:0.83rem;}

/* ── EMPTY ── */
.ct-empty{text-align:center;padding:70px 40px;display:flex;flex-direction:column;align-items:center;}
.ct-empty-icon{font-size:72px;margin-bottom:20px;animation:popIn 0.5s ease both;}
.ct-empty-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:var(--text);margin-bottom:10px;}
.ct-empty-sub{font-size:0.9rem;color:var(--muted);margin-bottom:28px;line-height:1.7;max-width:380px;}
.ct-empty-cats{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:32px;}
.ct-empty-cat{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:50px;border:1.5px solid var(--border);background:var(--surface);font-size:0.82rem;font-weight:600;color:var(--text2);cursor:pointer;transition:all 0.25s;}
.ct-empty-cat:hover{background:var(--sage);color:#fff;border-color:var(--sage);transform:translateY(-2px);}
.ct-shop-btn{padding:14px 36px;border-radius:50px;background:var(--sage-l);color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:0.95rem;box-shadow:0 8px 28px rgba(61,107,79,0.3);transition:all 0.25s;}
.ct-shop-btn:hover{background:var(--sage-d);transform:translateY(-2px);}

/* ── LOADING ── */
.ct-loading{text-align:center;padding:70px 40px;}
.ct-spinner{width:44px;height:44px;border:3px solid var(--border);border-top:3px solid var(--sage);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 20px;}
.ct-loading-text{font-size:0.9rem;color:var(--muted);}

/* ── TOAST ── */
.ct-toast{
  position:fixed;bottom:26px;right:26px;z-index:9999;
  background:var(--sage-d);color:#fff;border-radius:50px;
  padding:13px 22px;font-size:0.875rem;font-weight:500;
  box-shadow:0 8px 32px rgba(0,0,0,0.2);
  display:flex;align-items:center;gap:10px;
  transform:translateY(80px);opacity:0;
  transition:all 0.35s cubic-bezier(.34,1.46,.64,1);
}
.ct-toast.show{transform:translateY(0);opacity:1;}

/* ── RESPONSIVE ── */
@media(max-width:1100px){
  .ct-layout{grid-template-columns:1fr;}
  .ct-sidebar{position:static;}
  .ct-wrap{padding:0 36px;}
  .ct-hero{padding:100px 36px 44px;}
}
@media(max-width:680px){
  .ct-wrap{padding:0 16px;}
  .ct-hero{padding:90px 16px 36px;}
  .ct-thead{display:none;}
  .ct-row{grid-template-columns:1fr;gap:12px;padding:16px 18px;}
  .ct-btn-row{flex-direction:column;}
  .ct-continue-btn,.ct-checkout-btn{flex:none;width:100%;}
  .ct-table-top{padding:16px 18px;}
  .ct-summary-section{padding:18px;}
  .ct-promo-row{flex-direction:column;}
  .ct-promo-btn{width:100%;}
}
`;

// ─── Cart Component ────────────────────────────────────────────
const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [removingIds, setRemovingIds]   = useState([]); // animation ke liye
  const [promoCode, setPromoCode]       = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [toast, setToast]               = useState({ show: false, msg: "" });

  const uid = ls.get("id") || "1";

  // ── Toast ──────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  // ── Fetch cart from DB ─────────────────────────────────────
  const loadCart = () => {
    setLoading(true);
    fetch(`${SHOWCART}?uid=${uid}`)
      .then(r => r.json())
      .then(data => {
        // showcart.php returns: [{cart_id, pid, quantity, pname, price, image}]
        const items = Array.isArray(data) ? data.map(item => ({
          cart_id:  item.cart_id  || item.id || 0,
          pid:      item.pid      || item.id || 0,
          pname:    item.pname    || "Unknown Pet",
          price:    parseFloat(item.price)    || 0,
          quantity: parseInt(item.quantity)   || 1,
          image:    item.image    || "",
        })) : [];
        setCartItems(items);
        setLoading(false);
      })
      .catch(() => {
        setCartItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

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
  }, [loading, cartItems]);

  // ── ✅ DELETE — single item ───────────────────────────────
  const deleteItem = (pid) => {
    // Step 1: Animation shuru karo
    setRemovingIds(prev => [...prev, pid]);

    // Step 2: 300ms baad DB se delete karo aur UI update karo
    setTimeout(() => {
      fetch(`${DELETECART}?uid=${uid}&pid=${pid}`)
        .then(r => r.json())
        .then(data => {
          if (data.status === "deleted") {
            // UI se bhi hatao
            setCartItems(prev => prev.filter(item => item.pid !== pid));
            showToast("🗑 Item cart se hata diya!");
          } else {
            showToast("❌ Delete nahi hua: " + (data.msg || "Error"));
            // Animation revert karo
            setRemovingIds(prev => prev.filter(id => id !== pid));
          }
        })
        .catch(() => {
          // API fail — sirf UI se hatao
          setCartItems(prev => prev.filter(item => item.pid !== pid));
          showToast("🗑 Item removed!");
        })
        .finally(() => {
          setRemovingIds(prev => prev.filter(id => id !== pid));
        });
    }, 300);
  };

  // ── ✅ QUANTITY — UI only (DB update optional) ────────────
  const increaseQty = (pid) => {
    setCartItems(prev =>
      prev.map(item =>
        item.pid === pid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (pid) => {
    setCartItems(prev =>
      prev.map(item =>
        item.pid === pid && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ── Calculations ──────────────────────────────────────────
  const calcSubtotal = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const calcTotalItems = () =>
    cartItems.reduce((t, i) => t + i.quantity, 0);
  const discount   = promoApplied ? Math.round(calcSubtotal() * 0.1) : 0;
  const finalTotal = calcSubtotal() - discount;

  // ── Checkout ──────────────────────────────────────────────
  const goCheckout = () => {
    ls.set("totalitem", calcTotalItems());
    ls.set("item",      finalTotal);
    navigate('/checkout');
  };

  // ── Promo ─────────────────────────────────────────────────
  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "PETOLOGY10") {
      setPromoApplied(true);
      showToast("🎉 10% discount apply ho gayi!");
    } else {
      showToast("❌ Invalid code! Try: PETOLOGY10");
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
            <a href="/">Home</a><span>›</span>
            <span style={{ color:"rgba(255,255,255,0.6)" }}>Shopping Cart</span>
          </div>
          <h1 className="ct-hero-title">Your <em>Cart</em></h1>
          <p className="ct-hero-sub">
            {loading
              ? "Loading your items..."
              : cartItems.length === 0
              ? "Cart is empty — explore our pets!"
              : `${calcTotalItems()} item${calcTotalItems() > 1 ? "s" : ""} ready for checkout`}
          </p>
        </div>
      </section>

      {/* MAIN */}
      <div className="ct-main">
        <div className="ct-wrap">

          {/* LOADING */}
          {loading ? (
            <div className="ct-table-card ct-loading reveal">
              <div className="ct-spinner" />
              <div className="ct-loading-text">Cart load ho raha hai...</div>
            </div>

          /* EMPTY */
          ) : cartItems.length === 0 ? (
            <div className="ct-table-card reveal">
              <div className="ct-empty">
                <div className="ct-empty-icon">🛒</div>
                <div className="ct-empty-title">Cart Khali Hai!</div>
                <p className="ct-empty-sub">
                  Koi item nahi hai. Humari pet shop explore karein!
                </p>
                <div className="ct-empty-cats">
                  {[["🐕","Dogs"],["🐱","Cats"],["🦜","Birds"],["🐠","Fish"]].map(([icon,label]) => (
                    <div className="ct-empty-cat" key={label} onClick={() => navigate('/product')}>
                      {icon} {label}
                    </div>
                  ))}
                </div>
                <button className="ct-shop-btn" onClick={() => navigate('/product')}>
                  🐾 Shop Now
                </button>
              </div>
            </div>

          /* CART */
          ) : (
            <div className="ct-layout">

              {/* ── LEFT: Items Table ── */}
              <div>
                <div className="ct-table-card reveal">

                  {/* Top bar */}
                  <div className="ct-table-top">
                    <div className="ct-table-title">Shopping Cart</div>
                    <div className="ct-count-badge">{calcTotalItems()} items</div>
                  </div>

                  {/* Desktop header */}
                  <div className="ct-thead">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <span></span>
                  </div>

                  {/* ✅ Item rows */}
                  {cartItems.map(item => (
                    <div
                      key={item.pid}
                      className={`ct-row ${removingIds.includes(item.pid) ? "removing" : ""}`}
                    >
                      {/* Product */}
                      <div className="ct-product-cell">
                        {item.image && item.image.trim()
                          ? <img className="ct-product-img" src={item.image} alt={item.pname}
                              onError={e => { e.target.onerror=null; e.target.style.display="none"; }} />
                          : <div className="ct-product-placeholder">{getEmoji(item.pname)}</div>
                        }
                        <div>
                          <div className="ct-product-name">{item.pname}</div>
                          <span className="ct-product-cat">
                            {getEmoji(item.pname)}&nbsp;{getCat(item.pname)}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="ct-price">
                        ₹{item.price.toLocaleString("en-IN")}
                      </div>

                      {/* ✅ Quantity controls */}
                      <div className="ct-qty">
                        <button
                          className="ct-qty-btn"
                          onClick={() => decreaseQty(item.pid)}
                          disabled={item.quantity <= 1 || removingIds.includes(item.pid)}
                        >−</button>
                        <span className="ct-qty-num">{item.quantity}</span>
                        <button
                          className="ct-qty-btn"
                          onClick={() => increaseQty(item.pid)}
                          disabled={removingIds.includes(item.pid)}
                        >+</button>
                      </div>

                      {/* Row total */}
                      <div className="ct-row-total">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>

                      {/* ✅ Delete button */}
                      <button
                        className="ct-del-btn"
                        title="Remove item"
                        disabled={removingIds.includes(item.pid)}
                        onClick={() => deleteItem(item.pid)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}

                  {/* Summary */}
                  <div className="ct-summary-section">
                    <div className="ct-summary-row">
                      <span className="ct-summary-label">Subtotal ({calcTotalItems()} items)</span>
                      <span className="ct-summary-val">₹{calcSubtotal().toLocaleString("en-IN")}</span>
                    </div>
                    {promoApplied && (
                      <div className="ct-summary-row">
                        <span className="ct-summary-label">🎉 Discount (10%)</span>
                        <span className="ct-summary-val" style={{ color:"var(--red)" }}>
                          − ₹{discount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="ct-summary-row">
                      <span className="ct-summary-label">Delivery</span>
                      <span className="ct-summary-free">FREE 🎁</span>
                    </div>
                    <div className="ct-summary-total-row">
                      <span className="ct-summary-total-label">Total Amount</span>
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

              {/* ── RIGHT: Sidebar ── */}
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
                    <button
                      className="ct-promo-btn"
                      onClick={handlePromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? "✓ Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p style={{ fontSize:"0.75rem", color:"var(--sage)", marginTop:10, fontWeight:600 }}>
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
                        {getEmoji(item.pname)} {item.pname}
                        <span style={{ color:"var(--dim)", marginLeft:4 }}>×{item.quantity}</span>
                      </span>
                      <span className="ct-order-val">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                  <hr className="ct-order-divider" />
                  <div className="ct-order-row">
                    <span className="ct-order-label">Subtotal</span>
                    <span className="ct-order-val">₹{calcSubtotal().toLocaleString("en-IN")}</span>
                  </div>
                  {promoApplied && (
                    <div className="ct-order-row">
                      <span className="ct-order-label">Discount</span>
                      <span className="ct-order-val" style={{ color:"var(--red)" }}>
                        −₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="ct-order-row">
                    <span className="ct-order-label">Delivery</span>
                    <span className="ct-order-val" style={{ color:"var(--sage-l)" }}>FREE</span>
                  </div>
                  <hr className="ct-order-divider" />
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span className="ct-order-total-label">Grand Total</span>
                    <span className="ct-order-total-val">₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <button className="ct-checkout-big-btn" onClick={goCheckout}>
                    🔐 Secure Checkout →
                  </button>
                  <div className="ct-secure-badges">
                    <span className="ct-secure-badge">🔒 SSL Secure</span>
                    <span className="ct-secure-badge">✅ Verified</span>
                    <span className="ct-secure-badge">📱 UPI Ready</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="ct-trust-card reveal">
                  {[
                    { icon:"🚚", strong:"Free Delivery",     text:"On all orders" },
                    { icon:"🔄", strong:"Easy Returns",      text:"7-day return policy" },
                    { icon:"🐾", strong:"Health Guarantee",  text:"7-day pet health cover" },
                    { icon:"💬", strong:"24/7 Support",      text:"WhatsApp us anytime" },
                  ].map((t, i) => (
                    <div className="ct-trust-item" key={i}>
                      <span className="ct-trust-icon">{t.icon}</span>
                      <div className="ct-trust-text">
                        <strong>{t.strong}</strong>{t.text}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      <div className={`ct-toast ${toast.show ? "show" : ""}`}>
        {toast.msg}
      </div>
    </>
  );
};

export default Cart;