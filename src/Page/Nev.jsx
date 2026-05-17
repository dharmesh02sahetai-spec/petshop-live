import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --bg:      #f4f1eb;
  --surface: #ffffff;
  --sage:    #3d6b4f;
  --sage-d:  #2a4e39;
  --sage-l:  #5a9470;
  --sage-xs: rgba(61,107,79,0.09);
  --sage-sm: rgba(61,107,79,0.18);
  --gold:    #b8922a;
  --gold-l:  #d4ac48;
  --border:  rgba(61,107,79,0.13);
  --text:    #1c2b22;
  --text2:   #3a4a3f;
  --muted:   #7a907f;
}

.nv-root {
  position: sticky; top: 0; z-index: 9000;
  background: rgba(244,241,235,0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  font-family: 'Outfit', sans-serif;
  box-shadow: 0 2px 20px rgba(30,50,35,0.07);
}

.nv-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 0 32px; height: 68px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
}

/* LOGO */
.nv-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem; font-weight: 700;
  color: var(--sage-d); cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  background: none; border: none; text-decoration: none;
  letter-spacing: 0.01em; transition: opacity 0.2s;
  white-space: nowrap;
}
.nv-logo:hover { opacity: 0.8; }
.nv-logo-mark {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, var(--sage), var(--sage-d));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}

/* DESKTOP LINKS */
.nv-links {
  display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center;
}
.nv-link {
  padding: 8px 16px; border-radius: 50px;
  font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 500;
  color: var(--text2); cursor: pointer; background: none; border: none;
  transition: all 0.2s; white-space: nowrap; position: relative;
}
.nv-link:hover { color: var(--sage); background: var(--sage-xs); }
.nv-link.active { color: var(--sage-d); background: var(--sage-xs); font-weight: 600; }
.nv-link.active::after {
  content: ''; position: absolute; bottom: 4px; left: 50%;
  transform: translateX(-50%); width: 18px; height: 2px;
  background: var(--sage); border-radius: 2px;
}

/* NAV BADGE */
.nv-badge {
  display: inline-block; margin-left: 5px;
  background: var(--sage); color: #fff;
  font-size: 0.55rem; font-weight: 700; letter-spacing: 0.05em;
  padding: 1px 6px; border-radius: 50px; vertical-align: middle;
  text-transform: uppercase;
}

/* RIGHT */
.nv-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

.nv-cart-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: 50px;
  background: var(--sage-xs); border: 1.5px solid var(--border);
  color: var(--sage-d); font-family: 'Outfit', sans-serif;
  font-size: 0.82rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
}
.nv-cart-btn:hover {
  background: var(--sage-sm); border-color: var(--sage);
  transform: translateY(-1px);
}

/* LOGIN button — outline style */
.nv-login-btn {
  padding: 9px 20px; border-radius: 50px;
  background: transparent;
  border: 1.5px solid var(--sage);
  color: var(--sage-d); font-family: 'Outfit', sans-serif;
  font-size: 0.82rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
}
.nv-login-btn:hover {
  background: var(--sage-xs);
  transform: translateY(-1px);
}

