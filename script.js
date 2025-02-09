const wordsArray = {
    words_4: ["come", "bear", "play", "sing", "bird", "bean", "game", "rice", "dark"],
    words_5: ["badly", "candy", "crown", "death", "elect", "field", "grade", "human", "image", "knife"],
    words_6: ["behind", "knight", "liquid", "mobile", "number", "update", "wonder"]
};

const start = document.getElementById("enter");
const container = document.querySelector(".container");

var words = document.querySelectorAll(".word")
let theGeneratedWord;
let tries = 0;
let lengthOfWord;
let count = 0;
let guessedWord = []

start.addEventListener("click", () => {
    lengthOfWord = document.getElementById("choose").value
    theGeneratedWord = randomWordGenerator()
    createWord()
    document.querySelector(".notes").style.display = "none";
    document.querySelector("#choose").style.display = "none";
    document.querySelector("#enter").style.display = "none";

})

function createWord() {
    let newWordEl = document.createElement("div");
    newWordEl.className = "word";
    for (let i = 0; i < lengthOfWord; i++) {
        let newLetterEl = document.createElement("div");
        newLetterEl.className = "letter";
        newWordEl.appendChild(newLetterEl)
    }
    container.appendChild(newWordEl)
    newWordEl.animate([
        { opacity: 0 },
        { opacity: 1 }
    ],
        { duration: 1500 }
    )

    words = document.querySelectorAll(".word")
}

window.addEventListener("keyup", (e) => {
    if (container.contains(document.querySelector(".word"))) {
        if (count == lengthOfWord) {
            if (e.keyCode == 13) {
                GuessWord()
                if (guessedWord.join('') == theGeneratedWord.join('')) {
                    gameWon()
                } else {
                    gameOver()
                }
                createWord()
                guessedWord = []
                tries++;
                count = 0
            }
        }
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            words[words.length - 1].childNodes[count].textContent = e.key.toUpperCase()
            guessedWord.push(e.key)
            count++;
        }
    }
    words = document.querySelectorAll(".word")
})

function GuessWord() {
    console.log(theGeneratedWord);
    for (let i = 0; i < lengthOfWord; i++) {
        let currentLetter = words[words.length - 1].childNodes[i]
        if (currentLetter.textContent == theGeneratedWord[i].toUpperCase()) {
            highlightGreen(currentLetter)
        } else {
            highlightGray(currentLetter)
        }
        for (let j = 0; j < lengthOfWord; j++) {
            if (currentLetter.textContent == theGeneratedWord[j].toUpperCase()) {
                if (i != j) {
                    if (currentLetter.backgroundColor != "green") {
                        highlightYellow(currentLetter)
                    }
                }
            }
        }
    }
}

function highlightGreen(letter) {
    letter.style.backgroundColor = "green"
}

function highlightYellow(letter) {
    letter.style.backgroundColor = 'yellow'
}

function highlightGray(letter) {
    letter.style.backgroundColor = 'grey'
}

function randomWordGenerator() {
    if (lengthOfWord == 4) {
        return wordsArray.words_4[Math.round(Math.random() * wordsArray.words_4.length)].split('')
    } else if (lengthOfWord == 5) {
        return wordsArray.words_5[Math.round(Math.random() * wordsArray.words_5.length)].split('')
    } else {
        return wordsArray.words_6[Math.round(Math.random() * wordsArray.words_6.length)].split('')
    }
}

function gameOver() {
    if (tries == 4) {
        container.style.display = "none"
        document.querySelector('.gameover').style.display = "block"
        document.querySelector(".gameOverBtn").addEventListener("click", () => {
            window.location.reload(true);
        })
    }
}


function gameWon() {
    container.style.display = "none"
    document.querySelector('.gamewon').style.display = "block"
    document.querySelector(".gameWonBtn").addEventListener("click", () => {
        window.location.reload(true);
    })

}