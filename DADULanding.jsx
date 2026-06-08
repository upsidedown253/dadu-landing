import { useState, useEffect, useRef } from "react";
import { Twitter, Instagram, Linkedin, Facebook, Phone, Mail, MapPin } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️  CONFIG — Edit this object to update the ENTIRE website
// ═══════════════════════════════════════════════════════════════════════════
const CONFIG = {
  competition: {
    name:          "DADU School Hackathon 2026",
    heroLine1:     "DADU School",
    heroLine2:     "Hackathon",                         // ← gradient text
    tagline:       "Where young coders come to hack, build, and change the world — organised by BITS Pilani Hyderabad Campus.",
    badgeText:     "Registrations Open",
    eventDate:     "July 15, 2026 09:00:00",            // ← countdown target
    location:      "BITS Pilani, Hyderabad Campus",
    email:         "hackathon@dadu.ac.in",
    phone:         "+91 40 xxxx 3000",
    prizePool:     "₹1,00,000",
    footerTagline: "Made with ❤️ for the next generation of builders.",
    org:           "DADU — Developer Association of BITS Pilani Hyderabad",
  },

  stats: [
    { num: "500+", label: "Expected Participants" },
    { num: "₹1L",  label: "Total Prize Pool"      },
    { num: "3",    label: "Problem Tracks"         },
    { num: "16+",  label: "Mentor Sessions"        },
  ],

  about: {
    quote: "We believe every young mind has the power to **build solutions** that matter. This hackathon is your launchpad.",
    desc:  "DADU Hackathon brings the most curious minds from Classes 6–12 for a 24-hour innovation challenge hosted at BITS Pilani Hyderabad Campus.",
    cards: [
      { title: "🏛️ About BITS Pilani Hyderabad", text: "A globally ranked institution known for research excellence, tech culture, and a vibrant startup ecosystem." },
      { title: "⚡ About DADU",                   text: "BPHC's premier developer club — building products, running hackathons, and mentoring the next wave of developers." },
    ],
  },

  tracks: [
    { icon: "🌍", name: "Social Impact",   desc: "Build tech for good — tackle real problems in education, healthcare, or community development." },
    { icon: "🤖", name: "AI & Innovation", desc: "Create AI-powered tools that simplify everyday tasks and open new possibilities for people."    },
    { icon: "♻️", name: "Sustainability",  desc: "Design technology that promotes sustainable living and contributes to a greener planet."         },
  ],

  timeline: [
    { icon: "🚀", date: "June 10",  label: "Registrations Open",    desc: "Sign up your team and choose your track."                  },
    { icon: "📅", date: "June 30",  label: "Registrations Close",   desc: "Last date to register — don't miss out!"                  },
    { icon: "📄", date: "July 10",  label: "Problem Statements",    desc: "Detailed challenge statements released for each track."    },
    { icon: "🔨", date: "July 15",  label: "Hackathon Day 1",       desc: "Build, iterate, and get feedback from mentors."            },
    { icon: "🏆", date: "July 16",  label: "Presentations & Results", desc: "Final pitches, judging, and winner announcements!"      },
  ],

  prizes: [
    { icon: "🥈", place: "2nd Place", amount: "₹30,000", perks: ["Trophy", "Amazon Gift Vouchers", "Certificate of Excellence"] },
    { icon: "🥇", place: "1st Place", amount: "₹50,000", perks: ["Grand Trophy", "Internship Opportunity", "Mentorship by BPHC Alumni"] },
    { icon: "🥉", place: "3rd Place", amount: "₹20,000", perks: ["Trophy", "Swag Kit", "Certificate of Merit"] },
  ],

  testimonials: [
    { quote: "Participating in DADU Hackathon was life-changing. I had never coded before, but I left with a working app and a whole new passion.", name: "Ananya Sharma", school: "Delhi Public School, Hyderabad", year: "2025 Participant" },
    { quote: "The mentors were incredibly supportive. They pushed us beyond our limits — we built something we're genuinely proud of.",             name: "Rohan Mehta",   school: "Oakridge International School",     year: "2025 Winner"      },
    { quote: "Coming from Class 7, I was so nervous. The pre-event workshop gave me everything I needed. Best weekend of my life!",                name: "Priya Krishnan", school: "Meridian School, Hyderabad",        year: "2025 Participant" },
  ],

  team: [
    { name: "Arjun Rao",   role: "Event Lead",       dept: "Computer Science"    },
    { name: "Sneha Iyer",  role: "Design Lead",      dept: "Electronics & Comm." },
    { name: "Karan Patel", role: "Tech Lead",         dept: "Computer Science"    },
    { name: "Meera Nair",  role: "Outreach Head",    dept: "Economics"           },
    { name: "Dev Sharma",  role: "Logistics Head",   dept: "Mechanical Eng."     },
    { name: "Tanvi Gupta", role: "Sponsorship Lead", dept: "Finance"             },
  ],

  faqs: [
    { q: "Who can participate?",             a: "Any student from Class 6th to 12th, regardless of coding background. Solo or teams of up to 3 members."         },
    { q: "Do I need coding experience?",     a: "No! We have tracks for all skill levels and run a free pre-event workshop the evening before."                   },
    { q: "Is there a registration fee?",     a: "Registration is completely free of charge for all participants."                                                  },
    { q: "What should I bring?",             a: "Your laptop, charger, and your ideas! Meals and accommodation will be provided on campus."                        },
    { q: "Will there be mentors available?", a: "Yes — BPHC students, alumni, and industry professionals will be available throughout the hackathon."             },
    { q: "Can I come from outside Hyderabad?", a: "Absolutely! Travel reimbursement is available for outstation finalists and winners."                          },
  ],

  footer: {
    nav:   ["Home", "About", "Tracks", "Timeline", "Gallery"],
    event: ["Register", "Prizes", "FAQ", "Team", "Testimonials"],
  },
};

