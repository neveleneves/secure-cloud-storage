const request = require('request')
const config = require('config')
const jwt = require('jsonwebtoken');
class AssetRequest { 
    botRequest = (resRedirect, route, method = "GET", body = null, headers = {}) => {
        if(body) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }

        const options = {
            url: `${config.get("botServerURL")}/bot${config.get("TelegramBotToken")}${route}`,
            method: method,
            headers: headers,
            body: body
        };

        request(options, function(err, res, body) {
            if (res || err) {
                const {message, userLoginSuccess} = JSON.parse(body)

                if(userLoginSuccess) {
                    const jsonToken = jwt.sign({
                        userLoginSuccess,
                    },
                    config.get('JWTsecret'),
                    {expiresIn: '14d'}
                    )
                    resRedirect.cookie('token', jsonToken, {httpOnly: true});

                    const userConfirm = {
                        jsonToken,
                        userSuccessID: userLoginSuccess
                    }
                    return resRedirect.status(res.statusCode).json({...userConfirm})
                }
                return resRedirect.status(res.statusCode).json({message})
            }
        })
    }
}
module.exports = AssetRequest