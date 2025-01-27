/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

module.exports = {
    extends: [require.resolve('./ssr')],
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: ['**/*.ts'],
            processor: '@lwc/lwc/ssr',
        },
        {
            files: ['**/*.ssrjs', '**/*.ssrts'],
            parserOptions: {
                project: null, // Skip type checking for .ssrjs and .ssrts files
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
    ],
};
