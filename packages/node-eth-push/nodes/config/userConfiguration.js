module.exports = function(RED) {


    function UserConfigurationNode(config) {
        RED.nodes.createNode(this, config);

        this.chainId = RED.nodes.getNode(config.chainId);

        this.name = config.name || "Push Protocol User";
        this.address = config.address;
        
        // create a proper caip address
        const caipAddress = `eip155:${this.chaidId.chainId}:${address}`;
        this.caipAddress = caipAddress; 
    }

    RED.nodes.registerType('userConfiguration', UserConfigurationNode);

}