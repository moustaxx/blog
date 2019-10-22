import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from 'urql';
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
	input: {
		width: '100%',
		margin: '4px 0',
		padding: 8,
		border: 0,
		borderRadius: 4,
		color: 'inherit',
		background: theme.background.textBox,
	},
	warn: {
		padding: '0 8px',
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

const GET_COMMENTS = `
	query getComments($postSlug: String!) {
		getComments(where: { postSlug: $postSlug }) {
			id
			text
			author
			createdDate
		}
	}
`;

const ADD_COMMENT = `
	mutation addComment($text: String!, $postSlug: String!, $author: String!) {
		addComment(text: $text, postSlug: $postSlug, author: $author) {
			id
			text
			author
			postSlug
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
			<AddComment />
		</section>
	);
};

const AddComment = () => {
	const classes = useStyles();
	const [{ error }, executeMutation] = useMutation<IComment>(ADD_COMMENT);

	const postSlug = window.location.pathname.split('/')[2];

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { currentTarget: target } = event;
		const author = target.author.value;
		const text = target.text.value;
		executeMutation({ author, text, postSlug });
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3 className={classes.heading}>Add comment</h3>
			<input
				placeholder="Your nick"
				type="text"
				name="author"
				className={classes.input}
			/>
			<textarea
				placeholder="Enter comment here..."
				name="text"
				className={classes.input}
			/>
			<button type="submit">Submit</button>
			{error && <span className={classes.warn}>Error: {error.message}</span>}
		</form>
	);
};

const Comments = () => {
	const postSlug = window.location.pathname.split('/')[2];
	const [{ data, error, fetching }] = useQuery<IRes>({
		query: GET_COMMENTS,
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
