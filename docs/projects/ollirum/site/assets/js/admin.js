/* =========================================
   OLLIRUM — Admin Panel JS
   ========================================= */

const API = '/api';
let token = null;
let currentPage = 1;
let currentLead = null;
let filterTimeout = null;

/* =========================================
   INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('ollirum_token');
  if (token) {
    verifyToken().then(valid => {
      if (valid) showDashboard();
      else       showLogin();
    });
  } else {
    showLogin();
  }

  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  document.getElementById('refreshBtn').addEventListener('click', () => loadAll(true));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Filters
  document.getElementById('filterSearch').addEventListener('input', () => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => { currentPage = 1; loadLeads(); }, 400);
  });
  document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; loadLeads(); });
  document.getElementById('filterSegmento').addEventListener('change', () => { currentPage = 1; loadLeads(); });
});

/* =========================================
   AUTH
   ========================================= */
async function verifyToken() {
  try {
    const res = await apiPost('/auth/verify', {});
    return res.ok;
  } catch { return false; }
}

async function handleLogin(e) {
  e.preventDefault();
  const btn  = document.getElementById('loginBtn');
  const err  = document.getElementById('loginError');
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  err.hidden = true;
  btn.disabled = true;
  btn.textContent = 'Entrando...';

  try {
    const res  = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Erro ao fazer login');

    token = data.token;
    localStorage.setItem('ollirum_token', token);
    showDashboard();
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

function handleLogout() {
  token = null;
  localStorage.removeItem('ollirum_token');
  showLogin();
}

/* =========================================
   VIEWS
   ========================================= */
function showLogin() {
  document.getElementById('loginScreen').hidden = false;
  document.getElementById('dashboard').hidden   = true;
}

function showDashboard() {
  document.getElementById('loginScreen').hidden = true;
  document.getElementById('dashboard').hidden   = false;
  loadAll();
}

async function loadAll(spin = false) {
  if (spin) {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 600);
  }
  await Promise.all([loadStats(), loadLeads()]);
  document.getElementById('lastRefresh').textContent =
    `Atualizado às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

/* =========================================
   STATS
   ========================================= */
async function loadStats() {
  try {
    const data = await apiGet('/leads/stats');
    document.getElementById('statTotal').textContent      = data.total;
    document.getElementById('statNovo').textContent       = data.novo;
    document.getElementById('statContato').textContent    = data['em-contato'];
    document.getElementById('statConvertido').textContent = data.convertido;
  } catch { /* silently fail */ }
}

/* =========================================
   LEADS TABLE
   ========================================= */
async function loadLeads() {
  const search   = document.getElementById('filterSearch').value.trim();
  const status   = document.getElementById('filterStatus').value;
  const segmento = document.getElementById('filterSegmento').value;

  const params = new URLSearchParams({ page: currentPage, limit: 15 });
  if (search)   params.set('search', search);
  if (status)   params.set('status', status);
  if (segmento) params.set('segmento', segmento);

  const tbody = document.getElementById('leadsBody');
  tbody.innerHTML = '<tr class="table-empty"><td colspan="8">Carregando...</td></tr>';

  try {
    const data = await apiGet(`/leads?${params}`);
    renderTable(data.leads);
    renderPagination(data.pages);
  } catch (ex) {
    tbody.innerHTML = `<tr class="table-empty"><td colspan="8">Erro ao carregar leads: ${ex.message}</td></tr>`;
  }
}

function renderTable(leads) {
  const tbody = document.getElementById('leadsBody');
  if (!leads.length) {
    tbody.innerHTML = '<tr class="table-empty"><td colspan="8">Nenhum lead encontrado.</td></tr>';
    return;
  }
  tbody.innerHTML = leads.map(l => `
    <tr data-id="${l.id}">
      <td class="lead-id">#${l.id}</td>
      <td>
        <div class="lead-name">${esc(l.nome)}</div>
        <div class="lead-empresa">${esc(l.empresa)}</div>
      </td>
      <td>${esc(l.empresa)}</td>
      <td class="lead-wpp">
        <a href="https://wa.me/55${l.whatsapp.replace(/\D/g,'')}" target="_blank" style="color:var(--green)">
          ${esc(l.whatsapp)}
        </a>
      </td>
      <td>${l.segmento ? `<span class="lead-seg">${esc(l.segmento)}</span>` : '—'}</td>
      <td><span class="badge badge-${l.status}">${statusLabel(l.status)}</span></td>
      <td class="lead-date">${formatDate(l.created_at)}</td>
      <td><button class="btn-detail" data-id="${l.id}">Ver</button></td>
    </tr>
  `).join('');

  // Click handlers
  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.classList.contains('btn-detail') || e.target.tagName === 'A') return;
      openModal(row.dataset.id);
    });
  });
  tbody.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.id); });
  });
}

function renderPagination(pages) {
  const el = document.getElementById('pagination');
  if (pages <= 1) { el.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn${i === currentPage ? ' active' : ''}" data-p="${i}">${i}</button>`;
  }
  el.innerHTML = html;
  el.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => { currentPage = Number(btn.dataset.p); loadLeads(); });
  });
}

