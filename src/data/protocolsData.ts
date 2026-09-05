import { StyleRegister, DepthShot } from '../types';

export const BASE_STYLE_BLOCK = `STYLE REGISTER: CINEMATIC PHOTO-REALISM (locked)
Photorealistic live-action cinematic look. Real camera optics, real
lighting physics, natural material and skin texture, true-to-life
environment colours.
Cinema-grade stills with a 24 fps temporal feel for animation.
Lighting is physically motivated: visible light-source logic, realistic
fall-off, correct shadow direction, no imaginary light.
Fine surface detail, micro-contrast, subtle natural imperfections.
NO illustration, NO anime, NO 3D render, NO cartoon, NO stylization,
NO plastic or waxy skin, NO oversharpened halos, NO duplicated anatomy,
NO fantasy lighting, NO neon overglow, NO HDR bloom abuse.`;

export const STYLE_REGISTERS: StyleRegister[] = [
  {
    id: 'register-a',
    name: 'Register A — Feature Film',
    subtitle: 'Cinema Anamorphic / 35mm Grain',
    tag: 'Feature Film',
    aspectRatio: '2.39:1 / 16:9',
    description: 'Anamorphic cinematic framing, 35mm film grain base, motivated light, deep controlled shadows, natural muted palette with single intentional accent.',
    keyFeatures: ['2.39:1 composition sense', '35mm grain base & halation', 'Hero key + motivated practicals', 'Shallow DOF on close-ups'],
    lockedContent: `REGISTER: FEATURE FILM (locked)
Anamorphic cinematic framing with a 2.39:1 composition sense.
35mm film grain base, gentle highlight halation, deep controlled shadows.
One hero key plus motivated practicals; every light has a physical source.
Muted natural palette with a single intentional accent.
Shallow depth of field on close work; wide shots hold full-frame focus.`
  },
  {
    id: 'register-b',
    name: 'Register B — Photorealistic Commercial',
    subtitle: 'High-End Product Film / Commercials',
    tag: 'Commercials (Ads)',
    aspectRatio: '16:9 or 9:16',
    description: 'High-end product-film lighting, soft controlled key, clean speculars, accurate finishes, neutral-to-warm palette, rich honest contrast.',
    keyFeatures: ['Broadcast commercial grade', 'Clean specular reflections', 'Neutral-to-warm palette', 'Matches 5x3 Ads sheets'],
    lockedContent: `REGISTER: PHOTOREALISTIC COMMERCIAL (locked)
High-end product-film lighting: soft controlled key, clean speculars,
accurate rendering of glossy and matte finishes, minimal spill.
Neutral-to-warm palette, high clarity, rich honest contrast.
Flawless but natural subject surfaces — never retouched plastic.
Reads like a paid broadcast spot. 16:9 or 9:16 as stated in the sheet.`
  },
  {
    id: 'register-c',
    name: 'Register C — Documentary Realism',
    subtitle: 'Available Light / Unfiltered Raw Authenticity',
    tag: 'Documentary',
    aspectRatio: '16:9',
    description: 'Available light first, minimal lighting intervention, honest exposure, handheld 24fps camera logic with micro-shake, native sensor grain.',
    keyFeatures: ['Available light first', 'Handheld 24fps micro-shake', 'Unretouched skin & textures', 'No beauty passes or artificial grade'],
    lockedContent: `REGISTER: DOCUMENTARY REALISM (locked)
Available light first, minimal lighting intervention. Honest exposure:
clipped or crushed areas only where physically true. Handheld 24 fps
camera logic with natural micro-shake. Unretouched skin and textures,
subtle native sensor grain, no artificial grade, no beauty passes.`
  }
];

export const DEPTH_MAP_EXTRACTION_PROMPT = `Convert this image into a physically accurate grayscale linear depth map.
White = nearest, black = farthest. Preserve geometry, silhouettes, and
occlusion boundaries. Use smooth surface depth gradients and crisp object
edges. Remove all color, texture, lighting, shading, outlines, normals,
and ambient occlusion. Output only the clean depth map.`;

export const COCA_COLA_CAN_SPECS = {
  name: 'Standard 33cl Coca-Cola Classic Can',
  heightCm: 11.5,
  diameterBodyCm: 6.6,
  diameterTopCm: 5.2,
  volumeCl: 33,
  suggestedOffsetCm: '5–10 cm (standard 7 cm)',
  orientation: 'Horizontal camera, same ground plane'
};

