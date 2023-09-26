module.exports = [
  {
    method: 'GET',
    path: '/github',
    handler: 'github.sayHello',
    config: {
      auth: false,
    },
  }
];
