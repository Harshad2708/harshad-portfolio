import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      role: "Diploma in Electronics & Telecommunication",
      company: "Shivajirao S. Jondhale College of Engineering & Technology",
      date: "Graduated",
      highlight: false,
      desc: "Built a solid foundation in electronics, telecommunications, and core engineering principles."
    },
    {
      role: "B.E. Information Technology",
      company: "Universal College of Engineering",
      date: "Completed",
      highlight: true,
      badge: "Graduated",
      desc: "Specializing in advanced web development, machine learning, and AI integrations. Developing complex academic projects including healthcare prediction systems."
    },
    {
      role: "Embedded Engineer Intern",
      company: "Race Tech Pvt Ltd",
      date: "Past Experience",
      highlight: false,
      desc: "Developed power-control systems, performed hardware testing, and engaged in microcontroller programming and troubleshooting."
    }
  ];

  return (
    <section id="experience" className="section-container">
      <h2 className="heading-lg playfair italic text-center" style={{ marginBottom: '4rem' }}>
        My <span className="text-gold">Journey</span>
      </h2>

      <div className="grid-3" style={{ alignItems: 'center' }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: exp.highlight ? 1.08 : 1.03, 
              boxShadow: exp.highlight ? '0 10px 40px rgba(167, 139, 113, 0.2)' : '0 10px 30px rgba(255,255,255,0.05)',
              borderColor: 'var(--accent-gold)'
            }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6, scale: { type: "spring", stiffness: 300, damping: 20 } }}
            className="glass card"
            style={{ 
              position: 'relative',
              padding: exp.highlight ? '3rem 2rem' : '2rem',
              borderColor: exp.highlight ? 'rgba(167, 139, 113, 0.4)' : 'var(--glass-border)',
              transform: exp.highlight ? 'scale(1.05)' : 'scale(1)',
              zIndex: exp.highlight ? 10 : 1,
              transition: 'border-color 0.3s ease'
            }}
          >
            {exp.badge && (
              <div 
                className="tracking-wide-upper"
                style={{ 
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: 'var(--accent-gold)', color: '#000',
                  padding: '4px 16px', borderRadius: '9999px', fontWeight: 800
                }}
              >
                {exp.badge}
              </div>
            )}

            <div className="text-gold" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {exp.role}
            </div>
            
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {exp.company}
            </div>

            <div className="text-gray tracking-wide-upper" style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
              {exp.date}
            </div>

            <p className="text-body text-gray" style={{ fontSize: '1rem' }}>
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}