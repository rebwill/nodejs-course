const fs = require('fs');
const http = require('http');
const url = require('url');


/////////////////////////////
// FILES

// Blocking, synchronous way

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // ^takes two arguments: 1st = path to file we're reading; 2nd = character encoding.
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// // ^takes two arguments: 1st = path to file we're writing to; 2nd = what to write.
// console.log("file written!");

// Non-blocking, asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if (err) return console.log('ERROR!');
//         // ^ in readFile method (async), we need: 1st param = path to file we want to read; 2nd param = character encoding (we're not sure if it works without it); 3rd param = callback function.
//         // ^ callback accepts 2 args, error (very common, in case there is any error) and data to be passed
//             console.log(data2);
//             fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//                     console.log(data3);

//                     fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                         console.log("Your file has been written!");
//                     });
//                 });
//         });
// // Translation: read start.txt and pass the content (data1 = "read-this") into the file name of the next file to be read (read-this.txt). Then console.log the content in that file ("the avocado is also used...")
// });
// console.log('Will read file');

/////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');// we can use the sync version here because this is only called once at the beginning, to load the file and then it doesn't happen again.
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {       // each time a new request hits the server, this callback function will be called. Res is the response object.
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview' ) {
        res.end("This is the OVERVIEW");
    } else if (pathName === '/product') {
        res.end("This is the PRODUCT");
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h1>This page could not be found.</h1>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});
