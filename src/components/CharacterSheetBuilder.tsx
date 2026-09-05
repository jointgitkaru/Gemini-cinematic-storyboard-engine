import React, { useState } from 'react';
import { 
  UserCheck, 
  Copy, 
  Palette, 
  Lock, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Layers, 
  Tag, 
  Sliders, 
  Eye, 
  FileText 
} from 'lucide-react';
import { CharacterSheetState } from '../types';

interface CharacterSheetBuilderProps {
  onCopy: (text: string, label: string) => void;
}

const DEFAULT_PRIMARY_EXPRESSIONS = [
  'Neutral',
  'Slight smile',
  'Serious',
  'Surprised',
  'Thinking',
  'Calm / relaxed'
];

const AVAILABLE_MICRO_EXPRESSIONS = [
  'Guarded / cautious',
  'Subtle smirk',
  'Brow furrowed / tension',
  'Jaw tightened / controlled intensity',
  'Skeptical squint',
  'Momentary hesitation',
  'Quiet satisfaction',
  'Suppressed amusement'
];

const DEFAULT_PALETTE = [
  { label: 'Skin Tone', hex: '#D7A78A' },
  { label: 'Hair Color', hex: '#1E1B18' },
  { label: 'Eye Color', hex: '#3B6E7D' },
  { label: 'Primary Outfit', hex: '#2A3439' },
  { label: 'Accessory Tone', hex: '#C29B38' },
  { label: 'Accent Highlight', hex: '#E74C3C' }
];

