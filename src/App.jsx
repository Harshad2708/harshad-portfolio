import { motion, useScroll, useSpring } from "framer-motion";
import Chatbot from "./components/Chatbot";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      {/* Global Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "var(--accent-gold)",
          transformOrigin: "0%",
          zIndex: 9999,
          boxShadow: "0 0 20px rgba(167, 139, 113, 0.8)",
          borderRadius: "0 2px 2px 0"
        }}
      />
      
      <Chatbot />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;