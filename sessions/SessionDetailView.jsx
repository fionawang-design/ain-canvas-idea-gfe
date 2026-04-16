import React, { useState } from 'react';
import { dummySessions } from '../../../data/dummySessions';
import Modal from './Modal';

const SessionDetailView = ({ sessionId, onBack, onPrev, onNext }) => {
  const session = dummySessions.find(s => s.id === sessionId);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    content: ''
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [storageOption, setStorageOption] = useState('100GB');

  const openModal = (title, content) => {
    setModalConfig({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  if (!session) {
    return (
      <div className="p-8 text-white">
        <button onClick={onBack} className="text-gcp-blue hover:underline mb-4">Back to inbox</button>
        <div>Session not found</div>
      </div>
    );
  }

  const { title, description, status, agent, resource, time } = session;

  const statusStyles = {
    'In-progress': 'bg-gcp-blue/10 text-gcp-blue',
    'Need input': 'bg-gcp-yellow/10 text-gcp-yellow',
    'Completed': 'bg-gcp-green/10 text-gcp-green',
    'Not started': 'bg-white/10 text-white/70',
    'Terminated': 'bg-white/5 text-white/40',
  };

  const originIcons = {
    'Slack thread': 'chat',
    'Email': 'mail',
    'Google Cloud Assist': 'cloud',
    'Timer': 'timer',
    'Event trigger': 'bolt',
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Row (Fixed, lighter bg) */}
      <div className={`bg-dark-card border-b border-white/10 px-8 py-3 flex items-center justify-between flex-shrink-0 transition-shadow ${isScrolled ? 'shadow-lg shadow-black/50' : ''}`}>
        <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          <span className="font-bold text-white">Back to inbox</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="text-white/60 hover:text-white transition flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
          </button>
          <button onClick={onNext} className="text-white/60 hover:text-white transition flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
        </div>
      </div>

      {/* Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar" onScroll={(e) => setIsScrolled(e.target.scrollTop > 0)}>
        <div className="flex-1 flex-row">
          <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
        </div>

        <div className="bg-dark-card border border-white/5 rounded-xl p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/40">Status</span>
              <div className={`w-fit px-2 py-0.5 rounded text-xs font-bold ${statusStyles[status] || 'bg-white/10 text-white'}`}>
                {status}
              </div>
            </div>
            <div>
              <span className="text-white/40">Agent</span>
              <div
                className="text-white font-medium mt-0.5 flex items-center gap-1 cursor-pointer hover:text-gcp-blue transition"
                onClick={() => openModal('Agent Link', 'The logs in each session might spark ideas for further agent improvement. The user can then use this link to open the agent in the Agent Manager (TBD) to do so.')}
              >
                <span>{agent}</span>
                <span className="material-symbols-outlined text-white/40" style={{ fontSize: '14px' }}>open_in_new</span>
              </div>
            </div>
            <div>
              <span className="text-white/40">Time</span>
              <div className="text-white font-medium mt-0.5">{time}</div>
            </div>
            <div>
              <span className="text-white/40">Origin</span>
              <div
                className="text-white font-medium mt-0.5 flex items-center gap-1 cursor-pointer hover:text-gcp-blue transition"
                onClick={() => openModal('Origin Link', 'This link takes the user to the original surface where the session was initiated. Could be the configured event trigger, the exact GCA chat session, the Slack thread, etc.')}
              >
                <span className="material-symbols-outlined text-xs">{originIcons[session.origin]}</span>
                <span>{session.origin}</span>
                <span className="material-symbols-outlined text-white/40" style={{ fontSize: '14px' }}>open_in_new</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-white/40 text-sm">Description</span>
            <p className="text-white/80 mt-1 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Placeholder for more details */}
          <div className="border-t border-white/10 pt-4">
            <span className="text-white/40 text-sm">Action Logs</span>
            <div className="text-white/60 mt-2 text-sm flex flex-col gap-3">
              {session.logs ? session.logs.map((log, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">[{log.timestamp}]</span>
                    <span className={log.type === 'action_required' ? 'text-gcp-yellow font-medium' : 'text-white/80'}>
                      {log.message}
                    </span>
                  </div>

                  {log.type === 'thinking' && log.detail && (
                    <div className="ml-0 mt-1 mb-2">
                      <details className="text-white/60 text-xs bg-white/5 rounded p-2 border border-white/10">
                        <summary className="cursor-pointer hover:text-white transition flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">more_horiz</span>
                            <span className="font-medium">Agent Thinking Process</span>
                          </div>
                          <span className="material-symbols-outlined text-xs">expand_more</span>
                        </summary>
                        <div className="mt-2 whitespace-pre-wrap text-white/80 bg-black/20 p-2 rounded font-mono leading-relaxed">
                          {log.detail.content}
                        </div>
                      </details>
                    </div>
                  )}

                  {log.type === 'action_required' && log.detail && (
                    <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col gap-2 text-xs">
                      <div>
                        <span className="text-white/40">Rationale:</span>
                        <p className="text-white/80">{log.detail.rationale}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Context:</span>
                        <p className="text-white/80">{log.detail.context}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Potential Impact:</span>
                        <p className="text-white/80">{log.detail.impact}</p>
                      </div>

                      {session.id === 'sess-13' && (
                        <div className="mt-2">
                          <span className="text-white/40">Disk Usage Growth & Projection:</span>

                          {/* Storage Option Tabs */}
                          <div className="flex gap-2 mt-2 mb-2">
                            {['100GB', '150GB', '200GB'].map(opt => (
                              <button
                                key={opt}
                                onClick={() => setStorageOption(opt)}
                                className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${storageOption === opt ? 'bg-dark-nav-selected text-dark-nav-text-selected' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>

                          <svg width="100%" height="120" viewBox="0 0 1000 120" className="mt-1 bg-black/20 rounded p-2">
                            {/* Grid lines */}
                            <line x1="0" y1="0" x2="1000" y2="0" stroke="white" strokeOpacity="0.05" />
                            <line x1="0" y1="50" x2="1000" y2="50" stroke="white" strokeOpacity="0.05" />
                            <line x1="0" y1="62" x2="1000" y2="62" stroke="white" strokeOpacity="0.05" />
                            <line x1="0" y1="87" x2="1000" y2="87" stroke="white" strokeOpacity="0.05" />

                            {/* Current Limit line (500GB) */}
                            <line x1="0" y1="50" x2="1000" y2="50" stroke="#EC5300" strokeDasharray="4" strokeWidth="1" />
                            <text x="5" y="45" fill="#EC5300" fontSize="9" fontWeight="bold">Current Limit: 500GB</text>

                            {/* New Limit line */}
                            {storageOption === '100GB' && (
                              <>
                                <line x1="0" y1="25" x2="1000" y2="25" stroke="#0F9D58" strokeDasharray="4" strokeWidth="1" />
                                <text x="5" y="20" fill="#0F9D58" fontSize="9" fontWeight="bold">New Limit: 600GB (+100GB)</text>
                              </>
                            )}
                            {storageOption === '150GB' && (
                              <>
                                <line x1="0" y1="12" x2="1000" y2="12" stroke="#0F9D58" strokeDasharray="4" strokeWidth="1" />
                                <text x="5" y="22" fill="#0F9D58" fontSize="9" fontWeight="bold">New Limit: 650GB (+150GB)</text>
                              </>
                            )}
                            {storageOption === '200GB' && (
                              <>
                                <line x1="0" y1="2" x2="1000" y2="2" stroke="#0F9D58" strokeDasharray="4" strokeWidth="1" />
                                <text x="5" y="12" fill="#0F9D58" fontSize="9" fontWeight="bold">New Limit: 700GB (+200GB)</text>
                              </>
                            )}

                            {/* Data line */}
                            <path d="M 0 95 L 100 87 L 200 80 L 300 70 L 400 62" fill="none" stroke="#4285F4" strokeWidth="2" />
                            <path d="M 400 62 L 500 52 L 600 42 L 700 32 L 800 22 L 900 12 L 1000 2" fill="none" stroke="#4285F4" strokeWidth="2" strokeDasharray="4" />

                            {/* Points */}
                            <circle cx="400" cy="62" r="3" fill="#4285F4" />

                            {/* Labels */}
                            <text x="0" y="115" fill="white" fillOpacity="0.4" fontSize="9">4 mos ago</text>
                            <text x="100" y="115" fill="white" fillOpacity="0.4" fontSize="9">3 mos ago</text>
                            <text x="200" y="115" fill="white" fillOpacity="0.4" fontSize="9">2 mos ago</text>
                            <text x="300" y="115" fill="white" fillOpacity="0.4" fontSize="9">1 mo ago</text>
                            <text x="380" y="115" fill="white" fillOpacity="0.8" fontSize="9">Now (450GB)</text>
                            <text x="500" y="115" fill="white" fillOpacity="0.4" fontSize="9">+1 mo</text>
                            <text x="600" y="115" fill="white" fillOpacity="0.4" fontSize="9">+2 mo</text>
                            <text x="700" y="115" fill="white" fillOpacity="0.4" fontSize="9">+3 mo</text>
                            <text x="800" y="115" fill="white" fillOpacity="0.4" fontSize="9">+4 mo</text>
                            <text x="900" y="115" fill="white" fillOpacity="0.4" fontSize="9">+5 mo</text>
                            <text x="960" y="115" fill="white" fillOpacity="0.4" fontSize="9">+6 mo</text>
                          </svg>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1 w-full">
                        <button className="bg-dark-nav-selected text-dark-nav-text-selected px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition flex-shrink-0 cursor-pointer">
                          {session.id === 'sess-13' ? `Approve ${storageOption}` : 'Approve'}
                        </button>
                        <button className="bg-white/10 text-white px-3 py-1 rounded text-xs font-medium hover:bg-white/20 transition flex-shrink-0 cursor-pointer">Reject</button>
                        <div className="flex-1 flex items-center gap-2 ml-0">
                          <input
                            type="text"
                            placeholder="Type a response..."
                            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                          />
                          <button className="text-white/40 hover:text-white transition flex-shrink-0">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-white/40">No logs available for this session.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
      >
        {modalConfig.content}
      </Modal>
    </div>
  );
};

export default SessionDetailView;
