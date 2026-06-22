'use client';

import { useEffect, useState } from 'react';
import './styles.css';
import ContactForm from './contact-form';

// Progressive (gradient) blur — stacked backdrop-filter layers, each masked to a
// band, so blur is strongest at the top and fades to zero at the bottom edge.
function HeaderBlur({ layers = 6, intensity = 2 }) {
  const seg = 1 / (layers + 1);
  return (
    <div className="topbar-blur" aria-hidden="true">
      {Array.from({ length: layers }).map((_, i) => {
        const stops = [i * seg, (i + 1) * seg, (i + 2) * seg, (i + 3) * seg]
          .map((pos, pi) => `rgba(0,0,0,${pi === 1 || pi === 2 ? 1 : 0}) ${pos * 100}%`)
          .join(', ');
        // 0deg => 0% is at the bottom, 100% at the top, so higher-blur layers sit up top
        const gradient = `linear-gradient(0deg, ${stops})`;
        const blur = `blur(${i * intensity}px)`;
        return (
          <div
            key={i}
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: blur,
              WebkitBackdropFilter: blur,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  // ROI calculator state
  const [leads, setLeads] = useState(300);
  const [commission, setCommission] = useState(9000);

  // Conservative, clearly-labelled estimate logic
  const recoveredLeads = Math.round(leads * 0.5); // the slow / after-hours leads now answered
  const extraShowings = Math.round(recoveredLeads * 0.2); // ~20% booked to a showing
  const extraDealsYr = Math.round(extraShowings * 0.1 * 12); // ~10% close, annualised
  const recoveredRevenue = extraDealsYr * commission;
  const fmt = (n) => n.toLocaleString('en-US');

  useEffect(() => {
    // Reveal animations
    const revEls = Array.from(document.querySelectorAll('.rev'));
    function snap(el) {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
    function revealNow(el) {
      if (el.dataset.shown) return;
      el.dataset.shown = '1';
      const sibs = Array.from(el.parentElement.querySelectorAll(':scope > .rev'));
      const idx = Math.max(0, sibs.indexOf(el));
      const delay = Math.min(idx * 70, 320);
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in');
      setTimeout(() => {
        snap(el);
      }, 1150 + delay);
    }
    function inView(el) {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || document.documentElement.clientHeight) * 0.95 && r.bottom > 0;
    }
    function sweep() {
      revEls.forEach((el) => {
        if (inView(el)) revealNow(el);
      });
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (en.isIntersecting) {
              revealNow(en.target);
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
      );
      revEls.forEach((el) => io.observe(el));
      sweep();
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('resize', sweep, { passive: true });
      setTimeout(() => {
        revEls.forEach(revealNow);
      }, 1800);
    } else {
      revEls.forEach(snap);
    }

    // Count up animation
    const counters = Array.from(document.querySelectorAll('[data-count]'));
    function countUp(el) {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const small = el.querySelector('small');
      const start = performance.now();
      const dur = 1400;
      function setVal(v) {
        if (small) {
          el.firstChild.nodeValue = v;
        } else {
          el.textContent = v + suffix;
        }
      }
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      setTimeout(() => {
        setVal(target);
      }, dur + 300);
    }
    function startCounter(el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      countUp(el);
    }
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (en.isIntersecting) {
              startCounter(en.target);
              cio.unobserve(en.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((c) => cio.observe(c));
      setTimeout(() => {
        counters.forEach(startCounter);
      }, 1300);
    } else {
      counters.forEach(startCounter);
    }

    // Sparkline
    const spark = document.getElementById('spark');
    if (spark) {
      const vals = [38, 44, 41, 52, 49, 61, 58, 67, 64, 73, 78, 71, 84, 92];
      spark.innerHTML = vals.map((v, i) => `<i style="height:${v}%;animation-delay:${i * 55}ms"></i>`).join('');
      setTimeout(() => {
        Array.from(spark.children).forEach((b) => {
          b.style.animation = 'none';
          b.style.transform = 'none';
        });
      }, 1700);
    }

    // Process stepper
    const steps = [
      {
        stage: 'Phase 01',
        name: 'Discover',
        big: '01',
        desc: 'We map your lead sources, your sales process, and your CRM — and pinpoint exactly where AI wins you the most deals fastest.',
        detail: ['Lead source audit', 'Sales process mapping', 'CRM review', 'ROI projection'],
      },
      {
        stage: 'Phase 02',
        name: 'Design',
        big: '02',
        desc: 'We script the conversations, define the qualifying logic, and map every workflow around your CRM, portals, and calendars.',
        detail: ['Conversation design', 'Qualifying logic', 'CRM & portal mapping', 'Integration plan'],
      },
      {
        stage: 'Phase 03',
        name: 'Build',
        big: '03',
        desc: 'We build the AI, connect it to your stack, and test it against real lead scenarios until it responds like your best agent.',
        detail: ['AI agent build', 'CRM & calendar sync', 'Channel setup', 'Live testing'],
      },
      {
        stage: 'Phase 04',
        name: 'Launch & tune',
        big: '04',
        desc: 'We go live, train your team, and tune the system weekly from real conversations — so it keeps getting better and booking more.',
        detail: ['Team training', 'Live monitoring', 'Weekly tuning', 'Performance reporting'],
      },
    ];
    const panel = document.getElementById('procPanel');
    const btns = document.querySelectorAll('.proc-step');
    function render(i) {
      const s = steps[i];
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(8px)';
      setTimeout(() => {
        panel.innerHTML =
          `<div class="pstage">${s.stage}</div><h3 class="serif">${s.name}</h3><p class="pdesc">${s.desc}</p><div class="proc-detail">` +
          s.detail.map((d) => `<span>${d}</span>`).join('') +
          `</div><div class="pbig">${s.big}</div>`;
        panel.style.transition = 'opacity .45s var(--ease), transform .45s var(--ease)';
        panel.style.opacity = '1';
        panel.style.transform = 'none';
      }, 150);
    }
    let userTouched = false;
    let autoStep = 0;
    let autoTimer = null;
    btns.forEach((b) => {
      b.addEventListener('click', function () {
        userTouched = true;
        btns.forEach((x) => {
          x.classList.remove('active');
        });
        b.classList.add('active');
        render(+b.dataset.step);
      });
    });
    if ('IntersectionObserver' in window) {
      const pio = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (en.isIntersecting && !autoTimer) {
              autoTimer = setInterval(() => {
                if (userTouched) {
                  clearInterval(autoTimer);
                  return;
                }
                autoStep = (autoStep + 1) % steps.length;
                btns.forEach((x) => {
                  x.classList.remove('active');
                });
                btns[autoStep].classList.add('active');
                render(autoStep);
              }, 3600);
            }
          });
        },
        { threshold: 0.4 }
      );
      if (document.getElementById('procSteps')) {
        pio.observe(document.getElementById('procSteps'));
      }
    }
  }, []);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="announce">
        <span className="announce-dot"></span>
        <span>Live — Motkan answers every lead in under 30 seconds, 24/7</span>
        <a href="#contact" className="announce-link">
          Book a call <span className="arr">→</span>
        </a>
      </div>

      {/* TOPBAR */}
      <header className="topbar">
        <HeaderBlur layers={6} intensity={2} />
        <div className="topbar-inner">
          <a className="logo" href="#top">
            Motkan<span className="dot"></span>
          </a>
          <nav className="nav">
            <a href="#what">What we build</a>
            <a href="#flagship">Flagship systems</a>
            <a href="#usecases">Use cases</a>
            <a href="#pricing">Packages</a>
            <a href="#process">Process</a>
          </nav>
          <div className="nav-cta">
            <a className="btn ghost" href="#pricing">
              See packages
            </a>
            <a className="btn primary" href="#contact">
              Book a call <span className="arr">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <div className="eyerow rev">
              <span className="badge-pill">
                <span className="badge-spark"></span>AI systems for real estate
              </span>
            </div>
            <h1 className="display hero-headline rev">
              Close more deals. <em>Chase fewer leads.</em>
            </h1>
            <p className="hero-sub rev">
              Motkan builds custom AI systems that answer, qualify, and nurture every lead in seconds — then book the
              showing straight into your agent's calendar. 24/7, across every channel. Your team stops chasing and
              starts closing.
            </p>
            <div className="hero-cta rev">
              <a className="btn primary lg" href="#contact">
                Book a strategy call <span className="arr">→</span>
              </a>
              <a className="btn ghost lg" href="#flagship">
                See what we build
              </a>
            </div>
            <div className="hero-stats rev">
              <div className="st">
                <span className="v" data-count="30" data-suffix="s">
                  0s
                </span>
                <span className="k">Avg lead response</span>
              </div>
              <div className="st">
                <span className="v" data-count="3" data-suffix="×">
                  0×
                </span>
                <span className="k">More showings booked</span>
              </div>
              <div className="st">
                <span className="v" data-count="100" data-suffix="%">
                  0%
                </span>
                <span className="k">Of leads followed up</span>
              </div>
            </div>
          </div>
          <div className="hero-art-wrap rev">
            {/* floating lead cards */}
            <div className="float-card fc-lead">
              <span className="fc-tag hot">Hot lead</span>
              <div className="fc-name">Sarah Johnson · Qualified</div>
              <div className="fc-meta">Luxury Condo · $2.4M · High intent</div>
            </div>
            <div className="float-card fc-stat">
              <div className="fc-stat-v">42%</div>
              <div className="fc-stat-k">Booked to showing</div>
            </div>
            <div className="float-card fc-lang">
              <span className="fc-globe">🌐</span>90+ languages
            </div>
            <div className="engine">
              <div className="engine-bar">
                <span className="d"></span>
                <span className="d"></span>
                <span className="d"></span>
                <span className="t">Motkan · lead engine</span>
                <span className="live">
                  <span className="dot"></span>Live
                </span>
              </div>
              <div className="engine-body">
                <div className="engine-row">
                  <div className="estat">
                    <div className="k">Avg response</div>
                    <div className="v" data-count="28" data-suffix="">
                      0<small>s</small>
                    </div>
                  </div>
                  <div className="estat">
                    <div className="k">Showings / wk</div>
                    <div className="v" data-count="47" data-suffix="">
                      0
                    </div>
                  </div>
                </div>
                <div className="estat" style={{ marginBottom: '12px' }}>
                  <div className="k">Leads engaged — last 14 days</div>
                  <div className="spark" id="spark"></div>
                </div>
                <div className="chatline">
                  <div className="av">M</div>
                  <div className="bub">
                    Hi Sarah! Thanks for your interest in <b>142 Oak Ridge Dr</b>. Are you free for a tour Thursday at 5pm
                    or Saturday at 11am?
                  </div>
                </div>
                <div className="chatline me">
                  <div className="av">S</div>
                  <div className="bub">Saturday works great 🙏</div>
                </div>
                <div className="chatline">
                  <div className="av">M</div>
                  <div className="bub">
                    <span className="typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marq" aria-hidden="true">
        <div className="marq-inner">
          <span className="serif-it">Capture</span>
          <span className="sep">·</span>
          <span className="serif-it">Qualify</span>
          <span className="sep">·</span>
          <span className="serif-it">Nurture</span>
          <span className="sep">·</span>
          <span className="serif-it">Reactivate</span>
          <span className="sep">·</span>
          <span className="serif-it">Book showings</span>
          <span className="sep">·</span>
          <span className="serif-it">Close faster</span>
          <span className="sep">·</span>
          <span className="serif-it">Capture</span>
          <span className="sep">·</span>
          <span className="serif-it">Qualify</span>
          <span className="sep">·</span>
          <span className="serif-it">Nurture</span>
          <span className="sep">·</span>
          <span className="serif-it">Reactivate</span>
          <span className="sep">·</span>
          <span className="serif-it">Book showings</span>
          <span className="sep">·</span>
          <span className="serif-it">Close faster</span>
          <span className="sep">·</span>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="section">
        <div className="container problem-grid">
          <div className="problem-statement rev">
            Most leads don't go cold.
            <br />
            <em>They go to whoever answers first.</em>
          </div>
          <div className="problem-side rev">
            <p>
              The agent who replies first wins the deal — but yours are showing homes, sitting in closings, or asleep.
              So most inquiries wait hours, and the after-hours ones never get a real reply at all.
            </p>
            <p>
              Every slow response is a commission handed to a faster competitor — and a database full of leads you
              already paid for, going to waste.
            </p>
            <div className="arrowline">
              <span className="rule"></span>From missed inquiries → to booked showings
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="section" id="what">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">01 — What we build</div>
              <h2 className="display">
                One AI system that runs
                <br />
                your entire pipeline
              </h2>
            </div>
            <p className="right">
              We design, build, and integrate AI around your CRM, your portals, and your team — measured by one thing:
              the deals it helps you win.
            </p>
          </div>
          <div className="svc-grid">
            <article className="svc rev">
              <div className="top">
                <span className="num">01</span>
                <span className="tag">// speed-to-lead</span>
              </div>
              <h3 className="serif">Instant Lead Response</h3>
              <p>Reply to every inquiry in seconds, 24/7, across web, SMS, WhatsApp, email, and social — and qualify them on the spot.</p>
              <svg className="ico" viewBox="0 0 40 40" fill="none">
                <path d="M20 4v8M20 28v8M4 20h8M28 20h8" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </svg>
            </article>
            <article className="svc rev">
              <div className="top">
                <span className="num">02</span>
                <span className="tag">// nurture + reactivation</span>
              </div>
              <h3 className="serif">Follow-Up &amp; Reactivation</h3>
              <p>Nurture long-term leads automatically and re-open thousands of cold contacts in your CRM until they're ready to move.</p>
              <svg className="ico" viewBox="0 0 40 40" fill="none">
                <path d="M6 30c0-8 6-14 14-14s14 6 14 14" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="20" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" />
                <path d="M20 16v8" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" />
              </svg>
            </article>
            <article className="svc rev">
              <div className="top">
                <span className="num">03</span>
                <span className="tag">// booking</span>
              </div>
              <h3 className="serif">Showing Coordination</h3>
              <p>Qualify buyers and sellers, then book showings and appointments straight into your agents' calendars — with reminders that cut no-shows.</p>
              <svg className="ico" viewBox="0 0 40 40" fill="none">
                <rect x="7" y="9" width="26" height="24" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 16h26M14 5v6M26 5v6" stroke="currentColor" strokeWidth="1.4" />
                <path d="M15 24l3 3 6-6" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </article>
            <article className="svc rev">
              <div className="top">
                <span className="num">04</span>
                <span className="tag">// back-office</span>
              </div>
              <h3 className="serif">Listing &amp; Back-Office Ops</h3>
              <p>Generate MLS-ready listing copy and automate paperwork, transaction tracking, and admin — end to end.</p>
              <svg className="ico" viewBox="0 0 40 40" fill="none">
                <path d="M11 6h13l5 5v23H11z" stroke="currentColor" strokeWidth="1.4" />
                <path d="M24 6v5h5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M16 20h8M16 25h8M16 15h4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </article>
          </div>
        </div>
      </section>

      {/* FLAGSHIP OFFERS */}
      <section className="section" id="flagship">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">02 — Where most teams start</div>
              <h2 className="display">
                Two systems that pay
                <br />
                for themselves first
              </h2>
            </div>
            <p className="right">
              You don't have to automate everything on day one. Most teams start with one of these — because the ROI is
              fast, obvious, and easy to measure.
            </p>
          </div>
          <div className="offers">
            <article className="offer rev">
              <div className="offer-flag">Flagship 01 · Speed-to-lead</div>
              <h3 className="serif">The 30-second first reply</h3>
              <p className="offer-lede">
                The moment a lead hits your site, Zillow, or Facebook, Motkan replies — answers their questions,
                qualifies them, and books the tour. Before your competitor even sees the notification.
              </p>
              <ul className="checklist">
                <li>Replies in under 30 seconds, 24/7/365</li>
                <li>Works across web, SMS, WhatsApp, email &amp; social</li>
                <li>Qualifies budget, timeline &amp; pre-approval</li>
                <li>Books the showing into your agent's calendar</li>
              </ul>
              <div className="offer-foot">
                <span className="offer-metric">
                  <b>30s</b> first response
                </span>
                <a className="btn primary" href="#contact">
                  Get this system <span className="arr">→</span>
                </a>
              </div>
            </article>
            <article className="offer rev">
              <div className="offer-flag alt">Flagship 02 · Database reactivation</div>
              <h3 className="serif">Revenue from leads you already paid for</h3>
              <p className="offer-lede">
                You're sitting on thousands of cold leads and past clients. Motkan re-opens those conversations at
                scale, finds the ones ready to move now, and hands your agents warm, booked appointments.
              </p>
              <ul className="checklist">
                <li>Mines your existing CRM &amp; old lead lists</li>
                <li>Re-engages cold leads with natural conversation</li>
                <li>Surfaces who's ready to buy or sell now</li>
                <li>Turns sunk ad spend into booked deals</li>
              </ul>
              <div className="offer-foot">
                <span className="offer-metric">
                  <b>0</b> new ad spend
                </span>
                <a className="btn primary" href="#contact">
                  Reactivate my database <span className="arr">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section" id="outcomes">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">03 — Outcomes</div>
              <h2 className="display">
                Built to put more
                <br />
                deals on the board
              </h2>
            </div>
            <p className="right">Every system we ship is judged by one thing: the deals it helps your team win.</p>
          </div>
          <div className="out-grid">
            <ul className="out-list rev">
              <li>
                <span className="n">01</span>
                <div>
                  <b>Respond</b> to every lead in seconds, <em>day or night</em>
                </div>
              </li>
              <li>
                <span className="n">02</span>
                <div>
                  <b>Book</b> more showings without lifting a finger
                </div>
              </li>
              <li>
                <span className="n">03</span>
                <div>
                  <b>Revive</b> the cold leads you've <em>already paid for</em>
                </div>
              </li>
              <li>
                <span className="n">04</span>
                <div>
                  <b>Cut</b> hours of admin from every agent's week
                </div>
              </li>
              <li>
                <span className="n">05</span>
                <div>
                  <b>Run</b> a pipeline that works <em>while you sleep</em>
                </div>
              </li>
            </ul>
            <div className="rev">
              <div className="imgph" data-label="Property — replace with listing photo" style={{ aspectRatio: '4/3' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" id="usecases">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">04 — Use cases</div>
              <h2 className="display">
                Everywhere AI works across
                <br />
                your real estate business
              </h2>
            </div>
            <p className="right">Pick the wins that matter most right now — we build them around your stack and stack on more over time.</p>
          </div>
          <div className="uc-grid">
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M2 4h14v8H6l-4 3z" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">01</span>
                <span>Instant lead response</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M3 15V7l6-4 6 4v8M3 15h12M7 15v-4h4v4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">02</span>
                <span>Database reactivation</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M9 16s7-4 7-9a4 4 0 00-7-2 4 4 0 00-7 2c0 5 7 9 7 9z" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">03</span>
                <span>Long-term lead nurture</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M9 2l7 4v6l-7 4-7-4V6z" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">04</span>
                <span>Buyer &amp; seller qualification</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="3" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M3 7h12M7 3v6" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M9 11l1.5 1.5L13 10" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">05</span>
                <span>Showing &amp; appointment booking</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M4 2h7l3 3v11H4z" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M11 2v3h3M7 9h4M7 12h4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">06</span>
                <span>Listing description generation</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M2 14l4-5 3 3 5-7" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M13 4h2v2" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">07</span>
                <span>Lead scoring &amp; prioritization</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M2 7h14M6 11h6" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">08</span>
                <span>Market reports &amp; CMAs</span>
              </div>
            </div>
            <div className="uc rev">
              <div className="ucmark">
                <svg viewBox="0 0 18 18" fill="none">
                  <path d="M4 2h7l3 3v11H4z" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M11 2v3h3M9 11l1.5 1.5L13 9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="lbl">
                <span className="idx">09</span>
                <span>Transaction &amp; paperwork ops</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">05 — Process</div>
              <h2 className="display">
                From first call to a
                <br />
                working AI system
              </h2>
            </div>
            <p className="right">A focused engagement — most teams go live in weeks, not quarters.</p>
          </div>
          <div className="proc-wrap">
            <div className="proc-steps rev" id="procSteps">
              <button className="proc-step active" data-step="0">
                <span className="bar"></span>
                <span className="pnum">01</span>
                <span className="pname">Discover</span>
              </button>
              <button className="proc-step" data-step="1">
                <span className="bar"></span>
                <span className="pnum">02</span>
                <span className="pname">Design</span>
              </button>
              <button className="proc-step" data-step="2">
                <span className="bar"></span>
                <span className="pnum">03</span>
                <span className="pname">Build</span>
              </button>
              <button className="proc-step" data-step="3">
                <span className="bar"></span>
                <span className="pnum">04</span>
                <span className="pname">Launch &amp; tune</span>
              </button>
            </div>
            <div className="proc-panel rev" id="procPanel">
              <div className="pstage">Phase 01</div>
              <h3 className="serif">Discover</h3>
              <p className="pdesc">
                We map your lead sources, your sales process, and your CRM — and pinpoint exactly where AI wins you the
                most deals fastest.
              </p>
              <div className="proc-detail">
                <span>Lead source audit</span>
                <span>Sales process mapping</span>
                <span>CRM review</span>
                <span>ROI projection</span>
              </div>
              <div className="pbig">01</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section" id="roi">
        <div className="container">
          <div className="roi-head rev">
            <div className="eyebrow">Estimate your upside</div>
            <h2 className="display">
              How much revenue is
              <br />
              slipping through the cracks?
            </h2>
            <p>Drag the sliders to your numbers. This is a conservative estimate of what a faster, always-on pipeline recovers.</p>
          </div>
          <div className="roi-card rev">
            <div className="roi-inputs">
              <div className="roi-field">
                <div className="roi-field-top">
                  <label htmlFor="leads">Leads you get each month</label>
                  <span className="roi-field-val">{fmt(leads)}</span>
                </div>
                <input
                  id="leads"
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={leads}
                  onChange={(e) => setLeads(+e.target.value)}
                />
              </div>
              <div className="roi-field">
                <div className="roi-field-top">
                  <label htmlFor="commission">Average commission per deal</label>
                  <span className="roi-field-val">${fmt(commission)}</span>
                </div>
                <input
                  id="commission"
                  type="range"
                  min="3000"
                  max="30000"
                  step="1000"
                  value={commission}
                  onChange={(e) => setCommission(+e.target.value)}
                />
              </div>
            </div>
            <div className="roi-outputs">
              <div className="roi-out">
                <div className="roi-out-v">{fmt(recoveredLeads)}</div>
                <div className="roi-out-k">Leads/mo recovered</div>
              </div>
              <div className="roi-out">
                <div className="roi-out-v">{fmt(extraShowings)}</div>
                <div className="roi-out-k">Extra showings/mo</div>
              </div>
              <div className="roi-out">
                <div className="roi-out-v">{fmt(extraDealsYr)}</div>
                <div className="roi-out-k">Extra deals/yr</div>
              </div>
              <div className="roi-out featured">
                <div className="roi-out-v accent">${fmt(recoveredRevenue)}</div>
                <div className="roi-out-k">Est. recovered revenue/yr</div>
              </div>
            </div>
            <div className="roi-foot">
              <span className="roi-fine">Conservative estimate · your numbers will vary by market</span>
              <a className="btn primary" href="#contact">
                Get this for my team <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="section-head rev">
            <div className="lead-col">
              <div className="num">06 — Packages</div>
              <h2 className="display">
                Start where you are.
                <br />
                Scale when you're ready.
              </h2>
            </div>
            <p className="right">
              Every build is custom — but most teams start in one of three places. Book a call and we'll scope the
              right fit and the ROI before you commit to anything.
            </p>
          </div>
          <div className="tiers rev">
            <div className="tier">
              <div className="tier-name">Lead Responder</div>
              <div className="tier-for">Solo agents &amp; small teams</div>
              <p className="tier-desc">Never miss another inquiry. The fastest path to more booked showings.</p>
              <ul className="checklist">
                <li>Instant lead response, 24/7</li>
                <li>Buyer &amp; seller qualification</li>
                <li>Showing &amp; appointment booking</li>
                <li>One CRM &amp; calendar integration</li>
              </ul>
              <a className="btn ghost" href="#contact">
                Book a call <span className="arr">→</span>
              </a>
            </div>
            <div className="tier featured">
              <div className="tier-badge">Most popular</div>
              <div className="tier-name">Full Pipeline</div>
              <div className="tier-for">Growing teams</div>
              <p className="tier-desc">The complete lead-to-showing engine, plus reactivation of everything you've already paid for.</p>
              <ul className="checklist">
                <li>Everything in Lead Responder</li>
                <li>Database reactivation campaigns</li>
                <li>Long-term nurture &amp; lead scoring</li>
                <li>Listing description generation</li>
                <li>Multi-channel &amp; multi-agent routing</li>
              </ul>
              <a className="btn primary" href="#contact">
                Book a call <span className="arr">→</span>
              </a>
            </div>
            <div className="tier">
              <div className="tier-name">Brokerage OS</div>
              <div className="tier-for">Brokerages &amp; franchises</div>
              <p className="tier-desc">A pipeline that runs across every agent — with back-office automation and reporting.</p>
              <ul className="checklist">
                <li>Everything in Full Pipeline</li>
                <li>Transaction &amp; paperwork ops</li>
                <li>Market reports &amp; CMAs</li>
                <li>Team dashboards &amp; reporting</li>
                <li>Dedicated tuning &amp; support</li>
              </ul>
              <a className="btn ghost" href="#contact">
                Book a call <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container">
          <div className="eyerow rev">
            <span className="rule"></span>
            <span className="eyebrow">Why Motkan</span>
          </div>
          <p className="why-quote rev">
            We don't sell AI hype. We build <em>systems that close deals</em> — measured in response time, booked
            showings, and signed contracts.
          </p>
          <div className="why-grid rev">
            <div className="why-item">
              <div className="num">/ 01</div>
              <h3 className="serif">Built around your business</h3>
              <p>Every system is shaped to your market, your CRM, and the way your agents actually sell.</p>
            </div>
            <div className="why-item">
              <div className="num">/ 02</div>
              <h3 className="serif">Results over buzzwords</h3>
              <p>We optimize for response time, booked showings, and signed contracts — not novelty.</p>
            </div>
            <div className="why-item">
              <div className="num">/ 03</div>
              <h3 className="serif">Live in weeks, not quarters</h3>
              <p>A focused engagement that connects to your tools and goes live fast, then keeps improving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="cred">
        <div className="container">
          <div className="c rev">
            <div className="v" data-count="30" data-suffix="s">
              0s
            </div>
            <div className="k">Average lead response, around the clock</div>
          </div>
          <div className="c rev">
            <div className="v" data-count="3" data-suffix="×">
              0×
            </div>
            <div className="k">More showings booked per week</div>
          </div>
          <div className="c rev">
            <div className="v" data-count="100" data-suffix="%">
              0%
            </div>
            <div className="k">Of inbound leads followed up</div>
          </div>
          <div className="c rev">
            <div className="v">
              24<em>/</em>7
            </div>
            <div className="k">A pipeline that never clocks out</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="finalcta" id="contact">
        <div className="container">
          <div className="eyerow rev" style={{ justifyContent: 'center' }}>
            <span className="rule"></span>
            <span className="eyebrow">Get started</span>
            <span className="rule"></span>
          </div>
          <h2 className="display rev">
            Never let a lead
            <br />
            go <em>cold</em> again
          </h2>
          <p className="rev">
            Book a free strategy call. We'll map where AI can win you more showings and more deals — and show you the
            ROI before you commit to anything.
          </p>
          <div className="rev" style={{ marginTop: '40px' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="logo" href="#top">
                Motkan<span className="dot"></span>
              </a>
              <p className="fdesc">AI systems for real estate. We capture every lead, reactivate the cold ones, book more showings, and help your team close more deals.</p>
            </div>
            <div>
              <h4>Systems</h4>
              <ul>
                <li>
                  <a href="#what">Instant Lead Response</a>
                </li>
                <li>
                  <a href="#flagship">Database Reactivation</a>
                </li>
                <li>
                  <a href="#what">Follow-Up &amp; Nurture</a>
                </li>
                <li>
                  <a href="#what">Back-Office Ops</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#usecases">Use cases</a>
                </li>
                <li>
                  <a href="#pricing">Packages</a>
                </li>
                <li>
                  <a href="#process">Process</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href="#contact">Book a strategy call</a>
                </li>
                <li>
                  <a href="mailto:hello@motkan.ai">hello@motkan.ai</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Motkan — AI systems for real estate</span>
            <span>Capture · Reactivate · Close</span>
          </div>
        </div>
      </footer>
    </>
  );
}
