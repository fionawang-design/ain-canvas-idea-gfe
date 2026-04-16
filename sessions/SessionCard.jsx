import React from 'react';

const SessionCard = ({ session, onClick, isMagicSelectActive }) => {
  const { title, description, status, agent, resource, time } = session;

  const statusStyles = {
    'In-progress': 'bg-gcp-blue/10 text-gcp-blue',
    'Need input': 'bg-gcp-yellow/10 text-gcp-yellow',
    'Completed': 'bg-gcp-green/10 text-gcp-green',
    'Not started': 'bg-white/10 text-white/70',
    'Terminated': 'bg-white/5 text-white/40',
  };

  return (
    <div 
      className={`bg-dark-card rounded-xl p-5 flex flex-col gap-4 cursor-pointer transition relative border ${isMagicSelectActive ? 'border-[#6EEBBF] shadow-[0_0_15px_rgba(110,235,191,0.15)]' : 'border-white/5 hover:border-white/20'}`}
      onClick={() => onClick && onClick(session.id)}
    >
      {isMagicSelectActive && (
        <div className="absolute top-2 right-2 bg-[#6EEBBF] text-[#0A0F23] text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 z-10">
          <span className="material-symbols-outlined text-[10px]" style={{ fontSize: '10px' }}>flare</span> Select
        </div>
      )}
      {/* Header & Metadata */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-white/40">
        <div className="flex items-center gap-4 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full font-bold ${statusStyles[status] || 'bg-white/10 text-white'}`}>
            {status}
          </span>
          <span>Agent: <span className="text-white/70 font-medium">{agent}</span></span>
          <span>Resource: <span className="text-white/70 font-medium">{resource}</span></span>
          <span>{time}</span>
        </div>
        <span className="material-symbols-outlined text-white/40" style={{ fontSize: '16px' }}>arrow_forward</span>
      </div>

      {/* Body */}
      <div className="flex items-baseline gap-2">
        <h4 className="text-xs font-bold text-white leading-snug flex-shrink-0">{title}</h4>
        <p className="text-xs text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SessionCard;
