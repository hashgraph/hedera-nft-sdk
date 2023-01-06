const { calculateRiskScoreFromTokenId } = require('../..');

async function main() {
    // source: https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/
    const results = await calculateRiskScoreFromTokenId("0.0.1270555");
    console.log(results);

    /* Output:
        { riskScore: 20, riskLevel: 'LOW' }
    */
}

main();