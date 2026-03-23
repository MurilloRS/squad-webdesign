---
task: Build Page
responsavel: "@frontend-dev"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - page-mockup: Mockup visual aprovado
  - copy: Textos finais aprovados e otimizados para SEO
  - design-tokens: Tokens de design (cores, tipografia, espaçamento)
  - integrations-list: Ferramentas a integrar (analytics, formulários, pixels)
Saida: |
  - html-file: HTML semântico e acessível
  - css-file: CSS otimizado com design tokens
  - js-file: JavaScript funcional e performático
  - assets: Assets otimizados (imagens WebP, ícones SVG)
Checklist:
  - "[ ] Configurar estrutura de arquivos"
  - "[ ] Implementar HTML semântico"
  - "[ ] Implementar CSS com design tokens"
  - "[ ] Garantir responsividade mobile-first"
  - "[ ] Implementar JavaScript (interações, formulário)"
  - "[ ] Otimizar imagens (WebP, lazy loading)"
  - "[ ] Integrar ferramentas (analytics, pixels, formulário)"
  - "[ ] Implementar schema markup (JSON-LD)"
  - "[ ] Testar em múltiplos dispositivos"
  - "[ ] Verificar acessibilidade básica"
---

# *build-page

Implementa a landing page em código limpo, semântico e performático.

## Estrutura de Arquivos

```
projeto/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
└── favicon.ico
```

## Template HTML Base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title Tag SEO]</title>
  <meta name="description" content="[Meta Description SEO]">
  <!-- Open Graph -->
  <!-- Schema Markup (JSON-LD) -->
  <!-- Preconnect fontes -->
</head>
<body>
  <header><!-- Nav/Logo --></header>
  <main>
    <section id="hero"><!-- Hero --></section>
    <section id="beneficios"><!-- Benefícios --></section>
    <section id="como-funciona"><!-- Como funciona --></section>
    <section id="depoimentos"><!-- Prova social --></section>
    <section id="cta"><!-- CTA Final --></section>
    <section id="faq"><!-- FAQ --></section>
  </main>
  <footer><!-- Informações legais --></footer>
</body>
</html>
```
