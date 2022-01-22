// https://www.udemy.com/course/50-projects-50-days/

const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;

// let int = setInterval(blurring, 30);

// function blurring() {
//   load++

//   if (load > 99) {
//     clearInterval(int);
//     loadText.style.display = "none";
//     bg.style.display = "none";
//     document.body.style.overflow = "visible";
//   }

//   console.log((1 - load/100).toFixed(2));

//   loadText.innerText = `${load}%`;
//   loadText.style.opacity = (1 - load/100);
//   bg.style.filter = `blur(${Math.round(load/3)}px)`;
// }


// delete these and uncomment above before final submit
loadText.style.display = "none";
bg.style.display = "none";
document.body.style.overflow = "visible";