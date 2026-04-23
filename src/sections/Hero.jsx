import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="section-container" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Neural SVG Connections (Background) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {/* Dynamic Bezier curves connecting the center to satellites */}
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} d="M 50% 50% Q 30% 20%, 15% 30%" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" className="animate-pulse-branch" />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} d="M 50% 50% Q 70% 20%, 85% 40%" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" className="animate-pulse-branch" style={{ animationDelay: '1s' }} />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }} d="M 50% 50% Q 20% 80%, 30% 85%" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" className="animate-pulse-branch" style={{ animationDelay: '2s' }} />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }} d="M 50% 50% Q 80% 80%, 75% 85%" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" className="animate-pulse-branch" style={{ animationDelay: '0.5s' }} />
        
        {/* Secondary dashed flow lines */}
        <path d="M 50% 50% Q 30% 20%, 15% 30%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5 15" />
        <path d="M 50% 50% Q 70% 20%, 85% 40%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5 15" />

        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="10%" stopColor="#a78b71" />
            <stop offset="90%" stopColor="#c9b8a0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Satellite Cards */}
      <motion.div 
        className="glass"
        style={{ position: 'absolute', top: '25%', left: '10%', padding: '1rem', width: '220px', zIndex: 10, filter: 'grayscale(100%)', transition: 'all 0.7s ease' }}
        whileHover={{ scale: 1.05, filter: 'grayscale(0%)', boxShadow: '0 0 60px rgba(167, 139, 113, 0.3)' }}
      >
        <img 
          src="/full-stack.png" 
          alt="Full Stack Concept" 
          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.5rem', display: 'block' }} 
        />
        <p className="tracking-wide-upper text-gray text-center" style={{ marginTop: '0.5rem' }}>Full Stack Logic</p>
      </motion.div>

      <motion.div 
        className="glass"
        style={{ position: 'absolute', top: '35%', right: '8%', padding: '1rem', width: '250px', zIndex: 10, filter: 'grayscale(100%)', transition: 'all 0.7s ease' }}
        whileHover={{ scale: 1.05, filter: 'grayscale(0%)', boxShadow: '0 0 60px rgba(167, 139, 113, 0.3)' }}
      >
        <img 
          src="/ai-eng.png" 
          alt="AI Engineering Concept" 
          style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.5rem', display: 'block' }} 
        />
        <p className="tracking-wide-upper text-gray text-center" style={{ marginTop: '0.5rem' }}>AI Engineering</p>
      </motion.div>

      {/* Central Interactive Node */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass glass-node flex-center"
        style={{ 
          position: 'relative',
          zIndex: 20,
          width: '100%', 
          maxWidth: '800px', 
          aspectRatio: '16/9',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '4rem'
        }}
      >
        {/* Live Notification Pill */}
        <div 
          className="glass flex-center" 
          style={{ position: 'absolute', top: '-3rem', padding: '0.5rem 1rem', borderRadius: '9999px', gap: '0.5rem', backgroundColor: 'rgba(10,10,10,0.8)' }}
        >
          <div className="animate-breathe" style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }}></div>
          <span style={{ color: '#4ade80', fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em' }}>LIVE</span>
          <span style={{ color: 'white', fontSize: '12px' }}>AVAILABLE FOR HIRE</span>
        </div>

        <motion.h1 
          className="heading-xl playfair italic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Engineering the <span className="text-gold">Future</span> of the Web
        </motion.h1>

        <motion.p 
          className="text-body text-gray"
          style={{ maxWidth: '500px', margin: '2rem 0' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I am Harshad Patil. A Full Stack Developer & AI Engineer crafting intelligent, high-performance digital experiences.
        </motion.p>

        <motion.div 
          style={{ display: 'flex', gap: '1rem' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.a whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167,139,113,0.4)' }} whileTap={{ scale: 0.95 }} href="#projects" className="btn-primary" style={{ textDecoration: 'none' }}>View Work</motion.a>
          <motion.a whileHover={{ scale: 1.05, borderColor: 'var(--accent-gold)' }} whileTap={{ scale: 0.95 }} href="#contact" className="btn-bordered" style={{ textDecoration: 'none' }}>Contact Me</motion.a>
        </motion.div>
      </motion.div>

    </section>
  );
}