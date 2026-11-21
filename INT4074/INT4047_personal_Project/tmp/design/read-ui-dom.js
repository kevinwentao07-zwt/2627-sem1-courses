(root) => {
  const origin = root.getBoundingClientRect();
  const box = r => ({x:r.left-origin.left,y:r.top-origin.top,w:r.width,h:r.height});
  const walk = (el) => {
    const s=getComputedStyle(el),r=el.getBoundingClientRect();
    if(s.display==='none'||s.visibility==='hidden'||!r.width||!r.height)return null;
    const out={tag:el.tagName,name:el.getAttribute('aria-label')||el.id||el.className?.baseVal||el.className||el.tagName,...box(r),
      bg:s.backgroundColor,color:s.color,opacity:s.opacity,radius:parseFloat(s.borderTopLeftRadius)||0,
      border:s.borderTopColor,borderWidth:parseFloat(s.borderTopWidth)||0,
      borderBottom:s.borderBottomColor,borderBottomWidth:parseFloat(s.borderBottomWidth)||0,
      overflow:s.overflow,weight:s.fontWeight,size:parseFloat(s.fontSize),family:s.fontFamily,letterSpacing:s.letterSpacing,children:[]};
    if(el.tagName.toLowerCase()==='svg'){
      out.svg=el.outerHTML.replace(/currentColor/g,s.color);return out;
    }
    if(['INPUT','TEXTAREA','SELECT'].includes(el.tagName)){
      out.value=el.tagName==='SELECT'?el.selectedOptions[0]?.textContent:el.value||el.placeholder;
      out.paddingLeft=parseFloat(s.paddingLeft)||0;
      out.paddingTop=parseFloat(s.paddingTop)||0;
      return out;
    }
    for(const child of el.childNodes){
      if(child.nodeType===1){const item=walk(child);if(item)out.children.push(item);}
      else if(child.nodeType===3&&child.textContent.trim()){
        const value=child.textContent,lines=[];
        for(let i=0;i<value.length;i++){
          const range=document.createRange();range.setStart(child,i);range.setEnd(child,i+1);
          const cr=range.getBoundingClientRect();if(!cr.width&&!cr.height)continue;
          const last=lines[lines.length-1];
          if(last&&Math.abs(last.y-(cr.top-origin.top))<1){last.text+=value[i];last.w=cr.right-origin.left-last.x;}
          else lines.push({text:value[i],...box(cr)});
        }
        out.children.push({tag:'TEXT',name:value.trim().slice(0,70),lines,color:s.color,size:parseFloat(s.fontSize),weight:s.fontWeight,family:s.fontFamily,letterSpacing:s.letterSpacing});
      }
    }
    return out;
  };
  return {width:origin.width,height:origin.height,tree:walk(root)};
}
