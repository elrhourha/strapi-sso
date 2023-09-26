cp -r ./node_modules/strapi-plugin-strapi-sso/patches ./patches
npm publish --access public
patch-package @strapi/admin --include ".*BaseLogin.js"