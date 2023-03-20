module.exports = function (RED) {
  const { ethers } = require("ethers")

  function ReadContractNode(config) {
    RED.nodes.createNode(this, config)
    this.contract = RED.nodes.getNode(config.contract)
    this.provider = RED.nodes.getNode(config.provider)
    this.readFrom = config.readFrom
    this.functionInputs = config.functionInputs;

    this.on('input', async function (msg, send) {
      const contractAddress = this.contract.address
      const network = this.provider.network
      const apikey = this.provider.apikey
      const contractAbi = this.contract.abi
      const args = this.functionInputs.map((obj) => obj.value);
      const providerApi = this.provider.provider  // To implement differnt API's down the road
      console.log(this.functionInputs)
      console.log("----------------------")
      console.log(this.readFrom)
      
      // Alchemy API key check
      let provider = new ethers.AlchemyProvider(network)
      if (apikey) {
        provider = new ethers.AlchemyProvider(network, apikey)
      }

      // make contract
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      
      // read from contract function
      async function callContractFunction(contract, functionName, args) {
        try {
          if (typeof contract[functionName] === 'function') {
            const result = await contract[functionName](...args);
            console.log('Function result:', result);
            return {output: result}
          } else {
            console.error(`Function '${functionName}' not found in the contract object`);
          }
        } catch (error) {
          console.error('Error calling function:', error);
        }
      }
      
      // read from contract and output result
      const payload = await callContractFunction(contract, this.readFrom, args);
      send(payload)
    });
  }
  RED.nodes.registerType("ReadContract", ReadContractNode)
}