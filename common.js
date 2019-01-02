(function() {
  console.log("%cWelcome to my Portfolio :)", "color: orange");

  const transitionLong = 600;
  const trdur = transitionLong/2+2;

  setTimeout(() => {
    let active = header.querySelector('a.active');
    header.classList.remove('appears');
    header.querySelectorAll('a').forEach((a) => {
      a.onclick = () => {
        active && active.classList.remove('active');
        active = a;
        active.classList.add('active');

        if (a.getAttribute('id') === 'aabout' && !a.getAttribute('href')) {
          prepareMainPage();
          header.classList.add('reduced');
          setTimeout(() => {location.href = 'about.html';}, trdur);
        }

        if (a.getAttribute('id') === 'awork' && !a.getAttribute('href')) {
          prepareMainPage();
          setTimeout(() => {location.href = '/';}, trdur);
        }

        if (a.getAttribute('id') === 'acontact' && !a.getAttribute('href')) {
          prepareMainPage();
          setTimeout(() => {location.href = '/#contact';}, trdur);
        }
      };
    });

    document.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('click', () => {
        document.body.classList.add('project');
        header.classList.add('reduced');
        setTimeout(() => {
          if (['bigsur', 'uncommon'].indexOf(tile.getAttribute('id')) === -1) {
            location.href = '/';
            return;
          }
          location.href = 'projects/' + tile.getAttribute('id') + '.html';
        }, trdur);
      });
    });

    if (window.sharon) {
      sharon.onclick = () => {
        prepareMainPage();
        setTimeout(() => {location.href = '/';}, trdur);
      };
    }

    if (window.scrollable) {
      scrollable.classList.remove('appears');
      scrollable.classList.add('no-hover');
      setTimeout(() => {
        scrollable.classList.remove('no-hover');
      }, transitionLong);
    }
  }, 100);

  scrollable.addEventListener('scroll', updateHeader);

  function updateHeader() {
    let ratio = Math.max(0, Math.min(1, scrollable.scrollTop / 100));

    header.style.boxShadow = `0 0 20px -3px rgba(0, 0, 0, ${value(ratio, 0, 0.15)})`;

    if (!header.classList.contains('reduced')) {
      header.style.fontSize = value(ratio, 30, 20) + 'px';
      header.style.paddingTop = header.style.paddingBottom = value(ratio, 40, 20) + 'px';
      if (window.sub) {
        sub.style.opacity = Math.max(0, value(ratio, 1, -1));
      }
    }
  }

  function value(ratio, min, max) {
    return min + ((max - min) * ratio);
  }

  init();

  function init() {
    try {
      updateHeader();
    } catch(e) {
      console.error(e);
    }

    try {
      setAllImages();
    } catch(e) {
      console.error(e);
    }

    if (location.hash) {
      if (location.hash === '#contact') {
        setTimeout(() => {acontact.click();}, 100);
      }
    }
  }

  function setAllImages() {
    const factor = window.innerWidth >= 1600 ? '3x' :
                   window.innerWidth >= 600 ? '2x' :
                   '1x';

    const projId = document.querySelector('main').getAttribute('id');
    document.querySelectorAll('[data-img]').forEach(img => {
      const name = img.getAttribute('data-img');
      const src = `projects/${projId}/${name}@${factor}.png`;
      img.src = src;

      img.onclick = () => {
        const big = `./projects/${projId}/${name}@3x.png`;
        window.open(big, '_blank');
      };
    });
  }

  function prepareMainPage() {
    document.body.classList.add('project');
    header.classList.remove('reduced');
    header.classList.add('animated');

    try {
      header.style.fontSize = '';
      header.style.paddingTop = '';
      header.style.paddingBottom = '';
      header.style.boxShadow = '';
      sub.style.opacity = '';
    } catch(e) {
      console.error(e);
    }
  }
})();
