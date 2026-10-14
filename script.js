document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('nav ul');
      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
      }
    });
  });

  const sectionMessages = {
    'index.html': 'Hi! 👋 Welcome to my portfolio home. This is where you can explore my work and get a quick overview of who I am.',
    'about.html': 'This is the About section. Here you can learn about my journey, my background, and the strengths I bring to software engineering.',
    'skills.html': 'This is my Skills section. It highlights the technologies, tools, and backend capabilities I use to build reliable solutions.',
    'education.html': 'This is the Education section. It shows my academic foundation and the learning path behind my technical growth.',
    'experience.html': 'This is my Experience section. Here I share the professional roles and work that shaped my practical engineering experience.',
    'certifications.html': 'This is the Certifications section. These qualifications reflect my continued learning in cloud, AI, cybersecurity, and related fields.',
    'projects.html': 'This is my Projects section. Take a look at the real work I have built and the problems I have solved through software.',
    'contact.html': 'Thank you for visiting my portfolio! I appreciate your time, and I would love to connect for future opportunities.'
  };

  if (!document.querySelector('.floating-bot')) {
    const bot = document.createElement('div');
    bot.className = 'floating-bot';
    bot.setAttribute('aria-label', 'Portfolio assistant');
    bot.innerHTML = `
      <div class="bot-bubble">Hi! 👋 Explore my portfolio sections.</div>
      <div class="bot-figure" aria-hidden="true">
        <div class="bot-antenna"></div>
        <div class="bot-head">
          <span class="bot-eye left"></span>
          <span class="bot-eye right"></span>
          <span class="bot-mouth"></span>
        </div>
      </div>
    `;
    document.body.appendChild(bot);
  }

  const botBubble = document.querySelector('.bot-bubble');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const message = sectionMessages[currentPage] || sectionMessages['index.html'];

  if (botBubble) {
    botBubble.textContent = message;
  }
});