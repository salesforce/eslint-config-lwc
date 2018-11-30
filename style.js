'use strict';

module.exports = {
    extends: [require.resolve('./lib/defaults')],

    rules: {
        // Best practices
        // https://eslint.org/docs/rules/#best-practices
        'array-bracket-spacing': 'error',
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        complexity: ['error', 24],
        'computed-property-spacing': 'error',
        curly: ['error', 'all'],
        'linebreak-style': 'error',
        'new-cap': ['error', { capIsNewExceptionPattern: 'Mixin$' }],
        'no-continue': 'error',
        'no-lone-blocks': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multiple-empty-lines': 'error',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'no-tabs': 'error',
        'operator-assignment': 'error',
        'padded-blocks': ['error', 'never'],
        'space-before-blocks': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'spaced-comment': 'error',
        'unicode-bom': 'error',
        yoda: ['error', 'never'],

        // Stylistic issues
        // https://eslint.org/docs/rules/#stylistic-issues
        'brace-style': ['error', '1tbs'],
        camelcase: ['error', { allow: ['.+__.+'] }],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'consistent-this': ['error', 'that'],
        'func-call-spacing': 'error',
        'keyword-spacing': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'no-trailing-spaces': 'error',
        'semi-spacing': ['error', { before: false, after: true }],
        semi: 'error',
        'space-unary-ops': ['error', { words: true, nonwords: false }],

        // ES6
        // https://eslint.org/docs/rules/#ecmascript-6
        'arrow-spacing': 'error',
        'generator-star-spacing': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-numeric-literals': 'error',
        'rest-spread-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'yield-star-spacing': 'error',
    },
};
