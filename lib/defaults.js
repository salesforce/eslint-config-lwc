'use strict';

/**
 * Internal base configuration for all the shared configuration. This file is intentionally not located at the root of
 * the package to avoid being exported and exposed.
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
