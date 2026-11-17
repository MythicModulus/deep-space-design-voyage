import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Orbit,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useLenis } from "lenis/react";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const navItems = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Selected work" },
  { id: "contact", label: "Contact" },
];

const expertise = [
  { name: "Python", detail: "Programming language", icon: Braces, category: "CODE" },
  { name: "C / C++", detail: "Systems & programming", icon: Cpu, category: "CODE" },
  { name: "Web development", detail: "HTML · CSS · JavaScript", icon: Code2, category: "BUILD" },
  { name: "Data structures", detail: "Algorithms & problem solving", icon: Layers3, category: "THINK" },
  { name: "Artificial intelligence", detail: "Learning the possibilities", icon: Atom, category: "EXPLORE" },
  { name: "SQL & Git", detail: "Data · Version control", icon: Orbit, category: "TOOLS" },
];

const timeline = [
  {
    date: "2024 — 2028",
    title: "B.Tech · Artificial Intelligence & Data Science",
    place: "JECRC University",
    description: "Exploring computing, intelligent systems, and the foundations of data science.",
    icon: GraduationCap,
  },
  {
    date: "NOW",
    title: "Building the foundation",
    place: "Independent learning",
    description: "Growing through programming, web development, data structures, and hands-on exploration.",
    icon: Sparkles,
  },
];

const roles = ["AI & Data Science Student", "Python Programmer", "Web Developer", "Problem Solver"];

function SceneStarfield() {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.009;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.035) * 0.025;
  });
  return (
    <>
      <Sparkles ref={ref} count={1850} scale={[40, 26, 28]} size={1.4} speed={0.1} opacity={0.54} color="#d5e6ff" />
      <Sparkles count={250} scale={[25, 18, 20]} size={2.8} speed={0.17} opacity={0.44} color="#95bbff" />
      <Sparkles count={42} scale={[12, 9, 11]} size={4} speed={0.08} opacity={0.27} color="#f4d8bd" />
    </>
  );
}

function LivingUniverse() {
  const pointer = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    pointer.current.x += (state.pointer.x * 0.2 - pointer.current.x) * 0.008;
    pointer.current.y += (state.pointer.y * 0.13 - pointer.current.y) * 0.008;
    state.camera.position.x += (pointer.current.x - state.camera.position.x) * 0.01;
    state.camera.position.y += (pointer.current.y - state.camera.position.y) * 0.01;
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.68} />
      <pointLight position={[5, 4, 4]} intensity={16} color="#a8c9ff" />
      <pointLight position={[-7, -3, -4]} intensity={10} color="#607edb" />
      <pointLight position={[0, -7, 3]} intensity={5} color="#dca37e" />
      <SceneStarfield />
      <Float speed={0.16} rotationIntensity={0.012} floatIntensity={0.035}>
        <mesh position={[7.5, 2.5, -7]}>
          <sphereGeometry args={[1.1, 48, 48]} />
          <meshStandardMaterial color="#8293bb" roughness={0.86} metalness={0.12} />
        </mesh>
      </Float>
      <Float speed={0.12} rotationIntensity={0.01} floatIntensity={0.025}>
        <mesh position={[-9, -2, -10]}>
          <sphereGeometry args={[1.6, 48, 48]} />
          <meshStandardMaterial color="#9f806e" roughness={0.9} metalness={0.1} />
        </mesh>
      </Float>
    </>
  );
}

function CoreObject() {
  const shell = useRef(null);
  const aura = useRef(null);
  const satellites = useRef(null);
  useFrame((state, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.14;
      shell.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.12 + state.pointer.y * 0.05;
      shell.current.rotation.z = state.pointer.x * 0.055;
      shell.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.014);
    }
    if (aura.current) {
      aura.current.rotation.y -= delta * 0.055;
      aura.current.rotation.z += delta * 0.025;
    }
    if (satellites.current) {
      satellites.current.rotation.y = state.pointer.x * 0.12;
      satellites.current.rotation.x = 0.78 + state.pointer.y * 0.1;
      satellites.current.rotation.z += delta * 0.09;
    }
    state.camera.position.x += (state.pointer.x * 0.28 - state.camera.position.x) * 0.014;
    state.camera.position.y += (state.pointer.y * 0.17 - state.camera.position.y) * 0.014;
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <Float speed={0.74} rotationIntensity={0.08} floatIntensity={0.12}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.03, 5]} />
          <meshPhysicalMaterial color="#d8e9ff" emissive="#718ec8" emissiveIntensity={0.56} roughness={0.18} metalness={0.64} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        <mesh ref={aura} scale={1.28}>
          <icosahedronGeometry args={[1.03, 3]} />
          <meshBasicMaterial color="#a7c9ff" wireframe transparent opacity={0.18} />
        </mesh>
        <group ref={satellites}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.47, 0.012, 8, 180]} />
            <meshBasicMaterial color="#e0efff" transparent opacity={0.74} />
          </mesh>
          <mesh position={[1.47, 0, 0]}>
            <sphereGeometry args={[0.052, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-1.47, 0, 0]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshBasicMaterial color="#d4a989" />
          </mesh>
        </group>
      </Float>
    </>
  );
}

