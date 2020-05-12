import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql } from 'gatsby';

import useCommonStyles from './commonStyles';
import Layout from '../components/Layout';
import HeaderImg from '../components/HeaderImg';
import { ICustomPageTemplate, IStrapiCustomPage } from '../interfaces';

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
	const { title, content } = data.strapiCustomPages;

	return (
		<Layout>
			<CustomPageTemplate
				title={title}
				body={content}
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
		}
	}
`;
