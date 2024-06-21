let currentQuestionIndex = 0;
const questions = document.querySelectorAll(".question");

function showQuestion(index) {
  questions.forEach((question, i) => {
    if (i === index) {
      question.classList.add("active");
    } else {
      question.classList.remove("active");
    }
  });
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
}

document
  .getElementById("surveyForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Survey submitted!");
    // Add form submission logic here
  });
