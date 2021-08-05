// Words
const words = [
    'exercise', 'brother', 'children', 'flower', 'javascript',
    'expensive', 'favourite', 'somebody', 'different', 'python',
    'usually', 'mathematics', 'language', 'cinema', 'newspaper',
    'saturday', 'question', 'computer', 'monitor', 'awesome',
    'yesterday', 'photograph', 'breakfast', 'probably', 'tomorrow',
    'beautiful', 'sentence', 'umbrella', 'remember', 'aeroplan'
];

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
let randomWord;
let score = 0;
let time = 10;
let difficulty;
select.value = "medium";

showRandomWord();

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
        
        if (select.value == 'easy')
            time += 5;
        else if (select.value == 'medium')
            time += 4;
        else time += 3;

        scoreEl.innerText = score;
        showRandomWord();
    }
});

select.addEventListener('change', () => {
    difficulty = select.value;
    localStorage.setItem('difficulty', difficulty);
});

document.addEventListener('click', (e) => {
    if(e.target.classList[0] == 'overflow') {
        location.reload();
    }
})

const setTime = setInterval(changeTime, 1000);

// Functions
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function showRandomWord() {
    word.innerHTML = "";
    randomWord = getRandomWord();

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

    if (time <= 0) {
        clearInterval(setTime);
        modal.classList.remove("hidden");
        overflow.classList.remove("hidden");
        yourScore.innerText = score;
    }
}