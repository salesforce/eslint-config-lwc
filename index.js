/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const base = require('./base');
const baseTs = require('./base-ts');
const extended = require('./extended');
const extendedTs = require('./extended-ts');
const i18n = require('./i18n');
const i18nTs = require('./i18n-ts');
const recommended = require('./recommended');
const recommendedTs = require('./recommended-ts');
const ssr = require('./ssr');
const ssrTs = require('./ssr-ts');
const { version } = require('./package.json');

module.exports = {
    // https://eslint.org/docs/latest/extend/plugins#meta-data-in-plugins
    meta: {
        name: '@salesforce/eslint-config-lwc',
        version,
    },
    configs: {
        base,
        baseTs,
        extended,
        extendedTs,
        i18n,
        i18nTs,
        recommended,
        recommendedTs,
        ssr,
        ssrTs,
    },
};
