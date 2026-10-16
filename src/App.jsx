import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring, useInView, animate } from "framer-motion";
import { Github, Linkedin, Mail, Download, ExternalLink, X, MapPin, Camera, ArrowDown, ArrowLeft, ArrowRight, Send, Sun, Moon, Menu, Award } from "lucide-react";
import { ME, SKILLS, PROJECTS, PHOTOS, TIMELINE, CERTS, EXTS } from "./data";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };
const LINKS = ["About", "Skills", "Projects", "Certificates", "Photography", "Contact"];
const ROW1 = ["Python", "C / C++", "Linux", "Shell Scripting", "AWS", "Docker", "Git & GitHub"];
const ROW2 = ["Cloud Computing", "Machine Learning", "Network Architecture", "Telecommunications", "Distributed Systems", "Full-stack Web"];
const pill = "rounded-full border border-line/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent";

// Tries each file extension until the photo loads
function Img({ base, onLoad, ...rest }) {
  const [i, setI] = useState(0);
  if (i >= EXTS.length) return null;
  return <img {...rest} src={base + EXTS[i]} onLoad={onLoad} onError={() => setI(i + 1)} />;
}

function useTheme() {
  const [t, setT] = useState(() => document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    const d = document.documentElement;
    d.classList.add("theme-anim");
    d.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
    const id = setTimeout(() => d.classList.remove("theme-anim"), 400);
    return () => clearTimeout(id);
  }, [t]);
  return [t, () => setT((x) => (x === "dark" ? "light" : "dark"))];
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-accent to-accent2" />;
}

const Section = ({ id, title, sub, action, children }) => (
  <section id={id} className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20">
    <motion.div {...fade} className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-2 max-w-xl text-muted">{sub}</p>}
      </div>
      {action}
    </motion.div>
    {children}
  </section>
);

function Nav({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e) => e.key === "Escape" && close();
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);
  const icons = [[Github, ME.github, "GitHub"], [Linkedin, ME.linkedin, "LinkedIn"], [Mail, `mailto:${ME.email}`, "Email"]];
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <nav aria-label="Main" className="flex items-center gap-1 rounded-full border border-line/10 bg-bg/70 px-2 py-1.5 shadow-xl backdrop-blur-md">
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="p-2 text-muted hover:text-accent lg:hidden"><Menu size={18} /></button>
          {LINKS.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="hidden rounded-full px-3 py-1.5 text-sm text-muted hover:bg-card/10 hover:text-fg lg:block">{l}</a>)}
          <span className="mx-1 hidden h-5 w-px bg-line/10 lg:block" />
          {icons.map(([I, h, n]) => <a key={n} href={h} aria-label={n} target="_blank" rel="noreferrer" className="p-2 text-muted hover:text-accent"><I size={18} /></a>)}
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`} className="p-2 text-muted hover:text-accent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href={ME.resume} download className="ml-1 flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-onaccent hover:opacity-90"><Download size={15} /> Resume</a>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg/95 px-8 pb-10 pt-24 backdrop-blur-lg lg:hidden">
            <button aria-label="Close menu" onClick={close} className="absolute right-5 top-5 rounded-full border border-line/15 p-2"><X size={20} /></button>
            <ul>
              {LINKS.map((l, i) => (
                <motion.li key={l} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}>
                  <a href={`#${l.toLowerCase()}`} onClick={close} className="flex items-baseline gap-4 py-2.5 text-4xl font-bold tracking-tight hover:text-accent">
                    <span className="text-sm font-normal text-accent">0{i + 1}</span>{l}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-4 text-muted">
              {icons.map(([I, h, n]) => <a key={n} href={h} aria-label={n} target="_blank" rel="noreferrer" className="rounded-full border border-line/15 p-3 hover:text-accent"><I size={20} /></a>)}
              <a href={ME.resume} download className="ml-auto rounded-full bg-accent px-5 py-3 font-semibold text-onaccent">Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section id="about" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.4fr_1fr]">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent2/20 blur-3xl" />
      <div className="relative order-2 md:order-1">
        <a href={`mailto:${ME.email}`} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
          Available for full-time roles &amp; internships
        </a>
        <p className="mt-8 font-mono text-sm uppercase tracking-[0.25em] text-accent">Hello, World.</p>
        <h1 className="mt-3 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {ME.name.split(" ").map((w, i, arr) => (
            <motion.span key={i} initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }} className="mr-[0.25em] inline-block">
              {w}{i === arr.length - 1 && <span className="text-accent">.</span>}
            </motion.span>
          ))}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">I'm an ICE student building my skills in cloud, Python and machine learning. I build practical tools, from network scanners and ML classifiers to full-stack marketplaces.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-semibold text-onaccent transition hover:scale-105">Explore Work <ArrowDown size={16} /></a>
          <a href={ME.resume} target="_blank" rel="noreferrer" className="rounded-full border border-line/20 px-6 py-3 font-semibold hover:bg-card/10">View Resume</a>
        </div>
      </div>
      <div className="relative order-1 mx-auto md:order-2">
        <div className="absolute -inset-1 animate-pulse rounded-[2.5rem] bg-gradient-to-tr from-accent via-accent2 to-accent opacity-60 blur-xl" />
        <motion.div whileHover={{ scale: 1.04 }} className="relative"><Img base={ME.dp} alt={`Portrait of ${ME.name}`} className="h-72 w-64 rounded-[2.5rem] border-2 border-accent/50 object-cover md:h-96 md:w-80" /></motion.div>
      </div>
      <motion.a href="#skills" aria-label="Scroll down" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted md:flex">Scroll <ArrowDown size={14} /></motion.a>
    </section>
  );
}

