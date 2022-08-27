"use strict";

// buttons
let btnPlay = document.querySelector("#btn_play");
let btnAbout = document.querySelector("#btn_about");
let btnRules = document.querySelector("#btn_rules");
let btnNext = document.querySelector("#btn_next");
let btnAboutExit = document.querySelector(".about_exit");
let btnBack = document.querySelector(".btn_back");
let btnBackBattle = document.querySelector(".btn_back-battle");
const weaponButtons = document.querySelectorAll("[data-weapon]");
let mainExit = document.querySelector(".main__exit");
let winExit = document.querySelector(".btn_winExit");
let loseExit = document.querySelector(".btn_loseExit");
let btnExitBattle = document.querySelector("#battleExit");
let clicked = document.querySelectorAll(".clicked");
let playAgain = document.querySelectorAll(".playAgain");
let beforeBattleExit = document.querySelector(".beforeBattle_exit");

// views
let beforeBattleView = document.querySelector("#beforeBattleView");
let mainView = document.querySelector("#mainView");
let aboutView = document.querySelector("#aboutView");
let rulesView = document.querySelector("#rulesView");
let battleView = document.querySelector("#battleView");

// batlle img
const yourBattleWeapon = document.querySelector(".your_battle_weapon");
const investorBattleWeapon = document.querySelector(".investor_battle_weapon");

// winLose pages
let displayWin = document.querySelector("#winPage");
let displayLose = document.querySelector("#losePage");
// game history
const gameHistory = document.querySelector("[data-game-result]");

// remove install
const removeInstall_content = document.querySelector("[data-remove-install]");
const changeRemoveInstall_content = document.querySelector(
  ".removeInstall_item"
);
// Scores
const investorScore = document.querySelector("[data-investor-score]");
const playerScore = document.querySelector("[data-player-score]");

// test
let historyContent = document.getElementById("historyContent");
let childtest = document.getElementById("test3");
const test2 = document.querySelector(".removeInstall_item");
const test4 = document.querySelector(".false");
let removeInstallContainer = document.querySelector(".removeInstall_content");

const labelTimer = document.querySelector(".timer");
let timer;

function changeMusic() {
  let mainMusic = "assets/epic_battle_music_1-6275.mp3";
  let aboutMusic = "assets/ambients-for-rituals-05-114794.mp3";
  let rulesMusic = "assets/rulesMusic.mp3";
  let beforeBattleMusic = "assets/beforeBattle.mp3";
  let battleMusic = "assets/hybrid-action-music-01-49709.mp3";
  let winMusic = "assets/winmusic.mp3";
  let loseMusic = "assets/losemusic.mp3";

  let music = document.getElementById("music");

  if (mainView.style.display != "none") {
    music.setAttribute("src", mainMusic);
  } else if (aboutView.style.display != "none") {
    music.setAttribute("src", aboutMusic);
  } else if (rulesView.style.display != "none") {
    music.setAttribute("src", rulesMusic);
  } else if (beforeBattleView.style.display != "none") {
    music.setAttribute("src", beforeBattleMusic);
  } else if (battleView.style.display != "none") {
    music.setAttribute("src", battleMusic);
  } else if (displayWin.style.display != "none") {
    music.setAttribute("src", winMusic);
  } else if (displayLose.style.display != "none") {
    music.setAttribute("src", loseMusic);
  }
}
changeMusic();
window.addEventListener("load", function () {
  document.getElementById("mainView").style.display = "block";
});
//////////////////////////////////////////////
//////////////////////////////////////////////
// TIMER

const startGameTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      displayResults();
    }
    time--;
  };

  let time = 90;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
////////////////////////////////////////////

// Display View functions

function displayBeforeBattleView() {
  beforeBattleView.style.display = "flex";
  mainView.style.display = "none";
  aboutView.style.display = "none";
  rulesView.style.display = "none";
  battleView.style.display = "none";
  changeMusic();
}

function displayMainView() {
  beforeBattleView.style.display = "none";
  mainView.style.display = "block";
  aboutView.style.display = "none";
  rulesView.style.display = "none";
  battleView.style.display = "none";
  displayWin.style.display = "none";

  changeMusic();
  if (timer) clearInterval(timer);
}

function displayAboutView() {
  aboutView.classList.remove("section--hidden");
  mainView.classList.add("section--hidden");
  beforeBattleView.style.display = "none";
  mainView.style.display = "none";
  aboutView.style.display = "grid";
  rulesView.style.display = "none";
  battleView.style.display = "none";
  changeMusic();
}

function displayRulesView() {
  beforeBattleView.style.display = "none";
  mainView.style.display = "none";
  aboutView.style.display = "none";
  rulesView.style.display = "block";
  battleView.style.display = "none";
  changeMusic();
}

