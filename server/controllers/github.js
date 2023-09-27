const axios = require('axios')
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
const OAUTH_TOKEN_ENDPOINT = 'https://github.com/login/oauth/access_token'
const OAUTH_USER_INFO_ENDPOINT = 'https://api.github.com/user'
const OAUTH_GRANT_TYPE = 'authorization_code'
const OAUTH_RESPONSE_TYPE = 'code'
const OAUTH_SCOPE = ''

async function githubSignIn(ctx) {
  const config = configValidation()
  const redirectUri = encodeURIComponent(config['GITHUB_OAUTH_REDIRECT_URI'])
  const url = `${OAUTH_ENDPOINT}?client_id=${config['GITHUB_OAUTH_CLIENT_ID']}&redirect_uri=${redirectUri}&scope=${OAUTH_SCOPE}&response_type=${OAUTH_RESPONSE_TYPE}`
  ctx.set('Location', url)
  return ctx.send({}, 302)
}

async function githubAccessToken(code) {
  const config = configValidation()
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('client_id', config['GITHUB_OAUTH_CLIENT_ID']);
  params.append('client_secret', config['GITHUB_OAUTH_CLIENT_SECRET']);
  params.append('redirect_uri', config['GITHUB_OAUTH_REDIRECT_URI']);
  params.append('grant_type', OAUTH_GRANT_TYPE);
  const response = await axios.post(OAUTH_TOKEN_ENDPOINT, params, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const {access_token} = response.data;
  return access_token
}

async function getUserInfos(access_token) {
  const userInfoResponse = await axios.get(OAUTH_USER_INFO_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  console.log(userInfoResponse.headers)
  return userInfoResponse.data
}
async function githubSignInCallback(ctx) {
  const access_token = await githubAccessToken(ctx.query.code)
  const userInfo = await getUserInfos(access_token)
  ctx.send(userInfo)
}
module.exports = { githubSignIn, githubSignInCallback }
