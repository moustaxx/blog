import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from 'urql';
import { IThemeInterface } from '../utils/theme';

const useStyles = makeStyles((theme: IThemeInterface) => ({
	heading: {
		margin: '16px 0',
	},
	firstRow: {
		display: 'flex',
	},
	comment: {
		margin: '8px 0',
	},
	author: {
		marginRight: 8,
		color: theme.accentColor,
		fontWeight: 500,
	},
	date: {
		color: 'grey',
	},
}), { name: 'Comments' });

interface IComment {
	id: string;
	text: string;
	author: string;
	createdDate: Date;
}

interface IRes {
	getComments: IComment[];
}

const getComments = `
	query getComments($postSlug: String!) {
		getComments(where: { postSlug: $postSlug }) {
			id
			text
			author
			createdDate
		}
	}
`;

const Comment = ({ comment }: { comment: IComment }) => {
	const classes = useStyles();
	const date = new Date(comment.createdDate).toLocaleString();

	return (
		<div className={classes.comment}>
			<div>
				<div className={classes.firstRow}>
					<div className={classes.author}>{comment.author}</div>
					<div className={classes.date}>{date}</div>
				</div>
				<div>{comment.text}</div>
			</div>
		</div>
	);
};

const CommentWrapper: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<section id="comments">
			<h3 className={classes.heading}>Comments</h3>
			{children}
		</section>
	);
};

const Comments = () => {
	const postSlug = window.location.pathname.split('/')[2];
	const [{ data, error, fetching }] = useQuery<IRes>({
		query: getComments,
		variables: { postSlug },
	});

	if (fetching) {
		return <CommentWrapper>Loading...</CommentWrapper>;
	}
	if (error) {
		return <CommentWrapper>Error: {error.message}</CommentWrapper>;
	}
	if (!data || !data.getComments.length) {
		return <CommentWrapper>Nothing to show...</CommentWrapper>;
	}

	return (
		<CommentWrapper>
			{data.getComments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</CommentWrapper>
	);
};

export default Comments;
