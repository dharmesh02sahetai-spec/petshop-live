import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nev";

const RAZORPAY_KEY_ID = "rzp_test_Sq7J7mRZo6zCD1";
const MERCHANT_UPI    = "dharmesh.220180107013@okhdfcbank";
const MERCHANT_NAME   = "Petology Pet Shop";

const UPI_APPS = [
  { id:"gpay",    name:"Google Pay", bg:"#e8f0fe", label:"G",
    labelStyle:{background:"linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:900,fontSize:20},
    getLink:(u,a,n)=>`tez://upi/pay?pa=${u}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${a}&cu=INR&tn=${n}` },
  { id:"phonepe", name:"PhonePe",    bg:"#f3e8ff", label:"Pe",
    labelStyle:{color:"#5f259f",fontWeight:900,fontSize:18},
    getLink:(u,a,n)=>`phonepe://pay?pa=${u}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${a}&cu=INR&tn=${n}` },
  { id:"paytm",   name:"Paytm",      bg:"#e0f7fe", label:"PT",
    labelStyle:{color:"#00BAF2",fontWeight:900,fontSize:16},
    getLink:(u,a,n)=>`paytmmp://upi/pay?pa=${u}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${a}&cu=INR&tn=${n}` },
  { id:"bhim",    name:"BHIM UPI",   bg:"#fee2e2", label:"B",
    labelStyle:{color:"#e84141",fontWeight:900,fontSize:20},
    getLink:(u,a,n)=>`upi://pay?pa=${u}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${a}&cu=INR&tn=${n}` },
];

function UpiQR({ upiString, size=200 }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const draw = () => {
      const div = document.createElement("div");
      div.style.display = "none";
      document.body.appendChild(div);
      const QRL = window.QRCode;
      if (!QRL) return;
      try {
        new QRL(div, { text:upiString, width:size, height:size, colorDark:"#1c2b22", colorLight:"#ffffff" });
        setTimeout(() => {
          const img = div.querySelector("img");
          const canvas = canvasRef.current;
          if (!canvas || !img) return;
          const image = new Image();
          image.onload = () => { canvas.getContext("2d").drawImage(image,0,0,size,size); setLoaded(true); };
          image.src = img.src;
          document.body.removeChild(div);
        }, 300);
      } catch(e) { document.body.removeChild(div); }
    };
    if (window.QRCode) { draw(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    s.onload = draw;
    document.head.appendChild(s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upiString]);
  return (
    <div style={{position:"relative",width:size,height:size}}>
      {!loaded && <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#fdf9f2",borderRadius:16,gap:10}}>
        <div style={{width:32,height:32,border:"2.5px solid #3d6b4f",borderTopColor:"transparent",borderRadius:"50%",animation:"spinR 0.8s linear infinite"}}/>
        <span style={{fontSize:11,color:"#7a907f"}}>Generating QR…</span>
      </div>}
      <canvas ref={canvasRef} width={size} height={size} style={{borderRadius:14,display:loaded?"block":"none"}}/>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Outfit:wght@400;500;600;700&display=swap');
:root{--bg:#f4f1eb;--surface:#fff;--card:#faf8f4;--sage:#3d6b4f;--sage-d:#2a4e39;--sage-l:#5a9470;--sage-xs:rgba(61,107,79,0.09);--gold:#b8922a;--gold-l:#d4ac48;--border:rgba(61,107,79,0.13);--text:#1c2b22;--text2:#3a4a3f;--muted:#7a907f;--dim:#aab8ac;--ivory:#fdf9f2;--shadow:0 4px 24px rgba(30,50,35,0.08);--shadow-lg:0 16px 60px rgba(30,50,35,0.14);--radius:20px;}
*{box-sizing:border-box;margin:0;padding:0;}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes orbDrift{0%,100%{transform:translate(0,0)}40%{transform:translate(40px,-30px)}70%{transform:translate(-20px,20px)}}
@keyframes spinR{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes popIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.visible{opacity:1;transform:none;}
.co-page{min-height:100vh;background:var(--bg);font-family:'Outfit',sans-serif;color:var(--text);}

/* STEP BAR */
.co-stepbar{display:flex;align-items:center;justify-content:center;gap:0;padding:20px 16px 0;position:relative;z-index:2;}
.co-si{padding:7px 16px;border-radius:50px;font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;font-family:'Outfit',sans-serif;}
.co-si.done{color:#8ecfa8;}
.co-si.active{background:rgba(82,183,136,0.18);border:1px solid rgba(82,183,136,0.4);color:#8ecfa8;}
.co-si.up{color:rgba(255,255,255,0.22);}
.co-sl{width:32px;height:1px;background:rgba(255,255,255,0.12);}

/* HERO */
.co-hero{background:linear-gradient(160deg,#1e3a28,#2a5a3c,#1a4030);padding:28px 24px 48px;text-align:center;position:relative;overflow:hidden;}
.co-orb{position:absolute;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(90,148,112,0.22),transparent 70%);pointer-events:none;animation:orbDrift 12s ease-in-out infinite;}
.co-orb1{top:-80px;left:-60px;} .co-orb2{bottom:-100px;right:-40px;animation-delay:-5s;}
.co-hero-label{display:inline-flex;align-items:center;gap:8px;font-size:0.68rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#d4ac48;margin-bottom:12px;}
.co-hero-label::before{content:'';width:24px;height:2px;background:#d4ac48;border-radius:2px;}
.co-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,6vw,46px);font-weight:700;color:#fff;line-height:1.1;margin-bottom:10px;}
.co-hero-sub{font-size:13px;color:rgba(255,255,255,0.45);letter-spacing:1px;}
.co-badges{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:22px;}
.co-hbadge{padding:5px 14px;border-radius:50px;font-size:10px;font-weight:600;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);}
.co-hbadge.g{border-color:rgba(90,148,112,0.5);color:#8ecfa8;background:rgba(90,148,112,0.1);}

/* WRAP */
.co-wrap{max-width:520px;margin:0 auto;padding:32px 16px 80px;}

/* AMOUNT CARD */
.co-amt-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px 28px 24px;margin-bottom:18px;box-shadow:var(--shadow);position:relative;overflow:hidden;}
.co-amt-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--sage),var(--gold),var(--sage-l));background-size:200% auto;animation:shimmer 3s linear infinite;}
.co-amt-inner{display:flex;justify-content:space-between;align-items:center;gap:16px;}
.co-amt-lbl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}
.co-amt-val{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,8vw,52px);font-weight:700;color:var(--sage-d);line-height:1;}
.co-amt-val em{font-style:normal;font-size:0.5em;color:var(--sage);vertical-align:top;margin-top:8px;display:inline-block;}
.co-amt-free{font-size:11px;color:var(--sage-l);margin-top:10px;font-weight:500;}
.co-amt-pet{width:80px;height:80px;border-radius:50%;background:var(--sage-xs);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:38px;animation:floatY 3s ease-in-out infinite;flex-shrink:0;}
.co-amt-meta{margin-top:20px;padding-top:18px;border-top:1px solid var(--border);display:flex;gap:20px;flex-wrap:wrap;}
.co-ml{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);}
.co-mv{font-size:13px;font-weight:600;color:var(--text2);}

/* PAY CARD */
.co-pay-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-bottom:18px;box-shadow:var(--shadow);}
.co-eye{display:flex;align-items:center;gap:8px;font-size:0.68rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--sage);margin-bottom:6px;}
.co-eye::before{content:'';width:24px;height:2px;background:var(--sage);border-radius:2px;}
.co-ptitle{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--text);margin-bottom:22px;}

