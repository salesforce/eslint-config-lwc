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

    it('should load properly base config', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const report = cli.executeOnText(`
            import { api } from 'lwc';
            class Foo {
                @api({ param: true })
                foo;
            }
        `);

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/valid-api');
    });

    it('should include @lwc/lwc/no-unknown-wire-adapters rule', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const report = cli.executeOnText(`
            import { wire } from 'lwc';
            import { Baz } from 'c/cmp';
            class Foo {
                @wire(Baz)
                foo;
            }
        `);

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-unknown-wire-adapters');
    });

    it('should include @lwc/lwc/no-unexpected-wire-adapter-usages', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/base',
            },
        });

        const report = cli.executeOnText(`
            import { wire } from 'lwc';
            import { CurrentPageReference } from 'lightning/navigation';
            const reference = CurrentPageReference;
            class Foo {
                @wire(CurrentPageReference)
                foo;
            }
        `);

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-unexpected-wire-adapter-usages');
    });
});
