module.exports = function (RED) {
  const { ethers } = require("ethers")

  function PolygonGetContractBalanceNode(config) {
    RED.nodes.createNode(this, config)

    this.rpc = RED.nodes.getNode(config.rpc)
    this.contract = RED.nodes.getNode(config.contract)
    this.provider = RED.nodes.getNode(config.provider)
    this.privateKey = RED.nodes.getNode(config.privateKey)

    this.on('input', async function (msg, send) {
      const contractAddress = this.contract.address
      const provider = this.rpc.provider;

      // Get balance of contract and convert to ether for output
      const balance = await provider.getBalance(contractAddress)
      msg.payload = ethers.formatEther(balance) + " MATIC";
      send(msg)
    });
  }
  RED.nodes.registerType("Polygon-Contract-Balance", PolygonGetContractBalanceNode)
}