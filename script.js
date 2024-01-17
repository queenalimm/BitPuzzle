document.addEventListener("DOMContentLoaded", function () {
    let players = [];

    class Player {
        constructor(nickname) {
            this.nickname = nickname;
            this.score = 0;
            this.blockchainStrength = 0;
            this.transactionCount = 0;
            this.puzzleCode = null;
            this.blockCode = null;
        }
    }

    function findPlayer(nickname) {
        return players.find(player => player.nickname === nickname);
    }

    function getPlayer(nickname) {
        let player = findPlayer(nickname);
        if (!player) {
            player = new Player(nickname);
            players.push(player);
        }
        return player;
    }

    function savePlayerData() {
        localStorage.setItem('players', JSON.stringify(players));
    }

    function loadPlayerData() {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            players = JSON.parse(savedPlayers);
        }
    }

    function updateScoreboard() {
        const currentPlayer = getCurrentPlayer();
        if (currentPlayer) {
            const scoreboard = document.getElementById('scoreboard');
            scoreboard.textContent = `Score: ${currentPlayer.score} | Blockchain Strength: ${currentPlayer.blockchainStrength}`;
        }
    }

    function getCurrentPlayer() {
        const nicknameInput = document.getElementById('nickname');
        if (nicknameInput && nicknameInput.value.trim() !== "") {
            return getPlayer(nicknameInput.value.trim());
        } else {
            alert("Invalid nickname. Please enter a nickname.");
            return null;
        }
    }

    function displayOutput(message) {
        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            outputDiv.textContent = message;
        }
    }

    function clearSignatureCanvas() {
        const canvas = document.getElementById('signature-canvas');
        if (canvas) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    function showGameRules() {
        const rules = "Welcome to BitPuzzle!\n\nHere are the game rules:\n\n1. Solve puzzles to earn points.\n2. Increase your blockchain strength by mining blocks.\n3. Secure transactions using your blockchain strength.\n4. Have fun and enjoy the game!";
        alert(rules);
    }

    const startGameBtn = document.getElementById('startGameBtn');
    const solvePuzzleBtn = document.getElementById('solvePuzzleBtn');
    const mineBlockBtn = document.getElementById('mineBlockBtn');
    const secureTransactionBtn = document.getElementById('secureTransactionBtn');
    const gameRulesBtn = document.getElementById('gameRulesBtn');
    const gameButtons = document.querySelectorAll('.game-button');

    startGameBtn.addEventListener('click', startGame);
    solvePuzzleBtn.addEventListener('click', solvePuzzle);
    mineBlockBtn.addEventListener('click', mineBlock);
    secureTransactionBtn.addEventListener('click', secureTransaction);
    gameRulesBtn.addEventListener('click', showGameRules);

    //Click event listeners to each button
    gameButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Call a function to handle button click
            handleButtonClick(this);
        });
    });

    function handleButtonClick(clickedButton) {
        // Reset styles for all buttons
        gameButtons.forEach(button => {
            button.classList.remove('active'); // Remove the 'active' class
            button.style.backgroundColor = '#e91e63'; // Reset background color
            button.style.color = '#fff'; // Reset font color
        });

        // Styles for the clicked button
        clickedButton.classList.add('active'); // Add the 'active' class
        clickedButton.style.backgroundColor = '#000'; // Change background color
        clickedButton.style.color = '##e91e63'; // Change font color

        // Call the corresponding function based on the clicked button
        switch (clickedButton.id) {
            case 'startGameBtn':
                startGame();
                break;
            case 'solvePuzzleBtn':
                solvePuzzle();
                break;
            case 'secureTransactionBtn':
                secureTransaction();
                break;
            case 'mineBlockBtn':
                mineBlock();
                break;
            default:
                break;
        }
    }

    // Function to display the game rules modal
    function showGameRules() {
        const modal = document.getElementById('rulesModal'); // Update the ID to match HTML
        modal.style.display = 'block';

        const span = document.getElementsByClassName('close')[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = 'none';
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

function resetGame() {
    currentPlayer = null;
    usedPhrases = [];
    currentQuestionNumber = 1;

    // Reset player data
    players.forEach(player => {
        player.score = 0;
        player.blockchainStrength = 0;
        player.transactionCount = 0;
        player.puzzleCode = null;
        player.blockCode = null;
    });

    // Clear local storage
    localStorage.removeItem('players');

    // Clear output and update scoreboard
    displayOutput("Game reset. Enter a nickname and start a new game.");
    updateScoreboard();
}

    let currentPlayer;

    function startGame() {
    resetGame();

    currentPlayer = getCurrentPlayer();
        if (!currentPlayer) return;

        currentPlayer.score = 0;
        currentPlayer.blockchainStrength = 0;
        currentPlayer.transactionCount = 0;
        currentPlayer.puzzleCode = null;
        currentPlayer.blockCode = null;

        displayOutput(`Hi ${currentPlayer.nickname}, welcome to BitPuzzle! Your blockchain journey begins...`);
        clearSignatureCanvas();
        updateScoreboard();
    }



const phrases = [
    { phrase: "I LOVE CRYPTOGRAPHY", points: 10 },
    { phrase: "ENCRYPT ME", points: 10 },
    { phrase: "SOLVE THE MYSTERY", points: 10 },
    { phrase: "CRACK THE CODE", points: 10 },
    { phrase: "DIFFIE-HELLMAN", points: 10 },
];

let usedPhrases = [];
let currentQuestionNumber = 1; // Add a variable to track question number

function generateRandomPhrase() {
    // If all phrases have been used, return null
    if (usedPhrases.length === phrases.length) {
        return null;
    }

    let randomIndex;

    // Keep generating a random index until an unused question is found
    do {
        randomIndex = Math.floor(Math.random() * phrases.length);
    } while (usedPhrases.includes(randomIndex));

    // Get the question at the randomly selected index
    const question = phrases[randomIndex];

    // Mark the question as used
    usedPhrases.push(randomIndex);

    // Return an object containing both the question and its number
    return { questionNumber: currentQuestionNumber++, ...question };
}

function encryptPhrase(phrase, shift) {
    return phrase.split('').map(char => encryptChar(char, shift)).join('');
}

function encryptChar(char, shift) {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) { // Uppercase letters
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    }
    return char;
}

// SOLVE PUZZLE

function solvePuzzle() {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer) return;

    const pointsPerQuestion = 10;
    const targetScore = 50;
    const maxAttemptsPerQuestion = 3;
    let totalScore = 0;
    let puzzleCode = null;

    while (totalScore < targetScore) {
        const { questionNumber, phrase, points } = generateRandomPhrase();
        const encryptionShift = Math.floor(Math.random() * 25) + 1;
        const encryptedWord = encryptPhrase(phrase, encryptionShift);

        let attempts = 0;
        let userGuess = null;

        while (attempts < maxAttemptsPerQuestion) {
            userGuess = prompt(`Question ${questionNumber}: Decrypt the following word:\n\n${encryptedWord}\n\nHint: The original phrase was encrypted using a Caesar cipher with a shift of ${encryptionShift}.\n\nYour Answer:`);

            if (!userGuess) {
                displayOutput(`Puzzle-solving session ended. Your current score is ${currentPlayer.score}.`);
                return;
            }

            if (userGuess.trim().toLowerCase() === phrase.toLowerCase()) {
                totalScore += pointsPerQuestion;
                currentPlayer.score += pointsPerQuestion;
                displayOutput(`Correct! +${pointsPerQuestion} points. Your current score is ${currentPlayer.score}.`);
                updateScoreboard();
                clearSignatureCanvas();

                // Check if the target score is reached
                if (totalScore >= targetScore) {
                    puzzleCode = "4037BELH";
                    displayOutput(`Congratulations! You've reached ${targetScore} points.`);
                    displayOutput(`Here is your puzzle code: ${puzzleCode}. REMEMBER this code to secure your transaction. Proceed to Mine Block to continue your journey.`);
                    return;
                }

                break;
            } else {
                attempts++;

                if (attempts < maxAttemptsPerQuestion) {
                    displayOutput(`Incorrect answer. ${maxAttemptsPerQuestion - attempts} attempts remaining.\nDecrypt the following word:\n\n${encryptedWord}\nYour Answer:`);
                }
            }
        }
    }

    // If the loop completes and the target score is not reached
    displayOutput(`Puzzles incomplete! Try again next time!`);
}


