const PushAPI = require("@pushprotocol/restapi");
const PushUtils = require("./PushUtils");

/**
 *
 */
module.exports = class PushService {

  // #region Constructor
  /**
   * @param {any} node - node represents the instance of the node in which push service is initiated. Through it we can access the nodeRED node itself
   */
  constructor(node) {}
  // #endregion

  // #region Get User Notifications
  /**
   *
   * @param {String} caipAddress - address in CAIP format
   * @param {Boolean} spam - Etither fetch notifications or spa (everything else)
   * @param {String[prod | staging | dev]} env - API environment
   *
   * @returns user's notifications
   */
  async getUserNotifications(caipAddress, spam, env) {
    if (!env)
      return Promise.reject(
        "Push Service: No env provided for getting user notifications"
      );
    try {
      const notifications = await PushAPI.user.getFeeds({
        user: caipAddress, // user address in CAIP-10
        spam: spam,
        env: env,
      });
      return Promise.resolve(notifications);
    } catch (error) {
      return Promise.reject("Push Service: Couldn't fetch user notifications");
    }
  }
  // #endregion

  // #region Get User Subscriptions
  /**
   * 
   * @param {String} caipAddress - address in CAIP format
   * @param {String[prod | staging | dev]} env - API environment
   * @returns user's subscriptions
   */
  async getUserSubscriptions(caipAddress, env) {
    if (!env)
      return Promise.reject(
        "Push Service: No env provided for getting user subscriptions"
      );
    try {
      const subscriptions = await PushAPI.user.getSubscriptions({
        user: caipAddress, // user address in CAIP
        env: env,
      });
      return Promise.resolve(subscriptions);
    } catch (error) {
      return Promise.reject("Push Service: Couldn't fetch user subscriptions");
    }
  }
  //#endregion

  // #region Get Channel Subscribers
  /**
   * Note* - Every user becomes a 'channel' once it stakes required amount of PUSH tokens
   * Every Channel is a user(wallet) but not every user(wallet) is a channel
   * 
   * @param {String} caipAddress address in CAIP format
   * @param {String[prod | staging | dev]} env API environment
   * @param {number} page (Optional) page index of the results, greater than 0, default 1
   * @param {number} limit number of items in 1 page, greater than 0 and max 30, default 10
   * @returns user's subscribers
   */
  async getChannelSubscribers(caipAddress, env, page, limit) {
    if (!env)
      return Promise.reject(
        "Push Service: No env provided for getting channel subscribers"
      );
    try {
      const subscribers = await PushAPI.user.getSubscribers({
        channel: caipAddress, // channel address in CAIP
        page: page, // Optional, defaults to 1
        limit: limit, // Optional, defaults to 10
        env: env // Optional, defaults to 'prod'
      });
      return Promise.resolve(subscribers);
    } catch (error) {
      return Promise.reject("Push Service: Couldn't fetch channel subscribers");
    }
  }
  // #endregion

  // #region Get Channel Details
  /**
   * 
   * @param {String} caipAddress - address in CAIP format
   * @param {String[prod | staging | dev]} env - API environment
   * @returns channel's details
   */
  async getChannelDetails(caipAddress, env) {
    if (!env)
      return Promise.reject(
        "Push Service: No env provided for getting channel details"
      );
    try {
      const channelData = await PushAPI.channels.getChannel({
        channel: caipAddress, // channel address in CAIP
        env: env
      });
      return Promise.resolve(channelData || null);
    } catch (error) {
      return Promise.reject("Push Service: Couldn't fetch channel details");
    }
  }
  // #endregion

  // TODO - search for channels

  // #region Set Output
  /**
   * This function will not be used before we finish all the
   * functionalities that we planned on implementing for the push
   * protocol node package
   */
  // setOutput(result, msg) {
  //   if (this.output) {
  //     switch (this.output.context) {
  //       case "msg": {
  //         // non null assertion should be added in here
  //         msg[this.output?.key] = result;
  //         this.node.send(msg);
  //         break;
  //       }
  //       case "flow": {
  //         this.node.context().flow.set(this.output.key, result);
  //         this.node.send(msg);
  //         break;
  //       }
  //       case "global": {
  //         this.node.context().global.set(this.output.key, result);
  //         this.node.send(msg);
  //         break;
  //       }
  //     }
  //   }
  // }
  // #endregion
};
