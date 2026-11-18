<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#0f0f0f" />
  <title>SOK Treningi – Admin</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            sok: {
              bg: '#0f0f0f',
              card: '#1a1a1a',
              border: '#2a2a2a',
              accent: '#e11d48',
              accent2: '#f97316',
              muted: '#a1a1aa',
              success: '#22c55e',
              warning: '#eab308'
            }
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="text-white font-sans antialiased min-h-screen">

  <div class="min-h-screen flex flex-col max-w-lg mx-auto relative">

    <!-- Header -->
    <header class="sticky top-0 z-40 bg-sok-bg/95 backdrop-blur border-b border-sok-border px-4 py-3 flex items-center justify-between">
      <div>
        <h2 id="header-title" class="font-semibold text-lg leading-tight">Kalendarz</h2>
        <p id="header-sub" class="text-xs text-sok-muted">Zmiany i sloty</p>
      </div>
      <button onclick="logout()" class="w-9 h-9 rounded-full bg-sok-card border border-sok-border flex items-center justify-center text-sok-muted">
        <i class="fa-solid fa-right-from-bracket text-sm"></i>
      </button>
    </header>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto pb-24">

      <!-- Kalendarz -->
      <div id="admin-kalendarz" class="view active px-4 pt-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Listopad 2026</h3>
          <div class="flex gap-2">
            <button class="w-8 h-8 rounded-lg bg-sok-card border border-sok-border flex items-center justify-center text-sm"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="w-8 h-8 rounded-lg bg-sok-card border border-sok-border flex items-center justify-center text-sm"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center text-xs mb-5">
          <div class="text-sok-muted py-1">Pn</div><div class="text-sok-muted py-1">Wt</div><div class="text-sok-muted py-1">Śr</div>
          <div class="text-sok-muted py-1">Cz</div><div class="text-sok-muted py-1">Pt</div><div class="text-sok-muted py-1">Sb</div><div class="text-sok-muted py-1">Nd</div>
          <div class="py-2 text-sok-muted">16</div>
          <div class="py-2 bg-sok-accent/20 text-sok-accent rounded-lg font-semibold relative">17
            <span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-sok-accent rounded-full"></span>
          </div>
          <div class="py-2 text-sok-muted">18</div>
          <div class="py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold relative">19
            <span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></span>
          </div>
          <div class="py-2 text-sok-muted">20</div>
          <div class="py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold relative">21
            <span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></span>
          </div>
          <div class="py-2 text-sok-muted">22</div>
        </div>

        <div class="mb-4">
          <button onclick="showAddShift()" class="w-full bg-sok-accent hover:bg-rose-600 rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
            <i class="fa-solid fa-plus"></i> Dodaj zmianę / sloty
          </button>
        </div>

        <h4 class="text-sm text-sok-muted mb-3">Dzisiejsze sloty (17.11)</h4>
        <div class="space-y-2" id="admin-slots"></div>
      </div>

      <!-- Zapisy -->
      <div id="admin-zapisy" class="view px-4 pt-4">
        <div class="flex gap-2 mb-4">
          <button class="flex-1 py-2 rounded-xl text-sm font-medium bg-sok-accent text-white">Oczekujące (3)</button>
          <button class="flex-1 py-2 rounded-xl text-sm font-medium bg-sok-card border border-sok-border text-sok-muted">Zatwierdzone</button>
        </div>
        <div class="space-y-3" id="pending-list"></div>
      </div>

      <!-- Klienci -->
      <div id="admin-klienci" class="view px-4 pt-4">
        <div class="relative mb-4">
          <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sok-muted text-sm"></i>
          <input type="text" placeholder="Szukaj klienta..." class="w-full bg-sok-card border border-sok-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-sok-accent" />
        </div>
        <div class="space-y-2" id="clients-list"></div>
      </div>

      <!-- Materiały -->
      <div id="admin-materialy" class="view px-4 pt-4">
        <button class="w-full border-2 border-dashed border-sok-border rounded-2xl py-8 flex flex-col items-center justify-center text-sok-muted mb-5 hover:border-sok-accent transition">
          <i class="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
          <span class="text-sm">Dodaj zdjęcie lub film</span>
        </button>
        <div class="grid grid-cols-2 gap-3">
          <div class="aspect-square rounded-xl bg-sok-card border border-sok-border relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-sok-muted"><i class="fa-solid fa-image text-2xl"></i></div>
            <button class="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-xs"><i class="fa-solid fa-trash"></i></button>
          </div>
          <div class="aspect-square rounded-xl bg-sok-card border border-sok-border relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-sok-muted"><i class="fa-solid fa-video text-2xl"></i></div>
            <button class="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-xs"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>

      <!-- Ustawienia -->
      <div id="admin-ustawienia" class="view px-4 pt-4">
        <div class="space-y-3">
          <button class="w-full card rounded-xl p-4 flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <i class="fa-brands fa-whatsapp text-lg"></i>
            </div>
            <div>
              <p class="font-medium text-sm">Wyślij wiadomość</p>
              <p class="text-xs text-sok-muted">Do klienta lub grupy</p>
            </div>
          </button>
          <button class="w-full card rounded-xl p-4 flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <i class="fa-solid fa-ticket text-lg"></i>
            </div>
            <div>
              <p class="font-medium text-sm">Zarządzaj karnetami</p>
              <p class="text-xs text-sok-muted">Dodaj / edytuj pakiety</p>
            </div>
          </button>
          <button class="w-full card rounded-xl p-4 flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
              <i class="fa-solid fa-bell text-lg"></i>
            </div>
            <div>
              <p class="font-medium text-sm">Powiadomienia WhatsApp</p>
              <p class="text-xs text-sok-muted">Nowe zapisy i odwołania</p>
            </div>
          </button>
        </div>
      </div>

    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-sok-bg/95 backdrop-blur border-t border-sok-border safe-bottom z-50">
      <div class="flex justify-around py-2">
        <button onclick="showView('admin-kalendarz')" class="nav-item active flex flex-col items-center gap-0.5 w-16 py-1 text-sok-muted" data-view="admin-kalendarz">
          <i class="fa-solid fa-calendar-days text-lg"></i>
          <span class="text-[10px]">Kalendarz</span>
        </button>
        <button onclick="showView('admin-zapisy')" class="nav-item flex flex-col items-center gap-0.5 w-16 py-1 text-sok-muted" data-view="admin-zapisy">
          <i class="fa-solid fa-clipboard-check text-lg"></i>
          <span class="text-[10px]">Zapisy</span>
        </button>
        <button onclick="showView('admin-klienci')" class="nav-item flex flex-col items-center gap-0.5 w-16 py-1 text-sok-muted" data-view="admin-klienci">
          <i class="fa-solid fa-users text-lg"></i>
          <span class="text-[10px]">Klienci</span>
        </button>
        <button onclick="showView('admin-materialy')" class="nav-item flex flex-col items-center gap-0.5 w-16 py-1 text-sok-muted" data-view="admin-materialy">
          <i class="fa-solid fa-photo-film text-lg"></i>
          <span class="text-[10px]">Materiały</span>
        </button>
        <button onclick="showView('admin-ustawienia')" class="nav-item flex flex-col items-center gap-0.5 w-16 py-1 text-sok-muted" data-view="admin-ustawienia">
          <i class="fa-solid fa-gear text-lg"></i>
          <span class="text-[10px]">Więcej</span>
        </button>
      </div>
    </nav>
  </div>

  <!-- Toast -->
  <div id="toast" class="hidden fixed top-16 left-1/2 -translate-x-1/2 z-[110] bg-sok-card border border-sok-border px-4 py-2.5 rounded-xl text-sm shadow-xl flex items-center gap-2">
    <i class="fa-solid fa-check text-sok-success"></i>
    <span id="toast-text">Zapisano</span>
  </div>

  <script src="js/common.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
