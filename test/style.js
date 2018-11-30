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

    it('should load properly style config', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/style',
            },
        });

        const report = cli.executeOnText(`const foo_bar = 1;`);

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, 'camelcase');
    });

    it('should not report camelcase error for Salesforce identifiers', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/style',
            },
        });

        const report = cli.executeOnText(
            [
                'const Foo = 1;',
                'const FooBar = 1;',
                'const FooBar__c = 1;',
                'const FooBar__baz = 1;',
                'const FooBar__bazBuz = 1;',
                'const FooBar__baz_buz = 1;',
                'const FooBar_c = 1;',
            ].join('\n'),
        );

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, 'camelcase');
    });

    it('should not report new-cap error for mixins', () => {
        const cli = new eslint.CLIEngine({
            useEslintrc: false,
            baseConfig: {
                extends: '@salesforce/eslint-config-lwc/style',
            },
        });

        const report = cli.executeOnText(
            [`class Foo extends SomeMixin(Base) {}`, `class Foo extends Wrapper(Base) {}`].join(
                '\n',
            ),
        );

        const { messages } = report.results[0];
        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, 'new-cap');
    });
});