const algebraQuestionsWithAnswers = [
    { question: "Solve for x: (2x + 5) - 3 = 10 (Provide your answer in whole number)", answer: "4" },
    { question: "Solve for y: 4y + (7 - 2y) = 18 (Provide your answer as rounded decimal)", answer: "5.5" },
    { question: "Solve for a: (3a - 2) * 5 = 25 (Provide your answer as fraction)", answer: "7/3" },
    { question: "Solve for b: 2b + 4 = (6 - b) * 3 (Provide your answer as rounded decimal)", answer: "2.8" },
    { question: "Solve for c: 8 + 2c = (5c + 3) - 1 (Provide your answer in whole number)", answer: "2" },
];

let usedAlgebraQuestions = [];

function generateRandomAlgebraQuestion() {
    // If all questions have been used, return null
    if (usedAlgebraQuestions.length === algebraQuestionsWithAnswers.length) {
        return null;
    }

    let randomIndex;

    // Keep generating a random index until an unused question is found
    do {
        randomIndex = Math.floor(Math.random() * algebraQuestionsWithAnswers.length);
    } while (usedAlgebraQuestions.includes(randomIndex));

    // Get the question at the randomly selected index
    const question = algebraQuestionsWithAnswers[randomIndex];

    // Mark the question as used
    usedAlgebraQuestions.push(randomIndex);

    return question;
}

