const fs = require('fs');
const path = require('path');

const cssBundle = async (stylesOrigDirPath, stylesDestDirPath, styleFileName) => {
  try {
    let stylesDirFiles = await fs.promises.readdir(
      stylesOrigDirPath, 
      { withFileTypes: true }, 
      (err) => {
        if (err) throw err;
      });

    // manage special order of styles
    stylesDirFiles.sort((a) => {
      if (a.isFile() && a.name.match(/footer/gi)) return 1;
      return -1;
    });

    if (stylesDirFiles.length > 0) {
      // clear the file 
      try {
        fs.writeFile(path.join(stylesDestDirPath, styleFileName), '', (err) => {
          if (err) throw err;
        });
      } catch (err) {
        console.error('Error clearing styles file');
        console.error(err);
      }

      for await (const entry of stylesDirFiles) {
        if (entry.isFile() && entry.name.match(/\.css$/)) {
          const readStream = fs.createReadStream(path.join(stylesOrigDirPath, entry.name));
          readStream
            .on('error', () => {
              console.error('Error while reading style file');
            });

          try {
            readStream.on('data', data => {
              fs.writeFile(path.join(stylesDestDirPath, styleFileName), data, { flag: 'a' }, (err) => {
                if (err) throw err;
              });
            });
          } catch (err) {
            console.error('Error writing to style bundle file');
            console.error(err);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading style files directory');
    console.error(err);
  }
};

module.exports = cssBundle;