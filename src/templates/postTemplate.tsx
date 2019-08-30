import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';

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

export interface IPostTemplate {
	title: string;
	date?: string;
	featuredImgFluid?: FluidObject;
	imageURL?: string;
	body: string;
	isPreview?: boolean;
}

export const PostTemplate = ({
	title,
	date,
	featuredImgFluid,
	imageURL,
	body,
	isPreview,
}: IPostTemplate) => {
	const classes = useStyles();
	const commonClasses = useCommonStyles();

	return (
		<div className={commonClasses.content}>
			<div className="blog-post">
				<h2>{!isPreview && date}</h2>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				{featuredImgFluid && !isPreview
					? <Img fluid={featuredImgFluid} className={classes.featuredImg} />
					: <img src={imageURL} alt="Featured img" />
				}
				{typeof body === 'string'
					// eslint-disable-next-line react/no-danger
					? <div dangerouslySetInnerHTML={{ __html: body }} />
					: <div>{body}</div>
				}
			</div>
		</div>
	);
};


const PostPage = ({ data }: IMarkdownRemark) => {
	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	const fluid = frontmatter.featuredImage && frontmatter.featuredImage.childImageSharp.fluid;

	return (
		<Layout>
			<PostTemplate
				title={frontmatter.title}
				date={frontmatter.date}
				featuredImgFluid={fluid}
				body={html}
			/>
		</Layout>

	);
};

export default PostPage;

export const pageQuery = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				date(formatString: "DD MMMM YYYY, h:mm a")
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
