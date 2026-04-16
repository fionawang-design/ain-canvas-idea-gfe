import React from 'react';

const SessionStatusChart = () => {
  // Dummy data for 7 days
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-[#1C1F23] rounded-xl p-6 text-white mt-2 mb-4 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-white/80">Session Trends</h3>
          <p className="text-xs text-white/40 mt-0.5">Sessions by status over the last week</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gcp-yellow rounded-full"></span>
            <span className="text-white/70">Waiting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gcp-blue rounded-full"></span>
            <span className="text-white/70">In-progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gcp-green rounded-full"></span>
            <span className="text-white/70">Completed</span>
          </div>
        </div>
      </div>

      <div className="h-32 w-full relative">
        {/* SVG Chart */}
        <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbc04" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fbbc04" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#95ADE2" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#95ADE2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34a853" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#34a853" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="500" y2="20" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          <line x1="0" y1="50" x2="500" y2="50" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          <line x1="0" y1="80" x2="500" y2="80" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

          {/* Paths for Green (Completed) */}
          <path d="M 0 90 H 83 V 85 H 166 V 75 H 250 V 60 H 333 V 45 H 416 V 30 H 500 V 15 L 500 100 L 0 100 Z" fill="url(#grad-green)" />
          <path d="M 0 90 H 83 V 85 H 166 V 75 H 250 V 60 H 333 V 45 H 416 V 30 H 500 V 15" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" />

          {/* Paths for Blue (In-progress) */}
          <path d="M 0 80 H 83 V 60 H 166 V 65 H 250 V 40 H 333 V 45 H 416 V 20 H 500 V 30 L 500 100 L 0 100 Z" fill="url(#grad-blue)" />
          <path d="M 0 80 H 83 V 60 H 166 V 65 H 250 V 40 H 333 V 45 H 416 V 20 H 500 V 30" fill="none" stroke="#95ADE2" strokeWidth="2" strokeLinecap="round" />

          {/* Paths for Yellow (Need input) */}
          <path d="M 0 50 H 83 V 30 H 166 V 45 H 250 V 25 H 333 V 35 H 416 V 15 H 500 V 25 L 500 100 L 0 100 Z" fill="url(#grad-yellow)" />
          <path d="M 0 50 H 83 V 30 H 166 V 45 H 250 V 25 H 333 V 35 H 416 V 15 H 500 V 25" fill="none" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between mt-3 text-xs text-white/30 px-1 font-medium">
          {days.map(day => <span key={day}>{day}</span>)}
        </div>
      </div>
    </div>
  );
};

export default SessionStatusChart;
