---
task: Write Headline
responsavel: "@copywriter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - creative-brief: Briefing do projeto
  - positioning-statement: Posicionamento da marca
  - target-audience: Persona e nível de consciência
Saida: |
  - headline-options: 5-7 opções de headline principal
  - subheadline-options: 3-5 opções de subheadline
  - rationale: Justificativa para as melhores opções
Checklist:
  - "[ ] Identificar nível de consciência do público"
  - "[ ] Definir ângulo principal (benefício, curiosidade, problema, transformação)"
  - "[ ] Escrever 5-7 headlines com abordagens diferentes"
  - "[ ] Escrever 3-5 subheadlines complementares"
  - "[ ] Justificar top 2-3 opções"
---

# *write-headline

Cria opções de headline e subheadline para a hero section da landing page.

## Frameworks de Headline

### Por Nível de Consciência

**Inconsciente do problema:**
- Foco em resultado/transformação desejada
- Ex: "Tenha [resultado desejado] em [tempo]"

**Consciente do problema:**
- Foco em nomear e validar a dor
- Ex: "Cansado de [problema]? Existe uma solução melhor"

**Consciente da solução:**
- Foco no diferencial
- Ex: "O único [produto] que [diferencial específico]"

## Formulas Testadas

```
[Resultado desejado] sem [dor/obstáculo]
Como [persona] conseguiu [resultado] em [tempo]
A verdade sobre [problema comum]
Finalmente: [solução] para [persona]
[Número] em [tempo] — sem [objeção comum]
```

## Critérios de Qualidade

- [ ] Específico (números, tempo, resultado concreto)
- [ ] Orientado ao benefício (não à feature)
- [ ] Cria curiosidade ou urgência
- [ ] Alinhado com a persona e nível de consciência
- [ ] Complementado pelo subheadline
