class LessonOne {
    constructor() {
        this.currentProgress = 0;
        this.score = 0;
        this.totalQuestions = 5;
        this.currentQuestion = 0;
        this.questions = [
            {
                text: "Complete la oración: 'I _____ a student.'",
                options: ['am', 'is', 'are', 'be'],
                correct: 0
            },
            {
                text: "Complete la oración: 'She _____ happy.'",
                options: ['am', 'is', 'are', 'be'],
                correct: 1
            },
            {
                text: "Complete la oración: 'They _____ teachers.'",
                options: ['am', 'is', 'are', 'be'],
                correct: 2
            },
            {
                text: "Complete la oración: 'He _____ not a doctor.'",
                options: ['am', 'is', 'are', 'be'],
                correct: 1
            },
            {
                text: "Complete la oración: 'We _____ friends.'",
                options: ['am', 'is', 'are', 'be'],
                correct: 2
            }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadQuestion();
        this.updateProgressBar();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const optionButtons = document.querySelectorAll('.option-button');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleAnswer(e));
            });
        });
    }

    loadQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionElement = document.querySelector('#question-1');
        if (!questionElement) return;

        questionElement.innerHTML = `
            <p>${question.text}</p>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <button class="option-button" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        `;

        // Reattach event listeners to new buttons
        const optionButtons = questionElement.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleAnswer(e));
        });
    }

    handleAnswer(event) {
        const selectedIndex = parseInt(event.target.dataset.index);
        const currentQuestion = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === currentQuestion.correct;

        // Disable all buttons temporarily
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => button.disabled = true);

        // Show visual feedback
        if (isCorrect) {
            event.target.classList.add('correct');
            this.score++;
            this.currentProgress += (100 / this.totalQuestions);
            this.updateProgressBar();
        } else {
            event.target.classList.add('incorrect');
            const correctButton = document.querySelector(\`[data-index="\${currentQuestion.correct}"]\`);
            correctButton.classList.add('correct');
        }

        // Wait before loading next question
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 1500);
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = \`\${this.currentProgress}%\`;
        }
    }

    showResults() {
        const quizContainer = document.querySelector('.quiz-container');
        if (!quizContainer) return;

        const percentage = (this.score / this.totalQuestions) * 100;
        quizContainer.innerHTML = `
            <h2>¡Ejercicio Completado!</h2>
            <div class="results">
                <p>Tu puntuación: ${this.score} de ${this.totalQuestions}</p>
                <p>Porcentaje de aciertos: ${percentage}%</p>
                ${percentage >= 70 
                    ? '<p class="success-message">¡Excelente trabajo! Puedes continuar con la siguiente lección.</p>' 
                    : '<p class="retry-message">Intenta practicar un poco más antes de continuar.</p>'}
            </div>
            <button class="btn-primary" onclick="location.reload()">Intentar de nuevo</button>
        `;
    }
}

// Inicializar la lección cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    new LessonOne();
});
