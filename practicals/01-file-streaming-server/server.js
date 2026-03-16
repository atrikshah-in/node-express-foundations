const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('use /stream or /read');
    return;
  }

  if (req.url === '/read') {
    fs.readFile('./sample.txt', (err, data) => {
      if (err) return res.end('err');
      res.end(data);
    });
    return;
  }

  if (req.url === '/stream') {
    const stream = fs.createReadStream('./sample.txt');
    stream.pipe(res);
    stream.on('error', () => res.end('err'));
    return;
  }

  res.statusCode = 404;
  res.end('not found');
});

server.listen(3000, () => console.log('port 3000'));
