import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { IFrontmatter } from '../interfaces';
import PostListItem from './PostListItem';


export interface IGetPosts {
	allMarkdownRemark: {
		totalCount: string;
		edges: {
			node: {
				id: string;
				frontmatter: IFrontmatter;
				excerpt: string;
				fields: {
					slug: string;
				};
			};
		}[];
	};
}

const getPosts = graphql`
	query getPosts {
		allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}, 
			limit: 1000, 
			filter: {
				frontmatter: {templateKey: {eq: "postTemplate"}}
			}
		){
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

const PostList = () => {
	const data = useStaticQuery<IGetPosts>(getPosts);

	const { edges } = data.allMarkdownRemark;
	return (
		<div>
			{edges.map(({ node }) => {
				const imgFluid = node.frontmatter.featuredImage
					&& node.frontmatter.featuredImage.childImageSharp.fluid;

				return (
					<PostListItem
						key={node.id}
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
	);
};

export default PostList;
