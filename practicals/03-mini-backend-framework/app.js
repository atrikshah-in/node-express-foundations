const customFramework = require('./framework');
const app = new customFramework();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/users', (req, res) => {
  res.json([{ id: 1 }, { id: 2 }]);
});

app.post('/data', (req, res) => {
  let data = req.body;
  try { data = JSON.parse(data); } catch (e) { }
  res.json({ ok: true, data });
});

app.listen(3002, () => console.log('3002'));
