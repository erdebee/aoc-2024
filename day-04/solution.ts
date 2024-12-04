import * as fs from 'fs';

const filePath = "./input";
if (!filePath) {
    console.error('Input file not found.');
    process.exit(1);
}

const lines = fs.readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(line => line.length > 0);


const matrix = lines.map(line => line.split(''));
const matrixWidth = matrix[0].length;
const matrixHeight = matrix.length;


const searchXmas = (x: number, y: number, dx: number, dy: number, matrix: string[][], searchString: string[]) => {
    if (matrix[y][x] === searchString[0]) {
        if (searchString.length === 1) {
          return true;
        }else if (x + dx < matrixWidth && y + dy < matrixHeight && x + dx >= 0 && y + dy >= 0){
          return searchXmas(x + dx, y + dy, dx, dy, matrix, searchString.slice(1));
        }else{
          return false;
        }
    }
    return false;
}

let xmasCount = 0;
for (const [lineIndex, line] of matrix.entries()) {
    for (const [charIndex, char] of line.entries()) {
        if (char === 'X') {
            const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            for (const [dx, dy] of directions) {
                if (searchXmas(charIndex, lineIndex, dx, dy, matrix, 'XMAS'.split(''))) {
                    xmasCount++;
                }
            }
        }
    }
}

//Solution 1
console.log(xmasCount);

let masCount = 0;
for (const [y, line] of matrix.entries()) {
    for (const [x, char] of line.entries()) {
        if (char === 'A') {
            if (y > 0 && y < matrixHeight - 1 && x > 0 && x < matrixWidth - 1) {
                if (
                    (
                        (matrix[y - 1][x - 1] === 'M' && matrix[y + 1][x + 1] === 'S') ||
                        (matrix[y - 1][x - 1] === 'S' && matrix[y + 1][x + 1] === 'M')
                    ) && (
                        (matrix[y + 1][x - 1] === 'M' && matrix[y - 1][x + 1] === 'S') ||
                        (matrix[y + 1][x - 1] === 'S' && matrix[y - 1][x + 1] === 'M')
                    ) ){
                        masCount++;
                    }
            }
        }
    }
}

//Solution 2
console.log(masCount);