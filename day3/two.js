const fs = require("fs");
let oxydata = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);
let co2data = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);

let OxyGen;
let co2Srb;

function binToDec(b) {
    const dec = parseInt(b, 2);
    return dec;
}

for (let i = 0; i < oxydata[0].length; i++) {
    const numOf1 = oxydata.map(bin => bin[i]).filter(num => num === "1").length;
    const numOf0 = oxydata.map(bin => bin[i]).filter(num => num === "0").length;

    if (numOf1 > numOf0) {
        oxydata = oxydata.filter(num => num[i] === "1");
    } else if (numOf0 > numOf1) {
        oxydata = oxydata.filter(num => num[i] === "0");
    } else if (numOf1 === numOf0) {
        oxydata = oxydata.filter(num => num[i] === "1");
    } else {}

    if (oxydata.length === 1) {
        OxyGen = oxydata[0]
        break;
    }
}

for (let i = 0; i < co2data[0].length; i++) {
    const numOf1 = co2data.map(bin => bin[i]).filter(num => num === "1").length;
    const numOf0 = co2data.map(bin => bin[i]).filter(num => num === "0").length;

    if (numOf1 < numOf0) {
        co2data = co2data.filter(num => num[i] === "1");
    } else if (numOf0 < numOf1) {
        co2data = co2data.filter(num => num[i] === "0");
    } else if (numOf1 === numOf0) {
        co2data = co2data.filter(num => num[i] === "0");
    } else {}

    if (co2data.length === 1) {
        co2Srb = co2data[0]
        break;
    }
}

console.log(binToDec(OxyGen), binToDec(co2Srb))
console.log(binToDec(OxyGen) * binToDec(co2Srb))