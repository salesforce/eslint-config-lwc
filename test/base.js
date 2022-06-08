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

describe('base config', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly base config', async () => {
        const cli = new eslint.ESLint({
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
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const expectedFailures = [
            'c/cmp',
            'commerce/cmp',
            'commerce/cmpApiInternal',
            'experience/cmp',
        ];
        for (const bundleName of expectedFailures) {
            const results = await cli.lintText(`
                import { wire } from 'lwc';
                import { getAdapter } from '${bundleName}';
                class Foo {
                    @wire(getAdapter)
                    wiredProp;
                }
            `);

            const { messages } = results[0];
            assert.equal(messages.length, 1);
            assert.equal(messages[0].ruleId, '@lwc/lwc/no-unknown-wire-adapters');
        }

        const expectedSuccesses = ['commerce/cmpApi', 'experience/cmpApi'];
        for (const bundleName of expectedSuccesses) {
            const results = await cli.lintText(`
                import { wire } from 'lwc';
                import { getAdapter } from '${bundleName}';
                class Foo {
                    @wire(getAdapter)
                    wiredProp;
                }
            `);

            const { messages } = results[0];
            assert.equal(messages.length, 0);
        }
    });

    it('should include @lwc/lwc/no-unexpected-wire-adapter-usages', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const expectedFailures = [
            ['lightning/navigation', 'CurrentPageReference'],
            ['commerce/cmpApi', 'getAdapter'],
            ['experience/cmpApi', 'getAdapter'],
        ];
        for (const [bundleName, cmpName] of expectedFailures) {
            const results = await cli.lintText(`
                import { wire } from 'lwc';
                import { ${cmpName} } from '${bundleName}';
                const reference = ${cmpName};
                class Foo {
                    @wire(${cmpName})
                    wiredProp;
                }
            `);

            const { messages } = results[0];
            assert.equal(messages.length, 1);
            assert.equal(messages[0].ruleId, '@lwc/lwc/no-unexpected-wire-adapter-usages');
        }
    });

    it('should include @lwc/lwc/no-disallowed-lwc-imports', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const results = await cli.lintText(`
            import { yolo } from 'lwc';
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-disallowed-lwc-imports');
    });
});
