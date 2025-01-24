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

        const results = await cli.lintText(
            `
            import { LightningElement } from 'lwc';
            import fs from 'node:fs';
            import { formFactor } from '@salesforce/client/formFactor';
            import userId from '@salesforce/user/Id';
            export default class Foo extends LightningElement {
              connectedCallback() {
                document.write("Hello world");
                this.dispatchEvent("Hello world");
                console.log(formFactor);
                this.setAttribute('class', \`my-child-\${this.fromOutside}\`);
                if (process.env.NODE_ENV === 'development') {
                    console.log('test');
                }
                fs.writeFileSync('file.txt', 'data');
                console.log(userId);
              }
            }
        `,
            { filePath: 'testFile.ssrjs' },
        );

        const { messages } = results[0];
        assert.equal(messages.length, 7);
        assert.equal(messages[0].ruleId, '@lwc/lwc/ssr-no-form-factor');
        assert.equal(
            messages[1].ruleId,
            '@lwc/lwc/ssr-no-static-imports-of-user-specific-scoped-modules',
        );
        assert.equal(messages[2].ruleId, '@lwc/lwc/ssr-no-restricted-browser-globals');
        assert.equal(messages[3].ruleId, '@lwc/lwc/ssr-no-unsupported-properties');
        assert.equal(messages[4].ruleId, '@lwc/lwc/ssr-no-host-mutation-in-connected-callback');
        assert.equal(messages[5].ruleId, '@lwc/lwc/ssr-no-node-env');
        assert.equal(messages[6].ruleId, '@lwc/lwc/ssr-no-unsupported-node-api');
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

        const results = await cli.lintText(
            `
            import { LightningElement } from 'lwc';
            import fs from 'node:fs';
            import { formFactor } from '@salesforce/client/formFactor';
            import userId from '@salesforce/user/Id';

            export default class Foo extends LightningElement {
              connectedCallback(): void {
                document.write("Hello world")
                this.dispatchEvent("Hello world")
                console.log(formFactor);
                this.setAttribute('class', \`my-child-\${this.fromOutside}\`);
                if (process.env.NODE_ENV === 'development') {
                    console.log('test');
                }
                fs.writeFileSync('file.txt', 'data');
                console.log(userId);
              }
            }
        `,
            { filePath: 'testFile.ssrjs' },
        );

        const { messages } = results[0];
        assert.equal(messages.length, 7);
        assert.equal(messages[0].ruleId, '@lwc/lwc/ssr-no-form-factor');
        assert.equal(
            messages[1].ruleId,
            '@lwc/lwc/ssr-no-static-imports-of-user-specific-scoped-modules',
        );
        assert.equal(messages[2].ruleId, '@lwc/lwc/ssr-no-restricted-browser-globals');
        assert.equal(messages[3].ruleId, '@lwc/lwc/ssr-no-unsupported-properties');
        assert.equal(messages[4].ruleId, '@lwc/lwc/ssr-no-host-mutation-in-connected-callback');
        assert.equal(messages[5].ruleId, '@lwc/lwc/ssr-no-node-env');
        assert.equal(messages[6].ruleId, '@lwc/lwc/ssr-no-unsupported-node-api');
    });
});
