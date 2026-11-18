// ===== SOK Treningi – logika admina (zmiany + szablony) =====

const MONTHS = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
const DAY_NAMES = ['Pn','Wt','Śr','Cz','Pt','Sb','Nd'];

const DAY_SLOTS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const NIGHT_SLOTS = ['19:00','20:00','21:00','22:00','23:00','00:00','01:00','02:00','03:00','04:00','05:00','06:00'];

let calYear, calMonth;
let selectedDate = null;
let currentShiftType = 'dzien';
let selectedTrainHours = new Set();

function loadShifts() {
  try { return JSON.parse(localStorage.getItem('sok_shifts') || '{}'); } catch { return {}; }
}
function saveShifts(data) {
  localStorage.setItem('sok_shifts', JSON.stringify(data));
}

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
  const navBtn = document.querySelector('.nav-item[data-view="' + id + '"]');
  if (navBtn) navBtn.classList.add('active');
  const t = titles[id] || ['', ''];
  document.getElementById('header-title').textContent = t[0];
  document.getElementById('header-sub').textContent = t[1];
}

function pad(n) { return String(n).padStart(2, '0'); }
function toKey(y, m, d) { return y + '-' + pad(m+1) + '-' + pad(d); }
function parseKey(key) {
  const p = key.split('-').map(Number);
  return { y: p[0], m: p[1]-1, d: p[2] };
}

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  selectedDate = toKey(calYear, calMonth, now.getDate());
  renderCalendar();
  renderDayDetails();
}

