import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  FileText, 
  ExternalLink, 
  FolderGit2, 
  ChevronRight, 
  Tag 
} from 'lucide-react';

interface ProtocolDoc {
  id: string;
  path: string;
  title: string;
  category: 'Linha de Produção' | 'Character Sheet' | 'Depth Board' | 'Scale Can' | 'Storyboard 5x3' | 'Estilo';
  description: string;
  summaryPoints: string[];
  rawExcerpt: string;
}

const PROTOCOL_DOCS: ProtocolDoc[] = [
  {
    id: 'readme-root',
    path: '/README.md',
    title: 'Storyboard Animation Engine — Linha de Produção',
    category: 'Linha de Produção',
    description: 'Apresentação geral do sistema de produção assistido por IA em 5 etapas e mapeamento de arquivos.',
    summaryPoints: [
      'Etapa 1: Character Reference Sheet trava a IDENTIDADE',
      'Etapa 2: Escala 2×2 com Lata trava DIMENSÕES FÍSICAS REAIS',
      'Etapa 3: Reference Image define o LOOK do filme',
      'Etapa 4: Depth Map & Board define CÂMERA E COMPOSIÇÃO',
      'Etapa 5: Clip Seedance 2.0 anima a sequência'
    ],
    rawExcerpt: `# Storyboard Animation Engine
Sistema de produção de conteúdo assistido por IA — storyboards cinematográficos,
folhas de referência de assets (identidade e escala física) e clipes animados.
Tudo parte de protocolos de prompt versionados: lock blocks + slots.

## A linha de produção
ETAPA 1   CHARACTER REFERENCE SHEET ........... trava a IDENTIDADE
ETAPA 2   ESCALA 2×2 COM LATA 33CL [opcional] . trava as DIMENSÕES FÍSICAS REAIS
ETAPA 3   REFERENCE IMAGE ..................... define o LOOK do filme
ETAPA 4   DEPTH MAP + DEPTH BOARD 3×3 ......... define CÂMERA E COMPOSIÇÃO
ETAPA 5   CLIP (SEEDANCE 2.0) ................. anima a sequência`
  },
  {
    id: 'char-readme',
    path: '/protocols/character-reference-sheet/README.md',
    title: 'Character Reference Sheet (v2.0) — README & Gates',
    category: 'Character Sheet',
    description: 'Regras de continuidade, gates obrigatórios (sem referência não gera) e as 11 seções travadas.',
    summaryPoints: [
      '11 seções de produção padronizadas',
      'Turnaround frontal, 3/4, perfil e costas com régua',
      'Gate: Proibido gerar sem imagem de referência anexada',
      'Estilo neutro de estúdio: não aplicar grades dramáticas na sheet'
    ],
    rawExcerpt: `1. Main turnaround + scale sheet — frente / ¾ / lado / costas, com régua de altura
2. Head turnaround — 4 vistas da cabeça, traços idênticos
3. Expression sheet — 6 expressões primárias + 4 micro-expressões
4. Posture variations — 3 poses (neutro, relaxado, alerta)
5. Hand gesture library — 4 estudos de mão
6. Close-up detail panels — macro: olhos, boca, textura, cabelo, tecido
7. Silhouette + depth reference
8. Wardrobe, accessories & prop card
9. Color palette — swatches com hex aproximado
10. Voice & personality notes
11. Design notes`
  },
  {
    id: 'char-prompt',
    path: '/protocols/character-reference-sheet/character-reference-sheet-prompt.md',
    title: 'Character Reference Sheet v2.0 — Prompt Completo',
    category: 'Character Sheet',
    description: 'Prompt original v2.0 com Identity Lock, Layout e as 11 seções palavra por palavra.',
    summaryPoints: [
      'Identity Lock não negociável',
      'Preservação estrita de idade, feições e proporções',
      'Swatches com hex real para colorimetria'
    ],
    rawExcerpt: `Use strictly the same character identity as the uploaded reference image:
same face, same age range, same hairstyle, same hair texture and color,
same skin tone, same facial features, same body proportions, same outfit,
same accessories, same color palette, same overall build. Do not redesign,
reinterpret, or stylize the character. Do not change ethnicity, species,
gender presentation, or body type.`
  },
  {
    id: 'scale-v1',
    path: '/protocols/scale-can-2x2/protocolo-escala-coca-cola-v1.md',
    title: 'Protocolo de Escala Coca-Cola (v1.0 Dia a Dia)',
    category: 'Scale Can',
    description: 'Prompt de invocação curto para o dia a dia e checklist rápido.',
    summaryPoints: [
      'Lata clássica 33cl: 11,5 × 6,6 × 5,2 cm',
      'Fórmula: altura sujeito ÷ 11,5 = multiplicador de proporção',
      'Distância: 5–10 cm no mesmo plano de chão horizontal'
    ],
    rawExcerpt: `Apply the Coca-Cola Dimensional Scale Protocol v1.0.

Fixed scale reference: standard 33cl Coca-Cola Classic can
(height 11.5cm, body diameter 6.6cm, top/base diameter 5.2cm),
positioned 5–10cm beside the subject, same ground plane, horizontal camera,
no forced perspective, consistent scale across all 4 panels of a 2x2 sheet.`
  },
  {
    id: 'scale-master',
    path: '/protocols/scale-can-2x2/protocolo-escala-coca-cola-MASTER-completo.md',
    title: 'Protocolo de Escala Coca-Cola — MASTER Completo',
    category: 'Scale Can',
    description: 'Regras exaustivas para forçar aderência quando modelos tentam redimensionar a lata.',
    summaryPoints: [
      'Proibição absoluta de estimativas visuais',
      'Proibição de perspectiva forçada ou zooms na lata',
      'Grid 2x2 com consistência métrica inviolável'
    ],
    rawExcerpt: `The subject's physical dimensions MUST be calculated relative to the fixed 11.5 cm can height.
DO NOT visually estimate the subject's size.
DO NOT invent dimensions.
DO NOT normalize or resize the subject independently between panels.
DO NOT make the can larger or smaller to compensate for composition.`
  },
  {
    id: 'depth-readme',
    path: '/protocols/depth-board-3x3/README.md',
    title: 'Depth Board 3×3 — Workflow & Etapas',
    category: 'Depth Board',
    description: 'Instruções para geração do depth map grayscale e criação dos 9 quadros narrativos.',
    summaryPoints: [
      'Linear depth map: branco = perto, preto = longe',
      '9 painéis sequenciais sem corte ou estilo artístico'
    ],
    rawExcerpt: `1. Reference image — define o look do filme
2. Depth map — linear depth em grayscale
3. Board 3×3 — 9 painéis só de profundidade
4. Character sheets — travar aparência
5. Clips (Seedance 2.0) — animação com mesmo Style Register`
  },
  {
    id: 'depth-prompt',
    path: '/protocols/depth-board-3x3/storyboard-prompt.md',
    title: 'Depth Storyboard 3×3 — Prompt em 8 Fases',
    category: 'Depth Board',
    description: 'Prompt exaustivo de 8 fases para gerar o grid 3×3 narrativo.',
    summaryPoints: [
      'Fase 1: Análise silenciosa dos inputs',
      'Fase 2: Definição do story beat simples',
      'Fase 3: Os 9 shots na ordem cinematográfica',
      'Fase 4-8: Aplicação das leis de gradiente linear'
    ],
    rawExcerpt: `Arranged in this exact order:
1. TOP LEFT — SHOT 1: ESTABLISHING WIDE
2. TOP CENTER — SHOT 2: MOVEMENT OR INTENTION
3. TOP RIGHT — SHOT 3: DISCOVERY OR POINT OF VIEW
4. MIDDLE LEFT — SHOT 4: REACTION
5. MIDDLE CENTER — SHOT 5: PREPARATION
6. MIDDLE RIGHT — SHOT 6: INSERT DETAIL
7. BOTTOM LEFT — SHOT 7: MAIN ACTION
8. BOTTOM CENTER — SHOT 8: CONSEQUENCE OR RESULT
9. BOTTOM RIGHT — SHOT 9: RESOLUTION OR DEPARTURE`
  },
  {
    id: 'styles-doc',
    path: '/styles/cinematic-photorealistic.md',
    title: 'Style Module — Cinematic Photo-Realism (v1.0)',
    category: 'Estilo',
    description: 'Módulo de estilo oficial: BASE + Register A (Feature Film), B (Commercial Ads) e C (Documentary).',
    summaryPoints: [
      '1 registro por produção do início ao fim',
      'Colar palavra por palavra em Reference Image e Seedance',
      'Proibição explícita de estilo 3D, cartoon ou anime nos registros fotorrealistas'
    ],
    rawExcerpt: `STYLE REGISTER: CINEMATIC PHOTO-REALISM (locked)
Photorealistic live-action cinematic look. Real camera optics, real
lighting physics, natural material and skin texture, true-to-life
environment colours.
Cinema-grade stills with a 24 fps temporal feel for animation.`
  }
];

