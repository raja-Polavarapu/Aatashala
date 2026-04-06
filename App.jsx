import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  red:    '#C8321A',
  teal:   '#1A8C6E',
  orange: '#E8821A',
  gold:   '#D4991A',
  bg:     '#FFFBF2',
  dark:   '#2D1A0E',
}
const H = "'Baloo 2', sans-serif"
const B = "'Hind', sans-serif"

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** Fade-up wrapper — apply to any section content */
function Reveal({ children, delay = 0, y = 36, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/** Animated section label pill */
function SectionLabel({ text, color = C.red }) {
  return (
    <Reveal>
      <p style={{
        fontFamily: H, color, fontWeight: 700,
        letterSpacing: 3, textTransform: 'uppercase',
        fontSize: 13, textAlign: 'center', marginBottom: 14,
      }}>
        {text}
      </p>
    </Reveal>
  )
}

/** Section heading */
function Heading({ children, light = false }) {
  return (
    <Reveal delay={0.1}>
      <h2 style={{
        fontFamily: H, fontWeight: 900,
        fontSize: 'clamp(30px, 4vw, 52px)',
        color: light ? 'white' : C.dark,
        textAlign: 'center', margin: '0 0 18px',
        lineHeight: 1.1,
      }}>
        {children}
      </h2>
    </Reveal>
  )
}

/** Section sub-text */
function Sub({ children, light = false }) {
  return (
    <Reveal delay={0.2}>
      <p style={{
        fontFamily: B, fontSize: 18, lineHeight: 1.75,
        color: light ? 'rgba(255,255,255,0.65)' : '#7A5E48',
        maxWidth: 600, margin: '0 auto 60px', textAlign: 'center',
      }}>
        {children}
      </p>
    </Reveal>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['games', 'food', 'events', 'corporate', 'contact']

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '12px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,251,242,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `3px solid ${C.red}` : '3px solid transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(45,26,14,0.08)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
      }}
    >
      <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <img src="/logo.jpg" alt="Aatashala" style={{ height: 48, borderRadius: 10, display: 'block' }} />
      </motion.a>

      <div className="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {links.map(s => (
          <motion.a
            key={s}
            href={`#${s}`}
            whileHover={{ color: C.red, y: -1 }}
            style={{
              textDecoration: 'none',
              color: scrolled ? C.dark : 'white',
              fontFamily: H, fontWeight: 700, fontSize: 15,
              textTransform: 'capitalize', transition: 'color 0.2s',
            }}
          >
            {s}
          </motion.a>
        ))}

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.06, boxShadow: '0 8px 28px rgba(200,50,26,0.5)' }}
          whileTap={{ scale: 0.94 }}
          style={{
            background: C.red, color: 'white',
            padding: '10px 26px', borderRadius: 8,
            fontFamily: H, fontWeight: 800, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(200,50,26,0.3)',
          }}
        >
          Book Now 🎯
        </motion.a>
      </div>
    </motion.nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
const SLIDES = ['/game1.jpg', '/game2.jpg', '/game3.jpg', '/game4.jpg']

