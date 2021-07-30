// These are the starting variables
let pos = 0;
let correct = 0;
let test, question, choice, choices, optionA, optionB, optionC, optionD;
let scores = [];
let names = [];

const testStatusEl = document.getElementById("test-status");
const testEl = document.getElementById("test");
const timerEl = document.getElementById("timer");
let timeInterval;

function countdown() {
  let timeLeft = 100;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      testEl.innerHTML =
        "<h2>You got " +
        correct +
        " of " +
        questions.length +
        " questions correct</h2>";
      testStatusEl.innerHTML = "Test completed";
      testEndingForm();
      displayScores();
    }
  }, 1000);
}

// These are the questions being asked
var questions = [
  {
    question:
      "What are the identifiers called that cannot be used as variables or function names?",
    a: "Reserved Words",
    b: "Constants",
    c: "Favorites",
    d: "Concrete Terms",
    answer: "A",
  },
  {
    question:
      "What is a JavaScript element that represents either TRUE or FALSE values?",
    a: "Event",
    b: "RegExp",
    c: "Boolean",
    d: "Condition",
    answer: "C",
  },
  {
    question:
      "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
    a: "Recorders",
    b: "Arrays",
    c: "Variables",
    d: "Strings",
    answer: "D",
  },
  {
    question:
      "In JavaScript, what element is used to store multiple values in a single variable?",
    a: "Arrays",
    b: "Strings",
    c: "Variables",
    d: "Functions",
    answer: "A",
  },

  {
    question:
      "What is the object called that lets you work with both dates and time-related data?",
    a: "Dates",
    b: "Time-Warp",
    c: "Time Field",
    d: "Clock",
    answer: "A",
  },

  {
    question:
      "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
    a: "Boolean",
    b: "Events",
    c: "Condition",
    d: "RegExp",
    answer: "B",
  },

  {
    question: "Where is the JavaScript placed inside an HTML document or page?",
    a: "In the footer section.",
    b: "In the title section.",
    c: "In the meta section.",
    d: "In the body and head sections.",
    answer: "D",
  },

  {
    question:
      "What is the element used – and hidden – in code that explains things and makes the content more readable?",
    a: "Quotations",
    b: "Notes",
    c: "Comments",
    d: "Comparisons",
    answer: "B",
  },
];

// This is what makes the questions display on the page relative to the position of the Quiz
function displayQuestion() {
  // This displays the final tally once the quiz has been completed
  if (pos >= questions.length) {
    timerEl.textContent = "";
    // Use `clearInterval()` to stop the timer
    clearInterval(timeInterval);
    timerEl.textContent = "";
    testEl.innerHTML =
      "<h2>You got " +
      correct +
      " of " +
      questions.length +
      " questions correct</h2>";
    testStatusEl.innerHTML = "Test completed";
    testEndingForm();
    displayScores();

    //This resets the function after the quiz has been completed
    pos = 0;
    correct = 0;
    // This stops the function running when test is completed
    return false;
  }

  //This is using a template literal in order to display the number of the question
  testStatusEl.innerHTML = `Question ${pos + 1} of ${questions.length}`;

  question = questions[pos].question;
  optionA = questions[pos].a;
  optionB = questions[pos].b;
  optionC = questions[pos].c;
  optionD = questions[pos].d;
  // This is what is displaying the question based on the position of the question per the questions array
  testEl.innerHTML = `<h3> ${question} </h3>`;
  // display the answer options
  // the += appends to the data we started on the line above
  testEl.innerHTML += `<label> <input type='radio' name='choices' value='A'> ${optionA} </label><br>`;
  testEl.innerHTML += `<label> <input type='radio' name='choices' value='B'> ${optionB} </label><br>`;
  testEl.innerHTML += `<label> <input type='radio' name='choices' value='C'> ${optionC} </label><br>`;
  testEl.innerHTML += `<label> <input type='radio' name='choices' value='D'> ${optionD} </label><br>`;
  testEl.innerHTML += `<button onclick='submitAnswer()'>Next Question</button>
    <br>
    <button onclick='previousQuestion()'>Previous Question</button>`;
}

function previousQuestion() {
  pos--;
  displayQuestion();
  // then the renderQuestion function runs again to go to next question
}

let userAnswers = [];

function submitAnswer() {
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if (choice == questions[pos].answer) {
    //each time there is a correct answer this value increases
    correct++;
  } else {
  }
  // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  displayQuestion();
}

// renderQuestion();

function startTest() {
  countdown();
  displayQuestion();
}

function loadTest() {
  testStatusEl.innerHTML = "Press the Start Test button!";
  testEl.innerHTML = "<button onclick='startTest()'>Start the Test</button>";
}

loadTest();

function testEndingForm() {
  const inputForm = document.createElement("div");
  inputForm.innerHTML = `
  <label for="fname">Score:</label><br>
  <input type="text" id="score" name="score"><br>
  <label for="lname">Name:</label><br>
  <input type="text" id="name" name="name">
  <button id="submit"> Submit and Restart Test
  `;
  console.log(inputForm);
  timerEl.appendChild(inputForm);
  submitScore();
}

function submitScore() {
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (event) {
    const score = document.getElementById("score").value;
    const name = document.getElementById("name").value;

    scores.push(score);
    names.push(name);

    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("names", JSON.stringify(names));

    console.log(score, name);
    startTest();
  });
}

function displayScores() {
  const scoreSheet = document.createElement("div");
  const allScores = JSON.parse(localStorage.getItem("scores"));
  const allNames = JSON.parse(localStorage.getItem("names"));
  const h3 = document.createElement("h3");
  h3.textContent = "High Scores:";

  scoreSheet.appendChild(h3);
  for (let i = 0; i < allScores.length; i++) {
    scoreSheet.innerHTML += `<p> Score: ${allScores[i]} Name: ${allNames[i]}`;
  }

  console.log(allScores);
  console.log(allScores.length);

  testEl.appendChild(scoreSheet);
}
