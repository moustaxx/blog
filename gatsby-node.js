/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const blogPostTemplate = path.resolve('./src/templates/blogTemplate.tsx');

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			limit: 1000
			) {
				edges {
					node {
						frontmatter {
							path
						}
					}
				}
			}
		}
	`);

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: blogPostTemplate,
			context: {}, // additional data can be passed via context
		});
	});
};
