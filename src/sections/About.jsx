import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-container">
      
      <div className="grid-2" style={{ alignItems: 'center', gap: '4rem', maxWidth: '1000px' }}>
        
        {/* Left: Grayscale Image transition to color */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', aspectRatio: '4/5', position: 'relative', borderRadius: '24px', overflow: 'hidden' }}
        >
          {/* Placeholder for the image. Assuming user has an image, or we use a gradient placeholder */}
          <div 
            style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
              position: 'absolute', inset: 0,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: 'var(--text-secondary)'
            }}
            className="grayscale-to-color"
          >
            [Harshad Portrait Image]
          </div>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--glass-border)', borderRadius: '24px' }}></div>
        </motion.div>

        {/* Right: Text and Role */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="playfair italic text-gold" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Harshad Patil
          </h2>
          <div className="tracking-wide-upper text-gold" style={{ fontSize: '12px', fontWeight: 300, marginBottom: '2rem' }}>
            Full Stack Developer & AI Engineer
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-body text-gray" 
            style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}
          >
            I am a passionate software engineer who has completed my Bachelor's degree in Information Technology from the Universal College of Engineering. 
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-body text-gray" 
            style={{ marginBottom: '2rem', lineHeight: 1.8 }}
          >
            My focus lies at the intersection of modern web development and artificial intelligence. I build high-performance systems that not only look visually stunning but solve complex, real-world problems using machine learning and scalable architectures.
          </motion.p>

          <motion.a 
            href="#projects" 
            className="btn-bordered" 
            style={{ display: 'inline-flex', textDecoration: 'none' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: 'var(--accent-gold)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.a>
        </motion.div>

      </div>
      
      {/* Inline style for hover effect */}
      <style>{`
        .grayscale-to-color {
          filter: grayscale(100%);
          transition: filter 0.7s var(--transition-bezier);
        }
        .grayscale-to-color:hover {
          filter: grayscale(0%);
        }
      `}</style>
    </section>
  );
}