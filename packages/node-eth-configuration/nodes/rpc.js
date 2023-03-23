module.exports = function (RED) {
    function RpcConfigNode(config) {
      RED.nodes.createNode(this, config);
      this.name = config.name;
      this.rpc = config.rpc;
    }
  
    RED.nodes.registerType('rpc', RpcConfigNode);
};
  