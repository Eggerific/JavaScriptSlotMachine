// 1. deposit some money
// 2. determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if they won
// 6. give user their winnings
// 7. play again

//function deposit() {
  //  return 1
//}

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

// create object in js, dont need "" in js
const SYMBOLS_COUNT = {A: 2, B: 4, C: 6, D: 8}
const SYMBOL_VALUES = {A: 5, B: 4, C: 3, D: 2}

const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        // takes string from number and converts to float
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true) {
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
};

//spin machine, random
const spin = () => {
    const symbols = [];
    // loop through all entries
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbol.push(symbol); // push is append in python
        }
    }

        const reels = [[], [], []];
        for (let i = 0; i < COLS; i++){
            const reelSymbols = [...symbols]; // copy reels into different array
            for (let j = 0; j < ROWS; j++){
                // math random: 1, 0 times is but how many reels we have -1
                // round down with math.floor
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol); // add to copied array
                reelSymbols.splice(randomIndex, 1); // remove one element
            }
        }

};


let balance = deposit(); // allows the change of value
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);