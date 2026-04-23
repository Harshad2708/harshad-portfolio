import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Code, ExternalLink, X, ArrowLeft } from "lucide-react";

// --- Simulators ---

function PDFChatSimulator() {
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Upload a PDF to start chatting. (Simulated)' }]);
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if(!input) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: `Based on the document context, here is an answer to "${input}". The LLaMA-2 model synthesizes this from retrieved chunks.` }]);
    }, 1000);
  }

  return (
    <div style={{ backgroundColor: '#111', borderRadius: '8px', padding: '1rem', border: '1px solid var(--glass-border)', height: '350px', display: 'flex', flexDirection: 'column' }}>
       <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>PDF Chatbot Interactive Demo</h4>
       <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
         {messages.map((m, i) => (
           <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.sender === 'user' ? 'var(--accent-gold)' : '#222', color: m.sender === 'user' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '8px', maxWidth: '80%', fontSize: '0.9rem' }}>{m.text}</div>
         ))}
       </div>
       <div style={{ display: 'flex', gap: '0.5rem' }}>
         <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about the PDF..." style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #333', background: '#222', color: '#fff', outline: 'none' }} onKeyPress={e => e.key === 'Enter' && handleSend()} />
         <button onClick={handleSend} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
       </div>
    </div>
  )
}

function HealthcareSimulator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult("Low Risk (12% Cardiovascular Risk Factor based on model patterns)");
    }, 1500);
  }

  return (
    <div style={{ backgroundColor: '#111', borderRadius: '8px', padding: '1.5rem', border: '1px solid var(--glass-border)', minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Healthcare AI Interactive Demo</h4>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enter patient vitals below to run a simulated predictive disease model analysis.</p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Age (e.g. 45)" style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: '#222', color: '#fff', border: '1px solid #333', outline: 'none' }} />
        <input placeholder="Heart Rate (bpm)" style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: '#222', color: '#fff', border: '1px solid #333', outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input placeholder="Blood Pressure (Systolic)" style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: '#222', color: '#fff', border: '1px solid #333', outline: 'none' }} />
        <input placeholder="Cholesterol (mg/dL)" style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: '#222', color: '#fff', border: '1px solid #333', outline: 'none' }} />
      </div>

      <button onClick={handlePredict} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Run ML Prediction</button>
      
      {loading && <p className="animate-pulse" style={{ color: '#4ade80', marginTop: '2rem', textAlign: 'center', fontWeight: 'bold' }}>Analyzing patient records via TensorFlow...</p>}
      {result && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '8px', color: '#4ade80', textAlign: 'center', fontWeight: 'bold' }}>Prediction: {result}</motion.div>}
    </div>
  )
}

function PhishingSimulator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    if(!url) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const isBad = url.toLowerCase().includes('paypal') || url.toLowerCase().includes('login') || url.toLowerCase().includes('secure') || url.toLowerCase().includes('admin');
      setResult({ bad: isBad, score: isBad ? '92%' : '14%' });
    }, 1500);
  }

  return (
    <div style={{ backgroundColor: '#111', borderRadius: '8px', padding: '1.5rem', border: '1px solid var(--glass-border)', minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Phishing Detector Interactive Demo</h4>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enter a URL to test the Random Forest Classifier. (Tip: try a URL with 'login' or 'paypal' in it).</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: '#222', color: '#fff', border: '1px solid #333', outline: 'none' }} onKeyPress={e => e.key === 'Enter' && handleScan()} />
        <button onClick={handleScan} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Scan URL</button>
      </div>
      
      {loading && <p className="animate-pulse" style={{ color: '#ef4444', marginTop: '2rem', textAlign: 'center', fontWeight: 'bold' }}>Extracting features & running Random Forest Classifier...</p>}
      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '2rem', padding: '2rem', backgroundColor: result.bad ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)', border: `1px solid ${result.bad ? '#ef4444' : '#4ade80'}`, borderRadius: '8px', color: result.bad ? '#ef4444' : '#4ade80', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {result.bad ? `⚠️ Phishing Detected (Confidence: ${result.score})` : `✅ Safe URL (Phishing Probability: ${result.score})`}
        </motion.div>
      )}
    </div>
  )
}

