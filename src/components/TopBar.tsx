import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: 48,
		top: 0,
		backgroundColor: 'white',
	},
	container: {
		height: '100%',
		maxWidth: 1156,
		padding: '0 32px',
		margin: '0 auto',
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		fontSize: '1.2rem',
		fontWeight: 800,
		textDecoration: 'none',
		color: 'blueviolet',
	},
}, { name: 'TopBar' });

const TopBar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Link className={classes.title} to="/">Personal Blog</Link>
			</div>
		</div>
	);
};

export default TopBar;
