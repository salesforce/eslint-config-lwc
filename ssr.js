/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

module.exports = {
    extends: [require.resolve('./lib/defaults')],
    plugins: [
        '@lwc/eslint-plugin-lwc', // https://github.com/salesforce/eslint-plugin-lwc
    ],
    rules: {
        '@lwc/lwc/no-unsupported-ssr-properties': 'error',
        '@lwc/lwc/no-restricted-browser-globals-during-ssr': 'error',
    },
};
