module.exports = function(RED) {
  const PushService = require("../../lib/PushService");

  function GetUserSubscriptionsNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    this.userConfiguration = RED.nodes.getNode(config.userConfiguration);
    this.env = config.env;

    const pushService = new PushService(node);


    this.on("input", async function (msg, send, log) {
      node.status({ fill: "yellow", shape: "ring", text: "working on it..." });
      pushService
        .getUserSubscriptions(
          this.userConfiguration.caipAddress,
          this.env
        )
        .then((data) => {
          msg.payload = data;
          node.send(msg);
          node.status({
            fill: "green",
            shape: "ring",
            text: `successfully got subscriptions on ${this.env} env`,
          });
        })
        .catch(() => {
          node.status({
            fill: "red",
            shape: "ring",
            text: `error getting notifs on ${this.env} env`,
          });
          node.error("Could not get User subscriptions");
        });
    });
  }

  RED.nodes.registerType("getUserSubscriptions", GetUserSubscriptionsNode);
}