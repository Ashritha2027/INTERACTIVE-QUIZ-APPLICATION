const questions = [
    {
        question:"How to save a CSS file?",
        answers: [
            {text: ".css", correct: true},
            {text: ".js", correct: false},
            {text: ".style", correct: false},
            {text: ".html", correct: false},
        ]
    },
     {
        question:"How to save HTML file?",
         answers: [
            {text: ".css", correct: false},
            {text: ".js", correct: false},
            {text: ".style", correct: false},
            {text: ".html", correct: true},
        ]
    },
    {
        question:"How to save JavaScript file?",
         answers: [
            {text: ".css", correct: false},
            {text: ".js", correct: true},
            {text: ".style", correct: false},
            {text: ".html", correct: false},
        ]
    },
    {
        question:"How many Heading tags are there?",
         answers: [
            {text: "5", correct: false},
            {text: "6", correct: true},
            {text: "7", correct: false},
            {text: "more than 7", correct: false},
        ]
    },
    {
        question:"What is the fullform of CSS?",
         answers: [
            {text: "Cascading Style Sheets", correct: true},
            {text: "Color Style Sheet", correct: false},
            {text: "Color Sheet Style", correct: false},
            {text: "Cascading Sheet Style", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display =  "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();