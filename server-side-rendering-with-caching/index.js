const fs = require('fs');
const express = require('express');
const renderer = require('./renderer');

const app = express();

const beginHtmlResponse = (req, res, next) => {
  res.type('text/html');
  res.write('<!DOCTYPE html>');
  next();
};

app.get('/', beginHtmlResponse, (req, res) => {
  renderer('some cache key relevant to this route').toPromise().then((html) => {
    res.end(html);
  });
});

app.get('/streaming', beginHtmlResponse, (req, res) => {
  const stream = renderer('some cache key relevant to this route').toStream();
  stream.pipe(res, { end: false });
  stream.on('end', () => res.end());
});

app.get('/client.js', (req, res) => {
  res.type('application/javascript');
  const js = fs.createReadStream('./client.js');
  js.pipe(res);
});

app.listen(3000, () => console.log('Server started on port 3000.'));

