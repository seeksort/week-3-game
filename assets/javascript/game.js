var states = ["Alabama", "Alaska",  "Arizona",  "Arkansas",  "California",  "Colorado",  "Connecticut",  "Delaware",  "Florida",  "Georgia",  "Hawaii",  "Idaho",  "Illinois",  "Indiana",  "Iowa",  "Kansas",  "Kentucky",  "Louisiana",  "Maine",  "Maryland",  "Massachusetts",  "Michigan",  "Minnesota",  "Mississippi",  "Missouri",  "Montana",  "Nebraska",  "Nevada",  "New Hampshire",  "New Jersey",  "New Mexico",  "New York",  "North Carolina",  "North Dakota",  "Ohio",  "Oklahoma",  "Oregon",  "Pennsylvania",  "Rhode Island",  "South Carolina",  "South Dakota",  "Tennessee",  "Texas",  "Utah",  "Vermont",  "Virginia",  "Washington",  "West Virginia",  "Wisconsin",  "Wyoming", "Washington DC", "Puerto Rico", "Guam", "Northern Marianas", "US Virgin Islands", "American Samoa"]
        
var pacific = ["Alaska", "Hawaii"];
var west = ["Arizona", "California", "Colorado", "Idaho",  "Montana", "Nevada", "New Mexico", "Oregon", "Utah", "Washington", "West Virginia", "Wyoming"];
var midwest = ["Illinois",  "Indiana",  "Iowa",  "Kansas", "Michigan",  "Minnesota", "Nebraska", "North Dakota",  "Ohio", "South Dakota", "Wisconsin"];
var northeast = ["Connecticut", "Maine",  "Massachusetts", "New Hampshire",  "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"];
var south = ["Alabama", "Arkansas", "Delaware", "Florida",  "Georgia", "Kentucky",  "Louisiana", "Maryland", "Mississippi",  "Missouri", "North Carolina", "Oklahoma", "South Carolina", "Tennessee",  "Texas", "Virginia"];
var capital = ["Washington DC"];
var inhabitedTerritories = ["Puerto Rico", "Guam", "Northern Marianas", "US Virgin Islands", "American Samoa"];

var currentWord = chooseWord();
var currentWordArray = currentWord.split("");
var correctlyGuessedArray = [];
var displayArray = [];
var currentWordDisplay = "";
var currentLetter = "";
var defaultGuesses = 20;
var currentGuesses = 20;
var wins = 0;
var alreadyGuessed = [];
var alreadyGuessedDisplay = alreadyGuessed.join(" ");
var gameActive = true;
var statusMessage = "Play a new game!";

