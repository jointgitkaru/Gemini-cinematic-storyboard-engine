import React, { useState } from 'react';
import { 
  Clapperboard, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Play, 
  Clock, 
  Film, 
  Lock, 
  Settings2, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { StoryboardPanel, StyleRegisterKey } from '../types';
import { INITIAL_STORYBOARD_PANELS, BASE_STYLE_BLOCK, STYLE_REGISTERS } from '../data/protocolsData';

interface Storyboard5x3EngineProps {
  onCopy: (text: string, label: string) => void;
}

export const Storyboard5x3Engine: React.FC<Storyboard5x3EngineProps> = ({ onCopy }) => {
  const [currentState, setCurrentState] = useState<number>(3); // Default to State 3 (Generate Sheet 5x3)
  const [category, setCategory] = useState<'ads' | 'non-ads'>('ads');
  const [titleWord, setTitleWord] = useState('FORGED');
  const [formatLabel, setFormatLabel] = useState('15 SEC');
  const [subject, setSubject] = useState('Minimalist aerospace-grade titanium smartphone');
  const [colourway, setColourway] = useState('Obsidian Matte & Polished Silver');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [selectedRegister, setSelectedRegister] = useState<StyleRegisterKey>('register-b');
  const [panels, setPanels] = useState<StoryboardPanel[]>(INITIAL_STORYBOARD_PANELS);
  const [activePanelIdx, setActivePanelIdx] = useState<number | null>(0);
  const [showPromptPreview, setShowPromptPreview] = useState(true);

  const activeRegister = STYLE_REGISTERS.find(r => r.id === selectedRegister) || STYLE_REGISTERS[1];

  // Compile the word-for-word prompt based on the engine specifications
  const compiledPrompt = `STORYBOARD SHEET 5x3 PROTOCOL (v2.0 Claude Code Edition)
FORMAT: 5x3 GRID · 15 PANELS · 15 SECONDS RUNTIME (1s / panel)
HEADER: [${titleWord.toUpperCase()}] · [${formatLabel.toUpperCase()}]
SUBJECT: ${subject}
COLOURWAY: ${colourway}
ASPECT RATIO: ${aspectRatio}

${BASE_STYLE_BLOCK}

${activeRegister.lockedContent}

LOCKED FORMAT & CHROME RULES:
- Exactly 15 panels arranged in a 5 across by 3 down grid (5x3).
- Read strictly left-to-right, top-to-bottom (Panel 1 opens at 00:00, Panel 15 closes at 00:15).
- Every panel carries visible chrome: panel number (1-15), precise timecode, and a single-line caption under the panel.
- Header block displays "${titleWord.toUpperCase()}" on left and "${formatLabel.toUpperCase()}" on right.
- Motion is present in every panel; no two consecutive panels share the exact same framing.
- Colourway and identity remain locked across all 15 panels.

15-PANEL SEQUENCE BREAKDOWN:
${panels.map(p => `PANEL ${p.panelNumber.toString().padStart(2, '0')} [${p.timecode}] (${p.framing}): ${p.caption}`).join('\n')}

ANIMATION DISPATCH (Seedance 2.0):
"Animate the 15-panel storyboard sequence maintaining 24 fps cinematic temporal flow, strict 1-second per beat transitions, and applying ${activeRegister.name} word-for-word."`;

  const handleUpdatePanel = (index: number, updates: Partial<StoryboardPanel>) => {
    setPanels(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      return copy;
    });
  };

  const handleResetPanels = () => {
    setPanels(INITIAL_STORYBOARD_PANELS);
    setActivePanelIdx(0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header & State Control */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              5 States · 7 Lock Blocks
            </span>
            <span className="text-xs text-slate-400 font-mono">15 Quadros · 0:15 Runtime</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-amber-400" />
            Storyboard Sheet 5×3 Engine
          </h2>
          <p className="text-xs text-slate-400">
            Engine agêntica para geração e render de sheets de 15 segundos (1 segundo por painel) com chrome oficial.
          </p>
        </div>

        {/* State Machine Step Bar */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-lg border border-slate-800 overflow-x-auto">
          {[
            { state: 0, label: '0: Env Check' },
            { state: 1, label: '1: Ads Spot' },
            { state: 2, label: '2: Non-Ads' },
            { state: 3, label: '3: Sheet 5x3' },
            { state: 4, label: '4: Seedance' },
          ].map(s => (
            <button
              key={s.state}
              onClick={() => {
                setCurrentState(s.state);
                if (s.state === 1) setCategory('ads');
                if (s.state === 2) setCategory('non-ads');
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                currentState === s.state
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Production Slots & Style Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-amber-400" />
              Configuração de Slots de Produção
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Locked Block Rules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Title Word */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                [title word] (Header esquerdo)
              </label>
              <input
                type="text"
                value={titleWord}
                onChange={e => setTitleWord(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                placeholder="ex: FORGED, CHRONO"
              />
            </div>

            {/* Format Label */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                [format label] (Header direito)
              </label>
              <input
                type="text"
                value={formatLabel}
                onChange={e => setFormatLabel(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                placeholder="ex: 15 SEC, 15 SEC SPOT"
              />
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                [aspect ratio]
              </label>
              <select
                value={aspectRatio}
                onChange={e => setAspectRatio(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              >
                <option value="16:9">16:9 (Default Sheets)</option>
                <option value="9:16">9:16 (Vertical Social)</option>
                <option value="2.39:1">2.39:1 (Anamorphic Cinema)</option>
              </select>
            </div>

            {/* Colourway */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                [colour] / Paleta Travada (Identidade)
              </label>
              <input
                type="text"
                value={colourway}
                onChange={e => setColourway(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                placeholder="ex: Obsidian Titanium & Sapphire White"
              />
            </div>

            {/* Style Register Picker */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                STYLE / LIGHTING GRADE
              </label>
              <select
                value={selectedRegister}
                onChange={e => setSelectedRegister(e.target.value as StyleRegisterKey)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 text-xs font-mono focus:border-amber-500 focus:outline-none"
              >
                <option value="register-a">Register A — Feature Film</option>
                <option value="register-b">Register B — Photoreal Commercial</option>
                <option value="register-c">Register C — Documentary Realism</option>
              </select>
            </div>

            {/* Subject */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                [SUBJECT] — Sujeito e Ação Principal
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                placeholder="Descreva o sujeito e o cenário principal"
              />
            </div>
          </div>
        </div>

        {/* Engine Constraints Checklist */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            7 Lock Blocks Ativos
          </h4>
          <div className="space-y-2 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>1. Reference Fidelity Lock</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>2. 5×3 Geometry (15 Panels)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>3. Chrome (Header + Timecodes)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>4. 0:15 Runtime (1s / panel)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>5. Framing Var. (No duplicates)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>6. Palette Consistency</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>7. Seedance Animation Hook</span>
            </div>
          </div>
          <button
            onClick={() => onCopy(compiledPrompt, 'Prompt 5x3 Copiado!')}
            className="w-full mt-2 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <Copy className="w-3.5 h-3.5" />
            Copiar Prompt 5×3
          </button>
        </div>
      </div>

      {/* 5x3 Grid Interactive Simulator */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4 shadow-2xl">
        {/* Header Block Chrome */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 px-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase">Header Chrome:</span>
            <span className="text-sm font-mono font-bold text-white tracking-widest bg-slate-900 px-3 py-1 rounded border border-slate-800">
              {titleWord.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetPanels}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              <RefreshCw className="w-3 h-3" />
              Resetar Beats
            </button>
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider bg-slate-900 px-3 py-1 rounded border border-slate-800">
              {formatLabel.toUpperCase()}
            </span>
          </div>
        </div>

        {/* The 5 across by 3 down Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {panels.map((panel, idx) => {
            const isSelected = activePanelIdx === idx;
            return (
              <div
                key={panel.panelNumber}
                onClick={() => setActivePanelIdx(idx)}
                className={`group cursor-pointer relative rounded-lg border transition-all duration-150 p-2.5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-slate-900/90 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Panel Chrome Top: Number & Timecode */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-2 pb-1.5 border-b border-slate-800/60">
                  <span className={`font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {panel.panelNumber.toString().padStart(2, '0')}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {panel.timecode}
                  </span>
                </div>

                {/* Simulated Shot Display */}
                <div className="h-20 rounded bg-slate-950/80 border border-slate-800/80 p-2 flex flex-col justify-between mb-2 group-hover:border-slate-700">
                  <span className="text-[9px] font-mono text-amber-400/90 uppercase tracking-tight">
                    {panel.framing}
                  </span>
                  <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                    {panel.caption}
                  </p>
                </div>

                {/* Bottom chrome note */}
                <div className="text-[9px] font-mono text-slate-500 truncate">
                  {panel.visualNote}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Panel Detail Editor */}
        {activePanelIdx !== null && (
          <div className="rounded-lg border border-amber-500/30 bg-slate-900/80 p-4 mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  Editar Quadro {panels[activePanelIdx].panelNumber.toString().padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Timecode: {panels[activePanelIdx].timecode}
                </span>
              </div>
              <span className="text-xs font-mono text-amber-300">
                1 segundo / beat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Enquadramento (Framing)
                </label>
                <input
                  type="text"
                  value={panels[activePanelIdx].framing}
                  onChange={e => handleUpdatePanel(activePanelIdx, { framing: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Legenda do Painel (Caption Chrome)
                </label>
                <input
                  type="text"
                  value={panels[activePanelIdx].caption}
                  onChange={e => handleUpdatePanel(activePanelIdx, { caption: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compiled Word-for-Word Prompt Inspector */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Prompt de Invocação da Sheet 5×3 (Word-for-Word)
            </h3>
          </div>
          <button
            onClick={() => onCopy(compiledPrompt, 'Prompt 5x3 copiado!')}
            className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            Copiar Texto Completo
          </button>
        </div>

        <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-80 whitespace-pre-wrap leading-relaxed">
          {compiledPrompt}
        </pre>
      </div>
    </div>
  );
};
