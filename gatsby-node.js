/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

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
							templateKey
						}
						fields {
							slug
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
			path: node.fields.slug,
			component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.tsx`),
			context: {
				slug: node.fields.slug,
			},
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	fmImagesToRelative(node);

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode });
		if (node.frontmatter && node.frontmatter.templateKey === 'postTemplate') {
			createNodeField({
				name: 'slug',
				node,
				value: `/blog${value}`,
			});
		} else {
			createNodeField({
				name: 'slug',
				node,
				value,
			});
		}
	}
};
