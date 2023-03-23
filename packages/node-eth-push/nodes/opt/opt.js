module.exports = function (RED) {
    const PushService = require("../../lib/PushService");
  
    function OptNode(config) {
      RED.nodes.createNode(this, config);
  
      var node = this;

      this.name = config.name;
      this.method = config.method;
  
      const pushService = new PushService(node);
  

      this.on("input", async function (msg, send, log) {
        node.status({ fill: "yellow", shape: "ring", text: "working on it..." });
        if (this.method === "opt-in") {
          console.log(this.method)
        } else if(this.method === "opt-out") {


        } else {
          node.status({ fill: "red", shape: "ring", text: "Failed" });
          node.error("Cannot recognize method")
        }
      });
    }

    RED.nodes.registerType("opt-node", OptNode);
  };
  