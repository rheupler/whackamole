const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
let moles = document.querySelectorAll('.mole2');
let lastHole;
let timeUp = false;

// $('.mole').css({
//     "background": `url('img/jenmatt1.png') no-repeat`,
//     "background-position": "center bottom",
//     "background-size": "150%",
//     "position": "absolute",
//     "top": "100%",
//     "width": "100%",
//     "height": "100%",
//     "transition": "all 0.4s"
//   });


function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  // let background = document.querySelector('.mole');
  // background.style.background = 'url("img/jenmatt1.png")'
  // background.style.backgroundPosition = "bottom"
  // background.style.backgroundRepeat = "no-repeat"

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time)
}

function startGame() {
  const counter = 10;
  const timer = document.querySelector('.timer')
  let timeleft = 10;
  let gameTimer = setInterval(function(){
    timer.innerHTML = 1 + --timeleft;
    if(timeleft <= -1)
      clearInterval(gameTimer);
  }, 1000);

  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  setTimeout(() => peep(), 1000);
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
  if(!e.isTrusted) {
    return alert('Cheaters cheaters are no fun. Cheaters cheaters hurt someone.')
  }
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
