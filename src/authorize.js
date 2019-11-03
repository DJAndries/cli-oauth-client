const http = require('http')
const qs = require('qs')
const open = require('open')

const selfClosingPage = `<!doctype html><html><head><script>
window.onload = function load() {
  window.open('', '_self', '');
  window.close();
};
</script></head>
<body>You may close this window.</body>
</html>`

module.exports.authorize = (port, authorizeUrl, token) => {
  return new Promise((resolve, reject) => {
    
    const authorizeParams = {
      oauth_token: token
    }

    const server = http.createServer((req, res) => {

      const params = qs.parse(req.url.substring(req.url.lastIndexOf('?') + 1))
      res.setHeader('Content-Type', 'text/html')
      res.end(selfClosingPage)
      server.close()
      resolve(params)

    })

    server.listen(port)

    server.on('listening', () => {
      open(`${authorizeUrl}?${qs.stringify(authorizeParams)}`)
    })

    server.on('error', (e) => {
      reject(e)
    })
  })
}