module.exports = function(RED) {
    const PushUtils = require('../../lib/PushUtils');

    function UserConfigurationNode(config) {
        RED.nodes.createNode(this, config);

        // This is bad naming convention change this ASAP 
        this.chainId = RED.nodes.getNode(config.chainId);
        this.name = config.name || "Push Protocol User";
        this.address = config.address;

        const caipAddress = PushUtils.addressToCAIP(this.chainId.chainId, this.address);
        this.caipAddress = caipAddress; 
    }

    RED.nodes.registerType('userConfiguration', UserConfigurationNode);
}

