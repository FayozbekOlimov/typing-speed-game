// Selectors
const word = document.getElementById('word');
const input = document.getElementById('input');
const scoreEl = document.getElementById('score');
const select = document.getElementById('select');
const timeEl = document.getElementById('time');
input.focus();


// Modal elements
const modal = document.querySelector(".modal");
const overflow = document.querySelector(".overflow");
const yourScore = document.getElementById("yourScore");


// Variables
const API = 'https://random-word-api.herokuapp.com/word';
const EASY_VALUE = 6, MEDIUM_VALUE = 5, HARD_VALUE = 4;
const level_obj = {
    easy: EASY_VALUE,
    medium: MEDIUM_VALUE,
    hard: HARD_VALUE
};

let randomWord;
let score = 0, time = 10;

document.addEventListener('DOMContentLoaded', () => {
    select.value = localStorage.getItem('difficulty') || "medium";
    getWord();
});

input.addEventListener('input', () => {
    const arrayWord = word.querySelectorAll('span');
    const arrayValue = input.value.split('');

    let check = true;

    arrayWord.forEach((span, index) => {
        const char = arrayValue[index];

        if (char == null) {
            span.classList.remove('correct');
            span.classList.remove('incorrect');
            check = false;
        } else if (char === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
        } else {
            span.classList.add('incorrect');
            span.classList.remove('correct');
            check = false;
        }
    });

    if (check) {
        score++;
        time += level_obj[select.value];
        scoreEl.innerText = score;
        getWord();
    }
});

select.addEventListener('change', () => {
    score = 0;
    time = 10;
    localStorage.setItem('difficulty', select.value);
});

const setTime = setInterval(changeTime, 1000);

function getWord() {
    fetch(API)
        .then(request => request.json())
        .then(showRandomWord);
}

function showRandomWord(w) {
    word.innerHTML = "";
    randomWord = w[0].toLowerCase();

    randomWord.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        word.appendChild(span);
    });
    input.value = "";
}

function changeTime() {
    time--;
    timeEl.innerText = time;

    if (time == 0) {
        clearInterval(setTime);
        modal.classList.remove("hidden");
        overflow.classList.remove("hidden");
        yourScore.innerText = score;
        input.setAttribute('readonly', 'readonly');
    }
}