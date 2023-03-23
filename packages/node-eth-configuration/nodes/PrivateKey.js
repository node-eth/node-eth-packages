module.exports = function(RED) {
  function PrivateKeyNode(config) {
      RED.nodes.createNode(this,config);
      this.name = config.name || 'Private Key';
      this.key = config.key;
  }
  RED.nodes.registerType("privateKey", PrivateKeyNode);
}