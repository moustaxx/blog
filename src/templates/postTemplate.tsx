import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql } from 'gatsby';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';
import kebabCase from 'kebab-case';

import Layout from '../components/Layout';
import Comments from '../components/Comments';
import useCommonStyles from './commonStyles';
import { author } from '../../website';
import { IThemeInterface } from '../utils/theme';
import { TStrapiArticle } from '../interfaces';
import { useI18next } from '../utils/useI18next';

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
		fontWeight: 500,
		color: theme.accentColor,
	},
}), { name: 'Post' });

interface IStrapiArticle {
	data: {
		strapiArticles: TStrapiArticle;
	};
}

interface IPostTemplate {
	title: string;
	tags: {
		name: string;
	}[];
	date?: Date | string;
	featuredImgFluid?: FluidObject;
	content: string;
}

export const PostTemplate = ({
	title,
	tags,
	date,
	featuredImgFluid,
	content,
}: IPostTemplate) => {
	const classes = useStyles();
	const commonClasses = useCommonStyles();
	const { t } = useTranslation();

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
				{featuredImgFluid && <Img fluid={featuredImgFluid} className={classes.featuredImg} />}
				<ReactMarkdown source={content} />
				{tags.length && (
					<>
						<h3 className={classes.tagsHeading}>{t('tags')}</h3>
						{tags.map(({ name: tagName }) => (
							<Link
								to={`/tags/${kebabCase(tagName)}/`}
								key={tagName}
								className={classes.tag}
								children={tagName}
							/>
						))}
					</>
				)}
				{typeof window !== 'undefined' && <Comments />}
			</div>
		</article>
	);
};

const PostPage = ({ data }: IStrapiArticle) => {
	const { strapiArticles } = data;
	const fluid = strapiArticles.image && strapiArticles.image.childImageSharp.fluid;
	const { i18n } = useI18next();
	const translatedTitle = i18n.language === 'pl' && strapiArticles.title_pl
		? strapiArticles.title_pl
		: strapiArticles.title;
	const translatedContent = i18n.language === 'pl' && strapiArticles.content_pl
		? strapiArticles.content_pl
		: strapiArticles.content;

	return (
		<Layout>
			<PostTemplate
				title={translatedTitle}
				tags={strapiArticles.tags}
				date={strapiArticles.created_at}
				featuredImgFluid={fluid}
				content={translatedContent}
			/>
		</Layout>

	);
};

export default PostPage;
export const pageQuery = graphql`
	query PostPageQuery($slug: String!) {
		strapiArticles(slug: { eq: $slug }) {
			created_at
			title
			content
			tags {
				name
			}
			image {
				childImageSharp {
					fluid(maxWidth: 800) {
						...GatsbyImageSharpFluid
					}
				}
			}
			title_pl
			content_pl
		}
	}
`;