/* TABS */
.co-tabs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:22px;}
.co-tab{padding:12px 8px;border-radius:14px;border:1.5px solid var(--border);background:transparent;color:var(--muted);font-family:'Outfit',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.22s;display:flex;flex-direction:column;align-items:center;gap:5px;}
.co-tab:hover{border-color:rgba(61,107,79,0.18);color:var(--sage);}
.co-tab.active{background:var(--sage-xs);border-color:var(--sage);color:var(--sage-d);}
.co-ti{font-size:19px;}

/* UPI */
.co-upi-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.co-upi-btn{padding:18px 12px;border-radius:16px;border:1.5px solid var(--border);background:var(--card);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:9px;transition:all 0.22s;position:relative;overflow:hidden;}
.co-upi-btn:hover{transform:translateY(-4px);border-color:rgba(61,107,79,0.18);box-shadow:var(--shadow);}
.co-upi-btn.sel{border-color:var(--sage);background:var(--sage-xs);box-shadow:0 0 0 3px rgba(61,107,79,0.08);}
.co-uico{width:46px;height:46px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--border);}
.co-unm{font-size:11px;font-weight:600;color:var(--text2);}
.co-tick{position:absolute;top:8px;right:8px;width:18px;height:18px;background:var(--sage);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;opacity:0;transition:opacity 0.2s;}
.co-upi-btn.sel .co-tick{opacity:1;}

