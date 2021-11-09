/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const eslint = require('eslint');

// Small compat layer to support ESLint v8 API on both v7 and v8
class ESLintCompat {
    constructor(options) {
        Object.assign(options, options.overrideConfig);
        delete options.overrideConfig;
        this.eslint = new eslint.CLIEngine(options);
    }

    lintText(text) {
        return this.eslint.executeOnText(text).results;
    }
}
const isEslint7 = !!eslint.CLIEngine;
const ESLint = isEslint7 ? ESLintCompat : eslint.ESLint;

module.exports = {
    ESLint,
};
