const fs = require('fs');

// Blocking, synchronous way

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// ^takes two arguments: 1st = path to file we're reading; 2nd = character encoding.
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
// ^takes two arguments: 1st = path to file we're writing to; 2nd = what to write.
console.log("file written!");

// Non-blocking, asynchronous way

fs.readFile('./txt/start.txt', );
// ^ in readFile method (async), we need: 1st param = path to file we want to read; 2nd param = callback function.
