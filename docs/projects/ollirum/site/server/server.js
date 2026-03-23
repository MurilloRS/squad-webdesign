/**
 * Ollirum — Backend Server
 * Express + JSON store + JWT + Nodemailer
 * (sem dependências nativas — funciona em qualquer Node.js)
 */
require('dotenv').config();

const express    = require('express');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');
const fs         = require('fs');

const app        = express();
const PORT       = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod';
const DB_PATH    = path.join(__dirname, 'data', 'leads.json');

/* =========================================
   JSON DATABASE
   ========================================= */
function readDB() {
  if (!fs.existsSync(DB_PATH)) return { leads: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function getLeads()    { return readDB().leads; }
function getNextId()   { return readDB().nextId; }

function insertLead(lead) {
  const db   = readDB();
  const id   = db.nextId;
  const now  = new Date().toISOString();
  const row  = { id, ...lead, status: 'novo', notes: null, created_at: now, updated_at: now };
  db.leads.unshift(row);  // mais recente primeiro
  db.nextId = id + 1;
  writeDB(db);
  return row;
}

function updateLeadField(id, field, value) {
  const db  = readDB();
  const idx = db.leads.findIndex(l => l.id === Number(id));
  if (idx === -1) return false;
  db.leads[idx][field]     = value;
  db.leads[idx].updated_at = new Date().toISOString();
  writeDB(db);
  return true;
}

function deleteLead(id) {
  const db  = readDB();
  const idx = db.leads.findIndex(l => l.id === Number(id));
  if (idx === -1) return false;
  db.leads.splice(idx, 1);
  writeDB(db);
  return true;
}

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
app.post('/api/leads', (req, res) => {
  const { nome, whatsapp, empresa, segmento, processo } = req.body;
  if (!nome?.trim() || !whatsapp?.trim() || !empresa?.trim()) {
    return res.status(400).json({ error: 'Nome, WhatsApp e empresa são obrigatórios.' });
  }
  const lead = insertLead({
    nome: nome.trim(),
    whatsapp: whatsapp.trim(),
    empresa: empresa.trim(),
    segmento: segmento?.trim() || null,
    processo: processo?.trim() || null
  });
  sendEmailNotification(lead).catch(e => console.error('[Email]', e.message));
  res.status(201).json({ success: true, id: lead.id });
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
app.get('/api/leads/stats', authRequired, (req, res) => {
  const leads  = getLeads();
  const stats  = { total: leads.length, novo: 0, 'em-contato': 0, fechado: 0, convertido: 0 };
  leads.forEach(l => { if (stats[l.status] !== undefined) stats[l.status]++; });
  res.json(stats);
});

app.get('/api/leads', authRequired, (req, res) => {
  const { status, segmento, search, page = 1, limit = 15 } = req.query;
  let leads = getLeads();

  if (status)   leads = leads.filter(l => l.status === status);
  if (segmento) leads = leads.filter(l => l.segmento === segmento);
  if (search) {
    const q = search.toLowerCase();
    leads = leads.filter(l =>
      l.nome.toLowerCase().includes(q) ||
      l.empresa.toLowerCase().includes(q) ||
      l.whatsapp.includes(q)
    );
  }

  const total  = leads.length;
  const pages  = Math.ceil(total / Number(limit)) || 1;
  const offset = (Number(page) - 1) * Number(limit);
  leads        = leads.slice(offset, offset + Number(limit));

  res.json({ leads, total, page: Number(page), pages });
});

app.get('/api/leads/:id', authRequired, (req, res) => {
  const lead = getLeads().find(l => l.id === Number(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado.' });
  res.json(lead);
});

app.patch('/api/leads/:id/status', authRequired, (req, res) => {
  const VALID = ['novo', 'em-contato', 'fechado', 'convertido'];
  const { status } = req.body;
  if (!VALID.includes(status))
    return res.status(400).json({ error: `Status inválido. Use: ${VALID.join(', ')}` });
  const ok = updateLeadField(req.params.id, 'status', status);
  if (!ok) return res.status(404).json({ error: 'Lead não encontrado.' });
  res.json({ success: true });
});

app.patch('/api/leads/:id/notes', authRequired, (req, res) => {
  const ok = updateLeadField(req.params.id, 'notes', req.body.notes || null);
  if (!ok) return res.status(404).json({ error: 'Lead não encontrado.' });
  res.json({ success: true });
});

app.delete('/api/leads/:id', authRequired, (req, res) => {
  const ok = deleteLead(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Lead não encontrado.' });
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