function chooseWord() {
	var indexRand = Math.floor(Math.random() * 56);
	// return states[indexRand].toUpperCase();
	return states[54].toUpperCase(); // debug: left off here, testing guesses length
}
function initialDisplayCurrentWord() {
	for (i = 0; i < currentWordArray.length; i++) {
		if (currentWordArray[i] == " ") {
			displayArray.push("&nbsp");
			correctlyGuessedArray.push(" ");
		} else {
			displayArray.push(" _ ");
			correctlyGuessedArray.push(" _ ");
		}
	}
	console.log("Display Array: " + displayArray);
	currentWordDisplay = displayArray.join("");
	isGameActive(updateHtml());
	return currentWordDisplay;
}
function getCurrentLetter(event){
	if (gameActive) {
		currentLetter = event.key.toUpperCase();
		console.log(currentLetter);
		isLetterInDisplay(currentLetter);
	}	
}
function isLetterInDisplay(currentLetter) {
	if ((displayArray.indexOf(currentLetter) === -1) && (alreadyGuessed.indexOf(currentLetter) === -1) && (currentLetter.length == 1) && (currentLetter.search(/[a-zA-Z]/) > -1)) {
		isLetterInCurrentWord(currentLetter);
	} 
}
function isLetterInCurrentWord(currentLetter) {
	if (currentWordArray.indexOf(currentLetter) > -1) {
		updateDisplayCurrentWord(currentLetter);
	} else {
		alreadyGuessed.push(currentLetter);
		currentGuesses -= 1;
		isGameActive(updateHtml());		
	}	
	console.log("Game Status: " + gameActive);
	console.log("Current Guesses: " + currentGuesses);
}
function updateDisplayCurrentWord(currentLetter) {
	var wasHtmlUpdated = false;
	var displayUpdate = "";
	for (k = 0; k < currentWordArray.length; k++) {
		if (currentLetter == currentWordArray[k]) {
			displayArray.splice(k, 1, currentLetter);
			correctlyGuessedArray.splice(k, 1, currentLetter);
		} 
	}
	currentGuesses -= 1;
	currentWordDisplay = displayArray.join("");
	console.log(currentWord);
	console.log(currentGuesses);
	console.log("Current Word Display: " + currentWordDisplay);
	isGameActive(updateHtml());	
}
function updateHtml() {
	alreadyGuessedDisplay = alreadyGuessed.join(" ");
	document.getElementById("statusMsgEl").innerHTML = statusMessage;
	document.getElementById("wordDisplayEl").innerHTML = currentWordDisplay;
	document.getElementById("winsEl").innerHTML = wins;
	document.getElementById("guessesEl").innerHTML = currentGuesses;
	document.getElementById("lettersGuessedDisplayEl").innerHTML = alreadyGuessedDisplay;
	return true;
}
function isGameActive(htmlUpdated) {
	var correctlyGuessedLetters = correctlyGuessedArray.join("");
	console.log("Correctly Guessed:")
	console.log(correctlyGuessedLetters);
	if (htmlUpdated == true) {
		if (correctlyGuessedLetters == currentWord) {
			gameActive = false;
			wins += 1;
			statusMessage = "You win! Great job! Try another one!"
			currentGuesses = defaultGuesses;
			alreadyGuessed = [];
			previousWordInfo()
			gameReset();
		} else {
			if (currentGuesses == 0) {
				gameActive = false;
				statusMessage = "You lose :( But try another one."
				currentGuesses = defaultGuesses;
				alreadyGuessed = [];
				previousWordInfo()
				gameReset();
			}
		}
	}	
}
function previousWordInfo() {
	var newNode = document.createElement("a")
	var currentWordLower = currentWord.toLowerCase();
	var wikiUrl = "https://en.wikipedia.org/wiki/" + currentWordLower;
	// newNode.innerHTML = currentWord;
	document.getElementById("previousWordInfoEl").href = wikiUrl;
	document.getElementById("previousWordInfoEl").innerHTML = currentWord;
	console.log(wikiUrl);
}
function gameReset() {
	currentWord = chooseWord();
	currentWordArray = currentWord.split("");
	correctlyGuessedArray = [];
	displayArray = [];
	currentWordDisplay = initialDisplayCurrentWord();
	currentLetter = "";
	alreadyGuessedDisplay = alreadyGuessed.join(" ");
	gameActive = true;
}

console.log("Current Letter is: " + currentLetter);
console.log(currentWordArray);
console.log(initialDisplayCurrentWord());
document.onkeyup = function(event) {
	getCurrentLetter(event);
}


/*
// Debugging
console.log(states.length);

console.log(west);
console.log(west.length);
console.log(midwest);
console.log(states.length);
console.log(northeast);
console.log(states.length);
console.log(south);
console.log(states.length);
var total = pacific.concat(west,midwest,northeast,south,capital,inhabitedTerritories)
console.log("total: " + total.length);
console.log("win?");
console.log(currentWordDisplay == currentWord);
console.log(currentWordDisplay);
console.log(currentWord);
}

console.log("Game Status: " + gameActive);

console.log("Current Guesses: " + currentGuesses);
console.log("New Display Array: ")
console.log(displayArray);
console.log("Current Word Display: " + currentWordDisplay)
console.log("Current Word Array: ")
console.log(currentWordArray)
*/