/* SIGNUP button — filled style */
.nv-auth-btn {
  padding: 9px 22px; border-radius: 50px;
  background: linear-gradient(135deg, var(--sage), var(--sage-d));
  border: none; color: #fff; font-family: 'Outfit', sans-serif;
  font-size: 0.82rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
  box-shadow: 0 4px 14px rgba(61,107,79,0.3);
}
.nv-auth-btn:hover {
  background: linear-gradient(135deg, var(--sage-d), #1e3a28);
  transform: translateY(-1px); box-shadow: 0 6px 20px rgba(61,107,79,0.4);
}

.nv-user-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 14px 6px 8px; border-radius: 50px;
  background: var(--sage-xs); border: 1px solid var(--border);
}
.nv-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg, var(--sage), var(--sage-d));
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; color: #fff; font-weight: 700; flex-shrink: 0;
}
.nv-uname {
  font-size: 0.8rem; font-weight: 600; color: var(--sage-d);
  max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.nv-logout {
  padding: 9px 18px; border-radius: 50px;
  background: transparent; border: 1.5px solid var(--border);
  color: var(--muted); font-family: 'Outfit', sans-serif;
  font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.nv-logout:hover { border-color: #e44; color: #e44; background: #fff0f0; }

/* HAMBURGER */
.nv-burger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; padding: 8px; background: none; border: none;
}
.nv-burger span {
  display: block; width: 22px; height: 2px;
  background: var(--sage); border-radius: 2px; transition: all 0.3s;
}
.nv-burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nv-burger.open span:nth-child(2) { opacity: 0; }
.nv-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* MOBILE DRAWER */
.nv-drawer {
  display: none; flex-direction: column;
  background: rgba(244,241,235,0.98);
  border-top: 1px solid var(--border);
  padding: 16px 24px 24px; gap: 4px;
}
@keyframes nvDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
.nv-drawer.open { display: flex; animation: nvDown 0.22s ease; }
.nv-drawer .nv-link { width: 100%; text-align: left; border-radius: 12px; padding: 12px 16px; font-size: 0.95rem; }
.nv-drawer-sep { height: 1px; background: var(--border); margin: 8px 0; }
.nv-drawer .nv-auth-btn  { width: 100%; text-align: center; border-radius: 12px; padding: 13px; font-size: 0.9rem; }
.nv-drawer .nv-login-btn { width: 100%; text-align: center; border-radius: 12px; padding: 13px; font-size: 0.9rem; }
.nv-drawer .nv-cart-btn  { width: 100%; justify-content: center; border-radius: 12px; padding: 11px; }
.nv-drawer .nv-logout    { width: 100%; text-align: center; border-radius: 12px; padding: 11px; }

@media (max-width: 900px) {
  .nv-links      { display: none; }
  .nv-cart-btn   { display: none; }
  .nv-auth-btn   { display: none; }
  .nv-login-btn  { display: none; }
  .nv-user-chip  { display: none; }
  .nv-logout     { display: none; }
  .nv-burger     { display: flex; }
  .nv-inner      { padding: 0 20px; }
}
`;

const LINKS = [
  { label: "Home",     path: "/",        badge: null   },
  { label: "Pets",     path: "/pet",     badge: "LIVE" },
  { label: "Products", path: "/product", badge: "NEW"  },
  { label: "Services", path: "/service", badge: null   },
  { label: "Clinic",   path: "/clinic",  badge: null   },
  { label: "Contact",  path: "/contact", badge: null   },
];

export default function Nev() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [uname,    setUname]    = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("islogin"));
    setUname(localStorage.getItem("uname") || "");
  }, [location.pathname]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const go = (p) => { navigate(p); setOpen(false); };

  const logout = () => {
    ["islogin","uname","email","id","item","pid","totalitem"]
      .forEach(k => localStorage.removeItem(k));
    setLoggedIn(false); setUname(""); navigate("/login");
  };

  const isActive = (p) => location.pathname === p;
  const initials = uname ? uname.charAt(0).toUpperCase() : "U";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <nav className="nv-root">
        <div className="nv-inner">

          {/* Logo */}
          <button className="nv-logo" onClick={() => go("/")}>
            <div className="nv-logo-mark">🐾</div>
            Petology
          </button>

          {/* Desktop links */}
          <div className="nv-links">
            {LINKS.map(l => (
              <button
                key={l.path}
                className={"nv-link" + (isActive(l.path) ? " active" : "")}
                onClick={() => go(l.path)}
              >
                {l.label}
                {l.badge && <span className="nv-badge">{l.badge}</span>}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="nv-right">
            <button className="nv-cart-btn" onClick={() => go("/cart")}>
              🛒 Cart
            </button>

            {loggedIn ? (
              <>
                <div className="nv-user-chip">
                  <div className="nv-avatar">{initials}</div>
                  <span className="nv-uname">{uname}</span>
                </div>
                <button className="nv-logout" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                {/* ── ALAG LOGIN BUTTON ── */}
                <button className="nv-login-btn" onClick={() => go("/login")}>
                  Login
                </button>
                {/* ── ALAG SIGNUP BUTTON ── */}
                <button className="nv-auth-btn" onClick={() => go("/signup")}>
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={"nv-burger" + (open ? " open" : "")}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={"nv-drawer" + (open ? " open" : "")}>
          {LINKS.map(l => (
            <button
              key={l.path}
              className={"nv-link" + (isActive(l.path) ? " active" : "")}
              onClick={() => go(l.path)}
            >
              {l.label} {l.badge && <span className="nv-badge">{l.badge}</span>}
            </button>
          ))}
          <div className="nv-drawer-sep" />
          <button className="nv-cart-btn" onClick={() => go("/cart")}>🛒 Cart</button>
          {loggedIn ? (
            <>
              <div style={{ fontSize:"0.82rem", color:"var(--muted)", padding:"4px 16px" }}>
                Hi, <strong style={{ color:"var(--sage-d)" }}>{uname}</strong>
              </div>
              <button className="nv-logout" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button className="nv-login-btn" onClick={() => go("/login")}>Login</button>
              <button className="nv-auth-btn"  onClick={() => go("/signup")}>Sign Up 🐾</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}