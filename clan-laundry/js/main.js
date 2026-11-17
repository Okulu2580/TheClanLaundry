/* The Clan Laundry — page logic: data, rendering, hash router, mobile menu, form */

/* ---------- DATA ---------- */
// Services shown on Home, Services & pricing, and as booking cards
const services = [
  { n:'01', name:'Clean wash',         blurb:'Everyday wear, towels and bedding, washed with care.',       short:'Everyday wear, towels and bedding.',  tag:'From ₦600' },
  { n:'02', name:'Express wash',       blurb:'A fresh start, without the wait.',                           short:'Fast care for your busy schedule.',   tag:'24-hour delivery' },
  { n:'03', name:'Dry cleaning',       blurb:'Thoughtful attention for suits and special pieces.',         short:'Suits, gowns and special pieces.',    tag:'Professional care' },
  { n:'04', name:'Ironing & finishing',blurb:'Crisp shirts. Smooth sheets. Ready to wear.',                short:'Crisp, smooth and ready to wear.',    tag:'From ₦400' },
];

// [garment, washing, ironing, whites] — null renders as "—"
const prices = [
  ['Duvet',2500,null,3000], ['Suit',2000,1200,2500], ['Gown',1500,800,2000], ['Towel',1000,null,null],
  ['Up and Down',1500,800,2000], ['Joggers',1000,null,1500], ['Hoodie',1000,null,1500], ['Bedsheet',1000,500,1500],
  ['Shirt',700,500,1000], ['Polo',700,400,1000], ['Sneakers',1500,null,2000], ['Flip-flop',1000,null,1500],
  ['Trouser',700,500,1000], ['Skirt',700,500,1000], ['Jean Trouser',1000,null,1500], ['Jean Short',700,null,1000],
  ['Short',600,null,800], ['Top',600,null,800], ['Blanket / White Blanket',1500,null,2000], ['Jean',null,500,null],
];

/* ---------- RENDER ---------- */
const $ = (s) => document.querySelector(s);
const naira = (v) => v == null ? '<span class="text-[#8b969d] font-normal">—</span>' : '₦' + v.toLocaleString('en-NG');

// Home: numbered service list
$('#serviceIndex').innerHTML = services.map(s => `
  <li class="grid grid-cols-[28px_1fr_auto] items-start gap-x-3 py-6 sm:grid-cols-[46px_1fr_auto]">
    <span class="pt-2 text-[11px] font-medium text-brand">${s.n}</span>
    <div><h3 class="font-display text-2xl font-medium">${s.name}</h3><p class="mt-2 text-[13px] text-muted">${s.blurb}</p></div>
    <span class="pt-2 text-right text-xs font-medium text-brand">${s.tag}</span>
  </li>`).join('');

// Services page: 4-up overview with vertical dividers on desktop
$('#serviceOverview').innerHTML = services.map((s,i) => `
  <div class="py-5 lg:px-6 lg:py-0 ${i===0 ? 'lg:pl-0' : 'lg:border-l lg:border-line'}">
    <p class="text-[11px] font-medium text-brand">${s.n}</p>
    <h3 class="mt-5 font-display text-[22px] font-medium">${s.name}</h3>
    <p class="mt-3 text-[13px] text-muted">${s.short}</p>
  </div>`).join('');

// Price table rows
$('#priceRows').innerHTML = prices.map(([g,w,i,wh]) => `
  <tr>
    <td class="px-2 py-[7px] sm:px-6">${g}</td>
    <td class="px-2 py-[7px] text-right font-medium sm:px-6">${naira(w)}</td>
    <td class="px-2 py-[7px] text-right font-medium sm:px-6">${naira(i)}</td>
    <td class="px-2 py-[7px] text-right font-medium sm:px-6">${naira(wh)}</td>
  </tr>`).join('');

// Booking: radio cards (first is preselected, like the design)
$('#serviceChoices').innerHTML = services.map((s,i) => `
  <label class="choice block cursor-pointer">
    <input type="radio" name="service" value="${s.name}" class="sr-only" ${i===0?'checked':''} />
    <span class="choice-body relative block h-[76px] rounded-[3px] border border-[#bcc8d0] bg-white p-[14px] text-xs font-medium transition">
      <span class="dot relative block h-[14px] w-[14px] rounded-full border border-[#8b969d]"></span>
      <span class="absolute bottom-[14px] left-[14px]">${s.name}</span>
    </span>
  </label>`).join('');

/* ---------- THEME TOGGLE ---------- */
const themeToggle = $('#themeToggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  const label = themeToggle?.querySelector('.theme-label');
  const lightIcon = themeToggle?.querySelector('.theme-icon-light');
  const darkIcon = themeToggle?.querySelector('.theme-icon-dark');

  if (label) label.textContent = isDark ? 'Dark' : 'Light';
  if (lightIcon) lightIcon.classList.toggle('hidden', isDark);
  if (darkIcon) darkIcon.classList.toggle('hidden', !isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  }

  localStorage.setItem('clan-theme', theme);
}

const savedTheme = localStorage.getItem('clan-theme') || 'light';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
});

/* ---------- ROUTER (#home | #services | #book) ---------- */
function route() {
  const key = (location.hash || '#home').slice(1);
  const page = ['home','services','book'].includes(key) ? key : 'home';
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
  document.querySelectorAll('[data-nav]').forEach(a => {
    const on = a.dataset.nav === page;
    a.classList.toggle('text-brand', on);
    a.classList.toggle('text-ink', !on);
    // 2px underline indicator under the current page, as in the design
    a.style.boxShadow = on && a.classList.contains('navlink') ? 'inset 0 -2px 0 #0170c2' : 'none';
  });
  $('#mobileNav').classList.add('hidden'); $('#mobileNav').classList.remove('flex');
  $('#menuBtn').setAttribute('aria-expanded','false');
  window.scrollTo({ top: 0 });
}
addEventListener('hashchange', route); route();

/* ---------- MOBILE MENU ---------- */
$('#menuBtn').addEventListener('click', () => {
  const nav = $('#mobileNav'); const open = nav.classList.contains('hidden');
  nav.classList.toggle('hidden', !open); nav.classList.toggle('flex', open);
  $('#menuBtn').setAttribute('aria-expanded', String(open));
});

/* ---------- FORM: send pickup request to WhatsApp ---------- */
$('#pickupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  if (!f.checkValidity()) { f.reportValidity(); return; }

  const data = Object.fromEntries(new FormData(f));
  const phone = '2348092070607';
  const name = data.name || 'Customer';
  const service = data.service || 'Laundry service';
  const message = [
    'Hello The Clan Laundry, I would like to request a pickup.',
    `Name: ${name}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Email: ${data.email || 'Not provided'}`,
    `Service: ${service}`,
    `Pickup address: ${data.address || 'Not provided'}`,
    `Preferred date: ${data.date || 'Not provided'}`,
    `Preferred time: ${data.time || 'Not provided'}`,
    `Special instructions: ${data.notes || 'None'}`,
  ].join('\n');

  const note = $('#formNote');
  note.textContent = `Thanks, ${name.split(' ')[0]}! Your request is being sent to WhatsApp.`;
  note.classList.add('text-brand');

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  f.reset();
});
  