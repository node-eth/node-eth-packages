module.exports = function (RED) {
  const PushService = require("../../lib/PushService");

  function GetChannelSubscribersNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    this.userConfiguration = RED.nodes.getNode(config.userConfiguration);
    this.env = config.env;
    this.limit = config.limit;
    this.page = config.page;

    const pushService = new PushService(node);
    
    this.on("input", async function (msg, send, log) {
      node.status({ fill: "yellow", shape: "ring", text: "working on it..." });
      pushService
        .getChannelSubscribers(
          this.userConfiguration.caipAddress,
          this.env,
          this.page,
          this.limit
        )
        .then((data) => {
          msg.payload = data;
          node.send(msg);
          node.status({
            fill: "green",
            shape: "ring",
            text: `successfully got channel subscribers on ${this.env} env`,
          });

        })
        .catch((error) => {
          node.status({
            fill: "red",
            shape: "ring",
            text: `error getting channel subscribers ${this.env} env`,
          });
          node.error("Could not get Channel Subscribers\n" + error);
        });
    })

}

  RED.nodes.registerType("getChannelSubscribers", GetChannelSubscribersNode);
};