// MINE BLOCK

function mineBlock() {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer) return;

    displayOutput(`Mining Block: Answer the following algebra questions to mine the block. You have two chances for each question.`);

    let correctAnswers = 0;

    while (correctAnswers < 5) {
        const shuffledQuestions = [...algebraQuestionsWithAnswers].sort(() => Math.random() - 0.5);

        for (const { question, answer } of shuffledQuestions) {
            let attempts = 0;

            while (attempts < 2) {
                const userAnswer = prompt(question);

                if (userAnswer && userAnswer.trim() === answer) {
                    currentPlayer.score += 20;
                    currentPlayer.blockchainStrength += 10;
                    correctAnswers++;

                    displayOutput(`Correct! +20 points, +10 blockchain strength. Your current score is ${currentPlayer.score}.`);

                    // Check if the target blockchain strength is reached
                    if (currentPlayer.blockchainStrength >= 50) {
                        const blockCode = "1997BPCT";
                        displayOutput(`Congratulations! You reached a blockchain score of 50. Here is your block code: ${blockCode}. REMEMBER this code to secure your transaction.`);
                        updateScoreboard();
                        clearSignatureCanvas();
                        return; // Exit the function if the target blockchain strength is reached
                    }

                    updateScoreboard();
                    clearSignatureCanvas();
                    break; // Exit the loop if the answer is correct
                } else if (userAnswer === null) {
                    // Player gave up by pressing cancel
                    displayOutput("You gave up. Block not mined.");
                    updateScoreboard();
                    clearSignatureCanvas();
                    return; // Exit the function if the player gives up
                } else {
                    attempts++;
                    displayOutput(`Incorrect answer. ${2 - attempts} attempts remaining. Try again!`);
                }
            }
        }
    }

    // If the loop completes, it means the player answered all 5 questions correctly
    displayOutput("You mined all blocks successfully!");
    updateScoreboard();
    clearSignatureCanvas();
}






// SECURE TRANSACTION
function secureTransaction() {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer) return;

    const correctPuzzleCode = "4037BELH";
    const correctBlockCode = "1997BPCT";

    const userPuzzleCode = prompt("Enter your puzzle code:");
    const userBlockCode = prompt("Enter your block code:");

    if (userPuzzleCode === correctPuzzleCode && userBlockCode === correctBlockCode) {
        currentPlayer.score += 15;
        displayOutput("Transaction secured! +15 points.");
    } else {
        displayOutput("Transaction failed! Make sure to enter correct and valid codes.");
        displayOutput("If you've lost your codes, retrieve them by solving puzzles and mining blocks.");
    }

    // Reset codes after either successful or failed attempts
    currentPlayer.puzzleCode = null;
    currentPlayer.blockCode = null;
    updateScoreboard();
}




});
