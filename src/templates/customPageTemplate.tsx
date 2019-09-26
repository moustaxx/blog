import React from 'react';
import { graphql } from 'gatsby';
// import { makeStyles } from '@material-ui/styles';

import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';
import Layout from '../components/Layout';
import HeaderImg from '../components/HeaderImg';

// const useStyles = makeStyles({
// 	root: {
// 	},
// }, { name: 'CustomPage' });

interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: IFrontmatter;
		};
	};
}

export interface ICustomPageTemplate {
	title: string;
	body: string;
	isPreview?: boolean;
}

export const CustomPageTemplate = ({ title, body }: ICustomPageTemplate) => {
	// const classes = useStyles();
	const commonClasses = useCommonStyles();

	return (
		<div>
			<HeaderImg title={title} />
			<div className={commonClasses.content}>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				{typeof body === 'string'
					// eslint-disable-next-line react/no-danger
					? <div dangerouslySetInnerHTML={{ __html: body }} />
					: <div>{body}</div>
				}
			</div>
		</div>
	);
};

const CustomPage = ({ data }: IMarkdownRemark) => {
	const { html, frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<CustomPageTemplate
				title={frontmatter.title}
				body={html}
			/>
		</Layout>
	);
};

export default CustomPage;

export const pageQuery = graphql`
	query CustomPageQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`;
