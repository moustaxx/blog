import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import PostListItem from './PostListItem';
import { IGetPosts } from '../interfaces';
import { useI18next } from '../utils/useI18next';

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
					created_at
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
					title_pl
					content_pl
				}
			}
		}
	}
`;

const PostList = () => {
	const data = useStaticQuery<IGetPosts>(getPosts);
	const { edges } = data.allStrapiArticles;
	const { i18n } = useI18next();

	return (
		<div>
			{edges.map(({ node }) => {
				const translatedTitle = i18n.language === 'pl' && node.title_pl
					? node.title_pl
					: node.title;
				const translatedContent = i18n.language === 'pl' && node.content_pl
					? node.content_pl
					: node.content;
				const imgFluid = node.image
					&& node.image.childImageSharp.fluid;

				return (
					<PostListItem
						key={node.id}
						id={node.id}
						slug={node.slug}
						title={translatedTitle}
						date={node.created_at}
						imgFluid={imgFluid}
						content={translatedContent}
					/>
				);
			})}
		</div>
	);
};

export default PostList;
