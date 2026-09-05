import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { ProductionLineView } from './components/ProductionLineView';
import { Storyboard5x3Engine } from './components/Storyboard5x3Engine';
import { ScaleCalculator2x2 } from './components/ScaleCalculator2x2';
import { CharacterSheetBuilder } from './components/CharacterSheetBuilder';
import { DepthBoard3x3View } from './components/DepthBoard3x3View';
import { StyleRegistersView } from './components/StyleRegistersView';
import { ProtocolDocsView } from './components/ProtocolDocsView';
import { Layers, Sparkles, Check, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setTimeout(() => {
      setCopiedNotice(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        copiedNotice={copiedNotice} 
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'pipeline' && (
          <ProductionLineView onNavigate={setActiveTab} />
        )}

        {activeTab === 'storyboard-5x3' && (
          <Storyboard5x3Engine onCopy={handleCopy} />
        )}

        {activeTab === 'scale-2x2' && (
          <ScaleCalculator2x2 onCopy={handleCopy} />
        )}

        {activeTab === 'character-sheet' && (
          <CharacterSheetBuilder onCopy={handleCopy} />
        )}

        {activeTab === 'depth-3x3' && (
          <DepthBoard3x3View onCopy={handleCopy} />
        )}

        {activeTab === 'styles' && (
          <StyleRegistersView onCopy={handleCopy} />
        )}

        {activeTab === 'protocols-docs' && (
          <ProtocolDocsView onCopy={handleCopy} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-slate-300 font-semibold">Storyboard Animation Engine</span>
            <span>·</span>
            <span>Claude Code & OAK Edition</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>15 Panels (5×3)</span>
            <span>·</span>
            <span>9 Shots Depth (3×3)</span>
            <span>·</span>
            <span>Lata 33cl (11.5cm)</span>
            <span>·</span>
            <span>Style Registers A/B/C</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {copiedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
          <Check className="w-4 h-4" />
          <span>{copiedNotice}</span>
        </div>
      )}
    </div>
  );
};

export default App;
