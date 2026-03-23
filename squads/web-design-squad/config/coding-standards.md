# Coding Standards — web-design-squad

## HTML
- Semântico (header, main, section, article, footer)
- Acessibilidade: atributos alt, aria-label, roles
- Indentação: 2 espaços
- Charset UTF-8, viewport meta obrigatório

## CSS
- Mobile-first (min-width breakpoints)
- Variáveis CSS para design tokens
- BEM ou utility-first (Tailwind)
- Sem !important salvo exceções documentadas

## JavaScript
- ES6+ (const/let, arrow functions, modules)
- Sem dependências desnecessárias
- Event delegation para performance
- Comentários apenas em lógica não óbvia

## Performance
- Imagens: WebP com fallback, lazy loading
- Fontes: preconnect, display=swap
- Scripts: defer ou async
- CSS crítico inline para above-the-fold

## SEO
- Title tag única por página (50-60 chars)
- Meta description (150-160 chars)
- H1 único por página
- URLs amigáveis (kebab-case)

## Nomenclatura
- Arquivos: kebab-case (minha-pagina.html)
- Classes CSS: kebab-case ou Tailwind utilities
- IDs: camelCase (apenas quando necessário)
- Variáveis JS: camelCase
