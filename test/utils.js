/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const fs = require('fs');
const path = require('path');
const eslint = require('eslint');

const SCOPE_DIRECTORY = path.resolve(__dirname, '../node_modules/@salesforce');
const PACKAGE_DIRECTORY = path.resolve(SCOPE_DIRECTORY, 'eslint-config-lwc');

function linkConfig() {
    if (!fs.existsSync(SCOPE_DIRECTORY)) {
        fs.mkdirSync(SCOPE_DIRECTORY);
    }

    if (!fs.existsSync(PACKAGE_DIRECTORY)) {
        fs.symlinkSync(path.resolve(__dirname, '..'), PACKAGE_DIRECTORY, 'dir');
    }
}

function unlinkConfig() {
    if (fs.existsSync(PACKAGE_DIRECTORY)) {
        fs.unlinkSync(PACKAGE_DIRECTORY);
    }

    if (fs.existsSync(SCOPE_DIRECTORY)) {
        fs.rmdirSync(SCOPE_DIRECTORY);
    }
}

function lintText(text, config) {
    const cli = new eslint.CLIEngine({
        useEslintrc: false,
        baseConfig: config,
    });

    const report = cli.executeOnText(text);

    return report.results[0];
}

module.exports = {
    linkConfig,
    unlinkConfig,
    lintText,
};
