const fs = require("fs");
const data = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < data[0].length; i++) {
    const numOf1 = data.map(bin => bin[i]).filter(num => num === "1").length
    const numOf0 = data.map(bin => bin[i]).filter(num => num === "0").length
    const max = numOf1 > numOf0 ? "1" : "0";
    const min = numOf1 > numOf0 ? "0" : "1";
    gammaRate += max;
    epsilonRate += min;
}

function binToDec(b) {
    const dec = parseInt(b, 2);
    return dec;
}

const decG = binToDec(gammaRate);
const decE = binToDec(epsilonRate);
console.log(decG * decE)