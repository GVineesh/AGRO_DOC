
import React, { useState } from 'react';
import { Droplets, Thermometer, Waves, Clock, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { getIrrigationAdvice } from '../services/geminiService';
import { IrrigationAdvice } from '../types';
import Loader from '../components/Loader';
import { useApp } from '../context/AppContext';

const Irrigation: React.FC = () => {
  const { t } = useApp();
  const [data, setData] = useState({ moisture: '45', temp: '30', cropType: 'Corn' });
  const [advice, setAdvice] = useState<IrrigationAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getIrrigationAdvice(data);
      setAdvice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30">
          <Waves className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t.irrigation.title}</h1>
          <p className="opacity-60 text-sm">{t.irrigation.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard title={t.nav.settings}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <label className="opacity-60 font-medium">{t.irrigation.moistureLabel}</label>
                <span className="text-accent font-bold">{data.moisture}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={data.moisture}
                onChange={(e) => setData({...data, moisture: e.target.value})}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium opacity-60">{t.irrigation.tempLabel} (°C)</label>
              <input 
                type="number" value={data.temp}
                onChange={(e) => setData({...data, temp: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium opacity-60">{t.irrigation.cropType}</label>
              <input 
                type="text" value={data.cropType}
                onChange={(e) => setData({...data, cropType: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <button type="submit" className="w-full py-4 btn-primary text-white font-bold rounded-xl flex items-center justify-center gap-2">
              <Droplets size={20} /> {t.irrigation.button}
            </button>
          </form>
        </GlassCard>

        <div className="space-y-6">
          {loading ? (
            <Loader message={t.common.loading} />
          ) : advice ? (
            <GlassCard title={t.irrigation.schedule} icon={<Clock size={20} className="text-accent" />}>
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl mb-4 text-center font-bold text-lg">
                {advice.schedule}
              </div>
              <div className="text-sm space-y-4">
                <div>
                  <h4 className="opacity-40 font-bold text-[10px] uppercase mb-1">{t.irrigation.amount}</h4>
                  <p className="font-medium">{advice.amount}</p>
                </div>
                <div>
                  <h4 className="opacity-40 font-bold text-[10px] uppercase mb-1">{t.crop.reasoning}</h4>
                  <p className="opacity-70 leading-relaxed">{advice.reasoning}</p>
                </div>
              </div>
            </GlassCard>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Irrigation;