function Hero() {
  const [curr, setCurr] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurr(p => (p + 1) % SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      {/* Slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={curr}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${SLIDES[curr]})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(45,26,14,0.62) 0%, rgba(45,26,14,0.78) 100%)',
      }} />

      {/* Kolam dot pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,153,26,0.18) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            color: C.orange, fontFamily: H, fontSize: 16,
            fontWeight: 700, letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 18,
          }}
        >
          …… discover the nostalgic joy ……
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: 'white', fontFamily: H,
            fontSize: 'clamp(40px, 7.5vw, 92px)',
            fontWeight: 900, lineHeight: 1.06,
            textShadow: '0 4px 28px rgba(0,0,0,0.35)',
            margin: 0, maxWidth: 940,
          }}
        >
          Revive Play.<br />
          <span style={{ color: C.gold }}>Build Real Connections.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.8)', fontFamily: B,
            fontSize: 20, maxWidth: 540,
            margin: '22px auto 0', lineHeight: 1.65,
          }}
        >
          Traditional Indian games, homemade snacks & community celebrations — live in your gated community.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          style={{ display: 'flex', gap: 16, marginTop: 44, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, boxShadow: '0 14px 36px rgba(200,50,26,0.6)' }}
            whileTap={{ scale: 0.94 }}
            style={{
              background: C.red, color: 'white',
              padding: '17px 44px', borderRadius: 10,
              fontFamily: H, fontWeight: 800, fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 6px 22px rgba(200,50,26,0.42)',
            }}
          >
            Book a Session 🎯
          </motion.a>
          <motion.a
            href="#games"
            whileHover={{ scale: 1.06, background: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.94 }}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.5)',
              color: 'white', padding: '17px 44px', borderRadius: 10,
              fontFamily: H, fontWeight: 800, fontSize: 18,
              textDecoration: 'none', backdropFilter: 'blur(12px)',
            }}
          >
            How It Works ↓
          </motion.a>
        </motion.div>

        {/* Slide indicator dots */}
        <div style={{ position: 'absolute', bottom: 36, display: 'flex', gap: 10 }}>
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurr(i)}
              animate={{
                width: i === curr ? 30 : 10,
                background: i === curr ? C.orange : 'rgba(255,255,255,0.45)',
              }}
              transition={{ duration: 0.35 }}
              style={{ height: 10, borderRadius: 5, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatCount({ num, suffix, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let val = 0
    const step = num / (1800 / 16)
    const t = setInterval(() => {
      val += step
      if (val >= num) { setCount(num); clearInterval(t) }
      else setCount(Math.floor(val))
    }, 16)
    return () => clearInterval(t)
  }, [inView, num])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: 'center', flex: 1, minWidth: 120 }}
    >
      <div style={{ fontFamily: H, fontWeight: 900, fontSize: 'clamp(34px, 4vw, 54px)', color: C.dark, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: B, color: '#8B6A50', fontSize: 14, marginTop: 6, fontWeight: 600 }}>
        {label}
      </div>
    </motion.div>
  )
}

function Stats() {
  const stats = [
    { num: 72, suffix: '+', label: 'Kids Played' },
    { num: 3,  suffix: '',  label: 'Hours of Joy' },
    { num: 10, suffix: '+', label: 'Traditional Games' },
    { num: 100,suffix: '%', label: 'Satisfaction' },
  ]
  return (
    <div style={{
      background: C.bg,
      borderTop: '4px solid',
      borderImage: `linear-gradient(to right, ${C.red}, ${C.orange}, ${C.gold}, ${C.teal}, ${C.red}) 1`,
      padding: '36px 40px',
      display: 'flex', gap: 20,
      justifyContent: 'space-around', alignItems: 'center',
      flexWrap: 'wrap',
    }}>
      {stats.map((s, i) => <StatCount key={s.label} {...s} delay={i * 0.1} />)}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ textAlign: 'center', flex: 1, minWidth: 120 }}
      >
        <div style={{ fontSize: 38, lineHeight: 1 }}>📍</div>
        <div style={{ fontFamily: H, fontWeight: 900, fontSize: 24, color: C.dark }}>Hyderabad</div>
        <div style={{ fontFamily: B, color: '#8B6A50', fontSize: 14, fontWeight: 600 }}>Currently Serving</div>
      </motion.div>
    </div>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function FounderCard({ name, role, bio, photo, emoji, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, boxShadow: '0 24px 56px rgba(45,26,14,0.18)' }}
      style={{
        background: 'white', borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(45,26,14,0.08)',
        flex: 1, minWidth: 260, maxWidth: 340,
        transition: 'box-shadow 0.3s',
      }}
    >
      <div style={{
        height: 264, background: '#F5EFE6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', borderBottom: `4px solid ${C.gold}`,
      }}>
        {photo
          ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 88 }}>{emoji}</span>
        }
      </div>
      <div style={{ padding: '26px 30px' }}>
        <div style={{ fontFamily: H, fontWeight: 900, fontSize: 22, color: C.dark, marginBottom: 4 }}>{name}</div>
        <div style={{
          fontFamily: B, fontWeight: 600, fontSize: 13,
          color: C.teal, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14,
        }}>{role}</div>
        <div style={{ fontFamily: B, fontSize: 15, color: '#6B5040', lineHeight: 1.65 }}>{bio}</div>
      </div>
    </motion.div>
  )
}

