import React, { useState } from 'react';
import { 
  Grid3X3, 
  Copy, 
  Eye, 
  Sparkles, 
  Layers, 
  Camera, 
  Film, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { DEPTH_9_SHOTS, DEPTH_MAP_EXTRACTION_PROMPT } from '../data/protocolsData';

interface DepthBoard3x3ViewProps {
  onCopy: (text: string, label: string) => void;
}

export const DepthBoard3x3View: React.FC<DepthBoard3x3ViewProps> = ({ onCopy }) => {
  const [selectedShot, setSelectedShot] = useState<number>(1);
  const [sceneSubject, setSceneSubject] = useState('An explorer traversing a luminous subterranean crystalline cavern');

  const currentShot = DEPTH_9_SHOTS.find(s => s.number === selectedShot) || DEPTH_9_SHOTS[0];

  const full3x3Prompt = `You are a cinematic storyboard generator working in DEPTH-ONLY STORYBOARD MODE.

You will receive:
IMAGE 1 — VISUAL REFERENCE: Color/rendered image defining scene look, subject identity, and lighting.
IMAGE 2 — DEPTH REFERENCE: Physically accurate linear depth map (white = nearest, black = farthest).

SCENE SUBJECT: ${sceneSubject}

TASK: Generate one final 3x3 storyboard containing nine sequential shots from the same scene.
The nine panels must form a coherent cinematic narrative sequence.
The final output must contain DEPTH MAPS ONLY (clean grayscale linear depth).

9-SHOT NARRATIVE BEAT SEQUENCE:
1. TOP LEFT — SHOT 1: ESTABLISHING WIDE (Introduce environment and spatial layout)
2. TOP CENTER — SHOT 2: MOVEMENT OR INTENTION (Subject begins to move or investigate)
3. TOP RIGHT — SHOT 3: DISCOVERY OR POINT OF VIEW (Reveal what attracted attention)
4. MIDDLE LEFT — SHOT 4: REACTION (Subject responds emotionally/physically)
5. MIDDLE CENTER — SHOT 5: PREPARATION (Preparation for central action, increase tension)
6. MIDDLE RIGHT — SHOT 6: INSERT DETAIL (Crucial tactile close-up: hand, tool, trigger, mechanism)
7. BOTTOM LEFT — SHOT 7: MAIN ACTION (Sequence primary climax, most dynamic composition)
8. BOTTOM CENTER — SHOT 8: CONSEQUENCE OR RESULT (Immediate aftermath of the action)
9. BOTTOM RIGHT — SHOT 9: RESOLUTION OR DEPARTURE (Resolve the event beat)

CONVENTIONS & CONSTRAINTS:
- White = nearest surface, Black = farthest distance.
- Pure linear depth gradients, sharp edge occlusion, NO color, NO texture, NO lighting, NO ambient occlusion.
- Grid: 3x3 (nine panels arranged 3 across by 3 down).`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 font-bold border border-slate-700">
              Workflow OAK · 5 Etapas
            </span>
            <span className="text-xs text-amber-400 font-mono">Grayscale Linear Depth · 3×3 Grid</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-amber-400" />
            Depth Map & Depth Board 3×3
          </h2>
          <p className="text-xs text-slate-400">
            O board de profundidade controla a câmera e a composição espacial. Saída exclusivamente em escala de cinza (branco = perto, preto = longe).
          </p>
        </div>

        <button
          onClick={() => onCopy(full3x3Prompt, 'Prompt 3x3 copiado!')}
          className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md"
        >
          <Copy className="w-3.5 h-3.5" />
          Copiar Prompt Board 3×3
        </button>
      </div>

      {/* Step 2 Callout: Extraction of Depth Map */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Etapa 2 da Linha de Produção
            </span>
            <h3 className="text-sm font-bold text-white">
              Prompt de Extração de Depth Map (Nano Banana / GPT Image 2)
            </h3>
          </div>
          <button
            onClick={() => onCopy(DEPTH_MAP_EXTRACTION_PROMPT, 'Prompt de Depth Map copiado!')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
          >
            <Copy className="w-3 h-3" />
            Copiar Extração
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Cole este prompt junto da sua <strong>Reference Image</strong> no gerador para extrair o mapa de profundidade físico:
        </p>

        <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
          {DEPTH_MAP_EXTRACTION_PROMPT}
        </pre>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Convenção inviolável: <strong>Branco = Mais Próximo</strong> | <strong>Preto = Mais Distante</strong> (Sem cor, luz ou texturas).</span>
        </div>
      </div>

      {/* 3x3 Grid Narrative Sequence Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 3x3 Grid */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                Matriz Narrativa de 9 Planos (3×3)
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Sequência cronológica obrigatória (Fase 3 do protocolo)
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Clique para inspecionar
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {DEPTH_9_SHOTS.map(shot => {
              const isSelected = shot.number === selectedShot;
              return (
                <div
                  key={shot.number}
                  onClick={() => setSelectedShot(shot.number)}
                  className={`group cursor-pointer rounded-lg border p-3 flex flex-col justify-between transition-all duration-150 h-36 ${
                    isSelected
                      ? 'border-amber-500 bg-slate-900 ring-1 ring-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={`font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      Shot {shot.number}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {shot.position.split(' ')[0]}
                    </span>
                  </div>

                  {/* Visual simulated depth gradient card */}
                  <div className="rounded bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-600 border border-slate-700/60 p-2 my-1 flex flex-col justify-end h-16">
                    <span className="text-[9px] font-mono font-bold text-white uppercase tracking-tight truncate">
                      {shot.title}
                    </span>
                    <span className="text-[8px] font-mono text-slate-300 truncate">
                      {shot.framing}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-slate-400 truncate">
                    {shot.actionDescription}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Shot Inspector & Rules */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  Shot 0{currentShot.number}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {currentShot.title}
                </h4>
              </div>
              <span className="text-xs font-mono text-amber-300">
                {currentShot.position}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Enquadramento Obrigatório:
                </span>
                <p className="font-mono text-slate-200 bg-slate-950 p-2 rounded border border-slate-800">
                  {currentShot.framing}
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Papel Dramático no Story Beat:
                </span>
                <p className="text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800">
                  {currentShot.narrativeRole}
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Diretriz de Profundidade Linear:
                </span>
                <p className="text-amber-200/90 font-mono text-[11px] leading-relaxed bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                  {currentShot.depthRule}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-mono text-slate-400">
              Conexão com Etapa 5 (Seedance 2.0):
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              No Seedance, este board 3×3 orienta o movimento de câmera tridimensional, enquanto a <strong>Reference Image</strong> (Etapa 3) garante a cor e o <strong>Character Sheet</strong> (Etapa 1) preserva a anatomia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
