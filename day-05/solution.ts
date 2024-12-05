import * as fs from 'fs';

const filePath = "./input";
if (!filePath) {
    console.error('Input file not found.');
    process.exit(1);
}

const lines = fs.readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(line => line.length > 0);

const rules = lines.filter(line => line.includes('|')).map(line => line.split('|').map(l => parseInt(l)));
const updates = lines.filter(line => !line.includes('|')).map(line => line.split(',').map(l => parseInt(l)));

//group all rules by the first value
const rulesGrouped = rules.reduce((acc, rule) => {
    const index = acc.findIndex((r: [number, number[]]) => r[0] === rule[0]);
    if (index === -1) {
        acc.push([rule[0], [rule[1]]]);
    } else {
        acc[index][1].push(rule[1]);
    }
    return acc;
}, [] as [number, number[]][]);


const orderedRules: number[] = [];
rulesGrouped.forEach(rule => {
    const lowestIndex = orderedRules.findIndex(value => rule[1].includes(value));
    if (lowestIndex === -1) {
        // Collection doesnt contain any of the values in rule[1], so we add it at the end
        orderedRules.push(rule[0]);
    } else {
        // Collection contains some of the values in rule[1], so we add it right before the first value that exists in rule[1]
       orderedRules.splice(lowestIndex, 0, rule[0]);
    }
});

console.log(orderedRules);