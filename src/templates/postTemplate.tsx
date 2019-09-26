import React from 'react';
import { graphql, Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';
import kebabCase from 'kebab-case';

import Layout from '../components/Layout';
import { IFrontmatter } from '../interfaces';
import useCommonStyles from './commonStyles';
import { author } from '../../website';
import { IThemeInterface } from '../utils/theme';

const useStyles = makeStyles((theme: IThemeInterface) => ({
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
	tagsHeading: {
		marginTop: 0,
		marginBottom: 16,
	},
	tag: {
		marginRight: 8,
		color: theme.accentColor,
	},
}), { name: 'Post' });

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
	tags?: string[];
	date?: Date | string;
	featuredImgFluid?: FluidObject;
	imageURL?: string;
	body: string;
	isPreview?: boolean;
}

export const PostTemplate = ({
	title,
	tags,
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
			<div>
				<h1 className={commonClasses.pageTitle}>{title}</h1>
				<div className={classes.meta}>
					<div className={classes.avatar}>{author[0]}</div>
					<div className={classes.metaCnt}>
						<div className={classes.metaAuthor}>{author}</div>
						<div>
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
				{tags && tags.length && (
					<>
						<h3 className={classes.tagsHeading}>Tags</h3>
						{tags.map(tag => (
							<Link to={`/tags/${kebabCase(tag)}/`} key={tag} className={classes.tag}>{tag}</Link>
						))}
					</>
				)}
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
				tags={frontmatter.tags}
				date={frontmatter.date}
				featuredImgFluid={fluid}
				body={html}
			/>
		</Layout>

	);
};

export default PostPage;

export const pageQuery = graphql`
	query PostPageQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				date
				title
				tags
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
