---
task: Create Design System
responsavel: "@web-designer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - brand-guidelines: Diretrizes de marca
  - target-audience: Público-alvo (influencia escolhas estéticas)
  - references: Referências visuais aprovadas
Saida: |
  - color-palette: Paleta de cores (primária, secundária, neutras, feedback)
  - typography-scale: Escala tipográfica (fonte, tamanhos, pesos, line-height)
  - spacing-system: Sistema de espaçamento (grid, margins, paddings)
  - component-library: Componentes base (botões, formulários, cards)
Checklist:
  - "[ ] Definir paleta de cores primária"
  - "[ ] Definir paleta de cores secundária e neutras"
  - "[ ] Definir cores de feedback (sucesso, erro, aviso)"
  - "[ ] Selecionar e escalar tipografia (headings, body, caption)"
  - "[ ] Definir sistema de espaçamento (4px/8px base)"
  - "[ ] Documentar componentes base"
  - "[ ] Gerar CSS variables ou tokens"
---

# *create-design-system

Cria o sistema de design base que garante consistência visual em todo o projeto.

## Paleta de Cores

```css
:root {
  /* Primária */
  --color-primary-500: #[cor-principal];
  --color-primary-600: #[tom-mais-escuro];
  --color-primary-400: #[tom-mais-claro];

  /* Neutras */
  --color-neutral-900: #[quase-preto];
  --color-neutral-100: #[quase-branco];

  /* Feedback */
  --color-success: #[verde];
  --color-error: #[vermelho];
}
```

## Tipografia

```css
:root {
  --font-heading: '[Fonte Heading]', sans-serif;
  --font-body: '[Fonte Body]', sans-serif;

  --text-4xl: clamp(2rem, 5vw, 3rem);
  --text-3xl: clamp(1.5rem, 4vw, 2.25rem);
  --text-xl: 1.25rem;
  --text-base: 1rem;
  --text-sm: 0.875rem;
}
```
