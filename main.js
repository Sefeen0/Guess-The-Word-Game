let titleName = "guess the word",
  title = document.querySelector(".container .head h1"),
  footer = document.querySelector(".container footer"),
  tries = 6,
  inputsNum = 6,
  currentTry = 1,
  hints = 2;
title.innerHTML = titleName;
footer.innerHTML = `created by black code 2024`;

function generateIinputs() {
  let contGame = document.querySelector(".container .cont-game .game .tries ");
  for (i = 1; i <= tries; i++) {
    tryDiv = document.createElement("div");
    tryDiv.className = `try try-${i}`;
    if (i !== 1) tryDiv.classList.add("disabled");
    span = document.createElement("span");
    span.className = "word";
    span.innerHTML = `try ${i}`;
    if (i !== 1) span.classList.add("disabled");
    tryDiv.prepend(span);
    for (j = 1; j <= inputsNum; j++) {
      inputs = document.createElement("input");
      inputs.type = "text";
      inputs.setAttribute("maxlength", "1");
      inputs.className = "ch";
      inputs.id = `try-${i}-letter-${j}`;
      if (i !== 1) inputs.classList.add("disabled");
      tryDiv.appendChild(inputs);
    }
    contGame.appendChild(tryDiv);
  }
  contGame.children[0].children[1].focus();
  let disabledTries = document.querySelectorAll(
    ".container .cont-game .game .tries .disabled"
  );
  disabledTries.forEach((e) => (e.disabled = true));

  let inputList = document.querySelectorAll(
    ".container .cont-game .game .tries .try input"
  );
  inputList.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      let currentInput = Array.from(inputList).indexOf(e.target);
      if (e.target.value.length === 1) {
        let nextInput = currentInput + 1;
        if (nextInput < inputList.length) {
          inputList[nextInput].focus();
        }
      }
      if (e.key === "ArrowRight") {
        let nextInput = currentInput + 1;
        if (nextInput < inputList.length) inputList[nextInput].focus();
      }
      if (e.key === "ArrowLeft") {
        let prevInput = currentInput - 1;
        if (prevInput >= 0) inputList[prevInput].focus();
      }
      if (e.key === "Backspace") {
        let prevInput = currentInput - 1;
        if (prevInput >= 0) {
          inputList[currentInput].value = "";
          currentInput--;
          inputList[prevInput].focus();
        }
      }
    });
  });
}
let wordsGuess = [
  "github",
  "python",
  "script",
  "branch",
  "master",
  "nodejs",
  "hacker",
  "create",
];
let wordGuess =
  wordsGuess[Math.floor(Math.random() * wordsGuess.length)].toUpperCase();
let checkBtn = document.querySelector(
  ".container .cont-game .game .btn .check > button"
);
let massage = document.querySelector(".massage");
checkBtn.addEventListener("click", handleGuess);
function handleGuess() {
  let triesList = document.querySelectorAll(
    ".container .cont-game .game .tries .try "
  );
  let inputList = document.querySelectorAll(
    ".container .cont-game .game .tries .try input"
  );
  let successWord = [];
  let successGuess;
  for (i = 1; i <= inputsNum; i++) {
    const inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
    let letter = inputField.value.toUpperCase();
    const actualLetter = wordGuess[i - 1].toUpperCase();
    if (actualLetter === letter) {
      inputField.classList.add("right");
      inputField.classList.remove("not-in-place");
      inputField.classList.remove("white");
      inputField.classList.remove("wrong");
      successWord.push(letter);
      successGuess = true;
    } else if (letter === "") {
      inputField.classList.add("white");
      inputField.classList.remove("not-in-place");
      inputField.classList.remove("wrong");
    } else if (wordGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      inputField.classList.remove("white");
      inputField.classList.remove("wrong");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      inputField.classList.remove("not-in-place");
      inputField.classList.remove("white");
      successGuess = false;
    }
  }
  if (successGuess === true && successWord.join("") === wordGuess) {
    inputList.forEach((e) => e.classList.remove("disabled"));
    triesList.forEach((e) => e.classList.remove("disabled"));
    inputList.forEach((e) => e.classList.add("disabled"));
    triesList.forEach((e) => e.classList.add("disabled"));
    inputList.forEach((e) => (e.disabled = true));
    document
      .querySelector(
        `.container .cont-game .game .tries .try-${currentTry} span`
      )
      .classList.add("disabled");
    checkBtn.classList.add("disabled");
    checkBtn.disabled = true;
    hintBtn.disabled = true;
    hintBtn.classList.add("disabled");
    massage.innerHTML = `you win the word is <span> ${wordGuess}</span>`;
  } else {
    let currentTryList = document.querySelector(
      `.container .cont-game .game .tries .try-${currentTry}`
    );
    currentTryList.classList.add("disabled");
    let currentInputList = document.querySelectorAll(
      `.container .cont-game .game .tries .try-${currentTry} input`
    );
    currentInputList.forEach((e) => e.classList.add("disabled"));
    currentInputList.forEach((e) => (e.disabled = true));
    document
      .querySelector(
        `.container .cont-game .game .tries .try-${currentTry} span`
      )
      .classList.add("disabled");
    currentTry++;
    let nextTryList = document.querySelector(
      `.container .cont-game .game .tries .try-${currentTry}`
    );
    let nextInputList = document.querySelectorAll(
      `.container .cont-game .game .tries .try-${currentTry} input`
    );
    nextInputList.forEach((e) => (e.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      nextTryList.classList.remove("disabled");
      nextInputList.forEach((e) => e.classList.remove("disabled"));
      document
        .querySelector(
          `.container .cont-game .game .tries .try-${currentTry} span`
        )
        .classList.remove("disabled");
      nextInputList[0].focus();
    } else {
      checkBtn.disabled = true;
      checkBtn.classList.add("disabled");
      hintBtn.disabled = true;
      hintBtn.classList.add("disabled");
      massage.innerHTML = `you lose the word is <span> ${wordGuess}</span>`;
    }
  }
}
let hintSpan = document.querySelector(
  ".container .cont-game .game .btn .check :last-child span"
);
let hintBtn = document.querySelector(
  ".container .cont-game .game .btn .check :last-child"
);
hintSpan.innerHTML = `${hints}`;
hintBtn.addEventListener("click", handleHints);
function handleHints() {
  if (hints > 0) {
    hints--;
    hintSpan.innerHTML = hints;
    if (hints === 0) {
      hintBtn.disabled = true;
      hintBtn.classList.add("disabled");
    }
    let enabledInputs = document.querySelectorAll("input:not([disabled])");
    let emptyInputs = Array.from(enabledInputs).filter((e) => e.value === "");
    if (emptyInputs.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyInputs.length);
      let randomInput = emptyInputs[randomIndex];
      let correctIndex = Array.from(enabledInputs).indexOf(randomInput);
      if (correctIndex !== -1) {
        randomInput.value = wordGuess[correctIndex].toUpperCase();
      }
      console.log(wordGuess);
      console.log(randomIndex);
    }
  }
}
window.onload = function () {
  generateIinputs();
};
