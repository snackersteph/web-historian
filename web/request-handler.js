var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

module.exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS, PUT, DELETE',
  'access-control-allow-headers': 'content-type, accept',
};

var actions = {
  'GET': (request, response) => {
    // console.log('request!: ', request.url);
    if (request.url === '/') {
      // console.log('URL matches!', request.url);
      fs.readFile('./web/public/index.html', function(error, data) {
        headers['Content-type'] = 'text/html';
        response.writeHead(200, headers);
        response.write(data);
        response.end();
      });
    } else if (request.url === '/styles.css') { 
      fs.readFile('./web/public/styles.css', function(error, data) {
        headers['Content-type'] = 'text/css';
        response.writeHead(200, headers);
        response.write(data);
        response.end();
      });
    }
  },
  'POST': () => {
    // Determine if the folder exists
    // If yes, GET the folder
    // If no, add to the sites.txt 
  },
  'OPTIONS': () => {
    // sendResponse
  }
};

var sendResponse = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end();
};

var collectData = () => {
  // Access the folder in our archives
  
};

module.exports = function (request, response) {
  // console.log('does this work??');
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    sendResponse(response, 'Not Found', 404);
  }
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // response.end(archive.paths.list);
};

