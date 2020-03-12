const WxConfig = require("./WxConfig");
const https = require("https");

module.exports = {

    __cachedTicket: undefined,

    loadData(url) {
        return new Promise((resolve, reject) => {
            https.get(
                url,
                function (response) {

                    let allData = Buffer.from("");
                    response.on("data", data => {
                        allData = Buffer.concat([allData, data]);
                    });

                    response.on("end", () => {
                        resolve(allData);
                    });

                    response.on("error", reject);
                });
        });
    },

    async getAccessToken() {
        let data = await this.loadData(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WxConfig.APP_ID}&secret=${WxConfig.APP_SECRET}`);
        let result = JSON.parse(data.toString());
        return result['access_token'];
    },

    async getJsAPITicket(token) {
        let data = await this.loadData(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`);
        let result = JSON.parse(data.toString());
        return result['ticket'];
    },

    async cacheTicket() {
        let ticket = await this.getJsAPITicket(await this.getAccessToken());
        this.__cachedTicket = {value: ticket, timestamp: Date.now()};
        return ticket;
    },

    async getTicket() {
        let ticket;
        if (this.__cachedTicket) {
            if (Date.now() - this.__cachedTicket.timestamp < 7100000) {
                ticket = this.__cachedTicket.value;
            } else {
                ticket = this.cacheTicket();
            }
        } else {
            ticket = this.cacheTicket();
        }
        return ticket;
    }
};