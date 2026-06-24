// 1. Get deposit
// 2. Get number of lines to bet on
// 2. Get bet per line



const prompt = require('prompt-sync')();
// Optional Fix: prompt-sync usually won't return null, so the null checks below may be unnecessary.

const ROWS: number = 3;
const COLS: number = 3;

type SymbolCount = {
    symbol: string;
    count: number;
    value: number;
}

const SYMBOL_COUNTS: SymbolCount[] = [
    { symbol: "🍒", count: 20, value: 1},
    { symbol: "🍋", count: 5, value: 5},
    { symbol: "🍌", count: 4, value: 10},
    { symbol: "💎", count: 3, value: 20},
];



//function for getting deposits
const getDeposit = (): number => {
    while(true) {
        const deposit: string = prompt("How much would you like to deposit: ");

        const depositNum: number = parseFloat(deposit)


        // Optional Fix: require depositNum > 0 if a zero deposit should be rejected.
        if (Number.isNaN(depositNum) || depositNum < 0) {
            console.log("Please input a valid deposit.");
            continue;
        } 
        return depositNum; 
    }  
    
    
}

//function for getting Rows to be bet on
const getRows = (): number => {
    while(true) {
        const rows: string = prompt("How many rows are you betting (1-3)?: ");

        // Optional Fix: use integer validation here if rows should only accept whole numbers.
        const rowsNum: number = parseFloat(rows)


        
        if (Number.isNaN(rowsNum) || rowsNum <= 0 || rowsNum > 3)  {
            console.log("Please input (1-3).");
            continue;
        } 
            
        return rowsNum; 
        
    }  
    
    
}

//function for getting the per line bet
const getBet = (rowsIn: number, balanceIn: number): number => {
    while(true) {
        const bet: string = prompt("How much are you betting per line?: ");

        // Optional Fix: use integer validation here if bet per line should be a whole number.
        const betNum: number = parseFloat(bet)

        const totalBet: number = betNum * rowsIn;

        if (Number.isNaN(totalBet) || totalBet <= 0 || totalBet > balanceIn)  {
            console.log("Please input a valid bet. ");
            continue;
        } 
            
        return betNum; 
        
    }
}

//function for generating a slot machine spin.
const spinSlots = () => {
    //populate array of possible symbols
    const symbols: string[] = [];
    for (const item of SYMBOL_COUNTS) {
        for (let i = 0; i < item.count; i++) {
            symbols.push(item.symbol);
        }
    }
    
    //DEBUG: console.log(symbols)

    const result: string[][] = []
    for (let i: number = 0; i < ROWS; i++) {
        const row: string[] = [];
        for (let j: number = 0; j < COLS; j++) {
            if (symbols.length === 0) break;
            const index: number = Math.floor(Math.random()* symbols.length)
            const removed: string[] = symbols.splice(index, 1);
            const value: string = removed[0]!

            if (value !== undefined) {
                row.push(value);
            }
            
            //DEBUG: console.log(`Populated [${i}][${j}]`);
        }
        result.push(row);
    }
    
    return result;
}

//function for grabbing value by symbol
const getValueBySymbol = (symbol: string): number => {
    for (const item of SYMBOL_COUNTS) {
        if (item.symbol === symbol) {
            return item.value;
        }
    }
    return 0;
}

// Function for determining winnings.
// Optional Fix: balanceIn is unused here, so remove it or use it in the payout calculation.
const getWinnings = (spin: string[][], rowsBet: number, betIn: number): number => {
    let linesWon: number = 0;
    let winnings: number = 0;
    //const allSame = <T>(arr: readonly T[]): boolean => arr.every(value => value === arr[0]);
    
    for (const [i, row] of spin.entries()) {
        if (row[0] === row[1] && row[1] === row[2] && i < rowsBet) {
            linesWon++
            // Fix: accumulate winnings per winning line and ensure the spin cost is handled every round.
            winnings += betIn * getValueBySymbol(row[0]!);
        }

    }
    if (linesWon === 0) {
        winnings -= rowsBet*betIn;
    }
    console.log(`You won ${winnings} on ${linesWon} lines`);
    return winnings;
}


//function for getting deposits
const getNextStep = (): string => {
    while(true) {
        const nextStep: string = prompt("Would you like to play again? (y/n): ");
        
        if (nextStep === null) continue;


        if ( nextStep.toUpperCase() !== "Y" && nextStep.toUpperCase() !== "N") {
            console.log("Please input a valid choice.");
            continue;
        } 
        return nextStep.toUpperCase(); 
    }  
    
    
}



let balance: number = 0;

while (true) {
    console.clear();
    console.log(`Your current balance is: ${balance}`);
    const deposit: number = getDeposit();
    balance += deposit;    
    const rows: number = getRows();
    const bet: number = getBet(rows, balance);
    balance -= rows * bet;
    const spinResult: string[][] = spinSlots();

    //console.log(`You deposited ${deposit}`);
    console.log(`You are betting ${bet} on ${rows} rows`);
    console.log (`You have a balance of ${balance}`)
    for (const resultRow of spinResult) {
        let output: string = "";
        for (let i = 0; i < COLS; i++) {
            output += resultRow[i];
            if (i < 2) {
                output += " | "
            }
        }        
        console.log(output);
    }

    const winnings: number = getWinnings(spinResult, rows, bet);
    balance += winnings

    console.log(`Your current balance is ${balance}`);

    if (balance > 0) {
        const decision = getNextStep();
        if (decision === "N") {
            console.log("Thanks for playing!");
            break;
        }
    } else {
        console.log("Game over! Thanks for playing!");
        break;
    }    
}