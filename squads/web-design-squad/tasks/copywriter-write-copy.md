---
task: Write Page Copy
responsavel: "@copywriter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - creative-brief: Briefing completo
  - page-sections: Seções da página definidas pelo web-designer
  - brand-story: Narrativa da marca (do storyteller)
  - tone-of-voice: Guia de tom de voz
Saida: |
  - full-page-copy: Texto completo de todas as seções
  - cta-texts: Textos de todos os CTAs
  - microcopy: Textos auxiliares (labels, erros, confirmações)
Checklist:
  - "[ ] Revisar brief, personas e tom de voz"
  - "[ ] Escrever hero section (headline + subheadline + CTA)"
  - "[ ] Escrever seção de problema/dor"
  - "[ ] Escrever seção de benefícios"
  - "[ ] Escrever seção de prova social"
  - "[ ] Escrever seção de como funciona"
  - "[ ] Escrever CTA final com reforço de oferta"
  - "[ ] Escrever FAQ (5-7 objeções principais)"
  - "[ ] Revisar fluxo e coerência do copy"
---

# *write-copy

Escreve o copy completo da página, seção por seção, com foco em conversão.

## Estrutura de Copy por Seção

### Hero
- Headline (já criada com *write-headline)
- Subheadline: expande o benefício, adiciona especificidade
- CTA: verbo de ação + benefício imediato

### Problema/Dor
- Espelhar a dor do usuário com empatia
- "Você já se sentiu..." — validação emocional
- Agitar a dor sem exagerar

### Solução/Benefícios
- Features → Benefícios → Transformação
- "O que você ganha" > "O que fazemos"
- Bullet points: específicos e orientados a resultado

### Prova Social
- Depoimentos: resultado específico + nome + contexto
- Números: clientes, anos, resultados mensuráveis

### CTA Final
- Reforçar oferta + reduzir risco (garantia, sem compromisso)
- Urgência/escassez quando real
- CTA com benefício: "Quero [resultado]" > "Enviar"
