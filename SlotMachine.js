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
            symbols.push(symbol); // push is append in python
        }
    }

        const reels = [];
        for (let i = 0; i < COLS; i++){
            reels.push([]);
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

    return reels;
};

//TRANSPOSING REELS
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows
;}

const printRows = (rows) => {
    // looping through array
    for (const row of rows){
        let rowString = "A";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbol[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const game = () => {

    let balance = deposit(); // allows the change of value


    while (true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You Won, $" + winnings.toString() + "!");

        if (balance <= 0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }
}