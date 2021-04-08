const request = require('request')
const config = require('config')

class AssetRequest { 
    botRequest = (resRedirect, route, method = "GET", body = null, headers = {}) => {
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
            if (res || err) {
                const {message} = JSON.parse(body)
                resRedirect.status(res.statusCode).json({message})
            }
        })
    }
}
module.exports = AssetRequest