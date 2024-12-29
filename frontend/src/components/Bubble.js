import React from 'react';

export const Bubble = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-bubble"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            height: `${10 + Math.random() * 60}px`,
            width: `${10 + Math.random() * 60}px`,
            opacity: 0.1 + Math.random() * 0.2,
            backgroundColor: '#60A5FA',
          }}
        />
      ))}
    </div>
  );
};
export default Bubble;