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

describe('extended config', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly extended config', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/extended',

                // Required for https://github.com/jest-community/eslint-plugin-jest
                settings: {
                    jest: {
                        version: '26',
                    },
                },
            },
        });

        const report = cli.executeOnText(`
            export function sum(...args) {
                return args.reduce((acc, val) => acc + val, 0);
            }
        `);

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-rest-parameter');
    });
});
