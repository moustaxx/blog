/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./website');

require('dotenv').config();

module.exports = {
	siteMetadata: {
		title: config.siteTitle,
		description: config.siteDescription,
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/images`,
				name: 'uploads',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-typescript',
		'gatsby-plugin-material-ui',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleShort,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'standalone',
				// icons: [] TODO,
			},
		},
		{
			resolve: 'gatsby-source-strapi',
			options: {
				apiURL: 'https://personal-blogg2.herokuapp.com',
				queryLimit: 1000,
				contentTypes: ['articles', 'custom-pages'],
				// singleTypes: [''],
				loginData: {
					identifier: process.env.STRAPI_USERNAME,
					password: process.env.STRAPI_PASSWORD,
				},
			},
		},
		'gatsby-plugin-extract-schema',
		{
			resolve: 'gatsby-plugin-react-i18next',
			options: {
				path: `${__dirname}/locales`,
				languages: ['en', 'pl'],
				defaultLanguage: 'en',

				// you can pass any i18next options
				// pass following options to allow message content as a key
				i18nextOptions: {
					interpolation: {
						escapeValue: false, // not needed for react as it escapes by default
					},
					whitelist: ['pl', 'en'],
					nonExplicitWhitelist: true,
				},
			},
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-netlify',
	],
};
