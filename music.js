var playIndex = 1;
var currentTm = 0;
var playMode = "loop";

function $(selector) {
  return document.querySelector(selector);
}

const btnMusic = $("#btnMusic");
const btnPrevious = $("#btnPrevious");
const btnPlay = $("#btnPlay");
const btnNext = $("#btnNext");
const btnMode = $("#btnMode");
const music = $("#music");

btnPlay.onclick = function () {
  //music.paused
  if (music.paused == true) {
    playMusic(playIndex, currentTm);
  } else {
    pauseMusic();
  }
}

btnNext.onclick = function () {
  playNext();
}

btnPrevious.onclick = function () {
  playPrevious();
}

btnMode.onclick = function () {
  if(playMode == "loop"){
    changeMode("single");
    changeIcon(btnMode, "ico/singlecycle.png");
  } else if(playMode == "single"){
    changeMode("random");
    changeIcon(btnMode, "ico/random.png");
  } else {
    changeMode("loop");
    changeIcon(btnMode, "ico/loop.png");
  }
}
//play
function playMusic(index, time) {
  music.loop = playMode == "single" ? true : false;
  music.src = "music/" + index + ".mp3";
  //load player time while pausing
  music.currentTime = time;
  console.log(index);
  console.log(music.src);
  music.play();
  //play next song while ending
  music.addEventListener("ended",function(){
    playNext();
  });
  btnMusic.style.animation = "btnRotate 1.5s linear infinite";
  //change btn icon
  changeIcon(btnPlay, "ico/pause.png");
}
//pause
function pauseMusic() {
  //save player time while pausing
  currentTm = music.currentTime;
  music.pause();
  btnMusic.style.animation = "";
  changeIcon(btnPlay, "ico/play.png");
}
//next
function playNext(){
  if (playMode == "random") {
    playIndex = Math.floor(Math.random() * 10 + 1);
  } else {
    playIndex = playIndex >= 10 ? 1 : (playIndex + 1);
  }
  playMusic(playIndex, 0);
}
//prev
function playPrevious(){
  if (playMode == "random") {
    playIndex = Math.floor(Math.random() * 10 + 1);
  } else {
    playIndex = playIndex <= 1 ? 10 : (playIndex - 1);
  }
  playMusic(playIndex, 0);
}

function changeMode(mode) {
  playMode = mode;
}

function changeIcon(ele, url){
  ele.src = url;
}