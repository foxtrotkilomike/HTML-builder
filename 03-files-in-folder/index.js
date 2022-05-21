const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

(async () => { 
  const entries = await fs.promises.readdir(secretFolder, {withFileTypes: true});
  for await (let entry of entries) {
    if (!entry.isDirectory()) {
      const filePath = path.join(secretFolder, entry.name);
      const filePathParts = path.parse(filePath);
      const fileStat = await fs.promises.stat(filePath);
      const fileStatSize = (fileStat.size / 1024).toFixed(3);
      console.log(`${filePathParts.name} - ${filePathParts.ext.slice(1)} - ${fileStatSize}kb`);
    }
  }
})();