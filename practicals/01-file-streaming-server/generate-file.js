const fs = require('fs');

const writable = fs.createWriteStream('./sample.txt');
console.log('generating file...');

for (let i = 0; i < 1e6; i++) {
  writable.write(`line ${i} - dummy text for streaming tests\n`);
}

writable.end();
console.log('done.');