export const CharacterSheetBuilder: React.FC<CharacterSheetBuilderProps> = ({ onCopy }) => {
  const [formData, setFormData] = useState<CharacterSheetState>({
    characterId: 'CHAR-001',
    name: 'Kaelen Vance',
    alias: 'The Rift Walker',
    role: 'Protagonist / Field Specialist',
    species: 'Human',
    ageRange: '28-32',
    revision: 'v1.0',
    referenceSource: 'Attached reference image',
    signatureProps: 'Pulse chronometer wristwatch, weathered leather courier bag, magnetic visor',
    primaryExpressions: DEFAULT_PRIMARY_EXPRESSIONS,
    microExpressions: [
      'Guarded / cautious',
      'Subtle smirk',
      'Brow furrowed / tension',
      'Jaw tightened / controlled intensity'
    ],
    postures: ['Neutral baseline stance', 'Relaxed / casual stance', 'Alert / tense combat-ready stance'],
    handStudies: ['Relaxed / open', 'Characteristic habitual gesture', 'Tension / gripping weapon', 'Open / inviting hand'],
    palette: DEFAULT_PALETTE,
    includeHands: true,
    voiceNotes: 'Gravelly, measured baritone, speaks concisely with intentional pauses',
    designNotes: 'Consistent brass accents on hardware; asymmetric collar fold on left side'
  });

  const [hasRefImageConfirmed, setHasRefImageConfirmed] = useState(true);

  const toggleMicroExpression = (expr: string) => {
    setFormData(prev => {
      const exists = prev.microExpressions.includes(expr);
      if (exists) {
        return { ...prev, microExpressions: prev.microExpressions.filter(e => e !== expr) };
      } else {
        if (prev.microExpressions.length >= 4) {
          return { ...prev, microExpressions: [...prev.microExpressions.slice(1), expr] };
        }
        return { ...prev, microExpressions: [...prev.microExpressions, expr] };
      }
    });
  };

  const handleUpdatePalette = (index: number, hex: string) => {
    setFormData(prev => {
      const copy = [...prev.palette];
      copy[index] = { ...copy[index], hex };
      return { ...prev, palette: copy };
    });
  };

  // Compile the official v2.0 Character Reference Sheet Prompt
  const compiledPrompt = `# CHARACTER REFERENCE SHEET — GENERATION PROMPT v2.0

## HOW TO USE
Attach one reference image of the character. Fill in the bracketed fields in METADATA and DESIGN NOTES before running. Everything else can be used as-is.

## METADATA
CHARACTER ID: [${formData.characterId}]
NAME: [${formData.name}]
ALIAS: [${formData.alias}]
ROLE: [${formData.role}]
SPECIES: [${formData.species}]
AGE RANGE: [${formData.ageRange}]
REVISION: [${formData.revision}]
REFERENCE SOURCE: [${formData.referenceSource}]

## IDENTITY LOCK (non-negotiable — never alter)
Use strictly the same character identity as the uploaded reference image: same face, same age range, same hairstyle, same hair texture and color, same skin tone, same facial features, same body proportions, same outfit, same accessories, same color palette, same overall build. Do not redesign, reinterpret, or stylize the character. Do not change ethnicity, species, gender presentation, or body type.

## LAYOUT
Single horizontal production-style character reference sheet, multiple clearly labeled panels on a neutral light gray background, clean sans-serif labels, consistent margins, professional animation/game production board style.

### 1. MAIN TURNAROUND + SCALE SHEET
Full-body views, same lighting, same distance, same lens, same ground line across all four:
- Front
- 3/4 front
- Side
- Back

Include a faint height-reference ruler or scale ticks beside the front view, and a small neutral gray silhouette guide underneath indicating stance. Identical proportions and outfit across all four views.

### 2. HEAD TURNAROUND
Close-up head-only views: front face, 3/4 face, side profile, back of head/hair detail. Facial structure, eyes, nose, mouth, jaw, ears, and hairline must match exactly across all four.

### 3. EXPRESSION SHEET
Primary expressions (6 small close-up portraits):
${formData.primaryExpressions.map(e => `- ${e}`).join('\n')}

Micro-expressions (4 additional close-ups, acting-direction style):
${formData.microExpressions.map(e => `- "${e}"`).join('\n')}

All expressions subtle and natural, without altering skull shape, eye size, or identity.

### 4. POSTURE VARIATIONS
3 small full-body poses showing the same character in:
${formData.postures.map(p => `- ${p}`).join('\n')}
Same outfit, same proportions, same identity — only weight distribution and body language change.

${formData.includeHands ? `### 5. HAND GESTURE LIBRARY
4 close-up hand studies:
${formData.handStudies.map(h => `- ${h}`).join('\n')}
Same skin tone, proportions, and any rings/gloves/accessories.` : '### 5. HAND GESTURE LIBRARY\n*(Omitted — character has no expressive hands)*'}

### 6. CLOSE-UP DETAIL PANELS
Macro shots of:
- Eyes, iris detail and reflections
- Mouth and facial micro-texture
- Hair texture and flow lines
- Ear and accessory details
- Clothing fabric detail (seams, buttons, material weave, weathering)

### 7. SILHOUETTE + DEPTH REFERENCE
A) Silhouette: two flat, solid-gray anatomical silhouettes (front and side) on a neutral background, no internal detail — pure outline and proportion reference.
B) Depth pass placeholder: grayscale approximation only (white = nearest, black = farthest), no lighting, texture, or shading baked in.
*Note: treat this panel as a stylized approximation. For production-accurate depth, use dedicated depth map pass afterward.*

### 8. WARDROBE, ACCESSORIES & PROP CARD
Signature Props: ${formData.signatureProps || '[Specify key props]'}
Flat/laid-out views of each clothing item and accessory with distinguishing traits and narrative purpose.

### 9. COLOR PALETTE
Extracted swatches with approximate hex values:
${formData.palette.map(p => `- ${p.label}: ${p.hex}`).join('\n')}

### 10. VOICE & PERSONALITY NOTES
${formData.voiceNotes}

### 11. DESIGN NOTES
ID: ${formData.characterId} | Rev: ${formData.revision}
${formData.designNotes}
Do NOT apply cinematic dramatic grades to this production sheet. Keep lighting neutral studio diffuse.`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              Protocolo v2.0 Oficial
            </span>
            <span className="text-xs text-slate-400 font-mono">11 Seções · Identity Lock</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            Character Reference Sheet (v2.0)
          </h2>
          <p className="text-xs text-slate-400">
            Folha de produção para travar a identidade do personagem em todos os shots subsequentes (turnaround, expressões, paleta hex e régua métrica).
          </p>
        </div>

        {/* Reference Image Gate confirmation toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <input
              type="checkbox"
              checked={hasRefImageConfirmed}
              onChange={e => setHasRefImageConfirmed(e.target.checked)}
              className="rounded border-slate-700 text-amber-500 focus:ring-amber-400"
            />
            <span>Imagem de Referência Anexada</span>
          </label>
        </div>
      </div>

      {/* Mandatory Gate Warning if unconfirmed */}
      {!hasRefImageConfirmed && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 text-red-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold font-mono">GATE ATIVO: NÃO GERAR SEM IMAGEM DE REFERÊNCIA</p>
            <p className="text-slate-300">
              O prompt v2.0 exige imagem de referência anexada (&ldquo;Attach one reference image of the character&rdquo;). O <code>IDENTITY LOCK</code> depende dessa âncora visual para impedir alucinações de traços faciais ou proporções.
            </p>
          </div>
        </div>
      )}

      {/* Main Form & Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Metadata & Sections */}
        <div className="lg:col-span-6 space-y-5">
          {/* Metadata Section */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Tag className="w-4 h-4 text-amber-400" />
              Campos de Metadados (v2.0)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  CHARACTER ID
                </label>
                <input
                  type="text"
                  value={formData.characterId}
                  onChange={e => setFormData({ ...formData, characterId: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  NOME DO PERSONAGEM
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  ALIAS / CODINOME
                </label>
                <input
                  type="text"
                  value={formData.alias}
                  onChange={e => setFormData({ ...formData, alias: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  PAPEL NARRATIVO
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  ESPÉCIE
                </label>
                <input
                  type="text"
                  value={formData.species}
                  onChange={e => setFormData({ ...formData, species: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  FAIXA ETÁRIA
                </label>
                <input
                  type="text"
                  value={formData.ageRange}
                  onChange={e => setFormData({ ...formData, ageRange: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                PROPS E ACESSÓRIOS CHAVE
              </label>
              <input
                type="text"
                value={formData.signatureProps}
                onChange={e => setFormData({ ...formData, signatureProps: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                placeholder="ex: relógio, espada, jaqueta com insígnia"
              />
            </div>
          </div>

          {/* Micro-Expressions Selector */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Micro-Expressões (Escolha 4 para Direção de Atuação)
              </h4>
              <span className="text-[11px] font-mono text-amber-400">
                {formData.microExpressions.length}/4 Selecionadas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_MICRO_EXPRESSIONS.map(expr => {
                const isSelected = formData.microExpressions.includes(expr);
                return (
                  <button
                    key={expr}
                    onClick={() => toggleMicroExpression(expr)}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono text-left transition-colors flex items-center justify-between border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{expr}</span>
                    {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                Seção 9: Color Palette (Hex Swatches)
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Amostras de Produção</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formData.palette.map((color, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                  <input
                    type="color"
                    value={color.hex}
                    onChange={e => handleUpdatePalette(idx, e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-slate-400 font-medium truncate">
                      {color.label}
                    </span>
                    <span className="block text-[11px] font-mono text-slate-200 font-bold uppercase">
                      {color.hex}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form: 11 Sections Inventory & Compiled Prompt */}
        <div className="lg:col-span-6 space-y-5">
          {/* 11 Sections Checklist */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              11 Seções Padronizadas da Sheet v2.0
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">01.</span>
                <span>Turnaround + Régua Escala</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">02.</span>
                <span>Head Turnaround (4 Vistas)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">03.</span>
                <span>6 Expressões + 4 Micros</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">04.</span>
                <span>3 Variações de Postura</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">05.</span>
                <span>Livraria de Mãos (4 Estudos)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">06.</span>
                <span>Panels Macro (Olho, Pele, Tecido)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">07.</span>
                <span>Silhueta + Depth Pass</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">08.</span>
                <span>Wardrobe & Prop Card</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">09.</span>
                <span>Paleta com Hex Real</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold">10.</span>
                <span>Notas de Voz e Atuação</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/80 sm:col-span-2">
                <span className="text-amber-400 font-bold">11.</span>
                <span>Design Notes (ID, Versão, Métricas)</span>
              </div>
            </div>
          </div>

          {/* Compiled Prompt Display */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Prompt v2.0 Compilado (Word-for-Word)
                </h3>
              </div>
              <button
                onClick={() => onCopy(compiledPrompt, 'Prompt v2.0 copiado com sucesso!')}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar Prompt v2.0
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-96 whitespace-pre-wrap leading-relaxed">
              {compiledPrompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
