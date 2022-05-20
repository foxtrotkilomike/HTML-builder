const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join('01-read-file', 'text.txt');
const fileStream = fs.createReadStream(filePath);

try {
  fileStream.on('error', () => {
    throw new Error('File could not be read');
  });
  fileStream.on('data', data => {
    console.log(data);
  });
} catch (err) {
  console.error(err);
}