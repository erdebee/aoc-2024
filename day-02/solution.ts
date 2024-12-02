import * as fs from 'fs';

const filePath = "./input";
if (!filePath) {
    console.error('Input file not found.');
    process.exit(1);
}

const lines = fs.readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(line => line.length > 0);


const reportIsSafe = (line: string): boolean => {
    const levels = line.split(' ').map(level => parseInt(level));
    
    const differences = levels.slice(1).map((level, index) => level - levels[index]);
    
    
    const isSafeIncreasing = differences.every(difference => (difference > 0 && difference <= 3));
    const isSafeDecreasing = differences.every(difference => (difference < 0 && difference >= -3));
    

    return isSafeIncreasing || isSafeDecreasing;
}

//Solution 1
console.log(lines.filter(reportIsSafe).length);

const reportIsSafe2 = (line: string): boolean => {
    const levels = line.split(' ').map(level => parseInt(level));
    
    // First check if it's safe without removing any number
    if (reportIsSafe(line)) return true;
    
    // Try removing each number one at a time
    for (let i = 0; i < levels.length; i++) {
        const newLevels = [...levels];
        newLevels.splice(i, 1);
        
        if (reportIsSafe(newLevels.join(' '))) return true;
    }
    
    return false;
}

// Solution 2
console.log(lines.filter(reportIsSafe2).length);