// ─── Dark theme tokens ────────────────────────────────────────────────────────
const D = {
  bg:    "#04091A", bg2:   "#060D1F", card:  "#08102A",
  pri:   "#00D4AA", pdim:  "rgba(0,212,170,0.12)", pglow: "rgba(0,212,170,0.22)",
  gold:  "#FFB800", text:  "#E2EAF4", muted: "#6B7A99",
  bdr:   "rgba(255,255,255,0.07)", bdrH: "rgba(0,212,170,0.30)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const initials = name => name.split(" ").map(w => w[0]).join("").slice(0, 2);
const boldPrimary = t => t.replace(/\*\*(.*?)\*\*/g, `<em style="font-style:normal;color:${D.pri}">$1</em>`);

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}
const revealStyle = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(28px)",
  transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
});

// ─── Shared label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Syne',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.pri, marginBottom: 16 }}>
    <span style={{ display: "block", width: 24, height: 2, background: D.pri, borderRadius: 2 }} />
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "14px 0" : "20px 0", background: scrolled ? "rgba(4,9,26,.94)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${D.bdr}` : "none", transition: "all .3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.25rem", fontWeight: 800, color: D.text, textDecoration: "none" }}>
          DADU<span style={{ color: D.pri }}>.</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {["About", "Tracks", "Prizes", "Team", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ padding: "8px 16px", borderRadius: 100, fontSize: ".9rem", color: D.muted, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = D.text; e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = D.muted; e.currentTarget.style.background = "transparent"; }}>
              {l}
            </a>
          ))}
          <a href="#register" style={{ marginLeft: 8, padding: "11px 22px", borderRadius: 100, background: D.pri, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: ".85rem", textDecoration: "none", transition: "all .3s" }}>
            Register Free
          </a>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════
