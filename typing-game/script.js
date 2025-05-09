// inside script.js
// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'How often have I said to you that when you have eliminated the impossible, whatever remains, however improbable, must be the truth?',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const modal = document.getElementById('myModal');
const restartButton = document.getElementById('restartbtn');
const endgameMessageElement = document.getElementById('endgamemsg');
const leaderboard = document.querySelectorAll('.highscores li');
typedValueElement.style.display="none";
const topScores = [0, 0, 0, 0, 0];
var scoresShown = 0;
const mapScores = new Map();

restartButton.onclick =function () {
  modal.style.display = "none";
}

function updateLeaderboard() {
  if (scoresShown == 0){
    topScores.forEach((score, j) => {
    leaderboard[j].textContent = score;
    });
  }
  else {
    for (let i=1; i <= scoresShown; i++){
      mapScores.set(1, localStorage.getItem("First"));
      mapScores.set(2, localStorage.getItem("Second"));
      mapScores.set(3, localStorage.getItem("Third"));
      mapScores.set(4, localStorage.getItem("Fourth"));
      mapScores.set(5, localStorage.getItem("Fifth"));
      topScores[i - 1] = mapScores.get(i);
    }
    topScores.forEach((score, j) => {
    leaderboard[j].textContent = score;
  });
  }
}

function compareTime(newTime, timeCheck) {
  console.log(timeCheck);
  console.log(localStorage.getItem(timeCheck));
  console.log(((localStorage.getItem(timeCheck) === null) || (localStorage.getItem(timeCheck) === 'null') || (newTime < (localStorage.getItem(timeCheck)))));
  return ((localStorage.getItem(timeCheck) === null) || (localStorage.getItem(timeCheck) === 'null') || (newTime < (localStorage.getItem(timeCheck))));
}


function replaceTime(newTime) {
  if (compareTime(newTime, "First")){
      localStorage.setItem("Fifth", localStorage.getItem("Fourth"));
      localStorage.setItem("Fourth", localStorage.getItem("Third"));
      localStorage.setItem("Third", localStorage.getItem("Second"));
      localStorage.setItem("Second", localStorage.getItem("First"));
      localStorage.setItem("First", newTime);
      console.log("c1");
      if (scoresShown < 5) {
        scoresShown += 1;
      }
      updateLeaderboard();
  }
  else if (compareTime(newTime, "Second")){
      console.log("c2");
      localStorage.setItem("Fifth", localStorage.getItem("Fourth"));
      localStorage.setItem("Fourth", localStorage.getItem("Third"));
      localStorage.setItem("Third", localStorage.getItem("Second"));
      localStorage.setItem("Second", newTime);
      if (scoresShown < 5) {
        scoresShown += 1;
      }
      updateLeaderboard();
  }
  else if (compareTime(newTime, "Third")){
      localStorage.setItem("Fifth", localStorage.getItem("Fourth"));
      localStorage.setItem("Fourth", localStorage.getItem("Third"));
      localStorage.setItem("Third", newTime);
      if (scoresShown < 5) {
        scoresShown += 1;
      }
      updateLeaderboard();
  }
  else if (compareTime(newTime, "Fourth")){
      localStorage.setItem("Fifth", localStorage.getItem("Fourth"));
      localStorage.setItem("Fourth", newTime);
      if (scoresShown < 5) {
        scoresShown += 1;
      }
      updateLeaderboard();
  }
  else if (compareTime(newTime, "Fifth")){
      localStorage.setItem("Fifth", newTime);
      if (scoresShown < 5) {
        scoresShown += 1;
      }
      updateLeaderboard();
  }
}



updateLeaderboard();

document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    typedValueElement.style.display="inline-block";
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
    typedValueElement.addEventListener('input', () => {
      // Get the current word
      const currentWord = words[wordIndex];
      // get the current value
      const typedValue = typedValueElement.value;
    
      if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        // Display success
        const elapsedTime = ((new Date().getTime() - startTime) / 1000);
        replaceTime(elapsedTime);
        const message = `CONGRATULATIONS! You finished in ${elapsedTime} seconds.`;
        endgameMessageElement.innerText = message;
        modal.style.display="block";
        removeEventListener('input', typedValueElement);
        typedValueElement.style.display="none";
      } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
          wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
      } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
      } else {
        // error state
        typedValueElement.className = 'error';
      }
    });
    // Start the timer
    startTime = new Date().getTime();
  });

document.getElementById('quickend').addEventListener('click', () => {
  const elapsedTime = ((new Date().getTime() - startTime) / 1000);
  replaceTime(elapsedTime);
  const message = `CONGRATULATIONS! You finished in ${elapsedTime} seconds.`;
  endgameMessageElement.innerText = message;
  modal.style.display="block";
  removeEventListener('input', typedValueElement);
  typedValueElement.style.display="none";
});
  // at the end of script.js
