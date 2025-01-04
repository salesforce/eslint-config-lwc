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

describe('base config', () => {
    let cli;
    before(() => {
        linkConfig();
        const lwcConfig = require('@salesforce/eslint-config-lwc');
        const baseConfig = lwcConfig.configs.base;
        cli = new eslint.ESLint({
            overrideConfigFile: true,
            baseConfig,
        });
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly base config', async () => {
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
        const results = await cli.lintText(`
            import { yolo } from 'lwc';
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-disallowed-lwc-imports');
    });

    describe('should include no-restricted-imports', () => {
        describe('prevents imports from @salesforce/lds', () => {
            it('should prevent nested imports', async () => {
                setupBaseListConfigAndAssertMessages(
                    `
                    import { abc } from '@salesforce/lds/test';
                `,
                    [
                        {
                            ruleId: 'no-restricted-imports',
                            message:
                                "'@salesforce/lds/test' import is restricted from being used by a pattern. Please do not import from @salesforce/lds, these modules are ephemeral and could change at any time.",
                        },
                    ],
                );
            });

            it('should prevent imports from restricted modules', async () => {
                setupBaseListConfigAndAssertMessages(
                    `
                    import foo from '@salesforce/lds';
                `,
                    [
                        {
                            ruleId: 'no-restricted-imports',
                            message:
                                "'@salesforce/lds' import is restricted from being used by a pattern. Please do not import from @salesforce/lds, these modules are ephemeral and could change at any time.",
                        },
                    ],
                );
            });

            it('does not prevent imports from similarly named modules', async () => {
                setupBaseListConfigAndAssertMessages(
                    `
                    import foo from '@salesforce/ldsnotlds';
                `,
                );
            });
        });
    });
});

describe('typescript base config', () => {
    let cli;
    before(() => {
        linkConfig();
        const lwcConfig = require('@salesforce/eslint-config-lwc');
        const baseTsConfig = lwcConfig.configs.baseTs;
        cli = new eslint.ESLint({
            overrideConfigFile: true,
            baseConfig: baseTsConfig,
        });
    });

    after(() => {
        unlinkConfig();
    });

    it('should load properly base config', async () => {
        const results = await cli.lintText(`
            import { api } from 'lwc';
            class Foo {
                @api({ param: true })
                foo: string;
            }
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/valid-api');
    });

    it('should include @lwc/lwc/no-unknown-wire-adapters rule', async () => {
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
                    wiredProp: object;
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
                    wiredProp: unknown;
                }
            `);

            const { messages } = results[0];
            assert.equal(messages.length, 0);
        }
    });

    it('should include @lwc/lwc/no-unexpected-wire-adapter-usages', async () => {
        const expectedFailures = [
            ['lightning/navigation', 'CurrentPageReference'],
            ['commerce/cmpApi', 'getAdapter'],
            ['experience/cmpApi', 'getAdapter'],
        ];
        for (const [bundleName, cmpName] of expectedFailures) {
            const results = await cli.lintText(`
                import { wire } from 'lwc';
                import { ${cmpName} } from '${bundleName}';
                const reference: any = ${cmpName};
                class Foo {
                    @wire(${cmpName})
                    wiredProp: Record<string, unknown>;
                }
            `);

            const { messages } = results[0];
            assert.equal(messages.length, 1);
            assert.equal(messages[0].ruleId, '@lwc/lwc/no-unexpected-wire-adapter-usages');
        }
    });

    it('should include @lwc/lwc/no-disallowed-lwc-imports', async () => {
        const results = await cli.lintText(`
            import { yolo } from 'lwc';
        `);

        const { messages } = results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, '@lwc/lwc/no-disallowed-lwc-imports');
    });
});

/**
 * Sets up the linter and runs it against the given text.
 * @constructor
 * @param {string} text - The text to lint
 * @param {Object[]} expectedMessages - The employees who are responsible for the project.
 * @param {string} expectedMessages[].ruleId - The lint rule id that should fail.
 * @param {string} [expectedMessages[].message] - The message that the lint rule should throw.
 */
async function setupBaseListConfigAndAssertMessages(text, expectedMessages = []) {
    const lwcConfig = require('@salesforce/eslint-config-lwc');
    const baseConfig = lwcConfig.configs.base;
    const cli = new eslint.ESLint({
        overrideConfigFile: true,
        baseConfig,
    });
    const results = await cli.lintText(text);
    const { messages } = results[0];
    assert.equal(messages.length, expectedMessages.length);
    for (var i = 0; i < expectedMessages.length; i++) {
        assert.equal(messages[0].ruleId, expectedMessages[i].ruleId);
        if (expectedMessages[i].message !== undefined) {
            assert.equal(messages[0].message, expectedMessages[i].message);
        }
    }
}