function displayBattleView() {
  //batlleView.classList.remove("section--hidden");
  beforeBattleView.style.display = "none";
  mainView.style.display = "none";
  aboutView.style.display = "none";
  rulesView.style.display = "none";
  battleView.style.display = "grid";
  displayWin.style.display = "none";
  changeMusic();
  addRemoveInstallContent();

  if (timer) clearInterval(timer);
  timer = startGameTimer();
}

// listeners
btnPlay.addEventListener("click", displayBeforeBattleView);
btnAbout.addEventListener("click", displayAboutView);
btnRules.addEventListener("click", displayRulesView);
btnNext.addEventListener("click", displayBattleView);
btnAboutExit.addEventListener("click", displayMainView);
btnBack.addEventListener("click", displayMainView);
btnBackBattle.addEventListener("click", displayBeforeBattleView);
mainExit.addEventListener("click", closeWindow);
btnExitBattle.addEventListener("click", displayMainView);
beforeBattleExit.addEventListener("click", displayMainView);

const Weapons = [
  {
    name: "rock",
    beats: "scissors",
  },
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
];
weaponButtons.forEach((weaponButton) => {
  weaponButton.addEventListener("click", (e) => {
    const weaponName = weaponButton.dataset.weapon;
    const weapon = Weapons.find((weapon) => weapon.name === weaponName);
    const investorWeaponName = randomWeapon().name;
    choseWeapon(weapon);

    yourBattleWeapon.src = `assets/${weapon.name}_battle.svg`;
    investorBattleWeapon.src = `assets/${investorWeaponName}_battle.svg`;
  });
});
let playerWinner;
let investorWinner;
function choseWeapon(weapon) {
  const investorWeapon = random2;
  playerWinner = isWinner(weapon, investorWeapon);
  investorWinner = isWinner(investorWeapon, weapon);
  function updateScore() {
    if (playerWinner) {
      increaseScore(playerScore);
      decreaseScore(investorScore);
    }
    if (investorWinner) {
      increaseScore(investorScore);
      decreaseScore(playerScore);
    }
  }
  updateScore();
  addGameResults();
}

function increaseScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
}
function decreaseScore(score) {
  score.innerText = parseInt(score.innerText) - 1;
}

function isWinner(weapon, investorWeapon) {
  return weapon.beats === investorWeapon.name;
}
let random2;
function randomWeapon() {
  let random = Math.floor(Math.random() * Weapons.length);
  random2 = Weapons[random];
  return random2;
}

let resultContent = function () {
  let gameResult;
  let number = document.getElementById("historyContent");
  let allResults = number.childElementCount + 1;
  if (playerWinner) {
    gameResult = {
      text: `${allResults}. you win`,
      img: "assets/gameResultImgWin.svg",
    };

    return gameResult;
  } else if (investorWinner) {
    gameResult = {
      text: `${allResults}. investor win`,
      img: "assets/gameResultImgLose.svg",
    };
    return gameResult;
  } else {
    gameResult = {
      text: `${allResults}. it's a draw`,
      img: "assets/gameResultImgDraw.svg",
    };
    return gameResult;
  }
};

function addGameResults() {
  const div = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", "");
  let text = document.createElement("p");
  div.classList.add("results_row");
  div.style.display = "flex";
  text.style.marginLeft = "32px";
  div.style.marginLeft = "47px";
  text.style.fontSize = "52px;";
  text.innerText = `${resultContent().text}`;
  img.src = `${resultContent().img}`;
  div.append(img, text);
  gameHistory.append(div);
}

const addRemoveInstallContent = function () {
  removeInstall_content.style.background = "rgba(84, 73, 75, 0.1";
  removeInstall_content.style.display = "grid";
  removeInstall_content.style.width = "367px";
  removeInstall_content.style.height = "574px";
  removeInstall_content.style.justifyItems = "center";
  removeInstall_content.style.alignItems = "center";
  removeInstall_content.style.justifyContent = "center";
  removeInstall_content.style.alignContent = "center";
  removeInstall_content.style.gap = "20px";
  removeInstall_content.style.gridTemplateColumns = "repeat(4,64px)";
};

function miniHydroPower() {
  this.active = "false";
  this.installRemove = function () {
    this.background = "rgb(169 7 7);";
    /*
    if (removeInstall_item.contains("active")) {
      return (this.background = "#b33951");
    } else if (removeInstall_item.contains("false")) {
      return (this.background = "rgb(169 7 7);");
    }
    this.mioniHydroPowerStatus = this.installRemove();*/
  };
}

let allMiniHydroPowers = [];
createMiniHydroPowers(24);

