module.exports = function(RED) {
  function ContractNode(config) {
      RED.nodes.createNode(this,config);
      this.name = config.name;
      this.address = config.address;
      this.abi = config.abi;
  }
  RED.nodes.registerType("contract", ContractNode);
}