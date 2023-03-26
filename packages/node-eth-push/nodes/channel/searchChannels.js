module.exports = function (RED) {
    const PushService = require("../../lib/PushService");
  
    function SearchChannelsNode(config) {
      RED.nodes.createNode(this, config);
  
      var node = this;
      this.query = config.query;
      this.env = config.env;
      this.page = config.page;
      this.limit = config.limit;
  
      const pushService = new PushService(node);
  
      this.on("input", async function (msg, send, log) {
        node.status({ fill: "yellow", shape: "ring", text: "working on it..." });
        const queryParams = RED.util.evaluateNodeProperty(config.query, config.queryType || "str", node, msg)
        node.log(queryParams);
        pushService
            .searchForChannel(
                queryParams,
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
                  text: `successfully got channels on ${this.env} env`,
                });
              })
              .catch((error) => {
                node.status({
                  fill: "red",
                  shape: "ring",
                  text: `error getting channels on ${this.env} env`,
                });
                node.error("Could not get Search results\n" + error);
              });
      });
    }
  
    RED.nodes.registerType("searchChannels", SearchChannelsNode);
  };
  