// palavras padrão
const wordsBase = [
  { word: "banana", tip: "Fruta" },
  { word: "mamao", tip: "Fruta" },
  { word: "pera", tip: "Fruta" },
  { word: "pessego", tip: "Fruta" },
  { word: "laranja", tip: "Fruta" },
  { word: "abacaxi", tip: "Fruta" },
  { word: "cachorro", tip: "Animal" },
  { word: "gato", tip: "Animal" },
  { word: "macaco", tip: "Animal" },
  { word: "galinha", tip: "Animal" },
  { word: "hipopotamo", tip: "Animal" },
  { word: "ornitorrinco", tip: "Animal" },
  { word: "rosa", tip: "Cor" },
  { word: "amarelo", tip: "Cor" },
  { word: "preto", tip: "Cor" },
  { word: "vermelho", tip: "Cor" },
  { word: "verde", tip: "Cor" },
  { word: "azul", tip: "Cor" },
  { word: "psicologo", tip: "Profissão" },
  { word: "designer", tip: "Profissão" },
  { word: "programador", tip: "Profissão" },
  { word: "arquiteto", tip: "Profissão" },
  { word: "cozinheiro", tip: "Profissão" },
  { word: "vendedor", tip: "Profissão" },
  { word: "chuveiro", tip: "Objeto" },
  { word: "sino", tip: "Objeto" },
  { word: "armario", tip: "Objeto" },
  { word: "geladeira", tip: "Objeto" },
  { word: "paralelepípedo", tip: "Objeto" },
  { word: "futebol", tip: "Esporte" },
  { word: "basquete", tip: "Esporte" },
  { word: "peteca", tip: "Esporte" },
];

// variaveis do HTML
const startPage = document.querySelector(".start");
const addWordPage = document.querySelector(".word-add");
const forcaPage = document.querySelector(".forca");
const buttonStart = document.getElementById("button-start-game");
const buttonAddWordPage = document.getElementById("button-add-word-page");
const buttonAddWord = document.getElementById("button-add-word");
const buttonReplay = document.getElementById("button-replay");
const buttonGiveUp = document.getElementById("button-giveup");
const buttonTip = document.getElementById("button-tip");

// funçionalidades do HTML
// botão começar jogo
buttonStart.addEventListener("click", () => {
  startPage.classList.add("hide");
  forcaPage.classList.remove("hide");
  const randomWord = createRandomWord();
  createSlots(randomWord);
});

// botão ir para página de adicionar palavra
buttonAddWordPage.addEventListener("click", () => {
  startPage.classList.add("hide");
  addWordPage.classList.remove("hide");
});

// botão adicionar palavra nova
buttonAddWord.addEventListener("click", () => {
  addWord();
  addWordPage.classList.add("hide");
  forcaPage.classList.remove("hide");
  const randomWord = createRandomWord();
  createSlots(randomWord);
});

// botão mostrar dica
buttonTip.addEventListener("click", () => {
  const tipWord = document.querySelector(".forca-tip");
  tipWord.classList.toggle("show");
});

// botão recomeçar jogo
buttonReplay.addEventListener("click", () => {
  const partsBoneco = document.querySelectorAll(".boneco");
  const tipWord = document.querySelector(".forca-tip");
  const loser = document.querySelector(".loser");
  const winner = document.querySelector(".winner");
  winner.classList.remove("show-result");
  loser.classList.remove("show-result");
  tipWord.classList.remove("show");
  removeSlots();
  resetKeyboard();
  const randomWord = createRandomWord();
  createSlots(randomWord);
  usedKeys = [];
  wordObject = [];
  erros = 0;
  acertos = 0;
  venceu = false;
  let i;
  for (i = 0; i < 6; i++) {
    partsBoneco[i].classList.add("hide-boneco");
  }
});

// botão desistir do jogo
let venceu = false;
buttonGiveUp.addEventListener("click", () => {
  const spanWord = document.querySelectorAll(".word-placeholder");
  const word = hiddenWord.textContent;
  endGame();
  let i;
  for (i = 0; i < word.length; i++) {
    spanWord[i].textContent = word[i].toUpperCase();
  }
  if (!venceu) {
    const loser = document.querySelector(".loser");
    loser.classList.add("show-result");
  }
});

