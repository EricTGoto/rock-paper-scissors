// code is divided into the logic part and the DOM manipulation part

let playerScore = 0;
let computerScore = 0;

function playRound(e) {
    const choice = e.explicitOriginalTarget.parentElement.className;
    const computerAction = convertNumToRockPaperScissors(computerPlay());
    const capitalizedWord = capitalizeFirstLetter(choice);

    if (
        (choice == "rock" && computerAction == "scissors") || 
        (choice == "paper" && computerAction == "rock") ||
        (choice == "scissors" && computerAction == "paper")
    ) {
        playerScore++;
        result.textContent = `You win! ${capitalizedWord} beats ${computerAction}.`
    }
    else if (
        (choice == "rock" && computerAction == "paper") ||
        (choice == "paper" && computerAction == "scissors") ||
        (choice == "scissors" && computerAction == "rock")
    ) {
        computerScore++;
        result.textContent = `You lose! ${capitalizedWord} loses to ${computerAction}.`
    } 
    else {
        result.textContent = "Tie!";
    }

    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;

    if (playerScore == 5 || computerScore == 5) showWinAlert();
}

function showWinAlert() {
    if(playerScore == 5){
        notificationContainer.textContent = 'You win!';
    }
    else if (computerScore == 5){
        notificationContainer.textContent = 'You lose!';
    }
    notificationContainer.appendChild(confirmButton);
    body.appendChild(overlay);
}

function turnOffOverlay() {
    const overlay = document.querySelector('.overlay');
    body.removeChild(overlay);
    resetGame();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    result.textContent = "Click to Play!";
    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
}

function computerPlay() {
    return(Math.floor(Math.random() * 3))
}

function convertNumToRockPaperScissors(num) {
    if (num == 0) return "rock"
    else if (num == 1) return "paper"
    else return "scissors"
}

function capitalizeFirstLetter(word) {
    let firstLetter = word.substr(0,1);
    let firstLetterCapitalized = firstLetter.toUpperCase();
    let capitalizedWord = firstLetterCapitalized + word.substr(1);
    return capitalizedWord
}

const container = document.querySelector('.container');

// when buttons are pressed, a round is played
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', playRound)
})

const body = document.querySelector("body");
body.style.backgroundColor = '#9BC1BC';

const header = document.createElement('div');
header.style.backgroundColor =  '#F4F1BB';
header.style.width = '100vw';
header.style.height = '15vh';
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.justifyContent = 'center';
header.textContent = "ROCK PAPER SCISSORS";
header.style.fontSize = "30px";
header.style.fontWeight = 'bold';
header.style.fontFamily = "'Roboto', sans-serif";
body.insertBefore(header, container);

const footer = document.createElement('div');
footer.textContent = "Eric Goto 2022";
footer.style.fontSize = '16px';
footer.style.backgroundColor = '#ED6A5A';
footer.style.width = '100vw';
footer.style.height = '10vh';
footer.style.display= 'flex';
footer.style.justifyContent = 'center';
footer.style.alignItems = 'center';
body.appendChild(footer);

const result = document.querySelector(".result");
result.textContent = "Click to Play!";
result.style.fontSize = "32px";

const tally = document.createElement('div');
tally.style.display = 'flex';
tally.style.gap = "20px";
tally.style.fontSize = "30px";

const playerScoreElement = document.createElement('div');
const computerScoreElement = document.createElement('div');

tally.appendChild(playerScoreElement);
tally.appendChild(computerScoreElement);
container.appendChild(tally);

// overlay is for the alert that displays when either the player or the AI reaches 5 wins
// overlay contains the notification container which contains the play again button
const overlay = document.createElement('div');
overlay.classList.add('overlay');
overlay.style.display = 'flex';
overlay.style.flexDirection = 'column';
overlay.style.gap = '50px';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.position = 'fixed';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.fontSize = '30px';
overlay.style.backgroundColor = 'rgb(0,0,0,0.3)';
overlay.style.zIndex = '2';

const notificationContainer = document.createElement('div');
notificationContainer.style.backgroundColor = '#5D576B';
notificationContainer.style.flexBasis = 'auto';
notificationContainer.style.display = 'flex';
notificationContainer.style.width = '350px';
notificationContainer.style.height = '200px';
notificationContainer.style.gap = '30px';
notificationContainer.style.borderRadius = '8px';
notificationContainer.style.borderStyle = 'solid';
notificationContainer.style.borderWidth = 'thin';
notificationContainer.style.borderColor = 'black';
notificationContainer.style.flexDirection = 'column';
notificationContainer.textContent = 'wawaw!';
notificationContainer.style.alignItems = 'center';
notificationContainer.style.justifyContent = 'center';
notificationContainer.style.color = 'white';

const confirmButton = document.createElement('button');
confirmButton.classList.add('confirmButton');
confirmButton.textContent = 'Play Again';
confirmButton.style.fontSize = '20px';
confirmButton.style.padding = '10px 16px';
confirmButton.style.borderRadius = '8px';
confirmButton.style.backgroundColor = 'white';
confirmButton.addEventListener('click', turnOffOverlay);

overlay.appendChild(notificationContainer);
