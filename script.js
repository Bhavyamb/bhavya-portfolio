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

  if (!document.querySelector('.page-mascot')) {
    const mascot = document.createElement('div');
    mascot.className = 'page-mascot';
    mascot.setAttribute('role', 'button');
    mascot.setAttribute('tabindex', '0');
    mascot.setAttribute('aria-label', 'Friendly portfolio assistant');
    mascot.innerHTML = `
      <button class="mascot-close" aria-label="Close character">×</button>
      <div class="mascot-bubble visible" aria-live="polite">
        <span class="mascot-bubble-text">Hi! 👋 Welcome to my portfolio.</span>
        <button class="mascot-bubble-close" aria-label="Hide message">×</button>
      </div>
      <div class="mascot-character" aria-label="Portfolio assistant avatar">
        <div class="mascot-shadow"></div>
        <div class="mascot-head">
          <img class="mascot-asset" alt="Portfolio assistant" src="./assets/Screenshot 2026-10-14 230201.png" />
        </div>
      </div>
      <button class="mascot-reopen" aria-label="Show helper">Hi</button>
    `;

    document.body.appendChild(mascot);

    const bubble = mascot.querySelector('.mascot-bubble');
    const bubbleText = mascot.querySelector('.mascot-bubble-text');
    const closeButton = mascot.querySelector('.mascot-close');
    const bubbleClose = mascot.querySelector('.mascot-bubble-close');
    const reopenButton = mascot.querySelector('.mascot-reopen');
    const assetImage = mascot.querySelector('.mascot-asset');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const greetingKey = 'portfolioMascotGreetingSeen';
    const sessionGreetingSeen = sessionStorage.getItem(greetingKey) === 'true';
    let hideTimer = null;

    const assetCandidates = [
      './assets/Screenshot 2026-10-14 230201.png',
      './assets/portfolio-bot-avatar.svg',
      './assets/portfolio-avatar-3d.svg',
      './assets/portfolio-avatar-placeholder.svg'
    ];

    const loadAsset = () => {
      let index = 0;
      const tryNext = () => {
        if (index >= assetCandidates.length) {
          assetImage.src = './assets/portfolio-avatar-placeholder.svg';
          return;
        }

        const url = assetCandidates[index];
        const img = new Image();
        img.onload = () => {
          assetImage.src = url;
        };
        img.onerror = () => {
          index += 1;
          tryNext();
        };
        img.src = url;
      };
      tryNext();
    };

    const showBubble = (message, autoHide = true) => {
      bubbleText.textContent = message;
      bubble.classList.add('visible');
      clearTimeout(hideTimer);

      if (autoHide) {
        hideTimer = setTimeout(() => {
          bubble.classList.remove('visible');
        }, 3400);
      }
    };

    const hideBubble = () => {
      bubble.classList.remove('visible');
      clearTimeout(hideTimer);
    };

    const showMascot = () => {
      mascot.classList.remove('is-hidden');
      reopenButton.classList.remove('visible');
    };

    const hideMascot = () => {
      mascot.classList.add('is-hidden');
      reopenButton.classList.add('visible');
      hideBubble();
    };

    if (!sessionGreetingSeen) {
      sessionStorage.setItem(greetingKey, 'true');
      setTimeout(() => {
        showBubble('Hi! 👋 Welcome to my portfolio.');
      }, reduceMotion ? 0 : 400);
    }

    if (reduceMotion) {
      mascot.classList.add('reduced-motion');
    }

    const onCharacterClick = () => {
      if (mascot.classList.contains('is-hidden')) {
        showMascot();
      }
      showBubble("I'm a developer too! Let's explore my work.");
    };

    mascot.addEventListener('click', (event) => {
      if (event.target.closest('.mascot-close')) {
        event.stopPropagation();
        hideMascot();
        return;
      }

      if (event.target.closest('.mascot-bubble-close')) {
        event.stopPropagation();
        hideBubble();
        return;
      }

      if (event.target.closest('.mascot-reopen')) {
        event.stopPropagation();
        showMascot();
        if (sessionGreetingSeen) {
          showBubble("I'm a developer too! Let's explore my work.");
        }
        return;
      }

      if (!event.target.closest('button')) {
        onCharacterClick();
      }
    });

    mascot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onCharacterClick();
      }
    });

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      hideMascot();
    });

    bubbleClose.addEventListener('click', (event) => {
      event.stopPropagation();
      hideBubble();
    });

    reopenButton.addEventListener('click', (event) => {
      event.stopPropagation();
      showMascot();
    });
  }
});