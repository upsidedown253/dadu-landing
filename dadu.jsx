import { useState, useEffect, useRef } from "react";
import { Twitter, Instagram, Linkedin, Facebook, Phone, Mail, MapPin, Code, Cpu, Globe, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️  CONFIG — Edit this object to update the ENTIRE website
// ═══════════════════════════════════════════════════════════════════════════
const CONFIG = {
  competition: {
    name:          "DADU School Hackathon 2026",
    heroLine1:     "DADU School",
    heroLine2:     "Hackathon",                         // ← gradient text
    tagline:       "Where young coders come to hack, build, and change the world — organised by BITS Pilani Hyderabad Campus.",
    badgeText:     "Registrations Open for 2026",
    eventDate:     "July 15, 2026 09:00:00",            // ← countdown target
    location:      "BITS Pilani, Hyderabad Campus",
    email:         "hackathon@dadu.ac.in",
    phone:         "+91 40 6630 3000",
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
    { icon: <Globe size={26} />, name: "Social Impact",   desc: "Build tech for good — tackle real problems in education, healthcare, or community development." },
    { icon: <Cpu size={26} />, name: "AI & Innovation", desc: "Create AI-powered tools that simplify everyday tasks and open new possibilities for people."    },
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
  bg:    "#04091A", bg2:   "#060D1F", card:  "rgba(13, 23, 53, 0.65)",
  pri:   "#00D4AA", pdim:  "rgba(0,212,170,0.10)", pglow: "rgba(0,212,170,0.22)",
  gold:  "#FFB800", text:  "#E2EAF4", muted: "#8A99AD",
  bdr:   "rgba(255,255,255,0.08)", bdrH: "rgba(0,212,170,0.35)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const initials = name => name.split(" ").map(w => w[0]).join("").slice(0, 2);
const boldPrimary = t => t.replace(/\*\*(.*?)\*\*/g, `<em style="font-style:normal;color:${D.pri};text-shadow: 0 0 15px rgba(0,212,170,0.4)">$1</em>`);

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}
const revealStyle = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(40px)",
  transition: `opacity .9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform .9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
});

// ─── Shared label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: D.pri, marginBottom: 20 }}>
    <span style={{ display: "block", width: 30, height: 2, background: `linear-gradient(90deg, ${D.pri}, transparent)`, borderRadius: 2 }} />
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "12px 0" : "24px 0", background: scrolled ? "rgba(4,9,26,.82)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${D.bdr}` : "none", transition: "all .4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: D.text, textDecoration: "none", letterSpacing: "-0.5px" }}>
          DADU<span style={{ color: D.pri, textShadow: `0 0 10px ${D.pri}` }}>.</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {["About", "Tracks", "Prizes", "Team", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ padding: "8px 16px", borderRadius: 100, fontSize: ".9rem", fontWeight: 500, color: D.muted, textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = D.text; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = D.muted; e.currentTarget.style.background = "transparent"; }}>
              {l}
            </a>
          ))}
          <a href="#register" style={{ marginLeft: 12, padding: "10px 24px", borderRadius: 100, background: `linear-gradient(135deg, ${D.pri} 0%, #00a887 100%)`, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem", textDecoration: "none", boxShadow: `0 4px 20px rgba(0, 212, 170, 0.25)`, transition: "all .3s ease" }}
             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
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
    <div style={{ background: "rgba(8, 16, 42, 0.6)", border: `1px solid ${D.bdr}`, backdropFilter: "blur(10px)", borderRadius: 14, padding: "16px 22px", textAlign: "center", minWidth: 80, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: D.pri, display: "block", lineHeight: 1, textShadow: "0 0 12px rgba(0,212,170,0.3)" }}>{v}</span>
      <span style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: D.muted, display: "block", marginTop: 6 }}>{l}</span>
    </div>
  );

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "140px 0 100px", background: "#040817" }}>
      {/* Dynamic Animated Grid Mesh */}
      <div className="scrolling-grid" style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${D.bdr} 1px,transparent 1px),linear-gradient(90deg,${D.bdr} 1px,transparent 1px)`, backgroundSize: "50px 50px", opacity: 0.65 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, transparent 20%, #040817 80%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 20%,rgba(0,212,170,.12) 0%,transparent 70%)" }} />
      
      {/* Kinetic Blurred Neon Orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, right: "-10%", top: "-10%", borderRadius: "50%", background: "rgba(0,212,170,.15)", filter: "blur(110px)", animation: "floatOrb 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, left: "-5%", bottom: "5%", borderRadius: "50%", background: "rgba(255,184,0,.08)", filter: "blur(100px)", animation: "floatOrb 10s ease-in-out infinite 5s" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", ...revealStyle(vis) }}>
          
          {/* Left Text content */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,.3)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "8px 18px", marginBottom: 28, fontSize: ".82rem", fontWeight: 600, color: D.pri, letterSpacing: "0.5px" }}>
              <span style={{ width: 8, height: 8, background: D.pri, borderRadius: "50%", display: "block", boxShadow: `0 0 10px ${D.pri}`, animation: "blinkDot 2s ease-in-out infinite" }} />
              {CONFIG.competition.badgeText}
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: D.text, letterSpacing: "-1px" }}>
              {CONFIG.competition.heroLine1}<br />
              <span className="shimmer-text" style={{ background: "linear-gradient(90deg, #00D4AA, #FFB800, #00D4AA)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
                {CONFIG.competition.heroLine2}
              </span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: D.muted, marginBottom: 40, maxWidth: 540, lineHeight: 1.75, fontWeight: 400 }}>{CONFIG.competition.tagline}</p>
            
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
              <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", borderRadius: 100, background: D.pri, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", textDecoration: "none", boxShadow: "0 10px 25px rgba(0, 212, 170, 0.25)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                Register for Free <ArrowRight size={16} />
              </a>
              <a href="#about" style={{ display: "inline-flex", padding: "15px 32px", borderRadius: 100, border: `1.5px solid ${D.bdrH}`, color: D.text, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", textDecoration: "none", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(5px)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background="rgba(0,212,170,0.05)"} onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.02)"}>
                Learn More
              </a>
            </div>
            
            <div style={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".18em", fontWeight: 700, color: D.pri, marginBottom: 16 }}>⚡ Event Countdown</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <CdBox v={t.d} l="Days" /><Colon />
              <CdBox v={t.h} l="Hours" /><Colon />
              <CdBox v={t.m} l="Mins" /><Colon />
              <CdBox v={t.s} l="Secs" />
            </div>
          </div>

          {/* Right Visual Dashboard Mockup Card */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }} className="floating-element">
            <div style={{ position: "absolute", inset: "-15px", background: "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
            <div style={{ width: "100%", maxWidth: 460, background: "rgba(10, 20, 50, 0.55)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", borderRadius: 24, padding: 24, boxShadow: "0 30px 60px rgba(0,0,0,0.4)", zIndex: 1, overflow: "hidden" }}>
              {/* Mockup window header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: "#EF4444", borderRadius: "50%" }} />
                  <span style={{ width: 10, height: 10, background: "#F59E0B", borderRadius: "50%" }} />
                  <span style={{ width: 10, height: 10, background: "#10B981", borderRadius: "50%" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: D.muted }}>dadu_workspace.jsx</span>
              </div>
              {/* Code visual block */}
              <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#A5B4FC", lineHeight: 1.6 }}>
                <p style={{ color: "#F43F5E" }}><span style={{ color: "#38BDF8" }}>import</span> {'{ Build, Innovate }'} <span style={{ color: "#38BDF8" }}>from</span> <span style={{ color: "#34D399" }}>"dadu-2026"</span>;</p>
                <p style={{ color: "#9333EA", marginTop: 8 }}><span style={{ color: "#F472B6" }}>const</span> <span style={{ color: "#FB923C" }}>Hackathon</span> = () =&gt; {'{'}</p>
                <p style={{ paddingLeft: 16 }}><span style={{ color: "#38BDF8" }}>const</span> energy = Infinity;</p>
                <p style={{ paddingLeft: 16 }}><span style={{ color: "#38BDF8" }}>const</span> prizePool = <span style={{ color: "#FBBF24" }}>"₹1,00,000"</span>;</p>
                <p style={{ paddingLeft: 16, color: "#34D399" }}>// Classes 6 to 12 ready to build</p>
                <p style={{ paddingLeft: 16 }}><span style={{ color: "#F472B6" }}>return</span> {'<InnovationTrack statements={true} />;'}</p>
                <p style={{ color: "#9333EA" }}>{'};'}</p>
              </div>
              {/* Curated Abstract Image Overlay */}
              <div style={{ marginTop: 24, borderRadius: 14, overflow: "hidden", height: 190, position: "relative", border: "1px solid rgba(255,255,255,0.05)" }}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" alt="Tech workspace neon graphic" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) contrast(1.1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,9,26,0.9), transparent)" }} />
                <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                  <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: D.pri, background: "rgba(0,0,0,0.4)", padding: "4px 8px", borderRadius: 4, backdropFilter: "blur(4px)" }}>Venue Spark</span>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: D.text, marginTop: 4 }}>BITS Pilani Hyderabad Campus</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const Colon = () => <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "rgba(255,255,255,0.15)", paddingBottom: 18 }}>:</span>;

// ═══════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════
function Stats() {
  return (
    <div style={{ padding: "50px 0", borderTop: `1px solid ${D.bdr}`, borderBottom: `1px solid ${D.bdr}`, background: "#050B1E", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {CONFIG.stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }} className="stat-card">
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", fontWeight: 800, color: D.text, display: "block", background: "linear-gradient(180deg, #fff 0%, #a5b4fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</span>
            <div style={{ color: D.muted, fontSize: ".95rem", fontWeight: 500, marginTop: 6, letterSpacing: "0.3px" }}>{s.label}</div>
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
    <section id="about" style={{ background: D.bg, padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "center", ...revealStyle(vis) }}>
          <div>
            <SectionLabel>About the Event</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 20, lineHeight: 1.15, letterSpacing: "-0.5px" }}>Built by students.<br />Designed for students.</h2>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.2rem,2vw,1.5rem)", fontWeight: 700, lineHeight: 1.4, color: D.text, margin: "28px 0" }}
              dangerouslySetInnerHTML={{ __html: `"${boldPrimary(CONFIG.about.quote)}"` }} />
            <p style={{ fontSize: "1.05rem", color: D.muted, lineHeight: 1.75 }}>{CONFIG.about.desc}</p>
            
            {/* Added Modern Image Composition for Contextual Enrichment */}
            <div style={{ marginTop: 32, borderRadius: 16, overflow: "hidden", height: 200, border: `1px solid ${D.bdr}` }}>
              <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" alt="Collaborative Hackathon ecosystem" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CONFIG.about.cards.map((c, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, backdropFilter: "blur(12px)", borderRadius: 16, padding: "28px 32px", borderLeft: `4px solid ${D.pri}`, transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                   className="about-card"
                   onMouseEnter={e => e.currentTarget.style.transform = "translateX(6px)"}
                   onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: D.text, marginBottom: 10 }}>{c.title}</h4>
                <p style={{ fontSize: ".95rem", color: D.muted, lineHeight: 1.7 }}>{c.text}</p>
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
    <section id="tracks" style={{ background: D.bg2, padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <div style={{ textAlign: "center" }}>
            <SectionLabel>What You'll Build</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 12, letterSpacing: "-0.5px" }}>Choose your track</h2>
            <p style={{ fontSize: "1.1rem", color: D.muted, marginBottom: 60 }}>Three problem domains. Infinite possibilities.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {CONFIG.tracks.map((t, i) => <TrackCard key={i} t={t} delay={i * 120} />)}
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
      style={{ ...revealStyle(vis, delay), background: D.card, border: `1px solid ${hov ? D.bdrH : D.bdr}`, backdropFilter: "blur(12px)", borderRadius: 24, padding: "40px 36px", transform: `translateY(${vis ? (hov ? -8 : 0) : 40}px)`, boxShadow: hov ? `0 20px 40px rgba(0, 212, 170, 0.12)` : "0 10px 30px rgba(0,0,0,0.15)", transition: "all .4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <span style={{ fontSize: "2.5rem", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, background: "rgba(0,212,170,0.08)", borderRadius: 16, color: D.pri, marginBottom: 24, border: "1px solid rgba(0,212,170,0.15)" }}>{t.icon}</span>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 700, color: D.text, marginBottom: 14 }}>{t.name}</h3>
      <p style={{ color: D.muted, fontSize: ".98rem", lineHeight: 1.7, marginBottom: 24 }}>{t.desc}</p>
      <a href="#register" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: D.pri, fontSize: ".9rem", fontWeight: 700, textDecoration: "none", transition: "gap 0.2s" }} onMouseEnter={e => e.currentTarget.style.gap = '10px'} onMouseLeave={e => e.currentTarget.style.gap = '6px'}>Join this track <ArrowRight size={14} /></a>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════
function Timeline() {
  const [ref, vis] = useReveal();
  return (
    <section id="timeline" style={{ background: D.bg, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ ...revealStyle(vis), textAlign: "center" }}>
          <SectionLabel>Important Dates</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 64, letterSpacing: "-0.5px" }}>Event Timeline</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680, margin: "0 auto", position: "relative" }}>
            {/* Elegant connection line */}
            <div style={{ position: "absolute", left: 50, top: 30, bottom: 30, width: 2, background: `linear-gradient(180deg, ${D.pri} 0%, rgba(0,212,170,0.1) 100%)`, zIndex: 0 }} />
            
            {CONFIG.timeline.map((item, i) => (
              <div key={i} style={{ background: "rgba(8, 16, 42, 0.45)", border: `1px solid ${D.bdr}`, backdropFilter: "blur(10px)", borderRadius: 16, padding: "24px 32px", display: "flex", alignItems: "center", gap: 24, textAlign: "left", position: "relative", zIndex: 1, transition: "all .3s" }} className="timeline-item">
                <span style={{ fontSize: "1.5rem", width: 48, height: 48, background: "rgba(4,9,26,0.8)", border: `1px solid ${D.bdr}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>{item.icon}</span>
                <div>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: D.pri }}>{item.date}</span>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: D.text, marginTop: 2, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: ".92rem", color: D.muted, lineHeight: 1.6 }}>{item.desc}</div>
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
    { background: D.card, border: `1px solid ${D.bdr}`, order: 1 },
    { background: "rgba(16, 36, 61, 0.75)", border: "1px solid rgba(255,184,0,.45)", boxShadow: "0 25px 55px rgba(255,184,0,.12)", transform: "scale(1.04) translateY(-10px)", order: 0 },
    { background: D.card, border: `1px solid ${D.bdr}`, order: 2 },
  ];
  return (
    <section id="prizes" style={{ background: D.bg2, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ ...revealStyle(vis), textAlign: "center" }}>
          <SectionLabel>Win Big</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 8, letterSpacing: "-0.5px" }}>Prize Pool</h2>
          <p style={{ color: D.muted, fontSize: "1.05rem", marginBottom: 64 }}>Over {CONFIG.competition.prizePool} in rewards & corporate perks up for grabs.</p>
          
          <div className="prizes-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 28, alignItems: "center", maxWidth: 1040, margin: "0 auto" }}>
            {CONFIG.prizes.map((p, i) => {
              // Realignment fix for standard array visual stack sequence (2nd, 1st, 3rd)
              const dynamicIndex = i === 1 ? 0 : i === 0 ? 1 : 2;
              const cardData = CONFIG.prizes[dynamicIndex];
              const cardStyle = styles[dynamicIndex];
              
              return (
                <div key={dynamicIndex} style={{ ...cardStyle, backdropFilter: "blur(12px)", borderRadius: 24, padding: "48px 32px", textAlign: "center", transition: "all .3s" }} className="prize-card">
                  <span style={{ fontSize: "3.5rem", display: "block", marginBottom: 16, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))" }}>{cardData.icon}</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: D.muted, display: "block", marginBottom: 12 }}>{cardData.place}</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: dynamicIndex === 1 ? D.gold : D.text, display: "block", marginBottom: 24, textShadow: dynamicIndex === 1 ? "0 0 20px rgba(255,184,0,0.2)" : "none" }}>{cardData.amount}</span>
                  <ul style={{ listStyle: "none", textAlign: "left", padding: 0, margin: 0 }}>
                    {cardData.perks.map((pk, j) => (
                      <li key={j} style={{ fontSize: ".92rem", color: D.muted, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: D.pri, fontWeight: 800, fontSize: "1rem" }}>✓</span>{pk}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
    <section id="testimonials" style={{ background: D.bg, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <SectionLabel>What They Say</SectionLabel>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 60, letterSpacing: "-0.5px" }}>Voices from the Community</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {CONFIG.testimonials.map((t, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, backdropFilter: "blur(12px)", borderRadius: 24, padding: 36, position: "relative", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: "5rem", color: "rgba(0,212,170,0.06)", lineHeight: 1, fontFamily: "Georgia,serif", position: "absolute", top: 12, right: 24, userSelect: "none" }}>"</span>
                <p style={{ fontSize: ".96rem", lineHeight: 1.8, color: D.text, marginBottom: 32, fontStyle: "italic", position: "relative", zIndex: 1 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(0,212,170,0.12)", border: `1px solid ${D.bdrH}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", color: D.pri, flexShrink: 0 }}>{initials(t.name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: ".95rem", display: "block", color: D.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</span>
                    <span style={{ fontSize: ".8rem", color: D.muted, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{t.school}</span>
                  </div>
                </div>
                <span style={{ position: "absolute", bottom: 36, right: 36, fontSize: ".68rem", fontFamily: "'Syne',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: D.pri, background: "rgba(0,212,170,0.08)", padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(0,212,170,0.15)" }}>{t.year}</span>
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
    <section id="team" style={{ background: D.bg2, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <div style={{ textAlign: "center" }}>
            <SectionLabel>The Organisers</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 12, letterSpacing: "-0.5px" }}>Meet the Team</h2>
            <p style={{ color: D.muted, fontSize: "1.05rem", marginBottom: 60 }}>Passionate student builders from BITS Pilani Hyderabad making this ecosystem happen.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {CONFIG.team.map((m, i) => (
              <div key={i} style={{ background: D.card, border: `1px solid ${D.bdr}`, backdropFilter: "blur(12px)", borderRadius: 18, padding: 24, display: "flex", alignItems: "center", gap: 18, transition: "border-color 0.3s" }} className="team-card">
                <div style={{ width: 54, height: 54, borderRadius: 16, flexShrink: 0, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.15rem", color: D.pri }}>{initials(m.name)}</div>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "1rem", display: "block", color: D.text, marginBottom: 2 }}>{m.name}</span>
                  <span style={{ fontSize: ".85rem", fontWeight: 600, color: D.pri, display: "block", marginBottom: 2 }}>{m.role}</span>
                  <span style={{ fontSize: ".78rem", color: D.muted }}>{m.dept}</span>
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
    <section id="faq" style={{ background: D.bg, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={revealStyle(vis)}>
          <div style={{ textAlign: "center" }}>
            <SectionLabel>Got Questions?</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 60, letterSpacing: "-0.5px" }}>Frequently Asked</h2>
          </div>
          <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {CONFIG.faqs.map((f, i) => (
              <div key={i} style={{ background: "rgba(8, 16, 42, 0.45)", border: `1px solid ${open === i ? "rgba(0,212,170,.35)" : D.bdr}`, backdropFilter: "blur(10px)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all .3s cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => setOpen(open === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px", gap: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: "1.02rem", color: D.text }}>{f.q}</span>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: open === i ? D.pri : "rgba(0,212,170,0.08)", border: open === i ? "none" : `1px solid ${D.bdrH}`, display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? "#04091A" : D.pri, fontSize: "1.2rem", transform: open === i ? "rotate(45deg)" : "none", transition: "all .3s cubic-bezier(0.16, 1, 0.3, 1)", flexShrink: 0 }}>+</span>
                </div>
                <div style={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0, overflow: "hidden", transition: "all .3s ease", padding: open === i ? "0 28px 22px" : "0 28px 0" }}>
                  <div style={{ color: D.muted, fontSize: ".96rem", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14 }}>{f.a}</div>
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
// REGISTER
// ═══════════════════════════════════════════════════════════════════════════
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [ref, vis] = useReveal();
  const inp = { background: "#030714", border: `1.5px solid ${D.bdr}`, borderRadius: 12, padding: "14px 18px", color: D.text, fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", width: "100%", outline: "none", transition: "border-color 0.2s" };

  return (
    <section id="register" style={{ background: `radial-gradient(circle at 50% 50%, rgba(0,212,170,.07) 0%, transparent 65%), ${D.bg}`, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }}>
          <div style={revealStyle(vis)}>
            <SectionLabel>Join the Event</SectionLabel>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800, color: D.text, marginBottom: 20, letterSpacing: "-0.5px" }}>Register your team</h2>
            <p style={{ color: D.muted, fontSize: "1.05rem", marginBottom: 36, lineHeight: 1.75 }}>Free to enter. Open to global school explorers from Class 6–12. Teams of 1–3 builders.</p>
            {["100% free registration & toolkits", "Free onboarding meals & accommodation", "Direct mentorship from BPHC tech leads", "Global verified certificate recognition", "Complete zero-to-one coding workshop"].map(c => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 14, color: D.text, fontSize: ".95rem", marginBottom: 16, fontWeight: 500 }}>
                <span style={{ color: D.pri, fontSize: "1.2rem", display: "inline-flex", background: "rgba(0,212,170,0.08)", width: 24, height: 24, borderRadius: "50%", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,212,170,0.15)" }}>✓</span>{c}
              </div>
            ))}
          </div>
          
          <div style={{ ...revealStyle(vis, 150), background: "rgba(10, 20, 50, 0.45)", border: `1px solid ${D.bdr}`, backdropFilter: "blur(16px)", borderRadius: 28, padding: "48px 40px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: D.text, marginBottom: 28 }}>Application Portal</h3>
            {!submitted ? (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {[{ label: "Team Name", ph: "Team Innovators" }, { label: "Team Lead Name", ph: "Your full name" }, { label: "Email Address", ph: "you@school.com", type: "email" }, { label: "School Name", ph: "Delhi Public School" }].map(f => (
                    <label key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <span style={{ fontSize: ".85rem", fontWeight: 700, color: D.text, fontFamily: "'Syne',sans-serif" }}>{f.label}</span>
                      <input type={f.type || "text"} placeholder={f.ph} style={inp} required onFocus={e => e.currentTarget.style.borderColor=D.pri} onBlur={e => e.currentTarget.style.borderColor=D.bdr} />
                    </label>
                  ))}
                  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontSize: ".85rem", fontWeight: 700, color: D.text, fontFamily: "'Syne',sans-serif" }}>Grade</span>
                    <select style={inp} required onFocus={e => e.currentTarget.style.borderColor=D.pri} onBlur={e => e.currentTarget.style.borderColor=D.bdr}>
                      <option value="">Select grade</option>
                      {["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map(g => <option key={g} style={{background: "#08102A"}}>{g}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontSize: ".85rem", fontWeight: 700, color: D.text, fontFamily: "'Syne',sans-serif" }}>Track</span>
                    <select style={inp} required onFocus={e => e.currentTarget.style.borderColor=D.pri} onBlur={e => e.currentTarget.style.borderColor=D.bdr}>
                      <option value="">Select a track</option>
                      {CONFIG.tracks.map(t => <option key={t.name} style={{background: "#08102A"}}>{t.name}</option>)}
                    </select>
                  </label>
                  <label style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontSize: ".85rem", fontWeight: 700, color: D.text, fontFamily: "'Syne',sans-serif" }}>Project Vision Idea</span>
                    <textarea placeholder="Briefly describe the product or problem space you want to solve..." style={{ ...inp, minHeight: 110, resize: "vertical" }} required onFocus={e => e.currentTarget.style.borderColor=D.pri} onBlur={e => e.currentTarget.style.borderColor=D.bdr} />
                  </label>
                </div>
                <button type="submit" style={{ marginTop: 28, width: "100%", padding: "16px", borderRadius: 100, background: D.pri, color: "#04091A", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(0, 212, 170, 0.2)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                  Submit Application Entry →
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 24px", background: "rgba(0,212,170,0.06)", border: `1px solid ${D.pri}`, borderRadius: 16, color: D.text, fontWeight: 600, fontSize: "1.1rem", animation: "blinkDot 2s ease-in-out" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 12 }}>🎉</span>
                <span style={{ color: D.pri, fontWeight: 700 }}>Application Successfully Received!</span>
                <p style={{ fontSize: "0.9rem", color: D.muted, marginTop: 8, fontWeight: 400 }}>Check your dashboard inbox for verification coordinates and setup guides.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER  
// ═══════════════════════════════════════════════════════════════════════════
function SocialIcon({ Icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button aria-label={label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: hov ? D.pri : "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .3s" }}>
      <Icon size={16} color={hov ? "#04091A" : D.text} strokeWidth={2} />
    </button>
  );
}

function FooterLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontSize: ".95rem", color: hov ? D.pri : D.muted, textDecoration: "none", transition: "color .2s", display: "block", marginBottom: 12 }}>
      {children}
    </a>
  );
}

function ContactRow({ Icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} color={D.pri} strokeWidth={2} />
      </div>
      <span style={{ fontSize: ".92rem", color: D.muted }}>{text}</span>
    </div>
  );
}

function Footer() {
  const colHead = { fontFamily: "'Syne',sans-serif", fontSize: ".85rem", fontWeight: 700, color: D.text, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 24, display: "block" };

  return (
    <footer style={{
      background: "#030714",
      borderTop: `1px solid ${D.bdr}`,
      fontFamily: "'DM Sans',sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1.4fr", gap: 48, paddingBottom: 56 }}>

          {/* Brand column */}
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: D.text, marginBottom: 16, letterSpacing: "-0.5px" }}>
              DADU<span style={{ color: D.pri }}>.</span>
            </div>
            <p style={{ fontSize: ".95rem", color: D.muted, lineHeight: 1.75, marginBottom: 28, maxWidth: 260 }}>
              DADU is the developer association of BITS Pilani Hyderabad, organising cutting-edge hackathons to build the next generation of builders.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
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
            <span style={colHead}>Contact Workspace</span>
            <ContactRow Icon={Phone}  text={CONFIG.competition.phone}    />
            <ContactRow Icon={Mail}   text={CONFIG.competition.email}    />
            <ContactRow Icon={MapPin} text={CONFIG.competition.location} />
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${D.bdr}` }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 0", flexWrap: "wrap", gap: 14 }}>
          <span style={{ fontSize: ".9rem", color: D.muted }}>{CONFIG.competition.footerTagline}</span>
          <span style={{ fontSize: ".9rem", color: D.muted }}>© 2026 DADU. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP MAIN WRAPPER & INJECTED EFFECTS
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    // Inject Google Fonts & Global Keyframe Animations
    if (!document.getElementById("gf")) {
      const l = document.createElement("link");
      l.id = "gf"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap";
      document.head.appendChild(l);
    }
    
    if (!document.getElementById("global-styles")) {
      const s = document.createElement("style");
      s.id = "global-styles";
      s.innerHTML = `
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #04091A; color: #E2EAF4; overflow-x: hidden; }
        
        @keyframes floatOrb { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(-35px) scale(1.06); } 
        }
        @keyframes blinkDot { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: .4; transform: scale(1.3); } 
        }
        @keyframes scrollBg {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .scrolling-grid {
          animation: scrollBg 8s linear infinite;
        }
        .shimmer-text {
          animation: shimmer 4s ease infinite;
        }
        .floating-element {
          animation: floatOrb 7s ease-in-out infinite alternate;
        }
        
        /* Modern Hover Interactions */
        .track-card:hover, .about-card:hover, .timeline-item:hover, .team-card:hover {
          border-color: rgba(0, 212, 170, 0.4) !important;
          background: rgba(13, 23, 53, 0.85) !important;
        }
      `;
      document.head.appendChild(s);
    }
    document.title = CONFIG.competition.name;
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", overflow: "hidden" }}>
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