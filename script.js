document.getElementById("name").innerHTML =
localStorage.getItem("playerName");

let level = localStorage.getItem("level");

let easyWords = [
"apple","mango","kiwi","cycle","rose",
"water","summer","pen","book","ups"
];

let mediumWords = [
"banana","orange","flower","river","coconut",
"library","friend","pumpkin","nine","carrot"
];

let hardWords = [
"internal","teacher","iceman","computer","machine",
"library","dragonfruit","student","school","jackfruit"
];

let words;
let timeLimit;

if(level == "easy"){
    words = easyWords;
    timeLimit = 15;
}
else if(level == "medium"){
    words = mediumWords;
    timeLimit = 10;
}
else{
    words = hardWords;
    timeLimit = 8;
}

let currentWord;
let score = 0;
let question = 1;
let timer;
let timeLeft;

function shuffle(word){
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function newWord(){

    if(question > 10){

        localStorage.setItem("finalScore", score);

        window.location.href = "score.html";

        return;
    }

    currentWord = words[question-1];

    document.getElementById("scrambledWord").innerHTML =
    shuffle(currentWord);

    document.getElementById("questionNo").innerHTML = question;

    document.getElementById("answer").value = "";

    startTimer();
}

function startTimer(){

    clearInterval(timer);

    timeLeft = timeLimit;

    document.getElementById("timer").innerHTML = timeLeft;

    timer = setInterval(function(){

        timeLeft--;

        document.getElementById("timer").innerHTML = timeLeft;

        if(timeLeft == 0){

            clearInterval(timer);

            document.getElementById("message").innerHTML =
            "Time Up! Correct Answer: " + currentWord;

            question++;

            setTimeout(newWord,2000);
        }

    },1000);
}

function checkAnswer(){

    clearInterval(timer);

    let answer =
    document.getElementById("answer").value.toLowerCase();

    if(answer == currentWord){

        score++;

        document.getElementById("score").innerHTML = score;

        document.getElementById("message").innerHTML =
        "✅ Correct Answer!";
    }
    else{

        document.getElementById("message").innerHTML =
        "❌ Wrong Answer!";
    }

    question++;

    setTimeout(newWord,1000);
}

newWord();