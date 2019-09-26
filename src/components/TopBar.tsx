import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

import { BulbIcon } from './Icons';
import { IThemeInterface } from '../utils/theme';
import SetThemeContext from '../contexts/SetThemeContext';

const useStyles = makeStyles((theme: IThemeInterface) => ({
	root: {
		width: '100%',
		height: 48,
		top: 0,
		backgroundColor: theme.background.topBarAndFooter,
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
		userSelect: 'none',
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
		transitionDuration: '.4s',
		transitionProperty: 'color,fill',
		userSelect: 'none',
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		fill: 'white',
		'&:hover': {
			color: theme.accentColor,
			fill: theme.accentColor,
			'& > svg': {
				fill: 'inherit',
			},
		},
	},
	icon: {
		width: '1.3rem',
		height: '100%',
	},
}), { name: 'TopBar' });

const TopBar = () => {
	const classes = useStyles();
	const changeTheme = React.useContext(SetThemeContext);
	const linkClass = `${classes.link} ${classes.navElement}`;

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Link className={`${classes.link} ${classes.title}`} to="/">Personal Blog</Link>
				<nav className={classes.navBar}>
					<button
						className={`${classes.link} ${classes.navElement}`}
						onClick={changeTheme}
						type="button"
					>
						<BulbIcon className={classes.icon} />
					</button>
					<Link className={linkClass} to="/blog">Blog</Link>
					<Link className={linkClass} to="/about">About</Link>
				</nav>
			</div>
		</div>
	);
};

export default TopBar;
