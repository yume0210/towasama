'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const targets = document.getElementsByClassName('fade');
  const meganes = document.querySelectorAll('.megane img');
  const primgs = document.querySelectorAll('.primg');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul =document.querySelector('.songs ul');
  const slides = ul.children;
  let currentIndex = 0;
  

  // ハンバーガーメニュー
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
  });

// 楽曲イメージのアニメーション
for(let i = targets.length; i--;){
 let observer = new IntersectionObserver((entries, observer) => {
  for(let j = entries.length; j--;){
   if (entries[j].isIntersecting) {
    entries[j].target.classList.add('active');
   } else{
    entries[j].target.classList.remove('active');
   }
  }
 });
 observer.observe(targets[i]);
}

// プロモーション画像の切り替え
meganes.forEach(clickedmegane => {
  clickedmegane.addEventListener('click', e => {
    e.preventDefault();

    meganes.forEach(megane => {
      megane.classList.remove('active');
    });
    clickedmegane.classList.add('active');

    primgs.forEach(primg => {
      primg.classList.remove('active');
    });
    document.getElementById(clickedmegane.dataset.id).classList.add('active');
  });
});

// カルーセル
function updateButtons() {
  prev.classList.remove('hidden');
  next.classList.remove('hidden');

  if(currentIndex === 0){
    prev.classList.add('hidden');
  }
  if(currentIndex === slides.length - 1){
    next.classList.add('hidden');
  }
}

function moveSlides() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
}

updateButtons();

next.addEventListener('click', () => {
  currentIndex++;
  updateButtons();
  moveSlides();
});

prev.addEventListener('click', () => {
  currentIndex--;
  updateButtons();
  moveSlides();
});

}
