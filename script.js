/* ===== Menú móvil ===== */
const hamb = document.getElementById('hamb');
const mPanel = document.getElementById('mPanel');
const modalBg = document.getElementById('modalBg');

hamb?.addEventListener('click', ()=>{
  const open = mPanel.style.display === 'block';
  mPanel.style.display = open ? 'none' : 'block';
  modalBg.style.display = open ? 'none' : 'block';
  mPanel.setAttribute('aria-hidden', open ? 'true' : 'false');
});

document.addEventListener('click', (e)=>{
  if(!mPanel.contains(e.target) && !hamb.contains(e.target)){
    mPanel.style.display = 'none';
    modalBg.style.display = 'none';
    mPanel.setAttribute('aria-hidden','true');
  }
});

/* ===== Carrusel con loop sin salto ===== */
const track = document.getElementById('track');
const slides = track.querySelectorAll('.carousel-slide');
const total = slides.length; // incluye el clon final
const dotsBox = document.getElementById('dots');
const realSlides = total-1;

for(let i=0;i<realSlides;i++){
  const d = document.createElement('div');
  d.className = 'carousel-dot' + (i===0?' active':'');
  d.dataset.index = i;
  dotsBox.appendChild(d);
}

let index = 0;
const GOTO = (i, animate=true)=>{
  if(animate) track.style.transition = 'transform 900ms cubic-bezier(.2,.7,.2,1)';
  track.style.transform = `translateX(-${i*100}%)`;
  [...dotsBox.children].forEach((dot,di)=> dot.classList.toggle('active', di=== (i%realSlides)));
};

const next = ()=>{
  index++;
  GOTO(index,true);
  if(index === total-1){
    // al terminar la animación, saltamos sin transición
    setTimeout(()=>{
      track.style.transition = 'none';
      index = 0;
      GOTO(0,false);
    }, 920);
  }
};

let timer = setInterval(next, 4800);
['mouseenter','touchstart'].forEach(evt=> track.addEventListener(evt,()=>clearInterval(timer),{passive:true}));
['mouseleave','touchend'].forEach(evt=> track.addEventListener(evt,()=>{ timer=setInterval(next,4800)}, {passive:true}));

dotsBox.addEventListener('click', (e)=>{
  const dot = e.target.closest('.carousel-dot');
  if(!dot) return;
  clearInterval(timer);
  index = Number(dot.dataset.index);
  GOTO(index,true);
  timer = setInterval(next,4800);
});
