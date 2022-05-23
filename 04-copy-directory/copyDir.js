const fs = require('fs');
const path = require('path');

const copyDir = async (copyDirPath, newDirPath) => {
  try {
    await fs.promises.mkdir(newDirPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error making dorectory to copy');
    console.error(err);
  }

  // manage new directory
  const dirNewExistingEntries = await fs.promises.readdir(newDirPath, {withFileTypes: true});
  if (dirNewExistingEntries) {
    for await (let entry of dirNewExistingEntries) {
      if(!entry.isDirectory()) {
        try {
          fs.unlink(path.join(newDirPath, entry.name), (err) => {
            if (err) throw err;
          });
        } catch (err) {
          console.error('Error deleting existing files in new directory');
          console.error(err);
        }
      }
    }
  }
  
  // copy entries of copied directory
  const dirCopyEntries = await fs.promises.readdir(copyDirPath, {withFileTypes: true});
  for await (let entry of dirCopyEntries) {
    if (entry.isDirectory()) {
      copyDir(
        path.join(copyDirPath, entry.name), 
        path.join(newDirPath, entry.name));
    } else {
      try {
        fs.copyFile(
          path.join(copyDirPath, entry.name), 
          path.join(newDirPath, entry.name), 
          (err) => {
            if (err) throw err;
          });
      } catch (err) {
        console.error('Error copying files to new directory');
        console.error(err);
      }
    }
  }
};

module.exports = copyDir;