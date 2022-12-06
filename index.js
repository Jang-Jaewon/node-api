const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url) // 요청 경로를 확인 가능

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!\n');
    } else if (req.url === '/users') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User List');
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});