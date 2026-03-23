# Design Mockup — Ollirum Landing Page

## Aprovações
- ✅ Headline: "Potencialize cada hora trabalhada na sua empresa."
- ✅ Paleta: #0F0F1A + #6C63FF + #00E5A0 + #F5F5F7

## Design Tokens

```css
:root {
  /* Cores */
  --color-dark:    #0F0F1A;
  --color-purple:  #6C63FF;
  --color-green:   #00E5A0;
  --color-white:   #F5F5F7;
  --color-gray:    #8B8B9E;

  /* Gradiente principal */
  --gradient-main: linear-gradient(135deg, #6C63FF, #00E5A0);

  /* Tipografia */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* Escala de tipo */
  --text-hero:   clamp(2.5rem, 6vw, 4rem);
  --text-h2:     clamp(1.75rem, 4vw, 2.5rem);
  --text-h3:     1.25rem;
  --text-body:   1rem;
  --text-small:  0.875rem;

  /* Espaçamento */
  --section-padding: clamp(4rem, 8vw, 7rem) 1.5rem;
  --card-radius: 1rem;
  --pill-radius: 100px;
}
```

## Seções

### 1. NAVBAR
- Logo Ollirum (esquerda)
- CTA pill "Diagnóstico gratuito →" (direita, fundo #00E5A0, texto #0F0F1A)
- Sticky, fundo transparente → blur ao scroll

### 2. HERO (dark)
- Fundo: #0F0F1A
- Tag pill: "Inteligência Artificial para Empresas" (borda #6C63FF, texto #6C63FF)
- H1: "Potencialize cada hora trabalhada na sua empresa." — #F5F5F7, 64px bold
- Subheadline: Inter 20px #8B8B9E
- CTA primário: gradiente #6C63FF→#00E5A0, texto #0F0F1A bold
- CTA secundário: ghost button borda #F5F5F7 20% opacidade
- Social proof strip: 3 ícones + textos abaixo dos CTAs
- Visual: animação SVG de fluxo (linhas + nós) gradiente roxo→verde, lado direito

### 3. DOR (light)
- Fundo: #F5F5F7
- H2 centralizado: "Você reconhece alguma dessas situações?"
- 5 cards em grid 3+2: ícone emoji + título + descrição curta
- Linha final de conexão emocional

### 4. SOLUÇÃO (dark)
- Fundo: #0F0F1A
- H2: "A Ollirum transforma o que trava sua equipe em processos que rodam sozinhos."
- Split: visual antes/depois (esquerda) + bullet list com ✦ (direita)
- Bullets: texto #F5F5F7, ✦ em #00E5A0

### 5. SERVIÇOS (light)
- Fundo: #F5F5F7
- H2 centralizado
- 4 cards glassmorphism: ícone + título + descrição
- Hover: borda gradiente roxo→verde

### 6. COMO FUNCIONA (light)
- Fundo: branco
- H2 centralizado: "Simples como deve ser"
- Timeline horizontal 3 passos com linha conectora
- Cada passo: número em pill #6C63FF, ícone, título, descrição

### 7. POR QUE OLLIRUM (dark)
- Fundo: #0F0F1A
- 4 diferenciais em grid 2x2
- Ícones lineares em #00E5A0

### 8. FAQ (light)
- Fundo: #F5F5F7
- Accordion com 6 perguntas
- Chevron animado, borda #6C63FF ao expandir

### 9. CTA FINAL (dark)
- Fundo: #0F0F1A
- H2 + formulário centralizado (max-width: 640px)
- Campos: Nome, WhatsApp, Empresa, Segmento (select), Textarea
- CTA: gradiente full width no mobile
- Microcopy: "🔒 Sem spam. Seus dados estão seguros."

### 10. FOOTER
- Fundo: #080810 (mais escuro que dark)
- Logo + tagline + links legais + redes sociais

## Estilo de Componentes

### Cards
```css
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(108, 99, 255, 0.15);
  border-radius: var(--card-radius);
  backdrop-filter: blur(10px);
  transition: border-color 0.3s, transform 0.3s;
}
.card:hover {
  border-color: rgba(108, 99, 255, 0.5);
  transform: translateY(-4px);
}
```

### Botão Primário
```css
.btn-primary {
  background: linear-gradient(135deg, #6C63FF, #00E5A0);
  color: #0F0F1A;
  font-weight: 700;
  border-radius: var(--pill-radius);
  padding: 0.875rem 2rem;
  border: none;
}
```

## Responsividade
- Mobile first (320px+)
- Breakpoints: 768px (tablet), 1024px (desktop), 1280px (wide)
- Hero: stack vertical no mobile, split no desktop
- Cards serviços: 1 col mobile → 2 col tablet → 4 col desktop
- Timeline: vertical no mobile, horizontal no desktop

---
*Design por @web-designer (Vega) | Projeto Ollirum | 2026-03-20*
