const fs = require("fs");
const data = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);

let aim = 0;
let horPos = 0;
let depth = 0;

data.forEach((comm) => {
    if (comm.split(" ")[0] === "forward") {
        const val = parseInt(comm.split(" ")[1]);
        horPos += val;
        depth += aim * val;
    } else if (comm.split(" ")[0] === "up") {
        const val = parseInt(comm.split(" ")[1]);
        aim -= val;
    } else if (comm.split(" ")[0] === "down") {
        const val = parseInt(comm.split(" ")[1]);
        aim += val
    }
})
// console.log(aim, horPos, depth) 
const solution = horPos * depth;
console.log(solution)