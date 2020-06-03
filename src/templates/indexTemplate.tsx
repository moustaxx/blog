import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql } from 'gatsby';

import useCommonStyles from './commonStyles';
import Layout from '../components/Layout';
import HeaderImg from '../components/HeaderImg';
import PostList from '../components/PostList';
import { IStrapiCustomPage, ICustomPageTemplate } from '../interfaces';
import { useI18next } from '../utils/useI18next';

export const IndexTemplate = ({ title, body }: ICustomPageTemplate) => {
	const commonClasses = useCommonStyles();

	return (
		<div>
			<HeaderImg title={title} />
			<div className={commonClasses.content}>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				<ReactMarkdown source={body} />
				<PostList />
			</div>
		</div>
	);
};

const IndexPage = ({ data }: IStrapiCustomPage) => {
	const { title, content, title_pl, content_pl } = data.strapiCustomPages;
	const { i18n } = useI18next();

	const translatedTitle = i18n.language === 'pl' && title_pl ? title_pl : title;
	const translatedContent = i18n.language === 'pl' && content_pl ? content_pl : content;

	return (
		<Layout>
			<IndexTemplate
				title={translatedTitle}
				body={translatedContent}
			/>
		</Layout>
	);
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageQuery($slug: String!) {
		strapiCustomPages(slug: { eq: $slug }) {
			title
			content
			title_pl
			content_pl
		}
	}
`;