// funções básicas do programa
// adicionar palavra nova
const addWord = () => {
  const inputWord = document.getElementById("palavra").value.toLowerCase();
  const inputTip = document.getElementById("dica").value;
  wordsBase.push({ word: inputWord, tip: inputTip });
};

// sortear palavra aleatória
const createRandomWord = () => {
  const randomWord =
    wordsBase[Math.floor(Math.random() * (wordsBase.length - 1) + 1)];
  const tipWord = document.querySelector(".forca-tip");
  tipWord.textContent = randomWord.tip;
  hiddenWord.textContent = randomWord.word;
  return randomWord.word;
};

// criar espaços para palavra sorteada
const createSlots = (word) => {
  const forcaWord = document.querySelector(".div-forca-word");
  const div = document.createElement("div");
  div.setAttribute("id", "div-slots");
  div.classList.add("forca-word");
  forcaWord.appendChild(div);
  let i;
  for (i = 0; i < word.length; i++) {
    const span = document.createElement("span");
    span.classList.add("word-placeholder");
    span.innerHTML = "\u00A0";
    div.appendChild(span);
  }
};

// funções de novo jogo
// resetar os espaços da palavra sorteada
const removeSlots = () => {
  const divSlots = document.getElementById("div-slots");
  divSlots.remove();
};

// reiniciar o teclado virtual para o padrão
const resetKeyboard = () => {
  const keyboardDiv = document.querySelector(".forca-keyboard");
  const forcaWord = document.querySelector(".div-forca-word");
  keyboardDiv.style.display = "flex";
  forcaWord.style.marginBottom = "0";
  for (i = 0; i < keyboard.length; i++) {
    keyboard[i].classList.remove("key-correct", "key-wrong");
  }
};

// funções do teclado virtual
// variável que armazena as letras usadas
let usedKeys = [];

// apertando teclas do teclado virtual
const keyboard = document.querySelectorAll("[data-key]");
let i;
for (i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", verifyLetter);
}

// verificando tecla apertada, e escrevendo a palavra na tela
const hiddenWord = document.querySelector(".hidden-word");
function verifyLetter() {
  const word = hiddenWord.textContent;
  let keyPress = this.dataset.key;
  if (!usedKeys.includes(keyPress)) {
    if (!word.includes(keyPress)) {
      wrongKey(this, keyPress);
    } else {
      correctKey(this, word, keyPress);
    }
    usedKeys.push(keyPress);
  } else {
    const feedbackKey = document.querySelector(".feedback-key");
    feedbackKey.classList.add("show-result");
    setTimeout(() => {
      feedbackKey.classList.add("hide-result");
    }, 1500);
    setTimeout(() => {
      feedbackKey.classList.remove("show-result");
      feedbackKey.classList.remove("hide-result");
    }, 2000);
  }
}

// apertar letra certa
let acertos = 0;
const correctKey = (key, word, keyPress) => {
  const spanWord = document.querySelectorAll(".word-placeholder");
  let i;
  for (i = 0; i < word.length; i++) {
    if (keyPress == word[i]) {
      spanWord[i].textContent = keyPress.toUpperCase();
      key.classList.add("key-correct");
    }
  }
  const wordSelected = word;
  const wordObject = [];
  let cont;
  for (cont = 0; cont < wordSelected.length; cont++) {
    const letter = wordSelected[cont];
    if (!wordObject.includes(letter)) {
      wordObject.push(letter);
    }
  }
  acertos++;
  if (acertos == wordObject.length) {
    const winner = document.querySelector(".winner");
    winner.classList.add("show-result");
    venceu = true;
    endGame();
  }
};

// apertar letra errada
let erros = 0;
const wrongKey = (key) => {
  const partsBoneco = document.querySelectorAll(".boneco");
  key.classList.add("key-wrong");
  partsBoneco[erros].classList.remove("hide-boneco");
  erros++;
  if (erros == 6) {
    const loser = document.querySelector(".loser");
    loser.classList.add("show-result");
    endGame();
  }
};

// fim de jogo após acertar todas as letras, ou errar 6 vezes
const endGame = () => {
  const keyboardDiv = document.querySelector(".forca-keyboard");
  const forcaWord = document.querySelector(".div-forca-word");
  keyboardDiv.style.display = "none";
  forcaWord.style.marginBottom = "50px";
};
