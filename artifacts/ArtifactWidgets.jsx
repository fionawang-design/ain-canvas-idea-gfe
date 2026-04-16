import React from 'react';

export const ScorecardWidget = ({ title, score, status, items, evidenceLog }) => (
  <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-white/60">Compliance & Audit Readiness</p>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-gcp-green">{score}%</div>
        <div className="text-xs text-white/50">{status}</div>
      </div>
    </div>
    <div className="w-full bg-white/5 rounded-full h-2 mb-6">
      <div className="bg-gcp-green h-2 rounded-full" style={{ width: `${score}%` }}></div>
    </div>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center text-sm">
          <span className="text-white/80">{item.name}</span>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${item.ok ? 'bg-gcp-green' : 'bg-amber-400'}`}></span>
            <span className={`font-medium ${item.ok ? 'text-gcp-green' : 'text-amber-400'}`}>
              {item.ok ? 'Compliant' : 'Review Required'}
            </span>
          </div>
        </div>
      ))}
    </div>
    {evidenceLog && (
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-sm font-bold text-white mb-2">Evidence Log</h4>
        <div className="space-y-2 text-xs text-white/50">
          {evidenceLog.map((log, i) => (
            <div key={i} className="flex justify-between">
              <span>{log.file}</span>
              <span>{log.date}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const LatencyDashboardWidget = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">p99 Latency</div>
        <div className="text-2xl font-bold text-white">142ms</div>
        <div className="text-xs text-gcp-red flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_up</span> Above SLO (100ms)
        </div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Throughput</div>
        <div className="text-2xl font-bold text-white">8.5k rps</div>
        <div className="text-xs text-gcp-green flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_up</span> Normal
        </div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Error Rate</div>
        <div className="text-2xl font-bold text-white">0.02%</div>
        <div className="text-xs text-gcp-green flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_down</span> Within SLO
        </div>
      </div>
    </div>
  </div>
);

export const DiffWidget = () => (
  <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-bold text-white font-mono">stripe_v3_migration.sql</h3>
      <span className="text-xs text-white/40 font-mono">@@ -12,4 +12,9 @@</span>
    </div>
    <div className="font-mono text-xs space-y-1 bg-[#0A0F23]/50 p-4 rounded-lg border border-white/5 text-white/80">
      <div className="text-white/50">  CREATE TABLE payment_intents (</div>
      <div className="text-white/50">      id VARCHAR(255) PRIMARY KEY,</div>
      <div className="text-gcp-red bg-red-500/10 px-1">-     amount INTEGER NOT NULL,</div>
      <div className="text-gcp-green bg-green-500/10 px-1">+     amount_cents INTEGER NOT NULL,</div>
      <div className="text-gcp-green bg-green-500/10 px-1">+     currency VARCHAR(3) NOT NULL,</div>
      <div className="text-white/50">      status VARCHAR(50),</div>
      <div className="text-gcp-green bg-green-500/10 px-1">+     metadata JSONB,</div>
      <div className="text-gcp-green bg-green-500/10 px-1">+     stripe_account_id VARCHAR(255)</div>
      <div className="text-white/50">  );</div>
    </div>
  </div>
);

export const SheetWidget = () => (
  <div className="bg-[#3C444E]/30 rounded-xl overflow-hidden border border-white/10">
    <table className="w-full text-sm text-left text-white/80">
      <thead className="text-xs text-white/60 uppercase bg-white/5">
        <tr>
          <th scope="col" className="px-6 py-3">Instance ID</th>
          <th scope="col" className="px-6 py-3">Type</th>
          <th scope="col" className="px-6 py-3">Idle Days</th>
          <th scope="col" className="px-6 py-3">Monthly Cost</th>
          <th scope="col" className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { id: 'inst-9281', type: 'n1-standard-4', idle: 14, cost: '£120', status: 'Idle' },
          { id: 'inst-0192', type: 'n1-standard-8', idle: 22, cost: '£240', status: 'Idle' },
          { id: 'inst-7721', type: 'n2-standard-2', idle: 10, cost: '£60', status: 'Idle' },
          { id: 'inst-5541', type: 'e2-medium', idle: 30, cost: '£30', status: 'Idle' },
        ].map((row, i) => (
          <tr key={i} className="border-b border-white/5 hover:bg-white/5">
            <td className="px-6 py-4 font-mono">{row.id}</td>
            <td className="px-6 py-4">{row.type}</td>
            <td className="px-6 py-4">{row.idle}</td>
            <td className="px-6 py-4">{row.cost}</td>
            <td className="px-6 py-4">
              <span className="bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded text-xs">Idle</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CodeWidget = () => (
  <div className="space-y-4">
    <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-2">Context</h4>
      <p className="text-xs text-white/70">
        This BGP routing update is required to enable fallback routing for the `asia-east1` region in case of primary link failure. It configures custom advertisement of the primary subnet with a lower priority.
      </p>
    </div>
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-white font-mono">bgp_route_update.json</h3>
        <span className="text-xs text-white/40">JSON</span>
      </div>
      <div className="font-mono text-xs bg-[#0A0F23]/50 p-4 rounded-lg border border-white/5 text-white/80 overflow-x-auto">
        <pre>{`{
  "routing_policy": {
    "name": "asia-east1-fallback",
    "bgp": {
      "asn": 64512,
      "advertise_mode": "CUSTOM",
      "advertised_groups": ["ALL_SUBNETS"],
      "advertised_ip_ranges": [
        {
          "range": "10.142.0.0/20",
          "description": "Primary Asia Subnet"
        }
      ]
    },
    "priority": 100,
    "med": 20
  }
}`}</pre>
      </div>
    </div>
  </div>
);

export const CostPlanWidget = () => (
  <div className="space-y-6">
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Q1 Cost Optimization Plan</h3>
          <p className="text-sm text-white/60">Target: £2,500/mo savings</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#81C995]">£3.2k</div>
          <div className="text-xs text-white/50">Projected Savings</div>
        </div>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div className="bg-[#81C995] h-2 rounded-full" style={{ width: '100%' }}></div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white">Compute</h4>
          <span className="text-xs bg-gcp-green/10 text-gcp-green px-1.5 py-0.5 rounded font-medium">Auto-pilot</span>
        </div>
        <p className="text-xs text-white/70">Terminate 14 idle instances and right-size 8 others.</p>
        <div className="text-sm font-bold text-[#81C995] mt-2">£1,800/mo potential savings</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white">Storage</h4>
          <span className="text-xs bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded font-medium">Veto Window</span>
        </div>
        <p className="text-xs text-white/70">Delete 45 detached PDs and clean up old snapshots.</p>
        <div className="text-sm font-bold text-[#81C995] mt-2">£1,400/mo potential savings</div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-2">Regional Breakdown</h4>
      <div className="space-y-1 text-xs text-white/70">
        <div className="flex justify-between"><span>europe-west1</span><span>£1,200/mo</span></div>
        <div className="flex justify-between"><span>us-central1</span><span>£1,000/mo</span></div>
        <div className="flex justify-between"><span>asia-east1</span><span>£1,000/mo</span></div>
      </div>
    </div>
  </div>
);

export const EMEAComplianceWidget = () => (
  <div className="space-y-6">
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">EMEA Compliance Readiness Report</h3>
          <p className="text-sm text-white/60">Target: GDPR, NIS2, DORA Alignment</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#81C995]">88%</div>
          <div className="text-xs text-white/50">Overall Readiness</div>
        </div>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div className="bg-[#81C995] h-2 rounded-full" style={{ width: '88%' }}></div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-sm font-bold text-white mb-2">GDPR</div>
        <div className="text-2xl font-bold text-[#81C995]">92%</div>
        <div className="text-xs text-white/50 mt-1">Data sovereignty verified in all regions.</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-sm font-bold text-white mb-2">NIS2</div>
        <div className="text-2xl font-bold text-[#F2994A]">85%</div>
        <div className="text-xs text-white/50 mt-1">Incident reporting latency needs reduction.</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-sm font-bold text-white mb-2">DORA</div>
        <div className="text-2xl font-bold text-[#F2994A]">78%</div>
        <div className="text-xs text-white/50 mt-1">Resilience testing frequency below target.</div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Critical Gaps</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">Cross-border data transfers to US not fully mapped.</span>
          <span className="text-xs bg-red-500/20 text-gcp-red px-2 py-0.5 rounded font-bold">HIGH RISK</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">Lack of automated evidence collection for DORA Chapter III.</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">MEDIUM RISK</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">Incident response plan not tested against NIS2 timelines.</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">MEDIUM RISK</span>
        </div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Required Actions</h4>
      <ul className="list-disc list-inside text-white/70 text-sm space-y-2">
        <li>Deploy Data Mapping Agent to scan all buckets in europe-west3.</li>
        <li>Configure automated reporting triggers for incidents exceeding 2h duration.</li>
        <li>Schedule chaos engineering game-day for resilience testing.</li>
      </ul>
    </div>
  </div>
);

export const RefactorPlanWidget = () => (
  <div className="space-y-6">
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-2">Webhook Handler Refactor Plan</h3>
      <p className="text-sm text-white/60 mb-4">Transitioning from Polling to Event-Driven Architecture</p>
      <div className="flex gap-4 text-xs text-white/50">
        <span>Author: Builder Agent</span>
        <span>Target: Payments Gateway</span>
        <span>Est. Savings: £400/mo</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-2">Current State</h4>
        <div className="text-xs text-white/70 space-y-1">
          <div>• Polling interval: 5 seconds</div>
          <div>• CPU Utilization: 45% average</div>
          <div>• Latency: 200ms average</div>
          <div>• Cost: High due to continuous compute</div>
        </div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <h4 className="text-sm font-bold text-white mb-2">Proposed State</h4>
        <div className="text-xs text-white/70 space-y-1">
          <div>• Event-driven via Cloud Pub/Sub</div>
          <div>• CPU Utilization: {'< 10% on idle'}</div>
          <div>• Latency: {'< 50ms (event trigger)'}</div>
          <div>• Cost: Pay per event (estimated 70% reduction)</div>
        </div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Rollout Timeline</h4>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-16 flex-shrink-0">Phase 1</div>
          <div>
            <div className="text-sm font-bold text-white">Shadow Deployment</div>
            <div className="text-xs text-white/60">Deploy new event-driven handler in shadow mode to verify behavior. (Days 1-3)</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-16 flex-shrink-0">Phase 2</div>
          <div>
            <div className="text-sm font-bold text-white">Canary Shift</div>
            <div className="text-xs text-white/60">Shift 10% of webhook traffic to the new handler. (Day 4)</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-16 flex-shrink-0">Phase 3</div>
          <div>
            <div className="text-sm font-bold text-white">Full Rollout</div>
            <div className="text-xs text-white/60">Complete traffic shift and decommission polling infrastructure. (Day 7)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HealthCheckWidget = () => (
  <div className="space-y-6">
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Payments Platform Health Check</h3>
          <p className="text-sm text-white/60">Last scan: 5 mins ago</p>
        </div>
        <span className="text-sm bg-gcp-green/20 text-gcp-green px-3 py-1 rounded-full font-bold">HEALTHY</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">99.98%</div>
          <div className="text-xs text-white/50">Uptime (24h)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">45ms</div>
          <div className="text-xs text-white/50">Avg Latency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">1,250</div>
          <div className="text-xs text-white/50">TPS Peak</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white">API Gateway</h4>
          <span className="text-xs text-gcp-green font-bold">OK</span>
        </div>
        <p className="text-xs text-white/70">Latency within SLO. {'Error rate < 0.01%'}.</p>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white">Database</h4>
          <span className="text-xs text-amber-400 font-bold">WARN</span>
        </div>
        <p className="text-xs text-white/70">CPU usage at 75%. Connection pool nearing limit.</p>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Recent Alerts</h4>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center bg-white/5 p-2 rounded">
          <span className="text-white/80">[16:45:00] Database CPU exceeded 70% threshold.</span>
          <span className="text-white/40">Resolved by agent auto-scale (mocked).</span>
        </div>
        <div className="flex justify-between items-center bg-white/5 p-2 rounded">
          <span className="text-white/80">[16:30:00] API Gateway latency spike (120ms).</span>
          <span className="text-white/40">Temporary network blip.</span>
        </div>
      </div>
    </div>
  </div>
);

export const WarRoomWidget = () => (
  <div className="space-y-6">
    <div className="bg-red-500/10 rounded-xl p-4 border border-gcp-red flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="live-indicator bg-gcp-red"></span>
        <div>
          <div className="text-sm font-bold text-white">Active Incident: API Gateway Outage</div>
          <div className="text-xs text-white/60">Started: 12 mins ago • Duration: 00:12:45</div>
        </div>
      </div>
      <span className="text-xs bg-gcp-red text-white px-2 py-1 rounded font-bold">SEV 1</span>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Error Rate</div>
        <div className="text-2xl font-bold text-gcp-red">15.4%</div>
        <div className="text-xs text-white/40">{'Target: < 0.1%'}</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Latency (p99)</div>
        <div className="text-2xl font-bold text-gcp-red">450ms</div>
        <div className="text-xs text-white/40">{'Target: < 50ms'}</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Affected Users</div>
        <div className="text-2xl font-bold text-white">~12.4k</div>
        <div className="text-xs text-white/40">Active sessions</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Automated Actions</div>
        <div className="text-2xl font-bold text-gcp-green">3</div>
        <div className="text-xs text-white/40">Executed by agents</div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Incident Timeline</h4>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-20 flex-shrink-0">14:22:10</div>
          <div className="w-2 h-2 rounded-full bg-gcp-red mt-1 flex-shrink-0"></div>
          <div>
            <div className="text-sm font-bold text-white">Spike in 5xx errors detected</div>
            <div className="text-xs text-white/60">API Gateway reporting elevated error rates in europe-west1.</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-20 flex-shrink-0">14:23:05</div>
          <div className="w-2 h-2 rounded-full bg-gcp-blue mt-1 flex-shrink-0"></div>
          <div>
            <div className="text-sm font-bold text-white">Sentinel Agent initiated analysis</div>
            <div className="text-xs text-white/60">Correlating logs with recent deployments. Identified candidate: `v1.2.4` of Auth Service.</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-xs font-mono text-white/40 w-20 flex-shrink-0">14:25:00</div>
          <div className="w-2 h-2 rounded-full bg-gcp-green mt-1 flex-shrink-0"></div>
          <div>
            <div className="text-sm font-bold text-white">Traffic shifting initiated</div>
            <div className="text-xs text-white/60">Routing traffic away from affected region to europe-west2.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PostmortemWidget = () => (
  <div className="prose prose-invert max-w-none space-y-6">
    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10 not-prose">
      <h1 className="text-xl font-bold text-white mb-2">Postmortem: Payment Gateway Degradation</h1>
      <div className="flex gap-4 text-xs text-white/50">
        <span>Date: 2026-04-05</span>
        <span>Author: Neo SRE Agent</span>
        <span>Status: Final</span>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Executive Summary</h3>
      <p className="text-white/80 text-sm leading-relaxed">
        On April 5th, the Payment Gateway experienced a degradation in performance for approximately 45 minutes, resulting in a 5% increase in transaction latency and a 1% failure rate. The root cause was identified as a database connection pool exhaustion triggered by a sudden surge in traffic.
      </p>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Root Cause</h3>
      <p className="text-white/80 text-sm leading-relaxed">
        A promotional campaign launched by marketing caused a traffic spike that exceeded our forecasted limits. The database connection pool was statically sized and could not handle the concurrent load, leading to queuing and eventual timeouts.
      </p>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Action Items</h3>
      <ul className="list-disc list-inside text-white/70 text-sm space-y-2">
        <li>Implement dynamic connection pooling for the payments database.</li>
        <li>Update traffic forecasting models to include marketing campaign schedules.</li>
        <li>Add automated load shedding for non-critical payment paths.</li>
      </ul>
    </div>
  </div>
);

export const IntentDocWidget = () => (
  <div className="prose prose-invert max-w-none space-y-6">
    <div className="bg-gcp-blue/10 rounded-xl p-6 border border-gcp-blue not-prose">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Proposal: Auto-Scaling for ML Inference</h2>
          <p className="text-xs text-white/60">Created by: Architect Agent • Type: New Intent</p>
        </div>
        <button className="px-4 py-2 bg-gcp-blue text-white rounded-lg text-sm font-bold hover:bg-gcp-blue-hover">
          Review Intent
        </button>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Objective</h3>
      <p className="text-white/80 text-sm leading-relaxed">
        Automatically scale ML inference workloads based on request queue length and GPU utilization to optimize cost and performance.
      </p>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Success Criteria</h3>
      <ul className="list-disc list-inside text-white/70 text-sm space-y-2">
        <li>Maintain queue length below 100 requests.</li>
        <li>Keep GPU utilization above 70% during active periods.</li>
        <li>Reduce idle GPU costs by 30%.</li>
      </ul>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-bold text-lg mb-2">Guardrails</h3>
      <ul className="list-disc list-inside text-white/70 text-sm space-y-2">
        <li>Never scale below 2 active instances in production.</li>
        <li>Max instances capped at 20.</li>
        <li>Do not scale during maintenance windows.</li>
      </ul>
    </div>
  </div>
);

export const SpendAnalyticsWidget = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Total Spend (Q1)</div>
        <div className="text-2xl font-bold text-white">£34.2k</div>
        <div className="text-xs text-gcp-green flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_down</span> 5% below budget
        </div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Highest Spender</div>
        <div className="text-lg font-bold text-white">BigQuery</div>
        <div className="text-xs text-white/40">£12.4k this quarter</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Optimization Savings</div>
        <div className="text-2xl font-bold text-gcp-green">£4.5k</div>
        <div className="text-xs text-white/40">Realized by agents</div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Monthly Spend Trend</h4>
      <div className="h-40 flex items-end justify-between gap-4 px-4">
        {[
          { m: 'Jan', v: 11.2 },
          { m: 'Feb', v: 11.8 },
          { m: 'Mar', v: 11.2 },
        ].map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="w-16 bg-gcp-blue/60 rounded-t" style={{ height: `${(d.v / 15) * 100}%` }}></div>
            <span className="text-xs text-white/60 mt-2">{d.m}</span>
            <span className="text-xs text-white/40">£{d.v}k</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl overflow-hidden border border-white/10">
      <table className="w-full text-sm text-left text-white/80">
        <thead className="text-xs text-white/60 uppercase bg-white/5">
          <tr>
            <th scope="col" className="px-6 py-3">Service</th>
            <th scope="col" className="px-6 py-3">Jan</th>
            <th scope="col" className="px-6 py-3">Feb</th>
            <th scope="col" className="px-6 py-3">Mar</th>
            <th scope="col" className="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {[
            { s: 'Compute Engine', j: '£4.2k', f: '£4.5k', m: '£4.1k', t: '£12.8k' },
            { s: 'BigQuery', j: '£3.8k', f: '£4.2k', m: '£4.4k', t: '£12.4k' },
            { s: 'Cloud Storage', j: '£1.5k', f: '£1.6k', m: '£1.4k', t: '£4.5k' },
            { s: 'Networking', j: '£1.7k', f: '£1.5k', m: '£1.3k', t: '£4.5k' },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5">
              <td className="px-6 py-4 font-medium">{row.s}</td>
              <td className="px-6 py-4">{row.j}</td>
              <td className="px-6 py-4">{row.f}</td>
              <td className="px-6 py-4">{row.m}</td>
              <td className="px-6 py-4 text-gcp-green font-bold">{row.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const ComplexDiffWidget = () => (
  <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-sm font-bold text-white font-mono">src/middleware/auth.js</h3>
        <p className="text-xs text-white/40">Security Fix: Prevent timing attacks on token validation</p>
      </div>
      <span className="text-xs text-white/40 font-mono">@@ -45,10 +45,18 @@</span>
    </div>
    <div className="font-mono text-xs space-y-1 bg-[#0A0F23]/50 p-4 rounded-lg border border-white/5 text-white/80">
      <div>{`  function validateToken(req, res, next) {`}</div>
      <div>{`      const token = req.headers['x-auth-token'];`}</div>
      <div>{`      if (!token) return res.status(401).send('Access denied.');`}</div>
      <div>{` `}</div>
      <div className="text-gcp-red bg-red-500/10 px-1">{`-     if (token === process.env.AUTH_TOKEN) {`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+     // Use crypto.timingSafeEqual to prevent timing attacks`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+     const isValid = crypto.timingSafeEqual(`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+         Buffer.from(token),`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+         Buffer.from(process.env.AUTH_TOKEN)`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+     );`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+ `}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+     if (isValid) {`}</div>
      <div>{`          req.user = { role: 'admin' };`}</div>
      <div>{`          next();`}</div>
      <div>{`      } else {`}</div>
      <div className="text-gcp-red bg-red-500/10 px-1">{`-         res.status(400).send('Invalid token.');`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+         res.status(401).send('Invalid token.');`}</div>
      <div className="text-gcp-green bg-green-500/10 px-1">{`+     }`}</div>
      <div>{`  }`}</div>
      <div>{`  }`}</div>
    </div>
  </div>
);

const NEW_CODE_CONTENT = `const redis = require('./redis');

class RateLimiter {
    constructor(limit, window) {
        this.limit = limit;
        this.window = window; // in seconds
    }

    async allow(key) {
        const now = Date.now();
        const currentWindow = Math.floor(now / (this.window * 1000));
        const redisKey = \`ratelimit:\${key}:\${currentWindow}\`;

        const count = await redis.incr(redisKey);
        if (count === 1) {
            await redis.expire(redisKey, this.window);
        }

        return count <= this.limit;
    }
}

module.exports = RateLimiter;`;

export const NewCodeWidget = () => (
  <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-sm font-bold text-white font-mono">RateLimiter.js</h3>
        <p className="text-xs text-white/40">New Component: Redis-backed token bucket rate limiter</p>
      </div>
      <button className="text-xs text-gcp-blue hover:text-gcp-blue-hover">Copy Code</button>
    </div>
    <div className="font-mono text-xs bg-[#0A0F23]/50 p-4 rounded-lg border border-white/5 text-white/80 overflow-x-auto">
      <pre>{NEW_CODE_CONTENT}</pre>
    </div>
  </div>
);

export const AgentVelocityWidget = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Tasks Completed</div>
        <div className="text-2xl font-bold text-white">1,245</div>
        <div className="text-xs text-white/40">This week</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Avg Resolution Time</div>
        <div className="text-2xl font-bold text-white">4.2m</div>
        <div className="text-xs text-gcp-green flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_down</span> 12% faster
        </div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Consensus Rate</div>
        <div className="text-2xl font-bold text-white">92%</div>
        <div className="text-xs text-white/40">High agreement</div>
      </div>
      <div className="bg-[#3C444E]/30 rounded-xl p-4 border border-white/10">
        <div className="text-xs text-white/60 mb-1">Active Agents</div>
        <div className="text-2xl font-bold text-white">18</div>
        <div className="text-xs text-white/40">Online now</div>
      </div>
    </div>

    <div className="bg-[#3C444E]/30 rounded-xl p-6 border border-white/10">
      <h4 className="text-sm font-bold text-white mb-4">Task Completion Velocity</h4>
      <div className="h-32 flex items-end justify-between gap-1">
        {[100, 120, 110, 130, 140, 120, 150, 160, 140, 150, 170, 180, 190, 200, 210].map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div 
              className="w-full rounded-t bg-[#81C995]/60" 
              style={{ height: `${(val / 250) * 100}%` }}
              title={`${val} tasks`}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-white/40 mt-2">
        <span>Day 1</span>
        <span>Day 7</span>
        <span>Today</span>
      </div>
    </div>
  </div>
);