export const DEPTH_9_SHOTS: DepthShot[] = [
  {
    number: 1,
    position: 'Top Left',
    title: 'Establishing Wide',
    framing: 'Wide / Environmental',
    narrativeRole: 'Establishes the environment, spatial layout, and primary subject with readable foreground, midground, and background layers.',
    actionDescription: 'Introduce location and atmosphere. Subject appears within full spatial context.',
    depthRule: 'Deep gradient from dark distant horizon to prominent light foreground geometry.'
  },
  {
    number: 2,
    position: 'Top Center',
    title: 'Movement or Intention',
    framing: 'Medium Wide / Full Body',
    narrativeRole: 'Shows the subject beginning to move, investigate, approach, or prepare, holding clear screen direction.',
    actionDescription: 'Subject initiates purposeful movement across the plane.',
    depthRule: 'Subject separates cleanly from midground with distinct edge occlusion.'
  },
  {
    number: 3,
    position: 'Top Right',
    title: 'Discovery / Point of View',
    framing: 'Over-the-Shoulder / POV',
    narrativeRole: 'Reveals what has attracted the subject’s attention; spatially motivated angle.',
    actionDescription: 'Reveals point of interest in scene while preserving subject relationship.',
    depthRule: 'Foreground silhouette/shoulder near camera (lightest) framing midground focal target.'
  },
  {
    number: 4,
    position: 'Middle Left',
    title: 'Reaction',
    framing: 'Medium Close-Up',
    narrativeRole: 'Subject responds emotionally or physically while preserving exact identity and silhouette.',
    actionDescription: 'Facial and physical response to the discovery.',
    depthRule: 'Tight face depth contours with rapid fall-off into soft background.'
  },
  {
    number: 5,
    position: 'Middle Center',
    title: 'Preparation',
    framing: 'Cinematic Dynamic Angle',
    narrativeRole: 'Subject prepares for central action (turning, reaching, aiming, changing stance); heightens tension.',
    actionDescription: 'Physical windup, grip adjustment, or stance change.',
    depthRule: 'Dynamic angle emphasizing depth tension between subject limb and action target.'
  },
  {
    number: 6,
    position: 'Middle Right',
    title: 'Insert Detail',
    framing: 'Macro / Insert Detail',
    narrativeRole: 'Crucial tactile detail related to action (hand, tool, trigger, footstep, mechanism).',
    actionDescription: 'Focal tactile event that drives the plot forward.',
    depthRule: 'Extreme shallow depth layering; close object crisp white against dark surrounding.'
  },
  {
    number: 7,
    position: 'Bottom Left',
    title: 'Main Action',
    framing: 'Dynamic Action Angle',
    narrativeRole: 'Sequence’s primary physical or climactic action. Most dynamic composition in the storyboard.',
    actionDescription: 'The climactic motion or decisive interaction.',
    depthRule: 'Strong diagonal motion vectors with pronounced depth displacement.'
  },
  {
    number: 8,
    position: 'Bottom Center',
    title: 'Consequence / Result',
    framing: 'Medium / Wide Tracking',
    narrativeRole: 'Shows immediate aftermath of main action: impact, change, displacement, or transformation.',
    actionDescription: 'The direct result of the action unfolds in space.',
    depthRule: 'Re-establishes spatial environment altered by the action event.'
  },
  {
    number: 9,
    position: 'Bottom Right',
    title: 'Resolution / Departure',
    framing: 'Wide / Resolution',
    narrativeRole: 'Resolves the event beat; subject departs, settles, or surveys the concluded action.',
    actionDescription: 'Final resting state or trajectory toward the next scene.',
    depthRule: 'Balanced stable depth planes providing visual closure to the 9-beat arc.'
  }
];

