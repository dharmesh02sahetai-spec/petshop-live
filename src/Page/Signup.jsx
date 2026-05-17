import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// ─── CSS ─────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:       #f4f1eb;
    --bg2:      #ede8de;
    --surface:  #ffffff;
    --card:     #faf8f4;
    --sage:     #3d6b4f;
    --sage-d:   #2a4e39;
    --sage-l:   #5a9470;
    --sage-xs:  rgba(61,107,79,0.09);
    --sage-sm:  rgba(61,107,79,0.18);
    --gold:     #b8922a;
    --gold-l:   #d4ac48;
    --gold-xs:  rgba(184,146,42,0.12);
    --border:   rgba(61,107,79,0.13);
    --border2:  rgba(184,146,42,0.18);
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
  @keyframes slideL   { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:none} }
  @keyframes slideR   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:none} }
  @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(40px,-30px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.96)} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes popIn    { 0%{transform:scale(0.88);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes pawBounce{ 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }

  /* ── Page wrapper ── */
  .su-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'Outfit', sans-serif;
    color: var(--text);
    background: var(--bg);
  }

  /* ── LEFT PANEL ── */
  .su-left {
    background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Orbs */
  .su-orb {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(90,148,112,0.22), transparent 70%);
    pointer-events: none;
    animation: orbDrift 14s ease-in-out infinite;
  }
  .su-orb1 { width: 420px; height: 420px; top: -120px; left: -100px; }
  .su-orb2 { width: 320px; height: 320px; bottom: -80px; right: -60px; animation-delay: -6s; }
  .su-orb3 { width: 180px; height: 180px; top: 45%; left: 55%; animation-delay: -3s; opacity: 0.5; }

  /* Left top — logo */
  .su-logo-wrap {
    position: relative; z-index: 2;
    display: flex; align-items: center; gap: 12px;
    animation: fadeUp 0.5s ease;
  }
  .su-logo-icon {
    width: 44px; height: 44px; background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; backdrop-filter: blur(6px);
  }
  .su-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 700;
    color: #fff; letter-spacing: 0.5px;
  }
  .su-logo-text span { color: #d4ac48; font-style: italic; }

  /* Left center — hero copy */
  .su-left-center { position: relative; z-index: 2; }
  .su-left-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: #d4ac48; margin-bottom: 18px;
    animation: fadeUp 0.55s ease;
  }
  .su-left-tag::before {
    content: ''; width: 24px; height: 2px;
    background: #d4ac48; border-radius: 2px;
  }
  .su-left-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700; color: #fff;
    line-height: 1.08; margin-bottom: 18px;
    animation: fadeUp 0.6s ease;
  }
  .su-left-title em { font-style: italic; color: #d4ac48; }
  .su-left-sub {
    font-size: 14px; color: rgba(255,255,255,0.55);
    line-height: 1.7; max-width: 360px;
    animation: fadeUp 0.65s ease;
  }

  /* Pet category pills */
  .su-pet-pills {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-top: 32px; animation: fadeUp 0.7s ease;
  }
  .su-pet-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: 50px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.8);
    backdrop-filter: blur(4px);
    transition: all 0.25s;
    cursor: default;
  }
  .su-pet-pill:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(212,172,72,0.5);
    color: #fff;
    transform: translateY(-2px);
  }

  /* Testimonial / stat strip */
  .su-left-bottom { position: relative; z-index: 2; animation: fadeUp 0.75s ease; }
  .su-stats-row {
    display: flex; gap: 28px; flex-wrap: wrap;
    padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.1);
  }
  .su-stat { }
  .su-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: #fff; line-height: 1;
  }
  .su-stat-label {
    font-size: 10px; color: rgba(255,255,255,0.4);
    letter-spacing: 1px; text-transform: uppercase; margin-top: 3px;
  }

  /* ── RIGHT PANEL ── */
  .su-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 40px; background: var(--bg);
    animation: slideR 0.6s ease;
  }
  .su-form-wrap {
    width: 100%; max-width: 460px;
  }

  /* Form header */
  .su-form-tag {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--sage);
    margin-bottom: 8px;
  }
  .su-form-tag::before {
    content: ''; width: 24px; height: 2px;
    background: var(--sage); border-radius: 2px;
  }
  .su-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 700; color: var(--text);
    line-height: 1.1; margin-bottom: 6px;
  }
  .su-form-title em { font-style: italic; color: var(--sage); }
  .su-form-sub {
    font-size: 13px; color: var(--muted);
    margin-bottom: 32px; line-height: 1.6;
  }

  /* Social signup */
  .su-social-row {
    display: flex; gap: 10px; margin-bottom: 24px;
  }
  .su-social-btn {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px; border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--surface); cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    color: var(--text2); transition: all 0.2s;
  }
  .su-social-btn:hover {
    border-color: var(--sage); background: var(--sage-xs); color: var(--sage);
    transform: translateY(-1px); box-shadow: var(--shadow);
  }
  .su-social-icon { font-size: 18px; }

  /* Divider */
  .su-divider {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }
  .su-divider-line { flex: 1; height: 1px; background: var(--border); }
  .su-divider-text { font-size: 11px; color: var(--dim); font-weight: 500; letter-spacing: 1px; }

  /* Field grid */
  .su-field-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  .su-field-full { grid-column: 1 / -1; }

  /* Field */
  .su-field { position: relative; }
  .su-label {
    display: block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 7px;
  }
  .su-input-wrap {
    position: relative; display: flex; align-items: center;
  }
  .su-input-icon {
    position: absolute; left: 14px; font-size: 16px;
    pointer-events: none; z-index: 1;
    transition: opacity 0.2s;
    opacity: 0.6;
  }
  .su-input {
    width: 100%; padding: 12px 14px 12px 42px;
    border: 1.5px solid var(--border);
    border-radius: 12px; background: var(--surface);
    font-family: 'Outfit', sans-serif; font-size: 14px;
    color: var(--text); outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .su-input::placeholder { color: var(--dim); }
  .su-input:focus {
    border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(61,107,79,0.1);
  }
  .su-input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px var(--error-xs);
  }
  .su-input.success { border-color: #3ecf8e; }

  /* Password toggle */
  .su-pwd-toggle {
    position: absolute; right: 14px; background: none; border: none;
    cursor: pointer; font-size: 16px; color: var(--muted);
    transition: color 0.2s; padding: 0;
    display: flex; align-items: center;
  }
  .su-pwd-toggle:hover { color: var(--sage); }

  /* Password strength */
  .su-strength-wrap { margin-top: 8px; }
  .su-strength-bars { display: flex; gap: 4px; margin-bottom: 4px; }
  .su-strength-bar {
    flex: 1; height: 3px; border-radius: 4px;
    background: var(--border); transition: background 0.3s;
  }
  .su-strength-bar.weak   { background: #e05252; }
  .su-strength-bar.medium { background: #f5a623; }
  .su-strength-bar.strong { background: #3ecf8e; }
  .su-strength-text { font-size: 10px; color: var(--muted); }

  /* Field error msg */
  .su-field-error {
    font-size: 11px; color: var(--error);
    margin-top: 5px; display: flex; align-items: center; gap: 4px;
    animation: popIn 0.2s ease;
  }

  /* Pet preference selector */
  .su-pets-label {
    display: block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 10px;
  }
  .su-pets-grid { display: flex; gap: 8px; flex-wrap: wrap; }
  .su-pet-chip {
    display: flex; flex-direction: column; align-items: center;
    gap: 4px; padding: 10px 14px;
    border: 1.5px solid var(--border); border-radius: 14px;
    background: var(--surface); cursor: pointer;
    transition: all 0.22s; font-family: 'Outfit', sans-serif;
  }
  .su-pet-chip:hover { border-color: var(--sage); background: var(--sage-xs); transform: translateY(-2px); }
  .su-pet-chip.selected {
    border-color: var(--sage); background: var(--sage-xs);
    box-shadow: 0 0 0 2px rgba(61,107,79,0.15);
  }
  .su-pet-chip-icon { font-size: 22px; }
  .su-pet-chip-name { font-size: 10px; font-weight: 600; color: var(--text2); letter-spacing: 0.5px; }
  .su-pet-chip.selected .su-pet-chip-name { color: var(--sage); }

  /* Terms */
  .su-terms {
    display: flex; align-items: flex-start; gap: 10px;
    margin-top: 6px;
  }
  .su-checkbox {
    width: 18px; height: 18px; border: 1.5px solid var(--border);
    border-radius: 5px; appearance: none; cursor: pointer;
    background: var(--surface); flex-shrink: 0; margin-top: 1px;
    position: relative; transition: all 0.2s;
  }
  .su-checkbox:checked { background: var(--sage); border-color: var(--sage); }
  .su-checkbox:checked::after {
    content: '✓'; position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 11px; font-weight: 700;
  }
  .su-terms-text { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .su-terms-link { color: var(--sage); text-decoration: none; font-weight: 600; }
  .su-terms-link:hover { text-decoration: underline; }

  /* Submit button */
  .su-submit {
    width: 100%; padding: 15px;
    border-radius: 50px; border: none;
    background: var(--sage); color: #fff;
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
    cursor: pointer; margin-top: 20px;
    transition: all 0.28s cubic-bezier(.34,1.56,.64,1);
    letter-spacing: 0.3px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    position: relative; overflow: hidden;
  }
  .su-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .su-submit:hover::before { opacity: 1; }
  .su-submit:hover:not(:disabled) {
    background: var(--sage-d);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(61,107,79,0.35);
  }
  .su-submit:active { transform: translateY(0); }
  .su-submit:disabled {
    opacity: 0.65; cursor: not-allowed; transform: none;
  }
  .su-submit.loading { pointer-events: none; }

  /* Spinner */
  .su-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* Already have account */
  .su-signin-row {
    text-align: center; margin-top: 22px;
    font-size: 13px; color: var(--muted);
  }
  .su-signin-link {
    color: var(--sage); font-weight: 700; text-decoration: none;
    transition: color 0.2s;
  }
  .su-signin-link:hover { color: var(--sage-d); text-decoration: underline; }

  /* Success overlay */
  .su-success-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(30,58,40,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeUp 0.3s ease;
  }
  .su-success-card {
    background: var(--surface); border-radius: 28px;
    padding: 52px 48px; text-align: center;
    box-shadow: var(--shadow-lg); max-width: 380px; width: 90%;
    animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .su-success-icon {
    font-size: 56px; display: block; margin-bottom: 16px;
    animation: floatY 2.5s ease-in-out infinite;
  }
  .su-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px; font-weight: 700; color: var(--text);
    margin-bottom: 8px;
  }
  .su-success-sub { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  .su-success-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 32px; border-radius: 50px; border: none;
    background: var(--sage); color: #fff;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .su-success-btn:hover { background: var(--sage-d); transform: translateY(-1px); }

  /* Toast */
  .su-toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--error); border-radius: 50px;
    padding: 12px 24px; color: #fff; font-size: 13px; font-weight: 500;
    box-shadow: var(--shadow-lg); z-index: 9999;
    transition: transform 0.3s ease; white-space: nowrap;
    font-family: 'Outfit', sans-serif;
  }
  .su-toast.show { transform: translateX(-50%) translateY(0); }
  .su-toast.success-toast { background: var(--sage); }

  /* ── Responsive ── */
  @media(max-width: 900px) {
    .su-page { grid-template-columns: 1fr; }
    .su-left { display: none; }
    .su-right { padding: 40px 24px; min-height: 100vh; }
  }
  @media(max-width: 480px) {
    .su-field-grid { grid-template-columns: 1fr; }
    .su-right { padding: 32px 16px; }
    .su-form-title { font-size: 28px; }
    .su-social-row { flex-direction: column; }
  }
`;

// ─── Password strength ────────────────────────────────────────
function getStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const PETS = [
  { id: "dogs",  icon: "🐕", label: "Dogs"  },
  { id: "cats",  icon: "🐈", label: "Cats"  },
  { id: "birds", icon: "🦜", label: "Birds" },
  { id: "fish",  icon: "🐠", label: "Fish"  },
];

// ─── Main Component ───────────────────────────────────────────
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "", lname: "", email: "",
    phone: "", password: "", confirm: "",
  });
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [pets,     setPets]     = useState([]);
  const [terms,    setTerms]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [toast,    setToast]    = useState({ msg: "", show: false, type: "error" });

  const strength = getStrength(form.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "weak", "medium", "medium", "strong"];

  const showMsg = (msg, type = "error") => {
    setToast({ msg, show: true, type });
    setTimeout(() => setToast((p) => ({ ...p, show: false })), 3000);
  };

  // Validate single field
  const validateField = (name, value) => {
    switch (name) {
      case "fname":   return value.trim().length < 2 ? "First name is too short" : "";
      case "lname":   return value.trim().length < 2 ? "Last name is too short" : "";
      case "email":   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email";
      case "phone":   return /^[6-9]\d{9}$/.test(value) ? "" : "Enter a valid 10-digit mobile number";
      case "password":return value.length < 6 ? "Password must be at least 6 characters" : "";
      case "confirm": return value !== form.password ? "Passwords do not match" : "";
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const togglePet = (id) =>
    setPets((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((k) => {
      newErrors[k] = validateField(k, form[k]);
    });
    setErrors(newErrors);
    setTouched({ fname:true, lname:true, email:true, phone:true, password:true, confirm:true });

    if (Object.values(newErrors).some(Boolean)) {
      showMsg("⚠️ Please fix the errors above");
      return;
    }
    if (!terms) { showMsg("⚠️ Please accept the Terms & Privacy Policy"); return; }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("fname",    form.fname);
      data.append("lname",    form.lname);
      data.append("email",    form.email);
      data.append("phone",    form.phone);
      data.append("password", form.password);
      data.append("pets",     pets.join(","));

      const res = await axios.post("http://localhost/Petshop/signup.php", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.status === "success") {
        setSuccess(true);
      } else {
        showMsg(res.data?.message || "❌ Registration failed. Please try again.");
      }
    } catch (err) {
      // If no backend yet, simulate success for development
      if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
        setSuccess(true); // remove this line in production
      } else {
        showMsg("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldStatus = (name) => {
    if (!touched[name]) return "";
    return errors[name] ? "error" : "success";
  };

  return (
    <>
      <style>{css}</style>
      <div className="su-page">

        {/* ── LEFT PANEL ── */}
        <div className="su-left">
          <div className="su-orb su-orb1" />
          <div className="su-orb su-orb2" />
          <div className="su-orb su-orb3" />

          {/* Logo */}
          <div className="su-logo-wrap">
            <div className="su-logo-icon">🐾</div>
            <div className="su-logo-text">Peto<span>logy</span></div>
          </div>

          {/* Hero copy */}
          <div className="su-left-center">
            <div className="su-left-tag">Your Pet's Happy Place</div>
            <h1 className="su-left-title">
              Where Every<br />Pet Gets<br /><em>The Best</em>
            </h1>
            <p className="su-left-sub">
              Premium food, toys, medicines, accessories — and even adopt a new furry friend. 
              One destination for dogs, cats, birds & fish.
            </p>
            <div className="su-pet-pills">
              {[
                { icon: "🐕", label: "500+ Dog Products" },
                { icon: "🐈", label: "Cat Essentials" },
                { icon: "🦜", label: "Bird Supplies" },
                { icon: "🐠", label: "Aquarium & Fish" },
                { icon: "🏠", label: "Adopt Pets" },
                { icon: "🚚", label: "Free Delivery" },
              ].map((p, i) => (
                <div className="su-pet-pill" key={i}>
                  <span>{p.icon}</span> {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="su-left-bottom">
            <div className="su-stats-row">
              {[
                { num: "50K+", label: "Happy Pets" },
                { num: "200+", label: "Products" },
                { num: "4.8★", label: "Avg Rating" },
                { num: "24/7", label: "Support" },
              ].map((s, i) => (
                <div className="su-stat" key={i}>
                  <div className="su-stat-num">{s.num}</div>
                  <div className="su-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="su-right">
          <div className="su-form-wrap">
            <div className="su-form-tag">New Account</div>
            <h2 className="su-form-title">
              Join <em>Petology</em>
            </h2>
            <p className="su-form-sub">
              Create your free account and get ₹100 off your first order 🎉
            </p>

            {/* Social signup */}
            <div className="su-social-row">
              <button className="su-social-btn" type="button">
                <span className="su-social-icon">🇬</span> Google
              </button>
              <button className="su-social-btn" type="button">
                <span className="su-social-icon">📘</span> Facebook
              </button>
            </div>

            <div className="su-divider">
              <div className="su-divider-line" />
              <div className="su-divider-text">OR</div>
              <div className="su-divider-line" />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="su-field-grid">

                {/* First Name */}
                <div className="su-field">
                  <label className="su-label">First Name</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">👤</span>
                    <input
                      className={`su-input ${fieldStatus("fname")}`}
                      type="text" name="fname" placeholder="Rahul"
                      value={form.fname}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                  </div>
                  {touched.fname && errors.fname && (
                    <div className="su-field-error">⚠ {errors.fname}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="su-field">
                  <label className="su-label">Last Name</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">👤</span>
                    <input
                      className={`su-input ${fieldStatus("lname")}`}
                      type="text" name="lname" placeholder="Sharma"
                      value={form.lname}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                  </div>
                  {touched.lname && errors.lname && (
                    <div className="su-field-error">⚠ {errors.lname}</div>
                  )}
                </div>

                {/* Email */}
                <div className="su-field su-field-full">
                  <label className="su-label">Email Address</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">✉️</span>
                    <input
                      className={`su-input ${fieldStatus("email")}`}
                      type="email" name="email" placeholder="rahul@email.com"
                      value={form.email}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div className="su-field-error">⚠ {errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="su-field su-field-full">
                  <label className="su-label">Mobile Number</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">📱</span>
                    <input
                      className={`su-input ${fieldStatus("phone")}`}
                      type="tel" name="phone" placeholder="9876543210"
                      maxLength={10} value={form.phone}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <div className="su-field-error">⚠ {errors.phone}</div>
                  )}
                </div>

                {/* Password */}
                <div className="su-field">
                  <label className="su-label">Password</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">🔒</span>
                    <input
                      className={`su-input ${fieldStatus("password")}`}
                      type={showPwd ? "text" : "password"}
                      name="password" placeholder="Min 6 chars"
                      value={form.password}
                      onChange={handleChange} onBlur={handleBlur}
                      style={{ paddingRight: 42 }}
                    />
                    <button
                      type="button" className="su-pwd-toggle"
                      onClick={() => setShowPwd((p) => !p)}
                      tabIndex={-1}
                    >{showPwd ? "🙈" : "👁️"}</button>
                  </div>
                  {form.password && (
                    <div className="su-strength-wrap">
                      <div className="su-strength-bars">
                        {[1,2,3,4].map((i) => (
                          <div
                            key={i}
                            className={`su-strength-bar ${i <= strength ? strengthColors[strength] : ""}`}
                          />
                        ))}
                      </div>
                      <div className="su-strength-text">{strengthLabels[strength]}</div>
                    </div>
                  )}
                  {touched.password && errors.password && (
                    <div className="su-field-error">⚠ {errors.password}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="su-field">
                  <label className="su-label">Confirm Password</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">🔑</span>
                    <input
                      className={`su-input ${fieldStatus("confirm")}`}
                      type={showCPwd ? "text" : "password"}
                      name="confirm" placeholder="Repeat password"
                      value={form.confirm}
                      onChange={handleChange} onBlur={handleBlur}
                      style={{ paddingRight: 42 }}
                    />
                    <button
                      type="button" className="su-pwd-toggle"
                      onClick={() => setShowCPwd((p) => !p)}
                      tabIndex={-1}
                    >{showCPwd ? "🙈" : "👁️"}</button>
                  </div>
                  {touched.confirm && errors.confirm && (
                    <div className="su-field-error">⚠ {errors.confirm}</div>
                  )}
                </div>

                {/* Pet preference */}
                <div className="su-field su-field-full">
                  <span className="su-pets-label">My Pets <span style={{color:"var(--dim)",fontWeight:400,textTransform:"none",letterSpacing:0}}>(optional — helps us personalise)</span></span>
                  <div className="su-pets-grid">
                    {PETS.map((p) => (
                      <div
                        key={p.id}
                        className={`su-pet-chip ${pets.includes(p.id) ? "selected" : ""}`}
                        onClick={() => togglePet(p.id)}
                      >
                        <span className="su-pet-chip-icon">{p.icon}</span>
                        <span className="su-pet-chip-name">{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="su-field su-field-full">
                  <label className="su-terms">
                    <input
                      type="checkbox" className="su-checkbox"
                      checked={terms} onChange={(e) => setTerms(e.target.checked)}
                    />
                    <span className="su-terms-text">
                      I agree to the{" "}
                      <a href="#" className="su-terms-link">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="su-terms-link">Privacy Policy</a>
                      . I consent to receiving pet-related offers and updates.
                    </span>
                  </label>
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`su-submit ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <><div className="su-spinner" /> Creating Account…</>
                ) : (
                  <>🐾 Create My Account</>
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="su-signin-row">
              Already have an account?{" "}
              <Link to="/login" className="su-signin-link">Sign In →</Link>
            </div>
            {/* Dev helper - remove in production */}
          </div>
        </div>

      </div>

      {/* ── SUCCESS OVERLAY ── */}
      {success && (
        <div className="su-success-overlay">
          <div className="su-success-card">
            <span className="su-success-icon">🐾</span>
            <div className="su-success-title">Welcome to Petology!</div>
            <p className="su-success-sub">
              Your account has been created successfully.<br />
              Your first order gets <strong>₹100 off</strong> — happy shopping!
            </p>
            <button
              className="su-success-btn"
              onClick={() => navigate("/login")}
            >
              Sign In Now →
            </button>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`su-toast ${toast.type === "success" ? "success-toast" : ""} ${toast.show ? "show" : ""}`}>
        {toast.msg}
      </div>
    </>
  );
}