function About() {
  const founders = [
    {
      name: 'Raja Polavarapu', // ← TODO: Replace with your actual name
      role: 'Founder & Chief Experience Officer',
      photo: '/founder-you.jpg',
      bio: 'The mind behind Aatashala — designs every session, drives the vision, and makes sure every child goes home with a story.',
    },
    {
      name: 'Bhavika',
      role: 'Co-Founder & Operations Head',
      emoji: '🌸', // ← TODO: Replace with photo once ready
      bio: 'The backbone of Aatashala — documents, vendors, banking, T-shirt coordination. If it runs smoothly, it\'s because of Bhavika.',
    },
    {
      name: 'Vishal',
      role: 'Co-Founder & Creative Director',
      photo: '/founder-vishal.jpg',
      bio: 'Brings the drone shots, the energy, and the creative eye. BBA student by day. Aatashala co-founder always.',
    },
  ]

  return (
    <section id="about" style={{ padding: '100px 40px', background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel text="Our Story" />
        <Heading>
          Born from 15 Cousins.<br />
          <span style={{ color: C.teal }}>Made for the Whole Community.</span>
        </Heading>
        <Sub>
          What started as cousins playing 7 Stones every weekend turned into a movement when our Kings Game video went{' '}
          <strong style={{ color: C.red }}>viral with 20M+ views</strong>. That proved the insight — people are starving
          for real, physical, joyful community.
        </Sub>

        <div
          className="founder-row"
          style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {founders.map((f, i) => <FounderCard key={f.name} {...f} delay={i * 0.15} />)}
        </div>
      </div>
    </section>
  )
}

// ─── GAMES ────────────────────────────────────────────────────────────────────
const GAMES_U6   = ['Ball Throw', 'Colour Colour', 'Maa Thaatha Vutharam', 'Pick the Pencil', 'Simple Relay', 'Blind Fold']
const GAMES_6P   = ['7 Stones', 'Ice Water', 'London London Stop', 'Dodge Ball', 'Mudhra Ball', 'Every Every Gummadi Pandu', 'Balloon Burst', "King's Game", 'Mafia', 'Ramudu Sita']

function Tag({ name, delay, color }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.78 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ scale: 1.1, y: -2 }}
      style={{
        display: 'inline-block',
        background: `${color}1A`, border: `1.5px solid ${color}50`,
        color: color, padding: '8px 18px', borderRadius: 100,
        fontFamily: B, fontWeight: 600, fontSize: 14, cursor: 'default',
        margin: '0 6px 8px 0',
      }}
    >
      {name}
    </motion.span>
  )
}

