/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import useCommonStyles from './commonStyles';
import { IGetPosts } from '../interfaces';
import Layout from '../components/Layout';
import PostListItem from '../components/PostListItem';

interface ITagsTemplate {
	data: IGetPosts;
	pageContext: {
		tag: string;
	};
}

export const TagsTemplate = ({ data, pageContext }: ITagsTemplate) => {
	const commonClasses = useCommonStyles();
	const { edges } = data.allStrapiArticles;
	const { t, i18n } = useTranslation();

	return (
		<Layout>
			<div>
				<div className={commonClasses.content}>
					<h1 className={commonClasses.pageTitle}>#{pageContext.tag}</h1>
					<h4>{t('found')} {data.allStrapiArticles.totalCount} {t('foundArticles')}</h4>
					{edges.map(({ node }) => {
						const imgFluid = node.image
							&& node.image.childImageSharp.fluid;
						const translatedTitle = i18n.language === 'pl' && node.title_pl
							? node.title_pl
							: node.title;
						const translatedContent = i18n.language === 'pl' && node.content_pl
							? node.content_pl
							: node.content;

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
			</div>
		</Layout>

	);
};

export default TagsTemplate;

export const pageQuery = graphql`
	query TagsPageQuery($tag: String!) {
		allStrapiArticles(
			sort: {order: DESC, fields: [created_at]},
			filter: {tags: {elemMatch: {name: {in: [$tag]}}}}
			limit: 100,
		) {
			totalCount
			edges {
				node {
					id
					title
					content
					created_at
					slug
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
