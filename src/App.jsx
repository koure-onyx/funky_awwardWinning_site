import { useState, useEffect, useRef } from "react";

// ── Tailwind config injected via CDN in index.html, here we just use class names ──

const NAV_LINKS = ["WORK", "ABOUT", "PROCESS", "STORY"];

const PROJECTS = [
  {
    id: 1,
    span: "md:col-span-8",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM_F2PtFkvKKny6-kJ1dspIchjjmZ-HmWb6OEgX3rq8tGfsI9LIBxff-Nj8NOpYnn-CRFEagBn3uzaSNqY91Zc3ND3HFVhjvgGl-4dAJCsndAXM6Ej2TqPI5T5FkSNeWu6CyBGBO7CKnlfqZPgOIbQf_QNTFsdCeKdv2qAE9nwUazCuZ6f8yuUZqaRvVJFwxAntDBk2kt_Kk7XToRJ7iOWGrWOQQJMGajW39D6Pseh_xR7NuwPV-WBcvN9fIYt3h8HO3DhBupZBNHo",
    tags: ["WEB3", "UX/UI"],
    title: "NEON_VOID",
    desc: "A decentralized visual engine for the Metaverse.",
    type: "large",
  },
  {
    id: 2,
    span: "md:col-span-4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADtxJ4hkQkQVOdp7bEl-M95bZgficcfWfcMziwOPD1WDS8dE4EvvTjNls39TJX85za_W2g3JP45q3BhJnltu0qOaLO5Rnogh4MRITIdn6egdhddk8a__ATfcFihJpv5R_Qm6MEm8DTBlORYuKWCORuy3ULTfYZH2KaUTizofcapfHo41NA9mD_3uUW4oTdVo6uJFaMDRigzgdrrjk8ik8ro5XIsNPQNoYpbNDtPL-aDkWgLs0iaJwuEoXhv1d-jSZU7h1io6Z2TLQ_",
    title: "PHANTOM BRANDING",
    desc: "Redefining visual identity for a phantom sneaker drop.",
    type: "sneaker",
  },
  {
    id: 3,
    span: "md:col-span-5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzmkCJtpIkFvTY0J-qZS0E2bm-1RS2CvnVbJkaSTsJTPRe0j1RObXWWQM7YRxv6in0Hf6WA2YWYmvhxqy7L5gWDLQgBJTWVJ2esH00mNysTTQ_Mg9d2u7o7XkBrKDcW9zQ76n5k6Y1ILTDS5Ms0ES-fEZV1fiVuXG2nPpFEQFrT5z2UAz-w-Q6t7ZmK6UXIUfMVqB18aQ9IfNreoBBC7biyTEe7oq1ytA70MsTa9XYOMC4QAwvDeLZUZB1ZIwbEuEvvVDshaAZjjRM",
    title: "GLITCH STUDIO",
    type: "glitch",
  },
  {
    id: 4,
    span: "md:col-span-7",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWc-IouYGijTOh5khByP98vZr91FNnHA29BVLScIeuzgtqfyJH-jpe2lJUraYHt9DlkbrBGBSGBLG44FFwPIlIZsaPUSFHbXRq4NMjvbf4uQWje876owH5lOODCxGtPl7F1hnzwBhY824PumhtG-7wMTJaPIZte1pJLwtHU4mug3GUVVr6iR_VP4Bqdx4DMJczGOu4woFxpf861spalDUN11ZTjbOhfcl0rGY3kvbZkZyC7Fhic8htSyMNsb5MNNXeR7BiAcz7plVa",
    title: "ACID_RAVE IDENTITY",
    desc: "Visual systems for a 48-hour illegal digital marathon.",
    label: "2024 DROP",
    type: "rave",
  },
];

const CAPABILITIES = [
  {
    icon: "terminal",
    title: "CHAOTIC\nCODING",
    desc: "Custom WebGL, Three.js, and React architectures that shouldn't work, but do.",
    bg: "bg-[#201f1f]",
    iconColor: "text-[#2ae500]",
    border: "border-white",
    shadow: "shadow-[8px_8px_0px_0px_#2ff801]",
    textColor: "text-white",
    descColor: "text-white/70",
  },
  {
    icon: "palette",
    title: "VIOLENT\nVISUALS",
    desc: "Branding that punches you in the face and then offers you a drink.",
    bg: "bg-[#2e31ff]",
    iconColor: "text-white",
    border: "border-white",
    shadow: "shadow-[8px_8px_0px_0px_#000]",
    textColor: "text-white",
    descColor: "text-white/80",
  },
  {
    icon: "camera",
    title: "OVERSATURATED\nCONTENT",
    desc: "Motion graphics and photography for a generation with a 2-second attention span.",
    bg: "bg-[#ffb1c4]",
    iconColor: "text-black",
    border: "border-black",
    shadow: "shadow-[8px_8px_0px_0px_#000]",
    textColor: "text-black",
    descColor: "text-black/70",
  },
  {
    icon: "campaign",
    title: "LOUD\nMARKETING",
    desc: "If they aren't talking about it, we didn't do our job right.",
    bg: "bg-[#2ff801]",
    iconColor: "text-black",
    border: "border-black",
    shadow: "shadow-[8px_8px_0px_0px_#000]",
    textColor: "text-black",
    descColor: "text-black/70",
  },
];

