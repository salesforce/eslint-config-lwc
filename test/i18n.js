/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const assert = require('assert');
const eslint = require('eslint');

const { linkConfig, unlinkConfig } = require('./utils');

describe('i18n configs', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly i18n config with other set', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: [
                    '@salesforce/eslint-config-lwc/i18n',
                    '@salesforce/eslint-config-lwc/base',
                ],
            },
        });

        const results = await cli.lintText(`
        var moment = require('moment');
        var a = moment('2016-01-01'); 
        a.format();
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@salesforce/lightning/no-moment');
    });

    it('extended set should include @salesforce/lightning/no-moment rule', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/i18n',
            },
        });

        const results = await cli.lintText(`
        var moment = require('moment');
        var a = moment('2016-01-01'); 
        a.format();
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@salesforce/lightning/no-moment');
    });
});

describe('typescript i18n configs', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly i18n config with other set', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: [
                    '@salesforce/eslint-config-lwc/i18n-ts',
                    '@salesforce/eslint-config-lwc/base-ts',
                ],
            },
        });

        const results = await cli.lintText(`
        const moment = require('moment');
        const a: moment.Moment = moment('2016-01-01'); 
        a.format();
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@salesforce/lightning/no-moment');
    });

    it('extended set should include @salesforce/lightning/no-moment rule', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/i18n-ts',
            },
        });

        const results = await cli.lintText(`
        const moment = require('moment');
        const a: moment.Moment = moment('2016-01-01'); 
        a.format();
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@salesforce/lightning/no-moment');
    });
});
