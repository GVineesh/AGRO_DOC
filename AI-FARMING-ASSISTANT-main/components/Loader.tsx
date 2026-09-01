
import React from 'react';

const Loader: React.FC<{ message?: string }> = ({ message = "Analyzing data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-emerald-400 rounded-full animate-spin"></div>
      </div>
      <p className="text-white/70 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
