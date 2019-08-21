import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import DOMPurify from 'dompurify';

import Layout from '../components/Layout';
import jumbotron from '../../static/img/jumbotron.jpg';
import { IFrontmatter } from '../interfaces';

const useStyles = makeStyles({
	root: {
	},
	content: {
		maxWidth: 1024,
		margin: '0px auto',
		padding: 32,
	},
	pageTitle: {
		fontSize: '2.5rem',
	},
	img: {
		height: 400,
		backgroundImage: `url(${jumbotron})`,
		backgroundAttachment: 'fixed',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgText: {
		backgroundColor: 'blueviolet',
		color: 'white',
		fontSize: '2.3rem',
		fontWeight: 600,
		padding: 24,
	},
}, { name: 'Index' });

interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: IFrontmatter;
		};
	};
}

const IndexTemplate = ({ data }: IMarkdownRemark) => {
	const classes = useStyles();

	const { html, frontmatter } = data.markdownRemark;
	const cleanHTML = DOMPurify.sanitize(html);
	return (
		<Layout>
			<div className={classes.root}>
				<div className={classes.img}>
					<span className={classes.imgText}>{frontmatter.title}</span>
				</div>
				<div className={classes.content}>
					<h1 className={classes.pageTitle}>{frontmatter.title}</h1>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
				</div>
			</div>
		</Layout>
	);
};

export default IndexTemplate;

export const pageQuery = graphql`
	query {
		markdownRemark(frontmatter: { path: { eq: "/" } }) {
			html
			frontmatter {
				title
			}
		}
	}
`;
