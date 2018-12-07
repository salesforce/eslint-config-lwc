/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

// Re-exporting the base configuration as the default config so you can omit the configuration name in the .eslintrc:
// ```json
// { "extends": "@salesforce/eslint-config-lwc" }
// ```
module.exports = require('./base');
