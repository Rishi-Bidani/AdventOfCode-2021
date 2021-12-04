const fs = require("fs");

const data = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);

const fwd = data.filter(command => command.match(/forward \d+$/gm)).map(cmd => cmd.split(" ")[1]).map(Number);
const fwdSum = fwd.reduce((prv, sum) => prv + sum);

const up = data.filter(command => command.match(/up \d+$/gm)).map(cmd => cmd.split(" ")[1]).map(Number).reduce((prv, sum) => prv + sum);
const down = data.filter(command => command.match(/down \d+$/gm)).map(cmd => cmd.split(" ")[1]).map(Number).reduce((prv, sum) => prv + sum);
const depth = down - up;

const solution = fwdSum * depth;
console.log(solution)