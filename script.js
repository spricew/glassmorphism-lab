(function(){
'use strict';
var $ = function(s,r){return (r||document).querySelector(s)};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var SUPPORTS_SQ = !!(window.CSS && CSS.supports && CSS.supports('corner-shape','squircle'));
var REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- fondos (SVG en data URI, con bordes nítidos para que el blur se note) ---------- */
function mosaicSVG(){
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">'+
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset=".55" stop-color="#7b2ff7"/><stop offset="1" stop-color="#f107a3"/></linearGradient>'+
  '<pattern id="st" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="32" height="64" fill="#fff"/><rect x="32" width="32" height="64" fill="#0b0b10"/></pattern>'+
  '<pattern id="dt" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="7" fill="#fff"/></pattern></defs>'+
  '<rect width="1600" height="900" fill="url(#g)"/>'+
  '<circle cx="260" cy="250" r="200" fill="#ff9f0a"/><circle cx="830" cy="560" r="270" fill="#ff375f"/>'+
  '<circle cx="1330" cy="240" r="180" fill="#30d158"/><circle cx="1180" cy="720" r="140" fill="#64d2ff"/>'+
  '<circle cx="520" cy="760" r="110" fill="#ffd60a"/>'+
  '<rect x="-60" y="370" width="1720" height="150" fill="url(#st)" transform="rotate(-8 800 445)"/>'+
  '<rect x="900" y="60" width="380" height="220" fill="url(#dt)"/>'+
  '<rect x="80" y="610" width="260" height="190" rx="30" fill="#0a84ff"/>'+
  '<g fill="none" stroke="#fff" stroke-width="5"><circle cx="830" cy="560" r="335"/><circle cx="260" cy="250" r="250"/></g>'+
  '<path d="M0 880 L1600 836" stroke="#fff" stroke-width="7"/>'+
  '<text x="110" y="150" font-size="130" font-weight="800" fill="#fff" font-family="Helvetica, Arial, sans-serif">Aa Gg 42</text>'+
  '<text x="1000" y="860" font-size="84" font-weight="700" fill="#0b0b10" font-family="Helvetica, Arial, sans-serif">Frosted</text>'+
  '</svg>';
}
function sunsetSVG(){
  var s=7, rnd=function(){s=(s*16807)%2147483647;return s/2147483647}, stars='', i, trees='';
  for(i=0;i<90;i++){stars+='<circle cx="'+(rnd()*1600|0)+'" cy="'+(rnd()*330|0)+'" r="'+(1+rnd()*2.4).toFixed(1)+'" fill="#fff" fill-opacity="'+(.5+rnd()*.5).toFixed(2)+'"/>'}
  for(i=0;i<34;i++){var x=i*50-10, h=90+((i*37)%5)*18; trees+='<polygon points="'+x+',900 '+(x+25)+','+(900-h)+' '+(x+50)+',900"/>'}
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">'+
  '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123f"/><stop offset=".3" stop-color="#4b2a85"/><stop offset=".55" stop-color="#d4418e"/><stop offset=".75" stop-color="#ff8a4c"/><stop offset="1" stop-color="#ffd27a"/></linearGradient></defs>'+
  '<rect width="1600" height="900" fill="url(#sky)"/>'+stars+
  '<circle cx="1050" cy="560" r="230" fill="#ffd27a" fill-opacity=".35"/><circle cx="1050" cy="560" r="135" fill="#fff3c4"/>'+
  '<polygon fill="#6a2f8e" points="0,640 120,510 230,590 360,440 480,580 600,480 740,620 880,490 1000,610 1130,460 1260,590 1380,500 1500,600 1600,530 1600,760 0,760"/>'+
  '<polygon fill="#3d1d62" points="0,720 160,610 300,680 460,580 620,700 800,620 960,710 1120,620 1300,720 1460,640 1600,710 1600,800 0,800"/>'+
  '<polygon fill="#1f1040" points="0,840 200,760 420,820 640,750 880,830 1120,760 1360,830 1600,770 1600,900 0,900"/>'+
  '<g fill="#0c0620">'+trees+'</g>'+
  '<g fill="#fff" fill-opacity=".9"><path d="M300 150 l14 -8 l14 8 l-14 -3z"/><path d="M380 190 l11 -6 l11 6 l-11 -2z"/><path d="M450 130 l9 -5 l9 5 l-9 -2z"/></g>'+
  '</svg>';
}
function feedSVG(){
  var ff='font-family="Helvetica, Arial, sans-serif"', out='', i;
  var rows=[['Mensajes','Ana: ¿nos vemos a las 6?','#34c759'],['Recordatorios','Comprar boletos de tren','#ff9500'],['Fotos','124 nuevas de Oaxaca','#ff2d55'],['Notas','Ideas para el viaje','#ffcc00'],['Mapas','Ruta a Coyoacán · 24 min','#0a84ff']];
  var cards=[['Oaxaca','3 días · 124 fotos',0],['Coyoacán','Sábado · 6 p. m.',1],['Tren Maya','Salida 07:40',2]];
  var defs='<linearGradient id="c0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff512f"/><stop offset="1" stop-color="#f09819"/></linearGradient>'+
           '<linearGradient id="c1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0575e6"/><stop offset="1" stop-color="#00f260"/></linearGradient>'+
           '<linearGradient id="c2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8e2de2"/><stop offset="1" stop-color="#ff6a9a"/></linearGradient>';
  var tiles=['#ff9a9e','#a18cd1','#84fab0','#fccb90','#8fd3f4','#f6d365'];
  for(i=0;i<6;i++){defs+='<linearGradient id="t'+i+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+tiles[i]+'"/><stop offset="1" stop-color="'+tiles[(i+2)%6]+'"/></linearGradient>'}
  out+='<rect width="1600" height="900" fill="#f2f2f7"/>';
  out+='<text x="60" y="130" font-size="112" font-weight="800" fill="#111" '+ff+'>Hoy</text>';
  out+='<text x="64" y="186" font-size="34" fill="#8e8e93" '+ff+'>jueves 8 de octubre</text>';
  cards.forEach(function(c,k){var x=60+k*500;
    out+='<rect x="'+x+'" y="226" width="470" height="270" rx="40" fill="url(#c'+c[2]+')"/>';
    out+='<text x="'+(x+36)+'" y="310" font-size="48" font-weight="700" fill="#fff" '+ff+'>'+c[0]+'</text>';
    out+='<text x="'+(x+36)+'" y="356" font-size="28" fill="#fff" fill-opacity=".85" '+ff+'>'+c[1]+'</text>';
    out+='<rect x="'+(x+36)+'" y="420" width="150" height="14" rx="7" fill="#fff" fill-opacity=".55"/>';
    out+='<rect x="'+(x+36)+'" y="450" width="230" height="14" rx="7" fill="#fff" fill-opacity=".35"/>';
  });
  rows.forEach(function(r,k){var y=540+k*66;
    out+='<circle cx="94" cy="'+(y+30)+'" r="24" fill="'+r[2]+'"/>';
    out+='<text x="140" y="'+(y+26)+'" font-size="29" font-weight="600" fill="#111" '+ff+'>'+r[0]+'</text>';
    out+='<text x="140" y="'+(y+56)+'" font-size="23" fill="#6b6b70" '+ff+'>'+r[1]+'</text>';
    out+='<rect x="140" y="'+(y+64)+'" width="660" height="1.5" fill="#d1d1d6"/>';
  });
  for(i=0;i<6;i++){var gx=870+(i%3)*226, gy=540+Math.floor(i/3)*170;
    out+='<rect x="'+gx+'" y="'+gy+'" width="210" height="154" rx="22" fill="url(#t'+i+')"/>';
    out+='<circle cx="'+(gx+150)+'" cy="'+(gy+50)+'" r="22" fill="#fff" fill-opacity=".8"/>';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs>'+defs+'</defs>'+out+'</svg>';
}
var BGS = {mosaic:mosaicSVG, sunset:sunsetSVG, feed:feedSVG};
var bgCache = {};
function bgUrl(k){ if(!bgCache[k]) bgCache[k]='url("data:image/svg+xml;utf8,'+encodeURIComponent(BGS[k]())+'")'; return bgCache[k]; }

/* grano: ruido gris generado una vez en un canvas */
(function(){
  try{
    var c=document.createElement('canvas'); c.width=c.height=128;
    var x=c.getContext('2d'), d=x.createImageData(128,128), i, v;
    /* grano neutro sin mix-blend-mode: puntos blancos o negros con alfa aleatorio, promedio ~0 */
    for(i=0;i<d.data.length;i+=4){v=Math.random()*255; d.data[i]=d.data[i+1]=d.data[i+2]=v>127.5?255:0; d.data[i+3]=Math.abs(v-127.5)*2}
    x.putImageData(d,0,0);
    document.documentElement.style.setProperty('--noise-img','url('+c.toDataURL()+')');
  }catch(e){}
})();

/* ---------- estado ---------- */
var MATERIALS = {
  ultraThin :{blur:14,tint:18,sat:180},
  thin      :{blur:18,tint:36,sat:180},
  regular   :{blur:24,tint:56,sat:180},
  thick     :{blur:30,tint:72,sat:180},
  ultraThick:{blur:38,tint:86,sat:180}
};
var state = {
  mode:'light', material:'regular', view:'full', bg:'mosaic', animate:!REDUCE, bar:true, hold:false, radius:28,
  layers:{
    blur:{on:true,v:24}, sat:{on:true,v:180}, tint:{on:true,v:56}, noise:{on:true,v:14},
    hair:{on:true}, hl:{on:true}, shadow:{on:true}, sq:{on:true}, vib:{on:true}
  }
};
var UI = {
  gFill:[
    {k:'blur', name:'Desenfoque', unit:' px', min:0, max:60, step:1, hint:'Gaussiano sobre lo que hay detrás.'},
    {k:'sat', name:'Saturación', unit:' %', min:100, max:260, step:5, hint:'Devuelve el color que el blur apaga.'},
    {k:'tint', name:'Tinte', unit:' %', min:0, max:95, step:1, hint:'Capa clara u oscura que fija el contraste.'},
    {k:'noise', name:'Grano', unit:'', min:0, max:100, step:1, hint:'Ruido fino contra el banding.'}
  ],
  gFinish:[
    {k:'hair', name:'Hairline de 0,5 px', hint:'Canto casi invisible que separa el panel del fondo.'},
    {k:'hl', name:'Brillo interior', hint:'Luz en el borde superior que sugiere grosor.'},
    {k:'shadow', name:'Sombra en capas', hint:'Una difusa y una cercana, ambas de baja opacidad.'}
  ],
  gShape:[
    {k:'sq', name:'Esquinas continuas', hint:'La curva se funde con el lado recto, sin arco circular.', radius:true}
  ],
  gText:[
    {k:'vib', name:'Vibrancy', hint:'Las etiquetas se mezclan con el fondo en lugar de ser gris plano.'}
  ]
};

function layerRow(L){
  var h='<div class="layer" data-k="'+L.k+'" data-on="true"><div class="lh">'+
    '<label class="sw"><input type="checkbox" role="switch" data-on="'+L.k+'" id="on-'+L.k+'" checked><span class="trk" aria-hidden="true"></span><span class="nm">'+L.name+'</span></label>'+
    (L.min!==undefined?'<output class="val" id="val-'+L.k+'"></output>':'')+'</div>';
  if(L.min!==undefined) h+='<input type="range" id="rg-'+L.k+'" data-rg="'+L.k+'" min="'+L.min+'" max="'+L.max+'" step="'+L.step+'" aria-label="'+L.name+'">';
  if(L.radius) h+='<div class="lh" style="margin-top:2px"><span class="nm" style="font-size:13px;font-weight:500">Radio de esquina</span><output class="val" id="val-radius"></output></div><input type="range" id="rg-radius" min="0" max="48" step="1" aria-label="Radio de esquina">';
  h+='<p class="hint">'+L.hint+(L.k==='sq'&&!SUPPORTS_SQ?' Tu navegador no soporta <code>corner-shape</code>, así que aquí se ve con arco circular.':'')+'</p></div>';
  return h;
}
Object.keys(UI).forEach(function(g){ $('#'+g).insertAdjacentHTML('beforeend', UI[g].map(layerRow).join('')); });
if(!SUPPORTS_SQ){ $('#on-sq').disabled=true; }

/* ---------- contenido de los paneles ---------- */
var GLYPH='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>';
function panelHTML(title,sub,rows,foot){
  return '<div class="gc-head l1">'+GLYPH+'<div><div class="gc-title l1">'+title+'</div><div class="gc-sub l2">'+sub+'</div></div></div>'+
    '<div class="gc-rows">'+rows.map(function(r){return '<div class="gc-row"><span class="l1">'+r[0]+'</span><span class="l2">'+r[1]+'</span></div>'}).join('')+'</div>'+
    (foot?'<div class="gc-foot l3">'+foot+'</div>':'');
}
function shell(inner){ return '<div class="gl-surface"></div><div class="gl-content">'+inner+'</div>'; }
var TAB='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
$('#bar').innerHTML = shell(
  '<div class="tab on">'+TAB+'<rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4 4 3 3-2 4 3"/></svg><span>Fotos</span></div>'+
  '<div class="tab">'+TAB+'<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M7 4.5h10"/></svg><span>Álbumes</span></div>'+
  '<div class="tab">'+TAB+'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/></svg><span>Buscar</span></div>'+
  '<div class="tab">'+TAB+'<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/></svg><span>Ajustes</span></div>');
$('#panel').innerHTML = shell('');

/* ---------- parámetros efectivos y estilos ---------- */
function eff(){
  var L=state.layers;
  if(state.view==='naive'||state.hold){
    return {blur:L.blur.v, sat:100, tint:0, noise:0, hair:false, hl:false, shadow:false, sq:false, vib:false, radius:state.radius};
  }
  return {blur:L.blur.on?L.blur.v:0, sat:L.sat.on?L.sat.v:100, tint:L.tint.on?L.tint.v:0, noise:L.noise.on?L.noise.v:0,
          hair:L.hair.on, hl:L.hl.on, shadow:L.shadow.on, sq:L.sq.on&&SUPPORTS_SQ, vib:L.vib.on, radius:state.radius};
}
function colors(dark){
  return {
    tint: dark?'28, 28, 30':'247, 247, 247',
    hair: dark?'rgba(255, 255, 255, 0.16)':'rgba(0, 0, 0, 0.14)',
    hl:   dark?'rgba(255, 255, 255, 0.16)':'rgba(255, 255, 255, 0.75)',
    hl2:  dark?'rgba(255, 255, 255, 0.04)':'rgba(255, 255, 255, 0.25)'
  };
}
function shadowParts(p,dark){
  var c=colors(dark), a=[];
  if(p.hair) a.push('inset 0 0 0 0.5px '+c.hair);
  if(p.hl) a.push('inset 0 1px 0 '+c.hl, 'inset 0 0 0 1px '+c.hl2);
  if(p.shadow) a.push('0 10px 40px rgba(0, 0, 0, 0.20)','0 2px 8px rgba(0, 0, 0, 0.10)');
  return a;
}
function styleGL(el,p,dark,bar){
  var s=el.style, c=colors(dark), parts;
  s.setProperty('--blur',p.blur+'px');
  s.setProperty('--sat',p.sat+'%');
  s.setProperty('--tint','rgba('+c.tint+', '+(p.tint/100).toFixed(3)+')');
  s.setProperty('--noise',(p.noise/100*0.35).toFixed(3));
  s.setProperty('--radius',(bar?0:p.radius)+'px');
  if(bar){ parts=p.hair?['inset 0 0.5px 0 '+c.hair]:[]; } else { parts=shadowParts(p,dark); }
  s.setProperty('--sh',parts.length?parts.join(', '):'none');
  el.classList.toggle('dark',dark);
  el.classList.toggle('sq',!!p.sq&&!bar);
  el.classList.toggle('vib',!!p.vib);
}

/* ---------- construcción paso a paso ---------- */
var BASE={blur:24,sat:100,tint:0,noise:0,hair:false,hl:false,shadow:false,sq:false,vib:false,radius:22};
function step(o){var r={},k;for(k in BASE)r[k]=BASE[k];for(k in o)r[k]=o[k];return r}
var STEPS=[
  {t:'Original', d:'Sin material. El texto compite con el fondo y casi no se lee.', p:step({blur:0})},
  {t:'Desenfoque', d:'Gaussiano de 24 px. Quita el detalle, pero el resultado queda gris y lavado.', p:step({})},
  {t:'Saturación 180 %', d:'El blur mezcla colores vecinos y los desatura. Subir la saturación devuelve la vida.', p:step({sat:180})},
  {t:'Tinte', d:'Una capa clara (u oscura) fija el contraste base y hace legible el texto.', p:step({sat:180,tint:56})},
  {t:'Grano', d:'Ruido fino que rompe el banding de los degradados difuminados.', p:step({sat:180,tint:56,noise:14})},
  {t:'Borde y brillo', d:'Hairline de 0,5 px y una línea de luz en el canto superior.', p:step({sat:180,tint:56,noise:14,hair:true,hl:true})},
  {t:'Sombra y esquinas', d:'Sombra en dos capas y esquinas continuas en lugar de arco circular.', p:step({sat:180,tint:56,noise:14,hair:true,hl:true,shadow:true,sq:SUPPORTS_SQ})},
  {t:'Vibrancy', d:'El texto se mezcla con el fondo (multiply en claro, plus-lighter en oscuro) y toma su color.', p:step({sat:180,tint:56,noise:14,hair:true,hl:true,shadow:true,sq:SUPPORTS_SQ,vib:true})}
];
var stepsEl=$('#steps');
stepsEl.innerHTML=STEPS.map(function(s,i){
  return '<article class="step"><div class="mini" data-i="'+i+'"><div class="gl">'+shell(panelHTML('Panel','iOS 7 → 18',[['Desenfoque','24 px'],['Saturación','180 %']],''))+'</div></div>'+
         '<div><h3><span>'+i+'</span>'+s.t+'</h3><p>'+s.d+'</p></div></article>';
}).join('');

/* ---------- código CSS ---------- */
function genCSS(p,dark){
  var c=colors(dark), L=[];
  L.push('.glass {');
  L.push('  background: rgba('+c.tint+', '+(p.tint/100).toFixed(2)+');');
  if(p.blur>0||p.sat!==100){
    var f=[]; if(p.blur>0) f.push('blur('+p.blur+'px)'); if(p.sat!==100) f.push('saturate('+p.sat+'%)');
    L.push('  -webkit-backdrop-filter: '+f.join(' ')+';');
    L.push('  backdrop-filter: '+f.join(' ')+';');
  } else L.push('  /* sin backdrop-filter */');
  L.push('  border-radius: '+p.radius+'px;');
  if(p.sq) L.push('  corner-shape: squircle; /* si no hay soporte, queda el radio */');
  var sh=shadowParts(p,dark);
  if(sh.length){ L.push('  box-shadow:'); sh.forEach(function(x,i){L.push('    '+x+(i<sh.length-1?',':';'))}); }
  L.push('}');
  if(p.noise>0){
    L.push('');
    L.push('.glass::after { /* grano */');
    L.push('  content: ""; position: absolute; inset: 0;');
    L.push('  border-radius: inherit; pointer-events: none;');
    L.push('  background: url(noise-128.png);');
        L.push('  opacity: '+(p.noise/100*0.35).toFixed(2)+';');
    L.push('}');
  }
  if(p.vib){
    L.push('');
    L.push('.glass .content { /* vibrancy: vive fuera del elemento con backdrop-filter */');
    L.push('  mix-blend-mode: '+(dark?'plus-lighter':'multiply')+';');
    L.push('  color: '+(dark?'rgba(255, 255, 255, 0.95)':'rgba(0, 0, 0, 0.92)')+';');
    L.push('}');
  }
  return L.join('\n');
}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function hilite(code){
  return esc(code).split('\n').map(function(l){
    if(/^\s*\/\*/.test(l)) return '<span class="c">'+l+'</span>';
    l=l.replace(/(\/\*.*?\*\/)/g,'<span class="c">$1</span>');
    if(/^\./.test(l)) return l.replace(/^(\.[^ {]+(?:::after)?(?: [^{]+)?)( \{)/,'<span class="s">$1</span>$2');
    return l.replace(/^(\s*)([a-z-]+)(:)/,'$1<s9pan class="k">$2</span>$3');
  }).join('\n');
}

/* ---------- render ---------- */
var MAT_NAME=function(){return state.material==='custom'?'personalizado':state.material};
function render(){
  var p=eff(), dark=state.mode==='dark', L=state.layers, naive=(state.view==='naive'||state.hold);
  document.documentElement.style.setProperty('--bgimg',bgUrl(state.bg));
  $('#bg').classList.toggle('still',!state.animate);

  var panel=$('#panel'), bar=$('#bar');
  styleGL(panel,p,dark,false);
  styleGL(bar,p,dark,true);
  bar.hidden=!state.bar;
  $('.gl-content',panel).innerHTML=panelHTML(
    naive?'Solo blur':(state.material==='custom'?'Personalizado':state.material),
    dark?'Apariencia oscura':'Apariencia clara',
    [['Desenfoque',p.blur+' px'],['Saturación',p.sat+' %'],['Tinte',Math.round(p.tint)+' %']],
    'Arrastra el panel sobre el fondo');
  $('#matName').textContent=state.material==='custom'?'personalizado':state.material;
  $('#chipState').textContent=naive?'Solo blur':'Receta completa';
  var hold=$('#hold'); hold.setAttribute('aria-pressed',state.hold?'true':'false');
  hold.textContent=state.hold?'Mostrando solo blur':'Mantén para ver solo blur';

  /* inspector */
  ['blur','sat','tint','noise'].forEach(function(k){
    var u={blur:' px',sat:' %',tint:' %',noise:''}[k];
    $('#rg-'+k).value=L[k].v; $('#val-'+k).textContent=L[k].v+u;
  });
  $('#rg-radius').value=state.radius; $('#val-radius').textContent=state.radius+' px';
  Object.keys(L).forEach(function(k){
    var cb=$('#on-'+k); cb.checked=!!L[k].on;
    var row=cb.closest('.layer'); row.dataset.on=L[k].on?'true':'false';
  });
  $('#animate').checked=state.animate; $('#showbar').checked=state.bar;
  $$('.seg').forEach(function(sg){
    var key=sg.dataset.seg;
    $$('button',sg).forEach(function(b){b.setAttribute('aria-pressed',String(state[key]===b.dataset.v))});
  });

  /* pasos */
  $$('.mini',stepsEl).forEach(function(m){
    var i=+m.dataset.i, g=$('.gl',m);
    styleGL(g,STEPS[i].p,dark,false);
  });

  /* código (de la receta real, no de la vista naive) */
  var real=naive?eff():p;
  $('#code').innerHTML=hilite(genCSS(real,dark));
}

/* ---------- eventos ---------- */
var insp=$('.inspector');
insp.addEventListener('input',function(e){
  var t=e.target, k=t.dataset.rg;
  if(k){ state.layers[k].v=+t.value; if(k==='blur'||k==='sat'||k==='tint') state.material='custom'; }
  else if(t.dataset.on){ state.layers[t.dataset.on].on=t.checked; if(['blur','sat','tint'].indexOf(t.dataset.on)>-1) state.material='custom'; }
  else if(t.id==='rg-radius'){ state.radius=+t.value; }
  render();
});
document.addEventListener('click',function(e){
  var b=e.target.closest('.seg button'); if(!b) return;
  var key=b.parentNode.dataset.seg, v=b.dataset.v;
  if(key==='material'){
    var m=MATERIALS[v]; state.material=v; state.view='full';
    state.layers.blur.v=m.blur; state.layers.sat.v=m.sat; state.layers.tint.v=m.tint;
    state.layers.blur.on=state.layers.sat.on=state.layers.tint.on=true;
  } else { state[key]=v; }
  render();
});
$('#animate').addEventListener('change',function(e){state.animate=e.target.checked;render()});
$('#showbar').addEventListener('change',function(e){state.bar=e.target.checked;render()});

var hold=$('#hold');
function setHold(v){ if(state.hold!==v){state.hold=v;render()} }
hold.addEventListener('pointerdown',function(e){hold.setPointerCapture&&hold.setPointerCapture(e.pointerId);setHold(true)});
['pointerup','pointercancel','lostpointercapture'].forEach(function(n){hold.addEventListener(n,function(){setHold(false)})});
hold.addEventListener('keydown',function(e){if(e.key===' '||e.key==='Enter'){e.preventDefault();setHold(true)}});
hold.addEventListener('keyup',function(e){if(e.key===' '||e.key==='Enter'){setHold(false)}});
hold.addEventListener('blur',function(){setHold(false)});

/* arrastre del panel (left/top, sin transform: así el vibrancy sigue mezclando con el escenario) */
var stage=$('#stage'), panel=$('#panel'), drag=null;
function clampPanel(x,y){
  var mx=Math.max(0,stage.clientWidth-panel.offsetWidth), my=Math.max(0,stage.clientHeight-panel.offsetHeight);
  return [Math.min(Math.max(0,x),mx),Math.min(Math.max(0,y),my)];
}
function movePanel(x,y){var c=clampPanel(x,y);panel.style.left=c[0]+'px';panel.style.top=c[1]+'px'}
panel.addEventListener('pointerdown',function(e){
  drag={dx:e.clientX-panel.offsetLeft,dy:e.clientY-panel.offsetTop};
  panel.setPointerCapture(e.pointerId); panel.classList.add('drag');
});
panel.addEventListener('pointermove',function(e){ if(drag) movePanel(e.clientX-drag.dx,e.clientY-drag.dy); });
['pointerup','pointercancel'].forEach(function(n){panel.addEventListener(n,function(){drag=null;panel.classList.remove('drag')})});
panel.addEventListener('keydown',function(e){
  var d={ArrowLeft:[-14,0],ArrowRight:[14,0],ArrowUp:[0,-14],ArrowDown:[0,14]}[e.key];
  if(d){e.preventDefault();movePanel(panel.offsetLeft+d[0],panel.offsetTop+d[1])}
});
window.addEventListener('resize',function(){movePanel(panel.offsetLeft,panel.offsetTop)});

/* copiar */
$('#copy').addEventListener('click',function(){
  var btn=this, txt=$('#code').textContent;
  function done(ok){btn.textContent=ok?'Copiado':'Selecciona y copia';setTimeout(function(){btn.textContent='Copiar CSS'},1600)}
  function fallback(){
    try{var r=document.createRange();r.selectNodeContents($('#code'));var s=getSelection();s.removeAllRanges();s.addRange(r);done(false)}catch(e){done(false)}
  }
  try{ navigator.clipboard.writeText(txt).then(function(){done(true)},fallback); }catch(e){ fallback(); }
});

render();
})();