function Row({ items, rev }) {
  const r = [...items, ...items];
  return (
    <div className="marquee flex w-max hover:[animation-play-state:paused]" style={rev ? { animationDirection: "reverse" } : undefined}>
      {[...r, ...r].map((w, i) => (
        <span key={i} className="mr-3 flex items-center gap-2 whitespace-nowrap rounded-full border border-line/15 bg-card/[0.04] px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />{w}
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div aria-hidden className="space-y-3 overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <Row items={ROW1} />
      <Row items={ROW2} rev />
    </div>
  );
}

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

function Stats() {
  const s = [[PROJECTS.length, "Projects built"], [PROJECTS.filter((p) => p.demo).length, "Live apps"], [3, "Focus areas"]];
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-5 pt-16">
      {s.map(([n, l]) => (
        <motion.div key={l} {...fade} className="rounded-2xl border border-line/10 bg-card/[0.04] p-5 text-center">
          <div className="text-4xl font-extrabold text-accent md:text-5xl"><Count to={n} /></div>
          <div className="mt-1 text-sm text-muted">{l}</div>
        </motion.div>
      ))}
    </div>
  );
}

function Skills() {
  const tabs = Object.keys(SKILLS);
  const [tab, setTab] = useState(tabs[0]);
  return (
    <Section id="skills" title="Core competencies" sub="The languages, platforms and tools I use to build and ship.">
      <div role="tablist" className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-2 text-sm transition ${tab === t ? "border-accent bg-accent/10 text-accent" : "border-line/10 text-muted hover:text-fg"}`}>{t}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-wrap gap-3 rounded-2xl border border-line/10 bg-card/[0.04] p-6">
          {SKILLS[tab].map((s) => <motion.span key={s} whileHover={{ y: -4 }} className="cursor-default rounded-lg border border-line/10 bg-bg px-4 py-2 text-sm transition hover:border-accent/60 hover:shadow-[0_0_20px_rgb(var(--accent)/.35)]">{s}</motion.span>)}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

function Tilt({ children }) {
  const [s, setS] = useState({ rotateX: 0, rotateY: 0 });
  return (
    <motion.article style={{ transformPerspective: 900 }} animate={s} transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setS({ rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10 }); }}
      onMouseLeave={() => setS({ rotateX: 0, rotateY: 0 })}
      className="flex h-full flex-col rounded-2xl border border-line/10 bg-card/[0.04] p-6 hover:border-accent/40">
      {children}
    </motion.article>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Featured projects" sub="Selected work with measurable results."
      action={<a href={`${ME.github}?tab=repositories`} target="_blank" rel="noreferrer" className={`${pill} flex items-center gap-2`}><Github size={16} /> View all on GitHub <ArrowRight size={14} /></a>}>
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <motion.div key={p.title} {...fade} className="h-full">
            <Tilt>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-muted">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-accent2/15 px-3 py-1 text-xs text-accent2">{t}</span>)}</div>
              <div className="mt-5 flex gap-4 text-sm font-medium">
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-accent hover:underline"><ExternalLink size={15} /> Live Demo</a>}
                <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Github size={15} /> GitHub Repo</a>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Certificates() {
  return (
    <Section id="certificates" title="Certifications" sub="Hackathons and events I've taken part in.">
      <div className="grid gap-6 md:grid-cols-2">
        {CERTS.map((c) => (
          <motion.article key={c.title} {...fade} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/10 bg-card/[0.04] transition hover:border-accent/40">
            <a href={c.pdf} target="_blank" rel="noreferrer" aria-label={`View ${c.title} certificate`} className="block overflow-hidden bg-card/10">
              <img src={c.img} alt={`${c.title} certificate`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-105" />
            </a>
            <div className="flex flex-1 flex-col p-6">
              <p className="flex items-center gap-2 text-sm text-accent"><Award size={15} /> {c.date}</p>
              <h3 className="mt-1 text-xl font-semibold">{c.title}</h3>
              <p className="text-sm text-muted/80">{c.issuer} · Team {c.team}</p>
              <p className="mt-2 flex-1 text-muted">{c.text}</p>
              <div className="mt-5 flex gap-4 text-sm font-medium">
                <a href={c.pdf} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-accent hover:underline"><ExternalLink size={15} /> View certificate</a>
                <a href={c.pdf} download className="flex items-center gap-1.5 hover:underline"><Download size={15} /> Download</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Photo({ p, onOpen }) {
  const [ok, setOk] = useState(false);
  return (
    <motion.figure layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl">
      <button onClick={() => onOpen(p)} aria-label={`Open ${p.name}`} className="block w-full text-left">
        <div className={ok ? "" : "aspect-[4/5] animate-pulse bg-card/10"}>
          <Img base={p.src} alt={p.name} loading="lazy" decoding="async" onLoad={() => setOk(true)} className={`w-full transition duration-500 group-hover:scale-105 ${ok ? "opacity-100" : "opacity-0"}`} />
        </div>
        <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent p-4 text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="font-semibold">{p.name}</span>
          <span className="flex items-center gap-1 text-xs text-slate-300"><MapPin size={12} /> {p.loc}</span>
        </figcaption>
      </button>
    </motion.figure>
  );
}

function Gallery({ items, filters }) {
  const cats = ["All", ...new Set(items.map((p) => p.cat))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  useEffect(() => { const k = (e) => e.key === "Escape" && setOpen(null); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  const list = cat === "All" ? items : items.filter((p) => p.cat === cat);
  return (
    <>
      {filters && <div className="mb-6 flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-accent bg-accent/10 text-accent" : "border-line/10 text-muted hover:text-fg"}`}>{c}</button>)}</div>}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3"><AnimatePresence>{list.map((p) => <Photo key={p.name} p={p} onOpen={setOpen} />)}</AnimatePresence></div>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label={open.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 text-white backdrop-blur-sm">
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
              <Img base={open.src} alt={open.name} className="max-h-[75vh] rounded-xl object-contain" />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-300">
                <span className="text-lg font-semibold text-white">{open.name}</span>
                <span className="flex items-center gap-4"><span className="flex items-center gap-1"><MapPin size={14} /> {open.loc}</span><span className="flex items-center gap-1"><Camera size={14} /> {open.gear}</span></span>
              </div>
            </motion.div>
            <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-5 top-5 rounded-full bg-white/10 p-2 hover:bg-white/20"><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Photography() {
  return (
    <Section id="photography" title="Through My Lens" sub="A few frames from the hills, villages and trips I carry a camera on."
      action={<a href="#/photos" className={`${pill} flex items-center gap-2`}>Show all photos <ArrowRight size={14} /></a>}>
      <Gallery items={PHOTOS.slice(0, 3)} />
    </Section>
  );
}

function PhotosPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-28">
      <a href="#photography" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"><ArrowLeft size={16} /> Back to portfolio</a>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Through My Lens</h1>
      <p className="mb-10 mt-2 max-w-xl text-muted">All my photos. Filter by category and tap any photo to see it larger.</p>
      <Gallery items={PHOTOS} filters />
    </main>
  );
}

function Timeline() {
  return (
    <Section id="experience" title="Experience & education">
      <ol className="relative ml-3 border-l border-line/10">
        {TIMELINE.map((t) => (
          <motion.li key={t.title} {...fade} className="mb-10 ml-8">
            <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_14px_3px_rgb(var(--accent)/.6)]" />
            <time className="text-sm text-accent">{t.when}</time>
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="text-sm text-muted/80">{t.place}</p>
            {t.text && <p className="mt-1 max-w-xl text-muted">{t.text}</p>}
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

function Contact() {
  const send = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    location.href = `mailto:${ME.email}?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(f.get("message") + "\n\n" + f.get("email"))}`;
  };
  const input = "mt-1 w-full rounded-lg border border-line/15 bg-bg px-4 py-3 outline-none focus:border-accent";
  const row = "flex items-center gap-3 rounded-xl border border-line/10 p-4 transition hover:border-accent/50";
  return (
    <Section id="contact" title="Let's talk" sub="Hiring, collaborating or just saying hi: I reply within a day.">
      <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-line/10 bg-card/[0.04] p-4 text-sm">
            <p className="font-semibold">Open to</p>
            {["Full-time roles", "Internships"].map((x) => <p key={x} className="mt-2 flex items-center gap-2 text-muted"><span className="h-2 w-2 rounded-full bg-emerald-500" /> {x}</p>)}
          </div>
          <a href={`mailto:${ME.email}`} className={row}><Mail className="text-accent" /> {ME.email}</a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" className={row}><Linkedin className="text-accent" /> LinkedIn</a>
          <a href={ME.github} target="_blank" rel="noreferrer" className={row}><Github className="text-accent" /> GitHub</a>
        </div>
        <form onSubmit={send} className="space-y-4 rounded-2xl border border-line/10 bg-card/[0.04] p-6">
          <label className="block text-sm">Name<input name="name" required className={input} /></label>
          <label className="block text-sm">Email<input name="email" type="email" required className={input} /></label>
          <label className="block text-sm">Message<textarea name="message" rows="4" required className={input} /></label>
          <button className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-onaccent hover:opacity-90"><Send size={16} /> Send message</button>
        </form>
      </div>
    </Section>
  );
}

export default function App() {
  const [theme, toggle] = useTheme();
  const [route, setRoute] = useState(() => (location.hash === "#/photos" ? "#/photos" : ""));
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash !== "#/photos") history.replaceState(null, "", location.pathname + location.search);
    scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => { const h = () => setRoute(location.hash); addEventListener("hashchange", h); return () => removeEventListener("hashchange", h); }, []);
  const photos = route === "#/photos";
  useEffect(() => {
    if (photos) scrollTo(0, 0);
    else if (route) setTimeout(() => document.getElementById(route.slice(1))?.scrollIntoView(), 60);
  }, [photos]); // eslint-disable-line
  return (
    <MotionConfig reducedMotion="user">
      <Progress />
      <Nav theme={theme} toggle={toggle} />
      <motion.div key={photos ? "photos" : "home"} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {photos ? <PhotosPage /> : (
          <main><Hero /><Marquee /><Stats /><Skills /><Projects /><Certificates /><Photography /><Timeline /><Contact /></main>
        )}
      </motion.div>
      <footer className="border-t border-line/10 px-5 py-8 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} {ME.name} · {ME.tz}</p>
        <p className="mt-2 inline-block rounded-full border border-line/10 px-3 py-1">Designed with precision &amp; code</p>
      </footer>
    </MotionConfig>
  );
}
