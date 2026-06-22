"use strict";
// 1. Get deposit
// 2. Get number of lines to bet on
// 2. Get bet per line
Object.defineProperty(exports, "__esModule", { value: true });
const prompt = require('prompt-sync')();
const ROWS = 3;
const COLS = 3;
//function for getting deposits
const getDeposit = () => {
    while (true) {
        const deposit = prompt("How much would you like to deposit: ");
        if (deposit === null)
            continue;
        const depositNum = parseFloat(deposit);
        if (Number.isNaN(depositNum) || depositNum < 0) {
            console.log("Please input a valid deposit.");
            continue;
        }
        balance += depositNum;
        return depositNum;
    }
};
//function for getting Rows
const getRows = () => {
    while (true) {
        const rows = prompt("How many rows are you betting (1-3)?: ");
        if (rows === null)
            continue;
        const rowsNum = parseFloat(rows);
        if (Number.isNaN(rowsNum) || rowsNum < 0 || rowsNum > 3) {
            console.log("Please input a valid deposit.");
            continue;
        }
        return rowsNum;
    }
};
//function for getting Rows
const getBet = () => {
    while (true) {
        const bet = prompt("How much are you betting per line?: ");
        if (bet === null)
            continue;
        const betNum = parseFloat(bet);
        if (Number.isNaN(betNum) || betNum < 0) {
            console.log("Please input a valid deposit.");
            continue;
        }
        return betNum;
    }
};
let balance = 0;
const deposit = getDeposit();
const rows = getRows();
const bet = getBet();
console.log(`You deposited ${deposit}`);
console.log(`You are betting ${bet} on ${rows} rows`);
console.log(`You have a balance of ${balance}`);
//# sourceMappingURL=main.js.map