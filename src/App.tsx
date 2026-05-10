import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Star, 
  Dumbbell, 
  Users, 
  Trophy,
  Menu,
  X
} from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LOGO PLACEMENT INSTRUCTIONS:
 * 1. Place your 'logo.png' in the 'public/' folder of this project.
 * 2. Update the LOGO_PATH variable below to "/logo.png".
 */
const LOGO_PATH = "logo.png"; 

// --- 3D Particle Component (Internal to fix import issues) ---
function ParticleBackground() {
  const points = useRef<THREE.Points>(null!);
  const count = 1500;
  
  const particlesPosition = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.04;
      points.current.rotation.x = time * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22c55e"
        sizeAttenuation={true}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

// --- Icons ---
const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Facebook = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const GymXApp = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative w-32 h-32 md:w-48 md:h-48"
        >
          <img 
            src={LOGO_PATH} 
            alt="GymX" 
            className="w-full h-full object-contain"
            onError={(e) => {
               // Fallback if URL fails
               (e.target as HTMLImageElement).src = "https://img.freepik.com/premium-vector/fitness-gym-logo-design-template-with-gym-equipment_652010-337.jpg";
            }}
          />
        </motion.div>
        <div className="mt-8 w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-green-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={LOGO_PATH} 
              alt="GymX" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://img.freepik.com/premium-vector/fitness-gym-logo-design-template-with-gym-equipment_652010-337.jpg";
              }}
            />
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase leading-none">GymX</span>
              <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Fitness Hub</span>
            </div>
          </a>
          
          <div className="hidden md:flex gap-10 items-center">
            <a href="#about" className="text-xs font-bold uppercase tracking-widest hover:text-green-500 transition-colors">About</a>
            <a href="#services" className="text-xs font-bold uppercase tracking-widest hover:text-green-500 transition-colors">Services</a>
            <a href="#location" className="text-xs font-bold uppercase tracking-widest hover:text-green-500 transition-colors">Location</a>
            <a href="https://wa.me/7306062810" className="bg-green-500 text-black px-6 py-2 rounded-full font-black text-xs hover:bg-green-400 transition-all flex items-center gap-2 group uppercase">
              Join Hub <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 z-30 bg-black flex flex-col justify-center px-10 md:hidden"
          >
            <div className="flex flex-col gap-8 text-4xl font-black uppercase italic">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a>
              <a href="tel:7306062810" className="text-green-500 text-2xl">Call Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ParticleBackground />
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-[10rem] font-black mb-6 leading-none uppercase italic tracking-tighter">
              FUEL <br /> <span className="text-green-500">YOUR SOUL</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto font-medium">
              Join Cherpulassery's most advanced fitness community. Precision equipment. Master coaching. Zero excuses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/7306062810" className="bg-green-500 text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform uppercase italic">
                Get Started
              </a>
              <a href="#services" className="bg-white/5 backdrop-blur-md border border-white/10 px-10 py-4 rounded-full font-black text-lg hover:bg-white/10 transition-all uppercase italic">
                Our Programs
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="4.9" label="Rating" />
          <StatCard number="100%" label="Energy" />
          <StatCard number="2023" label="Since" />
          <StatCard number="12/7" label="Support" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="rounded-3xl overflow-hidden aspect-square border border-white/10 bg-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=60" 
                  alt="Gym" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-2xl -z-10 blur-2xl opacity-20" />
          </div>
          <div>
            <h2 className="text-5xl font-black uppercase italic mb-8">Elevate Your <span className="text-green-500">Performance</span></h2>
            <p className="text-zinc-400 text-xl leading-relaxed mb-8">
              GymX Fitness Hub is Cherpulassery's premier training facility. We've combined industrial grit with modern technology to create a space where athletes are made.
            </p>
            <div className="space-y-4">
              <Feature icon={<Trophy size={20}/>} text="Award Winning Facility" />
              <Feature icon={<Users size={20}/>} text="Supportive Community" />
              <Feature icon={<Dumbbell size={20}/>} text="World Class Equipment" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black uppercase italic mb-16 text-center">Power Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceItem title="Strength" img="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" />
            <ServiceItem title="Cardio" img="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80" />
            <ServiceItem title="Personal" img="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black uppercase italic mb-10">Visit The Hub</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-green-500" />
                <div>
                  <h4 className="font-bold text-xl uppercase italic">Location</h4>
                  <p className="text-zinc-500">Cherpulassery, Kerala 679502</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-green-500" />
                <div>
                  <h4 className="font-bold text-xl uppercase italic">Hours</h4>
                  <p className="text-zinc-500">Mon-Sat: 4:30 AM - 10:00 PM</p>
                  <p className="text-zinc-500">Sun: 5:30 AM - 10:00 AM</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
               <a href="tel:7306062810" className="bg-green-500 text-black px-10 py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 uppercase italic">
                  <Phone /> 7306062810
               </a>
            </div>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale invert brightness-75 contrast-125">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15668.514418641913!2d76.3116965!3d10.8778648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d1590e0b37c3%3A0xc023d50849c76b9b!2sCherpulassery%2C%20Kerala%20679502!5e0!3m2!1sen!2sin!4v1700000000000" 
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
              />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <img 
              src={LOGO_PATH} 
              alt="GymX" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://img.freepik.com/premium-vector/fitness-gym-logo-design-template-with-gym-equipment_652010-337.jpg";
              }}
            />
            <span className="font-black text-2xl tracking-tighter uppercase italic">GymX Fitness Hub</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-green-500 hover:text-black transition-all"><Instagram /></a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-green-500 hover:text-black transition-all"><Facebook /></a>
          </div>
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">© 2026 GymX Fitness Hub</p>
        </div>
      </footer>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center">
    <div className="text-5xl font-black text-green-500 italic mb-2">{number}</div>
    <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{label}</div>
  </div>
);

const Feature = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center border border-green-500/20">{icon}</div>
    <span className="font-bold text-lg italic uppercase">{text}</span>
  </div>
);

const ServiceItem = ({ title, img }: { title: string, img: string }) => (
  <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-white/5 shadow-2xl bg-zinc-900">
    <img 
      src={`${img}&w=800&q=60`} 
      alt={title} 
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    <div className="absolute bottom-8 left-8">
      <h3 className="text-4xl font-black uppercase italic group-hover:text-green-500 transition-colors">{title}</h3>
    </div>
  </div>
);

export default GymXApp;
