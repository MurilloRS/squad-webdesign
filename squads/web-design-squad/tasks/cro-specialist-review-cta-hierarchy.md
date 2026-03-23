---
task: Review CTA Hierarchy
responsavel: "@cro-specialist"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - page-copy: Textos da página com CTAs identificados
  - page-layout: Layout/mockup da página
  - user-journey: Jornada do usuário mapeada
Saida: |
  - cta-hierarchy-map: Mapa de hierarquia de CTAs da página
  - friction-points: Pontos de fricção identificados
  - recommendations: Recomendações de otimização priorizadas
Checklist:
  - "[ ] Mapear todos os CTAs da página"
  - "[ ] Definir CTA primário, secundário e terciário"
  - "[ ] Avaliar posicionamento (above the fold, repetição)"
  - "[ ] Avaliar texto dos CTAs (verbo de ação + benefício)"
  - "[ ] Avaliar contraste visual dos CTAs"
  - "[ ] Identificar CTAs concorrentes ou conflitantes"
  - "[ ] Recomendar ajustes de hierarquia"
---

# *review-cta-hierarchy

Analisa e otimiza a hierarquia de CTAs para maximizar a taxa de conversão.

## Princípios de CTA de Alta Conversão

**Texto:**
- Verbo de ação específico: "Quero", "Começar", "Agendar" > "Enviar", "Clique aqui"
- Benefício imediato: "Quero meu desconto" > "Enviar formulário"
- Primeira pessoa: "Quero começar" > "Começar agora"

**Visual:**
- CTA primário: maior contraste de cor da página
- Tamanho adequado para toque mobile (mín. 44x44px)
- Espaço em branco ao redor para respirar

**Posicionamento:**
- Above the fold obrigatório
- Repetir CTA em seções-chave (após benefícios, após depoimentos)
- CTA final com reforço de oferta + microcopy de redução de risco

**Hierarquia:**
```
CTA Primário   → Uma ação principal, máximo destaque
CTA Secundário → Ação alternativa de menor compromisso
CTA Terciário  → Ancoragem (ex: "Saiba mais primeiro")
```
