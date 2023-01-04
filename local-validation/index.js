const { validator } = require('../validator/index');
const { readFiles, getJSONFilesForDir } = require('../helpers/files');

const validateFiles = (files) => {
    let validationResults = {};

    files.forEach(file => {
        const result = validator(file.filedata);
        validationResults[file.filename] = result;
    });

    return validationResults;
}

/**
 * Validate files locally
 * 
 * @param {string} path Absolute path to folder containing files
 * @returns {Object<(filename<string>, validationResults<Object>)>}
 */
const localValidation = (path) => {
    const filenames = getJSONFilesForDir(path);
    const filedata = readFiles(path, filenames);
    const validationResults = validateFiles(filedata);

    // Print results for the user
    console.log(JSON.stringify(validationResults));

    return validationResults;
}

module.exports = {
    localValidation
};
