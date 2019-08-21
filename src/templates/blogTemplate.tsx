import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import DOMPurify from 'dompurify';

import Layout from '../components/Layout';

const useStyles = makeStyles({
	content: {
		maxWidth: 1024,
		margin: '32px auto',
		padding: 32,
	},
	pageTitle: {
		fontSize: '2.5rem',
		paddingBottom: 16,
	},
}, { name: 'Index' });


interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: {
				date: string | Date | number;
				path: string;
				title: string;
			};
		};
	};
}

// data prop will be injected by the GraphQL query below.
const Template = ({ data }: IMarkdownRemark) => {
	const classes = useStyles();

	const { markdownRemark } = data; // data.markdownRemark holds our post data
	const { frontmatter, html } = markdownRemark;
	const cleanHTML = DOMPurify.sanitize(html);
	return (
		<Layout>
			<div className={classes.content}>
				<div className="blog-post">
					<h1 className={classes.pageTitle}>{frontmatter.title}</h1>
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

export default Template;

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
