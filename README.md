# cli-oauth-client

[![npm version](https://badge.fury.io/js/cli-oauth-client.svg)](https://badge.fury.io/js/cli-oauth-client)

Library and CLI tool that requests OAuth 1.0 tokens without need for a remote server.
Designed for CLI tools that require three-pegged OAuth authentication.

When invoked, it will:
* Request an OAuth token on behalf of your application
* Spin up a temporary local server to handle the OAuth callback from the identity provider
* Open a browser window with the identity provider authorization url
* Request and return access token/secret, along with the OAuth client

Can be used as a CLI tool or library.

## Installation

As a CLI:

```
npm install -g cli-oauth-client
```

As a library:

```
npm install cli-oauth-client oauth
```

## Usage

For the CLI, run `cli-oauth-client` for usage details.

For the library, there is one function:

```js
const cliOAuthClient = require('cli-oauth-client')

const result = await cliOAuthClient.getToken(requestTokenUrl, authorizeUrl,
  accessTokenUrl, consumerKey, consumerSecret)
```

Three fields in result object:

* accessToken
* accessSecret
* oauthClient - Reference to [OAuth client instance](https://github.com/ciaranj/node-oauth) for future requests