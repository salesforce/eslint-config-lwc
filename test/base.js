/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const assert = require('assert');
const eslintCompat = require('./eslintCompat.js');

const { linkConfig, unlinkConfig } = require('./utils');

describe('base config', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly base config', async () => {
        const cli = new eslintCompat.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const results = await cli.lintText(`
            import { api } from 'lwc';
            class Foo {
                @api({ param: true })
                foo;
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/valid-api');
    });

    it('should include @lwc/lwc/no-unknown-wire-adapters rule', async () => {
        const cli = new eslintCompat.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const results = await cli.lintText(`
            import { wire } from 'lwc';
            import { Baz } from 'c/cmp';
            class Foo {
                @wire(Baz)
                foo;
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-unknown-wire-adapters');
    });

    it('should include @lwc/lwc/no-unexpected-wire-adapter-usages', async () => {
        const cli = new eslintCompat.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const results = await cli.lintText(`
            import { wire } from 'lwc';
            import { CurrentPageReference } from 'lightning/navigation';
            const reference = CurrentPageReference;
            class Foo {
                @wire(CurrentPageReference)
                foo;
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-unexpected-wire-adapter-usages');
    });
});