function SceneCanvas({ core = false }: { core?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.1], fov: 42 }} dpr={[1, 1.4]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
      {core ? <CoreObject /> : <LivingUniverse />}
      <EffectComposer multisampling={0}>
        <Bloom intensity={core ? 0.75 : 0.28} luminanceThreshold={0.32} luminanceSmoothing={0.82} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-23% 0px -58% 0px", threshold: [0.05, 0.15, 0.3] },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const complete = useCallback(() => {
    setProgress(100);
    window.setTimeout(() => {
      setShow(false);
      window.setTimeout(onComplete, 650);
    }, 350);
  }, [onComplete]);

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 250 : 1150;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(94, Math.floor(((now - started) / duration) * 94));
      setProgress((current) => Math.max(current, next));
      if (next < 94) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = window.setTimeout(complete, duration + 80);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [complete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="boot-screen" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }} aria-label="Portfolio initializing" role="status">
          <motion.div className="boot-mark" animate={{ rotate: 360 }} transition={{ duration: 16, ease: "linear", repeat: Infinity }}>
            <Orbit size={29} strokeWidth={1.2} />
          </motion.div>
          <p className="boot-wordmark">S M <span>·</span> 0 1</p>
          <div className="boot-readout"><span>INITIALIZING PERSONAL SYSTEM</span><span>{String(progress).padStart(2, "0")}%</span></div>
          <div className="boot-progress"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.22 }} /></div>
          <div className="boot-status"><span>ORBITAL NAVIGATION ONLINE</span><span>CORE SYSTEMS NOMINAL</span></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navigation({ active, loaded }: { active: string; loaded: boolean }) {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const goTo = (id: string) => {
    lenis?.scrollTo(`#${id}`, { offset: -32, duration: 1.2 });
    setMenuOpen(false);
  };
  return (
    <motion.header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`} initial={{ y: -30, opacity: 0 }} animate={loaded ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }} transition={{ duration: 0.75, delay: 0.1 }}>
      <a href="#top" className="wordmark" onClick={(event) => { event.preventDefault(); lenis?.scrollTo(0, { duration: 1.2 }); }} aria-label="Shyam Maskara, return to top">
        <span className="wordmark-icon"><Orbit size={16} strokeWidth={1.5} /></span><span>SHYAM MASKARA</span><span className="wordmark-index">/ 01</span>
      </a>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {navItems.map((item) => <a key={item.id} className={`nav-link ${active === item.id ? "nav-active" : ""}`} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={(event) => { event.preventDefault(); goTo(item.id); }}>{item.label}</a>)}
      </nav>
      <div className="nav-right"><a className="availability" href="mailto:shyammaskara2006@gmail.com"><span /> OPEN TO OPPORTUNITIES</a><Button className="menu-toggle" size="icon" variant="ghost" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">{navItems.map((item, i) => <motion.a key={item.id} href={`#${item.id}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} onClick={(event) => { event.preventDefault(); goTo(item.id); }}>{item.label}<ArrowUpRight size={14} /></motion.a>)}</motion.nav>}</AnimatePresence>
    </motion.header>
  );
}

