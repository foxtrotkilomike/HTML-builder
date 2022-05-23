const fs = require('fs');
const path = require('path');
const cssBundle = require('../05-merge-styles/cssBundle');
const copyDir = require('../04-copy-directory/copyDir');

const templPath = path.join(__dirname, 'template.html');
const compDirPath = path.join(__dirname, 'components');
const stylesDirPath = path.join(__dirname, 'styles');
const assetsDirPath = path.join(__dirname, 'assets');
const distDirPath = path.join(__dirname, 'project-dist');

const buildPage = async (templatePath, componentsDirPath) => {
  let templateContent = await fs.promises.readFile(templatePath, 'utf-8');
  const matches = templateContent.match(/{{.*}}/gm);

  try {
    for await (const match of matches) {
      const matchClipped = match.slice(2, -2);
      const newComponentPath = path.join(componentsDirPath, `${matchClipped}.html`);
      const replaced = await fs.promises.readFile(newComponentPath, 'utf-8', (err, data) => { 
        if (err) throw err;
        return data;
      });
      templateContent = templateContent.replace(match, replaced);
    }
  } catch (err) {
    console.error('Error reading components files');
    console.error(err);
  }

  try {
    fs.mkdir(distDirPath, { recursive: true }, (err) => { 
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error making directory');
    console.error(err);
  }

  try {
    fs.writeFile(path.join(distDirPath, 'index.html'), templateContent, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error writing to index.html');
    console.error(err);
  }
  
  try {
    fs.writeFile(path.join(distDirPath, 'style.css'), '', (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error clearing style.css');
    console.error(err);
  }

  cssBundle(stylesDirPath, distDirPath, 'style.css');
  copyDir(assetsDirPath, path.join(distDirPath, 'assets'));
};

buildPage(templPath, compDirPath);