---
task: Design Landing Page
responsavel: "@web-designer"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - creative-brief: Briefing completo do projeto
  - copy-draft: Textos aprovados pelo copywriter
  - brand-guidelines: Diretrizes de marca (cores, tipografia, tom visual)
Saida: |
  - page-mockup: Mockup completo da landing page (descrição detalhada ou Figma)
  - design-tokens: Tokens de design (cores, tipografia, espaçamento)
  - asset-list: Lista de assets necessários (imagens, ícones, ilustrações)
Checklist:
  - "[ ] Revisar brief e copy"
  - "[ ] Definir hierarquia visual"
  - "[ ] Criar estrutura de seções"
  - "[ ] Definir design tokens (cores, tipografia, espaçamento)"
  - "[ ] Criar mockup hero section"
  - "[ ] Criar mockup seções de conteúdo"
  - "[ ] Criar mockup seção de CTA"
  - "[ ] Definir versão mobile"
  - "[ ] Listar assets necessários"
---

# *design-landing-page

Cria o design visual completo de uma landing page, da hero section ao footer.

## Estrutura Típica de Landing Page

```
[HERO]
  - Headline principal
  - Subheadline
  - CTA primário
  - Imagem/vídeo hero

[PROVA SOCIAL]
  - Logos de clientes / números

[PROBLEMA / DOR]
  - Identificação com o usuário

[SOLUÇÃO / BENEFÍCIOS]
  - Features como benefícios

[COMO FUNCIONA]
  - Passos simples

[DEPOIMENTOS]
  - Prova social detalhada

[CTA FINAL]
  - Reforço da oferta + urgência

[FAQ]
  - Objeções respondidas

[FOOTER]
  - Informações legais
```

## Princípios de Design para Conversão

- **Hierarquia visual:** O olhar do usuário deve seguir o caminho desejado
- **Contraste:** CTA deve ter o maior contraste da página
- **Espaço em branco:** Não sobrecarregar — respiro aumenta conversão
- **Mobile-first:** 60-70% do tráfego é mobile
- **Velocidade percebida:** Design leve, sem elementos que pesam