function CursorOrb({ ready }: { ready: boolean }) {
  const orb = useRef<HTMLDivElement>(null);
  const lastPoint = useRef({ x: -80, y: -80 });
  useEffect(() => {
    if (!ready || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = -80;
    let y = -80;
    let targetX = -80;
    let targetY = -80;
    const move = (event: PointerEvent) => { targetX = event.clientX; targetY = event.clientY; };
    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      if (orb.current) orb.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      lastPoint.current = { x: targetX, y: targetY };
      frame = requestAnimationFrame(tick);
    };
    const over = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      orb.current?.classList.toggle("cursor-active", Boolean(event.target.closest("a, button, input, textarea, [data-cursor]")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [ready]);
  if (!ready) return null;
  return <div ref={orb} className="cursor-orb" aria-hidden="true"><span /><i /><i /><i /></div>;
}

function SectionEyebrow({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return <div className={`section-eyebrow ${light ? "section-eyebrow-light" : ""}`}><span>{number}</span><span className="eyebrow-rule" /><span>{label}</span></div>;
}

function MagneticButton({ href, children, variant = "default", target }: { href: string; children: React.ReactNode; variant?: "default" | "outline"; target?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.075}px, ${y * 0.09}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0, 0)"; };
  return <a ref={ref} className={`button-link ${variant === "outline" ? "button-link-outline" : ""}`} href={href} target={target} rel={target ? "noreferrer" : undefined} onPointerMove={move} onPointerLeave={reset}>{children}</a>;
}

function Hero({ loaded }: { loaded: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const lenis = useLenis();
  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="top" className="hero-section">
      <div className="hero-scene" aria-hidden="true"><Suspense fallback={null}><SceneCanvas /></Suspense></div>
      <div className="hero-grain" aria-hidden="true" />
      <motion.div className="hero-content" initial="hidden" animate={loaded ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }} className="hero-pretitle"><span className="pretitle-dot" /> HUMAN CURIOSITY, ARTIFICIAL INTELLIGENCE <span className="pretitle-index">IND / 26</span></motion.div>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }} className="hero-heading">A mind for<br /><span>what’s next.</span></motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }} className="hero-name">SHYAM SUNDER MASKARA <span>— STUDENT, BUILDER, EXPLORER</span></motion.p>
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }} className="hero-role"><span className="role-line" /><AnimatePresence mode="wait"><motion.span key={roles[roleIndex]} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -9, opacity: 0 }} transition={{ duration: 0.3 }}>{roles[roleIndex]}</motion.span></AnimatePresence><span className="role-line" /></motion.div>
        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }} className="hero-description">Learning at the edge of AI and possibility.<br />Making ideas useful, one line at a time.</motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }} className="hero-actions"><MagneticButton href="#work" variant="outline">Explore the journey <ArrowDownRight size={14} /></MagneticButton><MagneticButton href="mailto:shyammaskara2006@gmail.com">Start a conversation <ArrowUpRight size={14} /></MagneticButton></motion.div>
      </motion.div>
      <div className="hero-bottom"><span>26°50′ N &nbsp; 80°56′ E <i /> LUCKNOW, INDIA</span><button onClick={() => lenis?.scrollTo("#about", { offset: -30, duration: 1.3 })}>SCROLL TO EXPLORE <ArrowDown size={13} /></button><span>MADE WITH CURIOSITY <i /> ALWAYS LEARNING</span></div>
    </section>
  );
}