function changeMonth(delta) {
  calMonth += delta;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function renderCalendar() {
  document.getElementById('cal-month-label').textContent = MONTHS[calMonth] + ' ' + calYear;
  const grid = document.getElementById('calendar-grid');
  const shifts = loadShifts();
  let html = DAY_NAMES.map(function(n) { return '<div class="text-sok-muted py-1">' + n + '</div>'; }).join('');

  const first = new Date(calYear, calMonth, 1);
  let startDow = first.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;
  for (let i = 0; i < startDow; i++) html += '<div class="py-2"></div>';

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  for (let d = 1; d <= daysInMonth; d++) {
    const key = toKey(calYear, calMonth, d);
    const shift = shifts[key];
    const isSelected = key === selectedDate;
    const isToday = key === todayKey;
    let cls = 'py-2 rounded-lg font-semibold relative cursor-pointer transition ';
    if (isSelected) cls += 'ring-2 ring-sok-accent ';
    if (shift) {
      if (shift.type === 'wolne') cls += 'bg-zinc-700/40 text-zinc-400';
      else if (shift.trainHours && shift.trainHours.length) cls += 'bg-emerald-500/20 text-emerald-400';
      else cls += 'bg-amber-500/20 text-amber-400';
    } else {
      cls += isToday ? 'text-sok-accent' : 'text-sok-muted';
    }
    html += '<div class="' + cls + '" onclick="selectDay(\'' + key + '\')">' + d;
    if (shift && shift.trainHours && shift.trainHours.length) {
      html += '<span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></span>';
    } else if (shift && shift.type !== 'wolne') {
      html += '<span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></span>';
    }
    html += '</div>';
  }
  grid.innerHTML = html;
}

function selectDay(key) {
  selectedDate = key;
  renderCalendar();
  renderDayDetails();
}

function renderDayDetails() {
  const shifts = loadShifts();
  const shift = shifts[selectedDate];
  const parsed = parseKey(selectedDate);
  document.getElementById('selected-day-label').textContent = parsed.d + '.' + pad(parsed.m+1) + '.' + selectedDate.slice(0,4);

  const slotsEl = document.getElementById('admin-slots');
  const infoEl = document.getElementById('day-shift-info');

  if (!shift) {
    slotsEl.innerHTML = '<div class="card rounded-xl px-4 py-3 text-sm text-sok-muted">Brak ustawionej zmiany – dzień zablokowany dla klientów.</div>';
    infoEl.innerHTML = '';
    return;
  }
  if (shift.type === 'wolne') {
    slotsEl.innerHTML = '<div class="card rounded-xl px-4 py-3 text-sm text-zinc-400">Dzień wolny</div>';
    infoEl.innerHTML = '';
    return;
  }
  const hours = shift.trainHours || [];
  if (hours.length === 0) {
    slotsEl.innerHTML = '<div class="card rounded-xl px-4 py-3 text-sm text-amber-400">Pracujesz, ale nie ustawiono godzin treningowych – klienci nie mogą się zapisać.</div>';
  } else {
    slotsEl.innerHTML = hours.map(function(h) {
      return '<div class="card rounded-xl px-4 py-3 flex items-center justify-between"><span class="font-semibold text-sm">' + h + '</span><span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Dostępny</span></div>';
    }).join('');
  }
  infoEl.innerHTML = '<div class="card rounded-xl p-3 mt-2"><p class="text-xs text-sok-muted">Typ: <span class="text-white font-medium">' + (shift.type === 'dzien' ? 'Dniówka' : 'Nocka') + '</span></p><p class="text-xs text-sok-muted mt-1">Praca: <span class="text-white font-medium">' + (shift.workFrom || '—') + ' – ' + (shift.workTo || '—') + '</span></p><button onclick="openShiftModal(\'' + selectedDate + '\')" class="mt-2 text-xs text-sok-accent font-medium">Edytuj zmianę</button></div>';
}

function openShiftModal(dateKey) {
  if (dateKey) selectedDate = dateKey;
  if (!selectedDate) { showToast('Najpierw wybierz dzień w kalendarzu'); return; }
  const parsed = parseKey(selectedDate);
  document.getElementById('shift-modal-date').textContent = parsed.d + '.' + pad(parsed.m+1) + '.' + parsed.y;

  const shifts = loadShifts();
  const existing = shifts[selectedDate];
  if (existing) {
    currentShiftType = existing.type || 'dzien';
    document.getElementById('work-from').value = existing.workFrom || (currentShiftType === 'noc' ? '19:00' : '07:00');
    document.getElementById('work-to').value = existing.workTo || (currentShiftType === 'noc' ? '07:00' : '19:00');
    selectedTrainHours = new Set(existing.trainHours || []);
  } else {
    currentShiftType = 'dzien';
    document.getElementById('work-from').value = '07:00';
    document.getElementById('work-to').value = '19:00';
    selectedTrainHours = new Set();
  }
  updateShiftTypeUI();
  renderTrainSlotsGrid();
  document.getElementById('modal-shift').classList.remove('hidden');
}

function closeShiftModal() {
  document.getElementById('modal-shift').classList.add('hidden');
}

function setShiftType(type) {
  currentShiftType = type;
  if (type === 'dzien') {
    document.getElementById('work-from').value = '07:00';
    document.getElementById('work-to').value = '19:00';
  } else if (type === 'noc') {
    document.getElementById('work-from').value = '19:00';
    document.getElementById('work-to').value = '07:00';
  }
  selectedTrainHours = new Set();
  updateShiftTypeUI();
  renderTrainSlotsGrid();
}

function updateShiftTypeUI() {
  document.querySelectorAll('.shift-type-btn').forEach(function(btn) {
    if (btn.dataset.type === currentShiftType) {
      btn.classList.add('bg-sok-accent', 'text-white');
      btn.classList.remove('text-sok-muted');
    } else {
      btn.classList.remove('bg-sok-accent', 'text-white');
      btn.classList.add('text-sok-muted');
    }
  });
  var show = currentShiftType !== 'wolne';
  document.getElementById('work-hours-section').style.display = show ? 'block' : 'none';
  document.getElementById('train-hours-section').style.display = show ? 'block' : 'none';
}

function renderTrainSlotsGrid() {
  var slots = currentShiftType === 'noc' ? NIGHT_SLOTS : DAY_SLOTS;
  var grid = document.getElementById('train-slots-grid');
  grid.innerHTML = slots.map(function(h) {
    var active = selectedTrainHours.has(h);
    return '<button type="button" onclick="toggleTrainHour(\'' + h + '\')" class="py-2 rounded-lg text-xs font-medium border transition ' + (active ? 'bg-sok-accent border-sok-accent text-white' : 'border-sok-border text-sok-muted') + '">' + h + '</button>';
  }).join('');
}

function toggleTrainHour(h) {
  if (selectedTrainHours.has(h)) selectedTrainHours.delete(h);
  else selectedTrainHours.add(h);
  renderTrainSlotsGrid();
}

function saveShift() {
  var shifts = loadShifts();
  if (currentShiftType === 'wolne') {
    shifts[selectedDate] = { type: 'wolne', trainHours: [] };
  } else {
    shifts[selectedDate] = {
      type: currentShiftType,
      workFrom: document.getElementById('work-from').value,
      workTo: document.getElementById('work-to').value,
      trainHours: Array.from(selectedTrainHours).sort()
    };
  }
  saveShifts(shifts);
  closeShiftModal();
  renderCalendar();
  renderDayDetails();
  showToast('Zmiana zapisana');
}

function openTemplateModal() {
  var today = new Date();
  document.getElementById('tpl-start').value = toKey(today.getFullYear(), today.getMonth(), today.getDate());
  renderTplSlots('tpl-dzien-slots', DAY_SLOTS, new Set(['17:00','18:00']));
  renderTplSlots('tpl-noc-slots', NIGHT_SLOTS, new Set(['19:00','20:00','21:00']));
  document.getElementById('modal-template').classList.remove('hidden');
}

function closeTemplateModal() {
  document.getElementById('modal-template').classList.add('hidden');
}

function renderTplSlots(containerId, slots, selected) {
  var el = document.getElementById(containerId);
  el.innerHTML = slots.map(function(h) {
    var active = selected.has(h);
    return '<button type="button" data-h="' + h + '" onclick="toggleTplSlot(this)" class="py-2 rounded-lg text-xs font-medium border transition ' + (active ? 'bg-sok-accent border-sok-accent text-white' : 'border-sok-border text-sok-muted') + '">' + h + '</button>';
  }).join('');
}

function toggleTplSlot(btn) {
  btn.classList.toggle('bg-sok-accent');
  btn.classList.toggle('border-sok-accent');
  btn.classList.toggle('text-white');
  btn.classList.toggle('text-sok-muted');
}

function getTplSelected(containerId) {
  return Array.from(document.querySelectorAll('#' + containerId + ' button.bg-sok-accent')).map(function(b) { return b.dataset.h; });
}

function applyTemplate() {
  var startVal = document.getElementById('tpl-start').value;
  var cycles = parseInt(document.getElementById('tpl-cycles').value, 10) || 1;
  if (!startVal) { showToast('Podaj datę początkową'); return; }

  var dzienHours = getTplSelected('tpl-dzien-slots');
  var nocHours = getTplSelected('tpl-noc-slots');
  var pattern = ['dzien', 'noc', 'wolne', 'wolne'];
  var shifts = loadShifts();
  var parts = startVal.split('-').map(Number);
  var date = new Date(parts[0], parts[1] - 1, parts[2]);

  for (var i = 0; i < cycles * 4; i++) {
    var key = toKey(date.getFullYear(), date.getMonth(), date.getDate());
    var type = pattern[i % 4];
    if (type === 'wolne') {
      shifts[key] = { type: 'wolne', trainHours: [] };
    } else if (type === 'dzien') {
      shifts[key] = { type: 'dzien', workFrom: '07:00', workTo: '19:00', trainHours: dzienHours.slice() };
    } else {
      shifts[key] = { type: 'noc', workFrom: '19:00', workTo: '07:00', trainHours: nocHours.slice() };
    }
    date.setDate(date.getDate() + 1);
  }
  saveShifts(shifts);
  closeTemplateModal();
  renderCalendar();
  renderDayDetails();
  showToast('Szablon zastosowany na ' + (cycles * 4) + ' dni');
}

function renderPending() {
  var el = document.getElementById('pending-list');
  if (!el) return;
  el.innerHTML = pending.map(function(p) {
    return '<div class="card rounded-2xl p-4"><div class="flex items-start justify-between mb-3"><div><p class="font-medium">' + p.name + '</p><p class="text-sm text-sok-muted">' + p.date + ' • ' + p.time + ' • ' + p.type + '</p><p class="text-xs text-sok-muted mt-0.5"><i class="fa-solid fa-phone text-[10px] mr-1"></i>' + p.phone + '</p></div></div><div class="flex gap-2"><button onclick="rejectBooking(' + p.id + ')" class="flex-1 py-2.5 rounded-xl border border-sok-border text-sm text-sok-muted">Odrzuć</button><button onclick="approveBooking(' + p.id + ')" class="flex-1 py-2.5 rounded-xl bg-sok-success text-sm font-semibold text-black">Zatwierdź</button></div></div>';
  }).join('');
}

function renderClients() {
  var el = document.getElementById('clients-list');
  if (!el) return;
  el.innerHTML = clients.map(function(c) {
    return '<div class="card rounded-2xl p-4 flex items-center gap-3"><div class="w-11 h-11 rounded-full bg-sok-border flex items-center justify-center text-sok-muted shrink-0"><i class="fa-solid fa-user"></i></div><div class="flex-1 min-w-0"><p class="font-medium text-sm truncate">' + c.name + '</p><p class="text-xs text-sok-muted">' + c.phone + ' • od ' + c.since + '</p></div><div class="text-right shrink-0"><p class="text-sm font-semibold">' + c.karnet + ' <span class="text-sok-muted font-normal text-xs">wejść</span></p><p class="text-xs text-sok-muted">' + c.trainings + ' w m-cu</p></div></div>';
  }).join('');
}

function approveBooking(id) { showToast('Zapis zatwierdzony'); }
function rejectBooking(id) { showToast('Zapis odrzucony'); }
function showAddShift() { openShiftModal(); }

initCalendar();
renderPending();
renderClients();
