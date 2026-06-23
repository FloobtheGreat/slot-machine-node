// 1. Get deposit
// 2. Get number of lines to bet on
// 2. Get bet per line



const prompt = require('prompt-sync')();

const ROWS: number = 3;
const COLS: number = 3;

type SymbolCount = {
    symbol: string;
    count: number;
}

const SYMBOL_COUNTS: SymbolCount[] = [
    { symbol: "🍒", count: 8},
    { symbol: "🍋", count: 5},
    { symbol: "🍌", count: 4},
    { symbol: "💎", count: 3},
];



//function for getting deposits
const getDeposit = (): number => {
    while(true) {
        const deposit: string = prompt("How much would you like to deposit: ");
        
        if (deposit === null) continue;

        const depositNum: number = parseFloat(deposit)


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

        if (rows === null) continue;

        const rowsNum: number = parseFloat(rows)


        if (Number.isNaN(rowsNum) || rowsNum < 0 || rowsNum > 3)  {
            console.log("Please input a valid deposit.");
            continue;
        } 
            
        return rowsNum; 
        
    }  
    
    
}

//function for getting Rows
const getBet = (rows: number, balance: number): number => {
    while(true) {
        const bet: string = prompt("How much are you betting per line?: ");

        if (bet === null) continue;

        const betNum: number = parseFloat(bet)

        const totalBet: number = betNum * rows;

        if (Number.isNaN(totalBet) || totalBet <= 0 || totalBet > balance)  {
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

let balance: number = 0;

const deposit: number = getDeposit();
balance += deposit;
console.log(`Your current balance is: ${balance}`);
const rows: number = getRows();
const bet: number = getBet(rows, balance);
const spinResult: string[][] = spinSlots();

//console.log(`You deposited ${deposit}`);
//console.log(`You are betting ${bet} on ${rows} rows`);
//console.log (`You have a balance of ${balance}`)
for (let i = 0; i < spinResult.length; i++) {
    console.log(spinResult[i])
}
