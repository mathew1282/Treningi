// ===== SOK Treningi – logika admina =====

const slots = [
  { id: 1, time: '17:00', type: 'indywidualny', free: true, label: 'Indywidualny', group: false },
  { id: 2, time: '18:00', type: 'indywidualny', free: true, label: 'Indywidualny', group: false },
  { id: 3, time: '19:00', type: 'grupowy', free: true, label: 'Grupowy • 3/8 miejsc', group: true },
  { id: 4, time: '20:00', type: 'indywidualny', free: false, label: 'Zajęty', group: false },
  { id: 5, time: '21:00', type: 'indywidualny', free: true, label: 'Indywidualny', group: false },
];

const pending = [
  { id: 1, name: 'Anna Nowak', time: '18:00', date: 'Dziś', type: 'Indywidualny', phone: '501 222 333' },
  { id: 2, name: 'Piotr Wiśniewski', time: '19:00', date: 'Dziś', type: 'Grupowy', phone: '502 333 444' },
  { id: 3, name: 'Kasia Zielińska', time: '17:00', date: 'Jutro', type: 'Indywidualny', phone: '503 444 555' },
];

const clients = [
  { name: 'Jan Kowalski', phone: '500 123 456', trainings: 7, since: 'Mar 2025', karnet: 7 },
  { name: 'Anna Nowak', phone: '501 222 333', trainings: 4, since: 'Cze 2025', karnet: 2 },
  { name: 'Piotr Wiśniewski', phone: '502 333 444', trainings: 12, since: 'Sty 2024', karnet: 0 },
  { name: 'Kasia Zielińska', phone: '503 444 555', trainings: 3, since: 'Paź 2026', karnet: 5 },
];

const titles = {
  'admin-kalendarz': ['Kalendarz', 'Zmiany i sloty'],
  'admin-zapisy': ['Zapisy', 'Do zatwierdzenia'],
  'admin-klienci': ['Klienci', 'Lista i karnety'],
  'admin-materialy': ['Materiały', 'Zdjęcia i filmy'],
  'admin-ustawienia': ['Więcej', 'Ustawienia i komunikacja'],
};

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById(id);
  if (view) view.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-view="${id}"]`);
  if (navBtn) navBtn.classList.add('active');

  const t = titles[id] || ['', ''];
  document.getElementById('header-title').textContent = t[0];
  document.getElementById('header-sub').textContent = t[1];
}

function renderAdminSlots() {
  const el = document.getElementById('admin-slots');
  el.innerHTML = slots.map(s => `
    <div class="card rounded-xl px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="font-semibold text-sm w-12">${s.time}</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${s.group ? 'bg-orange-500/20 text-orange-400' : 'bg-sok-accent/20 text-sok-accent'}">${s.group ? 'Grupowy' : 'Indywidualny'}</span>
      </div>
      <span class="text-xs text-sok-muted">${s.free ? 'Wolny' : 'Zajęty'}</span>
    </div>
  `).join('');
}

function renderPending() {
  const el = document.getElementById('pending-list');
  el.innerHTML = pending.map(p => `
    <div class="card rounded-2xl p-4">
      <div class="flex items-start justify-between mb-3">
        <div>
          <p class="font-medium">${p.name}</p>
          <p class="text-sm text-sok-muted">${p.date} • ${p.time} • ${p.type}</p>
          <p class="text-xs text-sok-muted mt-0.5"><i class="fa-solid fa-phone text-[10px] mr-1"></i>${p.phone}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="rejectBooking(${p.id})" class="flex-1 py-2.5 rounded-xl border border-sok-border text-sm text-sok-muted">Odrzuć</button>
        <button onclick="approveBooking(${p.id})" class="flex-1 py-2.5 rounded-xl bg-sok-success text-sm font-semibold text-black">Zatwierdź</button>
      </div>
    </div>
  `).join('');
}

function renderClients() {
  const el = document.getElementById('clients-list');
  el.innerHTML = clients.map(c => `
    <div class="card rounded-2xl p-4 flex items-center gap-3">
      <div class="w-11 h-11 rounded-full bg-sok-border flex items-center justify-center text-sok-muted shrink-0">
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-sm truncate">${c.name}</p>
        <p class="text-xs text-sok-muted">${c.phone} • od ${c.since}</p>
      </div>
      <div class="text-right shrink-0">
        <p class="text-sm font-semibold">${c.karnet} <span class="text-sok-muted font-normal text-xs">wejść</span></p>
        <p class="text-xs text-sok-muted">${c.trainings} w m-cu</p>
      </div>
    </div>
  `).join('');
}

function approveBooking(id) {
  showToast('Zapis zatwierdzony');
}

function rejectBooking(id) {
  showToast('Zapis odrzucony');
}

function showAddShift() {
  showToast('Tu będzie formularz dodawania zmiany + slotów');
}

// Init
renderAdminSlots();
renderPending();
renderClients();
