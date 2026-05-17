import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nev';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const uid = localStorage.getItem("id", 0);
  const uname = localStorage.getItem("uname") || "Customer";
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("islogin")) {
      navigate('/login');
      return;
    }
    fetchOrders();

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost/Petshop/showorder.php?uid=' + uid);
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + parseInt(o.amount || 0), 0);

  return (
    <div className="orders-page">
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

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 10px; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes slideL   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin     { to{transform:rotate(360deg)} }

        .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity:1; transform:none; }

        .orders-page {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Outfit', sans-serif;
          color: var(--text);
        }

        /* Hero Banner */
        .orders-hero {
          background: linear-gradient(160deg, #1e3a28, #2a5a3c, #1a4030);
          padding: 60px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .orders-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1400&q=30') center/cover;
          opacity: 0.08;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(90,148,112,0.25), transparent 70%);
          animation: floatY 6s ease-in-out infinite;
        }
        .hero-orb-1 { width:400px; height:400px; top:-100px; right:-80px; animation-delay:0s; }
        .hero-orb-2 { width:250px; height:250px; bottom:-60px; left:10%; animation-delay:2s; }

        .hero-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
          animation: fadeUp 0.7s ease both;
        }

        .label-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-l);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .label-tag::before {
          content: '';
          width: 24px;
          height: 2px;
          background: var(--gold-l);
          border-radius: 2px;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .hero-title span { color: var(--gold-l); font-style: italic; }
        .hero-subtitle {
          color: rgba(255,255,255,0.65);
          font-size: 0.95rem;
          font-weight: 400;
        }

        .hero-actions {
          margin-top: 28px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-sage {
          padding: 12px 28px;
          background: var(--sage-l);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          box-shadow: 0 4px 16px rgba(61,107,79,0.35);
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .btn-sage:hover { background: var(--sage); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(61,107,79,0.4); }

        .btn-glass {
          padding: 12px 28px;
          background: rgba(255,255,255,0.12);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }
        .btn-glass:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }

        /* Main Content */
        .orders-main {
          max-width: 900px;
          margin: -36px auto 60px;
          padding: 0 20px;
          position: relative;
          z-index: 3;
        }

        /* Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 22px 20px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease;
          animation: fadeUp 0.5s ease both;
        }
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); border-color: rgba(61,107,79,0.3); }

        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          background: var(--sage-xs);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 22px;
        }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--sage-d);
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
          margin-top: 2px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        /* Orders Table Card */
        .orders-card {
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .orders-card-header {
          padding: 20px 28px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--ivory);
        }
        .orders-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text);
        }
        .orders-count-badge {
          background: var(--sage-xs);
          color: var(--sage);
          border: 1px solid var(--border);
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .table-header {
          display: grid;
          grid-template-columns: 0.5fr 1.8fr 1fr 1fr 1.1fr;
          padding: 12px 28px;
          background: var(--bg2);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
        }

        .table-row {
          display: grid;
          grid-template-columns: 0.5fr 1.8fr 1fr 1fr 1.1fr;
          padding: 16px 28px;
          border-bottom: 1px solid var(--border);
          align-items: center;
          transition: background 0.2s ease;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background: var(--sage-xs); }

        .order-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--sage);
        }
        .order-id-main {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text);
          font-family: 'Outfit', monospace;
        }
        .order-id-sub {
          font-size: 0.72rem;
          color: var(--dim);
          margin-top: 2px;
          font-family: monospace;
        }

        .items-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--sage-xs);
          color: var(--sage);
          border: 1px solid var(--border);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .amount-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--sage-d);
        }

        .status-delivered {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f0fff4;
          color: #276749;
          border: 1px solid #9ae6b4;
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-dot {
          width: 6px; height: 6px;
          background: #38a169;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* Shimmer Loading */
        .shimmer-row {
          height: 62px;
          margin: 0;
          background: linear-gradient(90deg, var(--bg) 25%, var(--bg2) 50%, var(--bg) 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite;
          border-bottom: 1px solid var(--border);
        }

        /* Empty State */
        .empty-state {
          padding: 72px 20px;
          text-align: center;
        }
        .empty-img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: block;
          opacity: 0.7;
          border: 3px solid var(--border);
        }
        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .empty-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 24px; }

        /* Back Link */
        .back-link {
          display: block;
          text-align: center;
          margin-top: 20px;
          color: var(--muted);
          font-size: 0.85rem;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Outfit', sans-serif;
          text-decoration: underline;
          width: 100%;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--sage); }

        /* Divider */
        .ornament-divider {
          text-align: center;
          color: var(--gold);
          font-size: 1.1rem;
          letter-spacing: 6px;
          margin: 28px 0;
          opacity: 0.5;
        }

        @media (max-width: 680px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .table-header, .table-row {
            grid-template-columns: 0.4fr 1.4fr 0.8fr 0.9fr;
          }
          .table-header span:nth-child(5),
          .table-row > div:nth-child(5) { display: none; }
          .hero-title { font-size: 2rem; }
        }
      `}</style>

      <Nav />

      {/* Hero */}
      <div className="orders-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-inner">
          <div className="label-tag">Petology — Order History</div>
          <h1 className="hero-title">
            Namaste, <span>{uname}</span>
          </h1>
          <p className="hero-subtitle">Apne saare orders ka poora hisaab yahan milega</p>
          <div className="hero-actions">
            <button className="btn-sage" onClick={() => navigate('/product')}>+ Naya Order Karein</button>
            <button className="btn-glass" onClick={() => navigate('/')}>← Home</button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="orders-main">

        {/* Stats */}
        {!isLoading && (
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon-wrap">🛒</div>
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap">💰</div>
              <div className="stat-value">₹{totalSpent.toLocaleString()}</div>
              <div className="stat-label">Total Spent</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap">✅</div>
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        )}

        <div className="ornament-divider">✦ ✦ ✦</div>

        {/* Orders Table */}
        <div className="orders-card reveal">
          <div className="orders-card-header">
            <span className="orders-card-title">Order History</span>
            {!isLoading && <span className="orders-count-badge">{orders.length} Orders</span>}
          </div>

          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="shimmer-row" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80"
                alt="sad puppy"
                className="empty-img"
              />
              <h3 className="empty-title">Abhi tak koi order nahi!</h3>
              <p className="empty-sub">Apne pyaare pet ke liye kuch khaas order karein</p>
              <button className="btn-sage" onClick={() => navigate('/product')} style={{ padding: '13px 36px' }}>
                Products Dekhein
              </button>
            </div>
          ) : (
            <>
              <div className="table-header">
                <span>#</span>
                <span>Order ID</span>
                <span>Items</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {orders.map((order, index) => (
                <div key={order.oid} className="table-row">
                  <div className="order-num">#{index + 1}</div>
                  <div>
                    <div className="order-id-main">{order.order_id || order.oid}</div>
                    <div className="order-id-sub">Order #{order.oid}</div>
                  </div>
                  <div>
                    <span className="items-badge">🐾 {order.totalitem} items</span>
                  </div>
                  <div className="amount-val">₹{parseInt(order.amount).toLocaleString()}</div>
                  <div>
                    <span className="status-delivered">
                      <span className="status-dot" />
                      Delivered
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <button className="back-link" onClick={() => navigate('/')}>← Home pe wapas jaayein</button>
      </div>
    </div>
  );
};

export default MyOrders;