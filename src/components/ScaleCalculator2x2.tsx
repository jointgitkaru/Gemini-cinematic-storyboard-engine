import React, { useState } from 'react';
import { 
  Scale, 
  Copy, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  Info, 
  ArrowRight, 
  CheckSquare, 
  Square 
} from 'lucide-react';
import { COCA_COLA_CAN_SPECS } from '../data/protocolsData';

interface ScaleCalculator2x2Props {
  onCopy: (text: string, label: string) => void;
}

export const ScaleCalculator2x2: React.FC<ScaleCalculator2x2Props> = ({ onCopy }) => {
  const [subjectName, setSubjectName] = useState('Cybernetic Combat Drone');
  const [heightCm, setHeightCm] = useState<number | ''>(46);
  const [lengthCm, setLengthCm] = useState<number | ''>(60);
  const [widthCm, setWidthCm] = useState<number | ''>(40);
  const [depthCm, setDepthCm] = useState<number | ''>('');
  const [additionalNotes, setAdditionalNotes] = useState('Rotor span 55cm, carbon fiber chassis');
  const [activeTab, setActiveTab] = useState<'v1' | 'master'>('v1');

  // Can height is fixed at 11.5 cm
  const canHeight = COCA_COLA_CAN_SPECS.heightCm;
  const numericHeight = typeof heightCm === 'number' ? heightCm : 0;
  const ratio = numericHeight > 0 ? (numericHeight / canHeight).toFixed(2) : '—';
  const hasDimensions = numericHeight > 0;

  // Generated Short Invocation Prompt (v1.0)
  const shortInvocationPrompt = `Apply the Coca-Cola Dimensional Scale Protocol v1.0.

Fixed scale reference: standard 33cl Coca-Cola Classic can
(height 11.5cm, body diameter 6.6cm, top/base diameter 5.2cm),
positioned 5–10cm beside the subject, same ground plane, horizontal camera,
no forced perspective, consistent scale across all 4 panels of a 2x2 sheet.

Do NOT guess dimensions. If subject/object measurements below are
incomplete, STOP and ask before generating. For measurable objects
without confirmed real-world dimensions, research the exact
version/model first — never assume a "typical" size.

SUBJECT DIMENSIONS:
Subject: ${subjectName || '[Specify Subject]'}
Verified height: ${numericHeight > 0 ? `${numericHeight} cm` : '[xx] cm'}
${lengthCm ? `Verified length: ${lengthCm} cm` : 'Verified length: [xx] cm (se aplicável)'}
${widthCm ? `Verified width: ${widthCm} cm` : 'Verified width: [xx] cm (se aplicável)'}
${depthCm ? `Verified depth: ${depthCm} cm` : 'Verified depth: [xx] cm (se aplicável)'}
${additionalNotes ? `Additional measurements: ${additionalNotes}` : 'Additional measurements: [se necessário]'}

CALCULATED SCALE RATIO:
Subject height ratio = ${numericHeight > 0 ? `${numericHeight} ÷ 11.5 = ${ratio}x the height of the can` : 'Pending confirmed height'}

Requested views:
1. Front
2. 3/4
3. Side
4. Rear 3/4

Style: neutral gray studio background, soft diffuse lighting,
photographic realism, no stylization, no anatomy changes.`;

  // Master Prompt rules snippet
  const masterPromptSnippet = `==================================================
MANDATORY SCALE REFERENCE — COCA-COLA CAN
==================================================
Use ONE standard 33 cl Coca-Cola Classic can as the fixed dimensional reference
object in EVERY panel.

The can MUST have these exact physical dimensions:
- Total height: 11.5 cm
- Body diameter: 6.6 cm
- Top/lid diameter: 5.2 cm
- Capacity: 33 cl

These dimensions are FIXED and MUST NOT be altered, stretched, compressed, or
approximated. The can must remain physically consistent in all four panels.

The Coca-Cola can must be positioned beside the subject at a real-world physical
distance of approximately 5–10 cm from the nearest point of the subject.

The can and the subject MUST occupy the same physical ground/reference plane
whenever the subject is standing, sitting, lying, or otherwise resting on a surface.

DO NOT place the can closer or farther away merely to make the composition
visually attractive.

==================================================
DIMENSIONAL CALCULATION — ABSOLUTE REQUIREMENT
==================================================
The subject's physical dimensions MUST be calculated relative to the fixed
11.5 cm can height.

DO NOT visually estimate the subject's size.
DO NOT invent dimensions.
DO NOT normalize or resize the subject independently between panels.
DO NOT make the can larger or smaller to compensate for composition.

The ratio between subject and can must correspond to their actual physical dimensions:
Subject (${numericHeight} cm) ÷ Can (11.5 cm) = exactly ${ratio}x the height of the can.`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-red-500/20 text-red-300 font-bold border border-red-500/30">
              Objeto Mestre Fixo: Lata 33cl
            </span>
            <span className="text-xs text-slate-400 font-mono">11,5 cm × 6,6 cm × 5,2 cm</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            Protocolo de Escala 2×2 Coca-Cola
          </h2>
          <p className="text-xs text-slate-400">
            Folha de referência dimensional 2×2 que trava as dimensões físicas reais de personagens e objetos contra a lata padrão.
          </p>
        </div>

        {/* Gate Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs ${
          hasDimensions
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          {hasDimensions ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Gate Aprovado: {ratio}× Proporção</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Gate Bloqueado: Medida Exigida</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Calculator & Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-4 h-4 text-amber-400" />
              Entrada de Dimensões Reais
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Nome do Sujeito / Objeto
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={e => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                  placeholder="ex: Cybernetic Drone, Criatura, Garrafa"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Altura Confirmada (cm) *
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="ex: 46"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Comprimento (cm)
                  </label>
                  <input
                    type="number"
                    value={lengthCm}
                    onChange={e => setLengthCm(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="ex: 60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Largura (cm)
                  </label>
                  <input
                    type="number"
                    value={widthCm}
                    onChange={e => setWidthCm(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="ex: 40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Profundidade (cm)
                  </label>
                  <input
                    type="number"
                    value={depthCm}
                    onChange={e => setDepthCm(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="opcional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Medidas Adicionais (envergadura, partes, etc.)
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                  placeholder="ex: envergadura 55cm, diâmetro 12cm"
                />
              </div>
            </div>

            {/* Calculated Multiplier Card */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
              <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider flex items-center justify-between">
                <span>Cálculo Dimensional Obrigatório</span>
                <span className="font-bold">Regra Master</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">{ratio}×</span>
                <span className="text-xs text-slate-300 font-sans">a altura da lata de Coca-Cola (11,5 cm)</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {numericHeight > 0 
                  ? `Fórmula: ${numericHeight} cm ÷ 11.5 cm = exatamente ${ratio}x da lata padrão.` 
                  : 'Preencha a altura confirmada para calcular a proporção.'}
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-slate-300 uppercase mb-2">
                Checklist Rápido (Protocolo v1.0)
              </div>
              {[
                'Lata = 11,5 × 6,6 × 5,2 cm (fixo, nunca muda)',
                'Medida do sujeito confirmada (não estimada)',
                `Proporção calculada: ${ratio}×`,
                'Distância lata-sujeito: 5–10 cm (padrão 7 cm)',
                'Câmera horizontal, no mesmo plano de chão',
                'Mesma escala nos 4 painéis do grid 2×2',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-[11px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Simulator & Prompt Generator */}
        <div className="lg:col-span-7 space-y-5">
          {/* Visual 2x2 Simulation Matrix */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Simulação Visual da Folha 2×2
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  Lata e sujeito compartilham o mesmo plano de chão horizontal
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                Fundo cinza estúdio neutro
              </span>
            </div>

            {/* 2x2 Grid of Views */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { view: '1. Front View', desc: 'Frente alinhada com lata à esquerda' },
                { view: '2. 3/4 View', desc: 'Giro de 45° mantendo mesma distância' },
                { view: '3. Side View', desc: 'Perfil exato, proporção de profundidade' },
                { view: '4. Rear 3/4 View', desc: 'Três quartos traseiro de fechamento' },
              ].map((v, i) => (
                <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex flex-col justify-between h-40">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-bold text-amber-300">{v.view}</span>
                    <span>11.5cm Ref</span>
                  </div>

                  {/* Proportional visual mockup */}
                  <div className="flex items-end justify-center gap-4 h-24 border-b border-slate-700/60 pb-1">
                    {/* Can visual */}
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-12 rounded bg-gradient-to-b from-red-600 to-red-800 border border-red-400/50 flex items-center justify-center shadow-sm">
                        <span className="text-[8px] font-bold text-white rotate-90">Coke</span>
                      </div>
                      <span className="text-[8px] font-mono text-red-400 mt-0.5">11.5cm</span>
                    </div>

                    {/* Subject visual representation scaled */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-12 rounded-t bg-gradient-to-t from-slate-700 to-slate-500 border border-slate-400/40 flex items-center justify-center text-center p-1"
                        style={{
                          height: numericHeight > 0 
                            ? `${Math.min(85, Math.max(20, (numericHeight / 11.5) * 16))}px` 
                            : '48px'
                        }}
                      >
                        <span className="text-[9px] font-mono text-slate-200 truncate font-semibold">
                          {numericHeight > 0 ? `${numericHeight}cm` : 'Sujeito'}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 mt-0.5">
                        {ratio}× lata
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                    {v.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Exporter (v1 vs Master) */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('v1')}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    activeTab === 'v1'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Prompt Invocação v1.0
                </button>
                <button
                  onClick={() => setActiveTab('master')}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    activeTab === 'master'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Regras MASTER Completas
                </button>
              </div>

              <button
                onClick={() => onCopy(
                  activeTab === 'v1' ? shortInvocationPrompt : masterPromptSnippet,
                  activeTab === 'v1' ? 'Prompt de Invocação v1 Copiado!' : 'Regras MASTER Copiadas!'
                )}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar Prompt
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-72 whitespace-pre-wrap leading-relaxed">
              {activeTab === 'v1' ? shortInvocationPrompt : masterPromptSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
