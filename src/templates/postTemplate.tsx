import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/Layout';
import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';
import { author } from '../../website';

const useStyles = makeStyles({
	featuredImg: {
		margin: '16px 0',
	},
	meta: {
		display: 'flex',
	},
	avatar: {
		width: 48,
		height: 48,
		marginRight: 12,
		borderRadius: 45,
		background: '#444446',
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	metaCnt: {
		fontSize: '0.8rem',
	},
	metaAuthor: {
		fontWeight: 700,
	},
	metaDate: {
		color: 'rgba(0, 0, 0, 0.5)',
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
	date?: Date | string;
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
		<article className={commonClasses.content}>
			<div className="blog-post">
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				<div className={classes.meta}>
					<div className={classes.avatar}>{author[0]}</div>
					<div className={classes.metaCnt}>
						<div className={classes.metaAuthor}>{author}</div>
						<div className={classes.metaDate}>
							{date && new Date(date).toLocaleString()}
						</div>
					</div>
				</div>
				{featuredImgFluid && !isPreview
					? <Img fluid={featuredImgFluid} className={classes.featuredImg} />
					: <img src={imageURL} alt="Featured img" className={classes.featuredImg} />
				}
				{typeof body === 'string'
					// eslint-disable-next-line react/no-danger
					? <div dangerouslySetInnerHTML={{ __html: body }} />
					: <div>{body}</div>
				}
			</div>
		</article>
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
				date
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
