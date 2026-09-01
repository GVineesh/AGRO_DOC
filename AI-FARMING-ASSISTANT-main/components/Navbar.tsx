import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../lang/translations';

const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme } = useApp();

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={18} style={{ color: 'var(--primary)' }} />
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{
            fontSize: '14px',
            fontWeight: '600',
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            outline: 'none',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
          <option value="ml">മലയാളം</option>
        </select>
      </div>

      <div style={{ 
        height: '24px', 
        width: '1px', 
        background: 'var(--text-muted)', 
        opacity: 0.2 
      }}></div>

      <button 
        id="themeToggle"
        onClick={toggleTheme}
        style={{
          padding: '0.5rem',
          borderRadius: '12px',
          background: 'transparent',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--primary-light)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        title="Toggle Dark/Light Mode"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
};

export default Navbar;