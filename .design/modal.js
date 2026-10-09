(function(){
var css='.mo{position:fixed;inset:0;z-index:1000;background:#fff;display:flex;flex-direction:column;opacity:0;transform:translateY(14px);transition:opacity .32s cubic-bezier(.2,.7,.3,1),transform .32s cubic-bezier(.2,.7,.3,1)}'+
'.mo.in{opacity:1;transform:none}'+
'.mo-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px var(--pad,32px);border-bottom:1px solid var(--ink,#000);font-family:var(--m,monospace);font-size:clamp(9.5px,.8vw,11px);letter-spacing:.14em;text-transform:uppercase}'+
'.mo-bar .lb{color:var(--mute,#6b6b6b)}.mo-bar .lb b{font-weight:500;color:var(--acc,#2F6664)}'+
'.mo-x{font:inherit;letter-spacing:inherit;text-transform:inherit;background:none;border:0;color:var(--ink,#000);cursor:pointer;display:inline-flex;gap:10px;align-items:center;padding:10px 0;min-height:44px}'+
'.mo-x:hover,.mo-x:focus-visible{color:var(--acc,#2F6664)}.mo-x:focus-visible{outline:1px solid var(--acc,#2F6664);outline-offset:4px}'+
'.mo-x i{font-style:normal;color:var(--mute,#6b6b6b)}'+
'.mo iframe{flex:1;width:100%;border:0;display:block;background:#fff}'+
'@media(prefers-reduced-motion:reduce){.mo{transition:none}}'+
'@media(max-width:560px){.mo-x i{display:none}}';
var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
var mo=null,trigger=null,base=location.pathname+location.search.replace(/[?&]open=[^&]*/,'').replace(/^&/,'?');
function isTarget(a){var h=a.getAttribute('href')||'';return /^(Project|Article)\.html/.test(h)}
function label(h){return /^Article/.test(h)?'<b>Essay</b>':'<b>Project</b>'}
function open(href,push){
 if(!mo){mo=document.createElement('div');mo.className='mo';mo.setAttribute('role','dialog');mo.setAttribute('aria-modal','true');
  mo.innerHTML='<div class="mo-bar"><span class="lb"></span><button class="mo-x" type="button" aria-label="Close">Close <i>Esc</i> ×</button></div><iframe title="Detail"></iframe>';
  document.body.appendChild(mo);mo.querySelector('.mo-x').onclick=function(){close(true)}}
 mo.querySelector('.lb').innerHTML=label(href);mo.setAttribute('aria-label',/^Article/.test(href)?'Essay':'Project');
 var f=mo.querySelector('iframe');f.src=href+(href.indexOf('?')<0?'?':'&')+'embed=1';
 document.documentElement.style.overflow='hidden';
 requestAnimationFrame(function(){mo.classList.add('in')});
 setTimeout(function(){mo.querySelector('.mo-x').focus()},40);
 if(push)history.pushState({open:href},'',location.pathname+(location.search?location.search.replace(/([?&])open=[^&]*&?/,'$1').replace(/[?&]$/,''):'')+(location.search.replace(/([?&])open=[^&]*&?/,'$1').replace(/[?&]$/,'')?'&':'?')+'open='+encodeURIComponent(href));
}
function close(pop){
 if(!mo||!mo.classList.contains('in'))return;
 mo.classList.remove('in');document.documentElement.style.overflow='';
 var m=mo;setTimeout(function(){if(!m.classList.contains('in'))m.querySelector('iframe').src='about:blank'},340);
 if(pop&&history.state&&history.state.open)history.back();
 if(trigger){trigger.focus();trigger=null}
}
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target.closest&&e.target.closest('a');if(!a||!isTarget(a))return;
 e.preventDefault();trigger=a;open(a.getAttribute('href'),true);
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close(true)});
window.addEventListener('message',function(e){if(e.data==='modal:close')close(true);if(e.data&&e.data.modalNav){mo.querySelector('.lb').innerHTML=label(e.data.modalNav);history.replaceState({open:e.data.modalNav},'',location.pathname+'?open='+encodeURIComponent(e.data.modalNav))}});
window.addEventListener('popstate',function(e){if(e.state&&e.state.open)open(e.state.open,false);else close(false)});
var q=new URLSearchParams(location.search).get('open');if(q&&/^(Project|Article)\.html/.test(q)){history.replaceState({open:q},'',location.href);open(q,false)}
})();
