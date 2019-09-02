import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'absolute',
		height: 48,
		top: 0,
		backgroundColor: 'black',
	},
	container: {
		height: '100%',
		maxWidth: 1088,
		padding: '0 32px',
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontWeight: 800,
		color: 'white',
	},
	navBar: {
		height: '100%',
		display: 'flex',
	},
	link: {
		textDecoration: 'none',
		textShadow: 'none',
		background: 'none',
	},
	navElement: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		padding: '0 12px',
		'&:hover': {
			color: 'hsl(251, 100%, 76%)',
			transition: '.2s color',
		},
	},
}, { name: 'TopBar' });

const TopBar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Link className={`${classes.link} ${classes.title}`} to="/">Personal Blog</Link>
				<nav className={classes.navBar}>
					<Link className={`${classes.link} ${classes.navElement}`} to="/blog">Blog</Link>
					<Link className={`${classes.link} ${classes.navElement}`} to="/about">About</Link>
				</nav>
			</div>
		</div>
	);
};

export default TopBar;
