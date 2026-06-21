const dialog = document.querySelector('#dialog');
const title = document.querySelector('#dialog-title');
const copy = document.querySelector('#dialog-copy');
const toast = document.querySelector('#toast');

let faqs = [
  ['Apakah SoButy+ aman untuk mata sensitif?', 'Ya. Gunakan sesuai panduan, pastikan tangan bersih, dan hentikan pemakaian bila terasa tidak nyaman. Untuk kondisi mata tertentu, konsultasikan dahulu dengan tenaga medis.'],
  ['Berapa kali cluster lashes bisa digunakan ulang?', 'Cluster lashes dapat digunakan kembali selama bentuknya masih baik dan dibersihkan dengan lembut setelah pemakaian. Jumlah pemakaian bergantung pada cara perawatan.'],
  ['Bagaimana cara melepas cluster lashes dengan benar?', 'Gunakan remover yang sesuai, tunggu beberapa saat, lalu lepaskan perlahan dari sisi luar. Jangan menarik paksa agar bulu mata alami tetap terjaga.']
];

function openInfo(heading, body) {
  title.textContent = heading;
  copy.textContent = body;
  dialog.showModal();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

async function loadSettings() {
  try {
    const response = await fetch(`content/settings.json?v=${Date.now()}`);
    if (!response.ok) throw new Error('Settings unavailable');
    return await response.json();
  } catch (error) {
    return {};
  }
}

async function initialise() {
  const settings = await loadSettings();
  if (Array.isArray(settings.faqs) && settings.faqs.length >= 3) {
    faqs = settings.faqs.map(item => [item.question, item.answer]);
  }

  document.querySelectorAll('[data-link]').forEach(link => {
    const target = settings[link.dataset.link];
    if (target) link.href = target;
  });

  document.querySelectorAll('[data-faq]').forEach(button => {
    button.addEventListener('click', () => openInfo(...faqs[Number(button.dataset.faq)]));
  });

  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'whatsapp' || action === 'help') {
        if (settings.whatsapp) window.open(settings.whatsapp, '_blank', 'noopener');
        else showToast('Tambahkan nomor WhatsApp CS melalui halaman admin.');
      }
      if (action === 'join') {
        if (settings.membership) window.open(settings.membership, '_blank', 'noopener');
        else openInfo('Gabung SoButy+ Circle', 'Tautan pendaftaran dapat ditambahkan melalui halaman admin.');
      }
    });
  });
}

initialise();

document.querySelectorAll('.close, .close-text').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
