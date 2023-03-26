module.exports = function (RED) {
  const PushService = require("../../lib/PushService");
  const ethers = require ('ethers');

  function OptNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    const pushService = new PushService(node);

    this.env = config.env;
    this.name = config.name;
    this.method = config.method;

    // This is the Signer or the User
    this.signer = RED.nodes.getNode(config.signerConfiguration);
    // This is the Channel
    this.channel = RED.nodes.getNode(config.userConfiguration);
    
    const env = this.env;
    const signer = this.signer.signer;
    const channelCaipAddress = this.channel.caipAddress;
    const userCaipAddress = this.signer.caipAddress;

    
    // #region Node Input Trgger section
    /**
     * Nodes On Input trigger Section
     */
    this.on("input", async function (msg, send, log) {
      node.status({ fill: "yellow", shape: "ring", text: "working on it..." });

      if (this.method === "opt-in") {
        // #region Subscribe Logic
        /**
         * Execute Subscribe ( Opt-In ) logic
         */
        try {
          pushService
            .subscribeToChannel(
              channelCaipAddress,
              userCaipAddress,
              signer,
              env
            )
            .then((result) => {
              if (result) {
                node.send("Successfully Opted in");
                node.status({
                  fill: "green",
                  shape: "dot",
                  text: "Successful Opt in",
                });
              } else {
                node.send(
                  "Unsuccessful Opt in. Executed without errros. Are you already a subscriber?"
                );
                node.status({
                  fill: "yellow",
                  shape: "dot",
                  text: "Unsuccessful opt in without errors",
                });
              }
            })
            .catch((error) => {
              node.send("Error While executing opt in: " + error);
              node.status({
                fill: "red",
                shape: "ring",
                text: "Error while Opting in",
              });
            });
        } catch (err) {
          node.error("Error Trying to Opt in: " + err);
          node.status({ fill: "red", shape: "ring", text: "Error Opting in" });
        }
        // #endregion
      } else if (this.method === "opt-out") {
        // #region Unsubscribe Logic
        /**
         * Execute Unsubscribe ( Opt-Out ) logic
         */
        try {
        } catch (err) {
          node.error("Error Trying to Opt out");
          node.status({ fill: "red", shape: "ring", text: "Error Opting out" });
        }

        // #endregion
      } else {
        node.status({ fill: "red", shape: "ring", text: "Failed" });
        node.error("Cannot recognize method");
      }
    });
    // #endregion
  }

  RED.nodes.registerType("opt-node", OptNode);
};
