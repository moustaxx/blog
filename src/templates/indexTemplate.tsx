import React from 'react';
import { graphql } from 'gatsby';
// import { makeStyles } from '@material-ui/styles';

import Layout from '../components/Layout';
import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';
import PostList from '../components/PostList';

// const useStyles = makeStyles({
// 	root: {
// 	},
// }, { name: 'Index' });

interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: IFrontmatter;
		};
	};
}

export interface IIndexTemplate {
	title: string;
	body: string;
	isPreview?: boolean;
}

export const IndexTemplate = ({ title, body, isPreview }: IIndexTemplate) => {
	// const classes = useStyles();
	const commonClasses = useCommonStyles();

	return (
		<div>
			<div className={commonClasses.img}>
				<span className={commonClasses.imgText}>{title}</span>
			</div>
			<div className={commonClasses.content}>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				{typeof body === 'string'
					// eslint-disable-next-line react/no-danger
					? <div dangerouslySetInnerHTML={{ __html: body }} />
					: <div>{body}</div>
				}
				{!isPreview && <PostList />}
			</div>
		</div>
	);
};

const IndexPage = ({ data }: IMarkdownRemark) => {
	const { html, frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<IndexTemplate
				title={frontmatter.title}
				body={html}
			/>
		</Layout>
	);
};

export default IndexPage;

export const pageQuery = graphql`
	query {
		markdownRemark(fields: { slug: { eq: "/" } }) {
			html
			frontmatter {
				title
			}
		}
	}
`;
