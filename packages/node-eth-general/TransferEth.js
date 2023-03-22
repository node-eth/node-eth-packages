module.exports = function (RED) {
  const { ethers } = require("ethers");

  function TransferEthNode(config) {
    RED.nodes.createNode(this, config);
    this.provider = RED.nodes.getNode(config.provider);
    this.privateKey = RED.nodes.getNode(config.privatekey);
    this.recipientAddress = config.recipientAddress;
    this.etherAmount = config.etherAmount;

    this.on("input", async function (msg, send) {
      const network = this.provider.network;
      const apikey = this.provider.apikey;
      const key = this.privateKey.key
      const recipientAddress = this.recipientAddress
      const weiAmount = ethers.parseEther(this.etherAmount);

      // Alchemy API key check
      let provider = new ethers.AlchemyProvider(network);
      if (apikey) {
        provider = new ethers.AlchemyProvider(network, apikey);
      }

      // Wallet setup
      const wallet = new ethers.Wallet(key, provider);

      try {
        const transaction = await wallet.sendTransaction({
          to: recipientAddress,
          value: weiAmount,
        });

        const receipt = await transaction.wait();
        msg.payload = {
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          confirmations: receipt.confirmations,
        };
        send(msg);
      } catch (error) {
        this.error("Error transferring Ether: " + error.message);
      }
    });
  }
  RED.nodes.registerType("TransferEth", TransferEthNode);
};
