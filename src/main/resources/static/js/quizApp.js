//Store all the data from the quiz in an array
const quizData = [
 {
  question: "Question 1: Which Disney character wore a glass slipper?",
  options: ["Aurora", "Snow White", "Cinderella", "Jasmine"],
  answer: "Cinderella"
 },
 {
  question: "Question 2: What was the name of Simba's dad in the Lion King?",
  options: ["Mufasa", "Scar", "Musafa", "Pumba"],
  answer: "Mufasa"
 },
 {
  question: "Question 3: What were the names of the three fairies in Sleeping Beauty",
  options: ["Maybloom, Mayweather, Merryweather", "Flora, Flowers, Merryweather", "Fiona, Fauna, Mayweather", "Flora, Fauna, Merryweather"],
  answer: "Flora, Fauna, Merryweather"
 },
 {
  question: "Question 4: What was the name of the kingdom in the movie Frozen?",
  options: ["Atlantica", "Arendelle", "Villeneuve", "Frozen kingdom"],
  answer: "Arendelle"
 },
 {
  question: "Question 5: What animal was Sebastian in the Little Mermaid?",
  options: ["A fish", "A shrimp", "A crab", "A starfish"],
  answer: "A crab"
 },

];
//Create an array to store the images in
const imageData =["/css/slipper.jpg","/css/lion.jpg","/css/fairy.jpg", "/css/frozen.jpg", "/css/mermaid.jpg"];



const questionOutput = document.querySelector("#question");
const optionsOutput = document.querySelector("#options");
const imageOutput = document.querySelector('#image');
const answersOutput= document.querySelector("#answer");
const alreadyAnswered = [];
//Initialize the question number you are at in the quiz, and keep track of how many correct answers have been selected
let questionNumber = 0;
let score = 0;

//AddEventListener for each of the buttons
const prevButton= document.getElementById('previous');
prevButton.addEventListener('click',goToPrevQuestion);

const nextButton = document.getElementById('next');
nextButton.addEventListener('click',goToNextQuestion);


const submitButton = document.getElementById('submit');
submitButton.addEventListener('click',goToResult)



//Make a function that displays the question at the corresponding number in array and the options to choose from.
function displayquestion() {
 nextButton.disabled = true;
 submitButton.disabled = true;
 const question = quizData[questionNumber];
 questionOutput.innerText = question.question;
 imageOutput.src = imageData[questionNumber];
 optionsOutput.innerHTML = "";

 question.options.forEach(option => {
  const button = document.createElement("button");
  button.innerText = option;
  optionsOutput.appendChild(button);
  if (alreadyAnswered.includes(questionNumber)){
   nextButton.disabled = false;
   nextButton.classList.add("show");
  }
  button.addEventListener("click", chooseAnswer);
 });


}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Make a function that checks if the option selected was correct
function chooseAnswer(choice) {
 //Check if the question has already been answered, if so disable all the option buttons
 if (alreadyAnswered.includes(questionNumber)){
  nextButton.disabled = false;
  nextButton.classList.add("show");
 }

 else {
  nextButton.disabled = false;
  const selectedButton = choice.target;
  const answer = quizData[questionNumber].answer;
  const selectedChoice = selectedButton.innerText;

  //This selects all the options buttons
  const allOptions = optionsOutput.children;

  // Disable all options once user selects an option
  for (let i = 0; i < allOptions.length; i++) {
   allOptions[i].classList.add("disabled");
   allOptions[i].removeEventListener("click", chooseAnswer);
  }


  // Check if the selected choice is correct
  if (selectedChoice === answer) {
   score++;
   selectedButton.classList.add("correct");
   optionsOutput.insertAdjacentHTML("beforeend", `<p class="correct">Correct! Your answer is: ${selectedChoice}. The correct answer is: ${answer}</p>`);
  } else {
   selectedButton.classList.add("incorrect");
   optionsOutput.insertAdjacentHTML("beforeend", `<p class="incorrect">Incorrect. Your answer is: ${selectedChoice}.  The correct answer is: ${answer}</p>`);
  }
  //Check if we reached the last question
  if (questionNumber === quizData.length - 1) {
   submitButton.disabled = false;
   nextButton.disabled =true;
   submitButton.classList.add("show");

  } else {
   alreadyAnswered.push(questionNumber);//pushes the current questionNumber into the array that keeps track of answered questionNumbers
   nextButton.classList.add("show");
  }
 }


}

//Once quiz is complete, this function displays a message stating the final quiz score
function goToResult() {
 quiz.innerHTML = `<p>Thanks for playing Disney quiz! Your magical score is ${score} out of 5! These were the correct answers: </p>`;
 for(i=0; i < quizData.length; i++){
  const correctAnswer = quizData[i];
  quiz.innerHTML += `<p>${correctAnswer.question} ${correctAnswer.answer}</p>`;
 }
}


//This function decreases the questionNumber and moves one question backwards in the array
function goToPrevQuestion(){
 if(questionNumber>0){
  questionNumber--;
  displayquestion();
 }
}
//This function increases the questionNumber and move one question forwards in the array, if we haven't reached the end yet
function goToNextQuestion() {
 if (questionNumber < quizData.length) {
  questionNumber++;
  displayquestion();
 }
}

displayquestion();