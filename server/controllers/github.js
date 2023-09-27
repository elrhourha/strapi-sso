const configValidation = () => {
  const config = strapi.config.get('plugin.strapi-plugin-strapi-sso')
  if (config['GITHUB_OAUTH_CLIENT_ID'] && config['GITHUB_OAUTH_CLIENT_SECRET']) {
    return config
  }
  throw new Error('GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET are required')
}
/**
 * Common constants
 */
const OAUTH_ENDPOINT = 'https://github.com/login/oauth/authorize'
const OAUTH_TOKEN_ENDPOINT = 'https://accounts.google.com/o/oauth2/token'
const OAUTH_USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo'
const OAUTH_GRANT_TYPE = 'authorization_code'
const OAUTH_RESPONSE_TYPE = 'code'
const OAUTH_SCOPE = ''
async function githubSignIn(ctx) {
  console.log(strapi.config)
  const config = configValidation()
  const redirectUri = encodeURIComponent(config['GITHUB_OAUTH_REDIRECT_URI'])
  const url = `${OAUTH_ENDPOINT}?client_id=${config['GITHUB_OAUTH_CLIENT_ID']}&redirect_uri=${redirectUri}&scope=${OAUTH_SCOPE}&response_type=${OAUTH_RESPONSE_TYPE}`
  ctx.set('Location', url)
  return ctx.send({}, 302)
}

async function githubSignInCallback(ctx) {
  ctx.send(ctx.query.code)
}
module.exports = { githubSignIn, githubSignInCallback }
