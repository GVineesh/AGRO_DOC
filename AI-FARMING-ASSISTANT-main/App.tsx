
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './views/Home';
import CropRec from './views/CropRec';
import DiseaseDetect from './views/DiseaseDetect';
import Irrigation from './views/Irrigation';
import Chat from './views/Chat';
import About from './views/About';
import { AppView } from './types';
import { AppProvider } from './context/AppContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'crop-rec': return <CropRec />;
      case 'disease': return <DiseaseDetect />;
      case 'irrigation': return <Irrigation />;
      case 'chat': return <Chat />;
      case 'about': return <About />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <Navbar />
      
      <main className="main-content">
        <div className="content-container">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
