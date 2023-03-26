module.exports = function (RED) {
  const PushService = require("../../lib/PushService");

  function GetChannelDetailsNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    this.userConfiguration = RED.nodes.getNode(config.userConfiguration);
    this.privateKey = RED.nodes.getNode(config.privateKey);

    this.env = config.env;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    console.log(this.userConfiguration)
    console.log(this.privateKey)
    const pushService = new PushService(node);

    this.on("input", async function (msg, send, log) {
      node.status({ fill: "yellow", shape: "ring", text: "working on it..." });
      pushService
        .getChannelDetails(
            this.userConfiguration.caipAddress,
            this.env
        )
        .then((data) => {
          msg.payload = data;
          node.send(msg);
          node.status({
            fill: "green",
            shape: "ring",
            text: `successfully got channel details on ${this.env} env`,
          });
        })
        .catch((error) => {
          node.status({
            fill: "red",
            shape: "ring",
            text: `error getting channel details ${this.env} env`,
          });
          node.error("Could not get Channel Details\n" + error);
        });
    });
  }

  RED.nodes.registerType("getChannelDetails", GetChannelDetailsNode);
};
