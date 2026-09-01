
import React, { useState } from 'react';
import { CloudSun, Wind, Droplets, MapPin, Search, Calendar, ChevronRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { getWeatherAdvice } from '../services/geminiService';
import Loader from '../components/Loader';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { t } = useApp();
  const [city, setCity] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!city) return;
    setLoading(true);
    try {
      const res = await getWeatherAdvice(city);
      setAdvice(res || 'Unable to fetch advice.');
    } catch (err) {
      setAdvice('Error fetching localized advice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t.home.welcome}</h1>
          <p className="text-muted">{t.home.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 glass p-2 px-4 rounded-xl">
          <Calendar className="text-primary" size={20} />
          <span className="font-medium opacity-80">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-medium uppercase tracking-wider">{t.home.moisture}</span>
            <Droplets className="text-blue-500" size={20} />
          </div>
          <div className="text-3xl font-bold">64%</div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-medium uppercase tracking-wider">{t.home.temp}</span>
            <CloudSun className="text-orange-500" size={20} />
          </div>
          <div className="text-3xl font-bold">28°C</div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-medium uppercase tracking-wider">{t.home.wind}</span>
            <Wind className="text-cyan-500" size={20} />
          </div>
          <div className="text-3xl font-bold">12 km/h</div>
        </GlassCard>
      </div>

      <GlassCard title={t.home.weatherTitle} icon={<MapPin size={24} />}>
        <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder={t.home.weatherPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full"
            />
          </div>
          <button type="submit" className="btn-primary">
            {t.home.getAdvice}
          </button>
        </form>

        {loading ? (
          <Loader message={t.common.loading} />
        ) : advice ? (
          <div className="glass rounded-2xl p-6 max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {advice}
            </div>
          </div>
        ) : null}
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title={t.home.tasks}>
          <div className="space-y-4">
            {[
              { title: 'Apply Fertilizer', time: 'In 2 days' },
              { title: 'Irrigation Cycle', time: 'Today at 6 PM' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass rounded-xl group cursor-pointer">
                <div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors">{task.title}</h4>
                  <p className="text-muted text-xs">{task.time}</p>
                </div>
                <ChevronRight className="text-muted opacity-40" size={20} />
              </div>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard title={t.home.market}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="font-medium">Wheat (Winter)</span>
              <span className="text-primary font-bold">+5.2%</span>
            </div>
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="font-medium">Soybeans</span>
              <span className="text-red-500 font-bold">-1.8%</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Home;
