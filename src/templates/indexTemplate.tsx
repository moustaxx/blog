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

const IndexTemplate = ({ data }: IMarkdownRemark) => {
	// const classes = useStyles();
	const commonClasses = useCommonStyles();

	const { html, frontmatter } = data.markdownRemark;
	return (
		<Layout>
			<div>
				<div className={commonClasses.img}>
					<span className={commonClasses.imgText}>{frontmatter.title}</span>
				</div>
				<div className={commonClasses.content}>
					<h1 className={commonClasses.pageTitle}>{frontmatter.title}</h1>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<PostList />
				</div>
			</div>
		</Layout>
	);
};

export default IndexTemplate;

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
