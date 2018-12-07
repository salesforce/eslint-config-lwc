/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const assert = require('assert');
const eslint = require('eslint');

const { linkConfig, unlinkConfig } = require('./utils');

describe('recommended config', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly recommended config', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/recommended',
            },
        });

        const report = cli.executeOnText('document.querySelectorAll("a")');

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-document-query');
    });
});
