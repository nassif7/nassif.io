(function(){
var panel=document.querySelector('.mob-panel');
if(!panel)return;
var toggle=document.querySelector('.mob-toggle'),close=panel.querySelector('.mob-close');
function open(){panel.classList.add('open');document.body.classList.add('nav-open');if(toggle)toggle.setAttribute('aria-expanded','true');var f=panel.querySelector('nav a');if(f)f.focus({preventScroll:true})}
function shut(){panel.classList.remove('open');document.body.classList.remove('nav-open');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.focus({preventScroll:true})}}
if(toggle)toggle.addEventListener('click',open);
if(close)close.addEventListener('click',shut);
panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',shut)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open'))shut()});
window.addEventListener('resize',function(){if(window.innerWidth>900&&panel.classList.contains('open'))shut()});
})();
