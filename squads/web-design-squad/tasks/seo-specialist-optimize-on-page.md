---
task: Optimize On-Page SEO
responsavel: "@seo-specialist"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - page-copy: Texto completo da página
  - keywords: Lista de keywords prioritárias
  - page-structure: Estrutura de seções e headings
Saida: |
  - optimized-copy: Copy otimizado para SEO mantendo naturalidade
  - meta-tags: Title tag e meta description otimizadas
  - heading-structure: Estrutura H1-H6 otimizada
  - schema-markup: Dados estruturados recomendados (JSON-LD)
Checklist:
  - "[ ] Inserir keyword primária no H1"
  - "[ ] Distribuir keywords secundárias nos H2/H3"
  - "[ ] Verificar densidade de keywords (1-2%)"
  - "[ ] Otimizar title tag (50-60 chars, keyword no início)"
  - "[ ] Otimizar meta description (150-160 chars, CTA incluído)"
  - "[ ] Verificar alt texts de imagens"
  - "[ ] Adicionar links internos quando relevante"
  - "[ ] Recomendar schema markup adequado"
---

# *optimize-on-page

Otimiza todos os elementos on-page para maximizar visibilidade orgânica.

## Checklist On-Page

```
Title Tag:
  ✓ Keyword primária nos primeiros 60 chars
  ✓ Nome da marca no final
  ✓ Formato: "Keyword Principal | Marca"

Meta Description:
  ✓ Keyword primária presente
  ✓ Benefício claro + CTA
  ✓ 150-160 caracteres

Headings:
  ✓ H1 único com keyword primária
  ✓ H2s com keywords secundárias
  ✓ Hierarquia lógica

Schema Markup Recomendado:
  - LocalBusiness (negócio local)
  - FAQ (seção de perguntas)
  - Review (depoimentos)
  - Product (produto/serviço)
```
