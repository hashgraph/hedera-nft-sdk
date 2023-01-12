const { localValidation } = require('../..');

function main() {
    // Replace with absolute path to files folder
    const absolutePathToFiles = "/Users/myUser/nft-utilities/examples/local-metadata-validator/files";

    // Looks for JSON files and uses validator package to verify each metadata file (notjson.md file will be ignored)
    // files/nft2.json has mistakes: no image and type properties
    localValidation(absolutePathToFiles)

    /* Output:
        Found 6 for directory: /Users/myUser/nft-utilities/examples/local-metadata-validator/files
        Found 5 files with the .json extension
        { 
            "nft1.json": {"errors":[],"warnings":[]},
            "nft2.json":{"errors":[{"type":"schema","msg":"requires property 'image'","path":"instance"},{"type":"schema","msg":"requires property 'type'","path":"instance"}],"warnings":[]},
            "nft3.json":{"errors":[],"warnings":[]},
            "nft4.json":{"errors":[],"warnings":[]},
            "nft5.json":{"errors":[],"warnings":[]}
        }
    */
}

main();