/* Gold Address Button */
.co-addr-btn{width:100%;padding:17px;border-radius:50px;border:none;background:linear-gradient(135deg,var(--gold),#9a6e00);color:#fff;font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.22s;letter-spacing:0.4px;box-shadow:0 8px 30px rgba(184,146,42,0.35);margin-top:10px;display:flex;align-items:center;justify-content:center;gap:10px;}
.co-addr-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(184,146,42,0.5);}
.co-addr-hint{font-size:10px;color:var(--dim);text-align:center;margin:8px 0 14px;font-family:'Outfit',sans-serif;}

/* Direct pay button */
.co-pay-btn{width:100%;padding:17px;border-radius:50px;border:none;background:var(--sage);color:#fff;font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.22s;box-shadow:0 8px 30px rgba(61,107,79,0.3);margin-top:10px;}
.co-pay-btn:hover:not(:disabled){background:var(--sage-d);transform:translateY(-2px);}
.co-pay-btn:disabled{opacity:0.6;cursor:not-allowed;}

.co-open-btn{width:100%;padding:15px;border-radius:50px;border:1.5px solid var(--sage);background:var(--sage);color:#fff;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.22s;margin-bottom:6px;}
.co-open-btn:hover{background:var(--sage-d);transform:translateY(-2px);}

.co-or{text-align:center;color:var(--dim);font-size:10px;margin:16px 0;letter-spacing:2px;text-transform:uppercase;position:relative;}
.co-or::before,.co-or::after{content:'';position:absolute;top:50%;width:40%;height:1px;background:var(--border);}
.co-or::before{left:0;}.co-or::after{right:0;}

.co-input{width:100%;padding:14px 16px;background:var(--ivory);border:1.5px solid var(--border);border-radius:12px;color:var(--text);font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:all 0.2s;}
.co-input::placeholder{color:var(--dim);}
.co-input:focus{border-color:var(--sage);box-shadow:0 0 0 3px rgba(61,107,79,0.1);background:#fff;}
.co-hint{font-size:11px;color:var(--muted);margin-top:6px;}

/* QR */
.co-qr-wrap{display:flex;flex-direction:column;align-items:center;padding:4px 0;}
.co-qr-eye{display:flex;align-items:center;gap:8px;font-size:0.68rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:4px;}
.co-qr-eye::before{content:'';width:24px;height:2px;background:var(--gold);border-radius:2px;}
.co-qr-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:4px;text-align:center;}
.co-qr-sub{font-size:12px;color:var(--muted);text-align:center;margin-bottom:20px;}
.co-qr-apps{display:flex;gap:12px;justify-content:center;margin-bottom:20px;flex-wrap:wrap;}
.co-qr-app{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;color:var(--muted);}
.co-qr-app-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800;border:1px solid var(--border);background:#fff;}
.co-qr-box{background:#fff;border-radius:24px;padding:20px;margin-bottom:20px;box-shadow:0 0 0 1px var(--border),var(--shadow-lg);position:relative;}
.co-qrc{position:absolute;width:22px;height:22px;border-color:var(--sage);border-style:solid;border-width:0;}
.co-tl{top:10px;left:10px;border-top-width:3px;border-left-width:3px;border-radius:4px 0 0 0;}
.co-tr{top:10px;right:10px;border-top-width:3px;border-right-width:3px;border-radius:0 4px 0 0;}
.co-bl{bottom:10px;left:10px;border-bottom-width:3px;border-left-width:3px;border-radius:0 0 0 4px;}
.co-br{bottom:10px;right:10px;border-bottom-width:3px;border-right-width:3px;border-radius:0 0 4px 0;}
.co-qr-upi{font-size:11px;color:var(--sage);background:var(--sage-xs);border:1px solid var(--border);border-radius:10px;padding:10px 16px;margin-bottom:16px;word-break:break-all;text-align:center;}
.co-qr-steps{width:100%;margin-bottom:20px;}
.co-qr-step{display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;}
.co-qr-num{min-width:24px;height:24px;border-radius:50%;background:var(--sage-xs);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--sage);margin-top:1px;}
.co-qr-text{font-size:13px;color:var(--text2);line-height:1.5;}
.co-qr-confirm{width:100%;padding:15px;border-radius:50px;border:none;background:var(--sage);color:#fff;font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.22s;}
.co-qr-confirm:hover{background:var(--sage-d);transform:translateY(-2px);}
.co-qr-note{font-size:10px;color:var(--dim);text-align:center;margin-top:8px;}

/* CARD TAB */
.co-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.co-mbox{padding:18px 14px;background:var(--card);border:1.5px solid var(--border);border-radius:16px;text-align:center;transition:all 0.22s;}
.co-mbox:hover{transform:translateY(-4px);border-color:rgba(61,107,79,0.18);box-shadow:var(--shadow);}
.co-micon{font-size:24px;margin-bottom:6px;}
.co-mname{font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px;}
.co-msub{font-size:10px;color:var(--muted);line-height:1.4;}

/* SEC */
.co-sec{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:20px 0 12px;}
.co-badge{padding:5px 13px;border-radius:50px;font-size:10px;font-weight:600;background:var(--sage-xs);color:var(--sage);border:1px solid var(--border);}
.co-powered{text-align:center;font-size:11px;color:var(--muted);}
.co-powered strong{color:var(--sage-d);}

.co-trust-strip{background:var(--ivory);border-top:1px solid var(--border);padding:20px 24px;display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:8px;}
.co-ti-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted);}

.co-back{display:block;width:100%;background:none;border:none;color:var(--muted);font-size:12px;cursor:pointer;text-align:center;padding:14px;font-family:'Outfit',sans-serif;letter-spacing:1.5px;text-transform:uppercase;transition:color 0.2s;}
.co-back:hover{color:var(--sage);}

/* SUCCESS */
.co-suc-outer{min-height:100vh;background:var(--bg);display:flex;flex-direction:column;}
.co-suc-hero{background:linear-gradient(160deg,#1e3a28,#2a5a3c,#1a4030);padding:80px 24px 60px;text-align:center;position:relative;overflow:hidden;}
.co-suc-wrap{max-width:480px;margin:0 auto;padding:40px 20px 80px;animation:popIn 0.5s cubic-bezier(.34,1.56,.64,1);}
.co-suc-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:40px 28px;box-shadow:var(--shadow-lg);margin-top:-40px;position:relative;z-index:2;}
.co-s-emoji{font-size:70px;display:block;margin-bottom:16px;animation:floatY 2s ease-in-out infinite;}
.co-s-label{display:inline-flex;align-items:center;gap:8px;font-size:0.68rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--sage);margin-bottom:10px;}
.co-s-label::before{content:'';width:24px;height:2px;background:var(--sage);border-radius:2px;}
.co-s-title{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;color:var(--sage-d);margin-bottom:6px;}
.co-s-amt{font-size:14px;color:var(--muted);margin-bottom:26px;}
.co-pid{background:var(--sage-xs);border:1px solid var(--border);border-radius:10px;padding:12px 16px;margin-bottom:26px;font-size:11px;color:var(--sage);word-break:break-all;line-height:1.6;}
.co-btn-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.co-gbtn{padding:13px 24px;background:var(--sage);color:#fff;border:none;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.22s;}
.co-obtn{padding:13px 24px;background:transparent;color:var(--sage);border:1.5px solid var(--border);border-radius:50px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.22s;}
.co-gbtn:hover{background:var(--sage-d);transform:translateY(-2px);}
.co-obtn:hover{border-color:var(--sage);background:var(--sage-xs);transform:translateY(-2px);}

/* ADDRESS SUMMARY CARD (shown when address already saved) */
.co-addr-saved{background:var(--sage-xs);border:1.5px solid rgba(61,107,79,0.25);border-radius:16px;padding:16px 18px;margin-bottom:14px;display:flex;align-items:flex-start;gap:12px;}
.co-addr-saved-icon{font-size:22px;flex-shrink:0;margin-top:2px;}
.co-addr-saved-text{flex:1;}
.co-addr-saved-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--sage);font-weight:700;margin-bottom:4px;}
.co-addr-saved-val{font-size:12px;color:var(--text2);line-height:1.6;}
.co-addr-change{font-size:10px;color:var(--gold);font-weight:600;cursor:pointer;background:none;border:none;font-family:'Outfit',sans-serif;padding:0;margin-top:4px;display:inline-block;text-decoration:underline;}
.co-addr-change:hover{color:var(--gold-l);}

.co-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--text);border:1px solid var(--border);border-radius:50px;padding:11px 22px;color:#fff;font-size:13px;font-weight:500;box-shadow:var(--shadow-lg);z-index:9999;transition:transform 0.3s ease;white-space:nowrap;font-family:'Outfit',sans-serif;}
.co-toast.show{transform:translateX(-50%) translateY(0);}

