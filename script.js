const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

window.addEventListener("load",()=>{
  setTimeout(()=>{
    $("#loader").classList.add("hide");
    const music=$("#music"),musicBtn=$("#musicBtn");
    music.muted=false;
    if(!music.paused){
      musicBtn.classList.add("playing");
    }else{
      music.play().then(()=>{
        musicBtn.classList.add("playing");
      }).catch(()=>{
        const startMusic=()=>{
          music.play().then(()=>{
            musicBtn.classList.add("playing");
          }).catch(()=>{});
          document.removeEventListener("click",startMusic);
          document.removeEventListener("touchstart",startMusic);
          document.removeEventListener("keydown",startMusic);
        };
        document.addEventListener("click",startMusic,{once:true});
        document.addEventListener("touchstart",startMusic,{once:true});
        document.addEventListener("keydown",startMusic,{once:true});
      });
    }
  },2200);
});

const parallaxItems=$$(".parallax");
window.addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;
  parallaxItems.forEach(item=>{
    const speed=Number(item.dataset.speed||.08);
    item.style.transform=`translate(${x*20*speed}px,${y*20*speed}px)`;
  });
},{passive:true});

const topbar=$("#topbar"),sections=$$("section.section-anchor,.hero,.footer"),navLinks=$$(".nav a");
function updateNavigation(){
  topbar.classList.toggle("scrolled",scrollY>30);
  let current="home";
  sections.forEach(section=>{
    const top=section.getBoundingClientRect().top;
    if(top<=innerHeight*.38)current=section.id||current;
  });
  navLinks.forEach(link=>{
    const target=link.getAttribute("href").slice(1);
    link.classList.toggle("active",target===current);
  });
}
window.addEventListener("scroll",updateNavigation,{passive:true});updateNavigation();

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}
  });
},{threshold:.12});
$$(".reveal").forEach(el=>revealObserver.observe(el));

