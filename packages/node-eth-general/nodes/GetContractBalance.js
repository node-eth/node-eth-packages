module.exports = function (RED) {
  const { ethers } = require("ethers")

  function GetContractBalanceNode(config) {
    RED.nodes.createNode(this, config)
    this.contract = RED.nodes.getNode(config.contract)
    this.provider = RED.nodes.getNode(config.provider)
    this.rpc = RED.nodes.getNode(config.rpc)
    this.privateKey = RED.nodes.getNode(config.privateKey)

    this.on('input', async function (msg, send) {
      const contractAddress = this.contract.address
      const provider = this.rpc.provider;

      // Get balance of contract and convert to ether for output
      const balance = await provider.getBalance(contractAddress)
      msg.payload = ethers.formatEther(balance);
      send(msg)
    });
  }
  RED.nodes.registerType("Get-Contract-Balance", GetContractBalanceNode)
}