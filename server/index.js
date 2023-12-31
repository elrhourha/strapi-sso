'use strict';

const register = require('./register');
const bootstrap = require('./bootstrap');
const destroy = require('./destroy');
const config = require('./config');
const controllers = require('./controllers');
const services = require('./services');
const routes = require('./routes');
const policies = require('./policies');

module.exports = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  services,
  routes,
  policies,
};
