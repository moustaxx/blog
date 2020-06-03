import React from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { DateTime } from 'luxon';

const useStyles = makeStyles({
	post: {
		margin: '32px 0',
	},
	title: {
		color: 'inherit',
		background: 'none',
	},
	date: {
		margin: 0,
		paddingBottom: 8,
	},
	featuredImg: {
		margin: '16px 0',
	},
	content: {
		'& > p': {
			marginBottom: '.6em',
		},
	},
	link: {
		background: 'none',
		textShadow: 'none',
		textDecoration: 'underline',
		color: 'crimson',
	},
}, { name: 'PostListItem' });

interface IPostListItem {
	id: string;
	slug: string;
	title: string;
	date: string;
	imgFluid?: FluidObject;
	content: string;
}

const sliceText = (text: string) => {
	const paragraphs = text.split('\n');
	if (text.length > 700) return `${paragraphs[0].slice(0, 700)}...`;
	if (paragraphs.length > 1) return `${paragraphs[0]}...`;
	return text;
};

const PostListItem = ({ id, slug, title, date, imgFluid, content }: IPostListItem) => {
	const classes = useStyles();
	const { i18n, t } = useTranslation();

	const baseDate = DateTime.fromISO(date).setLocale(i18n.language);
	const parsedDate = baseDate.toLocaleString(DateTime.DATE_MED);
	const dateRelative = baseDate.toRelative();
	const dateTime = baseDate.toLocaleString(DateTime.DATETIME_MED);

	return (
		<article className={classes.post} key={id}>
			<h1>
				<Link
					to={`/${slug}`}
					className={classes.title}
					children={title}
				/>
			</h1>
			<h4
				className={classes.date}
				title={dateTime}
				children={`${parsedDate}, ${dateRelative}`}
			/>
			<Link
				to={`/${slug}`}
				className={classes.title}
			>
				{imgFluid && <Img fluid={imgFluid} className={classes.featuredImg} />}
			</Link>
			<ReactMarkdown className={classes.content} source={sliceText(content)} />
			<Link
				to={`/${slug}`}
				className={classes.link}
				children={t('showMore')}
			/>
		</article>
	);
};

export default PostListItem;
