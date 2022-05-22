const path = require('path');
const cssBundle = require('./cssBundle');

const origDirPath = path.join(__dirname, 'styles');
const destDirPath = path.join(__dirname, 'project-dist');

cssBundle(origDirPath, destDirPath, 'bundle.css');
