---
task: Create User Persona
responsavel: "@ux-designer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - target-audience: Descrição do público-alvo do brief
  - market-research: Dados de mercado disponíveis
  - client-info: Informações sobre o cliente e negócio
Saida: |
  - user-personas: 1-3 personas detalhadas
  - pain-points: Dores e frustrações mapeadas
  - motivations: Motivações e objetivos
  - jobs-to-be-done: Jobs-to-be-done principais
Checklist:
  - "[ ] Definir dados demográficos e psicográficos"
  - "[ ] Mapear dores e frustrações"
  - "[ ] Mapear motivações e objetivos"
  - "[ ] Identificar jobs-to-be-done"
  - "[ ] Definir nível de consciência (escala Schwartz)"
  - "[ ] Mapear jornada de decisão"
  - "[ ] Identificar objeções principais"
---

# *create-persona

Cria personas detalhadas que guiam todas as decisões de design, copy e estratégia.

## Template de Persona

```markdown
## Persona: [Nome]

### Perfil
- **Idade:** [faixa]
- **Profissão:** [cargo/setor]
- **Localização:** [cidade/região]
- **Renda:** [faixa]
- **Nível Digital:** [básico/intermediário/avançado]

### Contexto
"[Citação que resume a mentalidade desta persona]"

### Dores e Frustrações
- [Dor principal]
- [Dor secundária]
- [Frustração recorrente]

### Objetivos e Motivações
- [Objetivo principal]
- [Motivação profunda]

### Jobs-to-be-done
"Quando [situação], quero [motivação] para que [resultado desejado]"

### Objeções Principais
1. [Objeção mais comum]
2. [Segunda objeção]

### Nível de Consciência
[ ] Inconsciente do problema
[ ] Consciente do problema
[ ] Consciente da solução
[ ] Consciente do produto
[ ] Mais consciente (já comparou opções)
```
