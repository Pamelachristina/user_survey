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
    
  },
  {
    text: "Was your experience of the culture consistent for all facilities? \nSelecting “No” will give you the option to differentiate your responses to the questions above by facility?",
    type: "yesno",
    image: "survey.svg",
  },
  {
    text: "Do you have any comments or suggestions on how can we improve in these areas?",
    type: "text",
    image: "survey.svg",
  },
  {
    text: "What was the subject of your work at the Molecular Foundry this year? (select the subject that best applies)",
    type: "radio",
    options: [
      "Basic Research",
      "Applied Research",
      "Developed a new or improved product, process or technology",
    ],
    image: "survey.svg",
  },
  {
    text: "How do you intend on communicating the knowledge gained at the Molecular Foundry? (select all answers that apply)",
    type: "checkbox",
    options: [
      "Publish in peer-reviewed open literature",
      "Present findings at professional society meeting",
      "Acquire a patent",
      "Other",
    ],
    image: "survey.svg",
  },
  {
    text: "What additional benefits did you gain at the Molecular Foundry? (select all answers that apply)",
    type: "checkbox",
    options: [
      "Obtained access to unique capabilities not available elsewhere (e.g., forefront experiments; one-of-a-kind instruments; distinctive materials or services)",
      "Facilitated collaborative interactions (e.g., stimulated new ideas for future experiments, increased multidisciplinary work; enabled a new approach within your discipline)",
      "Trained students (undergraduate, graduate or postdoctoral associate)",
      "Furthered the goals of the Department of Energy",
      "Other",
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

  // ... other questions ...
];

let currentQuestionIndex = 0;
let selectedFacilities = [];

function shouldTriggerLikertSurvey(questionText) {
  const excludedQuestions = [
    "What additional benefits did you gain at the Molecular Foundry? (select all answers that apply)",
    "How do you intend on communicating the knowledge gained at the Molecular Foundry? (select all answers that apply)"
  ];
  return !excludedQuestions.includes(questionText);
}

function displayQuestion(index) {
  const question = questions[index];
  document.getElementById("question-text").textContent = question.text;

  const answerContainer = document.getElementById("answer-container");
  answerContainer.innerHTML = "";

  switch (question.type) {
    case "checkbox":
      question.options.forEach((option) => {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
          <input class="form-check-input" type="checkbox" id="${option}" name="facility">
          <label class="form-check-label" for="${option}">${option}</label>
        `;
        answerContainer.appendChild(div);
      });
      break;
    case "likert":
      createLikertTable(question, answerContainer);
      break;
    case "radio":
      question.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
          <input class="form-check-input" type="radio" id="radio_${index}" name="subject" value="${option}">
          <label class="form-check-label" for="radio_${index}">${option}</label>
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
    case "yesno":
      const yesNoContainer = document.createElement("div");
      yesNoContainer.className = "btn-group d-flex justify-content-center";
      yesNoContainer.setAttribute("role", "group");
      yesNoContainer.innerHTML = `
        <button type="button" class="btn btn-outline-primary btn-lg" onclick="selectYesNo('Yes')">Yes</button>
        <button type="button" class="btn btn-outline-primary btn-lg" onclick="selectYesNo('No')">No</button>
      `;
      answerContainer.appendChild(yesNoContainer);
      break;
    default:
      console.error("Unknown question type:", question.type);
  }

  updateProgressBar();
  updateNavigationButtons();
}

function createLikertTable(question, container) {
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
      radio.addEventListener("change", handleLikertChange);
      cell.appendChild(radio);
    });
  });

  container.appendChild(table);
}

function handleLikertChange(event) {
  const { target } = event;
  if (target.value === "Disagree" || target.value === "Strongly disagree") {
    const modal = new bootstrap.Modal(document.getElementById('dissatisfactionModal'));
    modal.show();
  }
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
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

function nextQuestion() {
  const question = questions[currentQuestionIndex];
  if (question.type === "checkbox" && shouldTriggerLikertSurvey(question.text)) {
    const checkboxes = document.querySelectorAll("input[name='facility']:checked");
    selectedFacilities = Array.from(checkboxes).map((checkbox) => checkbox.id);
    if (selectedFacilities.length > 0) {
      insertLikertQuestions(selectedFacilities);
    }
  } else if (question.type === "radio") {
    const selectedOption = document.querySelector("input[name='subject']:checked");
    if (selectedOption) {
      console.log("Selected option:", selectedOption.value);
    }
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  } else {
    finishSurvey();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

function selectYesNo(answer) {
  const buttons = document.querySelectorAll("#answer-container .btn");
  buttons.forEach((button) => {
    button.classList.remove("btn-primary");
    button.classList.add("btn-outline-primary");
  });
  event.target.classList.remove("btn-outline-primary");
  event.target.classList.add("btn-primary");
}

function insertLikertQuestions(facilities) {
  const likertQuestions = [];
  facilities.forEach((facility) => {
    const question = {
      text: `How satisfied were you with the following at ${facility}?`,
      type: "likert",
      statements: [
        "Performance of equipment and facilities",
        "Support for users provided by the facility staff",
        "Fraction of the year that the facility operates",
        "Scheduling and instrument availability (i.e., the awarded time was delivered on schedule and downtime was kept to a minimum)",
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
    };
    likertQuestions.push(question);
  });

  questions.splice(currentQuestionIndex + 1, 0, ...likertQuestions);
}

function finishSurvey() {
  document.getElementById("question-container").innerHTML = `
    <h2>Survey Complete</h2>
    <p>Thank you for your feedback!</p>
    <p>Please contact Donald Lee for issues or suggestions.</p>
    <p>djlee2@lbl.gov</p>
  `;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("prev-button").addEventListener("click", prevQuestion);

displayQuestion(currentQuestionIndex);

console.log("Script loaded");