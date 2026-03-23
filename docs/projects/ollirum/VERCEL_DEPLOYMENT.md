# 🚀 Deploy Ollirum no Vercel

## Checklist Rápido

- [x] Arquivo `vercel.json` configurado
- [x] `.env.example` atualizado com domínio `ollirum.com.br`
- [ ] Gerar novo JWT_SECRET
- [ ] Trocar senha do admin
- [ ] Configurar credenciais de email
- [ ] Fazer deploy no Vercel
- [ ] Apontar domínio para Vercel

---

## 📋 Passo 1: Preparar Variáveis de Ambiente

### Gerar JWT_SECRET seguro:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Gerar novo hash para admin:
```bash
cd docs/projects/ollirum/site/server
node setup-admin.js
# Siga as instruções para definir nova senha
```

---

## 🌐 Passo 2: Deploy via Vercel

### Opção A: Dashboard Vercel (Recomendado)

1. Acesse: **https://vercel.com/dashboard**
2. Clique **"Add New"** → **"Project"**
3. Selecione repositório: **squad-webdesign**
4. Configure:
   - **Framework Preset:** Node.js
   - **Root Directory:** `docs/projects/ollirum/site/server`
   - **Build Command:** `npm install` (deixar padrão)
   - **Start Command:** `node server.js`

5. **Environment Variables** - Clique "Add" e configure:

```
PORT                    3000
APP_URL                 https://ollirum.com.br
ADMIN_USER              admin
ADMIN_PASS_HASH         (hash gerado no setup-admin.js)
JWT_SECRET              (gerado no passo anterior)
SMTP_HOST               smtp.gmail.com
SMTP_PORT               587
SMTP_USER               seu@gmail.com
SMTP_PASS               (senha de app do Google)
ADMIN_EMAIL             seu@gmail.com
ALLOWED_ORIGIN          https://ollirum.com.br
```

6. Clique **"Deploy"** e aguarde ✅

### Opção B: CLI Vercel

```bash
npm install -g vercel
cd docs/projects/ollirum/site/server
vercel --prod
```

---

## 🔗 Passo 3: Conectar Domínio

### No Dashboard Vercel:
1. Vá para seu projeto
2. **Settings** → **Domains**
3. Clique **"Add Custom Domain"**
4. Digite: `ollirum.com.br`

### Registrador de Domínio (.com.br):
Vercel vai mostrar:
- Se usar CNAME: aponte `www` e raiz para `cname.vercel-dns.com`
- Se usar A Records: aponte para IPs que Vercel indicar

**Exemplo (GoDaddy/Namecheap):**
```
Tipo    Nome          Valor
A       @             76.76.19.165
CNAME   www           cname.vercel-dns.com
```

Aguarde **até 48h** para propagação DNS.

---

## ⚠️ Avisos Importantes

### Banco de Dados
O Vercel tem **filesystem efêmero**. O arquivo `data/leads.json` será **recriado a cada deploy**.

**Solução futura:** Migrar para banco de dados (Supabase, MongoDB, etc.)

### Credenciais de Email
Se usar Gmail:
1. Ative 2FA em sua conta
2. Gere "App Password" em https://myaccount.google.com/apppasswords
3. Use essa senha no `.env`, não sua senha normal

### SSL/HTTPS
Vercel configura **automaticamente** com certificado Let's Encrypt ✅

---

## ✅ Testes Pós-Deploy

Após o deploy estar live:

```bash
# Testar API
curl https://ollirum.com.br/api/leads

# Testar Login
curl -X POST https://ollirum.com.br/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"sua_nova_senha"}'
```

---

## 📞 Troubleshooting

### "DNS not pointing to Vercel"
- Aguarde propagação (até 48h)
- Verifique registros DNS em: https://dnschecker.org

### "Cannot find module 'dotenv'"
- Verifique que `package.json` está na raiz de `/docs/projects/ollirum/site/server`

### "Leads não estão sendo salvos"
- Use banco de dados em vez de JSON (recomendado para produção)

---

**Status:** ✅ Pronto para Deploy
**Domínio:** ollirum.com.br
**Versão Node:** >=14.0.0
