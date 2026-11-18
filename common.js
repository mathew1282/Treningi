// ===== SOK Treningi – wspólne funkcje =====

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toast-text').textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2800);
}

function logout() {
  window.location.href = 'index.html';
}
