---
task: Optimize Performance
responsavel: "@frontend-dev"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - built-page: Página implementada
Saida: |
  - performance-report: Relatório de métricas (Lighthouse score)
  - optimized-assets: Assets otimizados
  - core-web-vitals-score: LCP, FID/INP, CLS scores
Checklist:
  - "[ ] Rodar Lighthouse audit"
  - "[ ] Otimizar imagens (WebP, compressão, lazy loading)"
  - "[ ] Minificar CSS e JS"
  - "[ ] Implementar critical CSS inline"
  - "[ ] Configurar preload para recursos críticos"
  - "[ ] Verificar LCP < 2.5s"
  - "[ ] Verificar CLS < 0.1"
  - "[ ] Verificar FID/INP < 100ms"
---

# *optimize-performance

Otimiza a performance da página para atingir Core Web Vitals excelentes.

## Metas Core Web Vitals

| Métrica | Meta | Descrição |
|---------|------|-----------|
| LCP | < 2.5s | Maior elemento visível carregado |
| INP | < 100ms | Resposta a interações |
| CLS | < 0.1 | Estabilidade visual do layout |

## Técnicas de Otimização

```
Imagens:
  - Converter para WebP/AVIF
  - Definir width e height para evitar CLS
  - loading="lazy" para imagens abaixo do fold
  - fetchpriority="high" para imagem hero

CSS:
  - Critical CSS inline no <head>
  - Restante via <link rel="preload">
  - Remover CSS não utilizado

Fontes:
  - <link rel="preconnect"> para Google Fonts
  - font-display: swap
  - Subconjunto de caracteres quando possível

JavaScript:
  - defer ou async em scripts não críticos
  - Remover scripts não utilizados
```
