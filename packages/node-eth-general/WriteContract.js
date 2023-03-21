module.exports = function (RED) {
  const { ethers } = require("ethers")

  function WriteContractNode(config) {
    RED.nodes.createNode(this, config)
    this.contract = RED.nodes.getNode(config.contract)
    this.provider = RED.nodes.getNode(config.provider)
    this.writeTo = config.writeTo
    this.functionInputs = config.functionInputs;
    this.privateKey = RED.nodes.getNode(config.privateKey);

    this.on('input', async function (msg, send) {
      const contractAddress = this.contract.address
      const network = this.provider.network
      const apikey = this.provider.apikey
      const contractAbi = this.contract.abi
      const args = this.functionInputs.map((obj) => obj.value);
      const providerApi = this.provider.provider  // To implement different APIs down the road
      const privateKey = this.privateKey.key
      
      // Alchemy API key check
      let provider = new ethers.AlchemyProvider(network)
      if (apikey) {
        provider = new ethers.AlchemyProvider(network, apikey)
      }

      // create signer
      const wallet = new ethers.Wallet(privateKey, provider);
      
      // make contract
      const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
      
      // write to contract function
      async function callContractFunction(contract, functionName, args) {
        try {
          if (typeof contract[functionName] === 'function') {
            const tx = await contract[functionName](...args);
            await tx.wait();
            return {output: tx.hash}
          } else {
            console.error(`Function '${functionName}' not found in the contract object`);
          }
        } catch (error) {
          console.error('Error calling function:', error);
        }
      }
      
      // write to contract and output transaction hash
      const payload = await callContractFunction(contract, this.writeTo, args);
      send(payload)
    });
  }
  RED.nodes.registerType("WriteContract", WriteContractNode)
}

