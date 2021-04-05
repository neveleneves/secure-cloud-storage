const request = require('request')
const config = require('config')

class AssetRequest { 
    botRequest = (route, method = "GET", body = null, headers = {}) => {
        if(body) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }
        console.log(body)

        const options = {
            url: `${config.get("botServerURL")}/bot${config.get("TelegramBotToken")}${route}`,
            method: method,
            headers: headers,
            body: body
        };

        request(options, function(err, res, body) {
            if (err) {
                console.error('Error Bot-Request: ', err);
            }
        });
    }
}
module.exports = AssetRequest