interface ProtocolDocsViewProps {
  onCopy: (text: string, label: string) => void;
}

export const ProtocolDocsView: React.FC<ProtocolDocsViewProps> = ({ onCopy }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocId, setSelectedDocId] = useState<string>(PROTOCOL_DOCS[0].id);

  const categories = ['all', 'Linha de Produção', 'Character Sheet', 'Scale Can', 'Depth Board', 'Estilo'];

  const filteredDocs = PROTOCOL_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentDoc = PROTOCOL_DOCS.find(d => d.id === selectedDocId) || PROTOCOL_DOCS[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 font-bold border border-slate-700">
              Repositório Original
            </span>
            <span className="text-xs text-amber-400 font-mono">jointgitkaru/Storyboards-e-Assets-Creations</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Biblioteca de Protocolos & Documentação
          </h2>
          <p className="text-xs text-slate-400">
            Navegue pelos arquivos originais do repositório, protocolos de lock blocks e regras de produção.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por protocolo, arquivo ou palavra-chave..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Master Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredDocs.map(doc => {
            const isSelected = selectedDocId === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-150 ${
                  isSelected
                    ? 'border-amber-500 bg-slate-900 shadow-md shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {doc.path}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">
                  {doc.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {doc.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Active Document Content */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                {currentDoc.path}
              </span>
              <h3 className="text-base font-bold text-white">
                {currentDoc.title}
              </h3>
            </div>
            <button
              onClick={() => onCopy(currentDoc.rawExcerpt, `${currentDoc.title} Copiado!`)}
              className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Copiar Trecho
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              Pontos Chave do Protocolo:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentDoc.summaryPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Excerto do Arquivo Oficial (Locked Text):</span>
            </div>
            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 whitespace-pre-wrap leading-relaxed">
              {currentDoc.rawExcerpt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