function Hero() {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [ref, vis] = useReveal();

  useEffect(() => {
    const tick = () => {
      const diff = new Date(CONFIG.competition.eventDate).getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: String(Math.floor(diff / 864e5)).padStart(2, "0"),
        h: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, "0"),
        m: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, "0"),
        s: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const CdBox = ({ v, l }) => (
    <div style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 78 }}>
      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, color: D.pri, display: "block", lineHeight: 1 }}>{v}</span>
      <span style={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".12em", color: D.muted, display: "block", marginTop: 4 }}>{l}</span>
    </div>
  );

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 0 80px", background: "linear-gradient(180deg,#060D1F 0%,#04091A 100%)" }}>
      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.04)} }
        @keyframes blinkDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
      `}</style>
      {/* Background layers */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 65% 25%,rgba(0,212,170,.09) 0%,transparent 70%),radial-gradient(ellipse 55% 50% at 8% 85%,rgba(255,184,0,.07) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${D.bdr} 1px,transparent 1px),linear-gradient(90deg,${D.bdr} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", width: 420, height: 420, right: -80, top: -60, borderRadius: "50%", background: "rgba(0,212,170,.14)", filter: "blur(80px)", animation: "floatOrb 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 280, height: 280, left: "4%", bottom: "12%", borderRadius: "50%", background: "rgba(255,184,0,.10)", filter: "blur(80px)", animation: "floatOrb 8s ease-in-out infinite 4s" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={revealStyle(vis)}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.pdim, border: "1px solid rgba(0,212,170,.25)", borderRadius: 100, padding: "8px 16px", marginBottom: 28, fontSize: ".8rem", fontWeight: 500, color: D.pri }}>
            <span style={{ width: 7, height: 7, background: D.pri, borderRadius: "50%", display: "block", animation: "blinkDot 2s ease-in-out infinite" }} />
            {CONFIG.competition.badgeText}
          </div>
          {/* Headline */}
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem,8vw,6rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: D.text }}>
            {CONFIG.competition.heroLine1}<br />
            <span style={{ background: "linear-gradient(120deg,#00D4AA,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {CONFIG.competition.heroLine2}
            </span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: D.muted, marginBottom: 40, maxWidth: 520, lineHeight: 1.7 }}>{CONFIG.competition.tagline}</p>
          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
            <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 100, background: D.pri, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: ".9rem", textDecoration: "none" }}>Register for Free →</a>
            <a href="#about" style={{ display: "inline-flex", padding: "14px 28px", borderRadius: 100, border: `1.5px solid ${D.bdrH}`, color: D.text, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: ".9rem", textDecoration: "none" }}>Learn More</a>
          </div>
          {/* Countdown */}
          <div style={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".16em", color: D.muted, marginBottom: 12 }}>Event starts in</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <CdBox v={t.d} l="Days" /><Colon />
            <CdBox v={t.h} l="Hours" /><Colon />
            <CdBox v={t.m} l="Mins" /><Colon />
            <CdBox v={t.s} l="Secs" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Colon = () => <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: D.bdr, paddingBottom: 18 }}>:</span>;

// ═══════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════
function Stats() {
  return (
    <div style={{ padding: "40px 0", borderTop: `1px solid ${D.bdr}`, borderBottom: `1px solid ${D.bdr}`, background: D.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {CONFIG.stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: D.text, display: "block" }}>{s.num}</span>
            <div style={{ color: D.muted, fontSize: ".9rem", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════════════════
function About() {
  const [ref, vis] = useReveal();
  return (
    <section id="about" style={{ background: D.bg, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", ...revealStyle(vis) }}>
          <div>
            <SectionLabel>About the Event</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 16 }}>Built by students.<br />Designed for students.</h2>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 700, lineHeight: 1.45, color: D.text, margin: "24px 0" }}
              dangerouslySetInnerHTML={{ __html: `"${boldPrimary(CONFIG.about.quote)}"` }} />
            <p style={{ fontSize: "1.05rem", color: D.muted, lineHeight: 1.7 }}>{CONFIG.about.desc}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {CONFIG.about.cards.map((c, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 12, padding: "24px 28px", borderLeft: `3px solid ${D.pri}` }}>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, color: D.text, marginBottom: 8 }}>{c.title}</h4>
                <p style={{ fontSize: ".9rem", color: D.muted, lineHeight: 1.65 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRACKS
// ═══════════════════════════════════════════════════════════════════════════
function Tracks() {
  const [ref, vis] = useReveal();
  return (
    <section id="tracks" style={{ background: D.bg2, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionLabel>What You'll Build</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 8 }}>Choose your track</h2>
          <p style={{ fontSize: "1.05rem", color: D.muted, marginBottom: 56 }}>Three problem domains. Infinite possibilities.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {CONFIG.tracks.map((t, i) => <TrackCard key={i} t={t} delay={i * 100} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackCard({ t, delay }) {
  const [ref, vis] = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...revealStyle(vis, delay), background: D.card, border: `1px solid ${hov ? D.bdrH : D.bdr}`, borderRadius: 20, padding: "36px 32px", transform: `translateY(${vis ? (hov ? -6 : 0) : 28}px)`, transition: "all .3s ease" }}>
      <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 20 }}>{t.icon}</span>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.25rem", fontWeight: 700, color: D.text, marginBottom: 12 }}>{t.name}</h3>
      <p style={{ color: D.muted, fontSize: ".95rem", lineHeight: 1.7 }}>{t.desc}</p>
      <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: D.pri, fontSize: ".85rem", fontWeight: 600, marginTop: 20, textDecoration: "none" }}>Join this track →</a>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════
function Timeline() {
  const [ref, vis] = useReveal();
  return (
    <section id="timeline" style={{ background: D.bg, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ ...revealStyle(vis), textAlign: "center" }}>
          <SectionLabel>Important Dates</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 56 }}>Event Timeline</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640, margin: "0 auto" }}>
            {CONFIG.timeline.map((item, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 12, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, textAlign: "left", transition: "border-color .3s" }}>
                <span style={{ fontSize: "1.5rem", width: 44, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: D.pri }}>{item.date}</span>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: D.text, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: ".87rem", color: D.muted }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRIZES
// ═══════════════════════════════════════════════════════════════════════════
function Prizes() {
  const [ref, vis] = useReveal();
  const styles = [
    { background: D.card, border: `1px solid ${D.bdr}` },
    { background: "linear-gradient(135deg,#16243D,#0A1628)", border: "1px solid rgba(255,184,0,.40)", boxShadow: "0 20px 60px rgba(255,184,0,.10)" },
    { background: D.card, border: `1px solid ${D.bdr}` },
  ];
  return (
    <section id="prizes" style={{ background: D.bg2, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ ...revealStyle(vis), textAlign: "center" }}>
          <SectionLabel>Win Big</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 8 }}>Prize Pool</h2>
          <p style={{ color: D.muted, marginBottom: 60 }}>Over {CONFIG.competition.prizePool} in prizes up for grabs.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: 20, alignItems: "end" }}>
            {CONFIG.prizes.map((p, i) => (
              <div key={i} style={{ ...styles[i], borderRadius: 20, padding: "40px 28px", textAlign: "center", transition: "transform .3s" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: 16 }}>{p.icon}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: ".78rem", letterSpacing: ".15em", textTransform: "uppercase", color: D.muted, display: "block", marginBottom: 12 }}>{p.place}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: i === 1 ? D.gold : D.text, display: "block", marginBottom: 20 }}>{p.amount}</span>
                <ul style={{ listStyle: "none", textAlign: "left" }}>
                  {p.perks.map((pk, j) => (
                    <li key={j} style={{ fontSize: ".88rem", color: D.muted, padding: "8px 0", borderBottom: `1px solid ${D.bdr}`, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: D.pri, fontWeight: 700, fontSize: ".8rem" }}>✓</span>{pk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════
function Testimonials() {
  const [ref, vis] = useReveal();
  return (
    <section id="testimonials" style={{ background: D.bg, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionLabel>What They Say</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 56 }}>Voices from the Community</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {CONFIG.testimonials.map((t, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 20, padding: 32, position: "relative" }}>
                <span style={{ fontSize: "4rem", color: D.pdim, lineHeight: 1, fontFamily: "Georgia,serif", position: "absolute", top: 18, right: 22 }}>"</span>
                <p style={{ fontSize: ".93rem", lineHeight: 1.75, color: D.text, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: D.pdim, border: `2px solid ${D.bdrH}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".88rem", color: D.pri, flexShrink: 0 }}>{initials(t.name)}</div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: ".93rem", display: "block", color: D.text }}>{t.name}</span>
                    <span style={{ fontSize: ".78rem", color: D.muted }}>{t.school}</span>
                  </div>
                  <span style={{ fontSize: ".68rem", fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: ".1em", color: D.pri, background: D.pdim, padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>{t.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════════════════
function Team() {
  const [ref, vis] = useReveal();
  return (
    <section id="team" style={{ background: D.bg2, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionLabel>The Organisers</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 8 }}>Meet the Team</h2>
          <p style={{ color: D.muted, marginBottom: 56 }}>Passionate students from BITS Pilani Hyderabad making this happen.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {CONFIG.team.map((m, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 12, padding: 24, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: D.pdim, border: "1.5px solid rgba(0,212,170,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: D.pri }}>{initials(m.name)}</div>
                <div>
                  <span style={{ fontWeight: 700, fontSize: ".93rem", display: "block", color: D.text, marginBottom: 2 }}>{m.name}</span>
                  <span style={{ fontSize: ".83rem", color: D.pri, display: "block", marginBottom: 2 }}>{m.role}</span>
                  <span style={{ fontSize: ".75rem", color: D.muted }}>{m.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════
function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section id="faq" style={{ background: D.bg, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionLabel>Got Questions?</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 56 }}>Frequently Asked</h2>
          <div style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: 12 }}>
            {CONFIG.faqs.map((f, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${open === i ? "rgba(0,212,170,.28)" : D.bdr}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border-color .3s" }} onClick={() => setOpen(open === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", gap: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: ".95rem", color: D.text }}>{f.q}</span>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: open === i ? D.pri : D.pdim, display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? "#04091A" : D.pri, fontSize: "1.1rem", transform: open === i ? "rotate(45deg)" : "none", transition: "all .3s", flexShrink: 0 }}>+</span>
                </div>
                {open === i && <div style={{ padding: "0 24px 20px", color: D.muted, fontSize: ".92rem", lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════════════════════════════════════════
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [ref, vis] = useReveal();
  const inp = { background: "#04091A", border: `1.5px solid ${D.bdr}`, borderRadius: 10, padding: "12px 16px", color: D.text, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", width: "100%", outline: "none" };

  return (
    <section id="register" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%,rgba(0,212,170,.055) 0%,transparent 70%),${D.bg}`, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80 }}>
          <div style={revealStyle(vis)}>
            <SectionLabel>Join the Event</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: D.text, marginBottom: 16 }}>Register your team</h2>
            <p style={{ color: D.muted, marginBottom: 32, lineHeight: 1.7 }}>Free to enter. Open to Class 6–12. Teams of 1–3.</p>
            {["100% free registration", "Meals & accommodation provided", "Mentors from BPHC & industry", "Certificate for all participants", "Pre-event coding workshop included"].map(c => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 12, color: D.muted, fontSize: ".9rem", marginBottom: 14 }}>
                <span style={{ color: D.pri, fontSize: "1.1rem" }}>✓</span>{c}
              </div>
            ))}
          </div>
          <div style={{ ...revealStyle(vis, 150), background: D.card, border: `1px solid ${D.bdr}`, borderRadius: 20, padding: 40 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 700, color: D.text, marginBottom: 24 }}>Application Form</h3>
            {!submitted ? (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[{ label: "Team Name", ph: "Team Innovators" }, { label: "Team Lead Name", ph: "Your full name" }, { label: "Email Address", ph: "you@school.com", type: "email" }, { label: "School Name", ph: "Delhi Public School" }].map(f => (
                    <label key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontSize: ".82rem", fontWeight: 600, color: D.text, fontFamily: "'Syne',sans-serif" }}>{f.label}</span>
                      <input type={f.type || "text"} placeholder={f.ph} style={inp} required />
                    </label>
                  ))}
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: ".82rem", fontWeight: 600, color: D.text, fontFamily: "'Syne',sans-serif" }}>Grade</span>
                    <select style={inp} required>
                      <option value="">Select grade</option>
                      {["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: ".82rem", fontWeight: 600, color: D.text, fontFamily: "'Syne',sans-serif" }}>Track</span>
                    <select style={inp} required>
                      <option value="">Select a track</option>
                      {CONFIG.tracks.map(t => <option key={t.name}>{t.icon} {t.name}</option>)}
                    </select>
                  </label>
                  <label style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: ".82rem", fontWeight: 600, color: D.text, fontFamily: "'Syne',sans-serif" }}>Project Idea</span>
                    <textarea placeholder="Briefly describe the problem you want to solve..." style={{ ...inp, minHeight: 100, resize: "vertical" }} required />
                  </label>
                </div>
                <button type="submit" style={{ marginTop: 20, width: "100%", padding: 16, borderRadius: 100, background: D.pri, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "1rem", border: "none", cursor: "pointer" }}>
                  Submit Application →
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", background: D.pdim, border: `1px solid ${D.bdrH}`, borderRadius: 12, color: D.pri, fontWeight: 600, fontSize: "1.05rem" }}>
                🎉 Application received! Check your inbox for a confirmation email.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER  ← styled to match the reference image
// ═══════════════════════════════════════════════════════════════════════════

function SocialIcon({ Icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button aria-label={label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(30,60,100,0.18)", background: hov ? "rgba(30,60,100,0.10)" : "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s ease" }}>
      <Icon size={16} color="#3a5a80" strokeWidth={1.75} />
    </button>
  );
}

function FooterLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontSize: ".9rem", color: hov ? "#1a3050" : "#5a7090", textDecoration: "none", transition: "color .2s", display: "block", marginBottom: 12 }}>
      {children}
    </a>
  );
}

function ContactRow({ Icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(30,60,100,0.09)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} color="#3a5a80" strokeWidth={1.75} />
      </div>
      <span style={{ fontSize: ".88rem", color: "#5a7090" }}>{text}</span>
    </div>
  );
}

function Footer() {
  const colHead = { fontFamily: "'Syne',sans-serif", fontSize: ".8rem", fontWeight: 700, color: "#1a2e4a", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 20, display: "block" };

  return (
    <footer style={{
      background: "linear-gradient(160deg,#c5d5e4 0%,#d5e4f0 30%,#e2edf8 65%,#edf5fc 100%)",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* ── Main content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr 1.5fr", gap: 56, paddingBottom: 48 }}>

          {/* Brand column */}
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.55rem", fontWeight: 800, color: "#1a2e4a", marginBottom: 14, letterSpacing: "-.01em" }}>
              DADU<span style={{ color: "#2872a8" }}>.</span>
            </div>
            <p style={{ fontSize: ".9rem", color: "#5a7090", lineHeight: 1.72, marginBottom: 26, maxWidth: 240 }}>
              DADU is the developer association of BITS Pilani Hyderabad, organising hackathons and workshops to inspire the next generation of builders.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <SocialIcon Icon={Twitter}   label="X / Twitter" />
              <SocialIcon Icon={Instagram} label="Instagram"   />
              <SocialIcon Icon={Linkedin}  label="LinkedIn"    />
              <SocialIcon Icon={Facebook}  label="Facebook"    />
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <span style={colHead}>Navigation</span>
            {CONFIG.footer.nav.map(l => <FooterLink key={l} href={`#${l.toLowerCase()}`}>{l}</FooterLink>)}
          </div>

          {/* Event column */}
          <div>
            <span style={colHead}>Event</span>
            {CONFIG.footer.event.map(l => <FooterLink key={l} href={`#${l.toLowerCase()}`}>{l}</FooterLink>)}
          </div>

          {/* Contact column */}
          <div>
            <span style={colHead}>Contact Information</span>
            <ContactRow Icon={Phone}  text={CONFIG.competition.phone}    />
            <ContactRow Icon={Mail}   text={CONFIG.competition.email}    />
            <ContactRow Icon={MapPin} text={CONFIG.competition.location} />
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ borderTop: "1px solid rgba(30,60,100,0.14)" }} />

        {/* ── Bottom bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: ".85rem", color: "#7090a8" }}>{CONFIG.competition.footerTagline}</span>
          <span style={{ fontSize: ".85rem", color: "#7090a8" }}>© 2026 DADU. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP  (default export — drop this into your Next.js pages/index.js)
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    // Inject Google Fonts
    if (!document.getElementById("gf")) {
      const l = document.createElement("link");
      l.id = "gf"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin = "0";
    document.body.style.background = "#04091A";
    document.title = CONFIG.competition.name;
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Testimonials />
      <Team />
      <FAQ />
      <Register />
      <Footer />
    </div>
  );
}
