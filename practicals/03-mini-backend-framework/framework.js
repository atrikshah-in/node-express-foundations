const http = require('http');

class customFramework {
  constructor() {
    this.routes = { GET: {}, POST: {} };
    this.mws = [];
  }

  use(fn) {
    this.mws.push(fn);
  }

  get(path, fn) {
    this.routes.GET[path] = fn;
  }

  post(path, fn) {
    this.routes.POST[path] = fn;
  }

  listen(port, cb) {
    http.createServer((req, res) => {
      res.send = (d) => res.end(typeof d === 'object' ? JSON.stringify(d) : d);
      res.json = (d) => res.end(JSON.stringify(d));

      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        req.body = body;
        this.run(req, res);
      });
    }).listen(port, cb);
  }

  run(req, res) {
    let idx = 0;
    const next = () => {
      if (idx < this.mws.length) {
        this.mws[idx++](req, res, next);
      } else {
        const handler = this.routes[req.method]?.[req.url];
        if (handler) handler(req, res);
        else res.end('404');
      }
    };
    next();
  }
}

module.exports = customFramework;
