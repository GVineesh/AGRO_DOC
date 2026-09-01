import React from 'react';
import { LayoutDashboard, Leaf, Bug, Droplets, MessageSquare, Info, Menu, X } from 'lucide-react';
import { AppView } from '../types';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useApp();

  const menuItems = [
    { id: 'home', icon: LayoutDashboard, label: t.nav.dashboard },
    { id: 'crop-rec', icon: Leaf, label: t.nav.cropAdvice },
    { id: 'disease', icon: Bug, label: t.nav.disease },
    { id: 'irrigation', icon: Droplets, label: t.nav.irrigation },
    { id: 'chat', icon: MessageSquare, label: t.nav.chat },
    { id: 'about', icon: Info, label: t.nav.about },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--primary)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)'
            }}>
              <Leaf style={{ color: 'white' }} size={24} />
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>AgroAssist</h1>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id as AppView);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: isActive ? '0 4px 12px rgba(21, 128, 61, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--primary-light)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="glass-card" style={{ marginTop: 'auto', padding: '1rem' }}>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)', 
              marginBottom: '0.5rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              fontWeight: '700' 
            }}>
              System Status
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                background: 'var(--primary)', 
                borderRadius: '50%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{t.common.poweredBy}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;