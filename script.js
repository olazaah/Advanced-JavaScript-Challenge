// Trying out the Closure Concept
/*

function interviewQuestion(job){
    var question;
    if (job === 'designer'){
        question = ', can you please explain what UX design is?';
    } else if (job === 'teacher'){
        question = ', what subject do you teach?';
    } else{
        question = ' Hello, what do you do?';
    }
    return function(name){
        console.log(name + question);
    }
}

interviewQuestion('teacher')('john');
interviewQuestion()('Tao');
interviewQuestion('designer')('Bimpe');
interviewQuestion('Soldier')('Fasasi');

*/

/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

var currentScore = 0;

// Create the Question constructor class
class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

function getQuestionArray(){
    var question1, question2, question3, question4, question5;

    // Create the list of questions
    question1 = new Question('Who is the president of Nigeria?', ['Muhammadu Buhari', 'Joel Osteen', 'Lanre Teriba'], 1);
    question2 = new Question('What does the MIT stand for?', ['Made in Thailand', 'Massachusetts Institute of Technology', 'Mobolaji Ibikunle Taofeek'], 2);
    question3 = new Question('What phone brand provides the most expensive devices?', ['Apple', 'Samsung', 'Tecno', 'Huawei', 'Infinx'], 1);
    question4 = new Question('What type of language is Python?', ['Compiled', 'Interpreted'], 2);
    question5 = new Question('Who is the best African Artiste', ['Burna Boy', 'Davido', 'Tiwa Savage', 'Wizkid'], 4);

    // Store the questions in the question's array
    var questionArray = [question1, question2, question3, question4, question5];
    return questionArray;

}

// A function that picks a random question from the question array and prints both the question and options to the console. Also it returns the answer to a variable but not on the console
function getRandomQuestion(questionArray){
    this.questionArray = questionArray();
    var randNum = Math.floor(Math.random() * this.questionArray.length) ;
    var randQuestion = this.questionArray[randNum];
    console.log(randQuestion.question);
    for (var i = 0; i < randQuestion.options.length; i++){
        var optionNum = i + 1;
        console.log(optionNum + ' ' + randQuestion.options[i]);
    }
    var randQuestionAnswer = randQuestion.answer;
    
    return randQuestionAnswer;
}

// myAnswer = getRandomQuestion(getQuestionArray);
// console.log(myAnswer);


// The function gets user input and checks it with the stored data, prints the result and the score
function userPrompt(answer){
    var getUserAnswer = prompt("Kindly input the correct option to the question below, input 'exit' to end game: ");
    if (getUserAnswer == answer){
        console.log('Correct answer!!!!');
        currentScore += 1;
    } else{
        console.log('Wrong answer, try again......')
    }
    console.log('Your current score is ' + currentScore);
    console.log('------------------------------------');
    return getUserAnswer;
}

// This function controls the game logic
function init (){
    var startGame = prompt("Kindly type 'start' to begin").toLowerCase();
    var playGame = true;
    if (startGame !== 'start'){
        alert("You made a wrong input, Kindly reload game and input 'start' in the pop-up prompt to play the game");
    } else {
        while(playGame){
            var answer = getRandomQuestion(getQuestionArray);
    
            var trackUserInput = userPrompt(answer);

            if (trackUserInput.toLowerCase() === 'exit'){
                playGame = false
            }
        }
    }
    
    
}

init();


// SOLUTION FROM THE TUTORIAL LECTURE BELOW

/*
(function() {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        var sc;
        
        if (ans === this.correct) {
            console.log('Correct answer!');
            sc = callback(true);
        } else {
            console.log('Wrong answer. Try again :)');
            sc = callback(false);
        }
        
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('------------------------------');
    }
    
    
    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);
    
    var questions = [q1, q2, q3];
    
    function score() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }
    var keepScore = score();
    
    
    function nextQuestion() {

        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');

        if(answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            
            nextQuestion();
        }
    }
    
    nextQuestion();
    
})();
*/