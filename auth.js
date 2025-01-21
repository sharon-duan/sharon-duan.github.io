(function() {
  const AUTH_EXPIRATION_MS = 1000 * 3600 * 24; // 24 hours

  // There's a hint here.
  const key = 'auth_h_d';

  // Yes you can just set this thing, go ahead you hacker.
  const authorized = sessionStorage.getItem(key);
  if (authorized && Number(authorized) > Date.now() - AUTH_EXPIRATION_MS) {
    // Going back to auth.html while authorized revokes it.
    if (location.href.includes('auth')) {
      sessionStorage.removeItem(key);
    }
    // Otherwise, we're authorized and on index.html.
    return;
  }

  // From there, we're in auth.html.
  sessionStorage.removeItem(key);

  if (!location.href.includes('auth')) {
    location.href = '/auth.html';
    return;
  }

  setTimeout(() => {
    console.log('focus');
    $('input').focus();
  });

  $('button').onclick = check;
  $('input').addEventListener('keypress', (key) => {
    if (key.key === 'Enter') check();
  });

  function check() {
    const typed = $('input').value;
    if (hash(typed) === 'e6d0d610') {
      sessionStorage.setItem(key, Date.now());
      location.href = '/';
      return;
    }
    $('input').value = '';
    $('.nope').classList.add('visible');
  }

  function $(selector) {
    return document.querySelector(selector);
  }

  function hash(b) {
    for(var a=0,c=b.length;c--;)a+=b.charCodeAt(c),a+=a<<10,a^=a>>6;a+=a<<3;a^=a>>11;
    return((a+(a<<15)&4294967295)>>>0).toString(16);
  }
})();
