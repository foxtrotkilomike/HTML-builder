const path = require('path');
const copyDir = require('./copyDir');

const dirCopyPath = path.join(__dirname, 'files');
const dirNewPath = path.join(__dirname, 'files-copy');

copyDir(dirCopyPath, dirNewPath);
