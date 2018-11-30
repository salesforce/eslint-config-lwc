'use strict';

module.exports = {
    extends: [require.resolve('./recommended')],

    rules: {
        // LWC COMPAT performance restrictions
        '@lwc/lwc/no-async-await': 'error',
        '@lwc/lwc/no-for-of': 'error',
        '@lwc/lwc/no-rest-parameter': 'error',
    },
};
