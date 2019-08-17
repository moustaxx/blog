/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./website');

module.exports = {
	siteMetadata: {
		title: config.siteTitle,
		description: config.siteDescription,
	},
	plugins: [
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
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
	],
};
