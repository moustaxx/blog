/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const kebabCase = require('kebab-case');

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const result = await graphql(`
		query getMarkdownPages {
			allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			limit: 1000
			) {
				edges {
					node {
						frontmatter {
							tags
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

	const posts = result.data.allMarkdownRemark.edges;
	posts.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			tags: node.frontmatter.tags,
			component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.tsx`),
			context: {
				slug: node.fields.slug,
			},
		});
	});

	let dirtyTags = [];
	posts.forEach(({ node }) => {
		if (node.frontmatter.tags) {
			dirtyTags = dirtyTags.concat(node.frontmatter.tags);
		}
	});
	const tags = [...new Set(dirtyTags)]; // Eliminate duplicate tags
	tags.forEach((tag) => {
		const tagPath = `/tags/${kebabCase(tag)}/`;
		createPage({
			path: tagPath,
			component: path.resolve('src/templates/tagsTemplate.tsx'),
			context: {
				tag,
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
