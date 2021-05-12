/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const fs = require('fs');
const path = require('path');

const PACKAGE_DIRECTORY = path.resolve(__dirname, '../node_modules/@salesforce/eslint-config-lwc');

function linkConfig() {
    if (!fs.existsSync(PACKAGE_DIRECTORY)) {
        fs.symlinkSync(path.resolve(__dirname, '..'), PACKAGE_DIRECTORY, 'dir');
    }
}

function unlinkConfig() {
    if (fs.existsSync(PACKAGE_DIRECTORY)) {
        fs.unlinkSync(PACKAGE_DIRECTORY);
    }
}

module.exports = {
    linkConfig,
    unlinkConfig,
};
