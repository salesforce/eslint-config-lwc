/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

module.exports = {
    extends: [require.resolve('./lib/defaults')],

    plugins: ['@lwc/eslint-plugin-lwc'],

    rules: {
        // LWC lifecycle hooks validation
        '@lwc/lwc/no-deprecated': 'error',

        // LWC decorator validation
        '@lwc/lwc/valid-api': 'error',
        '@lwc/lwc/valid-track': 'error',
        '@lwc/lwc/valid-wire': 'error',
    },
};
