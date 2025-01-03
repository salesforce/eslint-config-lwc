/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const globals = require('globals');
const babelParser = require('@babel/eslint-parser');

/**
 * Internal base configuration for all the shared configuration. This file is intentionally not located at the root of
 * the package to avoid being exported and exposed.
 */
module.exports = {
    parser: babelParser,
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            parserOpts: {
                plugins: [['decorators', { decoratorsBeforeExport: false }]],
            },
        },
    },
    globals: {
        ...globals.browser,
        ...globals.es2015,
    },
};