function About() {
  const paragraphs = ["Hello, I’m Shyam — an Artificial Intelligence and Data Science student who enjoys learning how things work, then figuring out how to make them work better.", "I’m drawn to programming, intelligent systems, the web, and the small satisfaction of finding an elegant solution to a difficult problem.", "The goal is simple: keep learning, build things that matter, and make technology a little more useful for the people around us."];
  return (
    <section id="about" className="about-section section-pad">
      <div className="section-container">
        <SectionEyebrow number="01" label="THE PERSON BEHIND THE CODE" />
        <div className="about-layout">
          <div className="about-title-block"><p className="small-index">A LITTLE ABOUT ME</p><h2>Curiosity is<br />my <span>starting point.</span></h2><div className="about-quote"><span>“</span><p>Build a little. Learn a lot.<br />Then build something better.</p></div></div>
          <motion.div className="about-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, staggerChildren: 0.12 }}>
            {paragraphs.map((paragraph, index) => <motion.p key={paragraph} className={index === 0 ? "about-lead" : ""} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 0.55 }}>{paragraph}</motion.p>)}
            <div className="about-location"><MapPin size={13} /><span>LUCKNOW, UTTAR PRADESH</span><span className="location-separator">/</span><span>CURRENTLY STUDYING AT JECRC</span></div>
          </motion.div>
        </div>
        <div className="facts-grid">
          <motion.div className="fact-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><div className="fact-topline"><span>01 / EDUCATION</span><GraduationCap size={17} /></div><h3>B.Tech <span>in</span><br />AI & Data Science</h3><div className="fact-bottom"><span>JECRC UNIVERSITY</span><span>2024 — 2028</span></div></motion.div>
          <motion.div className="fact-panel fact-panel-offset" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}><div className="fact-topline"><span>02 / CURRENT GPA</span><Sparkles size={17} /></div><div className="gpa-number">8<span>.</span>09</div><div className="gpa-label">CGPA <span>/ 10</span></div><div className="fact-bottom"><span>CONSISTENCY OVER PERFECTION</span><span>YEAR 02</span></div></motion.div>
          <motion.div className="fact-panel fact-note-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}><div className="fact-topline"><span>03 / CURRENT FOCUS</span><Orbit size={17} /></div><div className="focus-orbit"><div className="focus-ring focus-ring-one" /><div className="focus-ring focus-ring-two" /><div className="focus-center"><Atom size={20} /></div><span className="focus-node focus-node-one" /><span className="focus-node focus-node-two" /><span className="focus-node focus-node-three" /></div><p className="focus-label">Learn. Build. <span>Repeat.</span></p><div className="fact-bottom"><span>STAYING CURIOUS</span><span>ALWAYS</span></div></motion.div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="capabilities" className="capabilities-section section-pad">
      <div className="section-container"><SectionEyebrow number="02" label="TOOLS FOR THE JOURNEY" />
        <div className="capabilities-heading"><div><p className="small-index">A GROWING TOOLKIT</p><h2>Things I like<br /><span>to work with.</span></h2></div><p className="capabilities-aside">Each skill is a new way<br />to see what’s possible.</p></div>
        <div className="skill-constellation" role="list" aria-label="Skills and areas of interest">{expertise.map((skill, index) => { const Icon = skill.icon; const isSelected = selected === index; return <motion.button role="listitem" key={skill.name} className={`skill-orbit ${isSelected ? "skill-selected" : ""}`} onClick={() => setSelected(isSelected ? null : index)} onMouseEnter={() => setSelected(index)} onMouseLeave={() => setSelected(null)} onFocus={() => setSelected(index)} onBlur={() => setSelected(null)} aria-expanded={isSelected} aria-label={`${skill.name}, ${skill.detail}, ${skill.category}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.07 }}><span className="skill-stellar"><Icon size={22} strokeWidth={1.25} /></span><span className="skill-name">{skill.name}</span><span className="skill-detail">{skill.detail}</span><span className="skill-category">{skill.category}<span className="skill-state">{isSelected ? " / IN ORBIT" : " / EXPANDING"}</span></span></motion.button>; })}</div>
        <div className="skills-note"><span className="skills-note-star">✳</span><span>A WORK IN PROGRESS, BY DESIGN.</span><span>THERE’S ALWAYS ANOTHER FRONTIER.</span></div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section section-pad">
      <div className="section-container"><SectionEyebrow number="03" label="THE LEARNING CURVE" />
        <div className="experience-heading"><div><p className="small-index">NOT JUST A DESTINATION</p><h2>Every step<br /><span>is part of it.</span></h2></div><p>Early in the journey.<br />Excited for what’s ahead.</p></div>
        <div className="timeline">{timeline.map((entry, index) => { const Icon = entry.icon; return <motion.article key={entry.title} className="timeline-entry" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: index * 0.1 }}><div className="timeline-date">{entry.date}</div><div className="timeline-spine"><span className="timeline-dot"><Icon size={15} /></span></div><div className="timeline-content"><h3>{entry.title}</h3><p className="timeline-place">{entry.place}</p><p className="timeline-description">{entry.description}</p></div></motion.article>; })}</div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="work-section section-pad">
      <div className="section-container"><SectionEyebrow number="04" label="FROM CURIOSITY TO CREATION" />
        <div className="work-heading"><div><p className="small-index">THE NEXT CHAPTER</p><h2>Good ideas<br /><span>need somewhere to go.</span></h2></div><div className="work-marker"><span className="work-marker-dot" /><span>SPACE RESERVED FOR WHAT’S NEXT</span></div></div>
        <motion.div className="work-empty" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}><div className="work-empty-mark"><Orbit size={31} strokeWidth={1} /><span /></div><p className="work-empty-title">The first project is still taking shape.</p><p className="work-empty-copy">This is where the work will speak for itself. Until then, let’s talk about what you’re building.</p><a href="mailto:shyammaskara2006@gmail.com" className="text-link">Have something in mind? <ArrowUpRight size={14} /></a><div className="work-empty-coordinate">A NEW ORBIT, SOON <span>✳</span></div></motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) { setError("Please complete each field before sending."); return; }
    setError("");
    window.location.href = `mailto:shyammaskara2006@gmail.com?subject=${encodeURIComponent(`A message from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
    setSubmitted(true);
  };
  return (
    <section id="contact" className="contact-section section-pad"><div className="section-container"><SectionEyebrow number="05" label="MISSION CONTROL" light />
      <div className="contact-layout"><div className="contact-copy"><p className="small-index">A SIGNAL FROM YOUR SIDE OF THE UNIVERSE</p><h2>Have a good<br />feeling <span>about this?</span></h2><p className="contact-description">A project, an opportunity, or just an idea worth exploring. I’m always glad to meet another curious mind.</p><a className="contact-email" href="mailto:shyammaskara2006@gmail.com"><Mail size={16} /> shyammaskara2006@gmail.com <ArrowUpRight size={14} /></a><div className="contact-details"><span><MapPin size={13} /> LUCKNOW, INDIA</span><span>OPEN TO THE RIGHT OPPORTUNITY</span></div></div>
        <motion.form className="contact-form" onSubmit={onSubmit} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}><div className="form-head"><span>01 — 03 / YOUR MESSAGE</span><span><i /> CONNECTION SECURE</span></div><div className="form-field"><Label htmlFor="contact-name">YOUR NAME</Label><Input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" required /></div><div className="form-field"><Label htmlFor="contact-email">EMAIL ADDRESS</Label><Input id="contact-email" type="email" name="email" autoComplete="email" placeholder="Where can I reach you?" required /></div><div className="form-field"><Label htmlFor="contact-message">YOUR MESSAGE</Label><Textarea id="contact-message" name="message" placeholder="Tell me a little about it…" rows={3} required /></div>{error && <p className="form-error" role="alert">{error}</p>}{submitted && <p className="form-success" role="status"><Check size={14} /> Your email app is opening with your message.</p>}<Button type="submit" className="send-button">{submitted ? "Message prepared" : "Prepare transmission"}{submitted ? <Check size={15} /> : <Send size={15} />}</Button><p className="form-footnote">YOUR DEFAULT EMAIL APP WILL OPEN TO SEND THIS MESSAGE.</p></motion.form>
      </div>
      <div className="contact-endnote"><span>THANK YOU FOR MAKING IT THIS FAR.</span><span>END OF THIS TRANSMISSION <ArrowDown size={12} /></span></div>
    </div></section>
  );
}

function Footer() {
  return <footer className="footer"><div className="footer-left"><Orbit size={15} /><span>SHYAM MASKARA</span><span className="footer-divider">/</span><span>ALWAYS IN MOTION</span></div><div className="footer-links"><a href="https://github.com/MythicModulus" target="_blank" rel="noreferrer" aria-label="Shyam on GitHub"><Github size={15} /></a><a href="https://www.linkedin.com/in/shyam-maskara-802605332/" target="_blank" rel="noreferrer" aria-label="Shyam on LinkedIn"><Linkedin size={15} /></a><a href="mailto:shyammaskara2006@gmail.com" aria-label="Email Shyam"><Mail size={15} /></a></div><span className="footer-year">© 2026 · MADE WITH CURIOSITY IN INDIA</span></footer>;
}

export function PortfolioExperience() {
  const [ready, setReady] = useState(false);
  const active = useActiveSection();
  const heroProgress = useRef(0);
  const onProgress = useCallback((lenis: { progress: number }) => { heroProgress.current = lenis.progress; document.documentElement.style.setProperty("--flight-progress", String(lenis.progress)); }, []);
  useLenis(onProgress);
  useEffect(() => {
    document.documentElement.dataset.motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
  }, []);
  return <main className="portfolio-shell"><div className="cosmos-backdrop" aria-hidden="true"><Suspense fallback={null}><SceneCanvas /></Suspense></div><div className="cosmos-wash" aria-hidden="true" /><div className="cosmos-line cosmos-line-left" aria-hidden="true" /><div className="cosmos-line cosmos-line-right" aria-hidden="true" /><Navigation active={active} loaded={ready} /><BootSequence onComplete={() => setReady(true)} /><CursorOrb ready={ready} /><Hero loaded={ready} /><About /><Capabilities /><Experience /><Work /><Contact /><Footer /><a href="https://github.com/MythicModulus" className="back-to-top" aria-label="Visit Shyam’s GitHub profile" target="_blank" rel="noreferrer"><Github size={15} /><span>THE NEXT HORIZON</span><ExternalLink size={12} /></a></main>;
}