const RULES = [
  { num: "01", title: "TOTAL TRANSPARENCY", body: "We don't hide behind corporate jargon. We tell you if your idea sucks, and then we make it better." },
  { num: "02", title: "FRICTION BY DESIGN", body: "Smooth is boring. We create intentional visual hurdles that force the user to pay attention." },
  { num: "03", title: "DIGITAL FIRST, LAST, ALWAYS", body: "We were born in the browser. We die in the browser. Print is for people with too much wall space." },
];

const TICKER_ITEMS = [
  { text: "AWWWARDS SITE OF THE YEAR", icon: "star" },
  { text: "DIGITAL ANARCHY", icon: "skull" },
  { text: "NEO-BRUTALIST VIBES", icon: "token" },
  { text: "RADICAL EXPERIMENTATION", icon: "science" },
  { text: "AWWWARDS SITE OF THE YEAR", icon: "star" },
  { text: "DIGITAL ANARCHY", icon: "skull" },
];

// ── Contact Modal ──────────────────────────────────────────────────────────────
function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#131313] border-4 border-white shadow-[12px_12px_0px_0px_#2E31FF] max-w-md w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-black text-3xl hover:text-[#2ff801] transition-colors z-20"
        >
          ✕
        </button>
        {sent ? (
          <div className="text-center py-10 space-y-6">
            <div className="text-7xl">⚡</div>
            <h3 className="font-['Space_Grotesk'] font-black text-4xl text-[#2ff801] uppercase">MESSAGE SENT!</h3>
            <p className="text-white/80">We'll get back to you before the next rave drops.</p>
            <button onClick={onClose} className="bg-[#2E31FF] text-white px-8 py-3 border-4 border-white font-['Space_Grotesk'] font-black uppercase hover:bg-[#2ff801] hover:text-black transition-all">
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-['Space_Grotesk'] font-black text-3xl uppercase text-white mb-8">
              INITIATE <span className="text-[#2ff801]">CONTACT</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "name", label: "YOUR NAME *", type: "text", placeholder: "John Radical" },
                { key: "email", label: "EMAIL *", type: "email", placeholder: "you@radical.com" },
                { key: "budget", label: "PROJECT BUDGET", type: "text", placeholder: "$5k — $50k" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block font-['Space_Grotesk'] font-bold text-xs text-[#2ff801] mb-1">{label}</label>
                  <input
                    type={type}
                    required={key !== "budget"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#201f1f] border-2 border-white text-white px-4 py-3 font-['Space_Grotesk'] focus:border-[#2ff801] focus:outline-none transition-colors placeholder:opacity-40"
                  />
                </div>
              ))}
              <div>
                <label className="block font-['Space_Grotesk'] font-bold text-xs text-[#2ff801] mb-1">TELL US ABOUT THE CHAOS *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="We want to start a riot in our industry..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#201f1f] border-2 border-white text-white px-4 py-3 font-['Space_Grotesk'] focus:border-[#2ff801] focus:outline-none transition-colors resize-none placeholder:opacity-40"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2E31FF] text-white py-4 border-4 border-white font-['Space_Grotesk'] font-black uppercase text-lg hover:bg-[#2ff801] hover:text-black transition-all shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                SEND THE SIGNAL ⚡
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Mobile Menu ────────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose, onContact }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[#2E31FF] flex flex-col items-center justify-center gap-8">
      <button onClick={onClose} className="absolute top-6 right-10 text-white font-black text-3xl">✕</button>
      {NAV_LINKS.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          onClick={onClose}
          className="font-['Space_Grotesk'] font-black text-5xl text-white uppercase hover:text-black transition-colors"
        >
          {link}
        </a>
      ))}
      <button
        onClick={() => { onClose(); onContact(); }}
        className="bg-black text-white px-10 py-4 border-4 border-white font-['Space_Grotesk'] font-black uppercase text-xl shadow-[8px_8px_0px_0px_#2ff801]"
      >
        GET IN TOUCH
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("WORK");
  const tickerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Inject Google Fonts + Material Symbols
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@400;700&display=swap";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    document.head.appendChild(link2);

    return () => { document.head.removeChild(link1); document.head.removeChild(link2); };
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] overflow-x-hidden min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-run { animation: marquee 20s linear infinite; }
        .neo { box-shadow: 8px 8px 0px 0px #2E31FF; }
        .neo-green { box-shadow: 8px 8px 0px 0px #2ff801; }
        .neo-pink { box-shadow: 8px 8px 0px 0px #ffb1c4; }
        .neo-black { box-shadow: 8px 8px 0px 0px #000; }
        .click:active { transform: translate(4px,4px); box-shadow: none !important; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; text-transform: none; letter-spacing: normal; word-wrap: normal; white-space: nowrap; direction: ltr; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-5 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-md border-b-4 border-black neo" : "bg-black/90 border-b-4 border-black"}`}>
        <div className="text-2xl md:text-3xl font-black text-[#2E31FF] italic tracking-tighter" style={{ fontFamily: "Space Grotesk" }}>
          RADICAL_LABS
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActiveSection(link)}
              className={`font-black uppercase tracking-tighter transition-all hover:skew-x-2 hover:scale-105 ${activeSection === link ? "text-white bg-[#2E31FF] px-4 py-1 border-2 border-black" : "text-white hover:text-[#2E31FF]"}`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#2E31FF] text-white px-4 md:px-6 py-2 md:py-3 border-4 border-black font-black uppercase tracking-tighter hover:bg-[#2ff801] hover:text-black transition-all neo click"
            style={{ fontFamily: "Space Grotesk" }}
          >
            GET IN TOUCH
          </button>
          <button className="md:hidden text-white text-3xl font-black" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onContact={() => setModalOpen(true)} />
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      {/* ── HERO ── */}
      <header id="work" className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-32 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#2e31ff] rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#b10056] rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="z-10 text-center space-y-4 max-w-7xl w-full">
          <span className="inline-block bg-[#2ff801] text-[#053900] font-bold text-sm px-4 py-2 border-2 border-black -rotate-2 mb-8" style={{ fontFamily: "Space Grotesk" }}>
            ESTABLISHED MMXXIV
          </span>

          <h1
            className="font-black uppercase text-white leading-none mb-6"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(48px, 10vw, 120px)", letterSpacing: "-0.04em", lineHeight: "0.9" }}
          >
            WE BUILD <span className="text-[#bfc2ff] italic">WEIRD</span> DIGITAL{" "}
            <span className="text-[#79ff5b]">STUFF</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-10 leading-relaxed">
            A creative studio obsessed with breaking the internet. We don't do boring. We do high-voltage, neo-brutalist magic for brands that aren't afraid to scream.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#2e31ff] text-white text-xl md:text-3xl font-black px-8 md:px-10 py-4 md:py-5 border-4 border-black neo-black click uppercase"
              style={{ fontFamily: "Space Grotesk" }}
            >
              SEE OUR CHAOS
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-black text-xl md:text-3xl font-black px-8 md:px-10 py-4 md:py-5 border-4 border-black neo-pink click uppercase"
              style={{ fontFamily: "Space Grotesk" }}
            >
              THE STUDIO
            </button>
          </div>
        </div>

        {/* Floating accents */}
        <div className="absolute top-1/4 right-10 hidden lg:block rotate-12 bg-[#ffb1c4] p-6 border-4 border-black neo-black">
          <span className="material-symbols-outlined" style={{ fontSize: 64, color: "black" }}>star</span>
        </div>
        <div className="absolute bottom-1/4 left-10 hidden lg:block -rotate-12 bg-[#79ff5b] p-6 border-4 border-black neo-black">
          <span className="material-symbols-outlined" style={{ fontSize: 64, color: "black" }}>bolt</span>
        </div>
      </header>

      {/* ── TICKER ── */}
      <div className="w-full bg-[#2ff801] border-y-4 border-black py-4 overflow-hidden">
        <div className="flex marquee-run gap-10 items-center w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-black text-black uppercase text-2xl md:text-3xl flex items-center gap-4 whitespace-nowrap" style={{ fontFamily: "Space Grotesk" }}>
              {item.text}
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: "black" }}>{item.icon}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PORTFOLIO / BENTO GRID ── */}
      <section id="portfolio" className="py-24 px-6 md:px-10 bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2
              className="font-black uppercase leading-none"
              style={{ fontFamily: "Space Grotesk", fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              SELECTED <br />
              <span className="text-[#ffb1c4]">EXPLOSIONS</span>
            </h2>
            <p className="max-w-xs text-[#c6c4da]">Our work is a curated mess of highly polished pixels and intentional friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Large card */}
            <div className="md:col-span-8 group relative overflow-hidden bg-[#2a2a2a] border-4 border-black neo-green transition-transform hover:-translate-y-2 cursor-pointer">
              <img
                src={PROJECTS[0].image}
                alt="Neon Void"
                className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-[#2e31ff] text-white px-4 py-1 border-2 border-black font-bold text-xs" style={{ fontFamily: "Space Grotesk" }}>WEB3</span>
                <span className="bg-black text-white px-4 py-1 border-2 border-white font-bold text-xs" style={{ fontFamily: "Space Grotesk" }}>UX/UI</span>
              </div>
              <div className="p-8 flex justify-between items-end">
                <div>
                  <h3 className="font-black text-3xl uppercase mb-2" style={{ fontFamily: "Space Grotesk" }}>NEON_VOID</h3>
                  <p className="opacity-70">A decentralized visual engine for the Metaverse.</p>
                </div>
                <button className="p-4 bg-[#79ff5b] border-4 border-black click hover:bg-[#2ff801] transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 36, color: "black" }}>arrow_outward</span>
                </button>
              </div>
            </div>

            {/* Sneaker card */}
            <div className="md:col-span-4 bg-[#ffb1c4] border-4 border-black neo-black p-8 flex flex-col justify-between group hover:bg-[#b10056] transition-colors cursor-pointer">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-2 border-white group-hover:rotate-45 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: "white" }}>auto_awesome</span>
                </div>
                <h3 className="font-black text-3xl text-black uppercase" style={{ fontFamily: "Space Grotesk" }}>PHANTOM BRANDING</h3>
                <p className="text-black/80">Redefining visual identity for a phantom sneaker drop.</p>
              </div>
              <img src={PROJECTS[1].image} alt="Sneaker" className="w-full h-48 object-cover border-4 border-black mt-8" />
            </div>

            {/* Glitch card */}
            <div className="md:col-span-5 bg-[#2e31ff] border-4 border-black neo-black p-0 overflow-hidden relative group cursor-pointer">
              <div className="p-10 z-10 relative">
                <h3
                  className="text-white uppercase font-black leading-none mb-6"
                  style={{ fontFamily: "Space Grotesk", fontSize: "clamp(40px, 5vw, 64px)" }}
                >
                  GLITCH<br />STUDIO
                </h3>
                <button className="bg-black text-white font-bold text-sm px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-all" style={{ fontFamily: "Space Grotesk" }}>
                  VIEW CASE STUDY
                </button>
              </div>
              <img
                src={PROJECTS[2].image}
                alt="Retro hardware"
                className="absolute top-0 right-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity"
              />
            </div>

            {/* Rave card */}
            <div className="md:col-span-7 border-4 border-black neo-pink bg-[#201f1f] overflow-hidden">
              <div className="flex h-full flex-col md:flex-row">
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[#79ff5b] font-bold text-sm" style={{ fontFamily: "Space Grotesk" }}>2024 DROP</span>
                    <h3 className="font-black text-3xl uppercase" style={{ fontFamily: "Space Grotesk" }}>ACID_RAVE IDENTITY</h3>
                  </div>
                  <p className="opacity-60">Visual systems for a 48-hour illegal digital marathon.</p>
                </div>
                <div className="flex-1 border-l-4 border-black">
                  <img src={PROJECTS[3].image} alt="Abstract color" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-[#79ff5b] text-black border-y-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <div className="absolute -top-10 -right-20 opacity-10 rotate-12 pointer-events-none">
            <h4 style={{ fontFamily: "Space Grotesk", fontSize: 200, fontWeight: 900, lineHeight: 1 }}>WEIRD</h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 border-4 border-black neo-black bg-white p-2 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgg5CNQqpqx4pPj3plFQw02zSZP1LN39UmkvWDnv7RQS2Vxer89GPIsPc1876UHgWSWMB8Dp9Y3viwDz--ik7S3v0B2DmHOEDHlhvq0iGYnX165AXVzTew6qmKmwcEu3llwO7JrCQYXzZw3_tGznRmFWDfPuAjme1YjGtnJ_K1G3I1hq6DhXhzGgZcbf5sHBdhNP8XNaIvofWUV57nuHp3Bu8QNXBelyB20NfKJ8YbeYrRAGVbVuxoma38-8Uwma0GBIxEpbPdSoB6"
                  alt="Studio"
                  className="w-full aspect-[4/5] object-cover grayscale contrast-125"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#2e31ff] border-4 border-black neo-black flex items-center justify-center rotate-12 z-20">
                <span className="font-bold text-white text-center text-sm" style={{ fontFamily: "Space Grotesk" }}>MEET THE<br />ANARCHISTS</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <h2
                className="font-black uppercase leading-none"
                style={{ fontFamily: "Space Grotesk", fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                THE RULES WE <br />
                <span className="bg-black text-[#79ff5b] px-4 inline-block -skew-x-12">BROKE</span> TODAY.
              </h2>

              <div className="space-y-6">
                {RULES.map((r) => (
                  <div
                    key={r.num}
                    className="border-b-4 border-black pb-6 flex items-start gap-6 hover:translate-x-4 transition-transform cursor-default"
                  >
                    <span className="font-black text-3xl opacity-30" style={{ fontFamily: "Space Grotesk" }}>{r.num}</span>
                    <div>
                      <h4 className="font-black text-2xl uppercase mb-2" style={{ fontFamily: "Space Grotesk" }}>{r.title}</h4>
                      <p className="text-lg leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="process" className="py-24 bg-black text-white overflow-hidden">
        <div className="px-6 md:px-10 mb-20">
          <h2
            className="font-black uppercase text-center border-4 border-white py-10 neo"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(40px, 8vw, 100px)" }}
          >
            CAPABILITIES
          </h2>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-10 px-6 md:px-10" style={{ scrollbarWidth: "none" }}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className={`min-w-[340px] md:min-w-[400px] ${cap.bg} p-10 border-4 ${cap.border} flex flex-col justify-between h-[480px] hover:-translate-y-2 transition-transform cursor-default`}
              style={{ boxShadow: cap.shadow.replace("shadow-[", "").replace("]", "").replace(/_/g, " ") }}
            >
              <span className={`material-symbols-outlined ${cap.iconColor}`} style={{ fontSize: 64 }}>{cap.icon}</span>
              <div>
                <h3
                  className={`font-black text-3xl uppercase mb-4 whitespace-pre-line ${cap.textColor}`}
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {cap.title}
                </h3>
                <p className={`text-base ${cap.descColor}`}>{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="story" className="py-24 px-6 md:px-10 bg-[#131313] flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl w-full space-y-10 border-8 border-[#2e31ff] p-10 md:p-16 neo-green -rotate-1 hover:rotate-0 transition-transform duration-300">
          <h2
            className="font-black uppercase leading-none"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(40px, 8vw, 120px)", letterSpacing: "-0.04em" }}
          >
            READY TO BE <br />
            <span className="text-[#79ff5b]">RADICAL?</span>
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto leading-relaxed">
            We're currently taking on projects for Q3. If you want something safe, go somewhere else. If you want to start a riot, hit the button.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#2E31FF] text-white text-xl md:text-3xl font-black px-10 md:px-12 py-5 md:py-6 border-4 border-black neo-black click uppercase hover:bg-[#2ff801] hover:text-black transition-colors"
            style={{ fontFamily: "Space Grotesk" }}
          >
            INITIATE CONTACT
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full py-20 px-6 md:px-10 flex flex-col md:flex-row justify-between items-end gap-10 bg-[#2E31FF] border-t-4 border-black" style={{ fontFamily: "Space Grotesk" }}>
        <div className="space-y-8 max-w-md">
          <div className="text-3xl md:text-4xl font-black text-black">RADICAL LABS</div>
          <p className="text-lg md:text-xl font-bold leading-tight text-black">
            WE BUILD THE FUTURE WE WANT TO SEE, ONE GLITCH AT A TIME. JOIN THE RESISTANCE OR GET OUT OF THE WAY.
          </p>
          <div className="flex flex-wrap gap-6">
            {["INSTAGRAM", "DRIBBBLE", "AWWWARDS", "TWITTER"].map((s) => (
              <a
                key={s}
                href="#"
                className={`text-black font-bold hover:italic hover:translate-x-2 transition-all ${s === "AWWWARDS" ? "underline decoration-4" : ""}`}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex flex-col text-right">
            <span className="text-xs opacity-60 font-bold">LOCATION</span>
            <span className="text-xl md:text-2xl font-black text-black">NEO-TOKYO // REMOTE</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs opacity-60 font-bold">TIMEZONE</span>
            <span className="text-xl md:text-2xl font-black text-black">UTC+9 (ALWAYS ON)</span>
          </div>
          <div className="pt-8">
            <p className="text-sm font-bold text-black">©2024 RADICAL LABS. NO RIGHTS RESERVED. STAY WEIRD.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
