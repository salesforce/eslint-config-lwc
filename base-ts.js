/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const base = require('./base');
const tsLanguageOptions = require('./lib/typescript');

module.exports = {
    ...base,
    languageOptions: {
        ...base.languageOptions,
        ...tsLanguageOptions, // Must be second to override the default parser options
    },
};
