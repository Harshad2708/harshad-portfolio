import { motion } from "framer-motion";
import { Code, Briefcase, MessageSquare, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-container" style={{ paddingBottom: '4rem' }}>
      
      <div className="glass card" style={{ width: '100%', padding: '4rem' }}>
        <div className="grid-2" style={{ gap: '4rem' }}>
          
          {/* Left Column: Branding and Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="playfair italic" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Harshad<span className="text-gold">.dev</span>
            </div>
            
            <p className="text-gray text-body" style={{ marginBottom: '2.5rem', maxWidth: '400px' }}>
              Engineering sophisticated digital experiences at the intersection of AI and modern web architectures.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Code, Briefcase, MessageSquare].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="flex-center social-icon"
                  style={{ 
                    width: '48px', height: '48px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.3s var(--transition-bezier)'
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact / Digest */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <h3 className="heading-md" style={{ marginBottom: '0.5rem', fontFamily: 'Inter', fontWeight: 600 }}>Let's Connect</h3>
            <p className="text-gray text-body" style={{ marginBottom: '2rem' }}>
              Have an idea or a project in mind? Reach out directly to <span className="text-gold">harshadpatil841@gmail.com</span>
            </p>

            {/* Input Field simulating the requested 'Digest' search bar */}
            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative', maxWidth: '400px' }}>
              <input 
                type="email" 
                placeholder="Send me a message..." 
                style={{ 
                  width: '100%', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '9999px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'Inter'
                }} 
              />
              <button 
                className="flex-center btn-primary"
                style={{ 
                  position: 'absolute', 
                  right: '0.5rem', 
                  top: '0.5rem', 
                  bottom: '0.5rem',
                  width: 'calc(100% - 1rem)', // Keep small for circular effect
                  maxWidth: '3rem',
                  padding: '0',
                  borderRadius: '50%'
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </motion.div>

        </div>
      </div>

      <style>{`
        .social-icon:hover {
          color: var(--accent-gold) !important;
          border-color: var(--accent-gold) !important;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(167, 139, 113, 0.2);
        }
      `}</style>

    </section>
  );
}