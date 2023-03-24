
module.exports = function (RED) {
  const {ethers }= require('ethers');

  function RpcConfigNode(n) {
    RED.nodes.createNode(this, n);
    this.name = n.name;
    this.rpc = n.rpc;
    const rpcUrl = n.rpc;
    const provider = new ethers.JsonRpcProvider(rpcUrl)
    this.provider = provider;
  }

  RED.nodes.registerType('rpc', RpcConfigNode);
};