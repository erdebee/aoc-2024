import * as fs from 'fs';



const filePath = process.argv[2];
if (!filePath) {
    console.error('Geef een bestandspad op als argument.');
    process.exit(1);
}

const lines = fs.readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(line => line.length > 0);
            


const leftList = lines.map(line => parseInt(line.substring(0,5))).sort();
const rightList =lines.map(line => parseInt(line.substring(8,13))).sort();

let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
    const distance = Math.abs(leftList[i] - rightList[i]);
    totalDistance += distance;
}

//Solution 1
console.log(totalDistance);

let totalSimilarity = 0;
for (let i = 0; i < leftList.length; i++) {
    for (let j = 0; j < rightList.length; j++) {
        if (leftList[i] === rightList[j]) {
            totalSimilarity += leftList[i];
        }
    }
}

//Solution 2
console.log(totalSimilarity);