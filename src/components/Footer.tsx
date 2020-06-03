import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import config from '../../website';
import { IThemeInterface } from '../utils/theme';

const useStyles = makeStyles((theme: IThemeInterface) => ({
	root: {
		width: '100%',
		padding: '32px 0',
		backgroundColor: theme.background.topBarAndFooter,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		color: 'grey',
	},
	link: {
		margin: '0 4px',
		background: 'none',
		textShadow: 'none',
		textDecoration: 'none',
		color: 'crimson',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}), { name: 'Footer' });


const Footer = () => {
	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<footer className={classes.root}>
			<div>
				<span>{t('footer')}</span>
				<a href={config.gitAccount} className={classes.link}>moustaxx</a>
			</div>
			<div>
				<span>{t('checkMyOtherProject')}</span>
				<a href={config.maChatLink} className={classes.link}>MaChat</a>
			</div>
		</footer>
	);
};

export default Footer;
