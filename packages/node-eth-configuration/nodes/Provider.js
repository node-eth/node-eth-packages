module.exports = function(RED) {
  function ProviderNode(config) {
      RED.nodes.createNode(this,config);
      this.name = config.name;
      this.provider = config.provider;
      this.network = config.network;
      this.apikey = config.apikey;
  }
  RED.nodes.registerType("provider", ProviderNode);
}