// theme, menu, active nav, small utilities
(function(){
  const body = document.body;
  const toggle = document.querySelectorAll('#theme-toggle');
  const menuBtns = document.querySelectorAll('.menu-toggle');
  const navLists = document.querySelectorAll('.nav-links');

  // initialize year text
  const yearEls = ['year','year-2','year-3','year-4'];
  yearEls.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // theme: load saved or detect
  const saved = localStorage.getItem('site-theme');
  if(saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    body.classList.add('dark');
  }

  // toggle button(s) behavior
  document.querySelectorAll('#theme-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      body.classList.toggle('dark');
      localStorage.setItem('site-theme', body.classList.contains('dark') ? 'dark' : 'light');
      updateThemeIcon();
    });
  });

  function updateThemeIcon(){
    document.querySelectorAll('#theme-toggle').forEach(btn=>{
      btn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }
  updateThemeIcon();

  // mobile menu toggles
  menuBtns.forEach((btn, i)=>{
    btn.addEventListener('click', ()=>{
      const list = navLists[i] || document.querySelector('.nav-links');
      if(list) list.style.display = (list.style.display === 'flex' || list.style.display === 'block') ? 'none' : 'flex';
    });
  });

  // add active class by URL (for local files)
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(a=>{
    try{
      const href = a.getAttribute('href');
      const current = window.location.pathname.split('/').pop() || 'index.html';
      if(href === current) a.classList.add('active');
    }catch(e){}
  });

  // close mobile nav when clicking outside
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.nav') && window.innerWidth <= 900){
      document.querySelectorAll('.nav-links').forEach(n => n.style.display = 'none');
    }
  });
})();