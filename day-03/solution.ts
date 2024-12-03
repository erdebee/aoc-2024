import * as fs from 'fs';

const filePath = "./input";
if (!filePath) {
    console.error('Input file not found.');
    process.exit(1);
}

const lines = fs.readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(line => line.length > 0);


const mulInstructions = (input: string[]) => input.map(line => {
    const match = line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
    
    return [...match].map(m => parseInt(m[1]) * parseInt(m[2]));
}).flat().reduce((acc, curr) => acc + curr, 0);

//Solution 1
console.log(mulInstructions(lines));

const allLines = lines.reduce((acc, curr) => acc + curr, '');

const filteredLines = allLines
    .replaceAll(/don\'t\(\).*?do\(\)/g,'')
    .replaceAll(/don\'t\(\).*/g,'');

//Solution 2
console.log(mulInstructions([filteredLines]));

