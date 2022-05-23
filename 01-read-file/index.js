const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join('01-read-file', 'text.txt');
const fileStream = fs.createReadStream(filePath, 'utf-8');

try {
  fileStream.on('error', () => {
    throw new Error('File could not be read');
  });
} catch (err) {
  console.error(err);
}

fileStream.on('data', data => {
  console.log(data);
});
