const oauth = require('oauth')

const authorize = require('./authorize')

const requestToken = (oauthClient) => {
  return new Promise((resolve, reject) => {
    oauthClient.getOAuthRequestToken(null, (err, token, secret) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ token, secret })
    })
  })
  
}

const accessToken = (oauthClient, token, secret, verifier) => {
  return new Promise((resolve, reject) => {
    oauthClient.getOAuthAccessToken(token, secret, verifier, (err, accessToken, accessSecret) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ accessToken, accessSecret })
    })
  })
}

module.exports.getToken = async (requestTokenUrl, authorizeUrl, accessTokenUrl,
  consumerKey, consumerSecret, port = 8085) => {

  const oauthClient = new oauth.OAuth(requestTokenUrl, accessTokenUrl,
    consumerKey, consumerSecret, '1.0', null, 'HMAC-SHA1')

  const requestTokenResult = await requestToken(oauthClient)

  const authorizeResult = await authorize.authorize(port, authorizeUrl,
    requestTokenResult.token)

  const accessTokenResult = await accessToken(oauthClient, requestTokenResult.token,
    requestTokenResult.secret, authorizeResult.oauth_verifier)

  return Object.assign({ oauthClient }, accessTokenResult)
}