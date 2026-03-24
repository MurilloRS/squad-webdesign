/**
 * Ollirum — Backend Server
 * Express + Supabase PostgreSQL + JWT + Nodemailer
 */
require('dotenv').config();

const express    = require('express');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');
const { createClient } = require('@supabase/supabase-js');

const app        = express();
const PORT       = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod';

/* =========================================
   SUPABASE CLIENT
   ========================================= */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* =========================================
   MIDDLEWARE
   ========================================= */
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

/* =========================================
   AUTH MIDDLEWARE
   ========================================= */
function authRequired(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    req.user = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

/* =========================================
   ROUTES — PUBLIC
   ========================================= */
app.post('/api/leads', async (req, res) => {
  const { nome, whatsapp, empresa, segmento, processo } = req.body;
  if (!nome?.trim() || !whatsapp?.trim() || !empresa?.trim()) {
    return res.status(400).json({ error: 'Nome, WhatsApp e empresa são obrigatórios.' });
  }

  const leadData = {
    nome: nome.trim(),
    whatsapp: whatsapp.trim(),
    empresa: empresa.trim(),
    segmento: segmento?.trim() || null,
    processo: processo?.trim() || null,
    status: 'novo'
  };

  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select()
    .single();

  if (error) {
    console.error('[Supabase Insert Error]', error);
    return res.status(500).json({ error: 'Erro ao salvar lead.' });
  }

  sendEmailNotification(data).catch(e => console.error('[Email]', e.message));
  res.status(201).json({ success: true, id: data.id });
});

/* =========================================
   ROUTES — AUTH
   ========================================= */
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Usuário e senha obrigatórios.' });
  if (username !== process.env.ADMIN_USER)
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  const hash = process.env.ADMIN_PASS_HASH;
  if (!hash)
    return res.status(500).json({ error: 'Admin não configurado. Execute: node setup-admin.js' });
  const valid = await bcrypt.compare(password, hash);
  if (!valid)
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, username });
});

app.post('/api/auth/verify', authRequired, (req, res) => {
  res.json({ valid: true, user: req.user });
});

/* =========================================
   ROUTES — ADMIN
   ========================================= */
app.get('/api/leads/stats', authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from('leads')
    .select('status');

  if (error) {
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao carregar estatísticas.' });
  }

  const stats = { total: data.length, novo: 0, 'em-contato': 0, fechado: 0, convertido: 0 };
  data.forEach(l => { if (stats[l.status] !== undefined) stats[l.status]++; });
  res.json(stats);
});

app.get('/api/leads', authRequired, async (req, res) => {
  const { status, segmento, search, page = 1, limit = 15 } = req.query;
  let query = supabase.from('leads').select('*', { count: 'exact' });

  if (status) query = query.eq('status', status);
  if (segmento) query = query.eq('segmento', segmento);
  if (search) {
    const q = search.toLowerCase();
    query = query.or(`nome.ilike.%${q}%,empresa.ilike.%${q}%,whatsapp.ilike.%${q}%`);
  }

  query = query.order('created_at', { ascending: false });

  const offset = (Number(page) - 1) * Number(limit);
  query = query.range(offset, offset + Number(limit) - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao carregar leads.' });
  }

  const pages = Math.ceil((count || 0) / Number(limit)) || 1;
  res.json({ leads: data, total: count || 0, page: Number(page), pages });
});

app.get('/api/leads/:id', authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao carregar lead.' });
  }

  res.json(data);
});

app.patch('/api/leads/:id/status', authRequired, async (req, res) => {
  const VALID = ['novo', 'em-contato', 'fechado', 'convertido'];
  const { status } = req.body;
  if (!VALID.includes(status))
    return res.status(400).json({ error: `Status inválido. Use: ${VALID.join(', ')}` });

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', req.params.id);

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao atualizar status.' });
  }

  res.json({ success: true });
});

app.patch('/api/leads/:id/notes', authRequired, async (req, res) => {
  const { error } = await supabase
    .from('leads')
    .update({ notes: req.body.notes || null })
    .eq('id', req.params.id);

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao salvar anotações.' });
  }

  res.json({ success: true });
});

app.delete('/api/leads/:id', authRequired, async (req, res) => {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }
    console.error('[Supabase Error]', error);
    return res.status(500).json({ error: 'Erro ao deletar lead.' });
  }

  res.json({ success: true });
});

/* =========================================
   EMAIL
   ========================================= */
async function sendEmailNotification(lead) {
  if (!process.env.SMTP_HOST || !process.env.ADMIN_EMAIL) return;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const adminUrl = `${process.env.APP_URL || `http://localhost:${PORT}`}/admin`;
  await transporter.sendMail({
    from: `"Ollirum" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🆕 Novo lead #${lead.id}: ${lead.nome} — ${lead.empresa}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0F0F1A;color:#F5F5F7;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#6C63FF,#00E5A0);padding:20px 28px;">
          <h2 style="margin:0;color:#0F0F1A;font-size:18px;">🆕 Novo diagnóstico solicitado</h2>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#8B8B9E;width:120px;">Nome</td><td style="padding:8px 0;font-weight:600;">${lead.nome}</td></tr>
            <tr><td style="padding:8px 0;color:#8B8B9E;">WhatsApp</td><td style="padding:8px 0;">${lead.whatsapp}</td></tr>
            <tr><td style="padding:8px 0;color:#8B8B9E;">Empresa</td><td style="padding:8px 0;">${lead.empresa}</td></tr>
            <tr><td style="padding:8px 0;color:#8B8B9E;">Segmento</td><td style="padding:8px 0;">${lead.segmento || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#8B8B9E;vertical-align:top;">Processo</td><td style="padding:8px 0;">${lead.processo || '—'}</td></tr>
          </table>
          <div style="margin-top:24px;">
            <a href="${adminUrl}" style="display:inline-block;background:linear-gradient(135deg,#6C63FF,#00E5A0);color:#0F0F1A;font-weight:700;padding:12px 24px;border-radius:100px;text-decoration:none;">
              Ver no painel admin →
            </a>
          </div>
        </div>
      </div>
    `
  });
}

/* =========================================
   START
   ========================================= */
app.listen(PORT, () => {
  console.log(`\n🚀 Ollirum server: http://localhost:${PORT}`);
  console.log(`📋 Painel admin:   http://localhost:${PORT}/admin\n`);
});
