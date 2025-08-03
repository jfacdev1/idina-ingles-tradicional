class Lesson2Learning {
    constructor() {
        this.currentProgress = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.currentQuizType = '';
        this.selectedCard = null;
        this.questions = {
            pronouns: [
                {
                    question: "¿Qué pronombre usarías para decir 'Ellos son estudiantes'?",
                    options: ["They", "We", "He", "You"],
                    correct: 0
                },
                {
                    question: "¿Cuál es el pronombre correcto para 'Yo'?",
                    options: ["I", "You", "He", "We"],
                    correct: 0
                }
            ],
            numbers: [
                {
                    number: 15,
                    word: "fifteen"
                },
                {
                    number: 8,
                    word: "eight"
                },
                {
                    number: 20,
                    word: "twenty"
                },
                {
                    number: 3,
                    word: "three"
                }
            ],
            days: [
                {
                    question: "¿Qué día viene después de Wednesday?",
                    options: ["Thursday", "Tuesday", "Friday", "Monday"],
                    correct: 0
                },
                {
                    question: "¿Cuál es el primer día de la semana?",
                    options: ["Monday", "Sunday", "Wednesday", "Friday"],
                    correct: 0
                }
            ]
        };
        this.init();
    }

    init() {
        this.setupQuizType();
        this.updateProgressBar();
        this.setupEventListeners();
    }

    setupQuizType() {
        if (document.querySelector('#pronouns-quiz')) {
            this.currentQuizType = 'pronouns';
        } else if (document.querySelector('#numbers-quiz')) {
            this.currentQuizType = 'numbers';
        } else if (document.querySelector('#days-quiz')) {
            this.currentQuizType = 'days';
        }
    }

    updateProgressBar() {
        var progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = this.currentProgress + '%';
        }
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            var optionButtons = document.querySelectorAll('.option-button');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleAnswer(e));
            });

            var numberCards = document.querySelectorAll('.number-card');
            numberCards.forEach(card => {
                card.addEventListener('click', (e) => this.handleNumberMatch(e));
            });

            var practiceButton = document.querySelector('.practice-button');
            if (practiceButton) {
                practiceButton.addEventListener('click', () => this.startPractice());
            }
        });
    }

    handleAnswer(event) {
        var selectedOption = event.target;
        var isCorrect = selectedOption.dataset.correct === 'true';
        
        this.showFeedback(isCorrect);
        
        if (isCorrect) {
            this.score++;
            this.currentProgress += 20;
            this.updateProgressBar();
            
            setTimeout(() => {
                this.nextQuestion();
            }, 1500);
        }
    }

    handleNumberMatch(event) {
        var card = event.target.closest('.number-card');
        if (!card || card.classList.contains('matched')) return;

        if (!this.selectedCard) {
            this.selectedCard = card;
            card.classList.add('selected');
        } else {
            if (this.isCorrectMatch(this.selectedCard, card)) {
                this.selectedCard.classList.add('matched');
                card.classList.add('matched');
                this.showFeedback(true);
                this.currentProgress += 25;
                this.updateProgressBar();
            } else {
                this.showFeedback(false);
            }
            this.selectedCard.classList.remove('selected');
            this.selectedCard = null;
        }
    }

    isCorrectMatch(card1, card2) {
        var num1 = card1.dataset.number;
        var num2 = card2.dataset.number;
        return this.questions.numbers.some(q => 
            (q.number.toString() === num1 && q.word === num2) ||
            (q.word === num1 && q.number.toString() === num2)
        );
    }

    showFeedback(isCorrect) {
        var feedback = document.createElement('div');
        feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
        feedback.textContent = isCorrect ? '¡Correcto!' : 'Intenta de nuevo';
        
        var quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.appendChild(feedback);
            setTimeout(() => {
                feedback.remove();
            }, 1500);
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion >= this.questions[this.currentQuizType].length) {
            this.showCompleteMessage();
        } else {
            this.loadQuestion(this.currentQuestion);
        }
    }

    showCompleteMessage() {
        var quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.innerHTML = `
                <h2>¡Felicitaciones!</h2>
                <p>Has completado este ejercicio con éxito.</p>
                <button class="btn-primary" onclick="location.reload()">Intentar de nuevo</button>
            `;
        }
    }

    loadQuestion(index) {
        var question = this.questions[this.currentQuizType][index];
        var questionElement = document.querySelector('.question');
        if (questionElement && question) {
            questionElement.innerHTML = `
                <p>${question.question}</p>
                <div class="options-grid">
                    ${question.options.map((option, i) => `
                        <button class="option-button" data-correct="${i === question.correct}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
        }
    }

    startPractice() {
        var dialogueBox = document.querySelector('.dialogue-box');
        if (dialogueBox) {
            dialogueBox.classList.add('active');
            this.currentDialoguePart = 0;
            this.showNextDialoguePart();
        }
    }

    showNextDialoguePart() {
        var dialogueLines = document.querySelectorAll('.dialogue-box p');
        if (this.currentDialoguePart < dialogueLines.length) {
            dialogueLines[this.currentDialoguePart].classList.add('highlight');
            this.currentDialoguePart++;
        }
    }
}

// Inicializar la aplicación
var app = new Lesson2Learning();
