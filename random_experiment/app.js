const navButtons = document.querySelectorAll('.nav .tab[data-tab]');
const bar = document.querySelector('.nav .bar');
const panel = document.getElementById('panel');
const aside = document.querySelector('aside');
const cache = Object.create(null);
let current = null;
function insert({ html, toc }) {
  panel.innerHTML = '';
  if (toc) panel.insertAdjacentHTML('beforeend', toc);
  panel.insertAdjacentHTML('beforeend', html);
  panel.classList.add('fade');
  setTimeout(() => panel.classList.remove('fade'), 300);
}
async function activate(btn) {
  const name = btn.dataset.tab;
  if (name === current) return;
  document.querySelector('.nav .active')?.classList.remove('active');
  btn.classList.add('active');
  current = name;
  bar.style.transform = `translateX(${btn.offsetLeft}px)`;
  bar.style.width = `${btn.offsetWidth}px`;
  if (cache[name]) {
    insert(cache[name]);
    return;
  }
  panel.innerHTML = '<div class="loading">Loading…</div>';
  const [resHtml, resToc] = await Promise.allSettled([
    fetch(`data/${name}.html`),
    fetch(`data/${name}.toc.html`)
  ]);
  let html = '<p>404 Content not found.</p>';
  if (resHtml.status === 'fulfilled' && resHtml.value.ok) {
    const raw = await resHtml.value.text();
    if (raw.trim()) html = raw;
  }
  let toc = '';
  if (resToc.status === 'fulfilled' && resToc.value.ok) {
    const raw = await resToc.value.text();
    if (raw.trim()) toc = raw;
  }
  cache[name] = { html, toc };
  insert(cache[name]);
}
navButtons.forEach(btn => btn.addEventListener('click', () => activate(btn)));
activate(document.querySelector('.nav .active'));
(async () => {
  try {
    const res = await fetch('data/aside.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    aside.innerHTML = html;
  } catch (err) {
    console.error('Gagal memuat aside:', err);
    aside.textContent = 'Tidak bisa memuat konten.';
  }
})();
