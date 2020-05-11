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
		'gatsby-plugin-offline',
		'gatsby-plugin-netlify',
	],
};
