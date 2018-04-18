const fs = require('fs');
const express = require('express');
const renderer = require('./renderer');

const app = express();

app.get('/', (req, res) => {
  res.type('text/html');
  res.write('<!DOCTYPE html>');
  renderer.toPromise().then((html) => {
    res.end(html);
  });
});

app.get('/streaming', (req, res) => {
  res.type('text/html');
  res.write('<!DOCTYPE html>');
  const stream = renderer.toStream();
  stream.pipe(res, { end: false });
  stream.on('end', () => res.end());
});

app.get('/client.js', (req, res) => {
  res.type('application/javascript');
  const js = fs.createReadStream('./client.js');
  js.pipe(res);
});

app.listen(3000, () => console.log('Server started on port 3000.'));

