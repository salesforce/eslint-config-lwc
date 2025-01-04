/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
'use strict';

const eslintPluginLwc = require('@lwc/eslint-plugin-lwc');
const languageOptions = require('./lib/defaults');

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
    // All commerce API adapters
    {
        module: 'commerce/*Api',
        identifier: '*Adapter',
    },
    // All experience API adapters
    {
        module: 'experience/*Api',
        identifier: 'get*',
    },
];

const WIRE_ADAPTERS_WITH_RESTRICTED_USE = [
    // All commerce API adapters
    {
        module: 'commerce/*Api',
        identifier: '*Adapter',
    },
    // All experience API adapters
    {
        module: 'experience/*Api',
        identifier: 'get*',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'executeQuery',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getActions',
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
        identifier: 'getDataConnectorSourceObjectDataPreviewWithFields',
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
        identifier: 'getDataflows',
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
        identifier: 'getDatasetVersion',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDatasetVersions',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getDependencies',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getRecipe',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getRecipeNotification',
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
        identifier: 'getSecurityCoverageDatasetVersion',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveFolders',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveTemplate',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveTemplateConfig',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveTemplateReleaseNotes',
    },
    {
        module: 'lightning/analyticsWaveApi',
        identifier: 'getWaveTemplates',
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
        module: 'lightning/uiAppsApi',
        identifier: 'getNavItems',
    },
    {
        module: 'lightning/uiListApi',
        identifier: 'getListUi',
    },
    {
        module: 'lightning/uiListsApi',
        identifier: 'getListInfoByName',
    },
    {
        module: 'lightning/uiListsApi',
        identifier: 'getListInfosByName',
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
        identifier: 'getRecords',
    },
    {
        module: 'lightning/uiRecordApi',
        identifier: 'getRecordCreateDefaults',
    },
    {
        module: 'lightning/uiRecordApi',
        identifier: 'getRecordUi',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListCount',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListInfo',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListInfoBatch',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListRecords',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListRecordsBatch',
    },
    {
        module: 'lightning/uiRelatedListApi',
        identifier: 'getRelatedListsInfo',
    },
];

module.exports = [
    {
        languageOptions,

        plugins: {
            '@lwc/lwc': eslintPluginLwc, // https://github.com/salesforce/eslint-plugin-lwc
        },

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

            // LWC import validation
            '@lwc/lwc/no-disallowed-lwc-imports': 'error',

            // Disable any direct importing of LDS artifacts generated by the LWC compiler
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@salesforce/lds', '@salesforce/lds/**'],
                            message:
                                'Please do not import from @salesforce/lds, these modules are ephemeral and could change at any time.',
                        },
                    ],
                },
            ],
        },
    },
];
