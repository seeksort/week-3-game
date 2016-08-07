var states = ["Alabama", "Alaska",  "Arizona",  "Arkansas",  "California",  "Colorado",  "Connecticut",  "Delaware",  "Florida",  "Georgia",  "Hawaii",  "Idaho",  "Illinois",  "Indiana",  "Iowa",  "Kansas",  "Kentucky",  "Louisiana",  "Maine",  "Maryland",  "Massachusetts",  "Michigan",  "Minnesota",  "Mississippi",  "Missouri",  "Montana",  "Nebraska",  "Nevada",  "New Hampshire",  "New Jersey",  "New Mexico",  "New York",  "North Carolina",  "North Dakota",  "Ohio",  "Oklahoma",  "Oregon",  "Pennsylvania",  "Rhode Island",  "South Carolina",  "South Dakota",  "Tennessee",  "Texas",  "Utah",  "Vermont",  "Virginia",  "Washington",  "West Virginia",  "Wisconsin",  "Wyoming", "Washington DC", "Puerto Rico", "Guam", "Northern Marianas", "United States Virgin Islands", "American Samoa"]
        
var pacific = ["Alaska", "Hawaii"];
var west = ["Arizona", "California", "Colorado", "Idaho",  "Montana", "Nevada", "New Mexico", "Oregon", "Utah", "Washington", "West Virginia", "Wyoming"];
var midwest = ["Illinois",  "Indiana",  "Iowa",  "Kansas", "Michigan",  "Minnesota", "Nebraska", "North Dakota",  "Ohio", "South Dakota", "Wisconsin"];
var northeast = ["Connecticut", "Maine",  "Massachusetts", "New Hampshire",  "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"];
var south = ["Alabama", "Arkansas", "Delaware", "Florida",  "Georgia", "Kentucky",  "Louisiana", "Maryland", "Mississippi",  "Missouri", "North Carolina", "Oklahoma", "South Carolina", "Tennessee",  "Texas", "Virginia"];
var capitol = ["Washington DC"];
var inhabitedTerritories = ["Puerto Rico", "Guam", "Northern Marianas", "United States Virgin Islands", "American Samoa"];

function chooseWord() {
	var indexRand = Math.floor(Math.random() * 56);
	// return states[indexRand].toUpperCase();
	return states[54]; // left off here, testing guesses length
}
// Display: a _ mer _  _ a
// currentWordarray: ["A" "M" "E" "R" "I" "C" "A"]
// DisplayArray: ["A" " _ " "E" "R" " _ " " _ " "A"]

function initialDisplayCurrentWord() {
	for (i = 0; i < currentWordArray.length; i++)
		if (currentWordArray[i] == " ") {
			displayArray.push(" ");
		} else {
			displayArray.push(" _ ");
		}
	console.log("Display Array: " + displayArray);
	currentWordDisplay = displayArray.join("");
	return currentWordDisplay;
}
function getCurrentLetter(event){;
	if (gameActive) {
		currentLetter = event.key.toUpperCase();
		console.log(currentLetter);
		isLetterInDisplay(currentLetter);
	}	
}
function isLetterInDisplay(currentLetter) {
	if ((displayArray.indexOf(currentLetter) === -1) && (alreadyGuessed.indexOf(currentLetter) === -1) && (currentLetter.length == 1) && (currentLetter.search(/[A-Z]/) > -1)) { // TODO Regex not working!! only filters 1st letter!
		isLetterInCurrentWord(currentLetter);
	} 
}
function isLetterInCurrentWord(currentLetter) {
	if (currentWordArray.indexOf(currentLetter) > -1) {
		updateDisplayCurrentWord(currentLetter);
	} else {
		alreadyGuessed.push(currentLetter);
		currentGuesses -= 1;
		isGameActive()
		console.log("Game Status: " + gameActive);
		console.log("Current Guesses: " + currentGuesses);
	}
}
function updateDisplayCurrentWord(currentLetter) {
	var displayUpdate = "";
	for (j = 0; j < currentWordArray.length; j++) {
		if (currentLetter == currentWordArray[j]) {
			displayArray.splice(j, 1, currentLetter);
		} 
	}
	currentGuesses -= 1;
	isGameActive()
	console.log("Game Status: " + gameActive);
	currentWordDisplay = displayArray.join("");
	console.log("Current Guesses: " + currentGuesses);
	console.log("New Display Array: " + displayArray);
	console.log("Current Word Display: " + currentWordDisplay)
}
function isGameActive() {
	if (currentGuesses == 0) {
		gameActive = false;
		// code for game over display
	}
}


var currentWord = chooseWord();
var currentWordArray = currentWord.split("");
var displayArray = [];
var currentWordDisplay = "";
var currentLetter = "";
var defaultGuesses = 20;
var currentGuesses = 20;
var wins = 0;
var alreadyGuessed = [];
var gameActive = true;

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
var total = pacific.concat(west,midwest,northeast,south,capitol,inhabitedTerritories)
console.log("total: " + total.length);
*/


