/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

/**
 * Internal base configuration for all the shared configuration. This file is intentionally not located at the root of
 * the package to avoid being exported and exposed.
 */
module.exports = {
    parser: '@babel/eslint-parser',

    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            parserOpts: {
                plugins: [['decorators', { decoratorsBeforeExport: false }]],
            },
        },
    },

    env: {
        browser: true,
        es6: true,
    },
};
