/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

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
							templateKey
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.tsx`),
			context: {}, // additional data can be passed via context
		});
	});
};
