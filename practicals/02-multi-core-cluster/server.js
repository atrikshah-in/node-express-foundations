const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) {
  const cpus = os.cpus().length;
  console.log(`master ${process.pid} running, forking ${cpus} workers`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died, restarting`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    if (req.url === '/heavy') {
      let count = 0;
      for (let i = 0; i < 1000000000; i++) count++;
      res.end(`worker ${process.pid} done: ${count}`);
    } else {
      res.end(`worker ${process.pid}`);
    }
  }).listen(3001, () => {
    console.log(`worker ${process.pid} started on 3001`);
  });
}
