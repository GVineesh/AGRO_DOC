import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`glass-card ${className}`}>
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {icon && (
            <div style={{
              padding: '0.5rem',
              background: 'var(--primary-light)',
              borderRadius: '8px',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </div>
          )}
          {title && <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCard;