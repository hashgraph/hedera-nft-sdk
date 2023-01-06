const { calculateRarity } = require('../..');

function main() {
    // Replace with absolute path to files folder
    const absolutePathToFiles = "/Users/myUser/nft-utilities/examples/rarity-score-calculation/files";
    const results = calculateRarity(absolutePathToFiles);
    console.log(results);

    /* Output:
        Found 6 for directory: /Users/myUser/nft-utilities/examples/rarity-score-calculation/files
        Found 5 files with the .json extension
        [
            { rarity: '5.50', NFT: 1, filename: 'nft1.json' },
            { rarity: '6.00', NFT: 2, filename: 'nft2.json' },
            { rarity: '5.50', NFT: 3, filename: 'nft3.json' },
            { rarity: '5.50', NFT: 4, filename: 'nft4.json' },
            { rarity: '11.50', NFT: 5, filename: 'nft5.json' }
        ]
    */
}

main();