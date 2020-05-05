/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const kebabCase = require('kebab-case');

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const result = await graphql(`
		query getAllStrapiArticles {
			allStrapiArticles(
				sort: {order: DESC, fields: [created_at]},
				limit: 1000,
			) {
				edges {
					node {
						tags {
							name
						}
						slug
					}
				}
			}
			allStrapiCustomPages {
				edges {
					node {
						slug
					}
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}

	const posts = result.data.allStrapiArticles.edges;
	const customPages = result.data.allStrapiCustomPages.edges;

	posts.forEach(({ node }) => {
		createPage({
			path: node.slug,
			tags: node.tags,
			component: path.resolve('src/templates/postTemplate.tsx'),
			context: {
				slug: node.slug,
			},
		});
	});

	let dirtyTags = [];
	posts.forEach(({ node }) => {
		if (node.tags.length) {
			node.tags.forEach(({ name }) => {
				dirtyTags = [...dirtyTags, name];
			});
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

	customPages.forEach(({ node }) => {
		let template = 'customPageTemplate';
		if (node.slug === '/') template = 'indexTemplate';
		createPage({
			path: node.slug,
			component: path.resolve(`src/templates/${template}.tsx`),
			context: {
				slug: node.slug,
			},
		});
	});
};
