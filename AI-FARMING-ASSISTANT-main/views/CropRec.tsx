
import React, { useState } from 'react';
import { Leaf, Thermometer, Droplet, CloudRain, Microscope } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { getCropRecommendation } from '../services/geminiService';
import { CropRecommendation } from '../types';
import Loader from '../components/Loader';
import { useApp } from '../context/AppContext';

const CropRec: React.FC = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    soilType: 'Loamy',
    ph: '6.5',
    temp: '25',
    humidity: '60',
    rainfall: '1000'
  });
  const [results, setResults] = useState<CropRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recs = await getCropRecommendation(formData);
      setResults(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.crop.title}</h1>
        
        <GlassCard>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-accent uppercase tracking-wider">{t.crop.soilType}</label>
              <select 
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="Loamy">Loamy</option>
                <option value="Sandy">Sandy</option>
                <option value="Clayey">Clayey</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <Microscope size={14} /> {t.crop.ph}
              </label>
              <input 
                type="number" step="0.1" value={formData.ph}
                onChange={(e) => setFormData({...formData, ph: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <Thermometer size={14} /> {t.crop.temp}
              </label>
              <input 
                type="number" value={formData.temp}
                onChange={(e) => setFormData({...formData, temp: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <Droplet size={14} /> {t.crop.humidity}
              </label>
              <input 
                type="number" value={formData.humidity}
                onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <button 
              type="submit"
              className="md:col-span-2 py-4 btn-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Leaf size={20} /> {t.crop.button}
            </button>
          </form>
        </GlassCard>
      </div>

      {loading ? (
        <Loader message={t.common.loading} />
      ) : results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fadeIn">
          {results.map((crop, i) => (
            <GlassCard key={i} title={crop.cropName} icon={<Leaf size={20} className="text-accent" />}>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-accent text-[10px] font-bold uppercase mb-1">{t.crop.reasoning}</h4>
                  <p className="opacity-80 leading-relaxed">{crop.reasoning}</p>
                </div>
                <div>
                  <h4 className="text-accent text-[10px] font-bold uppercase mb-1">{t.crop.conditions}</h4>
                  <p className="opacity-80 leading-relaxed">{crop.optimalConditions}</p>
                </div>
                <div className="p-3 bg-accent/5 rounded-xl border border-accent/20">
                  <h4 className="text-accent text-[10px] font-bold uppercase mb-1">{t.crop.tips}</h4>
                  <p className="italic">{crop.plantingTips}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropRec;