function Games() {
  const steps = [
    { icon: '🎮', title: '1.5 hrs — Play', desc: 'Teams of max 15 kids, 2 cousins per team as guides. Game assets rotate every 30 minutes.' },
    { icon: '🍱', title: 'Snack Break', desc: 'Homemade traditional snacks — Chekkalu, Murukulu, Sunnundalu — served fresh by the family.' },
    { icon: '🎈', title: '1.5 hrs — Play', desc: 'Second round of energy! Grand finale: all kids together for the legendary Balloon Burst.' },
  ]

  return (
    <section id="games" style={{ background: C.dark, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel text="How We Play" color={C.orange} />
        <Heading light>
          3 Hours of <span style={{ color: C.gold }}>Pure Joy</span>
        </Heading>
        <Sub light>
          Every weekend session runs 3pm–6pm right in your gated community. Our structure ensures no child is left out.
        </Sub>

        {/* Session flow */}
        <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 72 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              whileHover={{ y: -8, background: 'rgba(255,255,255,0.1)' }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 18, padding: '36px 28px', textAlign: 'center',
                transition: 'background 0.25s',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 18 }}>{s.icon}</div>
              <div style={{ fontFamily: H, fontWeight: 800, fontSize: 20, color: C.gold, marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontFamily: B, color: 'rgba(255,255,255,0.68)', fontSize: 15, lineHeight: 1.65 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Games by age group */}
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 72 }}>
          <Reveal>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ fontSize: 30 }}>👶</span>
                <span style={{ fontFamily: H, fontWeight: 800, fontSize: 20, color: C.orange }}>Under 6</span>
              </div>
              <div>{GAMES_U6.map((g, i) => <Tag key={g} name={g} delay={i * 0.07} color={C.orange} />)}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ fontSize: 30 }}>🧒</span>
                <span style={{ fontFamily: H, fontWeight: 800, fontSize: 20, color: C.teal }}>Ages 6+</span>
              </div>
              <div>{GAMES_6P.map((g, i) => <Tag key={g} name={g} delay={i * 0.06} color={C.teal} />)}</div>
            </div>
          </Reveal>
        </div>

        {/* Photo grid */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 64 }}>
            {['/game1.jpg', '/game2.jpg', '/game3.jpg', '/game4.jpg'].map(src => (
              <motion.div
                key={src}
                whileHover={{ scale: 1.04, zIndex: 2 }}
                style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3' }}
              >
                <img src={src} alt="Kids playing" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Pricing CTA */}
        <Reveal delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              textAlign: 'center',
              background: `linear-gradient(135deg, ${C.red}28, ${C.orange}20)`,
              border: `1px solid ${C.orange}40`,
              borderRadius: 22, padding: '48px 40px',
            }}
          >
            <div style={{ fontFamily: H, fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'white' }}>
              ₹450 per child · Minimum 50 kids
            </div>
            <div style={{ fontFamily: B, color: 'rgba(255,255,255,0.6)', fontSize: 16, margin: '14px 0 30px' }}>
              Weekend sessions · 3pm – 6pm · At your gated community · Hyderabad
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: `0 12px 32px ${C.red}66` }}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'inline-block',
                background: C.red, color: 'white',
                padding: '17px 48px', borderRadius: 10,
                fontFamily: H, fontWeight: 800, fontSize: 18,
                textDecoration: 'none',
              }}
            >
              Book for My Community 🏘️
            </motion.a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOD ────────────────────────────────────────────────────────────────────
const SNACKS = [
  { e: '🍡', n: 'Sunnundalu',      d: 'Urad dal laddoos by grandma — protein-packed, melt-in-mouth perfection.' },
  { e: '🥨', n: 'Chekkalu',        d: 'Crispy rice crackers with sesame. The classic Andhra snack break staple.' },
  { e: '🌀', n: 'Murukulu',        d: 'Crunchy spirals of rice flour, fried to golden perfection. Impossible to stop at one.' },
  { e: '✨', n: 'Boondhi Paakam',  d: 'Tiny fried droplets in jaggery syrup — festival sweetness in every spoonful.' },
  { e: '🌶️', n: 'Kaaram Pusa',    d: 'Spiced butter rolls — a fiery Telugu teatime favourite with bite.' },
  { e: '🫙', n: 'Avakaya Pickle',  d: 'Raw mango pickle, made by grandma. Authentic, fermented, unforgettable.' },
]

