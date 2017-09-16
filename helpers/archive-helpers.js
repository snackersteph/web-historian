var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// var http = require('http');
// var handler = require('../web/request-handler.js');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 // changed to CONST for pathname fix
const paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};
exports.paths = paths;

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// changed to CONST
const readListOfUrls = function(callback) {
  fs.readFile(paths.list, function(error, data) {
    callback(data.toString().split('\n'));
    // done();
  });
};

//
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((array) => {
    callback(array.includes(url))
  });
};


exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls((array) => {
    array.push(url); // push to array
    fs.writeFile(paths.list, array.join('\n'), () => { // write as string
      callback(); // exectute callback function
    });
  });
};

const isUrlArchived = function(url, callback) {
  fs.exists(paths.archivedSites + '/' + url, (currentlyArchived) => {
    callback(currentlyArchived)
  });
};

const downloadUrls = function(urls) {
  urls.forEach(url => {
    // *** FD/openSync/W? Reverse engineered from tests
    var fd = fs.openSync(paths.archivedSites + '/' + url, 'w');
    fs.closeSync(fd);
  });
};


// export the CONST functions
exports.readListOfUrls = readListOfUrls;
exports.isUrlArchived = isUrlArchived;
exports.downloadUrls = downloadUrls;