@media(max-width:480px){
  .co-hero{padding:20px 16px 36px;}
  .co-wrap{padding:20px 12px 60px;}
  .co-stepbar{flex-wrap:wrap;gap:4px;}
  .co-sl{width:16px;}
}
`;

export default function Checkout() {
  const [tab, setTab]             = useState("upi");
  const [selApp, setSelApp]       = useState(null);
  const [customUpi, setCustomUpi] = useState("");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [pid, setPid]             = useState("");
  const [toast, setToast]         = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const amount    = parseInt(localStorage.getItem("item") || 0);
  const uid       = localStorage.getItem("id") || 0;
  const userName  = localStorage.getItem("uname") || "Customer";
  const userEmail = localStorage.getItem("email") || "customer@example.com";

  // ── Read saved address from localStorage (set by AddressForm) ──
  const savedAddress = (() => {
    try { return JSON.parse(localStorage.getItem("delivery_address") || "null"); }
    catch { return null; }
  })();

  const upiQr = `upi://pay?pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent("Petology Order")}`;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [done]);

  useEffect(() => {
    if (!localStorage.getItem("islogin")) { navigate("/login"); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const msg = text => {
    setToast(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  const clearCart  = () => fetch("http://localhost/Petshop/deletecart.php?uid=" + uid).catch(() => {});
  const saveOrder  = oid => fetch("http://localhost/Petshop/order.php", {
    method: "POST",
    body: new URLSearchParams({
      pid: localStorage.getItem("pid") || 1,
      order_id: oid,
      uid,
      totalitem: localStorage.getItem("totalitem") || 1,
      amount,
    }),
  }).catch(() => {});

  const success = pid => {
    setPid(pid);
    saveOrder(pid);
    clearCart();
    // clear saved address after order placed
    localStorage.removeItem("delivery_address");
    setDone(true);
    setLoading(false);
  };

  // ── Save payment method + amount, go to /address ──
  const goToAddress = () => {
    localStorage.setItem("checkout_method", tab);
    localStorage.setItem("checkout_amount", amount);
    navigate("/address");
  };

  const handleRazorpay = () => {
    if (!window.Razorpay) { msg("⚠️ Page reload karein"); return; }
    if (!savedAddress) { msg("📍 Pehle delivery address add karein!"); goToAddress(); return; }
    setLoading(true);
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID, amount: amount * 100, currency: "INR",
      name: MERCHANT_NAME, description: "Pet Purchase",
      handler: r => success(r.razorpay_payment_id),
      prefill: { name: userName, email: userEmail },
      theme: { color: "#3d6b4f" },
      modal: { ondismiss: () => setLoading(false) },
    });
    rzp.on("payment.failed", r => { setLoading(false); msg("❌ " + r.error.description); });
    rzp.open();
  };

  const handleUpiApp = app => {
    if (!savedAddress) { msg("📍 Pehle delivery address add karein!"); return; }
    msg(`Opening ${app.name}…`);
    window.location.href = app.getLink(MERCHANT_UPI, amount, encodeURIComponent("Petology Order"));
    setTimeout(() => success("UPI_" + Date.now()), 9000);
  };

  const handleCustomUpi = () => {
    if (!customUpi.includes("@")) { msg("⚠️ Valid UPI ID daalo"); return; }
    if (!savedAddress) { msg("📍 Pehle delivery address add karein!"); return; }
    window.location.href = `upi://pay?pa=${customUpi}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=PetologyOrder`;
    msg("Opening UPI app…");
  };

  const selectedAppObj = UPI_APPS.find(a => a.id === selApp);

  // Helper: render saved address summary
  const AddressSummary = () => savedAddress ? (
    <div className="co-addr-saved">
      <div className="co-addr-saved-icon">📍</div>
      <div className="co-addr-saved-text">
        <div className="co-addr-saved-label">Delivery Address</div>
        <div className="co-addr-saved-val">
          <strong>{savedAddress.fullName}</strong><br />
          {savedAddress.addressLine1}{savedAddress.addressLine2 ? `, ${savedAddress.addressLine2}` : ""}<br />
          {savedAddress.city}, {savedAddress.state} — {savedAddress.postalCode}
        </div>
        <button className="co-addr-change" onClick={goToAddress}>✏️ Change Address</button>
      </div>
    </div>
  ) : null;

  // Helper: "Add address first" button (shown only when no address saved)
  const AddressBtn = ({ style = {} }) => !savedAddress ? (
    <>
      <button className="co-addr-btn" style={style} onClick={goToAddress}>
        📦 Add Delivery Address First →
      </button>
      <div className="co-addr-hint">Address dene ke baad payment complete hogi</div>
    </>
  ) : null;

  // ── SUCCESS SCREEN ──
  if (done) return (
    <>
      <style>{css}</style>
      <div className="co-suc-outer">
        <Nav />
        <div className="co-suc-hero">
          <div className="co-orb co-orb1" /><div className="co-orb co-orb2" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="co-hero-label">Order Confirmed</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,6vw,40px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
              Thank You for<br />Choosing Petology 🐾
            </h1>
          </div>
        </div>
        <div className="co-suc-wrap">
          <div className="co-suc-card">
            <span className="co-s-emoji">🎉</span>
            <div className="co-s-label">Payment Successful</div>
            <div className="co-s-title">Order Placed!</div>
            <div className="co-s-amt">₹{amount.toLocaleString("en-IN")} paid successfully</div>
            <div className="co-pid">
              <strong>Payment ID:</strong> {pid}<br />
              <span style={{ color: "var(--dim)", fontSize: 10 }}>Save this for your records</span>
            </div>
            <div className="co-btn-row">
              <button className="co-gbtn" onClick={() => navigate("/myorder")}>📦 My Orders</button>
              <button className="co-obtn" onClick={() => navigate("/product")}>🐾 Shop More</button>
            </div>
          </div>
          <div className="co-trust-strip" style={{ borderRadius: "var(--radius)", marginTop: 16 }}>
            {["🚚 Free Delivery", "📦 Track Your Order", "💚 Happy Pets Guaranteed"].map((t, i) => (
              <div className="co-ti-item" key={i}>
                <span>{t.split(" ")[0]}</span>
                <span>{t.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`co-toast ${showToast ? "show" : ""}`}>{toast}</div>
    </>
  );

  // ── MAIN CHECKOUT SCREEN ──
  return (
    <>
      <style>{css}</style>
      <div className="co-page">
        <Nav />

        <div className="co-hero">
          <div className="co-orb co-orb1" /><div className="co-orb co-orb2" />
          <div style={{ position: "relative", zIndex: 1 }}>

            {/* STEP BAR — Address marked done if already saved */}
            <div className="co-stepbar" style={{ marginBottom: 20 }}>
              <div className="co-si done">✓ Cart</div>
              <div className="co-sl" />
              <div className="co-si active">● Checkout</div>
              <div className="co-sl" />
              <div className={`co-si ${savedAddress ? "done" : "up"}`}>
                {savedAddress ? "✓" : "○"} Address
              </div>
              <div className="co-sl" />
              <div className="co-si up">○ Confirm</div>
            </div>

            <div className="co-hero-label">Secure Checkout</div>
            <h1 className="co-hero-title">Complete Your<br />Purchase</h1>
            <p className="co-hero-sub">Safe · Fast · Trusted by 50,000+ Pet Parents</p>
            <div className="co-badges">
              <span className="co-hbadge g">🔒 256-bit SSL</span>
              <span className="co-hbadge">✅ RBI Approved</span>
              <span className="co-hbadge">🛡️ PCI DSS</span>
              <span className="co-hbadge">⚡ Instant Confirmation</span>
            </div>
          </div>
        </div>

        <div className="co-wrap">

          {/* AMOUNT CARD */}
          <div className="co-amt-card reveal">
            <div className="co-amt-inner">
              <div>
                <div className="co-amt-lbl">Total Payable Amount</div>
                <div className="co-amt-val"><em>₹</em>{amount.toLocaleString("en-IN")}</div>
                <div className="co-amt-free">✅ Free delivery included</div>
              </div>
              <div className="co-amt-pet">🐾</div>
            </div>
            <div className="co-amt-meta">
              <div><div className="co-ml">Customer</div><div className="co-mv">{userName}</div></div>
              <div><div className="co-ml">Items</div><div className="co-mv">{localStorage.getItem("totalitem") || 1} item(s)</div></div>
              <div><div className="co-ml">Delivery</div><div className="co-mv" style={{ color: "var(--sage-l)" }}>FREE</div></div>
            </div>
          </div>

          {/* PAYMENT CARD */}
          <div className="co-pay-card reveal">
            <div className="co-eye">Payment Method</div>
            <div className="co-ptitle">How would you like to pay?</div>

            <div className="co-tabs">
              {[
                { id: "upi", icon: "📲", label: "UPI Apps" },
                { id: "qr",  icon: "▣",  label: "QR Code" },
                { id: "card",icon: "💳", label: "Card/Bank" },
              ].map(t => (
                <button key={t.id} className={`co-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                  <span className="co-ti">{t.icon}</span>{t.label}
                </button>
              ))}
            </div>

            {/* ── UPI TAB ── */}
            {tab === "upi" && <>
              {/* Show saved address OR "add address" button */}
              <AddressSummary />
              <AddressBtn />

              <div className="co-upi-grid">
                {UPI_APPS.map(app => (
                  <button key={app.id} className={`co-upi-btn ${selApp === app.id ? "sel" : ""}`} onClick={() => setSelApp(app.id)}>
                    <div className="co-uico" style={{ background: app.bg }}>
                      <span style={app.labelStyle}>{app.label}</span>
                    </div>
                    <span className="co-unm">{app.name}</span>
                    <div className="co-tick">✓</div>
                  </button>
                ))}
              </div>

              {selectedAppObj && (
                <button
                  className="co-open-btn"
                  onClick={() => handleUpiApp(selectedAppObj)}
                  disabled={!savedAddress}
                  style={!savedAddress ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                  Open {selectedAppObj.name} → Pay ₹{amount.toLocaleString("en-IN")}
                  {!savedAddress && " (Address zaroori hai)"}
                </button>
              )}

              <div className="co-or">or enter UPI ID manually</div>
              <input
                className="co-input"
                placeholder="yourname@okaxis  /  9876543210@upi"
                value={customUpi}
                onChange={e => setCustomUpi(e.target.value)}
              />
              <div className="co-hint">Works with GPay, PhonePe, Paytm, BHIM & all UPI apps</div>
              {customUpi.includes("@") && (
                <button className="co-pay-btn" onClick={handleCustomUpi} style={{ marginTop: 12 }}>
                  💸 Pay ₹{amount.toLocaleString("en-IN")} via UPI ID
                </button>
              )}
            </>}

            {/* ── QR TAB ── */}
            {tab === "qr" && (
              <div className="co-qr-wrap">
                <div className="co-qr-eye">Scan & Pay</div>
                <div className="co-qr-title">Any UPI App, Instantly</div>
                <div className="co-qr-sub">Open any UPI app → Scan → Pay in seconds</div>

                <AddressSummary />
                <AddressBtn style={{ marginBottom: 16 }} />

                <div className="co-qr-apps">
                  {[
                    { label: "G",  style: { background: "linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 900 }, bg: "#e8f0fe", name: "GPay" },
                    { label: "Pe", style: { color: "#5f259f", fontWeight: 900 }, bg: "#f3e8ff", name: "PhonePe" },
                    { label: "PT", style: { color: "#00BAF2", fontWeight: 900 }, bg: "#e0f7fe", name: "Paytm" },
                    { label: "B",  style: { color: "#e84141", fontWeight: 900 }, bg: "#fee2e2", name: "BHIM" },
                  ].map((a, i) => (
                    <div className="co-qr-app" key={i}>
                      <div className="co-qr-app-icon" style={{ background: a.bg }}>
                        <span style={a.style}>{a.label}</span>
                      </div>
                      <span>{a.name}</span>
                    </div>
                  ))}
                </div>

                <div className="co-qr-box">
                  <div className="co-qrc co-tl" /><div className="co-qrc co-tr" />
                  <div className="co-qrc co-bl" /><div className="co-qrc co-br" />
                  <UpiQR upiString={upiQr} size={200} />
                </div>
                <div className="co-qr-upi">
                  Pay to: <strong>{MERCHANT_UPI}</strong><br />
                  Amount: <strong>₹{amount.toLocaleString("en-IN")}</strong>
                </div>
                <div className="co-qr-steps">
                  {["Open GPay / PhonePe / Paytm / BHIM", "Tap 'Scan QR' or 'Pay by QR'", "Scan this QR code", "Amount auto-fills — Confirm payment", "Tap 'I have paid' button below"].map((s, i) => (
                    <div className="co-qr-step" key={i}>
                      <div className="co-qr-num">{i + 1}</div>
                      <span className="co-qr-text">{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="co-qr-confirm"
                  onClick={() => {
                    if (!savedAddress) { msg("📍 Pehle delivery address add karein!"); return; }
                    success("QR_" + Date.now());
                  }}
                >
                  ✅ I Have Paid — Confirm Order
                </button>
                <div className="co-qr-note">Click only after completing payment in your UPI app</div>
              </div>
            )}

            {/* ── CARD TAB ── */}
            {tab === "card" && <>
              <AddressSummary />
              <AddressBtn style={{ marginBottom: 16 }} />

              {savedAddress && (
                <div style={{ fontSize: 11, color: "var(--dim)", textAlign: "center", marginBottom: 16 }}>
                  — ya seedha card se pay karein —
                </div>
              )}

              <div className="co-method-grid">
                {[
                  { icon: "💳", name: "Debit Card",   sub: "Visa • Mastercard • RuPay" },
                  { icon: "🏦", name: "Net Banking",  sub: "SBI • HDFC • ICICI • Axis" },
                  { icon: "🪙", name: "Credit Card",  sub: "All major cards accepted" },
                  { icon: "👛", name: "Wallets",      sub: "Paytm • Amazon Pay • Freecharge" },
                ].map((m, i) => (
                  <div className="co-mbox" key={i}>
                    <div className="co-micon">{m.icon}</div>
                    <div className="co-mname">{m.name}</div>
                    <div className="co-msub">{m.sub}</div>
                  </div>
                ))}
              </div>
              <button className="co-pay-btn" onClick={handleRazorpay} disabled={loading}>
                {loading ? "⏳ Opening payment window…" : `🔐 Pay ₹${amount.toLocaleString("en-IN")} Securely`}
              </button>
            </>}

            <div className="co-sec">
              {["🔒 256-bit SSL", "✅ RBI Approved", "🛡️ PCI DSS"].map((b, i) => (
                <span className="co-badge" key={i}>{b}</span>
              ))}
            </div>
            <div className="co-powered">Powered by <strong>Razorpay</strong> — India's #1 Payment Gateway</div>
          </div>

          <div className="co-trust-strip" style={{ borderRadius: "var(--radius)", marginBottom: 8 }}>
            {[
              { icon: "🚚", text: "Free Delivery on all orders" },
              { icon: "↩️", text: "Easy 7-day returns" },
              { icon: "💚", text: "Vet-approved products" },
              { icon: "📞", text: "24/7 Pet care support" },
            ].map((t, i) => (
              <div className="co-ti-item" key={i}><span>{t.icon}</span><span>{t.text}</span></div>
            ))}
          </div>

          <button className="co-back" onClick={() => navigate("/cart")}>← Back to Cart</button>
        </div>
        <div className={`co-toast ${showToast ? "show" : ""}`}>{toast}</div>
      </div>
    </>
  );
}