function Food() {
  return (
    <section id="food" style={{ padding: '100px 40px', background: '#FEF6E8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel text="Grandma's Kitchen" color={C.teal} />
        <Heading>
          Homemade. Organic. <span style={{ color: C.orange }}>Unforgettable.</span>
        </Heading>
        <Sub>
          Made by the grandmothers and mothers of our family. Served fresh at every session. Anyone in the community
          can order — we deliver on our next visit.
        </Sub>

        <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
          {SNACKS.map(({ e, n, d }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              whileHover={{ y: -8, boxShadow: '0 18px 44px rgba(45,26,14,0.14)' }}
              style={{
                background: 'white', borderRadius: 20,
                padding: '34px 28px',
                boxShadow: '0 2px 16px rgba(45,26,14,0.06)',
                borderBottom: `4px solid ${C.gold}`,
                transition: 'box-shadow 0.3s',
              }}
            >
              <div style={{ fontSize: 54, marginBottom: 18 }}>{e}</div>
              <div style={{ fontFamily: H, fontWeight: 800, fontSize: 20, color: C.dark, marginBottom: 10 }}>{n}</div>
              <div style={{ fontFamily: B, color: '#7A5E48', fontSize: 15, lineHeight: 1.65 }}>{d}</div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div style={{ textAlign: 'center' }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: `0 12px 30px ${C.teal}55` }}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'inline-block',
                background: C.teal, color: 'white',
                padding: '17px 48px', borderRadius: 10,
                fontFamily: H, fontWeight: 800, fontSize: 18,
                textDecoration: 'none',
              }}
            >
              Raise an Order 🛒
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
const OFFERINGS = [
  { e: '🎈', t: 'Themed Balloon Décor',    d: 'Custom setups that transform any space into a magical celebration zone.' },
  { e: '🎂', t: 'Custom Cakes',             d: 'Bhavika bakes — personalised cakes for every birthday and occasion.' },
  { e: '🎮', t: 'Party Games',              d: 'We bring the energy. Traditional and modern games for every age.' },
  { e: '📸', t: 'Photography',              d: 'Professional memories captured for every special moment.' },
]

function Events() {
  return (
    <section id="events" style={{ padding: '100px 40px', background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel text="Celebrations" />
        <Heading>
          Every Celebration <span style={{ color: C.red }}>Deserves Magic</span>
        </Heading>
        <Sub>
          Birthdays, community festivals, family events — 365 days a year. Full-service planning at your doorstep.
        </Sub>

        {/* Photo gallery with featured first */}
        <div className="event-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14, marginBottom: 60,
        }}>
          {['/event1.jpg', '/event2.jpg', '/event3.jpg', '/event4.jpg', '/event5.jpg', '/event6.jpg'].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, zIndex: 2 }}
              style={{
                borderRadius: 16, overflow: 'hidden',
                aspectRatio: i === 0 ? '2/1' : '1/1',
                gridColumn: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              <img src={src} alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </motion.div>
          ))}
        </div>

        {/* Offerings */}
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 56 }}>
          {OFFERINGS.map(({ e, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'white', borderRadius: 18,
                padding: '28px 26px',
                boxShadow: '0 2px 16px rgba(45,26,14,0.07)',
                borderLeft: `4px solid ${C.red}`,
              }}
            >
              <span style={{ fontSize: 38 }}>{e}</span>
              <div style={{ fontFamily: H, fontWeight: 800, fontSize: 19, color: C.dark, margin: '14px 0 8px' }}>{t}</div>
              <div style={{ fontFamily: B, color: '#7A5E48', fontSize: 14, lineHeight: 1.65 }}>{d}</div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center' }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: `0 12px 30px ${C.red}55` }}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'inline-block',
                background: C.red, color: 'white',
                padding: '17px 48px', borderRadius: 10,
                fontFamily: H, fontWeight: 800, fontSize: 18,
                textDecoration: 'none',
              }}
            >
              Celebrate With Us 🎉
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CORPORATE ───────────────────────────────────────────────────────────────
const CORP_SERVICES = [
  { e: '🎯', t: 'Traditional Game Sessions',      d: 'Team building through games that unlock collaboration, strategy and laughter — naturally.' },
  { e: '🎨', t: 'Cultural Event Planning',         d: 'Themed corporate events with décor, traditional food, and entertainment rooted in Indian culture.' },
  { e: '🌿', t: 'Homemade Corporate Gifting',      d: "Artisanal snack hampers from grandma's kitchen — the gift your team will actually remember." },
  { e: '🧠', t: 'Personality Workshops Through Play', d: 'Games that surface leadership, patience, courage and teamwork. No boring PowerPoints.' },
]

function Corporate() {
  return (
    <section id="corporate" style={{ background: C.dark, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel text="B2B & Corporate" color={C.gold} />
        <Heading light>
          Employee Engagement,<br /><span style={{ color: C.gold }}>Reimagined.</span>
        </Heading>
        <Sub light>
          In a ₹3,000Cr+ employee engagement industry, most experiences feel forgettable. We bring the games your team
          grew up playing — and watch walls come down.
        </Sub>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {CORP_SERVICES.map(({ e, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              whileHover={{ y: -8, background: 'rgba(255,255,255,0.1)' }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid rgba(212,153,26,0.3)`,
                borderRadius: 20, padding: '36px 30px',
                transition: 'background 0.25s',
              }}
            >
              <span style={{ fontSize: 46 }}>{e}</span>
              <div style={{ fontFamily: H, fontWeight: 800, fontSize: 20, color: C.gold, margin: '18px 0 10px' }}>{t}</div>
              <div style={{ fontFamily: B, color: 'rgba(255,255,255,0.68)', fontSize: 15, lineHeight: 1.65 }}>{d}</div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.35}>
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: `0 12px 30px ${C.gold}66` }}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'inline-block',
                background: C.gold, color: C.dark,
                padding: '17px 48px', borderRadius: 10,
                fontFamily: H, fontWeight: 800, fontSize: 18,
                textDecoration: 'none',
              }}
            >
              Partner With Us 🤝
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── TESTIMONIAL ─────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.red} 0%, #8B1A0A 100%)`,
      padding: '100px 40px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Kolam overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ fontSize: 72, opacity: 0.3, fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote style={{
            fontFamily: H, fontWeight: 700,
            fontSize: 'clamp(20px, 3vw, 30px)',
            color: 'white', maxWidth: 820,
            margin: '0 auto 32px', lineHeight: 1.55,
          }}>
            My kids have never laughed that hard at a community event. They came home exhausted and happy —
            and they're already asking when Aatashala is coming back!
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ fontFamily: B, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
            — Parent, My Home Tarkshya · November 2025
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', phone: '', gender: '', service: '', community: '', people: '' })

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      // TODO: Replace YOUR_FORMSPREE_ID below with your real Formspree form ID
      // Sign up free at formspree.io → New Form → copy the ID from the endpoint URL
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inp = {
    width: '100%', padding: '14px 18px',
    border: `2px solid #E8D5C0`, borderRadius: 10,
    fontFamily: B, fontSize: 16, color: C.dark,
    background: 'white', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }
  const lbl = { display: 'block', fontFamily: H, fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 8 }

  return (
    <section id="contact" style={{ padding: '100px 40px', background: C.bg }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <SectionLabel text="Get In Touch" />
        <Heading>
          Bring Aatashala to <span style={{ color: C.red }}>Your Community</span>
        </Heading>
        <Sub>Fill in the details and we'll reach out within 24 hours.</Sub>

        <Reveal delay={0.3}>
          {status === 'sent' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                textAlign: 'center', padding: '64px 40px',
                background: `${C.teal}12`, border: `2px solid ${C.teal}44`,
                borderRadius: 22,
              }}
            >
              <div style={{ fontSize: 76, marginBottom: 20 }}>🎉</div>
              <div style={{ fontFamily: H, fontWeight: 900, fontSize: 30, color: C.teal }}>We'll be in touch soon!</div>
              <div style={{ fontFamily: B, color: '#6B5040', fontSize: 16, marginTop: 12 }}>
                Follow us on Instagram for the latest Aatashala moments.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 26 }}>
              <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={lbl}>Name *</label>
                  <input name="name" required value={form.name} onChange={onChange} placeholder="Your full name" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Phone *</label>
                  <input name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="+91 XXXXX XXXXX" style={inp} />
                </div>
              </div>

              <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={lbl}>Gender</label>
                  <select name="gender" value={form.gender} onChange={onChange} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Service Type *</label>
                  <select name="service" required value={form.service} onChange={onChange} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select a service</option>
                    <option>Community Game Session</option>
                    <option>Traditional Food Order</option>
                    <option>Birthday / Celebration</option>
                    <option>Corporate Event</option>
                  </select>
                </div>
              </div>

              <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={lbl}>Community / Apartment *</label>
                  <input name="community" required value={form.community} onChange={onChange} placeholder="e.g. My Home Tarkshya" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Number of People</label>
                  <input name="people" type="number" min="1" value={form.people} onChange={onChange} placeholder="e.g. 60" style={inp} />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.03, boxShadow: status === 'sending' ? 'none' : `0 12px 32px ${C.red}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: status === 'sending' ? '#aaa' : C.red,
                  color: 'white', border: 'none',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  padding: '18px 40px', borderRadius: 10,
                  fontFamily: H, fontWeight: 800, fontSize: 20,
                  transition: 'background 0.2s',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send My Request 🚀'}
              </motion.button>

              {status === 'error' && (
                <p style={{ color: C.red, fontFamily: B, textAlign: 'center', fontSize: 15 }}>
                  Something went wrong. Email us directly at{' '}
                  <a href="mailto:aatashala1@gmail.com" style={{ color: C.red }}>aatashala1@gmail.com</a>
                </p>
              )}
            </form>
          )}
        </Reveal>

        <Reveal delay={0.4}>
          <div style={{ marginTop: 52, display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '📞', label: '+91 90637 44404', href: 'tel:+919063744404' },
              { icon: '✉️', label: 'aatashala1@gmail.com', href: 'mailto:aatashala1@gmail.com' },
            ].map(({ icon, label, href }) => (
              <a key={href} href={href} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -4, color: C.red }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: B, fontWeight: 600, color: C.dark, fontSize: 16 }}
                >
                  <span style={{ fontSize: 22 }}>{icon}</span> {label}
                </motion.div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: C.dark, padding: '64px 40px 36px',
      borderTop: '4px solid',
      borderImage: `linear-gradient(to right, ${C.red}, ${C.orange}, ${C.gold}, ${C.teal}) 1`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48, marginBottom: 52 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <img src="/logo.jpg" alt="Aatashala" style={{ height: 56, borderRadius: 10, marginBottom: 18 }} />
            <p style={{ fontFamily: B, color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.75, maxWidth: 280 }}>
              Reviving traditional Indian games, food and community bonding — one weekend at a time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: H, fontWeight: 800, color: C.gold, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 18 }}>
                Explore
              </div>
              {[['games', 'Games'], ['food', 'Food'], ['events', 'Events'], ['corporate', 'Corporate'], ['contact', 'Contact']].map(([id, label]) => (
                <a key={id} href={`#${id}`} style={{
                  display: 'block', textDecoration: 'none', fontFamily: B,
                  color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 10,
                }}>
                  {label}
                </a>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: H, fontWeight: 800, color: C.gold, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 18 }}>
                Contact
              </div>
              <div style={{ fontFamily: B, color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 2.1 }}>
                <div>📍 Hyderabad</div>
                <div>📞 +91 90637 44404</div>
                <div>✉️ aatashala1@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontFamily: B, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            © 2026 Aatashala Private Limited. All rights reserved.
          </p>
          <p style={{ fontFamily: B, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Made with ❤️ in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg }}>
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Games />
      <Food />
      <Events />
      <Corporate />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  )
}
