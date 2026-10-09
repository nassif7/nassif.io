(function(){
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var els=[].slice.call(document.querySelectorAll('.rv,.rvl'));
if(rm){els.forEach(function(e){e.classList.add('in')});}
else if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
els.forEach(function(e){io.observe(e)});
}else{els.forEach(function(e){e.classList.add('in')})}

// count-up on the stat strip — markup seeds the REAL value, so any rAF
// throttle (background tab, paused compositor) degrades to the right number.
var nums=[].slice.call(document.querySelectorAll('[data-count]'));
function run(el){
var to=parseFloat(el.getAttribute('data-count'));
if(isNaN(to)){return}
el.textContent=to;
if(rm||typeof requestAnimationFrame!=='function'){return}
var t0=null,d=1100,done=false;
function finish(){if(!done){done=true;el.textContent=to}}
var guard=setTimeout(finish,d+400);
function step(t){if(done)return;if(!t0)t0=t;var p=Math.min((t-t0)/d,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1){requestAnimationFrame(step)}else{clearTimeout(guard);finish()}}
el.textContent=0;
requestAnimationFrame(step);
}
if('IntersectionObserver' in window){
var io2=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){run(e.target);io2.unobserve(e.target)}})},{threshold:.5});
nums.forEach(function(n){io2.observe(n)});
}else nums.forEach(function(n){n.textContent=n.getAttribute('data-count')});

// local time in Berlin
var clock=document.querySelector('[data-clock]');
if(clock){
function tick(){
try{clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());}catch(e){}
}
tick();setInterval(tick,20000);
}
})();
