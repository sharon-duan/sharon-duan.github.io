/** This code is ugly, don't reproduce at home without adult surpervision. */

(function() {
  console.log("%cWelcome to my Portfolio :)", "color: #ec7357");

  const transitionLong = 800;
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
          setTimeout(() => {location.href = '/about.html';}, trdur);
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
        if (tile.classList.contains('comingsoon')) {
          if (tile._overlayed) return;
          tile._overlayed = true;
          const comingSoon = document.createElement('div');
          comingSoon.classList.add('comingsoon-overlay');
          comingSoon.innerHTML = `
              <div>
                <h1>COMING SOON</h1>
                <img alt="Tea pot" src="images/teapot.png">
                <img alt="Tea cup" src="images/teacup.png">
              </div>
          `;
          tile.appendChild(comingSoon);
          setTimeout(() => comingSoon.style.opacity = '1', 1);
          clearTimeout(tile._t);
          tile._t = setTimeout(del, 4000);
          tile.addEventListener('mouseleave', del);
          return;

          function del() {
            clearTimeout(tile._t);
            tile.removeEventListener('mouseleave', del);
            if (!tile._overlayed) return;
            tile._overlayed = false;
            comingSoon.style.opacity = '0';
            tile.style.pointerEvents = 'unset';
            setTimeout(() => comingSoon.remove(), 100);
          }
        }

        document.body.classList.add('project');
        header.classList.add('reduced');
        header.classList.add('animated');

        setTimeout(() => {
          location.href = '/projects/' + tile.getAttribute('id');
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

  document.addEventListener('scroll', onScroll);

  function onScroll() {
    const scrollTop = getScrollTop();
    maybeAddInvisionPrototype(scrollTop);
    updateHeader(scrollTop);
    updateToTop(scrollTop);
    updateProgress(scrollTop);
    updateSectionsVisibility(scrollTop);
  }

  function getScrollTop() {
    return window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
  }

  /** If not here and we scolled 60%, swap invisiton iframe src to actually load it */
  function maybeAddInvisionPrototype(scrollTop) {
    if (!window.protoframe || !window.proto || protoframe.getAttribute('src') || !protoframe.getAttribute('data-src')) return;

    if (scrollTop / proto.offsetTop > 0.6) {
      protoframe.setAttribute('src', protoframe.getAttribute('data-src'));
    }
  }

  function updateSectionsVisibility() {
    document.querySelectorAll('section').forEach(section => {
      const top = section.getBoundingClientRect().top;
      const h = section.offsetHeight;

      if (section.style.visibility === 'hidden' && (top - window.outerHeight <= 0) && (top + h) >= 0) {
        section.style.visibility = 'visible';
      } else if (section.style.visibility === 'visible' && (top + h) <= 0) {
        section.style.visibility = 'hidden';
      }
    });
  }

  function updateHeader(scrollTop) {
    if (!window.header) return;

    const ratio = Math.max(0, Math.min(1, scrollTop / 100));

    header.style.boxShadow = `0 0 20px -3px rgba(0, 0, 0, ${value(ratio, 0, 0.15)})`;

    if (!header.classList.contains('reduced')) {
      header.style.fontSize = value(ratio, 30, 20) + 'px';
      header.style.paddingTop = header.style.paddingBottom = value(ratio, 40, 20) + 'px';
      if (window.sub) {
        sub.style.opacity = Math.max(0, value(ratio, 1, -1));
      }
    }
  }

  function updateToTop(scrollTop) {
    if (!window.totop) return;

    if (scrollTop > 1000) {
      totop.classList.add('show');
    } else {
      totop.classList.remove('show');
    }
  }

  function updateProgress(scrollTop) {
    if (!window.progress) return;

    const bar = progress.querySelector('div');
    const ratio = scrollTop / (document.body.scrollHeight - window.outerHeight);
    bar.style.width = `${ratio * 100}%`;
  }

  function value(ratio, min, max) {
    return min + ((max - min) * ratio);
  }

  init();

  function init() {
    document.querySelectorAll('section').forEach(section => {
      section.style.visibility = 'hidden';
    });

    if (document.documentElement.scrollTop > 0) {
      console.log('weird');
    }

    setSmoothScroll();
    onScroll();
    setTimeout(onScroll, trdur);
    setAllImages();

    if (location.hash) {
      if (location.hash === '#contact') {
        setTimeout(() => {acontact.click();}, 100);
      }
    }

    resizeProto();
    let timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(resizeProto, 500);
    });
  }

  function resizeProto() {
    if (!window.proto) return;
    proto.style.height = window.innerHeight + 'px';
    proto.style.setProperty('--ratio', Math.min((window.innerHeight - 74) / 950, window.innerWidth / 500));
  }

  function setAllImages() {
    const factor = window.innerWidth >= 1600 ? '3x' : '2x';

    const projId = document.querySelector('main').getAttribute('id');
    document.querySelectorAll('.project-content img').forEach(img => {
      let src;

      if (img.getAttribute('data-img')) {
        src = img.getAttribute('data-img');
        img.setAttribute('src', src);
        img.removeAttribute('data-img');
      } else {
        src = img.getAttribute('src');
      }

      let fullSizeSrc = src;
      const match = src.match(/([^@]+)@[\d\.]+x/);
      if (match) {
        fullSizeSrc = match[1] + '@3x.png';
      }

      console.log('bound');
      img.onclick = () => {
        window.open(fullSizeSrc, '_blank');
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

  function setSmoothScroll() {
    // Chrome and the like do this natively
    if ('scrollBehavior' in document.documentElement.style) return;
    document.querySelectorAll('a[href*="#"]').forEach((a) => {
      const target = document.getElementById(a.getAttribute('href').substring(1));
      a.removeAttribute('href');
      a.addEventListener('click', () => {
        document.body.scroll({top: target.getBoundingClientRect().top, behavior: 'smooth'});
      });
    });
  }
})();
