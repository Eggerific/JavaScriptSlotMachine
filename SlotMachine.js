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


let balance = deposit(); // allows the change of value
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);