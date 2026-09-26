/* 工程の図解ページ（step-*.html）— ①②③の丸ボタンで手順を切り替える。
   JS が動かないときは、全部の手順が縦に並んだまま読めるようにしてある。 */
(function(){
  document.addEventListener('DOMContentLoaded',function(){
    var flow=document.querySelector('[data-flow]');
    if(!flow)return;
    var steps=[].slice.call(flow.querySelectorAll('.flow-step'));
    var dots=[].slice.call(flow.querySelectorAll('.flow-dot'));
    if(!steps.length)return;
    flow.classList.add('is-js');
    /* 丸ボタンの列はヘッダーの下に貼り付ける。ヘッダーはスマホで2行になるので実測する */
    var head=document.querySelector('.site-header');
    function setTop(){if(head)flow.style.setProperty('--flow-top',head.offsetHeight+'px');}
    setTop();window.addEventListener('resize',setTop);

    var pager=document.createElement('div');
    pager.className='flow-pager';
    pager.innerHTML='<button type="button" class="flow-prev"></button>'+
      '<span class="flow-count" aria-live="polite"></span>'+
      '<button type="button" class="flow-next"></button>';
    var prev=pager.querySelector('.flow-prev'), next=pager.querySelector('.flow-next'),
        count=pager.querySelector('.flow-count');
    prev.textContent=flow.getAttribute('data-prev');
    next.textContent=flow.getAttribute('data-next');
    flow.appendChild(pager);

    var cur=0;
    function show(i,focus){
      cur=Math.max(0,Math.min(steps.length-1,i));
      steps.forEach(function(s,j){s.hidden=j!==cur;});
      dots.forEach(function(d,j){
        d.classList.toggle('is-done',j<cur);
        if(j===cur)d.setAttribute('aria-current','step');else d.removeAttribute('aria-current');
      });
      prev.disabled=cur===0; next.disabled=cur===steps.length-1;
      count.textContent=(cur+1)+' / '+steps.length;
      if(history.replaceState)history.replaceState(null,'','#'+steps[cur].id);
      if(focus){
        var nav=flow.querySelector('.flow-nav');
        var top=nav.getBoundingClientRect().top;
        var off=head?head.offsetHeight:0;
        if(top<off||top>window.innerHeight*0.5)window.scrollBy({top:top-off-8,behavior:'smooth'});
      }
    }
    dots.forEach(function(d,j){
      d.addEventListener('click',function(e){e.preventDefault();show(j,true);});
    });
    prev.addEventListener('click',function(){show(cur-1,true);});
    next.addEventListener('click',function(){show(cur+1,true);});

    /* 図を左右にスワイプしても進める（スマホで片手で送れるように） */
    var sx=null,sy=null;
    flow.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;},{passive:true});
    flow.addEventListener('touchend',function(e){
      if(sx===null)return;
      var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;
      if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(cur+(dx<0?1:-1),true);
    },{passive:true});

    var m=location.hash.match(/^#s(\d+)$/);
    show(m?+m[1]-1:0,false);
  });
})();
