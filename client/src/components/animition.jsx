'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleText = ({
  text = "PARTICLES",
  className = "",
  particleCount = 50,
  particleColor = "#3b82f6"
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none';
      particle.style.backgroundColor = particleColor;
      particle.style.opacity = Math.random().toString();
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      container.appendChild(particle);
      particles.push(particle);
    }

    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const time = Date.now() * 0.001 + index;
        const x = Math.sin(time * 0.5) * 20 + Math.cos(time * 0.3) * 30;
        const y = Math.cos(time * 0.4) * 15 + Math.sin(time * 0.6) * 25;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = (Math.sin(time * 2) * 0.5 + 0.5).toString();
      });
      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, particleColor]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, ease: "easeOut" }} 
        className="text-4xl md:text-6xl font-bold text-white relative z-10" 
        style={{
          textShadow: `0 0 20px ${particleColor}40`,
          filter: `drop-shadow(0 0 10px ${particleColor}60)`
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default function ParticleView() {
  return <ParticleText text="Welcome to Our Site" />;
}