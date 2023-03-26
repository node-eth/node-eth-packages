module.exports = function (RED) {
  const { ethers } = require("ethers");
  function EthereumReadAccountNode(config) {
    RED.nodes.createNode(this, config);

    const node = this;

    node.rpcConfig = RED.nodes.getNode(config.rpc);
    node.account = config.account;
    node.action = config.action;
    node.name = config.name;

    node.on("input", async function (msg, send, done) {
      node.status({})
      if (node.rpcConfig && node.rpcConfig.provider) {
        try {
          node.status({
            fill: "yellow",
            shape: "ring",
            text: "working on it...",
          });
          const accountAddress = RED.util.evaluateNodeProperty(
            config.account,
            config.accountType || "str",
            node,
            msg
          );

          const provider = node.rpcConfig.provider;

          if (node.action === "getBalance") {
            const balance = await provider.getBalance(accountAddress);
            const nativeBalance = ethers.formatEther(balance);
            msg.payload = nativeBalance;
            node.status({
              fill: "green",
              shape: "ring",
              text: `Balance: ${nativeBalance} ETH`,
            });
            send(msg);
          } else if (node.action === "getTransactionCount") {
            const transactionCount = await provider.getTransactionCount(
              accountAddress
            );
            msg.payload = transactionCount;
            node.status({
              fill: "green",
              shape: "ring",
              text: `Tx count: ${transactionCount}`,
            });
            send(msg);
          }
        } catch (err) {
          node.error("ReadAccount: Error reading account: " + err);
          node.status({
            fill: "red",
            shape: "ring",
            text: `Error Reading account`,
          });
        }
      } else {
        node.error("No RPC configuration found");
        node.status({
          fill: "red",
          shape: "ring",
          text: `No RPC configuration found`,
        });
      }
    });
  }

  RED.nodes.registerType("Ethereum-Read-Account", EthereumReadAccountNode);
};
