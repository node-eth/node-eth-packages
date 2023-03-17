module.exports = function (RED) {
  const { ethers } = require("ethers")

  function GetContractBalanceNode(config) {
    RED.nodes.createNode(this, config)
    this.contract = RED.nodes.getNode(config.contract)
    this.provider = RED.nodes.getNode(config.provider)

    this.on('input', async function (msg, send) {
      const contractAddress = this.contract.address
      const network = this.provider.network
      const apikey = this.provider.apikey
      const providerApi = this.provider.provider  // To implement different API's down the road
      
      // Alchemy API key check
      let provider = new ethers.AlchemyProvider(network)
      if (apikey) {
        provider = new ethers.AlchemyProvider(network, apikey)
      }

      // Get balance of contract and convert to ether for output
      const balance = await provider.getBalance(contractAddress)
      const etherBalance = ethers.formatEther(balance)
      const payload = {ether: etherBalance}
      send(payload)
    });
  }
  RED.nodes.registerType("GetContractBalance", GetContractBalanceNode)
}