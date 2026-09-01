
import React, { useState, useRef } from 'react';
import { Camera, Upload, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { analyzeCropDisease } from '../services/geminiService';
import { DiseaseAnalysis } from '../types';
import Loader from '../components/Loader';
import { useApp } from '../context/AppContext';

const DiseaseDetect: React.FC = () => {
  const { t } = useApp();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await analyzeCropDisease(image);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">{t.disease.title}</h1>
        <p className="opacity-60">{t.disease.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <GlassCard className="flex flex-col items-center">
          <div 
            className={`w-full aspect-square rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden mb-6 relative group cursor-pointer hover:border-accent transition-all
              ${image ? 'border-none' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Crop" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center space-y-4 px-6 opacity-40">
                <Camera size={48} className="mx-auto" />
                <p className="font-medium">{t.disease.upload}</p>
              </div>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

          <button
            onClick={analyzeImage}
            disabled={!image || loading}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 
              ${image && !loading ? 'btn-primary text-white' : 'opacity-20 cursor-not-allowed bg-white/10'}`}
          >
            <Sparkles size={20} />
            {loading ? t.common.analyzing : t.disease.analyze}
          </button>
        </GlassCard>

        <div className="space-y-6">
          {loading ? (
            <Loader message={t.common.loading} />
          ) : analysis ? (
            <GlassCard title={analysis.diseaseName} icon={<AlertCircle size={24} className="text-accent" />}>
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><ShieldCheck size={16} className="text-accent" /> {t.disease.symptoms}</h4>
                  <ul className="list-disc list-inside opacity-70 space-y-1">
                    {analysis.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <h4 className="text-accent font-bold text-xs mb-1 uppercase tracking-wider">{t.disease.treatment}</h4>
                  <p className="opacity-90">{analysis.treatment}</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="opacity-40 font-bold text-xs mb-1 uppercase tracking-wider">{t.disease.prevention}</h4>
                  <p className="opacity-70">{analysis.prevention}</p>
                </div>
              </div>
            </GlassCard>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetect;
