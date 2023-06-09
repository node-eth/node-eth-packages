module.exports = function(RED) {
    function ChainIdNode(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.chainId = config.chainId;
        this.chainName = config.chainName;
    };

    RED.nodes.registerType("chainId", ChainIdNode);
}