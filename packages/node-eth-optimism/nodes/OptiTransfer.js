module.exports = function (RED) {
  const { ethers } = require("ethers");

  function OptimismTransferNode(config) {
    RED.nodes.createNode(this, config);

    const node = this;
    this.provider = RED.nodes.getNode(config.provider);
    this.privateKey = RED.nodes.getNode(config.privateKey);
    this.recipientAddress = config.recipientAddress;
    this.recipientAddressType = config.recipientAddressType;
    this.etherAmount = config.etherAmount;
    this.etherAmountType = config.etherAmountType;
    this.rpc = RED.nodes.getNode(config.rpc)


    this.on("input", async function (msg, send) {
      node.status({})
      node.status({
        fill: "yellow",
        shape: "ring",
        text: "working on it...",
      });
      const recipientAddress = RED.util.evaluateNodeProperty(config.recipientAddress, config.recipientAddressType || "str", node, msg)
      const etherAmount = RED.util.evaluateNodeProperty(config.etherAmount, config.etherAmountType || "str", node, msg)

      const key = this.privateKey.key
      const weiAmount = ethers.parseEther(etherAmount);

      // Alchemy API key check - Dropped in favor of JsonRpcProvider and Hardhat
      // let provider = new ethers.AlchemyProvider(network);
      // if (apikey) {
      //   provider = new ethers.AlchemyProvider(network, apikey);
      // }
      
      // Get provider configuration of user's choice
      let provider = this.rpc.provider;
      
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
        node.status({
          fill: "green",
          shape: "ring",
          text: `Successful transaction`,
        });
      } catch (error) {
        node.error("Error transferring Tokens: " + error.message);
        node.status({
          fill: "red",
          shape: "ring",
          text: `Error Transfering Tokens`,
        });
      }
    });
  }
  RED.nodes.registerType("Optimism-Transfer", OptimismTransferNode);
};
