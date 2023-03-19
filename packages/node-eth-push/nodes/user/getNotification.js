module.exports = function (RED) {
  const PushAPI = require("@pushprotocol/restapi");
  const PushExecutor = require('../../lib/PushExecutor');

  function GetNotificationNode(config) {
    RED.nodes.createNode(this, config);

    this.userConfiguration = RED.nodes.getNode(config.userConfiguration);

    // now im not sure if or if not will this work
    // this.on("input", async function (msg, send) {
    //   let notifications = await PushAPI.user.getFeeds({
    //     user: "eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681", // user address in CAIP
    //     env: "staging",
    //   });
    //   log(notifications);
    //   send(notifications);
    // });

    this.on("input", function (msg, send, log) {
        let pushExecutor = new PushExecutor();
        pushExecutor.getNotifications()
    })
  }

  RED.nodes.registerType("getNotification", GetNotificationNode);
};
