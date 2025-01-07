/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const eslintPluginLwc = require('@lwc/eslint-plugin-lwc');
const languageOptions = require('./lib/defaults');

module.exports = [
    {
        languageOptions,
        plugins: {
            '@lwc/lwc': eslintPluginLwc, // https://github.com/salesforce/eslint-plugin-lwc
        },
        rules: {
            '@lwc/lwc/ssr-no-unsupported-properties': 'error',
            '@lwc/lwc/ssr-no-restricted-browser-globals': 'error',
            '@lwc/lwc/ssr-no-form-factor': 'error',
            '@lwc/lwc/ssr-no-host-mutation-in-connected-callback': 'error',
            '@lwc/lwc/ssr-no-node-env': 'error',
            '@lwc/lwc/ssr-no-unsupported-node-api': 'error',
            '@lwc/lwc/ssr-no-static-imports-of-user-specific-scoped-modules': 'error',
        },
    },
];
