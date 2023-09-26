'use strict';

// WARNING: the admin panel now uses webpack 5 to bundle the application.
const path = require("path");

module.exports = (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack configuration
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.resolve.alias['@strapi/icons'] = path.resolve('node_modules', '@strapi/icons');

    // Important: return the modified configuration
    return config;
};