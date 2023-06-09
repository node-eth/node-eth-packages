const PushAPI = require("@pushprotocol/restapi");
const PushUtils = require("./PushUtils");
const ethers = require('ethers');

/**
 * Dev Notes* - 
 * 
 * TODO - refactor this class and break it down into smaller pieces 
 * ASAP before it turns into a nightmare
 * 
 * I swapped the order of arguments of some functions but i made sure
 * to document the functions with jsdoc.
 * Having consistent arguments always be 1st or 2nd makes more sense at this given moment
 * (Until we switch to typed languages or ts)
 * 
 * Ref documentation page:
 * https://docs.push.org/developers/
 */
module.exports = class PushService {

  // Once we introduce the global / 3rd party context for wallets/signers
  // wallets: []
  // providers: []

  // #region Constructor
  /**
   * Dev Note* - we may not need node instance at this very given moment but i would
   * argue that it should remain here as a reminder that node properties and behaviour 
   * should be handled by this service and not within the node itself since code
   * there is confusing enough already
   * 
   * @param {any} node - OPTIONAL: node represents the instance of the node in which push
   * service is initiated. Through it we can access the nodeRED node itself
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
   * DEPRECATED \
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
      return Promise.reject("Push Service: Couldn't fetch channel subscribers: " + error);
    }
  }
  // #endregion

  // #region Get Channel Details
  /**
   * 
   * @param {String} caipAddress - address in CAIP format
   * @param {String[prod | staging | dev]} env - API environment
   * 
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
      return Promise.reject("Push Service: Couldn't fetch channel details: " + error);
    }
  }
  // #endregion

  // #region Search for Channel 
  /**
   * 
   * @param {String} query - string to query the channel names by
   * @param {String[prod | staging | dev]} env - API environment
   * @param {Number} page - page index, default 1
   * @param {Number} limit - number of items per page, default 10
   * 
   * @returns list of channels that match the query in the search
   */
  async searchForChannel(query, env, page, limit) {
    try {
      const channelsData = await PushAPI.channels.search({
        query: query, // A string search query
        page: page, // range (0, ]
        limit: limit, // range [1, 30]
        env: env
      })
      return Promise.resolve(channelsData)
    } catch (error) {
      return Promise.reject("Push Service: Couldn't get channel query response data: " + error)
    }
  }
  // #endregion

  // TODO - alias these functions to optIn / optOut


  // #region Subscribe to a Channel
  /**
   * Dev Note* - Lets have subscribe and unsubscribe sepparated for now, we can merge them later on
   * 
   * This method returns whether or not the subscription was successful, meaning if user failed to subscribe
   * because he was already subscribed, the promise will still get resolved. Only exception is the
   * method failing to execute the .subscribe call
   * 
   * @param {String} channelCaipAddress - address of the channel this action is directed to
   * @param {String} userCaipAddress - address of the user performing the action in CAIP
   * @param {Wallet} _signer - ethers signer instance ethers.Wallet(Private_Key)
   * @param {String[prod | staging | dev]} env - API environment
   * 
   * @returns {Boolean} - whether or not the subscription was sucessful (Boolean)
   */
  async subscribeToChannel(channelCaipAddress, userCaipAddress, _signer, _env) {
    try { 
      await PushAPI.channels.subscribe({
        signer: _signer,
        channelAddress: channelCaipAddress, // channel address in CAIP
        userAddress: userCaipAddress, // user address in CAIP
        onSuccess: () => {
         console.log('Successfully opted in'); 
         Promise.resolve(true)
        },
        onError: (err) => {
          console.error('Failed to opt in');
          console.error(err)
          Promise.resolve(false)
        },
        env: _env
      })
    } catch(error) {
      return Promise.reject("Push Service: Error while subscribing to the channel: " + error)
    }
  }
  // #endregion  

  // #region Unsubscribe from a Channel
  /**
   * 
   * @param {String} channelCaipAddress - address of the channel this action is directed to
   * @param {String} userCaipAddress - address of the user performing the action in CAIP
   * @param {Wallet} _signer - ethers signer instance ethers.Wallet(Private_Key)
   * @param {String[prod | staging | dev]} env - API environment
   * 
   * @returns {Boolean} - whether or not the unsubscribe was sucessful (Boolean)
   */
  async unsubscribeFromChannel(channelCaipAddress, userCaipAddress, _signer, _env) {
    try { 
      await PushAPI.channels.unsubscribe({
        signer: _signer,
        channelAddress: channelCaipAddress, // channel address in CAIP
        userAddress: userCaipAddress, // user address in CAIP
        onSuccess: () => {
         console.log('Successfully opted out'); 
         Promise.resolve(true)
        },
        onError: (err) => {
          console.error('Failed to opt out');
          console.error(err)
          Promise.resolve(false)
        },
        env: _env
      })
    } catch(error) {
      return Promise.reject("Push Service: Error while subscribing to the channel: " + error)
    }
  }
  // #endregion

  // TODO - send notification
};
