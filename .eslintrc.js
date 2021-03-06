const path = require('path');

const gqlConfig = {
	env: 'relay',
	schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
	tagName: 'graphql',
};

module.exports = {
	env: {
		browser: true,
		es6: true,
		commonjs: true,
	},
	extends: [
		'eslint-config-airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
	],
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 2018,
		ecmaFeatures: { jsx: true },
		sourceType: 'module',
	},
	plugins: ['react-hooks', 'graphql'],
	rules: {
		'@typescript-eslint/array-type': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
		'@typescript-eslint/indent': ['warn', 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/camelcase': 0,
		'arrow-body-style': 0,
		'graphql/capitalized-type-name': ['warn', gqlConfig],
		'graphql/named-operations': ['warn', gqlConfig],
		'graphql/no-deprecated-fields': ['error', gqlConfig],
		'graphql/template-strings': 0,
		'linebreak-style': ['warn', 'windows'],
		'no-alert': 0,
		'no-console': 0,
		'no-param-reassign': ['error', { 'props': false }],
		'no-tabs': 0,
		'no-multiple-empty-lines': ['error', { max: 3, maxEOF: 1, maxBOF: 0 }],
		'object-curly-newline': ['error', { 'consistent': true }],
		'react/jsx-curly-newline': 0,
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-one-expression-per-line': 0,
		'react/no-children-prop': 0,
		'react/prop-types': 0,
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
