import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Code, ExternalLink, X } from "lucide-react";

// Custom 3D Tilt Card Component
function TiltCard({ project, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className="glass card"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="heading-md">{project.title}</h3>
      <p className="text-gray text-body" style={{ marginBottom: '1rem' }}>{project.shortDesc}</p>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {project.stack.slice(0, 3).map((tech, i) => (
          <span key={i} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: 'rgba(167, 139, 113, 0.1)', color: 'var(--accent-gold)' }}>
            {tech}
          </span>
        ))}
      </div>
      
      <p className="text-gold" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
        Learn more →
      </p>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const projects = [
    { 
      title: "PDF Chat WebApp", 
      shortDesc: "RAG-based AI app using LLaMA-2",
      fullDesc: "An advanced Retrieval-Augmented Generation (RAG) application that allows users to converse with PDF documents.\n\nHow it works: The system extracts text from uploaded PDFs, chunks it, and generates vector embeddings using a Hugging Face model. These embeddings are stored in a Vector DB. When a user asks a question, the app retrieves the most relevant chunks via semantic search and feeds them as context to the LLaMA-2 LLM, which synthesizes a precise, hallucination-free answer.",
      stack: ["React", "Python", "LLaMA-2", "Langchain", "Vector DB"],
      github: "https://github.com/Harshad2708/PDF_Chatbot_translator",
      live: "https://example.com"
    },
    { 
      title: "Healthcare AI", 
      shortDesc: "Disease prediction using ML",
      fullDesc: "A comprehensive machine learning system designed for predictive disease modeling.\n\nHow it works: The AI is trained on thousands of anonymized patient records using Scikit-Learn and TensorFlow to recognize complex patterns in vitals and lifestyle factors. The React frontend provides a secure dashboard where doctors can input a patient's current vitals, which are sent via a Flask API to the trained model for an instant cardiovascular risk assessment.",
      stack: ["Python", "TensorFlow", "React", "Flask", "Pandas"],
      github: "https://github.com",
      live: "https://example.com"
    },
    { 
      title: "Fake Website Detector", 
      shortDesc: "92% phishing detection accuracy",
      fullDesc: "A security tool built to protect users from malicious phishing attempts.\n\nHow it works: The application scrapes the target URL and extracts key features such as URL length, domain age, presence of '@' symbols, and SSL certificate validity. These features are passed into an optimized Random Forest classifier which compares the signature against a massive dataset of known threats, flagging malicious sites in milliseconds.",
      stack: ["Node.js", "Express", "MongoDB", "React", "Scikit-Learn"],
      github: "https://github.com/Harshad2708/URL-Detection-System",
      live: "https://example.com"
    },
  ];

  return (
    <section id="projects" className="section-container">
      <h2 className="heading-lg playfair italic text-center">The Creations</h2>

      <div className="grid-3">
        {projects.map((p, i) => (
          <TiltCard key={i} project={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-center"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, padding: '1rem', overflowY: 'auto' }}
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass"
              style={{ padding: '3rem', maxWidth: '700px', width: '100%', backgroundColor: 'var(--bg-primary)', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <h3 className="heading-lg playfair italic" style={{ marginBottom: '1rem' }}>{selected.title}</h3>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {selected.stack.map((tech, i) => (
                  <span key={i} style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem', borderRadius: '4px', backgroundColor: 'rgba(167, 139, 113, 0.1)', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-gray text-body" style={{ marginBottom: '3rem', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                {selected.fullDesc}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href={selected.github} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  <Code size={20} /> View Source
                </a>
                <a href={selected.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', backgroundColor: 'transparent', border: '2px solid var(--accent-gold)', color: 'var(--accent-gold)' }}>
                  <ExternalLink size={20} /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}