import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';

const useStyles = makeStyles({
	featuredImg: {
		margin: '16px 0',
	},
}, { name: 'Post' });

interface IMarkdownRemark {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: IFrontmatter;
		};
	};
}

const PostTemplate = ({ data }: IMarkdownRemark) => {
	const classes = useStyles();
	const commonClasses = useCommonStyles();

	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	const fluid = frontmatter.featuredImage && frontmatter.featuredImage.childImageSharp.fluid;
	return (
		<Layout>
			<div className={commonClasses.content}>
				<div className="blog-post">
					<h2>{frontmatter.date}</h2>
					<h1 className={commonClasses.pageTitle}>{frontmatter.title}</h1>
					{fluid && <Img fluid={fluid} className={classes.featuredImg} />}
					<div
						className="blog-post-content"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default PostTemplate;

export const pageQuery = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				date(formatString: "DD MMMM YYYY")
				title
				featuredImage {
					childImageSharp {
						fluid(maxWidth: 800) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;
