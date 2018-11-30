'use strict';

// Re-exporting the base configuration as the default config so you can omit the configuration name in the .eslintrc:
// ```json
// { "extends": "@salesforce/eslint-config-lwc" }
// ```
module.exports = require('./base');
