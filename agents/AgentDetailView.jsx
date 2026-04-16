import React, { useState, useMemo } from 'react';
import { AGENT_TEMPLATES, DECISION_TEMPLATES } from '../../../data/mockData';
import AgentNetworkGraph from './AgentNetworkGraph';

const AgentDetailView = ({ agent, decisions, missions, allAgents = [], onBack }) => {
  const [tab, setTab] = useState('overview');
  const [selectedTrace, setSelectedTrace] = useState(null);
  const agentDecisions = decisions.filter(d => d.agentName === agent.name);
  const vetoed = agentDecisions.filter(d => d.status === 'vetoed').length;
  const approved = agentDecisions.filter(d => d.status === 'auto-approved').length;
  const trustScore = agentDecisions.length > 0 ? Math.round((1 - vetoed / agentDecisions.length) * 100) : 100;

  const traces = useMemo(() => {
    const STEP_POOLS = {
      observe: [
        `Polled ${(agent.missionNames||['mission'])[0]?.substring(0,30)} metrics — triggered by threshold breach`,
        `Detected anomaly signal on resource ${agent.name.split(' ')[0].toLowerCase()}-monitor`,
        `Received upstream event from orchestrator with priority ${Math.random()>0.5?'HIGH':'MEDIUM'}`,
        `Scheduled sweep completed — ${Math.floor(Math.random()*40)+5} items evaluated`,
      ],
      reason: [
        `Cross-referenced against ${Math.floor(Math.random()*4)+2} historical incidents — confidence 92%`,
        `Policy evaluation passed. Action within guardrail bounds for this scope.`,
        `Weighed trade-off: mission velocity vs risk score. Risk score ${Math.floor(Math.random()*30)+10} — acceptable.`,
        `Consensus check with ${Math.floor(Math.random()*3)+1} peer agents — unanimous agreement.`,
      ],
      tool: [
        { call: `gcp.compute.list(zone="us-central1")`, result: `${Math.floor(Math.random()*8)+2} instances returned, avg CPU ${Math.floor(Math.random()*40)+50}%` },
        { call: `iam.bindings.audit(resource="${agent.name.split(' ')[0].toLowerCase()}-svc")`, result: `${Math.floor(Math.random()*5)+2} bindings found, ${Math.floor(Math.random()*2)+1} flagged` },
        { call: `billing.usage.get(period="last_7d")`, result: `£${(Math.random()*2000+500).toFixed(0)} spend, ${Math.random()>0.5?'within':'above'} forecast` },
        { call: `security.findings.list(severity="HIGH")`, result: `${Math.floor(Math.random()*8)+1} findings, ${Math.floor(Math.random()*3)} new` },
      ],
      decide: [
        `Generated action plan — ${Math.floor(Math.random()*3)+2} steps, estimated ${Math.floor(Math.random()*60)+5}s`,
        `Rollback plan staged. Action classified as ${Math.random()>0.4?'reversible':'irreversible'}.`,
        `Action selected from ${Math.floor(Math.random()*3)+2} candidates via risk-adjusted scoring.`,
      ],
      escalate: [
        `Criticality threshold met — escalating to human inbox for approval`,
        `Policy requires consent for this resource scope — queued for review`,
        `Confidence below 90% threshold — requesting human validation`,
      ],
      resolved: [
        `Action executed successfully. State verified. Audit log updated.`,
        `Completed in ${(Math.random()*4+0.5).toFixed(1)}s. No side effects detected.`,
        `Change applied. Downstream health-check passed within ${Math.floor(Math.random()*20)+5}s.`,
      ],
    };
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const outcomes = ['auto-resolved', 'auto-resolved', 'escalated', 'auto-resolved', 'escalated', 'auto-resolved', 'auto-resolved', 'failed'];
    const types = ['security', 'cost', 'config', 'heal', 'ml'];
    const typeColors = { security:'bg-[#D9257F]/10 text-[#D9257F]', cost:'bg-[#EC5300]/10 text-[#EC5300]', config:'bg-[#9DB9D6]/10 text-[#9DB9D6]', heal:'bg-[#6EEBBF]/10 text-[#6EEBBF]', ml:'bg-white/8 text-white/70' };
    return Array.from({length: 9}, (_, i) => {
      const outcome = outcomes[i % outcomes.length];
      const type = types[i % types.length];
      const toolEntry = pick(STEP_POOLS.tool);
      const steps = [
        { icon: 'visibility',     color: 'text-gcp-blue',   label: 'Observe',  content: pick(STEP_POOLS.observe) },
        { icon: 'psychology',     color: 'text-purple-500', label: 'Reason',   content: pick(STEP_POOLS.reason) },
        { icon: 'build',          color: 'text-amber-500',  label: 'Tool call', content: toolEntry.call, result: toolEntry.result, isTool: true },
        { icon: 'task_alt',       color: 'text-gcp-green',  label: 'Decide',   content: pick(STEP_POOLS.decide) },
        outcome === 'escalated'
          ? { icon: 'upload',     color: 'text-gcp-red',    label: 'Escalate', content: pick(STEP_POOLS.escalate) }
          : outcome === 'failed'
          ? { icon: 'error',      color: 'text-gcp-red',    label: 'Error',    content: 'Execution failed — rate limit exceeded. Retrying in 60s.' }
          : { icon: 'check_circle', color: 'text-gcp-green', label: 'Resolved', content: pick(STEP_POOLS.resolved) },
      ];
      const hours = String(9 + Math.floor(i * 1.4)).padStart(2,'0');
      const mins  = String(Math.floor(Math.random()*59)).padStart(2,'0');
      const secs  = String(Math.floor(Math.random()*59)).padStart(2,'0');
      return {
        id: `trace-${agent.id}-${i}`,
        timestamp: `${hours}:${mins}:${secs}`,
        action: (DECISION_TEMPLATES[i % DECISION_TEMPLATES.length] || {}).action || 'Agent task',
        mission: (agent.missionNames||[])[i % Math.max((agent.missionNames||[]).length,1)] || '—',
        outcome,
        type,
        typeColor: typeColors[type],
        duration: `${(Math.random()*4+0.4).toFixed(1)}s`,
        tokens: Math.floor(Math.random()*3000)+400,
        steps,
      };
    });
  }, [agent.id]);

  const evals = useMemo(() => [
    { name: 'Task completion rate', score: 94, passing: true, detail: 'Completed 47/50 assigned tasks within timeout windows' },
    { name: 'Response accuracy', score: Math.round(agent.consensusRate * 100), passing: agent.consensusRate > 0.85, detail: `${Math.round(agent.consensusRate * 100)}% consensus with peer agents on decisions` },
    { name: 'Avg decision latency', score: 89, passing: true, detail: 'Average 1.8s per decision, p95 2.4s' },
    { name: 'Error rate', score: 3, passing: true, detail: '3% errors from external API rate limits' },
    { name: 'Token efficiency', score: 78, passing: agent.drift < 0.15, detail: `Drift at ${Math.round(agent.drift * 100)}% — ${agent.drift < 0.15 ? 'within acceptable range' : 'slightly elevated'}` },
  ], [agent]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="bg-dark-card border-b border-white/10 px-8 py-4 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          {onBack && (
            <button onClick={onBack} className="text-white/60 hover:text-white text-sm font-medium flex items-center gap-1">
              ← Back
            </button>
          )}
          <span className="material-symbols-outlined text-4xl text-gcp-blue flex-shrink-0">
            {AGENT_TEMPLATES[agent.type]?.icon || agent.type || 'smart_toy'}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${agent.status === 'active' ? 'bg-[#6EEBBF]/10 text-[#6EEBBF]' : 'bg-dark-card/5 text-white/60'}`}>
                {agent.status === 'active' ? '● Active' : '○ Idle'}
              </span>
            </div>
            <p className="text-sm text-white/60 mt-0.5">{agent.model} · {agent.missions} active missions</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gcp-green">{trustScore}%</div>
            <div className="text-xs text-white/50">Trust Score</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 -mb-4">
          {['overview', 'traces', 'network', 'config', 'evals'].map(t => (
            <button key={t} onClick={() => { setTab(t); setSelectedTrace(null); }}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 capitalize transition ${
                tab === t ? 'border-gcp-blue text-gcp-blue' : 'border-transparent text-white/60 hover:text-white'
              }`}>
              {t === 'network' ? 'Topology' : t === 'traces' ? `Traces (${traces.length})` : t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-8 llm-clearance">
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Consensus Rate', value: `${Math.round(agent.consensusRate * 100)}%`, chipClass: 'bg-[#6EEBBF]/10 border-[#6EEBBF]/25 text-[#6EEBBF]', sub: 'with peers' },
                { label: 'Decisions Made', value: agent.decisions, chipClass: 'bg-[#9DB9D6]/10 border-[#9DB9D6]/25 text-[#9DB9D6]', sub: 'lifetime total' },
                { label: 'Drift', value: `${Math.round(agent.drift * 100)}%`, chipClass: agent.drift > 0.2 ? 'bg-[#D9257F]/10 border-[#D9257F]/25 text-[#D9257F]' : 'bg-white/5 border-white/10 text-white/70', sub: 'from baseline' },
                { label: 'Missions', value: agent.missions, chipClass: 'bg-[#EC5300]/10 border-[#EC5300]/25 text-[#EC5300]', sub: 'concurrent' },
              ].map((s, i) => (
                <div key={i} className={`rounded-lg p-4 border ${s.chipClass}`}>
                  <div className="text-xs font-bold opacity-80">{s.label}</div>
                  <div className="text-3xl font-bold mt-2">{s.value}</div>
                  <div className="text-xs opacity-60 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Decision outcomes + drift signal */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-dark-card rounded-lg p-6 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-4">Decision Outcomes</h3>
                {[
                  { label: 'Auto-approved', count: approved, color: '#34a853', total: agentDecisions.length },
                  { label: 'Pending review', count: agentDecisions.filter(d => d.status === 'pending').length, color: '#fbbc04', total: agentDecisions.length },
                  { label: 'Vetoed', count: vetoed, color: '#ea4335', total: agentDecisions.length },
                ].map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-bold text-white">{item.count}</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${item.total > 0 ? (item.count / item.total * 100) : 0}%`, background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-dark-card rounded-lg p-5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-3">Agent Performance (Drift Trend)</h3>
                  <div className="h-[120px] mb-4 relative bg-dark-bg/50 rounded-lg p-2">
                    <svg viewBox="0 0 240 100" width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`pulseGrad-${agent.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#95ADE2" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#95ADE2" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {/* Sample curve for drift over time */}
                      <path d="M0,80 C40,85 80,45 120,60 T200,30 L240,40 L240,100 L0,100 Z" fill={`url(#pulseGrad-${agent.id})`}/>
                      <path d="M0,80 C40,85 80,45 120,60 T200,30 L240,40" fill="none" stroke="#95ADE2" strokeWidth="2.5"/>
                      <circle cx="240" cy="40" r="4" fill="#95ADE2"/>
                      <circle cx="240" cy="40" r="10" fill="none" stroke="#95ADE2" strokeWidth="1.5">
                        <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <line x1="0" y1="35" x2="240" y2="35" stroke="#ea4335" strokeDasharray="3 3" strokeWidth="1"/>
                      <text x="5" y="30" fontSize="8" fill="#ea4335">Threshold limit</text>
                    </svg>
                  </div>
                  <div className="space-y-3">
                    {agentDecisions.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-white/70 truncate flex-1 mr-2">{d.action.substring(0, 30)}...</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded ${d.status === 'auto-approved' ? 'bg-[#6EEBBF]/10 text-[#6EEBBF]' : 'bg-[#D9257F]/10 text-[#D9257F]'}`}>
                            {d.status === 'auto-approved' ? 'Pass' : 'Veto'}
                          </span>
                          <span className="text-white/40">Drift: {Math.floor(Math.random()*15+5)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs">
                    <span className="text-white/60">Cumulative Drift</span>
                    <span className={agent.drift < 0.15 ? 'text-gcp-green font-bold' : 'text-gcp-red font-bold'}>
                      {Math.round(agent.drift * 100)}% ({agent.drift < 0.15 ? 'Stable' : 'Elevated'})
                    </span>
                  </div>
                </div>

                <div className="bg-dark-card rounded-lg p-5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-3">Active Missions</h3>
                  <div className="space-y-2">
                    {(agent.missionNames || []).slice(0, 3).map((mn, i) => (
                      <div key={i} className="text-xs bg-dark-nav-selected/50 text-gcp-blue px-2 py-1.5 rounded truncate">{mn}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent decisions */}
            <div>
              <h3 className="font-bold text-white mb-3">Recent Decisions ({agentDecisions.length})</h3>
              <div className="space-y-2">
                {agentDecisions.slice(0, 6).map(d => (
                  <div key={d.id} className="bg-dark-card rounded-lg p-4 border border-white/10 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{d.action}</div>
                      <div className="text-xs text-white/50 mt-1">{d.why}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-medium flex-shrink-0 ${
                      d.status === 'auto-approved' ? 'bg-[#6EEBBF]/10 text-[#6EEBBF]' :
                      d.status === 'pending' ? 'bg-[#EC5300]/15 text-[#EC5300]' :
                      'bg-[#D9257F]/10 text-[#D9257F]'
                    }`}>
                      {d.status === 'auto-approved' ? '✓ Auto' : d.status === 'pending' ? '⏳ Pending' : '✖ Vetoed'}
                    </span>
                  </div>
                ))}
                {agentDecisions.length === 0 && (
                  <div className="text-center py-8 text-white/50 text-sm">No decisions recorded yet for this agent.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'traces' && (() => {
          const OUTCOME_CHIP = {
            'auto-resolved': 'bg-[#6EEBBF]/10 text-[#6EEBBF]',
            'escalated':     'bg-[#EC5300]/15 text-[#EC5300]',
            'failed':        'bg-[#D9257F]/10 text-[#D9257F]',
          };
          const OUTCOME_ICON = { 'auto-resolved': 'check_circle', 'escalated': 'upload', 'failed': 'error' };

          return (
            <div className="flex gap-5 items-start">
              {/* ── Left: trace list ── */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="grid gap-3 px-4 pb-1 text-xs font-bold text-white/50 uppercase tracking-wide" style={{gridTemplateColumns:'7rem 1fr 7rem 5rem 5rem'}}>
                  <span>Time</span><span>Action</span><span>Outcome</span><span>Duration</span><span>Tokens</span>
                </div>
                {traces.map(trace => {
                  const isActive = selectedTrace?.id === trace.id;
                  return (
                    <button key={trace.id}
                      onClick={() => setSelectedTrace(isActive ? null : trace)}
                      className={`w-full rounded-xl px-4 py-3.5 transition text-left grid gap-3 items-center border-2 ${
                        isActive
                          ? 'border-gcp-blue bg-dark-nav-selected/50 shadow-sm'
                          : 'border-transparent bg-dark-card hover:border-white/15 hover:shadow-sm'
                      }`}
                      style={{gridTemplateColumns:'7rem 1fr 7rem 5rem 5rem'}}>
                      <span className="font-mono text-xs text-white/50">{trace.timestamp}</span>
                      <div className="min-w-0">
                        <div className={`text-sm font-medium truncate ${isActive ? 'text-gcp-blue' : 'text-white'}`}>{trace.action}</div>
                        <span className={`inline-block text-xs px-1.5 py-0.5 rounded mt-0.5 ${trace.typeColor}`}>{trace.type}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${OUTCOME_CHIP[trace.outcome]}`}>{trace.outcome}</span>
                      <span className="text-xs text-white/70 font-mono">{trace.duration}</span>
                      <span className="text-xs text-white/70 font-mono">{trace.tokens.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>

              {/* ── Right: detail panel ── */}
              {selectedTrace && (
                <div className="w-96 flex-shrink-0 bg-dark-card border border-white/10 rounded-xl overflow-hidden fade-in sticky top-0">
                  {/* Panel header */}
                  <div className="px-5 py-3.5 bg-dark-card/5 border-b border-white/10 flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${OUTCOME_CHIP[selectedTrace.outcome]}`}>
                      <span className="material-symbols-outlined" style={{fontSize:'11px',verticalAlign:'middle',marginRight:'2px'}}>{OUTCOME_ICON[selectedTrace.outcome]}</span>
                      {selectedTrace.outcome}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${selectedTrace.typeColor}`}>{selectedTrace.type}</span>
                    <button onClick={() => setSelectedTrace(null)}
                      className="ml-auto text-white/40 hover:text-white/70 transition flex-shrink-0">
                      <span className="material-symbols-outlined" style={{fontSize:'18px'}}>close</span>
                    </button>
                  </div>

                  {/* Panel body */}
                  <div className="p-5 overflow-y-auto" style={{maxHeight:'70vh'}}>
                    <p className="font-bold text-white text-sm leading-snug mb-0.5">{selectedTrace.action}</p>
                    <p className="text-xs text-gcp-blue mb-1 truncate">{selectedTrace.mission}</p>
                    <p className="text-xs text-white/40 font-mono mb-5">{selectedTrace.timestamp} · {selectedTrace.duration} · {selectedTrace.tokens.toLocaleString()} tokens</p>

                    <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-3">Reasoning trace</p>
                    <div className="space-y-4">
                      {selectedTrace.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                            <span className={`material-symbols-outlined ${step.color}`} style={{fontSize:'16px'}}>{step.icon}</span>
                            {i < selectedTrace.steps.length - 1 && <div className="w-px h-3 bg-dark-bg"></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-white/50 uppercase tracking-wide">{step.label}</span>
                              <span className="text-xs text-white/40 font-mono">+{(i * (parseFloat(selectedTrace.duration) / selectedTrace.steps.length)).toFixed(2)}s</span>
                            </div>
                            {step.isTool ? (
                              <div className="space-y-1.5">
                                <div className="bg-[#1C1F23] text-green-400 rounded-lg px-3 py-2 font-mono text-xs break-all leading-relaxed">{step.content}</div>
                                <div className="bg-dark-card/5 border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-white/70 break-all leading-relaxed">→ {step.result}</div>
                              </div>
                            ) : (
                              <p className="text-xs text-white leading-relaxed">{step.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Token breakdown */}
                    <div className="mt-5 pt-4 border-t border-[#50638B]/50 grid grid-cols-3 gap-2">
                      {[
                        { label: 'Input',  value: Math.floor(selectedTrace.tokens * 0.6) },
                        { label: 'Output', value: Math.floor(selectedTrace.tokens * 0.3) },
                        { label: 'Tool',   value: Math.floor(selectedTrace.tokens * 0.1) },
                      ].map((t, i) => (
                        <div key={i} className="text-center bg-dark-card/5 rounded-lg py-2.5">
                          <div className="text-sm font-bold text-white">{t.value.toLocaleString()}</div>
                          <div className="text-xs text-white/50 mt-0.5">{t.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {tab === 'network' && (
          <div>
            <div className="bg-dark-card rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-1">Topology</h3>
              <AgentNetworkGraph agent={agent} allAgents={allAgents} decisions={decisions} height={400} />
            </div>
          </div>
        )}

        {tab === 'config' && (
          <div className="grid grid-cols-2 gap-6 max-w-3xl">
            <div className="bg-dark-card rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4">Configuration</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Model', value: agent.model },
                  { label: 'Agent ID', value: agent.id.substring(0, 8) + '…' },
                  { label: 'Max Tokens', value: '4,096' },
                  { label: 'Temperature', value: '0.7' },
                  { label: 'Session Timeout', value: '30 min' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-[#50638B]/50 last:border-0">
                    <span className="text-white/50">{row.label}</span>
                    <span className="font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-card rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4">Consent Defaults</h3>
              <div className="space-y-3">
                {[
                  { op: 'Read Operations', level: 'auto-approve', color: 'green' },
                  { op: 'Write Operations', level: 'veto-window', color: 'amber' },
                  { op: 'Critical / Irreversible', level: 'require-consent', color: 'red' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span className="text-sm text-white/60">{row.op}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium bg-${row.color}-100 text-${row.color}-800`}>{row.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-dark-card rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">System Instructions</h3>
                <button className="text-xs text-gcp-blue font-medium hover:underline">Edit →</button>
              </div>
              <div className="bg-dark-card/5 rounded-lg p-4 font-mono text-xs text-white/70 max-h-44 overflow-y-auto border border-white/10 space-y-2">
                <p className="text-white/40"># Agent Role & Behavior</p>
                <p>You are an autonomous {agent.name} responsible for governance operations.</p>
                <p className="text-white/40 mt-2"># Core Directives</p>
                <p>- Always request human approval for critical or irreversible actions</p>
                <p>- Log all operations with timestamps and resource identifiers</p>
                <p>- Respect rate limits: max 100 API calls/min, 1000 DB queries/hr</p>
                <p>- Fail gracefully and provide detailed error context</p>
                <p>- Never expose sensitive credentials or PII in logs</p>
                <p className="text-white/40 mt-2"># Safety Constraints</p>
                <p>- Do not modify production data without explicit approval</p>
                <p>- Escalate to human if confidence &lt; 80%</p>
                <p>- Maximum autonomous session: 30 minutes</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'evals' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-dark-card rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white">Evaluation Suite</h3>
                  <p className="text-xs text-white/50 mt-1">{evals.filter(e => e.passing).length}/{evals.length} checks passing</p>
                </div>
                <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                  evals.filter(e => e.passing).length === evals.length ? 'bg-[#6EEBBF]/10 text-[#6EEBBF]' :
                  evals.filter(e => e.passing).length >= evals.length * 0.8 ? 'bg-[#EC5300]/15 text-[#EC5300]' :
                  'bg-[#D9257F]/10 text-[#D9257F]'
                }`}>
                  {evals.filter(e => e.passing).length === evals.length ? '✓ Healthy' :
                   evals.filter(e => e.passing).length >= evals.length * 0.8 ? '⚠ Degraded' : '✗ Unhealthy'}
                </span>
              </div>
              <div className="space-y-4">
                {evals.map((ev, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${ev.passing ? 'border-[#6EEBBF]/25 bg-[#6EEBBF]/10' : 'border-[#D9257F]/25 bg-[#D9257F]/10'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{ev.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">{ev.score}{ev.name.includes('rate') && ev.score > 10 ? '%' : ev.name.includes('latency') ? 'ms' : ev.score < 10 ? '%' : '%'}</span>
                        <span className={`text-xs font-bold ${ev.passing ? 'text-green-400' : 'text-red-400'}`}>{ev.passing ? '✓ Pass' : '✗ Fail'}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60">{ev.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetailView;
