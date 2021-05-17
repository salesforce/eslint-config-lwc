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

function getCliEngineWithRecommendedRules() {
    return new eslint.CLIEngine({
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

    it('should load properly recommended config', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText('document.querySelectorAll("a")');

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-document-query');
    });

    it('should forbid mixing uppercase and underscore characters in public properties', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText(`
            import { LightningElement, api } from 'lwc';
            export default class Foo extends LightningElement {
                @api bar_Foo() {}
            }
        `);

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/valid-api');
    });

    it('should suggest usage of CustomEvent over Event constructor', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText(`dispatchEvent(new Event('test'));`);

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/prefer-custom-event');
    });

    it('should forbid duplicate class members', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText(`
            import { LightningElement, api } from 'lwc';

            export default class App extends LightningElement {
                @api foo = 1;

                set foo(value) { this._foo = value }
                get foo() { return this._foo; }
            }
        `);

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 2);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-dupe-class-members');
        assert.strictEqual(messages[1].ruleId, '@lwc/lwc/no-dupe-class-members');
    });

    it('should prevent attributes set during construction', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText(`
            import { LightningElement } from 'lwc';

            export default class App extends LightningElement {
                constructor() {
                    super();
                    this.tabIndex = '-1';
                }
            }
        `);

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(messages[0].ruleId, '@lwc/lwc/no-attributes-during-construction');
    });

    it('should prevent invalid usage of Apex method', () => {
        const cli = getCliEngineWithRecommendedRules();

        const report = cli.executeOnText(`
            import findContacts from '@salesforce/apex/ContactController.findContacts';
            findContacts('Ted');
        `);

        const { messages } = report.results[0];
        assert.strictEqual(messages.length, 1);
        assert.strictEqual(
            messages[0].ruleId,
            '@salesforce/lightning/valid-apex-method-invocation',
        );
    });
});
