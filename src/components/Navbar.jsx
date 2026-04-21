import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const links = ["About", "Skills", "Experience", "Projects"];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blurValue = useTransform(scrollY, [0, 50], [0, 10]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="glass-nav"
      style={{ 
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: useTransform(bgOpacity, v => `rgba(10, 10, 10, ${v})`),
        backdropFilter: useTransform(blurValue, v => `blur(${v}px)`),
        borderBottom: useTransform(scrollY, [0, 50], ['1px solid transparent', '1px solid rgba(255,255,255,0.05)'])
      }}
    >
      <div className="playfair italic" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
        Harshad<span className="text-gold">.dev</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {links.map((link, i) => (
          <div 
            key={link} 
            style={{ position: 'relative', padding: '0.5rem 1rem' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i && (
              <motion.div
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(167, 139, 113, 0.15)',
                  borderRadius: '9999px', zIndex: -1
                }}
              />
            )}
            <motion.a
              href={`#${link.toLowerCase()}`}
              className="tracking-wide-upper"
              style={{ textDecoration: 'none', color: hoveredIndex === i ? 'var(--accent-gold)' : 'var(--text-gray)', transition: 'color 0.3s ease' }}
            >
              {link}
            </motion.a>
          </div>
        ))}
        
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167,139,113,0.3)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginLeft: '1rem',
            backgroundColor: 'var(--accent-gold)',
            color: '#000',
            padding: '0.6rem 1.5rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease'
          }}
        >
          Contact Me
        </motion.a>
      </div>
    </motion.nav>
  );
}