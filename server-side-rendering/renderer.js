const Stream = require('stream');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const HelloComponent = require('./HelloComponent');

const helloElement = React.createElement(HelloComponent, { toWhat: 'World' });

const reactScript = '<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>';
const reactDomScript = '<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>';
const head = '<head><title>Test Application</title>' + reactScript + reactDomScript + '</head>';
const clientScript = '<script src="/client.js"></script>';

const preReact = '<html>' + head + '<body><div id="app">';
const postReact = '</div>' + clientScript + '</body></html>';

module.exports = {
  toPromise() {
    return new Promise((resolve) => {
      const renderedReact = ReactDOMServer.renderToString(helloElement);
      const html = preReact + renderedReact + postReact;
      // const html = preReact + postReact;
      resolve(html);
    });
  },
  toStream() {
    const streamToReturn = new Stream.PassThrough();
    const reactStream = ReactDOMServer.renderToNodeStream(helloElement);
    streamToReturn.write(preReact, () => reactStream.pipe(streamToReturn, { end: false }));
    reactStream.on('end', () => streamToReturn.end(postReact));
    return streamToReturn;
  }
};

