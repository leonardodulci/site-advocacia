'use strict';

/** Configure aqui o número do WhatsApp (formato internacional, sem +). */
const WHATSAPP_NUMBER = '556199225658'; // Ex.: 55 + DDD + número

/** Monta o link para WhatsApp com a mensagem já preenchida. */
function buildWaLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

/** Menu mobile: abre/fecha lista. */
(function setupMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const menuList = document.getElementById('menuList');
  if (!menuToggle || !menuList) return;

  menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link
  menuList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menuList.classList.remove('open'));
  });
})();

/** CTAs diretos para WhatsApp. */
(function setupCTAs() {
  const ctaHeader = document.getElementById('ctaHeader');
  const ctaHero = document.getElementById('ctaHero');
  const ctaContato = document.getElementById('ctaContato');
  const ctaFloat = document.getElementById('ctaFloat');

  const defaultMsg = 'Olá, vim do site e gostaria de mais informações.';

  [ctaHeader, ctaHero, ctaContato, ctaFloat].forEach(el => {
    if (!el) return;
    el.setAttribute('href', buildWaLink(defaultMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
})();

/** Formulário -> abre WhatsApp com dados preenchidos. */
(function setupForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const texto = `Olá, vim do site e gostaria de atendimento.
Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Assunto: ${assunto}
Mensagem: ${mensagem}`;

    window.open(buildWaLink(texto), '_blank', 'noopener');
  });
})();

/** Ano dinâmico no footer. */
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();