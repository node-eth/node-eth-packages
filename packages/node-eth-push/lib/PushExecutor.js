const PushAPI = require('@pushprotocol/restapi')

class PushExecutor {

    constructor(node) {

    }

    async getNotifications() {
        let notifications = await PushAPI.user.getFeeds({
            user: "eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681", // user address in CAIP
            env: "staging",
        });
        return Promise.resolve(notifications)
    }

}

module.exports = PushExecutor;