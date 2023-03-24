module.exports = function(RED) {
  function PrivateKeyNode(config) {
      RED.nodes.createNode(this,config);
      this.name = config.name || 'Private Key';
      this.type = config.type;
      this.key = config.key;
  }
  RED.nodes.registerType("privateKey", PrivateKeyNode);
}