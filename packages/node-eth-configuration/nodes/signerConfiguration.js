const ethers = require('ethers');
const Helpers = require('../lib/Helpers');

module.exports = function (RED) {

    function SignerConfigurationNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;

        this.rpc = RED.nodes.getNode(config.rpc);
        this.chainId = RED.nodes.getNode(config.chainId);
        this.privateKey = RED.nodes.getNode(config.privateKey);
        
        this.name = config.name;
        this.address = config.address;

        /**
         * Derive constants
         */
        const key = this.privateKey.key;
        const provider = this.rpc.provider;
        const chainId = this.chainId.chainId;

        /**
         * Construct necessary objects for Signing operations
         */
        const signer = new ethers.Wallet(key, provider);
        const caipAddress = Helpers.addressToCAIP(chainId, this.address);

        /**
         * Exports:
         * Signer - required to sign certain events
         * CaipAddress - required for pretty much everything
         * 
         * DevNote* - This is because Push Protocol does not support any newer ethers releases
         * so we have to manually reconfigure providers and signers in push protocol nodes
         * until they finally start supports lts Ethers.js
         */
        this.signer = signer;
        this.caipAddress = caipAddress;
    }

    RED.nodes.registerType("signerConfiguration", SignerConfigurationNode);
}