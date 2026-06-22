// 1. Get deposit
// 2. Get number of lines to bet on
// 2. Get bet per line



const prompt = require('prompt-sync')();

const ROWS: number = 3;
const COLS: number = 3;

const SYMBOLS: { A: number, B: number, C: number, D: number} =  {
    A : 3,
    B : 4,
    C : 5,
    D : 8
}

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

        balance += depositNum;
        return depositNum; 
    }  
    
    
}

//function for getting Rows
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
const getBet = (): number => {
    while(true) {
        const bet: string = prompt("How much are you betting per line?: ");

        if (bet === null) continue;

        const betNum: number = parseFloat(bet)


        if (Number.isNaN(betNum) || betNum < 0)  {
            console.log("Please input a valid deposit.");
            continue;
        } 
            
        return betNum; 
        
    }  
    
    
}

let balance: number = 0;

const deposit: number = getDeposit();
const rows: number = getRows();
const bet: number = getBet();

console.log(`You deposited ${deposit}`);
console.log(`You are betting ${bet} on ${rows} rows`);
console.log (`You have a balance of ${balance}`)