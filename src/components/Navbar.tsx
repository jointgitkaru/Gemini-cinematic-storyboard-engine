import React from 'react';
import { 
  Clapperboard, 
  Workflow, 
  Grid3X3, 
  Scale, 
  UserCheck, 
  Sparkles, 
  BookOpen, 
  Layers
} from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  copiedNotice: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, copiedNotice }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'pipeline', label: 'Pipeline (1-5)', icon: Workflow, badge: '5 Etapas' },
    { id: 'storyboard-5x3', label: 'Sheet 5×3 Engine', icon: Clapperboard, badge: '15 Shots' },
    { id: 'scale-2x2', label: 'Escala 2×2 Lata', icon: Scale, badge: '11.5cm' },
    { id: 'character-sheet', label: 'Character Sheet', icon: UserCheck, badge: 'v2.0' },
    { id: 'depth-3x3', label: 'Depth Board 3×3', icon: Grid3X3, badge: 'Grayscale' },
    { id: 'styles', label: 'Style Registers', icon: Sparkles, badge: 'A / B / C' },
    { id: 'protocols-docs', label: 'Protocolos & Repo', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('pipeline')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white font-sans">
                  Storyboard Animation Engine
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight">
                AI Cinematic Storyboards, Asset Locks & Workflows
              </p>
            </div>
          </div>

          {/* Quick Notice Alert */}
          {copiedNotice && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono animate-in fade-in zoom-in-95 duration-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {copiedNotice}
            </div>
          )}

          {/* GitHub Repo Origin Badge */}
          <div className="flex items-center gap-2">
            <a 
              href="https://github.com/jointgitkaru/Storyboards-e-Assets-Creations" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono"
            >
              <span className="text-slate-500">repo:</span>
              <span>jointgitkaru</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase tracking-wider ${
                    isActive ? 'bg-amber-500/30 text-amber-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
