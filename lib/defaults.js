'use strict';

/**
 * Base configuration for all the shared configuration. This file is intentionally not located at the root of the
 * package like the other configuration to about being consumed like the other shareable config via:
 *
 * ```
 * {
 *     "extends": "@salesforce/eslint-config-lwc/default"
 * }
 * ```
 */
module.exports = {
    parser: 'babel-eslint',

    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
    },

    env: {
        browser: true,
        es6: true,
    },
};