/* =========================================
   MODAL
   ========================================= */
async function openModal(id) {
  const overlay = document.getElementById('modalOverlay');
  overlay.hidden = false;

  try {
    const lead = await apiGet(`/leads/${id}`);
    currentLead = lead;
    document.getElementById('modalTitle').textContent = `Lead #${lead.id} — ${lead.nome}`;
    document.getElementById('modalBody').innerHTML = buildModalBody(lead);

    // Status buttons
    document.querySelectorAll('.status-btn').forEach(btn => {
      if (btn.dataset.s === lead.status) btn.classList.add('active');
      btn.addEventListener('click', async () => {
        await apiPatch(`/leads/${lead.id}/status`, { status: btn.dataset.s });
        document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLead.status = btn.dataset.s;
        // Update badge in table row
        const row = document.querySelector(`tr[data-id="${lead.id}"]`);
        if (row) {
          const badge = row.querySelector('.badge');
          if (badge) {
            badge.className = `badge badge-${btn.dataset.s}`;
            badge.textContent = statusLabel(btn.dataset.s);
          }
        }
        loadStats();
      });
    });

    // Save notes
    document.getElementById('saveNotesBtn').addEventListener('click', async () => {
      const notes = document.getElementById('notesArea').value;
      await apiPatch(`/leads/${lead.id}/notes`, { notes });
      document.getElementById('saveNotesBtn').textContent = '✓ Salvo';
      setTimeout(() => { document.getElementById('saveNotesBtn').textContent = 'Salvar anotação'; }, 2000);
    });

    // Delete
    document.getElementById('deleteLeadBtn').addEventListener('click', async () => {
      if (!confirm(`Remover lead #${lead.id} — ${lead.nome}?`)) return;
      await apiDelete(`/leads/${lead.id}`);
      closeModal();
      loadAll();
    });
  } catch (ex) {
    document.getElementById('modalBody').innerHTML = `<p style="color:#ff8080">Erro: ${ex.message}</p>`;
  }
}

function buildModalBody(l) {
  return `
    <div class="detail-row"><span class="detail-label">Nome</span><span class="detail-value">${esc(l.nome)}</span></div>
    <div class="detail-row"><span class="detail-label">WhatsApp</span>
      <span class="detail-value">
        <a href="https://wa.me/55${l.whatsapp.replace(/\D/g,'')}" target="_blank">${esc(l.whatsapp)} ↗</a>
      </span>
    </div>
    <div class="detail-row"><span class="detail-label">Empresa</span><span class="detail-value">${esc(l.empresa)}</span></div>
    <div class="detail-row"><span class="detail-label">Segmento</span><span class="detail-value">${esc(l.segmento || '—')}</span></div>
    <div class="detail-row"><span class="detail-label">Processo</span><span class="detail-value">${esc(l.processo || '—')}</span></div>
    <div class="detail-row"><span class="detail-label">Recebido em</span><span class="detail-value">${formatDate(l.created_at, true)}</span></div>
    <div class="detail-row"><span class="detail-label">Status atual</span>
      <span class="detail-value"><span class="badge badge-${l.status}">${statusLabel(l.status)}</span></span>
    </div>

    <div class="modal-actions">
      <div>
        <label>Atualizar status</label>
        <div class="status-btns">
          <button class="status-btn" data-s="novo">Novo</button>
          <button class="status-btn" data-s="em-contato">Em contato</button>
          <button class="status-btn" data-s="fechado">Fechado</button>
          <button class="status-btn" data-s="convertido">Convertido ✓</button>
        </div>
      </div>
      <div>
        <label>Anotações internas</label>
        <textarea class="notes-area" id="notesArea" placeholder="Observações sobre este lead...">${esc(l.notes || '')}</textarea>
      </div>
      <div class="modal-footer-btns">
        <button class="btn-delete" id="deleteLeadBtn">🗑 Remover lead</button>
        <button class="btn-save-notes" id="saveNotesBtn">Salvar anotação</button>
      </div>
    </div>
  `;
}

function closeModal() {
  document.getElementById('modalOverlay').hidden = true;
  currentLead = null;
}

/* =========================================
   API HELPERS
   ========================================= */
async function apiGet(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (res.status === 401) { handleLogout(); throw new Error('Sessão expirada.'); }
  if (!res.ok) throw new Error((await res.json()).error || 'Erro na requisição');
  return res.json();
}

async function apiPost(path, body) {
  return fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(body)
  });
}

async function apiPatch(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Erro');
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API}${path}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Erro');
  return res.json();
}

/* =========================================
   UTILS
   ========================================= */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusLabel(s) {
  const map = { novo: 'Novo', 'em-contato': 'Em contato', fechado: 'Fechado', convertido: 'Convertido' };
  return map[s] || s;
}

function formatDate(dt, full = false) {
  if (!dt) return '—';
  const d = new Date(dt);
  if (full) return d.toLocaleString('pt-BR');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
