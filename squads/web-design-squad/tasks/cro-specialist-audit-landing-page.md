---
task: Audit Landing Page for Conversion
responsavel: "@cro-specialist"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - built-page: URL ou código da página implementada
  - analytics-data: Dados de analytics (quando disponível)
  - heatmaps: Heatmaps e gravações (quando disponível)
Saida: |
  - conversion-audit: Relatório completo de auditoria de conversão
  - priority-fixes: Lista priorizada de melhorias (impacto x esforço)
  - ab-test-suggestions: Hipóteses para testes A/B
Checklist:
  - "[ ] Avaliar clareza da proposta de valor (hero section)"
  - "[ ] Avaliar hierarquia de CTAs"
  - "[ ] Identificar pontos de fricção no formulário"
  - "[ ] Verificar presença de prova social"
  - "[ ] Verificar uso de gatilhos de conversão"
  - "[ ] Avaliar consistência da mensagem (ad → página)"
  - "[ ] Identificar distrações e elementos desnecessários"
  - "[ ] Verificar responsividade e usabilidade mobile"
---

# *audit-landing-page

Auditoria completa de conversão usando framework proprietário de 8 dimensões.

## 8 Dimensões de Avaliação

| # | Dimensão | Perguntas-Chave |
|---|----------|-----------------|
| 1 | Clareza | A proposta de valor está clara em 5 segundos? |
| 2 | Relevância | A página fala diretamente com a persona? |
| 3 | Valor | Os benefícios superam claramente os custos? |
| 4 | Fricção | O formulário/processo de conversão é simples? |
| 5 | Confiança | Há prova social, garantias, credenciais? |
| 6 | Urgência | Há motivação para agir agora? |
| 7 | Foco | A página tem UM objetivo claro? |
| 8 | Mobile | A experiência mobile converte? |

## Matriz de Priorização

```
Alto impacto + Baixo esforço → Fazer imediatamente
Alto impacto + Alto esforço → Planejar
Baixo impacto + Baixo esforço → Fazer quando possível
Baixo impacto + Alto esforço → Não fazer agora
```
