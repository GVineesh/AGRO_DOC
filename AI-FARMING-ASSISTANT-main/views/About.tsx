
import React from 'react';
import { Shield, Cpu, Zap, Heart } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn pb-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">About AgroAssist</h1>
        <p className="text-xl text-white/60">Bridging the gap between cutting-edge Artificial Intelligence and sustainable farming practices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard icon={<Cpu className="text-emerald-400" />} title="Modern AI Engine">
          <p className="text-white/70 leading-relaxed">
            Powered by Google's Gemini 3 Flash model, AgroAssist provides low-latency, highly accurate agricultural reasoning. From analyzing soil chemistry to identifying complex leaf diseases, our AI is trained on vast datasets of botanical and agronomical research.
          </p>
        </GlassCard>

        <GlassCard icon={<Shield className="text-blue-400" />} title="Farmer-First Privacy">
          <p className="text-white/70 leading-relaxed">
            Your data stays yours. Images uploaded for disease detection are processed in real-time and not used for training without explicit consent. We believe technology should empower, not exploit.
          </p>
        </GlassCard>

        <GlassCard icon={<Zap className="text-yellow-400" />} title="Real-time Insights">
          <p className="text-white/70 leading-relaxed">
            By integrating Google Search grounding, AgroAssist can check live weather conditions and localized market trends to provide advice that is relevant to YOUR specific location and current events.
          </p>
        </GlassCard>

        <GlassCard icon={<Heart className="text-red-400" />} title="Sustainable Future">
          <p className="text-white/70 leading-relaxed">
            Our goal is to optimize water usage, reduce unnecessary chemical fertilizer application, and improve crop yields worldwide. Technology is the key to feeding a growing global population sustainably.
          </p>
        </GlassCard>
      </div>

      <div className="glass p-10 rounded-3xl text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Project Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['React 18', 'TypeScript', 'Tailwind CSS', 'Gemini AI SDK', 'Lucide Icons', 'Vite'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium border border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-center text-white/20 text-sm">
        &copy; 2024 AgroAssist AI. Developed with ❤️ for the global farming community.
      </p>
    </div>
  );
};

export default About;
