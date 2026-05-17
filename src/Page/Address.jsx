import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from localStorage if user previously saved an address
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('delivery_address') || 'null');
      if (saved) setFormData(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [submitted]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim())    e.fullName     = 'Naam zaroori hai';
    if (!formData.addressLine1.trim())e.addressLine1 = 'Address Line 1 daalein';
    if (!formData.city.trim())        e.city         = 'City daalein';
    if (!formData.state.trim())       e.state        = 'State chunein';
    if (!formData.postalCode.trim() || formData.postalCode.length < 6)
                                      e.postalCode   = 'Valid 6-digit pincode daalein';
    if (!formData.country.trim())     e.country      = 'Country daalein';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // ── Save address to localStorage so Checkout can read it ──
    localStorage.setItem('delivery_address', JSON.stringify(formData));
    setSubmitted(true);
  };

  // After showing success, go back to checkout after 2.5s (or on button click)
  const goToCheckout = () => navigate('/checkout');

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(goToCheckout, 2500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const indianStates = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
    'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
    'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
    'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Delhi','Jammu & Kashmir','Ladakh','Puducherry',
  ];

  return (
    <div className="address-page">
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
          --error:     #c0392b;
          --shadow:    0 4px 24px rgba(30,50,35,0.08);
          --shadow-lg: 0 16px 60px rgba(30,50,35,0.14);
          --radius:    20px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 10px; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes checkPop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.2) rotate(3deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(30px,-20px) scale(1.06)} 70%{transform:translate(-15px,15px) scale(0.97)} }
        @keyframes countDown { from{width:100%} to{width:0%} }

        .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity:1; transform:none; }

        .address-page {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Outfit', sans-serif;
          color: var(--text);
        }

        /* ── STEP BAR ── */
        .addr-stepbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 20px 16px 0;
          position: relative;
          z-index: 2;
        }
        .addr-si {
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
        }
        .addr-si.done   { color: #8ecfa8; }
        .addr-si.active { background: rgba(82,183,136,0.18); border: 1px solid rgba(82,183,136,0.4); color: #8ecfa8; }
        .addr-si.up     { color: rgba(255,255,255,0.22); }
        .addr-sl { width: 32px; height: 1px; background: rgba(255,255,255,0.12); }

        /* Hero Strip */
        .addr-hero {
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          padding: 28px 24px 100px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .addr-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=20') center/cover;
          opacity: 0.07;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(90,148,112,0.22), transparent 70%);
          pointer-events: none;
        }
        .hero-orb-1 { width:380px; height:380px; top:-100px; right:-60px; animation: orbDrift 10s ease-in-out infinite; }
        .hero-orb-2 { width:220px; height:220px; bottom:-60px; left:8%; animation: floatY 7s ease-in-out infinite; animation-delay:2s; }

        .hero-content { position: relative; z-index: 2; animation: fadeUp 0.65s ease both; }
        .label-tag {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold-l); display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .label-tag::before { content:''; width:24px; height:2px; background:var(--gold-l); border-radius:2px; }
        .label-tag::after  { content:''; width:24px; height:2px; background:var(--gold-l); border-radius:2px; }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 10px;
        }
        .hero-title em { color: var(--gold-l); font-style: italic; }
        .hero-sub { color: rgba(255,255,255,0.58); font-size: 0.9rem; }
        .pet-icons { display:flex; justify-content:center; gap:18px; margin-top:22px; flex-wrap:wrap; }
        .pet-chip {
          display:flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18);
          border-radius:50px; padding:6px 14px; font-size:0.75rem; color:rgba(255,255,255,0.75);
          font-weight:500; backdrop-filter:blur(6px);
        }

        /* Main wrapper */
        .addr-main { max-width:680px; margin:-56px auto 60px; padding:0 20px; position:relative; z-index:3; }

        /* Card */
        .addr-card {
          background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border);
          box-shadow: var(--shadow-lg); overflow: hidden;
          animation: fadeUp 0.5s 0.1s ease both; opacity: 0; animation-fill-mode: forwards;
        }

        .addr-card-header {
          padding: 22px 32px; background: var(--ivory); border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 14px;
        }
        .header-icon-wrap {
          width:46px; height:46px;
          background: linear-gradient(135deg, var(--sage-xs), var(--gold-xs));
          border:1px solid var(--border2); border-radius:14px;
          display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0;
        }
        .header-text-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:700; color:var(--text); }
        .header-text-sub   { font-size:0.75rem; color:var(--muted); margin-top:2px; }

        /* Form body */
        .addr-form-body { padding: 28px 32px 32px; }

        .section-divider { display:flex; align-items:center; gap:10px; margin:24px 0 18px; }
        .section-divider-label { font-size:0.68rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--sage); white-space:nowrap; }
        .section-divider-line  { flex:1; height:1px; background:var(--border); }

        .form-row       { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
        .form-row.full  { grid-template-columns:1fr; }

        .field-wrap { display:flex; flex-direction:column; gap:5px; }
        .field-label {
          font-size:0.71rem; font-weight:700; color:var(--text2); text-transform:uppercase;
          letter-spacing:0.07em; display:flex; align-items:center; gap:4px;
        }
        .field-label .req { color:var(--gold); }
        .field-input-wrap { position:relative; }
        .field-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:15px; pointer-events:none; opacity:0.5; }
        .field-input {
          width:100%; padding:11px 14px 11px 36px;
          border:1.5px solid var(--border); border-radius:12px;
          font-family:'Outfit',sans-serif; font-size:0.875rem; color:var(--text);
          background:var(--card); outline:none;
          transition:border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          -webkit-appearance:none;
        }
        .field-input:focus    { border-color:var(--sage); box-shadow:0 0 0 3px rgba(61,107,79,0.1); background:#fff; }
        .field-input.err-field{ border-color:var(--error); background:#fff5f5; }
        .field-input.err-field:focus { box-shadow:0 0 0 3px rgba(192,57,43,0.1); }
        select.field-input { cursor:pointer; }
        .field-error { font-size:0.7rem; color:var(--error); display:flex; align-items:center; gap:4px; animation:fadeUp 0.2s ease; }

        /* Map preview */
        .map-preview { border-radius:14px; overflow:hidden; border:1px solid var(--border); margin-bottom:20px; height:130px; position:relative; background:var(--bg2); }
        .map-preview img { width:100%; height:100%; object-fit:cover; opacity:0.65; }
        .map-pin-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:4px; }
        .map-pin-icon  { font-size:28px; animation:floatY 3s ease-in-out infinite; }
        .map-pin-label { background:rgba(30,58,40,0.82); color:#fff; font-size:0.72rem; font-weight:600; padding:4px 12px; border-radius:50px; backdrop-filter:blur(6px); }

        /* Submit Button */
        .btn-sage {
          width:100%; padding:15px 28px; background:var(--sage-l); color:#fff; border:none; border-radius:50px;
          cursor:pointer; font-family:'Outfit',sans-serif; font-weight:700; font-size:0.92rem;
          box-shadow:0 4px 18px rgba(61,107,79,0.32); transition:all 0.25s ease;
          display:flex; align-items:center; justify-content:center; gap:8px; margin-top:24px;
        }
        .btn-sage:hover { background:var(--sage); transform:translateY(-2px); box-shadow:0 8px 28px rgba(61,107,79,0.42); }

        /* Back button */
        .btn-back {
          display:block; width:100%; background:none; border:none; color:var(--muted); font-size:12px;
          cursor:pointer; text-align:center; padding:14px; font-family:'Outfit',sans-serif;
          letter-spacing:1.5px; text-transform:uppercase; transition:color 0.2s; margin-top:8px;
        }
        .btn-back:hover { color:var(--sage); }

        .trust-strip { display:flex; justify-content:center; gap:20px; margin-top:16px; flex-wrap:wrap; }
        .trust-item  { display:flex; align-items:center; gap:5px; font-size:0.72rem; color:var(--muted); font-weight:500; }

        /* Success state */
        .success-box { padding:56px 32px; text-align:center; animation:fadeUp 0.5s ease both; }
        .success-circle {
          width:88px; height:88px;
          background:linear-gradient(135deg,var(--sage-l),var(--sage));
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          font-size:40px; margin:0 auto 20px;
          box-shadow:0 8px 32px rgba(61,107,79,0.3);
          animation:checkPop 0.6s cubic-bezier(.34,1.56,.64,1) both;
        }
        .success-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:var(--text); margin-bottom:8px; }
        .success-sub   { color:var(--muted); font-size:0.88rem; line-height:1.6; margin-bottom:6px; }
        .success-redirect { font-size:0.78rem; color:var(--sage-l); font-weight:500; margin-bottom:20px; }
        .progress-bar  { height:3px; background:var(--sage); border-radius:2px; animation:countDown 2.5s linear forwards; margin-bottom:20px; }
        .success-addr-preview {
          background:var(--bg); border:1px solid var(--border); border-radius:14px;
          padding:16px 20px; margin:0 0 20px; text-align:left;
          font-size:0.85rem; color:var(--text2); line-height:1.8;
        }
        .success-addr-preview strong { color:var(--sage-d); }
        .btn-cta-row { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
        .btn-solid {
          padding:13px 28px; background:var(--sage); color:#fff; border:none; border-radius:50px;
          cursor:pointer; font-family:'Outfit',sans-serif; font-weight:700; font-size:0.88rem;
          box-shadow:0 4px 18px rgba(61,107,79,0.3); transition:all 0.22s;
        }
        .btn-solid:hover { background:var(--sage-d); transform:translateY(-2px); }
        .btn-outline {
          display:inline-flex; align-items:center; gap:6px;
          padding:11px 24px; background:transparent; color:var(--sage);
          border:1.5px solid var(--sage); border-radius:50px; cursor:pointer;
          font-family:'Outfit',sans-serif; font-weight:600; font-size:0.85rem; transition:all 0.22s;
        }
        .btn-outline:hover { background:var(--sage-xs); }

        .ornament { text-align:center; color:var(--gold); font-size:0.9rem; letter-spacing:8px; opacity:0.45; margin:28px 0 0; }

        @media (max-width: 600px) {
          .form-row { grid-template-columns:1fr; }
          .addr-form-body { padding:20px 18px 24px; }
          .addr-card-header { padding:18px 18px; }
          .hero-title { font-size:1.9rem; }
          .addr-sl { width:16px; }
        }
      `}</style>

      {/* Hero */}
      <div className="addr-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">

          {/* STEP BAR */}
          <div className="addr-stepbar" style={{ marginBottom: 20 }}>
            <div className="addr-si done">✓ Cart</div>
            <div className="addr-sl" />
            <div className="addr-si done">✓ Checkout</div>
            <div className="addr-sl" />
            <div className="addr-si active">● Address</div>
            <div className="addr-sl" />
            <div className="addr-si up">○ Confirm</div>
          </div>

          <div className="label-tag">Petology — Secure Delivery</div>
          <h1 className="hero-title">
            Apna Delivery<br /><em>Address Add Karein</em>
          </h1>
          <p className="hero-sub">Aapke pyaare pet ka saman seedha ghar pe aayega 🐾</p>
          <div className="pet-icons">
            {[['🐶','Dogs'],['🐱','Cats'],['🐦','Birds'],['🐟','Fish']].map(([icon, label]) => (
              <div key={label} className="pet-chip">{icon} {label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="addr-main">
        <div className="addr-card reveal">

          {!submitted ? (
            <>
              <div className="addr-card-header">
                <div className="header-icon-wrap">📍</div>
                <div>
                  <div className="header-text-title">Delivery Address</div>
                  <div className="header-text-sub">Kahan deliver karein aapka pyaar?</div>
                </div>
              </div>

              <div className="addr-form-body">
                {/* Map visual */}
                <div className="map-preview">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=40" alt="map" />
                  <div className="map-pin-overlay">
                    <div className="map-pin-icon">📍</div>
                    <div className="map-pin-label">Delivery location set karein</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                  {/* Personal */}
                  <div className="section-divider">
                    <span className="section-divider-label">👤 Personal Info</span>
                    <div className="section-divider-line" />
                  </div>
                  <div className="form-row full">
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="fullName">
                        Poora Naam <span className="req">*</span>
                      </label>
                      <div className="field-input-wrap">
                        <span className="field-icon">👤</span>
                        <input
                          className={`field-input${errors.fullName ? ' err-field' : ''}`}
                          type="text" id="fullName" name="fullName"
                          value={formData.fullName} onChange={handleChange}
                          placeholder="Jaise: Rahul Sharma"
                        />
                      </div>
                      {errors.fullName && <span className="field-error">⚠ {errors.fullName}</span>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="section-divider">
                    <span className="section-divider-label">🏠 Address Details</span>
                    <div className="section-divider-line" />
                  </div>
                  <div className="form-row full" style={{ marginBottom: 16 }}>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="addressLine1">
                        Address Line 1 <span className="req">*</span>
                      </label>
                      <div className="field-input-wrap">
                        <span className="field-icon">🏠</span>
                        <input
                          className={`field-input${errors.addressLine1 ? ' err-field' : ''}`}
                          type="text" id="addressLine1" name="addressLine1"
                          value={formData.addressLine1} onChange={handleChange}
                          placeholder="Flat no., Building, Street"
                        />
                      </div>
                      {errors.addressLine1 && <span className="field-error">⚠ {errors.addressLine1}</span>}
                    </div>
                  </div>
                  <div className="form-row full" style={{ marginBottom: 16 }}>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="addressLine2">
                        Address Line 2{' '}
                        <span style={{ color:'var(--dim)', fontWeight:400, textTransform:'none', letterSpacing:0 }}>(Optional)</span>
                      </label>
                      <div className="field-input-wrap">
                        <span className="field-icon">🗺</span>
                        <input
                          className="field-input" type="text" id="addressLine2" name="addressLine2"
                          value={formData.addressLine2} onChange={handleChange}
                          placeholder="Area, Landmark, Colony"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="section-divider">
                    <span className="section-divider-label">📍 City & State</span>
                    <div className="section-divider-line" />
                  </div>
                  <div className="form-row" style={{ marginBottom: 16 }}>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="city">Sheher (City) <span className="req">*</span></label>
                      <div className="field-input-wrap">
                        <span className="field-icon">🏙</span>
                        <input
                          className={`field-input${errors.city ? ' err-field' : ''}`}
                          type="text" id="city" name="city"
                          value={formData.city} onChange={handleChange}
                          placeholder="Jaise: Mumbai"
                        />
                      </div>
                      {errors.city && <span className="field-error">⚠ {errors.city}</span>}
                    </div>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="state">State <span className="req">*</span></label>
                      <div className="field-input-wrap">
                        <span className="field-icon">🗾</span>
                        <select
                          className={`field-input${errors.state ? ' err-field' : ''}`}
                          id="state" name="state"
                          value={formData.state} onChange={handleChange}
                        >
                          <option value="">State chunein</option>
                          {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.state && <span className="field-error">⚠ {errors.state}</span>}
                    </div>
                  </div>
                  <div className="form-row" style={{ marginBottom: 16 }}>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="postalCode">Pincode <span className="req">*</span></label>
                      <div className="field-input-wrap">
                        <span className="field-icon">📮</span>
                        <input
                          className={`field-input${errors.postalCode ? ' err-field' : ''}`}
                          type="text" id="postalCode" name="postalCode"
                          value={formData.postalCode} onChange={handleChange}
                          placeholder="6-digit pincode" maxLength={6}
                        />
                      </div>
                      {errors.postalCode && <span className="field-error">⚠ {errors.postalCode}</span>}
                    </div>
                    <div className="field-wrap">
                      <label className="field-label" htmlFor="country">Country <span className="req">*</span></label>
                      <div className="field-input-wrap">
                        <span className="field-icon">🌏</span>
                        <select
                          className={`field-input${errors.country ? ' err-field' : ''}`}
                          id="country" name="country"
                          value={formData.country} onChange={handleChange}
                        >
                          <option value="India">🇮🇳 India</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {errors.country && <span className="field-error">⚠ {errors.country}</span>}
                    </div>
                  </div>

                  <button className="btn-sage" type="submit">
                    📍 Address Save Karein & Checkout Pe Jaayein →
                  </button>

                  <button type="button" className="btn-back" onClick={() => navigate('/checkout')}>
                    ← Wapas Checkout Pe
                  </button>

                  <div className="trust-strip">
                    <div className="trust-item">🔒 Safe & Secure</div>
                    <div className="trust-item">🚚 Pan-India Delivery</div>
                    <div className="trust-item">🐾 Pet-friendly Packing</div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* ── SUCCESS STATE ── */
            <div className="success-box">
              <div className="success-circle">✓</div>
              <h2 className="success-title">Address Save Ho Gaya!</h2>
              <p className="success-sub">
                Delivery address successfully save ho gaya hai.
              </p>
              <p className="success-redirect">Checkout pe wapas ja rahe hain…</p>
              <div className="progress-bar" />
              <div className="success-addr-preview">
                <strong>{formData.fullName}</strong><br />
                {formData.addressLine1}{formData.addressLine2 ? `, ${formData.addressLine2}` : ''}<br />
                {formData.city}, {formData.state} — {formData.postalCode}<br />
                {formData.country}
              </div>
              <div className="btn-cta-row">
                <button className="btn-solid" onClick={goToCheckout}>
                  💳 Checkout Pe Jaayein →
                </button>
                <button
                  className="btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName:'', addressLine1:'', addressLine2:'', city:'', state:'', postalCode:'', country:'India' });
                    localStorage.removeItem('delivery_address');
                  }}
                >
                  ✏️ Address Badlein
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="ornament">✦ ✦ ✦</div>
      </div>
    </div>
  );
};

export default AddressForm;