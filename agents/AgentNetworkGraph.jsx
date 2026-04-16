import React, { useState, useEffect, useRef } from 'react';
import { AGENT_TEMPLATES } from '../../../data/mockData';

const AgentNetworkGraph = ({ agent, allAgents = [], decisions = [], height = 360 }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(540);

  useEffect(() => {
    const element = svgRef.current?.parentElement;
    if (!element) return;

    const handleResize = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0) {
        setSvgWidth(rect.width);
      }
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!agent) return null;

  const centerX = svgWidth / 2;
  const centerY = height / 2;

  // Tools — fixed set relevant to this agent type
  const toolsByType = {
    research: [{ name: 'web_search', icon: 'search' }, { name: 'sql_query', icon: 'database' }, { name: 'doc_read', icon: 'description' }],
    code: [{ name: 'code_edit', icon: 'terminal' }, { name: 'git_push', icon: 'publish' }, { name: 'deploy', icon: 'rocket' }, { name: 'test_run', icon: 'build_circle' }],
    data: [{ name: 'sql_query', icon: 'database' }, { name: 'bq_query', icon: 'bar_chart' }, { name: 'export', icon: 'ios_share' }],
    admin: [{ name: 'iam_admin', icon: 'lock' }, { name: 'audit_log', icon: 'receipt_long' }, { name: 'policy_check', icon: 'task_alt' }],
    security: [{ name: 'firewall_rule', icon: 'shield' }, { name: 'vuln_scan', icon: 'search' }, { name: 'cert_rotate', icon: 'sync' }],
    cost: [{ name: 'billing_api', icon: 'credit_card' }, { name: 'rightsizer', icon: 'balance' }, { name: 'budget_alert', icon: 'notifications' }],
  };
  const tools = toolsByType[agent.type] || toolsByType['code'];

  // Peer agents — those with overlapping missionNames
  const peers = allAgents
    .filter(a => a.id !== agent.id && a.missionNames?.some(mn => agent.missionNames?.includes(mn)))
    .slice(0, 4)
    .map(a => ({ id: a.id, name: a.name.split(' ')[0], icon: AGENT_TEMPLATES[a.type]?.icon || 'smart_toy', msgCount: Math.floor(Math.random() * 30) + 5 }));

  // Resources — from decision templates
  const resources = [
    { name: 'iam-service', icon: 'lock', count: 47 },
    { name: 'audit-log', icon: 'receipt_long', count: 34 },
    { name: 'vpc-firewall', icon: 'shield', count: 28 },
    { name: 'compute-eu', icon: 'cloud', count: 23 },
  ].slice(0, 3 + Math.floor(Math.random() * 2));

  const positionRing = (items, ringR, startAngle = -Math.PI / 2) =>
    items.map((item, i) => ({
      ...item,
      x: centerX + Math.cos(startAngle + (i / Math.max(items.length, 1)) * Math.PI * 2) * ringR,
      y: centerY + Math.sin(startAngle + (i / Math.max(items.length, 1)) * Math.PI * 2) * ringR,
    }));

  const posTools = positionRing(tools, 85, -Math.PI / 2);
  const posPeers = positionRing(peers, 145, Math.PI / 4);
  const posResources = positionRing(resources, 185, -Math.PI / 3);

  const getEdgeColor = (type) => type === 'tool' ? '#c084fc' : type === 'peer' ? '#fb923c' : '#5eead4';
  const getNodeFill = (type) => type === 'tool' ? '#a855f7' : type === 'peer' ? '#f97316' : '#14b8a6';

  return (
    <div>
      <p className="text-xs text-white/50 mb-3">
        Aggregated trace of tools, peer agents, and resources accessed — click nodes for details.
      </p>
      <svg ref={svgRef} width="100%" height={height} className="bg-dark-card/5 rounded-lg">
        <defs>
          <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12"/>
          </filter>
        </defs>

        {/* Tool edges */}
        {posTools.map((t, i) => (
          <line key={`te-${i}`} x1={centerX} y1={centerY} x2={t.x} y2={t.y}
            stroke="#c084fc" strokeWidth={selectedNode?.name === t.name ? 2.5 : 1.5}
            opacity={selectedNode && selectedNode.name !== t.name ? 0.25 : 0.7}
            strokeDasharray="5 3" style={{ animation: 'dash 1.5s linear infinite' }} />
        ))}
        {/* Peer edges */}
        {posPeers.map((p, i) => (
          <line key={`pe-${i}`} x1={centerX} y1={centerY} x2={p.x} y2={p.y}
            stroke="#fb923c" strokeWidth={1.5} opacity={selectedNode && selectedNode.name !== p.name ? 0.25 : 0.6}
            strokeDasharray="4 2" style={{ animation: 'dash 2s linear infinite' }} />
        ))}
        {/* Resource edges */}
        {posResources.map((r, i) => (
          <line key={`re-${i}`} x1={centerX} y1={centerY} x2={r.x} y2={r.y}
            stroke="#5eead4" strokeWidth={1.5} opacity={selectedNode && selectedNode.name !== r.name ? 0.25 : 0.6}
            strokeDasharray="3 3" style={{ animation: 'dash 2.5s linear infinite' }} />
        ))}

        {/* Center agent node */}
        <circle cx={centerX} cy={centerY} r="34" fill="#95ADE2" filter="url(#nodeShadow)" />
        <text x={centerX} y={centerY - 4} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Material Symbols Outlined', userSelect: 'none' }} fontSize="20" fill="white">
          {AGENT_TEMPLATES[agent.type]?.icon || agent.type || 'smart_toy'}
        </text>
        <text x={centerX} y={centerY + 14} textAnchor="middle" fontSize="9" fill="white" fontWeight="600" style={{userSelect:'none'}}>
          {agent.name.split(' ')[0]}
        </text>

        {/* Tool nodes */}
        {posTools.map((t, i) => (
          <g key={`tn-${i}`} style={{ cursor: 'pointer' }} onClick={() => setSelectedNode(selectedNode?.name === t.name ? null : { ...t, kind: 'tool' })}>
            <circle cx={t.x} cy={t.y} r="22" fill="#a855f7"
              opacity={selectedNode && selectedNode.name !== t.name ? 0.5 : 1}
              filter="url(#nodeShadow)" />
            <text x={t.x} y={t.y - 4} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Material Symbols Outlined', userSelect: 'none' }} fontSize="16" fill="white">{t.icon}</text>
            <text x={t.x} y={t.y + 12} textAnchor="middle" fontSize="7" fill="white" fontWeight="600" style={{userSelect:'none'}}>
              {t.name.substring(0, 8)}
            </text>
          </g>
        ))}

        {/* Peer nodes */}
        {posPeers.map((p, i) => (
          <g key={`pn-${i}`} style={{ cursor: 'pointer' }} onClick={() => setSelectedNode(selectedNode?.name === p.name ? null : { ...p, kind: 'peer' })}>
            <circle cx={p.x} cy={p.y} r="22" fill="#f97316"
              opacity={selectedNode && selectedNode.name !== p.name ? 0.5 : 1}
              filter="url(#nodeShadow)" />
            <text x={p.x} y={p.y - 4} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Material Symbols Outlined', userSelect: 'none' }} fontSize="16" fill="white">{p.icon}</text>
            <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize="7" fill="white" fontWeight="600" style={{userSelect:'none'}}>
              {p.name.substring(0, 7)}
            </text>
          </g>
        ))}

        {/* Resource nodes */}
        {posResources.map((r, i) => (
          <g key={`rn-${i}`} style={{ cursor: 'pointer' }} onClick={() => setSelectedNode(selectedNode?.name === r.name ? null : { ...r, kind: 'resource' })}>
            <circle cx={r.x} cy={r.y} r="20" fill="#14b8a6"
              opacity={selectedNode && selectedNode.name !== r.name ? 0.5 : 1}
              filter="url(#nodeShadow)" />
            <text x={r.x} y={r.y - 4} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Material Symbols Outlined', userSelect: 'none' }} fontSize="16" fill="white">{r.icon}</text>
            <text x={r.x} y={r.y + 12} textAnchor="middle" fontSize="7" fill="white" fontWeight="600" style={{userSelect:'none'}}>
              {r.name.substring(0, 7)}
            </text>
          </g>
        ))}

        {/* Selected node tooltip */}
        {selectedNode && (() => {
          const tx = Math.min(Math.max(selectedNode.x + 28, 60), svgWidth - 140);
          const ty = Math.max(selectedNode.y - 20, 10);
          const fill = selectedNode.kind === 'tool' ? '#a855f7' : selectedNode.kind === 'peer' ? '#f97316' : '#14b8a6';
          return (
            <g>
              <rect x={tx} y={ty} width="130" height="44" rx="6" fill={fill} opacity="0.95" filter="url(#nodeShadow)" />
              <text x={tx + 65} y={ty + 16} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">{selectedNode.name}</text>
              <text x={tx + 65} y={ty + 32} textAnchor="middle" fontSize="9" fill="white" opacity="0.85">
                {selectedNode.count ? `${selectedNode.count}x accessed` : selectedNode.msgCount ? `${selectedNode.msgCount} messages` : selectedNode.kind}
              </text>
            </g>
          );
        })()}
      </svg>

      <div className="flex items-center gap-6 mt-3 text-xs text-white/60">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:'#95ADE2'}}></span>This Agent</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:'#a855f7'}}></span>Tools</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:'#f97316'}}></span>Peer Agents</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:'#14b8a6'}}></span>Resources</span>
      </div>
    </div>
  );
};

export default AgentNetworkGraph;
