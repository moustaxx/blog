import React from 'react';
import { graphql } from 'gatsby';
// import { makeStyles } from '@material-ui/styles';
import DOMPurify from 'dompurify';

import Layout from '../components/Layout';
import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';

// const useStyles = makeStyles({
// 	root: {
// 	},
// }, { name: 'Post' });

interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: IFrontmatter;
		};
	};
}

const PostTemplate = ({ data }: IMarkdownRemark) => {
	// const classes = useStyles();
	const commonClasses = useCommonStyles();

	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	const cleanHTML = DOMPurify.sanitize(html);
	return (
		<Layout>
			<div className={commonClasses.content}>
				<div className="blog-post">
					<h1 className={commonClasses.pageTitle}>{frontmatter.title}</h1>
					<h2>{frontmatter.date}</h2>
					<div
						className="blog-post-content"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: cleanHTML }}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default PostTemplate;

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				date(formatString: "DD MMMM YYYY")
				path
				title
			}
		}
	}
`;
