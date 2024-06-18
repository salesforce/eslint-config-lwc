/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

module.exports = {
    extends: [
        require.resolve('./recommended'),
        // Must be second to override the default parser options
        require.resolve('./lib/typescript'),
    ],
};
