---
task: Review Brand Consistency
responsavel: "@creative-director"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - deliverables: Entregáveis a revisar (copy, mockup, código)
  - brand-guidelines: Diretrizes de marca estabelecidas
  - brand-pillars: Pilares da marca
Saida: |
  - consistency-report: Relatório de coerência
  - adjustment-list: Lista de ajustes necessários (se houver)
  - approval-status: APROVADO / AJUSTES NECESSÁRIOS
Checklist:
  - "[ ] Verificar alinhamento com positioning statement"
  - "[ ] Verificar consistência de tom de voz"
  - "[ ] Verificar consistência visual (cores, tipografia)"
  - "[ ] Verificar coerência narrativa"
  - "[ ] Verificar alinhamento com público-alvo"
  - "[ ] Emitir parecer final"
---

# *review-brand-consistency

Revisão final de coerência de marca antes de aprovação ou entrega ao cliente.

## Critérios de Avaliação

| Critério | Peso | Status |
|----------|------|--------|
| Alinhamento com posicionamento | Alto | [ ] |
| Consistência de tom de voz | Alto | [ ] |
| Consistência visual | Alto | [ ] |
| Coerência narrativa | Médio | [ ] |
| Alinhamento com público-alvo | Alto | [ ] |

## Resultado

- **APROVADO** → Seguir para entrega
- **AJUSTES NECESSÁRIOS** → Listar e retornar ao agente responsável