export const INITIAL_STORYBOARD_PANELS = [
  { panelNumber: 1, timecode: '00:00-00:01', caption: 'Opening hero profile. Subject enters field of view.', framing: 'Wide Establishing', visualNote: 'Gentle track-in, steady camera' },
  { panelNumber: 2, timecode: '00:01-00:02', caption: 'Shift to 3/4 angle as light catches the edge contour.', framing: 'Medium Shot', visualNote: 'Motivated light sweep' },
  { panelNumber: 3, timecode: '00:02-00:03', caption: 'Subject reacts to external stimulus, turning toward frame right.', framing: 'Medium Close-Up', visualNote: 'Subtle eye-line change' },
  { panelNumber: 4, timecode: '00:03-00:04', caption: 'Over-the-shoulder perspective revealing target in midground.', framing: 'POV / OTS', visualNote: 'Rack focus toward target' },
  { panelNumber: 5, timecode: '00:04-00:05', caption: 'Macro insert of hand engaging mechanism or prop.', framing: 'Macro Insert', visualNote: 'Crisp tactile engagement' },
  { panelNumber: 6, timecode: '00:05-00:06', caption: 'Low angle showing tension in stance and posture.', framing: 'Low Angle Medium', visualNote: 'Dynamic grounded energy' },
  { panelNumber: 7, timecode: '00:06-00:07', caption: 'Subject initiates accelerated forward motion.', framing: 'Tracking Wide', visualNote: 'Rapid horizontal parallax' },
  { panelNumber: 8, timecode: '00:07-00:08', caption: 'Close profile tracking with motion blur on background.', framing: 'Close-up Profile', visualNote: 'Smooth high-speed pan' },
  { panelNumber: 9, timecode: '00:08-00:09', caption: 'Pivotal collision or engagement moment at center frame.', framing: 'Direct Center Angle', visualNote: 'Instantaneous peak impact' },
  { panelNumber: 10, timecode: '00:09-00:10', caption: 'Visual shockwave or environmental reaction expands.', framing: 'Wide Reaction', visualNote: 'Particle / dust dispersion' },
  { panelNumber: 11, timecode: '00:10-00:11', caption: 'Reverse angle on subject recovering equilibrium.', framing: 'Medium Reverse', visualNote: 'Exhalation and settling' },
  { panelNumber: 12, timecode: '00:11-00:12', caption: 'Close inspect of outcome on the focal object or prop.', framing: 'Tight Insert', visualNote: 'Evidence of transformation' },
  { panelNumber: 13, timecode: '00:12-00:13', caption: 'Subject raises head, making direct eye contact.', framing: 'Hero Portrait', visualNote: 'Signature character pose' },
  { panelNumber: 14, timecode: '00:13-00:14', caption: 'Pulling back as camera elevates, revealing full tableau.', framing: 'High Angle Wide', visualNote: 'Gradual crane-up motion' },
  { panelNumber: 15, timecode: '00:14-00:15', caption: 'Final locked composition with title card negative space.', framing: 'Locked Closing Wide', visualNote: 'Holding final frame for cut' }
];

export const PRODUCTION_PIPELINE_STEPS = [
  {
    step: 1,
    name: 'Character Reference Sheet',
    dimension: 'Trava a IDENTIDADE',
    protocolFile: 'protocols/character-reference-sheet/',
    description: 'Trava rosto, cabelo, roupas, proporções, marcas corporais e régua métrica através de 11 seções padronizadas.',
    gate: 'Gate obrigatório: exige imagem de referência anexada. Sem referência, não gera.',
    tool: 'GPT Image 2 / Midjourney'
  },
  {
    step: 2,
    name: 'Escala 2×2 com Lata 33cl',
    dimension: 'Trava as DIMENSÕES FÍSICAS REAIS',
    protocolFile: 'protocols/scale-can-2x2/',
    description: 'Compara o sujeito/objeto à lata padrão de Coca-Cola (11,5 × 6,6 × 5,2 cm) em grid 2×2 com mesma linha de chão e câmera horizontal.',
    gate: 'Gate de medidas: Proibido chutar ou inventar medidas. Deve calcular proporção exata (altura ÷ 11,5).',
    tool: 'Scale Reference Pass'
  },
  {
    step: 3,
    name: 'Reference Image & Look',
    dimension: 'Define o LOOK do Filme',
    protocolFile: 'styles/cinematic-photorealistic.md',
    description: 'Aplica o bloco BASE + um REGISTER (A: Feature Film, B: Commercial, C: Documentary) travado palavra por palavra.',
    gate: 'Um registro por produção: o mesmo texto é reutilizado no prompt de animação.',
    tool: 'Midjourney / GPT Image 2 / Nano Banana'
  },
  {
    step: 4,
    name: 'Depth Map & Board 3×3 (ou Sheet 5×3)',
    dimension: 'Define CÂMERA E COMPOSIÇÃO',
    protocolFile: 'protocols/depth-board-3x3/ e storyboard-sheet-5x3/',
    description: 'Extrai mapa linear em escala de cinza (branco = perto, preto = longe) e estrutura a sequência narrativa em 9 ou 15 quadros.',
    gate: 'O board é grayscale puro: luz e cor vêm da referência; câmera vem do board.',
    tool: 'Nano Banana (depth) + GPT Image 2'
  },
  {
    step: 5,
    name: 'Clips & Animação Final',
    dimension: 'Anima a SEQUÊNCIA',
    protocolFile: 'Seedance 2.0 Engine',
    description: 'Combina Look (Reference Image) + Câmera (Depth Board) + Identidade (Character Sheet) + Style Register original.',
    gate: 'Preservação de regras: colar o mesmo Style Register da Etapa 3 palavra por palavra.',
    tool: 'Seedance 2.0'
  }
];
