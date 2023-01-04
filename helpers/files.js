const fs = require('fs');
const path = require('path');

/**
 * @param {string} path Absolute path to file you want to read contents for
 * @returns {Array<Objects>} containing a filename and filedata
 */
const readFiles = (dir, filenames) => {
    let JSONdata = []

    filenames.forEach((filename) => {
      const data = fs.readFileSync(path.join(dir, filename), { encoding: 'utf8', flag: 'r' });
      JSONdata.push({
        filename,
        filedata: JSON.parse(data)
      });
    });

    return JSONdata;
}

/**
 * @param {string} dir Absolute path to folder you want to validate
 * @returns {Array<string>} filenames with extension
 */
const getJSONFilesForDir = (dir) => {
  const directoryPath = `${dir}`;

  const files = fs.readdirSync(directoryPath, { withFileTypes: true });
  console.log(`Found ${files.length} for directory: ${dir}`);

  let JSONFiles = [];
  files.forEach((file) => {
    if (path.extname(file.name) == ".json") JSONFiles.push(file.name);
  });
  console.log(`Found ${JSONFiles.length} files with the .json extension`);

  return JSONFiles;
}

module.exports = {
    readFiles,
    getJSONFilesForDir
}