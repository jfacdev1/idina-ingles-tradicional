// Elementos del DOM
let currentQuestionIndex = 0;
const questions = [
    {
        text: "I see _____ elephant.",
        options: ["an", "a", "the"],
        correct: 0
    },
    {
        text: "This is _____ book.",
        options: ["an", "a", "the"],
        correct: 1
    },
    {
        text: "_____ sun is bright today.",
        options: ["an", "a", "the"],
        correct: 2
    },
    {
        text: "I need _____ umbrella.",
        options: ["an", "a", "the"],
        correct: 0
    }
];

let score = 0;

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
    setupEventListeners();
});

function initializeQuiz() {
    displayQuestion(currentQuestionIndex);
    updateProgressBar();
}

function displayQuestion(index) {
    const questionContainer = document.getElementById('question-1');
    const question = questions[index];
    
    questionContainer.querySelector('.question-text').textContent = question.text;
    const options = questionContainer.querySelectorAll('.option-button');
    
    options.forEach((button, i) => {
        button.textContent = question.options[i];
        button.classList.remove('correct', 'incorrect');
    });
}

function updateProgressBar() {
    const progress = document.querySelector('.progress');
    const percentage = (currentQuestionIndex / questions.length) * 100;
    progress.style.width = `${percentage}%`;
}

function setupEventListeners() {
    const options = document.querySelectorAll('.option-button');
    options.forEach(option => {
        option.addEventListener('click', handleAnswer);
    });
}

function handleAnswer(event) {
    const selectedOption = parseInt(event.target.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedOption === currentQuestion.correct) {
        event.target.classList.add('correct');
        score++;
        showFeedback('¡Correcto! 🎉');
    } else {
        event.target.classList.add('incorrect');
        showFeedback('Intenta de nuevo 🤔');
        return;
    }

    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        } else {
            showFinalScore();
        }
    }, 1500);
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.classList.add('feedback');
    feedback.textContent = message;
    document.querySelector('.quiz-container').appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

function showFinalScore() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h2>¡Ejercicio Completado!</h2>
        <p>Tu puntuación: ${score}/${questions.length}</p>
        <button class="btn-primary" onclick="resetQuiz()">Intentar de nuevo</button>
    `;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    initializeQuiz();
}

// Funciones para el diálogo y texto a voz
function startDialoguePractice() {
    const dialogueBox = document.querySelector('.dialogue-box');
    dialogueBox.classList.add('practice-mode');
    
    // Ocultar el texto del diálogo B
    const speakerBTexts = dialogueBox.querySelectorAll('.speaker-b');
    speakerBTexts.forEach(text => {
        text.classList.add('hidden');
    });

    // Agregar botones de audio a cada línea del diálogo
    const dialogueLines = dialogueBox.querySelectorAll('p');
    dialogueLines.forEach(line => {
        if (!line.querySelector('.audio-button')) {
            const button = document.createElement('button');
            button.className = 'audio-button';
            button.innerHTML = '🔊';
            button.onclick = () => speakText(line.textContent);
            line.appendChild(button);
        }
    });
}

function showTranslation() {
    const dialogueBox = document.querySelector('.dialogue-box');
    dialogueBox.classList.toggle('show-translation');
}

// Función para convertir texto a voz usando gTTS a través de una API
async function speakText(text) {
    try {
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) throw new Error('Error en la conversión de texto a voz');
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error('Error al reproducir audio:', error);
        alert('Lo siento, hubo un error al reproducir el audio. Por favor intenta de nuevo.');
    }
}

// Función para revisar el ejercicio de escritura
function checkWriting() {
    const textarea = document.getElementById('family-description');
    const text = textarea.value.toLowerCase();
    
    // Verificar uso de artículos y vocabulario de familia
    const familyWords = ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather'];
    const articles = ['a', 'an', 'the'];
    
    let hasArticles = articles.some(article => text.includes(article));
    let hasFamilyWords = familyWords.some(word => text.includes(word));
    
    let feedback = '';
    if (hasArticles && hasFamilyWords) {
        feedback = '¡Excelente! Has usado correctamente los artículos y el vocabulario de familia. 👏';
    } else if (!hasArticles) {
        feedback = 'Recuerda usar los artículos (a, an, the) en tu descripción. 🤔';
    } else if (!hasFamilyWords) {
        feedback = 'Intenta incluir más palabras relacionadas con la familia. 📝';
    }
    
    showWritingFeedback(feedback);
}

function showWritingFeedback(message) {
    const existingFeedback = document.querySelector('.writing-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.classList.add('writing-feedback');
    feedback.textContent = message;
    document.querySelector('.writing-exercise').appendChild(feedback);
}
