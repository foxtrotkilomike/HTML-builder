const fs = require('fs');
const path = require('path');

const origDirPath = path.join(__dirname, 'styles');
const destDirPath = path.join(__dirname, 'project-dist');

const cssBundle = async (stylesOrigDirPath, stylesDestDirPath) => {
  const stylesDirFiles = await fs.promises.readdir(
    stylesOrigDirPath, 
    { withFileTypes: true }, 
    (err) => {
      if (err) throw err;
    });

  if (stylesDirFiles.length > 0) {
    const writeStream = fs.createWriteStream(path.join(stylesDestDirPath, 'bundle.css'));
    for await (const entry of stylesDirFiles) {
      if (entry.isFile() && entry.name.match(/\.css$/)) {
        const readStream = fs.createReadStream(path.join(stylesOrigDirPath, entry.name));
        readStream
          .on('error', (err) => {
            throw err;
          })
          .pipe(writeStream);
      }
    }
  }
};

cssBundle(origDirPath, destDirPath);


