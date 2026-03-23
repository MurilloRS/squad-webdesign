---
task: Create User Flow
responsavel: "@ux-designer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - user-personas: Personas criadas
  - project-goals: Objetivo principal da página
  - page-type: Tipo de página (landing page, site, hotsite)
Saida: |
  - user-flow-diagram: Diagrama textual do fluxo do usuário
  - navigation-map: Mapa de navegação (seções e links)
  - interaction-points: Pontos de interação mapeados
Checklist:
  - "[ ] Definir ponto de entrada (fonte de tráfego)"
  - "[ ] Mapear primeiro contato com a página"
  - "[ ] Mapear jornada pela página (scroll flow)"
  - "[ ] Identificar pontos de decisão"
  - "[ ] Mapear ponto de conversão"
  - "[ ] Mapear fluxo pós-conversão"
---

# *create-user-flow

Mapeia a jornada completa do usuário desde a chegada até a conversão.

## Fluxo Típico de Landing Page

```
ENTRADA
  ├── Google Ads / SEO / Social
  └── Email / Direto

HERO (0-5 segundos)
  ├── Proposta de valor captada → continua
  └── Não captada → bounce

SCROLL FLOW
  ├── Identificação com o problema
  ├── Curiosidade sobre a solução
  ├── Avaliação de benefícios
  ├── Verificação de credibilidade
  └── Decisão de agir

CONVERSÃO
  ├── Clique no CTA
  ├── Preenchimento de formulário
  └── Confirmação / Thank You Page

PÓS-CONVERSÃO
  ├── Email de boas-vindas
  └── Próximo passo da jornada
```

## Pontos de Atenção

- **Momento de saída mais comum:** Hero sem proposta clara
- **Maior fricção:** Formulário com muitos campos
- **Maior acelerador:** Prova social relevante
