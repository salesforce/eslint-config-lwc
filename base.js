'use strict';

module.exports = {
    extends: [require.resolve('./lib/defaults')],

    plugins: ['@lwc/eslint-plugin-lwc'],

    rules: {
        // LWC lifecycle hooks validation
        '@lwc/lwc/no-deprecated': 'error',

        // LWC decorator validation
        '@lwc/lwc/valid-api': 'error',
        '@lwc/lwc/valid-track': 'error',
        '@lwc/lwc/valid-wire': 'error',
    },
};
