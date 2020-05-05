import React from 'react';
import { graphql } from 'gatsby';

import useCommonStyles from './commonStyles';
import Layout from '../components/Layout';
import HeaderImg from '../components/HeaderImg';
import PostList from '../components/PostList';
import { IStrapiCustomPage, ICustomPageTemplate } from '../interfaces';

export const IndexTemplate = ({ title, body }: ICustomPageTemplate) => {
	const commonClasses = useCommonStyles();

	return (
		<div>
			<HeaderImg title={title} />
			<div className={commonClasses.content}>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				<div>{body}</div>
				<PostList />
			</div>
		</div>
	);
};

const IndexPage = ({ data }: IStrapiCustomPage) => {
	const { title, content } = data.strapiCustomPages;

	return (
		<Layout>
			<IndexTemplate
				title={title}
				body={content}
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
		}
	}
`;
