module.exports = function (RED) {
    function AlchemyExampleNode(config) {
      RED.nodes.createNode(this, config);
  
      // Get the Alchemy configuration node
      const alchemyConfig = RED.nodes.getNode(config.alchemy);
  
      // Log the configuration properties to the console
      console.log("Name:", alchemyConfig.name);
      console.log("Network:", alchemyConfig.network);
      console.log("API Key:", alchemyConfig.credentials.apikey);
      console.log("Provider:", alchemyConfig.provider);
    }
  
    RED.nodes.registerType("alchemy-example", AlchemyExampleNode);
  };
  