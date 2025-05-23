/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const tsLanguageOptions = require('./lib/typescript');
const extended = require('./extended');

module.exports = [
    ...extended,
    // The following config will take effect as explained in
    // https://eslint.org/docs/latest/use/configure/configuration-files#cascading-configuration-objects
    {
        languageOptions: {
            ...tsLanguageOptions,
        },
    },
];