/* Countdown ke hari ulang tahun: 12 Agustus 2026, 00:00 (tengah malam) */
const targetDate=new Date("2026-08-12T00:00:00").getTime();
function updateCounter(){
  const now=Date.now();
  const diff=targetDate-now;
  if(diff<=0){
    $("#days").textContent="0";
    $("#hours").textContent="00";
    $("#minutes").textContent="00";
    $("#seconds").textContent="00";
    const counterSection=$("#counter");
    if(counterSection&&!counterSection.classList.contains("done")){
      counterSection.classList.add("done");
      const headingP=counterSection.querySelector(".section-heading p");
      if(headingP)headingP.textContent="Selamat ulang tahun! 🎉 Hari spesialmu telah tiba!";
      const counterGrid=counterSection.querySelector(".counter-grid");
      if(counterGrid)counterGrid.classList.add("celebrate");
    }
    return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  $("#days").textContent=d;
  $("#hours").textContent=String(h).padStart(2,"0");
  $("#minutes").textContent=String(m).padStart(2,"0");
  $("#seconds").textContent=String(s).padStart(2,"0");
}
updateCounter();setInterval(updateCounter,1000);

const music=$("#music"),musicBtn=$("#musicBtn");
musicBtn.addEventListener("click",async()=>{
  try{
    if(music.paused){await music.play();musicBtn.classList.add("playing");}
    else{music.pause();musicBtn.classList.remove("playing");}
  }catch{alert("Klik sekali lagi untuk memutar musik 🤍");}
});

const letterMessage=`
Aku mungkin nggak selalu pandai bilang langsung,
tapi aku senang punya kamu di hidupku.

Senang bisa ngobrol sama kamu,
senang bisa berbagi hal-hal kecil,
bahkan senang untuk hal-hal sederhana apapun itu.

Aku nggak tahu nanti kita akan melewati berapa banyak cerita lagi.
Tapi untuk sekarang, aku cuma ingin menikmati setiap momennya bersamamu.

Semoga di umur yang baru ini,
kamu punya lebih banyak alasan untuk tersenyum,
lebih banyak hal yang bisa kamu banggakan,
dan lebih banyak hari yang terasa ringan.

Happy birthday, Citra Sindy Pangestu ❤️

my wish,
Semoga kamu selalu jadi kamu.

— Tirta S
`;
const letterModal=$("#letterModal"),typing=$("#typing");
let typingStarted=false;
function openLetter(){
  letterModal.classList.add("show");letterModal.setAttribute("aria-hidden","false");
  if(typingStarted)return;
  typingStarted=true;let index=0;typing.textContent="";
  const card=letterModal.querySelector(".letter-modal-card");
  const type=()=>{
    if(index>=letterMessage.length)return;
    const ch=letterMessage[index++];
    typing.textContent+=ch;
    /* Auto-scroll: scroll modal card mengikuti teks yang muncul */
    card.scrollTop=card.scrollHeight;
    /* Kecepatan variabel: spasi & newline lebih cepat, huruf lebih lambat (seperti nulis tangan) */
    let delay=45+Math.random()*35;
    if(ch===" ")delay=20;
    else if(ch==="\n")delay=120;
    else if(ch==="," )delay=80;
    else if(ch===".")delay=150;
    else if(ch==="❤")delay=200;
    setTimeout(type,delay);
  };
  setTimeout(type,400);
}
function closeLetter(){letterModal.classList.remove("show");letterModal.setAttribute("aria-hidden","true")}
$("#envelope").addEventListener("click",openLetter);$("#modalClose").addEventListener("click",closeLetter);
letterModal.addEventListener("click",e=>{if(e.target===letterModal)closeLetter()});

const lightbox=$("#lightbox"),lightboxImg=$("#lightboxImg");
$$(".gallery-item").forEach(item=>{
  item.addEventListener("click",()=>{
    lightboxImg.src=item.dataset.full;
    lightbox.classList.add("show");
  });
});
$("#lightboxClose").addEventListener("click",()=>lightbox.classList.remove("show"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});

const giftBox=$("#giftBox"),giftWrap=$(".gift-wrap"),giftModal=$("#giftModal"),giftModalClose=$("#giftModalClose");
function openGift(){
  if(giftBox.classList.contains("open"))return;
  giftBox.classList.add("open");
  giftWrap.classList.add("open");
  burst(["🎉","❤️","🌸","🦫","🌼"]);
  /* Buka modal popup setelah animasi kado terbuka + capybara muncul */
  setTimeout(()=>{
    giftModal.classList.add("show");
    giftModal.setAttribute("aria-hidden","false");
  },800);
}
function closeGift(){
  giftModal.classList.remove("show");
  giftModal.setAttribute("aria-hidden","true");
  /* Reset kado setelah modal tertutup */
  setTimeout(()=>{
    giftBox.classList.remove("open");
    giftWrap.classList.remove("open");
  },300);
}
giftBox.addEventListener("click",openGift);
giftModalClose.addEventListener("click",closeGift);
giftModal.addEventListener("click",e=>{if(e.target===giftModal)closeGift()});

document.addEventListener("click",e=>{
  if(e.target.closest("button,a,input"))return;
  const heart=document.createElement("span");
  heart.textContent=Math.random()>.5?"♡":"♥";
  Object.assign(heart.style,{
    position:"fixed",left:`${e.clientX}px`,top:`${e.clientY}px`,zIndex:9998,
    color:"#ef8ba3",fontSize:`${15+Math.random()*12}px`,pointerEvents:"none",
    animation:"clickHeart 1.4s ease forwards"
  });
  document.body.appendChild(heart);setTimeout(()=>heart.remove(),1400);
});

function burst(symbols){
  const centerX=innerWidth/2,centerY=innerHeight/2;
  for(let i=0;i<14;i++){
    const item=document.createElement("span"),angle=Math.random()*Math.PI*2,distance=80+Math.random()*300;
    item.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    Object.assign(item.style,{
      position:"fixed",left:`${centerX}px`,top:`${centerY}px`,zIndex:9999,pointerEvents:"none",
      fontSize:`${14+Math.random()*18}px`,animation:"burst 1.3s cubic-bezier(.2,.8,.2,1) forwards",
      "--x":`${Math.cos(angle)*distance}px`,"--y":`${Math.sin(angle)*distance}px`
    });
    document.body.appendChild(item);setTimeout(()=>item.remove(),1400);
  }
}

const style=document.createElement("style");
style.textContent=`
@keyframes burst{from{transform:translate(-50%,-50%) scale(.4);opacity:1}to{transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(1);opacity:0}}
@keyframes clickHeart{to{transform:translateY(-90px) scale(1.3);opacity:0}}
`;
document.head.appendChild(style);

document.addEventListener("keydown",e=>{
  if(e.key!=="Escape")return;
  closeLetter();closeGift();lightbox.classList.remove("show");
});
