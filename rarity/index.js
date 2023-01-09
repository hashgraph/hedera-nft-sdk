// calculate rarity for one NFT
// calculate rarity for a list of files in a dir
// algorithm function
// ability to add custom algorithm?

const { readFiles, getJSONFilesForDir } = require('../helpers/files');

/**
 * 
 * @param {string} dir Absolute path to folder with metadata files for rarity calculation
 * @return {Array<Object(string, number, string)>} {rarity: string(two decimal floating point), NFT: number, filename: string}}
 */
const calculateRarity = (dir) => {
    const filenames = getJSONFilesForDir(dir);
    const files = readFiles(dir, filenames);

    const attributesMap = getAttributeMap(files);
    
    const normalizedRarities = [];
    let normalizedCount = 1;
    files.forEach(file => {
        const traitRarities = [];

        file.filedata.attributes.forEach(NFTAttribute => {
            const attributeConfigObject = attributesMap.find(attribute => attribute.trait_type === NFTAttribute.trait_type);

            const NFTsWithTrait = attributeConfigObject.values.find(valueObject => valueObject.value === NFTAttribute.value);
            const mostCommonTrait = attributeConfigObject.values.reduce((prev, current) => (prev.count > current.count ? prev : current));
            const traitRarity = 1 / (NFTsWithTrait.count / mostCommonTrait.count)
            
            traitRarities.push(traitRarity);
        })

        const totalRarity = traitRarities.reduce((prev, current) => prev + current, 0);
        normalizedRarities.push({ rarity: totalRarity.toFixed(2), NFT: normalizedCount, filename: file.filename });
        normalizedCount++;
    });

    return normalizedRarities
}

/**
 * Builds an attributes map with a trait count per attribute value
 * @param {Array} files 
 * @returns {Array}
 * 
 * @example [{"trait_type":"Background","values":[{"value":"Yellow","count":3},{"value":"Green","count":2}]},{"trait_type":"Fur","values":[{"value":"Gold","count":3},{"value":"Silver","count":2}]},{"trait_type":"Clothing","values":[{"value":"Floral Jacket","count":4},{"value":"Herbal Jacket","count":1}]},{"trait_type":"Mouth","values":[{"value":"Tongue","count":2},{"value":"Smile","count":3}]},{"trait_type":"Sing","values":[{"value":"None","count":4},{"value":"Sing","count":1}]}]
 */
const getAttributeMap = (files) => {
    const attributesMap = [];
    files.forEach(file => {
        file.filedata.attributes.forEach(attribute => {
            const matchedAttributeIndex = attributesMap.findIndex(attributeObject => attribute.trait_type === attributeObject.trait_type);
            if (matchedAttributeIndex !== -1) {
                const matchedValueIndex = attributesMap[matchedAttributeIndex].values.findIndex(valueObject => valueObject.value === attribute.value);
                
                if (matchedValueIndex !== -1) {
                    attributesMap[matchedAttributeIndex].values[matchedValueIndex].count++;
                } else {
                    attributesMap[matchedAttributeIndex].values.push({
                        value: attribute.value, count: 1
                    })
                }
            } else {
                attributesMap.push({
                    trait_type: attribute.trait_type,
                    values: [{ value: attribute.value, count: 1 }]
                });
            }
        });
    });

    return attributesMap;
}

module.exports = {
    calculateRarity
};
