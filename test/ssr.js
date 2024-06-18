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

describe('ssr configs', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: ['@salesforce/eslint-config-lwc/ssr'],
            },
        });

        const results = await cli.lintText(`
            import { LightningElement } from 'lwc';

            export default class Foo extends LightningElement {
              connectedCallback() {
                document.write("Hello world")
                this.dispatchEvent("Hello world")
              }
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 2);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-restricted-browser-globals-during-ssr');
        assert.equal(messages[1].ruleId, '@lwc/lwc/no-unsupported-ssr-properties');
    });
});

describe('typescript ssr configs', () => {
    before(() => {
        linkConfig();
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly', async () => {
        const cli = new eslint.ESLint({
            useEslintrc: false,
            baseConfig: {
                extends: ['@salesforce/eslint-config-lwc/ssr-ts'],
            },
        });

        const results = await cli.lintText(`
            import { LightningElement } from 'lwc';

            export default class Foo extends LightningElement {
              connectedCallback(): void {
                document.write("Hello world")
                this.dispatchEvent("Hello world")
              }
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 2);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-restricted-browser-globals-during-ssr');
        assert.equal(messages[1].ruleId, '@lwc/lwc/no-unsupported-ssr-properties');
    });
});
