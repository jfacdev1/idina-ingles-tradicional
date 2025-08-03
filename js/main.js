class LanguageLearning {
    constructor() {
        this.currentProgress = 0;
        this.currentQuestion = 0;
        this.score = 0;
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
                }
            ],
            days: [
                {
                    question: "¿Qué día viene después de Wednesday?",
                    options: ["Thursday", "Tuesday", "Friday", "Monday"],
                    correct: 0
                }
            ]
        };
        this.init();

    init() {
        this.updateProgressBar();
        this.setupEventListeners();
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = `${this.currentProgress}%`;
        }
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const optionButtons = document.querySelectorAll('.option-button');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleAnswer(e));
            });
        });
    }

    handleAnswer(event) {
        const selectedOption = event.target;
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        this.showFeedback(isCorrect);
        
        if (isCorrect) {
            this.score++;
            this.currentProgress += 20;
            this.updateProgressBar();
        }

        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    showFeedback(isCorrect) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.textContent = isCorrect ? '¡Correcto!' : 'Intenta de nuevo';
        
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestion++;
        // Aquí se implementará la lógica para mostrar la siguiente pregunta
        // o avanzar a la siguiente sección si se completó el ejercicio
    }
}

// Inicializar la aplicación
const app = new LanguageLearning();
