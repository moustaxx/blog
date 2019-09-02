/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

import useCommonStyles from './commonStyles';
import { IGetPosts } from '../components/PostList';
import Layout from '../components/Layout';
import PostListItem from '../components/PostListItem';

const useStyles = makeStyles({
	resultCount: {
		marginTop: 0,
	},
}, { name: 'TagsTemplate' });

interface ITagsTemplate {
	data: IGetPosts;
	pageContext: {
		tag: string;
	};
}

export const TagsTemplate = ({ data, pageContext }: ITagsTemplate) => {
	const classes = useStyles();
	const commonClasses = useCommonStyles();
	const { edges } = data.allMarkdownRemark;

	return (
		<Layout>
			<div>
				<div className={commonClasses.content}>
					<h1 className={commonClasses.pageTitle}>#{pageContext.tag}</h1>
					<h4 className={classes.resultCount}>
						Found {data.allMarkdownRemark.totalCount} articles
					</h4>
					{edges.map(({ node }) => {
						const imgFluid = node.frontmatter.featuredImage
							&& node.frontmatter.featuredImage.childImageSharp.fluid;

						return (
							<PostListItem
								id={node.id}
								slug={node.fields.slug}
								title={node.frontmatter.title}
								date={node.frontmatter.date}
								imgFluid={imgFluid}
								content={node.excerpt}
							/>
						);
					})}
				</div>
			</div>
		</Layout>

	);
};

export default TagsTemplate;

export const pageQuery = graphql`
	query($tag: String!) {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "dddd, DD MMMM YYYY")
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 800) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					excerpt(pruneLength: 700)
					fields {
						slug
					}
				}
			}
		}
	}
`;
