const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index = 0;

function showSlide(i) {
  if(i < 0) index = slide.length - 1;
  else if(i >= slide.length) index = 0;
  else index = i;

  slides.style.transform = `translateX(${-index * 100}%)`;
  
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));

function currentSlide(i) {
  showSlide(i);
}

setInterval(() => showSlide(index + 1), 4000);

showSlide(index);
// btnscroll
let btnscroll=document.getElementById("btnscroll");
window.onscroll =function(){
    if(scrollY>= 400){
        btnscroll.style.display="block";
    }else{
        btnscroll.style.display="none";

    }
}
btnscroll.onclick =function(){
    scroll({
        top:0,
        left:0,
        behavior:"smooth",
    })
}