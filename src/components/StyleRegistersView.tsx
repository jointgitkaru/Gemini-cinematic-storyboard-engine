import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Film, 
  Camera, 
  Tv, 
  AlertTriangle, 
  Check, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import { StyleRegisterKey } from '../types';
import { BASE_STYLE_BLOCK, STYLE_REGISTERS } from '../data/protocolsData';

interface StyleRegistersViewProps {
  onCopy: (text: string, label: string) => void;
}

export const StyleRegistersView: React.FC<StyleRegistersViewProps> = ({ onCopy }) => {
  const [activeRegisterId, setActiveRegisterId] = useState<StyleRegisterKey>('register-a');

  const activeRegister = STYLE_REGISTERS.find(r => r.id === activeRegisterId) || STYLE_REGISTERS[0];

  const fullCombinedText = `${BASE_STYLE_BLOCK}\n\n${activeRegister.lockedContent}`;

  const registerIcons: Record<StyleRegisterKey, React.FC<{ className?: string }>> = {
    'register-a': Film,
    'register-b': Tv,
    'register-c': Camera,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              Módulo de Estilo v1.0 Oficial
            </span>
            <span className="text-xs text-slate-400 font-mono">BASE + 1 Registro Fixo</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Style Module — Cinematic Photo-Realism
          </h2>
          <p className="text-xs text-slate-400">
            Formato da casa: bloco BASE + um REGISTER, colados palavra por palavra (locked) nos prompts de geração de imagem de referência e animação.
          </p>
        </div>

        <button
          onClick={() => onCopy(fullCombinedText, `BASE + ${activeRegister.name} Copiado!`)}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md"
        >
          <Copy className="w-3.5 h-3.5" />
          Copiar Bloco Completo (BASE + {activeRegister.tag})
        </button>
      </div>

      {/* Rules of Engagement Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 font-sans">
            <p className="font-bold text-emerald-300 font-mono text-xs">ONDE COLAR O MÓDULO DE ESTILO:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-xs">
              <li><strong>Reference Image</strong> (Etapa 3): define a estética, iluminação e física do look.</li>
              <li><strong>Prompt de Animação Seedance</strong> (Etapa 5): colado palavra por palavra para preservar coerência.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 font-sans">
            <p className="font-bold text-amber-300 font-mono text-xs">ONDE NÃO APLICAR:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-xs">
              <li><strong>Depth Boards 3×3</strong>: grayscale por design, sem cor ou iluminação artística.</li>
              <li><strong>Character Reference Sheet / Escala 2×2</strong>: usam iluminação neutra de estúdio, sem drama de cena.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BASE Block Visualizer */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white font-mono">
              🔹 BLOCO BASE — Colar Sempre (Inviolável)
            </h3>
          </div>
          <button
            onClick={() => onCopy(BASE_STYLE_BLOCK, 'Bloco BASE copiado!')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
          >
            <Copy className="w-3 h-3" />
            Copiar BASE
          </button>
        </div>

        <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
          {BASE_STYLE_BLOCK}
        </pre>
      </div>

      {/* 3 Registers Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            Escolha 1 Registro para a Produção
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Regra do engine: 1 único set idêntico em todas as etapas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STYLE_REGISTERS.map(reg => {
            const isSelected = activeRegisterId === reg.id;
            const Icon = registerIcons[reg.id];
            return (
              <div
                key={reg.id}
                onClick={() => setActiveRegisterId(reg.id)}
                className={`cursor-pointer rounded-xl border p-5 flex flex-col justify-between transition-all duration-150 ${
                  isSelected
                    ? 'border-amber-500 bg-slate-900 ring-1 ring-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {reg.aspectRatio}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {reg.name}
                  </h4>
                  <p className="text-xs text-amber-300/90 font-mono mb-2">
                    {reg.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {reg.description}
                  </p>

                  <div className="space-y-1.5 border-t border-slate-800 pt-3 mb-4">
                    {reg.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    setActiveRegisterId(reg.id);
                    onCopy(reg.lockedContent, `${reg.name} Copiado!`);
                  }}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Apenas {reg.tag}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Register Full Locked Text */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white font-mono">
              Texto Travado: {activeRegister.name}
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Nunca parafrasear ou renumerar
          </span>
        </div>

        <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-amber-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
          {activeRegister.lockedContent}
        </pre>
      </div>
    </div>
  );
};
