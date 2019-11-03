#!/usr/bin/env node
const oauth = require('./index')

const showUsage = () => {
  console.log('cli-oauth-client ~ Requests OAuth 1.0 tokens without need for remote server')
  console.log('\tusage: cli-oauth-client <request token url> <authorize url> '
    + '<access token url> <consumer key> <consumer secret>')
}

const main = async () => {
  if (process.argv.length < 7) {
    showUsage()
    process.exit(1)
  }

  const requestTokenUrl = process.argv[2]
  const authorizeUrl = process.argv[3]
  const accessTokenUrl = process.argv[4]
  const consumerKey = process.argv[5]
  const consumerSecret = process.argv[6]

  const result = await oauth.getToken(requestTokenUrl, authorizeUrl,
    accessTokenUrl, consumerKey, consumerSecret)
  
  console.log(`Access token: ${result.accessToken}`)
  console.log(`Access secret: ${result.accessSecret}`)
}

main().then(() => {
  process.exit()
}, (e) => {
  console.error(e)
  process.exit(1)
})