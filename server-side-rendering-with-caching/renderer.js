const Stream = require('stream');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const NodeCache = require('node-cache');
const HelloComponent = require('./HelloComponent');

const cache = new NodeCache({ stdTTL: 60, checkperiod: 10, errorOnMissing: true });

// below implementation taken from: https://zeit.co/blog/streaming-server-rendering-at-spectrum
const createCachingStream = (cacheKey) => {
  const bufferedChunks = [];
  return new Stream.Transform({
    // transform() is called with each chunk of data
    transform(data, enc, cb) {
      // We store the chunk of data (which is a Buffer) in memory
      bufferedChunks.push(data);
      // Then pass the data unchanged onwards to the next stream
      cb(null, data);
    },

    // flush() is called when everything is done
    flush(cb) {
      // We concatenate all the buffered chunks of HTML to get the full HTML
      // then cache it at "cacheKey"
      cache.set(cacheKey, Buffer.concat(bufferedChunks))
      cb();
    }
  });
};

const helloElement = React.createElement(HelloComponent, { toWhat: 'World' });

const reactScript = '<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>';
const reactDomScript = '<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>';
const head = '<head><title>Test Application</title>' + reactScript + reactDomScript + '</head>';
const clientScript = '<script src="/client.js"></script>';

const preReact = '<html>' + head + '<body><div id="app">';
const postReact = '</div>' + clientScript + '</body></html>';

module.exports = function(cacheKey) {
  return {
    toPromise() {
      try {
        const cachedHtml = cache.get(cacheKey);
        console.log('<cache hit in renderer.toPromise>');
        return Promise.resolve(cachedHtml);
      }
      catch (err) {
        console.log('<cache miss in renderer.toPromise>');
        return new Promise((resolve) => {
          const renderedReact = ReactDOMServer.renderToString(helloElement);
          const html = preReact + renderedReact + postReact;
          cache.set(cacheKey, html);
          resolve(html);
        });
      }
    },
    toStream() {
      try {
        const streamToReturn = new Stream.PassThrough();
        const cachedHtml = cache.get(cacheKey);
        console.log('<cache hit in renderer.toStream>');
        streamToReturn.end(cachedHtml);
        return streamToReturn;
      }
      catch (err) {
        console.log('<cache miss in renderer.toStream>');
        const cachingStream = createCachingStream(cacheKey);
        const reactStream = ReactDOMServer.renderToNodeStream(helloElement);
        cachingStream.write(preReact, () => reactStream.pipe(cachingStream, { end: false }));
        reactStream.on('end', () => cachingStream.end(postReact));
        return cachingStream;
      }
    }
  };
};

