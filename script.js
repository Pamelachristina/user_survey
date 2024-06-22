const questions = [
  {
    text: "Which facilities of the Molecular Foundry did you use this year?",
    type: "checkbox",
    options: [
      "Imaging and Manipulation of Nanostructures (1st floor)",
      "Nanofabrication (2nd floor)",
      "Theory of Nanostructured Materials (3rd floor)",
      "Inorganic Nanostructures (4th floor)",
      "Biological Nanostructures (5th floor)",
      "Organic and Macromolecular Synthesis (6th floor)",
      "National Center for Electron Microscopy (NCEM)",
    ],
    image: "survey.svg",
  },
  {
    text: "What most impressed you about the Molecular Foundry?",
    type: "text",
    image: "survey.svg",
  },
  {
    text: "Please indicate whether you agree or disagree with the following statements about the culture at the Molecular Foundry.",
    type: "likert",
    statements: [
      "All users are made to feel welcome",
      "All users and staff are treated fairly and with respect",
      "I feel safe to speak up, share ideas, and contribute to discussions.",
      "The culture at the Molecular Foundry is enriching and scientifically stimulating.",
      "I feel like I belong at the Molecular Foundry.",
    ],
    options: [
      "Strongly agree",
      "Agree",
      "Neither agree nor disagree",
      "Disagree",
      "Strongly disagree",
      "Not Applicable",
    ],
    image: "survey.svg",
  },
  {
    text: "Was your experience of the culture consistent for all facilities? Selecting “No” will give you the option to differentiate your responses to the questions above by facility?",
    type: "yesno",
    image: "survey.svg",
  },
  {
    text: "Do you have any comments or suggestions on how can we improve in these areas?",
    type: "text",
    image: "survey.svg",
  },
  {
    text: "What was the subject of your work at the Molecular Foundry this year?(select the subject that best applies)",
    type: "checkbox",
    options: [
      "Basic Research",
      "Applied Research",
      "Developed a new or improved product, process or technology",
    ],
    image: "survey.svg",
  },
  {
    text: "How do you intend on communicating the knowledge gained at the Molecular Foundry?(select all answers that apply)",
    type: "checkbox",
    options: [
      "Publish in peer-reviewed open literature",
      "Present findings at professional society meeting",
      " Acquire a patent",
      " Other",
    ],
    image: "survey.svg",
  },
  {
    text: "What additional benefits did you gain at the Molecular Foundry?(select all answers that apply)",
    type: "checkbox",
    options: [
      "Obtained access to unique capabilities not available elsewhere (e.g., forefront experiments; one-of-a-kind instruments; distinctive materials or services)",
      "Facilitated collaborative interactions (e.g., stimulated new ideas for future experiments, increased multidisciplinary work; enabled a new approach within your discipline)",
      "Trained students (undergraduate, graduate or postdoctoral associate)",
      "Furthered the goals of the Department of Energy",
      " Other",
    ],
    image: "survey.svg",
  },
  {
    text: "Optional: Please share any final thoughts.",
    type: "text",
    image: "survey.svg",
  },
  {
    text: "Optional: If you would like to be contacted about your responses, please provide your name and email address.",
    type: "text",
    image: "survey.svg",
  },
];

let currentQuestionIndex = 0;

function displayQuestion(index) {
  const question = questions[index];
  document.getElementById("question-text").textContent = question.text;
  document.getElementById("question-image").src = question.image;

  const answerContainer = document.getElementById("answer-container");
  answerContainer.innerHTML = "";

  switch (question.type) {
    case "checkbox":
      question.options.forEach((option) => {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
                    <input class="form-check-input" type="checkbox" id="${option}">
                    <label class="form-check-label" for="${option}">${option}</label>
                `;
        answerContainer.appendChild(div);
      });
      break;

    case "text":
      const textArea = document.createElement("textarea");
      textArea.className = "form-control";
      textArea.rows = 4;
      textArea.id = "text-answer";
      answerContainer.appendChild(textArea);
      break;

    case "likert":
      const table = document.createElement("table");
      table.className = "table table-bordered table-sm likert-table";

      const headerRow = table.insertRow();
      const th = document.createElement("th");
      th.textContent = "Statement";
      headerRow.appendChild(th);
      question.options.forEach((option) => {
        const th = document.createElement("th");
        th.textContent = option;
        headerRow.appendChild(th);
      });

      question.statements.forEach((statement, statementIndex) => {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.textContent = statement;

        question.options.forEach((option, optionIndex) => {
          const cell = row.insertCell();
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = `statement_${statementIndex}`;
          radio.value = option;
          radio.className = "form-check-input";
          cell.appendChild(radio);
        });
      });

      answerContainer.appendChild(table);
      break;

    case "yesno":
      const yesNoContainer = document.createElement("div");
      yesNoContainer.className = "btn-group d-flex justify-content-center";
      yesNoContainer.setAttribute("role", "group");

      const yesButton = document.createElement("button");
      yesButton.type = "button";
      yesButton.className = "btn btn-outline-primary btn-lg";
      yesButton.textContent = "Yes";
      yesButton.onclick = () => selectYesNo("Yes");

      const noButton = document.createElement("button");
      noButton.type = "button";
      noButton.className = "btn btn-outline-primary btn-lg";
      noButton.textContent = "No";
      noButton.onclick = () => selectYesNo("No");

      yesNoContainer.appendChild(yesButton);
      yesNoContainer.appendChild(noButton);
      answerContainer.appendChild(yesNoContainer);
      break;

    default:
      console.error("Unknown question type:", question.type);
  }

  updateProgressBar();
  updateNavigationButtons();
}

function selectYesNo(answer) {
  const buttons = document.querySelectorAll("#answer-container button");
  buttons.forEach((button) => {
    if (button.textContent === answer) {
      button.classList.remove("btn-outline-primary");
      button.classList.add("btn-primary");
    } else {
      button.classList.remove("btn-primary");
      button.classList.add("btn-outline-primary");
    }
  });
  // Here you would typically save this answer
  console.log("Selected answer:", answer);
}

function selectYesNo(answer) {
  const buttons = document.querySelectorAll("#answer-container button");
  buttons.forEach((button) => {
    if (button.textContent === answer) {
      button.classList.remove("btn-outline-primary");
      button.classList.add("btn-primary");
    } else {
      button.classList.remove("btn-primary");
      button.classList.add("btn-outline-primary");
    }
  });
  // Here you would typically save this answer
  console.log("Selected answer:", answer);
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", progress);
}

function updateNavigationButtons() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

function nextQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.type === "yesno") {
    const selectedButton = document.querySelector(
      "#answer-container .btn-primary"
    );
    if (!selectedButton) {
      alert("Please select an answer before proceeding.");
      return;
    }
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    animateTransition(() => displayQuestion(currentQuestionIndex));
  } else {
    // Handle survey completion
    document.getElementById("question-container").innerHTML =
      "<h2>Survey Complete</h2><p>Thank you for your feedback!</p><p>Please contact Donald Lee for issues or suggestions.</p><p>djlee2@lbl.gov</p>";

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // For a more elaborate confetti effect, you can use this:
    /*
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
        */
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    animateTransition(() => displayQuestion(currentQuestionIndex));
  }
}

function animateTransition(callback) {
  const container = document.getElementById("question-container");
  container.style.opacity = 0;
  setTimeout(() => {
    callback();
    container.style.opacity = 1;
  }, 300);
}

document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("prev-button").addEventListener("click", prevQuestion);

displayQuestion(currentQuestionIndex);
