import { motion } from "framer-motion";
import { Code, Server, Database, BrainCircuit, Layout, Cloud, Cpu, PenTool } from "lucide-react";

export default function Skills() {
  const skills = [
    { title: "Frontend Engineering", desc: "React, Tailwind, HTML5, CSS3", icon: <Layout /> },
    { title: "Backend Systems", desc: "Node.js, Express, REST APIs", icon: <Server /> },
    { title: "Database Architecture", desc: "MongoDB, NoSQL, Data Modeling", icon: <Database /> },
    { title: "Artificial Intelligence", desc: "LLaMA-2, NLP, Machine Learning", icon: <BrainCircuit /> },
    { title: "Programming Logic", desc: "Python, C++, JavaScript", icon: <Code /> },
    { title: "Cloud Integration", desc: "AWS, Deployment, Scalability", icon: <Cloud /> },
    { title: "Embedded Systems", desc: "Microcontrollers, Hardware Testing", icon: <Cpu /> },
    { title: "UI/UX Prototyping", desc: "Figma, Wireframing, Interaction", icon: <PenTool /> },
  ];

  return (
    <section id="skills" className="section-container">
      <h2 className="heading-lg playfair italic text-center" style={{ marginBottom: '4rem' }}>
        The <span className="text-gold">Arsenal</span>
      </h2>

      <div className="grid-4">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass card feature-card"
            whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(167, 139, 113, 0.5)', boxShadow: '0 10px 30px rgba(167, 139, 113, 0.15)' }}
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'box-shadow 0.3s ease' }}
          >
            <motion.div 
              className="icon-container flex-center"
              style={{ 
                width: '48px', height: '48px', 
                backgroundColor: 'rgba(167, 139, 113, 0.1)', 
                borderRadius: '12px',
                color: 'var(--accent-gold)'
              }}
              whileHover={{ scale: 1.1 }}
            >
              {skill.icon}
            </motion.div>
            
            <div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '0.25rem' }}>
                {skill.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
                {skill.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .feature-card:hover .icon-container {
          transform: scale(1.1);
          transition: transform 0.3s var(--transition-bezier);
        }
      `}</style>
    </section>
  );
}