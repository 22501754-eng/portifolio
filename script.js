// Tema persistente, máscaras, animações ao rolar e modal de contato.
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light-mode');
updateThemeButton();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  updateThemeButton();
});
function updateThemeButton() {
  const light = body.classList.contains('light-mode');
  themeToggle.textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Ativar modo escuro' : 'Ativar modo claro');
  document.querySelector('meta[name="theme-color"]').content = light ? '#b5dbe7' : '#0b2937';
}

// Reveal ao rolar (IntersectionObserver).
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));

// Máscara de telefone brasileiro: (00) 00000-0000 ou (00) 0000-0000.
const phone = document.getElementById('telefone');
phone.addEventListener('input', event => {
  let digits = event.target.value.replace(/\D/g, '').slice(0, 11);
  if (digits.length > 10) digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  else if (digits.length > 6) digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  else if (digits.length > 2) digits = digits.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  else if (digits.length > 0) digits = digits.replace(/^(\d*)/, '($1');
  event.target.value = digits;
});

// Modal acessível de feedback para o formulário demonstrativo.
const form = document.getElementById('contactForm');
const modal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneDigits = phone.value.replace(/\D/g, '');
  const message = document.getElementById('mensagem').value.trim();

  if (name.length < 2) return showModal('Confira seu nome', 'Digite seu nome completo para continuar.');
  if (phoneDigits.length < 10) return showModal('Telefone incompleto', 'Digite um telefone válido com DDD.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showModal('E-mail inválido', 'Confira o endereço de e-mail informado.');
  if (message.length < 10) return showModal('Mensagem muito curta', 'Escreva uma mensagem com pelo menos 10 caracteres.');

  showModal('Tudo certo! 🐚', `Obrigado, ${name}! Seus dados foram validados neste navegador. Para receber mensagens de verdade, conecte o formulário a um serviço de envio.`);
  form.reset();
});
function showModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  if (typeof modal.showModal === 'function') modal.showModal();
  else alert(`${title}\n\n${text}`);
}
document.getElementById('closeModal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});
document.getElementById('year').textContent = new Date().getFullYear();

// Peixes nadam para a esquerda continuamente; atraso variado evita movimento sincronizado.
document.querySelectorAll('.fish').forEach((fish, index) => {
  fish.style.animationDelay = `${-index * 2.3}s`;
});
