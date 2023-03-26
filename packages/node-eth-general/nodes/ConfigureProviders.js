module.exports = function (RED) {

    function ConfigureProvidersNode(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.rpc = RED.nodes.getNode(config.rpc);
    }


    RED.nodes.registerType('Configure-Providers', ConfigureProvidersNode);

}