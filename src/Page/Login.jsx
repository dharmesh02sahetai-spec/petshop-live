import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// ─── CSS ─────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:       #f4f1eb;
    --bg2:      #ede8de;
    --surface:  #ffffff;
    --sage:     #3d6b4f;
    --sage-d:   #2a4e39;
    --sage-l:   #5a9470;
    --sage-xs:  rgba(61,107,79,0.09);
    --sage-sm:  rgba(61,107,79,0.18);
    --gold:     #b8922a;
    --gold-l:   #d4ac48;
    --gold-xs:  rgba(184,146,42,0.12);
    --border:   rgba(61,107,79,0.13);
    --text:     #1c2b22;
    --text2:    #3a4a3f;
    --muted:    #7a907f;
    --dim:      #aab8ac;
    --ivory:    #fdf9f2;
    --shadow:   0 4px 24px rgba(30,50,35,0.08);
    --shadow-lg:0 16px 60px rgba(30,50,35,0.14);
    --radius:   20px;
    --error:    #e05252;
    --error-xs: rgba(224,82,82,0.1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 10px; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes slideR   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:none} }
  @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes popIn    { 0%{transform:scale(0.88);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }

  /* ── Page ── */
  .lg-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'Outfit', sans-serif;
    color: var(--text);
    background: var(--bg);
  }

  /* ── LEFT PANEL ── */
  .lg-left {
    background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    overflow: hidden;
    min-height: 100vh;
  }

  .lg-orb {
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, rgba(90,148,112,0.22), transparent 70%);
    pointer-events: none; animation: orbDrift 14s ease-in-out infinite;
  }
  .lg-orb1 { width: 420px; height: 420px; top: -120px; left: -100px; }
  .lg-orb2 { width: 300px; height: 300px; bottom: -80px; right: -60px; animation-delay: -6s; }
  .lg-orb3 { width: 160px; height: 160px; top: 50%; left: 60%; animation-delay: -3s; opacity: 0.5; }

  /* Logo */
  .lg-logo-wrap {
    position: relative; z-index: 2;
    display: flex; align-items: center; gap: 12px;
    animation: fadeUp 0.5s ease;
  }
  .lg-logo-icon {
    width: 44px; height: 44px; background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; backdrop-filter: blur(6px);
  }
  .lg-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 700; color: #fff; letter-spacing: 0.5px;
  }
  .lg-logo-text span { color: #d4ac48; font-style: italic; }

  /* Center content */
  .lg-left-center { position: relative; z-index: 2; }
  .lg-left-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: #d4ac48; margin-bottom: 18px;
    animation: fadeUp 0.55s ease;
  }
  .lg-left-tag::before {
    content: ''; width: 24px; height: 2px; background: #d4ac48; border-radius: 2px;
  }
  .lg-left-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(30px, 4vw, 50px); font-weight: 700; color: #fff;
    line-height: 1.08; margin-bottom: 18px; animation: fadeUp 0.6s ease;
  }
  .lg-left-title em { font-style: italic; color: #d4ac48; }
  .lg-left-sub {
    font-size: 14px; color: rgba(255,255,255,0.55);
    line-height: 1.7; max-width: 360px; animation: fadeUp 0.65s ease;
  }

  /* Feature list */
  .lg-features { margin-top: 36px; display: flex; flex-direction: column; gap: 14px; animation: fadeUp 0.7s ease; }
  .lg-feature {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(4px);
    transition: all 0.25s;
  }
  .lg-feature:hover { background: rgba(255,255,255,0.1); transform: translateX(4px); }
  .lg-feature-icon { font-size: 24px; flex-shrink: 0; }
  .lg-feature-text { }
  .lg-feature-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
  .lg-feature-sub   { font-size: 11px; color: rgba(255,255,255,0.45); }

  /* Stats */
  .lg-left-bottom { position: relative; z-index: 2; animation: fadeUp 0.75s ease; }
  .lg-stats-row {
    display: flex; gap: 28px; flex-wrap: wrap;
    padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.1);
  }
  .lg-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: #fff; line-height: 1;
  }
  .lg-stat-label {
    font-size: 10px; color: rgba(255,255,255,0.4);
    letter-spacing: 1px; text-transform: uppercase; margin-top: 3px;
  }

  /* ── RIGHT PANEL ── */
  .lg-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 40px; background: var(--bg);
    animation: slideR 0.6s ease;
  }
  .lg-form-wrap { width: 100%; max-width: 420px; }

  /* Form header */
  .lg-form-tag {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--sage); margin-bottom: 8px;
  }
  .lg-form-tag::before {
    content: ''; width: 24px; height: 2px; background: var(--sage); border-radius: 2px;
  }
  .lg-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px; font-weight: 700; color: var(--text);
    line-height: 1.1; margin-bottom: 6px;
  }
  .lg-form-title em { font-style: italic; color: var(--sage); }
  .lg-form-sub {
    font-size: 13px; color: var(--muted); margin-bottom: 36px; line-height: 1.6;
  }

  /* Social */
  .lg-social-row { display: flex; gap: 10px; margin-bottom: 24px; }
  .lg-social-btn {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px; border-radius: 12px; border: 1.5px solid var(--border);
    background: var(--surface); cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    color: var(--text2); transition: all 0.2s;
  }
  .lg-social-btn:hover {
    border-color: var(--sage); background: var(--sage-xs); color: var(--sage);
    transform: translateY(-1px); box-shadow: var(--shadow);
  }

  /* Divider */
  .lg-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .lg-divider-line { flex: 1; height: 1px; background: var(--border); }
  .lg-divider-text { font-size: 11px; color: var(--dim); font-weight: 500; letter-spacing: 1px; }

  /* Field */
  .lg-field { margin-bottom: 18px; position: relative; }
  .lg-label {
    display: block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 7px;
  }
  .lg-input-wrap { position: relative; display: flex; align-items: center; }
  .lg-input-icon {
    position: absolute; left: 14px; font-size: 16px;
    pointer-events: none; opacity: 0.55; z-index: 1;
  }
  .lg-input {
    width: 100%; padding: 13px 14px 13px 44px;
    border: 1.5px solid var(--border); border-radius: 12px;
    background: var(--surface); font-family: 'Outfit', sans-serif;
    font-size: 14px; color: var(--text); outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .lg-input::placeholder { color: var(--dim); }
  .lg-input:focus {
    border-color: var(--sage); box-shadow: 0 0 0 3px rgba(61,107,79,0.1);
  }
  .lg-input.error {
    border-color: var(--error); box-shadow: 0 0 0 3px var(--error-xs);
    animation: shake 0.4s ease;
  }

  /* Pwd toggle */
  .lg-pwd-toggle {
    position: absolute; right: 14px; background: none; border: none;
    cursor: pointer; font-size: 16px; color: var(--muted);
    transition: color 0.2s; padding: 0; display: flex; align-items: center;
  }
  .lg-pwd-toggle:hover { color: var(--sage); }

  /* Field error */
  .lg-field-error {
    font-size: 11px; color: var(--error); margin-top: 5px;
    display: flex; align-items: center; gap: 4px; animation: popIn 0.2s ease;
  }

  /* Remember + forgot row */
  .lg-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 8px;
  }
  .lg-remember { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .lg-checkbox {
    width: 17px; height: 17px; border: 1.5px solid var(--border);
    border-radius: 5px; appearance: none; cursor: pointer;
    background: var(--surface); position: relative; transition: all 0.2s; flex-shrink: 0;
  }
  .lg-checkbox:checked { background: var(--sage); border-color: var(--sage); }
  .lg-checkbox:checked::after {
    content: '✓'; position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 10px; font-weight: 700;
  }
  .lg-remember-text { font-size: 13px; color: var(--text2); }
  .lg-forgot {
    font-size: 13px; color: var(--sage); font-weight: 600;
    text-decoration: none; transition: color 0.2s;
  }
  .lg-forgot:hover { color: var(--sage-d); text-decoration: underline; }

  /* Submit */
  .lg-submit {
    width: 100%; padding: 15px; border-radius: 50px; border: none;
    background: var(--sage); color: #fff;
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all 0.28s cubic-bezier(.34,1.56,.64,1);
    letter-spacing: 0.3px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    position: relative; overflow: hidden;
  }
  .lg-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .lg-submit:hover::before { opacity: 1; }
  .lg-submit:hover:not(:disabled) {
    background: var(--sage-d); transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(61,107,79,0.35);
  }
  .lg-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  /* Spinner */
  .lg-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }

  /* Signup link */
  .lg-signup-row {
    text-align: center; margin-top: 24px; font-size: 13px; color: var(--muted);
  }
  .lg-signup-link {
    color: var(--sage); font-weight: 700; text-decoration: none; transition: color 0.2s;
  }
  .lg-signup-link:hover { color: var(--sage-d); text-decoration: underline; }

  /* OR divider below form */
  .lg-or-row {
    display: flex; align-items: center; gap: 12px; margin: 20px 0 0;
  }

  /* Toast */
  .lg-toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(100px);
    border-radius: 50px; padding: 12px 24px;
    color: #fff; font-size: 13px; font-weight: 500;
    box-shadow: var(--shadow-lg); z-index: 9999;
    transition: transform 0.3s ease; white-space: nowrap;
    font-family: 'Outfit', sans-serif; background: var(--error);
  }
  .lg-toast.show  { transform: translateX(-50%) translateY(0); }
  .lg-toast.green { background: var(--sage); }

  /* Success overlay */
  .lg-success-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(30,58,40,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeUp 0.3s ease;
  }
  .lg-success-card {
    background: var(--surface); border-radius: 28px;
    padding: 52px 48px; text-align: center;
    box-shadow: var(--shadow-lg); max-width: 360px; width: 90%;
    animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .lg-success-icon {
    font-size: 56px; display: block; margin-bottom: 16px;
    animation: floatY 2.5s ease-in-out infinite;
  }
  .lg-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px; font-weight: 700; color: var(--text); margin-bottom: 8px;
  }
  .lg-success-sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  .lg-success-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 32px; border-radius: 50px; border: none;
    background: var(--sage); color: #fff;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .lg-success-btn:hover { background: var(--sage-d); transform: translateY(-1px); }

  /* ── Responsive ── */
  @media(max-width: 900px) {
    .lg-page { grid-template-columns: 1fr; }
    .lg-left { display: none; }
    .lg-right { padding: 40px 24px; min-height: 100vh; }
  }
  @media(max-width: 480px) {
    .lg-right { padding: 32px 16px; }
    .lg-form-title { font-size: 30px; }
    .lg-social-row { flex-direction: column; }
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPwd,   setShowPwd]   = useState(false);
  const [remember,  setRemember]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [userName,  setUserName]  = useState("");
  const [errors,    setErrors]    = useState({ email: "", password: "" });
  const [touched,   setTouched]   = useState({ email: false, password: false });
  const [toast,     setToast]     = useState({ msg: "", show: false, green: false });

  // Pre-fill from localStorage if remember was checked before
  useEffect(() => {
    const saved = localStorage.getItem("remembered_email");
    if (saved) { setEmail(saved); setRemember(true); }
    // If already logged in, redirect
    if (localStorage.getItem("islogin")) navigate("/");
  }, []);

  const showMsg = (msg, green = false) => {
    setToast({ msg, show: true, green });
    setTimeout(() => setToast(p => ({ ...p, show: false })), 3000);
  };

  const validate = (name, val) => {
    if (name === "email")
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Enter a valid email";
    if (name === "password")
      return val.length < 4 ? "Password is too short" : "";
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validate("email", email);
    const pwdErr   = validate("password", password);
    setErrors({ email: emailErr, password: pwdErr });
    setTouched({ email: true, password: true });
    if (emailErr || pwdErr) { showMsg("⚠️ Please fix the errors"); return; }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("email",    email);
      data.append("password", password);

      const res = await axios.post("http://localhost/Petshop/login.php", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle your backend response — adjust these checks to match your login.php
      const d = res.data;
      if (d && (d.status === "success" || d === "success" || d.id)) {
        // Store login info
        localStorage.setItem("islogin", "true");
        localStorage.setItem("uname",   d.name   || d.fname || email.split("@")[0]);
        localStorage.setItem("email",   d.email  || email);
        localStorage.setItem("id",      d.id     || "");
        if (remember) localStorage.setItem("remembered_email", email);
        else          localStorage.removeItem("remembered_email");

        setUserName(d.name || d.fname || email.split("@")[0]);
        setSuccess(true);
      } else {
        showMsg(d?.message || "❌ Invalid email or password");
      }
    } catch (err) {
      showMsg("❌ Could not connect to server. Check XAMPP is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="lg-page">

        {/* ── LEFT PANEL ── */}
        <div className="lg-left">
          <div className="lg-orb lg-orb1" />
          <div className="lg-orb lg-orb2" />
          <div className="lg-orb lg-orb3" />

          {/* Logo */}
          <div className="lg-logo-wrap">
            <div className="lg-logo-icon">🐾</div>
            <div className="lg-logo-text">Peto<span>logy</span></div>
          </div>

          {/* Center */}
          <div className="lg-left-center">
            <div className="lg-left-tag">Welcome Back</div>
            <h1 className="lg-left-title">
              Your Pets<br />Missed<br /><em>You Too</em>
            </h1>
            <p className="lg-left-sub">
              Sign in to manage your orders, track deliveries, and shop 
              the best products for your dogs, cats, birds & fish.
            </p>

            <div className="lg-features">
              {[
                { icon: "🛒", title: "Track Your Orders",       sub: "Real-time delivery updates" },
                { icon: "❤️", title: "Saved Wishlist",          sub: "Pick up where you left off" },
                { icon: "🐾", title: "Pet Profiles",            sub: "Personalised recommendations" },
                { icon: "🎁", title: "Exclusive Member Offers", sub: "Special deals just for you"  },
              ].map((f, i) => (
                <div className="lg-feature" key={i}>
                  <div className="lg-feature-icon">{f.icon}</div>
                  <div className="lg-feature-text">
                    <div className="lg-feature-title">{f.title}</div>
                    <div className="lg-feature-sub">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="lg-left-bottom">
            <div className="lg-stats-row">
              {[
                { num: "50K+", label: "Happy Pets"  },
                { num: "200+", label: "Products"    },
                { num: "4.8★", label: "Avg Rating"  },
                { num: "24/7", label: "Support"     },
              ].map((s, i) => (
                <div key={i}>
                  <div className="lg-stat-num">{s.num}</div>
                  <div className="lg-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="lg-right">
          <div className="lg-form-wrap">
            <div className="lg-form-tag">Member Login</div>
            <h2 className="lg-form-title">
              Welcome <em>Back</em>
            </h2>
            <p className="lg-form-sub">
              Sign in to your Petology account to continue shopping 🐾
            </p>

            {/* Social */}
            <div className="lg-social-row">
              <button className="lg-social-btn" type="button">
                <span style={{fontSize:18}}>🇬</span> Google
              </button>
              <button className="lg-social-btn" type="button">
                <span style={{fontSize:18}}>📘</span> Facebook
              </button>
            </div>

            <div className="lg-divider">
              <div className="lg-divider-line" />
              <div className="lg-divider-text">OR</div>
              <div className="lg-divider-line" />
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="lg-field">
                <label className="lg-label">Email Address</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon">✉️</span>
                  <input
                    className={`lg-input ${touched.email && errors.email ? "error" : ""}`}
                    type="email" name="email" placeholder="rahul@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={handleBlur}
                    autoComplete="email"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="lg-field-error">⚠ {errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-label">Password</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon">🔒</span>
                  <input
                    className={`lg-input ${touched.password && errors.password ? "error" : ""}`}
                    type={showPwd ? "text" : "password"}
                    name="password" placeholder="Your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    style={{ paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button" className="lg-pwd-toggle"
                    onClick={() => setShowPwd(p => !p)} tabIndex={-1}
                  >{showPwd ? "🙈" : "👁️"}</button>
                </div>
                {touched.password && errors.password && (
                  <div className="lg-field-error">⚠ {errors.password}</div>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="lg-row">
                <label className="lg-remember">
                  <input
                    type="checkbox" className="lg-checkbox"
                    checked={remember} onChange={e => setRemember(e.target.checked)}
                  />
                  <span className="lg-remember-text">Remember me</span>
                </label>
                <a href="#" className="lg-forgot">Forgot password?</a>
              </div>

              {/* Submit */}
              <button
                type="submit" className="lg-submit"
                disabled={loading}
              >
                {loading
                  ? <><div className="lg-spinner" /> Signing in…</>
                  : <>🐾 Sign In to Petology</>
                }
              </button>
            </form>

            {/* Signup link */}
            <div className="lg-signup-row">
              New to Petology?{" "}
              <Link to="/signup" className="lg-signup-link">
                Create a free account →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUCCESS OVERLAY ── */}
      {success && (
        <div className="lg-success-overlay">
          <div className="lg-success-card">
            <span className="lg-success-icon">🐾</span>
            <div className="lg-success-title">
              Welcome back, {userName}!
            </div>
            <p className="lg-success-sub">
              You're now signed in to Petology.<br />
              Let's find something amazing for your pet!
            </p>
            <button
              className="lg-success-btn"
              onClick={() => navigate("/")}
            >
              Go to Home →
            </button>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`lg-toast ${toast.green ? "green" : ""} ${toast.show ? "show" : ""}`}>
        {toast.msg}
      </div>
    </>
  );
}