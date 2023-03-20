/**
 * Push Utils class holds all the necessary utility actions
 * and helpers in order to perform PushProtocol related methods
 */
module.exports = class PushUtils {

    // #region Address to CAIP
    /**
     * Ref link to the explanation of the chain IDs
     * https://chainlist.org/
     * https://besu.hyperledger.org/en/stable/public-networks/concepts/network-and-chain-id/
     * 
     * Brief overview: \
     * mainnet = 1 \
     * goerli = 5 \
     * sepolia 11155111    (3 ones, 2 fives, 3 ones again) \
     * polygon Mainnet = 1337 \
     * Optimism = 10 \
     * Filecoin = 314 \
     * dev = 2018 
     * ...
     * 
     * This method turns the given address and the chain id into CAIP styled address
     * exmpl: eip155:42:0xD8634C39BBFd4033c0d3289C4515275102423681
     * 
     * @param {number} chainID - number ref to the Chain ID, i.e. 1 = mainnet
     * @param {any} address - Ethereum styled Address
     */
    static addressToCAIP(chainID, address) {
        try {
            return `eip155:${chainID}:${address}`
        } catch (error) {
            return new Error("PushUtils: Could not convert to CAIP address: " + error);
        }
    }
    //#endregion

    // #region Validate CAIP Address
    /**
     * 
     */
    static validateCAIP() {
        //
    }
    // #endregion
}