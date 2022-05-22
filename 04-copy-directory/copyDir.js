const fs = require('fs');
const path = require('path');

const copyDir = async (copyDirPath, newDirPath) => {
  fs.mkdir(newDirPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  // manage new directory
  const dirNewExistingEntries = await fs.promises.readdir(newDirPath);
  if (dirNewExistingEntries) {
    for await (let entry of dirNewExistingEntries) {
      fs.unlink(path.join(newDirPath, entry), (err) => {
        if (err) throw err;
      });
    }
  }
  
  // copy entries of copied directory
  const dirCopyEntries = await fs.promises.readdir(copyDirPath);
  for await (let entry of dirCopyEntries) {
    fs.copyFile(path.join(copyDirPath, entry), path.join(newDirPath, entry), (err) => {
      if (err) throw err;
    });
  }
};

module.exports = copyDir;