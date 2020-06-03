import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql } from 'gatsby';

import useCommonStyles from './commonStyles';
import Layout from '../components/Layout';
import HeaderImg from '../components/HeaderImg';
import { ICustomPageTemplate, IStrapiCustomPage } from '../interfaces';
import { useI18next } from '../utils/useI18next';

export const CustomPageTemplate = ({ title, body }: ICustomPageTemplate) => {
	const commonClasses = useCommonStyles();

	return (
		<div>
			<HeaderImg title={title} />
			<div className={commonClasses.content}>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				<ReactMarkdown source={body} />
			</div>
		</div>
	);
};

const CustomPage = ({ data }: IStrapiCustomPage) => {
	const { title, content, title_pl, content_pl } = data.strapiCustomPages;
	const { i18n } = useI18next();

	const translatedTitle = i18n.language === 'pl' && title_pl ? title_pl : title;
	const translatedContent = i18n.language === 'pl' && content_pl ? content_pl : content;

	return (
		<Layout>
			<CustomPageTemplate
				title={translatedTitle}
				body={translatedContent}
			/>
		</Layout>
	);
};

export default CustomPage;

export const pageQuery = graphql`
	query CustomPageQuery($slug: String!) {
		strapiCustomPages(slug: { eq: $slug }) {
			title
			content
			title_pl
			content_pl
		}
	}
`;
