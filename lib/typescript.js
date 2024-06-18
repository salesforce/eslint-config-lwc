/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const defaults = require('./defaults');
const { parserOptions } = defaults;
const { babelOptions } = parserOptions;
const { parserOpts } = babelOptions;
const { plugins } = parserOpts;

/**
 * Internal base configuration for all the TypeScript configurations. Equivalent to the JS defaults,
 * with the addition of 'typescript' to the babel parser plugins array.
 * NOTE: This file is intentionally not located at the root of the package to avoid being exported and exposed.
 */
module.exports = {
    ...defaults,
    parserOptions: {
        ...parserOptions,
        babelOptions: {
            ...babelOptions,
            parserOpts: {
                ...parserOpts,
                plugins: [...plugins, 'typescript'],
            },
        },
    },
};
