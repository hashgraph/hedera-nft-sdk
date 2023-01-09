const { validator, defaultVersion } = require('./validator');
const { localValidation } = require('./local-validation');
const { 
  defaultWeights, defaultRiskLevels,
  calculateRiskScoreFromData, calculateRiskScoreFromTokenId, calculateRiskLevel 
} = require('./risk');
const { calculateRarity } = require('./rarity');

module.exports = {
    // validation
    validator,
    defaultVersion,

    // local validation
    localValidation,

    // risk score
    defaultWeights, defaultRiskLevels,
    calculateRiskScoreFromData, calculateRiskScoreFromTokenId, calculateRiskLevel,

    // rarity calculation
    calculateRarity
}
