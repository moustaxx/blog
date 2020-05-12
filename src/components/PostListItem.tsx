import React from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/styles';
import Img, { FluidObject } from 'gatsby-image';
import { Link } from 'gatsby';

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
}, { name: 'PostListItem' });

interface IPostListItem {
	id: string;
	slug: string;
	title: string;
	date: Date | string;
	imgFluid?: FluidObject;
	content: string;
}

const PostListItem = ({ id, slug, title, date, imgFluid, content }: IPostListItem) => {
	const classes = useStyles();
	return (
		<article className={classes.post} key={id}>
			<h1>
				<Link
					to={slug}
					className={classes.title}
					children={title}
				/>
			</h1>
			<h4 className={classes.date}>{date}</h4>
			{imgFluid && <Img fluid={imgFluid} className={classes.featuredImg} />}
			<ReactMarkdown source={content} />
		</article>
	);
};

export default PostListItem;