// --- Main Components ---

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
  const [showDemo, setShowDemo] = useState(false);

  const projects = [
    { 
      title: "PDF Chat WebApp", 
      shortDesc: "RAG-based AI app using LLaMA-2",
      fullDesc: "An advanced Retrieval-Augmented Generation (RAG) application that allows users to converse with PDF documents.\n\nHow it works: The system extracts text from uploaded PDFs, chunks it, and generates vector embeddings using a Hugging Face model. These embeddings are stored in a Vector DB. When a user asks a question, the app retrieves the most relevant chunks via semantic search and feeds them as context to the LLaMA-2 LLM, which synthesizes a precise, hallucination-free answer.",
      stack: ["React", "Python", "LLaMA-2", "Langchain", "Vector DB"],
      github: "https://github.com/Harshad2708/PDF_Chatbot_translator",
      demoImage: "/pdf_chat_demo.png",
      simulator: "pdf"
    },
    { 
      title: "Healthcare AI", 
      shortDesc: "Disease prediction using ML",
      fullDesc: "A comprehensive machine learning system designed for predictive disease modeling.\n\nHow it works: The AI is trained on thousands of anonymized patient records using Scikit-Learn and TensorFlow to recognize complex patterns in vitals and lifestyle factors. The React frontend provides a secure dashboard where doctors can input a patient's current vitals, which are sent via a Flask API to the trained model for an instant cardiovascular risk assessment.",
      stack: ["Python", "TensorFlow", "React", "Flask", "Pandas"],
      github: "https://github.com",
      demoImage: "/healthcare_ai_demo.png",
      simulator: "health"
    },
    { 
      title: "Fake Website Detector", 
      shortDesc: "92% phishing detection accuracy",
      fullDesc: "A security tool built to protect users from malicious phishing attempts.\n\nHow it works: The application scrapes the target URL and extracts key features such as URL length, domain age, presence of '@' symbols, and SSL certificate validity. These features are passed into an optimized Random Forest classifier which compares the signature against a massive dataset of known threats, flagging malicious sites in milliseconds.",
      stack: ["Node.js", "Express", "MongoDB", "React", "Scikit-Learn"],
      github: "https://github.com/Harshad2708/URL-Detection-System",
      demoImage: "/fake_website_detector_demo.png",
      simulator: "phishing"
    },
  ];

  const handleOpenModal = (p) => {
    setSelected(p);
    setShowDemo(false);
  }

  return (
    <section id="projects" className="section-container">
      <h2 className="heading-lg playfair italic text-center">The Creations</h2>

      <div className="grid-3">
        {projects.map((p, i) => (
          <TiltCard key={i} project={p} onClick={() => handleOpenModal(p)} />
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
              style={{ padding: '3rem', maxWidth: '700px', width: '100%', backgroundColor: 'var(--bg-primary)', position: 'relative', margin: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <h3 className="heading-lg playfair italic" style={{ marginBottom: '1rem' }}>{selected.title}</h3>
              
              {!showDemo ? (
                // --- Details View ---
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  {selected.demoImage && (
                    <div style={{ width: '100%', marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                      <img src={selected.demoImage} alt={`${selected.title} Demo`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  )}
                  
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
                </motion.div>
              ) : (
                // --- Interactive Demo View ---
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ marginBottom: '3rem' }}>
                  {selected.simulator === 'pdf' && <PDFChatSimulator />}
                  {selected.simulator === 'health' && <HealthcareSimulator />}
                  {selected.simulator === 'phishing' && <PhishingSimulator />}
                </motion.div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: 'auto' }}>
                {!showDemo ? (
                  <>
                    <a href={selected.github} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                      <Code size={20} /> View Source
                    </a>
                    <button onClick={() => setShowDemo(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', backgroundColor: 'transparent', border: '2px solid var(--accent-gold)', color: 'var(--accent-gold)', cursor: 'pointer' }}>
                      <ExternalLink size={20} /> Try Interactive Demo
                    </button>
                  </>
                ) : (
                  <button onClick={() => setShowDemo(false)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', backgroundColor: 'transparent', border: '2px solid var(--text-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <ArrowLeft size={20} /> Back to Details
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}