import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { makeStyles } from '@material-ui/styles';

import { BulbIcon } from './Icons';
import { useI18next } from '../utils/useI18next';
import { IThemeInterface } from '../utils/theme';
import SetThemeContext from '../contexts/SetThemeContext';

const useStyles = makeStyles((theme: IThemeInterface) => ({
	root: {
		width: '100%',
		padding: '12px 0',
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
		alignItems: 'center',
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
		background: 'inherit',
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
	localesDiv: {
		padding: '0 12px',
	},
	localeBtn: {
		color: 'white',
		background: 'inherit',
		transitionDuration: '.4s',
		transitionProperty: 'color',
		font: 'inherit',
		border: 0,
		padding: 0,
		outline: 0,
		margin: 0,
		'&:hover': {
			color: theme.accentColor,
		},
	},
}), { name: 'TopBar' });

const TopBar = () => {
	const classes = useStyles();
	const changeTheme = React.useContext(SetThemeContext);
	const linkClass = `${classes.link} ${classes.navElement}`;
	const { t } = useTranslation();
	const { changeLanguage } = useI18next();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Link className={`${classes.link} ${classes.title}`} to="/">{t('title')}</Link>
				<nav className={classes.navBar}>
					<button
						className={`${classes.link} ${classes.navElement}`}
						onClick={changeTheme}
						type="button"
					>
						<BulbIcon className={classes.icon} />
					</button>
					<Link className={linkClass} to="/blog">{t('blog')}</Link>
					<Link className={linkClass} to="/about">{t('about')}</Link>
					<div className={classes.localesDiv}>
						<button
							onClick={() => changeLanguage('en')}
							className={classes.localeBtn}
							type="button"
						>EN
						</button>
						<span style={{ color: 'white' }}>/</span>
						<button
							onClick={() => changeLanguage('pl')}
							className={classes.localeBtn}
							type="button"
						>PL
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default TopBar;
