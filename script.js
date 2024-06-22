let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const progressBar = document.querySelector('.progress-bar');

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateProgressBar();
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / (questions.length - 1)) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Survey submitted!');
});



