import React from 'react';
import { 
  UserCheck, 
  Scale, 
  Sparkles, 
  Grid3X3, 
  Film, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Camera, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { TabType } from '../types';
import { PRODUCTION_PIPELINE_STEPS } from '../data/protocolsData';

interface ProductionLineViewProps {
  onNavigate: (tab: TabType) => void;
}

export const ProductionLineView: React.FC<ProductionLineViewProps> = ({ onNavigate }) => {
  const stepIcons = [UserCheck, Scale, Sparkles, Grid3X3, Film];
  const stepTargets: TabType[] = ['character-sheet', 'scale-2x2', 'styles', 'depth-3x3', 'storyboard-5x3'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6">
      {/* Golden Rule Banner */}
      <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900/40 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                Regra de Ouro da Linha de Produção (OAK)
              </span>
              <span className="text-xs text-slate-400 font-mono">5 Protocolos Travados</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              A referência controla o <span className="text-amber-400">look</span>; o board de profundidade controla a <span className="text-amber-400">câmera</span>; as character sheets controlam a <span className="text-amber-400">identidade</span>.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cada protocolo trava uma dimensão exata do problema sem contaminação entre etapas. Prompts são compostos por <strong className="text-amber-200">lock blocks</strong> (palavra por palavra, nunca parafraseados) + <strong className="text-amber-200">slots</strong> (valores variáveis da produção).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('storyboard-5x3')}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
            >
              Abrir Engine 5×3
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('scale-2x2')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              Calculadora Escala Lata
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Pipeline Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Sequência Obrigatória de Travamento
          </h3>
          <span className="text-xs font-mono text-slate-400">Etapa 1 a 5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRODUCTION_PIPELINE_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx];
            const targetTab = stepTargets[idx];
            return (
              <div 
                key={step.step}
                className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      ETAPA {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                    {step.name}
                  </h4>
                  
                  <div className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-800 text-amber-300/90 border border-slate-700 mb-2">
                    {step.dimension}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-400">
                    <Lock className="w-3 h-3 text-amber-400/80 shrink-0 mt-0.5" />
                    <span className="font-mono text-[10px] leading-tight text-slate-300">
                      {step.gate}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate(targetTab)}
                    className="w-full mt-2 py-1.5 px-2 rounded-md bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all group-hover:border group-hover:border-amber-500/40"
                  >
                    <span>Configurar Etapa</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Matrix & Dimensional Lock Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-400" />
          Matriz de Separação de Responsabilidades
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">Dimensão Visual</th>
                <th className="py-2.5 px-3">Protocolo Responsável</th>
                <th className="py-2.5 px-3">Regra Inviolável</th>
                <th className="py-2.5 px-3">Formato de Saída</th>
                <th className="py-2.5 px-3">Ação Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Identidade do Personagem</td>
                <td className="py-3 px-3 font-mono text-amber-300">Character Reference Sheet v2.0</td>
                <td className="py-3 px-3 text-slate-300">11 seções, régua métrica, sem cena dramática, estúdio neutro</td>
                <td className="py-3 px-3 font-mono text-slate-400">Sheet horizontal com turnarounds</td>
                <td className="py-3 px-3">
                  <button onClick={() => onNavigate('character-sheet')} className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                    Ver v2.0 <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Escala e Proporções Físicas</td>
                <td className="py-3 px-3 font-mono text-amber-300">Protocolo Lata Coca-Cola 2×2</td>
                <td className="py-3 px-3 text-slate-300">Lata 33cl (11,5 cm) no mesmo plano de chão a 5-10 cm de distância</td>
                <td className="py-3 px-3 font-mono text-slate-400">Grid 2×2 ortogonal</td>
                <td className="py-3 px-3">
                  <button onClick={() => onNavigate('scale-2x2')} className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                    Calcular <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Estética, Iluminação e Textura</td>
                <td className="py-3 px-3 font-mono text-amber-300">Cinematic Photo-Realism (A, B, C)</td>
                <td className="py-3 px-3 text-slate-300">1 único registro por produção; colado palavra por palavra</td>
                <td className="py-3 px-3 font-mono text-slate-400">Locked text block</td>
                <td className="py-3 px-3">
                  <button onClick={() => onNavigate('styles')} className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                    Escolher <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Câmera, Profundidade e Sequência</td>
                <td className="py-3 px-3 font-mono text-amber-300">Depth Board 3×3 & Sheet 5×3</td>
                <td className="py-3 px-3 text-slate-300">Linear grayscale (branco=perto, preto=longe); 9 ou 15 beats narrativos</td>
                <td className="py-3 px-3 font-mono text-slate-400">Grid 3×3 ou 5×3 com timecodes</td>
                <td className="py-3 px-3">
                  <button onClick={() => onNavigate('depth-3x3')} className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                    Configurar <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-semibold text-white">Animação e Continuidade Temporal</td>
                <td className="py-3 px-3 font-mono text-amber-300">Seedance 2.0 Engine Call</td>
                <td className="py-3 px-3 text-slate-300">24 fps temporal feel, recebe o mesmo Style Register da Etapa 3</td>
                <td className="py-3 px-3 font-mono text-slate-400">Prompt de animação sincronizado</td>
                <td className="py-3 px-3">
                  <button onClick={() => onNavigate('storyboard-5x3')} className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                    Executar <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
