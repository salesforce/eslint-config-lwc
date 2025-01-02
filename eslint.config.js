'use strict';
const globals = require('globals');
const js = require('@eslint/js');
module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.mocha,
                ...globals.node,
            },
            sourceType: 'commonjs',
        },
        rules: {
            strict: ['error', 'global'],
        },
    },
];
