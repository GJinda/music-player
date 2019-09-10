function $(selector) {
  return document.querySelector(selector);
}

function addClass(ele, className) {
  ele.classList.add(className);
}

function removeClass(ele, className) {
  ele.classList.remove(className);
}

const logo = $(".iconmusic");
const prevBtn = $(".iconprevious");
const playBtn = $(".icontimeout");
const nextBtn = $(".iconnextsong");
const modeBtn = $(".iconloop");
const music = $("audio");

var index = 1;
var timePtr = 0;
var mode = "loop";

prevBtn.addEventListener("click", function () {
  playPrev();
});

playBtn.addEventListener("click", function () {
  playPause();
});

nextBtn.addEventListener("click", function () {
  playNext();
});

modeBtn.addEventListener("click", function () {
  if (mode == "loop") {
    mode = "single";
    removeClass(modeBtn, "iconloop");
    addClass(modeBtn, "iconsinglecycle");
  } else if (mode == "single") {
    mode = "random";
    removeClass(modeBtn, "iconsinglecycle");
    addClass(modeBtn, "iconrandom");
  } else {
    mode = "loop";
    removeClass(modeBtn, "iconrandom");
    addClass(modeBtn, "iconloop");
  }
});

function playPause() {
  if (music.paused) {
    play();
  } else {
    pause();
  }
}

function play() {
  music.loop = mode == "single" ? true : false;
  music.src = "music/" + index + ".mp3";
  music.currentTime = timePtr;
  music.play();
  removeClass(playBtn, "icontimeout");
  addClass(playBtn, "iconplay");
  addClass(logo, "circleAnime");
  music.addEventListener("ended", function(){
    playNext();
  });
}

function pause() {
  timePtr = music.currentTime;
  music.pause();
  addClass(playBtn, "icontimeout");
  removeClass(playBtn, "iconplay");
  removeClass(logo, "circleAnime");
}

function playNext() {
  if (mode == "random") {
    index = rand();
  } else {
    index = index >= 10 ? 1 : (index + 1);
  }
  timePtr = 0;
  play();
}

function playPrev() {
  if (mode == "random") {
    index = rand();
  } else {
    index = index <= 1 ? 10 : (index - 1);
  }
  timePtr = 0;
  play();
}

function rand() {
  return Math.ceil(Math.random() * 10);
}