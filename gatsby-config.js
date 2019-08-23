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
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/images`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/images`,
				name: 'images',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/markdown-pages`,
				name: 'markdown-pages',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigModule: 'src/utils/typography',
				omitGoogleFont: true,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-relative-images',
						options: { name: 'uploads' },
					},
					{
						resolve: 'gatsby-remark-images',
						options: { maxWidth: 2048 },
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: { destinationDir: 'static' },
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			// options: {
			// 	modulePath: `${__dirname}/src/cms/cms.ts`,
			// },
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-netlify',
	],
};
