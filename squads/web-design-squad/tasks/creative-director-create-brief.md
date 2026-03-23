---
task: Create Creative Brief
responsavel: "@creative-director"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - client-info: Nome da empresa, produto/serviço, mercado
  - project-goals: Objetivo principal da página (leads, vendas, awareness)
  - target-audience: Público-alvo inicial
  - references: Sites de referência (opcional)
Saida: |
  - creative-brief: Documento completo de briefing
  - brand-guidelines-draft: Diretrizes iniciais de marca
  - project-scope: Escopo definido (tipo de página, seções, funcionalidades)
Checklist:
  - "[ ] Coletar informações do cliente/projeto"
  - "[ ] Definir objetivo principal e KPIs"
  - "[ ] Descrever público-alvo e contexto"
  - "[ ] Mapear concorrentes e referências"
  - "[ ] Definir escopo (tipo de página, seções necessárias)"
  - "[ ] Estabelecer diretrizes iniciais de marca"
  - "[ ] Definir próximos passos e agentes envolvidos"
---

# *create-brief

Cria o briefing criativo completo do projeto — ponto de partida para todo o trabalho do squad.

## Estrutura do Brief

```markdown
# Creative Brief — [Nome do Projeto]

## Sobre o Projeto
- **Cliente/Empresa:**
- **Produto/Serviço:**
- **Tipo de Página:** (Landing Page / Site Institucional / Hotsite / etc.)

## Objetivo
- **Objetivo Principal:** (ex: captar leads qualificados)
- **KPI de Sucesso:** (ex: taxa de conversão > 3%)
- **Call-to-Action Principal:**

## Público-Alvo
- **Perfil:**
- **Dores principais:**
- **Motivações:**
- **Nível de consciência:** (Inconsciente / Consciente do problema / Consciente da solução)

## Mensagem Central
- **Proposta de Valor:**
- **Diferencial Principal:**
- **Tom desejado:**

## Escopo
- **Seções da Página:**
- **Funcionalidades:**
- **Integrações:**

## Referências
- **Sites que gosta:**
- **Sites que não gosta:**
- **Concorrentes diretos:**

## Próximos Passos
1. @ux-designer *create-persona
2. @storyteller *create-brand-story
3. @copywriter *write-headline
```
