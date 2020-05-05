import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import PostListItem from './PostListItem';
import { IGetPosts } from '../interfaces';

const getPosts = graphql`
	query getPosts {
		allStrapiArticles(
			sort: {order: DESC, fields: [created_at]},
			limit: 100,
		) {
			edges {
				node {
					content
					id
					title
					created_at(formatString: "dddd, DD MMMM YYYY")
					slug
					author {
						username
					}
					internal {
						type
					}
					image {
						childImageSharp {
							fluid(maxWidth: 800) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	}
`;

const PostList = () => {
	const data = useStaticQuery<IGetPosts>(getPosts);
	const { edges } = data.allStrapiArticles;

	return (
		<div>
			{edges.map(({ node }) => {
				const imgFluid = node.image
					&& node.image.childImageSharp.fluid;

				return (
					<PostListItem
						key={node.id}
						id={node.id}
						slug={node.slug}
						title={node.title}
						date={node.created_at}
						imgFluid={imgFluid}
						content={node.content}
					/>
				);
			})}
		</div>
	);
};

export default PostList;
