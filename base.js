/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const KNOWN_WIRE_ADAPTERS = [
    {
        module: 'lightning/**',
        identifier: '*',
    },
    // All apex, apexContinuation methods
    {
        module: '@salesforce/**',
        identifier: '*',
    },
    {
        module: 'commerce/cartApi',
        identifier: 'CartItemsAdapter',
    },
    {
        module: 'commerce/cartApi',
        identifier: 'CartSummaryAdapter',
    },
    {
        module: 'commerce/contextApi',
        identifier: 'AppContextAdapter',
    },
    {
        module: 'commerce/contextApi',
        identifier: 'SessionContextAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryHierarchyAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryPathAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductPricingAdapter',
    },
];

const WIRE_ADAPTERS_WITH_RESTRICTED_USE = [
    {
        module: 'commerce/cartApi',
        identifier: 'CartItemsAdapter',
    },
    {
        module: 'commerce/cartApi',
        identifier: 'CartSummaryAdapter',
    },
    {
        module: 'commerce/contextApi',
        identifier: 'AppContextAdapter',
    },
    {
        module: 'commerce/contextApi',
        identifier: 'SessionContextAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryHierarchyAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductCategoryPathAdapter',
    },
    {
        module: 'commerce/productApi',
        identifier: 'ProductPricingAdapter',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'executeQuery',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getAnalyticsLimits',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnector',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnectors',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnectorSourceFields',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnectorSourceObject',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnectorStatus',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataConnectorTypes',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataflowJob',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataflowJobNode',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataflowJobNodes',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataflowJobs',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDataset',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDatasets',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getRecipe',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getRecipes',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getReplicatedDataset',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getReplicatedDatasets',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getReplicatedFields',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getSchedule',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveFolders',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getXmd',
    },
    {
        module: 'lightning/messageService',
        identifier: 'MessageContext',
    },
    {
        module: 'lightning/navigation',
        identifier: 'CurrentPageReference',
    },
    {
        module: 'lightning/uiListApi',
        identifier: 'getListUi',
    },
    {
        module: 'lightning/uiObjectInfoApi',
        identifier: 'getObjectInfo',
    },
    {
        module: 'lightning/uiObjectInfoApi',
        identifier: 'getObjectInfos',
    },
    {
        module: 'lightning/uiObjectInfoApi',
        identifier: 'getPicklistValues',
    },
    {
        module: 'lightning/uiObjectInfoApi',
        identifier: 'getPicklistValuesByRecordType',
    },
    {
        module: 'lightning/uiRecordApi',
        identifier: 'getRecord',
    },
    {
        module: 'lightning/uiRecordApi',
        identifier: 'getRecordCreateDefaults',
    },
    {
        module: 'lightning/uiRecordApi',
        identifier: 'getRecordUi',
    },
];

module.exports = {
    extends: [require.resolve('./lib/defaults')],

    plugins: [
        '@lwc/eslint-plugin-lwc', // https://github.com/salesforce/eslint-plugin-lwc
    ],

    rules: {
        // LWC lifecycle hooks validation
        '@lwc/lwc/no-deprecated': 'error',

        // LWC decorator validation
        '@lwc/lwc/valid-api': 'error',
        '@lwc/lwc/valid-track': 'error',
        '@lwc/lwc/valid-wire': 'error',

        // LWC wire adapters validation
        '@lwc/lwc/no-unknown-wire-adapters': [
            'error',
            {
                adapters: KNOWN_WIRE_ADAPTERS,
            },
        ],
        '@lwc/lwc/no-unexpected-wire-adapter-usages': [
            'error',
            {
                adapters: WIRE_ADAPTERS_WITH_RESTRICTED_USE,
            },
        ],
    },
};
