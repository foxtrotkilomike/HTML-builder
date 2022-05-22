const fs = require('fs');
const path = require('path');

const cssBundle = async (stylesOrigDirPath, stylesDestDirPath, styleFileName) => {
  const stylesDirFiles = await fs.promises.readdir(
    stylesOrigDirPath, 
    { withFileTypes: true }, 
    (err) => {
      if (err) throw err;
    });

  if (stylesDirFiles.length > 0) {
    const writeStream = fs.createWriteStream(path.join(stylesDestDirPath, styleFileName));
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

module.exports = cssBundle;