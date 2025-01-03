/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const semver = require('semver');
const { ESLint } = require('eslint');
const globals = require('globals');
const restrictedGlobals = require('eslint-restricted-globals');
const pluginJest = require('eslint-plugin-jest');
const pluginImport = require('eslint-plugin-import');
const pluginLighting = require('@salesforce/eslint-plugin-lightning');
const eslintJs = require('@eslint/js');

const base = require('./base');

module.exports = [
    ...base,
    eslintJs.configs.recommended,
    pluginImport.flatConfigs.errors, // https://github.com/benmosher/eslint-plugin-import
    pluginJest.configs['flat/recommended'], // https://github.com/jest-community/eslint-plugin-jest
    {
        plugins: {
            '@salesforce/lightning': pluginLighting, // https://github.com/salesforce/eslint-plugin-lightning
        },

        languageOptions: {
            globals: {
                // used to mock calls to global variables in jest tests
                global: true,
                ...globals.jest,
            },
        },
        rules: {
            // Possible errors
            // https://eslint.org/docs/rules/#possible-errors
            'no-await-in-loop': 'error',

            // Best practices
            // https://eslint.org/docs/rules/#best-practices
            'array-callback-return': 'error',
            'consistent-return': 'error',
            'default-case': 'error',
            'dot-notation': ['error', { allowKeywords: true }],
            eqeqeq: ['error', 'smart'],
            'guard-for-in': 'error',
            'no-alert': 'error',
            'no-caller': 'error',
            'no-else-return': 'error',
            'no-empty-function': [
                'error',
                {
                    allow: ['arrowFunctions', 'functions', 'methods'],
                },
            ],
            'no-eval': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-floating-decimal': 'error',
            'no-implied-eval': 'error',
            'no-iterator': 'error',
            'no-labels': 'error',
            'no-loop-func': 'error',
            'no-multi-str': 'error',
            'no-new': 'error',
            'no-new-func': 'error',
            'no-new-object': 'error',
            'no-new-wrappers': 'error',
            'no-octal-escape': 'error',
            'no-proto': 'error',
            'no-return-assign': 'error',
            'no-return-await': 'error',
            'no-script-url': 'error',
            'no-self-compare': 'error',
            'no-sequences': 'error',
            'no-throw-literal': 'error',
            'no-useless-concat': 'error',
            'no-useless-escape': 'error',
            'no-useless-return': 'error',
            'no-unused-expressions': 'error',
            'no-void': 'error',
            'no-with': 'error',
            radix: 'error',
            'vars-on-top': 'error',
            'wrap-iife': ['error', 'any'],

            // Variables
            // https://eslint.org/docs/rules/#variables
            'no-label-var': 'error',
            'no-restricted-globals': ['error'].concat(restrictedGlobals),
            'no-shadow': 'error',
            'no-shadow-restricted-names': 'error',
            'no-undef-init': 'error',
            'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
            'no-use-before-define': ['error', { functions: false }],

            // NodeJs style
            // https://eslint.org/docs/rules/#nodejs-and-commonjs
            'handle-callback-err': 'error',

            // ES6
            // https://eslint.org/docs/rules/#ecmascript-6
            'no-confusing-arrow': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-constructor': 'error',
            'no-useless-rename': 'error',

            // LWC specific rules
            '@lwc/lwc/no-api-reassignments': 'error',
            '@lwc/lwc/no-async-operation': 'error',
            '@lwc/lwc/no-attributes-during-construction': 'error',
            '@lwc/lwc/no-document-query': 'error',
            '@lwc/lwc/no-inner-html': 'error',
            '@lwc/lwc/no-leading-uppercase-api-name': 'error',
            '@lwc/lwc/no-template-children': 'error',
            '@lwc/lwc/prefer-custom-event': 'error',
            '@lwc/lwc/valid-api': [
                'error',
                {
                    disallowUnderscoreUppercaseMix: true,
                },
            ],
            '@lwc/lwc/valid-graphql-wire-adapter-callback-parameters': 'error',

            // Lightning
            '@salesforce/lightning/valid-apex-method-invocation': 'error',

            // Disable unresolved import rule since it doesn't work well with the way the LWC compiler
            // resolves the different modules
            'import/no-unresolved': 'off',

            // Misc
            // In ESLint v8 the built-in `no-dupe-class-member` rules added support for duplicated
            // class fields. We should disable the `lwc/no-dupe-class-members` rule to avoid duplicated
            // linting errors.
            '@lwc/lwc/no-dupe-class-members': semver.lt(ESLint.version, '8.0.0') ? 'error' : 'off',
        },
    },
];
