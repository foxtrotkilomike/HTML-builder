const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);


const sayBye = () => stdout.write('See you!\n');

process.on('SIGINT', () => {
  sayBye();
  process.exit();
});

stdout.write('Hello! Print some text below:\n');

stdin.on('data', data => {
  if (data.toString() === 'exit\r\n' || data.toString() === 'exit\n') {
    sayBye();
    process.exit();
  }
  try {
    writeStream.write(data, err => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error writing chunk to file');
    console.error(err);
  }
});