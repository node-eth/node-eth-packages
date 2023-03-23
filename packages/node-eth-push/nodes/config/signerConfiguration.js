module.exports = function (RED) {
    const ethers = require('ethers');

    function SignerConfigurationNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        this.privateKey = RED.nodes.getNode(config.privateKey);
        this.userConfiguration = RED.nodes.getNode(config.userConfiguration);
        
        this.name = config.name || 'Push Protocol Signer'


        console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(this.privateKey)
        console.log(this.userConfiguration)

        // construct a signer object
        // const signer = new ethers.Wallet(key);
        // this.signer = signer
    }

    RED.nodes.registerType("signerConfiguration", SignerConfigurationNode);
}