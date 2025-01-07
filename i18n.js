/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const pluginLighting = require('@salesforce/eslint-plugin-lightning');

module.exports = [
    {
        plugins: {
            '@salesforce/lightning': pluginLighting, // https://github.com/salesforce/eslint-plugin-lightning
        },

        rules: {
            // I18N Rules
            '@salesforce/lightning/no-aura-localization-service': 'warn',
            '@salesforce/lightning/no-moment': 'warn',
            '@salesforce/lightning/prefer-i18n-service': 'warn',
        },
    },
];