function createMiniHydroPowers(num) {
  for (let i = 0; i < num; i++) {
    allMiniHydroPowers.push(new miniHydroPower());
  }
}

displayMiniHydroPowers();
function displayMiniHydroPowers() {
  allMiniHydroPowers.forEach((miniHydroPower, index) => {
    let removeInstall_item = document.createElement("div");
    removeInstall_item.className =
      "removeInstall_item " + miniHydroPower.active;
    removeInstall_item.id = index;
    removeInstall_item.style.width = "67px";
    removeInstall_item.style.height = "67px";
    removeInstall_item.style.background = "hsba(349, 13%, 33%, 0.2)";
    removeInstall_item.style.zIndex = 10;
    removeInstall_item.style.display = "grid";

    removeInstallContainer.append(removeInstall_item);
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////

for (let i = 0; i <= 9; i++) {
  document.getElementById(i).className = "active";
  document.getElementById(i).style.background = "#b33951";
}

///////////////////////////////////
let allElement = document.querySelectorAll(".active");
let activeLength = allElement.length;
let lastElement = allElement[activeLength - 1];

/////////////////////////////
let allFalse = document.getElementsByClassName("false");

const changeColor = function () {
  if (playerWinner) {
    lastElement.style.background = "rgba(84, 73, 75, 0.2)";
    lastElement.classList.remove("active");
    lastElement.classList.add("removeInstall_item");
    lastElement.classList.add("false");
    allElement = document.querySelectorAll(".active");
    activeLength = allElement.length;
    lastElement = allElement[activeLength - 1];
    allFalse = document.getElementsByClassName("false");
  }
  if (investorWinner) {
    allFalse[0].style.background = "#b33951";
    allFalse[0].className = "active";
    allFalse = document.getElementsByClassName("false");
    allElement = document.querySelectorAll(".active");
    activeLength = allElement.length;
    lastElement = allElement[activeLength - 1];
  }
  checkWinner();
};

document.getElementById("weapontest").addEventListener("click", changeColor);
let win = false;
function checkScores() {
  if (playerScore.innerText > 0) {
    win = true;
  }
  if (playerScore.innerText <= 0) {
    win = false;
    return win;
  }
}

function displayResults() {
  checkScores();
  if (win === true) {
    displayWinPage();
  } else if (win === false) {
    displayLosePage();
  }
}

function checkWinner() {
  if (activeLength < 1) {
    displayWinPage();
  } else if (activeLength === 24) {
    displayLosePage();
  }
}

function displayWinPage() {
  battleView.style.display = "none";
  displayWin.classList.remove("section--hidden");
  displayWin.style.display = "flex";
  document.getElementById(
    "winText"
  ).innerHTML = `YOU DIDN'T ALLOW THE CONSTRUCTION <br> OF ${playerScore.innerText} MINI HYDROPOWER PLANTS`;
  document.body.style.background = "#63cdc7";
  changeMusic();
  confetti();
}
function displayLosePage() {
  battleView.style.display = "none";
  displayLose.classList.remove("section--hidden");
  document.body.style.background = "#B33951";
  changeMusic();
}

function closeWindow() {
  window.open("", "_self").window.close();
}

function hidePage() {
  document.body.style.background = "url(assets/background.jpg)";

  if (!displayWin.classList.contains("section--hidden"))
    displayWin.classList.add("section--hidden");

  if (!displayLose.classList.contains("section--hidden")) {
    displayLose.classList.add("section--hidden");
  }
}

const returnValue = function () {
  playerScore.innerText = 0;
  investorScore.innerText = 10;
  gameHistory.replaceChildren();
  returnRemoveInstallValue();
  clearInterval(timer);
  returnBattleWeapons();
};

const returnBattleWeapons = function () {
  let yourWeapon = document.getElementById("yw");
  yourWeapon.setAttribute("src", "assets/rock_battle.svg");
  let investorWeapon = document.getElementById("iw");
  investorWeapon.setAttribute("src", "assets/rock_battle.svg");
};

document
  .getElementById("backFromBattle")
  .addEventListener("click", returnValue);

const returnRemoveInstallValue = function () {
  removeInstall_content.replaceChildren();
  displayMiniHydroPowers();
  for (let i = 0; i <= 9; i++) {
    document.getElementById(i).className = "active";
    document.getElementById(i).style.background = "#b33951";
  }
};

winExit.addEventListener("click", () => {
  displayMainView();
});
loseExit.addEventListener("click", () => {
  displayMainView();
});

clicked.forEach((click) => click.addEventListener("click", returnValue));
playAgain.forEach((playagain) =>
  playagain.addEventListener("click", displayBattleView)
);

const showAndHideWinPage = function () {
  if (!displayWin.style.display === "none") {
    displayWin.style.display = "none";
  }
};
