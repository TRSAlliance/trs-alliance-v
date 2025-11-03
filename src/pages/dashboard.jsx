import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Missing #root element – ensure your index.html contains <div id=\"root\"></div>");
}

const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// ===== FILE: src/App.tsx =====
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";

function Header() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? "text-[#03E9F4]" : "text-white/80 hover:text-white"} px-3 py-2 rounded-md transition`;
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="font-extrabold tracking-tight text-white">
          TRS <span className="text-[#03E9F4]">Galaxy</span> Command
        </div>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink to="/dashboard" className={linkCls}>Galaxy Dashboard</NavLink>
          <NavLink to="/simulator" className={linkCls}>Simulator</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </main>
    </div>
  );
}

// ===== FILE: src/pages/Dashboard.tsx =====
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, ShieldCheck, Zap, Activity, Target, Gauge, Radar } from "lucide-react";
import PulseBar from "../components/GalaxyPulse";
import MetricTile from "../components/MetricTile";

const useMetrics = () => {
  return useMemo(() => ({
    trust: 95,
    efficiency: 31,
    retention: 26,
    safetyImprovement: 22,
    operators: 175,
    productivityUSD: 1000000,
    communityUSD: 1200000,
    readiness: 88,
  }), []);
};

const Section: React.FC<{ title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, children, right }) => (
  <section className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-[0_0_30px_rgba(124,77,255,0.15)]">
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#03E9F4] drop-shadow">{title}</h2>
        {subtitle ? <p className="text-sm text-white/70">{subtitle}</p> : null}
      </div>
      {right}
    </div>
    {children}
  </section>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-inner">{children}</div>
);

const Dashboard: React.FC = () => {
  const m = useMetrics();
  return (
    <div className="min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(3,233,244,0.15),transparent),radial-gradient(900px_500px_at_80%_110%,rgba(124,77,255,0.18),transparent),linear-gradient(135deg,#0b0f1a,#0b0f1a_60%,#0a0a14)]" />
      <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#7C4DFF]/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#03E9F4]/20 blur-3xl" />

      <PulseBar />

      {/* Header row */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">TRS <span className="text-[#03E9F4]">Galaxy</span> Command</h1>
          <p className="text-white/70">Neon cyan & violet pulse • Live ops overview • Simulator launch pad</p>
        </div>
        <Link to="/simulator" className="inline-flex items-center gap-2 rounded-xl border border-[#03E9F4]/40 bg-[#03E9F4]/10 px-4 py-2 font-semibold text-[#03E9F4] hover:bg-[#03E9F4]/20 transition">
          <Zap className="h-4 w-4" /> Launch Simulation
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <MetricTile label="Trust" value={`${m.trust}%`} icon={ShieldCheck} tint="cyan" />
        <MetricTile label="Efficiency" value={`${m.efficiency}%`} icon={TrendingUp} tint="violet" />
        <MetricTile label="Retention" value={`${m.retention}%`} icon={Users} tint="cyan" />
        <MetricTile label="Safety" value={`${m.safetyImprovement}%`} icon={Activity} tint="violet" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          <Section title="Operator Panel" subtitle="People-first metrics & flywheel impact" right={<Link to="/crew" className="text-xs md:text-sm text-white/70 hover:text-white">/crew</Link>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="text-white/70 text-xs">Operators Upskilled</div>
                <div className="text-3xl font-bold text-white">{m.operators}</div>
                <div className="text-sm text-violet-200">Human dignity preserved</div>
              </Card>
              <Card>
                <div className="text-white/70 text-xs">Productivity</div>
                <div className="text-3xl font-bold text-white">${(m.productivityUSD / 1000).toFixed(0)}K</div>
                <div className="text-sm text-cyan-200">20% up vs baseline</div>
              </Card>
              <Card>
                <div className="text-white/70 text-xs">Community Impact</div>
                <div className="text-3xl font-bold text-white">${(m.communityUSD / 1000).toFixed(0)}K</div>
                <div className="text-sm text-cyan-200">20% up vs baseline</div>
              </Card>
            </div>
          </Section>

          <Section title="Dojo Activity Feed" subtitle="Latest multi-AI consensus + actions" right={<span className="inline-flex items-center gap-1 text-white/70 text-xs md:text-sm"><Radar className="h-4 w-4" />live</span>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-[#7C4DFF]" />
                  <div className="font-semibold">Consensus</div>
                  <span className="ml-auto rounded-md bg-[#7C4DFF]/20 px-2 py-0.5 text-xs text-[#BDA7FF]">0.91</span>
                </div>
                <p className="text-sm text-white/80">Agents propose: compress audit cycle via compliance portal and playbook rollout. Risk: low. ETA: 12 days.</p>
                <div className="mt-2 text-xs text-white/50">GPT-4T • Claude • Grok • DeepSeek</div>
              </Card>
              <Card>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-[#03E9F4]" />
                  <div className="font-semibold">Last Action</div>
                  <span className="ml-auto rounded-md bg-[#03E9F4]/20 px-2 py-0.5 text-xs text-[#9AF7FF]">OK</span>
                </div>
                <p className="text-sm text-white/80">Triggered <span className="text-[#03E9F4]">/ops/escalate</span> for Site-B (audit stall &gt; 6h). Trust gate enforced.</p>
                <div className="mt-2 text-xs text-white/50">Ref: 2025-10-30T12:12:00Z</div>
              </Card>
            </div>
          </Section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Section title="Galaxy Map (placeholder)" subtitle="Sectors • Beacon status • Heatmap">
            <div className="relative h-64 rounded-xl overflow-hidden">
              {/* Starfield */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(3,233,244,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(124,77,255,0.25),transparent_45%)]" />
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'><circle cx='5' cy='5' r='0.6' fill='white' opacity='0.8'/><circle cx='30' cy='20' r='0.5' fill='white' opacity='0.6'/><circle cx='60' cy='70' r='0.7' fill='white' opacity='0.9'/><circle cx='90' cy='40' r='0.6' fill='white' opacity='0.7'/></svg>")` }} />
              <div className="absolute inset-0 grid place-items-center">
                <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/80">3 beacons online • 1 pending</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg border border-[#03E9F4]/30 bg-[#03E9F4]/10 px-2 py-1 text-[#9AF7FF]">Pilot</div>
              <div className="rounded-lg border border-[#7C4DFF]/30 bg-[#7C4DFF]/10 px-2 py-1 text-[#BDA7FF]">Multi-Site</div>
              <div className="rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-white/80">National</div>
            </div>
          </Section>

          <Section title="GhostShift Launch Pad" subtitle="Start the visual simulator">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-white/70">Route to <code className="text-[#03E9F4]">/simulator</code> (placeholder page; wire to live app when ready).</div>
              <Link to="/simulator" className="inline-flex items-center gap-2 rounded-xl border border-[#7C4DFF]/40 bg-[#7C4DFF]/10 px-4 py-2 font-semibold text-[#BDA7FF] hover:bg-[#7C4DFF]/20 transition">
                <Zap className="h-4 w-4" /> Launch
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// ===== FILE: src/components/GalaxyPulse.tsx =====
import React from "react";

const PulseBar: React.FC = () => {
  return (
    <div className="relative mb-6">
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="animate-[pulse-run_3s_linear_infinite] h-full w-1/3 bg-gradient-to-r from-[#03E9F4] via-[#7C4DFF] to-transparent" />
      </div>
      <style>
        {`@keyframes pulse-run { 0% { transform: translateX(-100%); opacity: 0.8; } 50% { opacity: 1; } 100% { transform: translateX(300%); opacity: 0.8; } }`}
      </style>
    </div>
  );
};

export default PulseBar;

// ===== FILE: src/components/MetricTile.tsx =====
import React from "react";
import type { ComponentType } from "react";

type TintKey = "cyan" | "violet";

const tints: Record<TintKey, { border: string; bg: string; text: string }> = {
  cyan: { border: "border-[#03E9F4]/40", bg: "bg-[#03E9F4]/10", text: "text-[#9AF7FF]" },
  violet: { border: "border-[#7C4DFF]/40", bg: "bg-[#7C4DFF]/10", text: "text-[#BDA7FF]" },
};

interface Props {
  label: string;
  value: string | number;
  icon?: ComponentType<{ className?: string }>;
  tint?: TintKey;
}

const MetricTile: React.FC<Props> = ({ label, value, icon: Icon, tint = "cyan" }) => {
  const c = tints[tint] || tints.cyan;
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-4 backdrop-blur-md shadow-md`}>
      <div className="flex items-center gap-3">
        {Icon ? <Icon className={`${c.text} h-5 w-5`} /> : null}
        <div className="text-sm text-white/70">{label}</div>
        <div className="ml-auto text-2xl font-extrabold text-white">{value}</div>
      </div>
    </div>
  );
};

export default MetricTile;

// ===== FILE: src/pages/Simulator.tsx =====
import React from "react";
import { Link } from "react-router-dom";

const Simulator: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center">
      <div className="max-w-xl text-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">GhostShift Simulator</h1>
        <p className="text-white/70 mb-4">This is a placeholder route. Wire this to your live GhostShift app or embed the visual simulation component when ready.</p>
        <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-[#03E9F4]/40 bg-[#03E9F4]/10 px-4 py-2 font-semibold text-[#03E9F4] hover:bg-[#03E9F4]/20 transition">⟵ Back</Link>
      </div>
    </div>
  );
};

export default Simulator;

// ===== FILE: tests/smoke.ts =====
// Minimal smoke tests run at load time to catch obvious regressions.
// In a real repo, these would be Jest/Vitest tests. Here we log assertions.
function assert(condition: boolean, message: string) {
  if (!condition) {
    // eslint-disable-next-line no-console
    console.error("[SMOKE TEST FAILED]", message);
  }
}

(function runSmokeTests() {
  try {
    // Ensure critical components are functions
    assert(typeof (Dashboard as any) === "function", "Dashboard should be a function component");
    assert(typeof (Simulator as any) === "function", "Simulator should be a function component");
    // Check palette tokens are present in MetricTile tints
    assert(!!(tints as any).cyan && !!(tints as any).violet, "MetricTile tints should include cyan and violet");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[SMOKE TEST ERROR]", e);
  }
})();
