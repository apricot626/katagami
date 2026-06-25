/* 用語集への自動リンク — howto ページ共通 */
(function(){
  const TERMS=[
    {m:'中表',        id:'nakamoto'},
    {m:'縫い代',      id:'nuishiro'},
    {m:'返し口',      id:'kaeshiguchi'},
    {m:'三つ折り',    id:'mitsuori'},
    {m:'ジグザグミシン', id:'zigzag'},
    {m:'合印',        id:'aijirushi'},
  ];
  const BASE='yougoshu.html#';
  const seen=new Set();

  function walk(node){
    if(node.nodeType===3){
      let t=node.textContent;
      for(const{m,id}of TERMS){
        if(seen.has(id))continue;
        const i=t.indexOf(m);
        if(i<0)continue;
        seen.add(id);
        const par=node.parentNode;
        const a=document.createElement('a');
        a.href=BASE+id; a.textContent=m; a.className='term-link'; a.title='用語集';
        par.insertBefore(document.createTextNode(t.slice(0,i)),node);
        par.insertBefore(a,node);
        const rest=document.createTextNode(t.slice(i+m.length));
        par.insertBefore(rest,node);
        par.removeChild(node);
        walk(rest);
        return;
      }
    }else if(node.nodeType===1){
      if(['A','SCRIPT','STYLE','H1','H2','H3'].includes(node.tagName))return;
      [...node.childNodes].forEach(walk);
    }
  }

  document.addEventListener('DOMContentLoaded',function(){
    const art=document.querySelector('.article');
    if(art)walk(art);
  });
})();
