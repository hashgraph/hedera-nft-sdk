const axios = require("axios");

// Default weights for risk score calculation
const defaultWeights = {
  admin_key: 200,
  wipe_key: 200,
  freeze_key: 50,
  supply_key: 20,
  kyc_key: 50,
  pause_key: 50,
  fee_schedule_key: 40
};

// Default thresholds for risk level calculation
const defaultRiskLevels = {
    NORISK: 0,
    LOW: 40,
    MEDIUM: 199,
    HIGH: 2000
};

/**
 *
 * @param {Object} metadata JSON object representing token information e.g. https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/
 * @param {Object<number>} weights key-value pairs of object properties and associated weights
 * @returns {Object<number,string>} risk score and risk level for metadata object
 */
const calculateRiskScoreFromData = (metadata) => {
  let riskScore = 0;

  // Iterate through the properties of the object
  for (const key in metadata) {
    // Check if the property is present in the weights object and not null
    if (metadata[key] && key in defaultWeights) {
      // If it is, add the associated risk weight to the risk score
      riskScore += defaultWeights[key];
    }
  }

  const riskLevel = calculateRiskLevel(riskScore)

  return {
    riskScore,
    riskLevel
  }
}

/**
 *
 * @param {string} tokenId 
 * @param {string} network [network = "mainnet"] only supports mainnet and testnet
 * @returns {Object<number,string>} risk score and risk level for fetched metadata object from tokenId
 */
const calculateRiskScoreFromTokenId = async (tokenId, network = "mainnet") => {
    let riskScore = 0;

    const uri = network === "mainnet" 
      ? `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenId}/`
      : `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/`;

    const { data: metadata } = await axios.get(uri);
  
    // Iterate through the properties of the object
    for (const key in metadata) {
      // Check if the property is present in the weights object and not null
      if (metadata[key] && key in defaultWeights) {
        // If it is, add the associated risk weight to the risk score
        riskScore += defaultWeights[key];
      }
    }
  
    const riskLevel = calculateRiskLevel(riskScore)
  
    return {
      riskScore,
      riskLevel
    }
  }

/**
 * Calculate risk level for NFT metadata
 * 
 * @param {number} score calculated total risk score for metadata
 * @return {string} risk level (NORISK, LOW, MEDIUM, HIGH)
 */
const calculateRiskLevel = (score) => {
  let riskLevel = "";

  for (const key in defaultRiskLevels) {
    if (score <= defaultRiskLevels[key]) {
        riskLevel = key;
        break;
    }
  }

  return riskLevel;
}

module.exports = {
    defaultWeights,
    defaultRiskLevels,

    calculateRiskScoreFromData,
    calculateRiskScoreFromTokenId,
    calculateRiskLevel // built-in in "calculateRiskScore" functions
}
