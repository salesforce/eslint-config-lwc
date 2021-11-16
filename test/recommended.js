/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const assert = require('assert');
const eslint = require('eslint');
const semver = require('semver');

const { linkConfig, unlinkConfig } = require('./utils');

function getCliEngineWithRecommendedRules() {
    return new eslint.ESLint({
        useEslintrc: false,
        baseConfig: {
            extends: '@salesforce/eslint-config-lwc/recommended',

            // Required for https://github.com/jest-community/eslint-plugin-jest
            settings: {
                jest: {
                    version: '26',
                },
            },
        },
    });
}

describe('recommended config', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly recommended config', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText('document.querySelectorAll("a")');

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-document-query');
    });

    it('should forbid mixing uppercase and underscore characters in public properties', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`
            import { LightningElement, api } from 'lwc';
            export default class Foo extends LightningElement {
                @api bar_Foo() {}
            }
        `);

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/valid-api');
    });

    it('should suggest usage of CustomEvent over Event constructor', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`dispatchEvent(new Event('test'));`);

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/prefer-custom-event');
    });

    it('should forbid duplicate class members', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`
            import { LightningElement, api } from 'lwc';

            export default class App extends LightningElement {
                @api foo = 1;

                set foo(value) { this._foo = value }
                get foo() { return this._foo; }
            }
        `);

        const { messages } = results[0];

        const expected = semver.lt(eslint.ESLint.version, '8.0.0')
            ? ['@lwc/lwc/no-dupe-class-members', '@lwc/lwc/no-dupe-class-members']
            : ['no-dupe-class-members', 'no-dupe-class-members'];
        assert.deepStrictEqual(
            messages.map((_) => _.ruleId),
            expected,
        );
    });

    it('should prevent attributes set during construction', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`
            import { LightningElement } from 'lwc';

            export default class App extends LightningElement {
                constructor() {
                    super();
                    this.tabIndex = '-1';
                }
            }
        `);

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-attributes-during-construction');
    });

    it('should prevent accessing the immediate children of this.template', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`
            import { LightningElement } from 'lwc';

            export default class App extends LightningElement {
                renderedCallback() {
                    const element = this.template.firstChild;
                    element.focus();
                }
            }
        `);

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-template-children');
    });

    it('should prevent invalid usage of Apex method', async () => {
        const cli = getCliEngineWithRecommendedRules();

        const results = await cli.lintText(`
            import findContacts from '@salesforce/apex/ContactController.findContacts';
            findContacts('Ted');
        `);

        const { messages } = results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(
            messages[0].ruleId,
            '@salesforce/lightning/valid-apex-method-invocation',
        );
    });
});
