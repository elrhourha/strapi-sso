module.exports = [
  {
    method: 'GET',
    path: '/github',
    handler: 'github.githubSignIn',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/github/callback',
    handler: 'github.githubSignInCallback',
    config: {
      auth: false,
    }
  }
];
