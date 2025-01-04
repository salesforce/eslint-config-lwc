/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const recommended = require('./recommended');

module.exports = [
    ...recommended,
    {
        rules: {
            // LWC COMPAT performance restrictions
            '@lwc/lwc/no-async-await': 'error',
            '@lwc/lwc/no-for-of': 'error',
            '@lwc/lwc/no-rest-parameter': 'error',
        },
    },
];
