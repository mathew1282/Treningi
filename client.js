// ===== SOK Treningi – logika klienta =====

const slots = [
  { id: 1, time: '17:00', type: 'indywidualny', free: true, label: 'Indywidualny' },
  { id: 2, time: '18:00', type: 'indywidualny', free: true, label: 'Indywidualny' },
  { id: 3, time: '19:00', type: 'grupowy', free: true, label: 'Grupowy • 3/8 miejsc', group: true },
  { id: 4, time: '20:00', type: 'indywidualny', free: false, label: 'Zajęty' },
  { id: 5, time: '21:00', type: 'indywidualny', free: true, label: 'Indywidualny' },
];

const myTrainings = [
  { id: 1, date: 'Dziś', time: '18:00', type: 'Indywidualny', status: 'pending', statusLabel: 'Oczekuje' },
  { id: 2, date: 'Jutro', time: '19:00', type: 'Grupowy', status: 'approved', statusLabel: 'Zatwierdzony' },
  { id: 3, date: 'Śr 19.11', time: '17:00', type: 'Indywidualny', status: 'approved', statusLabel: 'Zatwierdzony' },
];

const history = [
  { date: '14.11.2026', time: '18:00', type: 'Indywidualny' },
  { date: '11.11.2026', time: '19:00', type: 'Grupowy' },
  { date: '07.11.2026', time: '17:00', type: 'Indywidualny' },
  { date: '04.11.2026', time: '20:00', type: 'Indywidualny' },
];

const titles = {
  'client-zapisz': ['Zapisz się', 'Wybierz termin'],
  'client-moje': ['Moje treningi', 'Nadchodzące'],
  'client-historia': ['Historia & Karnet', 'Twoje wejścia'],
  'client-galeria': ['Galeria', 'Materiały z treningów'],
  'client-profil': ['Profil', 'Twoje dane'],
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

function renderSlots() {
  const el = document.getElementById('slots-list');
  el.innerHTML = slots.map(s => `
    <div class="card rounded-2xl p-4 flex items-center justify-between ${!s.free ? 'opacity-50' : ''}">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl ${s.group ? 'bg-orange-500/20 text-orange-400' : 'bg-sok-accent/20 text-sok-accent'} flex items-center justify-center font-bold text-sm">
          ${s.time}
        </div>
        <div>
          <p class="font-medium text-sm">${s.label}</p>
          <p class="text-xs text-sok-muted">${s.free ? 'Dostępny' : 'Zajęty'}</p>
        </div>
      </div>
      ${s.free
        ? `<button onclick="openBook(${s.id})" class="slot-btn bg-sok-accent text-white text-xs font-semibold px-4 py-2 rounded-xl">Zapisz się</button>`
        : `<span class="text-xs text-sok-muted px-3">—</span>`}
    </div>
  `).join('');
}

function renderMyTrainings() {
  const el = document.getElementById('my-trainings');
  el.innerHTML = myTrainings.map(t => `
    <div class="card rounded-2xl p-4">
      <div class="flex items-start justify-between">
        <div>
          <p class="font-medium">${t.date} • ${t.time}</p>
          <p class="text-sm text-sok-muted mt-0.5">${t.type}</p>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full ${t.status === 'pending' ? 'bg-sok-warning/20 text-sok-warning' : 'bg-sok-success/20 text-sok-success'}">${t.statusLabel}</span>
      </div>
      <button onclick="cancelTraining(${t.id})" class="mt-3 w-full py-2.5 rounded-xl border border-sok-border text-sm text-sok-muted hover:border-rose-500 hover:text-rose-400 transition">
        Odwołaj trening
      </button>
    </div>
  `).join('');
}

function renderHistory() {
  const el = document.getElementById('history-list');
  el.innerHTML = history.map(h => `
    <div class="card rounded-xl px-4 py-3 flex items-center justify-between">
      <div>
        <p class="text-sm font-medium">${h.date}</p>
        <p class="text-xs text-sok-muted">${h.time} • ${h.type}</p>
      </div>
      <i class="fa-solid fa-check text-sok-success text-sm"></i>
    </div>
  `).join('');
}

let bookingId = null;

function openBook(id) {
  bookingId = id;
  const s = slots.find(x => x.id === id);
  document.getElementById('modal-book-info').textContent = `Trening ${s.time} • ${s.label}`;
  document.getElementById('modal-book').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-book').classList.add('hidden');
}

function confirmBook() {
  closeModal();
  showToast('Wysłano prośbę o zapis. Oczekuj na zatwierdzenie.');
}

function cancelTraining(id) {
  if (confirm('Na pewno odwołać trening? Wejście wróci na karnet. Trener dostanie powiadomienie WhatsApp.')) {
    showToast('Trening odwołany. Wejście wróciło na karnet.');
  }
}

// Day chips
document.querySelectorAll('.day-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.day-chip').forEach(c => {
      c.classList.remove('active', 'bg-sok-accent', 'text-white');
      c.classList.add('bg-sok-card', 'border', 'border-sok-border', 'text-sok-muted');
    });
    chip.classList.add('active', 'bg-sok-accent', 'text-white');
    chip.classList.remove('bg-sok-card', 'border', 'border-sok-border', 'text-sok-muted');
  });
});

// Init
renderSlots();
renderMyTrainings();
renderHistory();
