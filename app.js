let gameSeq = [];
let userSeq = [];
let lvls = [];
let btns = ["one", "two", "three", "four"];
let started = false;
let level = 0;

let body = document.querySelector("body");
let h3 = document.querySelector("h3");
//part1
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

//part2
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randidx = Math.floor(Math.random() * 3);
  let randcolor = btns[randidx];
  let randbtn = document.querySelector(`.${randcolor}`);
  gameSeq.push(randcolor);
  console.log(gameSeq);
  gameFlash(randbtn);
}

//part3
function highScore(lvls) {
  let max = 0;
  for (let i = 0; i < lvls.length; i++) {
    if (lvls[i] > max) {
      max = lvls[i];
    }
  }
  return max;
}
function check(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  } else {
    lvls.push(level - 1);
    let high = highScore(lvls);
    console.log(lvls);
    h3.innerHTML = `Game over! Your Score: <b>${
      level - 1
    }</b>.<br>Highest score:${high}.<br> Press any key to continue`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
function btnPress() {
  let btn = this;
  userFlash(btn);
  usercolor = btn.getAttribute("id");
  userSeq.push(usercolor);
  console.log(userSeq);

  check(userSeq.length - 1);
}
let btnsall = document.querySelectorAll(".btn");
for (btn of btnsall) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
