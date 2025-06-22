/* ---------- elemen ---------- */
const navButtons = document.querySelectorAll('.tabs button[data-tab]');
const bar        = document.querySelector('.tabs .bar');
const panel      = document.getElementById('panel');
const aside = document.querySelector('aside');

/* ---------- cache ---------- */
const cache   = Object.create(null);   // { tabName : { html, toc } }
let   current = null;

/* ---------- sisip konten ---------- */
function insert({ html, toc }) {
  panel.innerHTML = '';                // buang spinner / konten sebelumnya
  if (toc)   panel.insertAdjacentHTML('beforeend', toc);   // letakkan TOC dulu
  panel.insertAdjacentHTML('beforeend', html);             // lalu konten

  panel.classList.add('fade');
  setTimeout(() => panel.classList.remove('fade'), 300);
}

/* ---------- ganti tab ---------- */
async function activate(btn){
  const name = btn.dataset.tab;
  if (name === current) return;

  /* visual tab */
  document.querySelector('.tabs .active')?.classList.remove('active');
  btn.classList.add('active');
  current = name;

  /* bar animasi */
  bar.style.transform = `translateX(${btn.offsetLeft}px)`;
  bar.style.width     = `${btn.offsetWidth}px`;

  /* gunakan cache jika ada */
  if (cache[name]) { insert(cache[name]); return; }

  /* spinner */
  panel.innerHTML = '<div class="loading">Loading…</div>';

  /* fetch paralel */
  const [resHtml, resToc] = await Promise.allSettled([
    fetch(`data/${name}.html`),
    fetch(`data/${name}.toc.html`)
  ]);

  /* konten */
  let html = '<p>404 Content not found.</p>';
  if (resHtml.status === 'fulfilled' && resHtml.value.ok) {
    const raw = await resHtml.value.text();
    if (raw.trim()) html = raw;
  }

  /* TOC */
  let toc = '';   // biar API yang menentukannya
  if (resToc.status === 'fulfilled' && resToc.value.ok) {
    const raw = await resToc.value.text();
    if (raw.trim()) toc = raw;
  }

  cache[name] = { html, toc };
  insert(cache[name]);
}

/* ---------- event ---------- */
navButtons.forEach(btn => btn.addEventListener('click', () => activate(btn)));

/* ---------- init ---------- */
activate(document.querySelector('.tabs button.active'));
(async () => {
    try {
      // 1. ambil respons
      const res = await fetch('data/aside.html');   // ← path relatif ke dokumen
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // 2. ubah jadi string HTML
      const html = await res.text();
      // 3. sisipkan ke DOM
      aside.innerHTML = html;

    } catch (err) {
      console.error('Gagal memuat aside:', err);
      aside.textContent = 'Tidak bisa memuat konten.';
    }
  })();