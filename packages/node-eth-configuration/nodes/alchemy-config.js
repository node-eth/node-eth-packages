module.exports = function (RED) {
  function AlchemyConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.network = config.network;
    this.apikey = config.apikey;
    this.provider = "alchemy";

    // Define pre-defined configurations
    const preDefinedConfigs = [
      { name: "Ethereum mainnet", network: "mainnet", apikey: "YOUR_API_KEY" },
      { name: "Rinkeby testnet", network: "rinkeby", apikey: "YOUR_API_KEY" },
      { name: "Kovan testnet", network: "kovan", apikey: "YOUR_API_KEY" },
      // Add more pre-defined configurations here...
    ];

    // Set configuration node properties based on selected pre-defined configuration
    if (config.config) {
      const selectedConfig = preDefinedConfigs.find(
        (c) => c.name === config.config
      );
      if (selectedConfig) {
        this.name = selectedConfig.name;
        this.network = selectedConfig.network;
        this.apikey = selectedConfig.apikey;
      }
    }
  }

  RED.nodes.registerType("alchemy-config", AlchemyConfigNode, {
    credentials: {
      apikey: { type: "password" },
    },
    config: {
      // Define the configuration node UI
      label: function () {
        return this.name || "Alchemy Config";
      },
      nodes: {
        // Define dropdown options for pre-defined configurations
        config: {
          type: "text",
          label: "Configuration",
          options: [
            "Ethereum mainnet",
            "Rinkeby testnet",
            "Kovan testnet",
            // Add more pre-defined configurations here...
          ],
        },
        // Define network and API key fields
        network: {
          type: "text",
          label: "Network",
          required: true,
          validate: function (v) {
            if (!v) {
              return "Network is required";
            }
            return true;
          },
          visible: function () {
            return !$("#node-config-input-config").val();
          },
        },
        apikey: {
          type: "password",
          label: "API Key",
          required: true,
          validate: function (v) {
            if (!v) {
              return "API key is required";
            }
            return true;
          },
          visible: function () {
            return !$("#node-config-input-config").val();
          },
        },
      },
    },
  });
};
