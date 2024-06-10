const questions = [
    {
        question: "What is the percentage of people getting a score of 5 on AP Physics 1?",
        answers: [
            {text: "15%", correct:false},
            {text: "12%", correct:false},
            {text: "8%", correct:true},
            {text: "5%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Physics 2?",
        answers: [
            {text: "15%", correct:true},
            {text: "20%", correct:false},
            {text: "9%", correct:false},
            {text: "10%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Physics C E&M?",
        answers: [
            {text: "40%", correct:false},
            {text: "31%", correct:true},
            {text: "22%", correct:false},
            {text: "5%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Physics C Mechanic?",
        answers: [
            {text: "15%", correct:false},
            {text: "20%", correct:false},
            {text: "28%", correct:true},
            {text: "35%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Chemistry?",
        answers: [
            {text: "15%", correct:true},
            {text: "17%", correct:false},
            {text: "6%", correct:false},
            {text: "10%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Calculus BC?",
        answers: [
            {text: "20%", correct:false},
            {text: "42%", correct:true},
            {text: "48%", correct:false},
            {text: "35%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Biology?",
        answers: [
            {text: "17%", correct:false},
            {text: "20%", correct:false},
            {text: "14%", correct:true},
            {text: "10%", correct:false},
        ]
    },
    {
        question: "What is the percentage of people getting a score of 5 on AP Statistic?",
        answers: [
            {text: "15%", correct:true},
            {text: "18%", correct:false},
            {text: "9%", correct:false},
            {text: "13%", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled =true;
        });
    }
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
