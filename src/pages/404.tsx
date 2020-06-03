import React from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '../components/Layout';

const useStyles = makeStyles({
	root: {
		height: '95vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		fontSize: '8rem',
	},
	path: {
		margin: '8px 0',
	},
	buttonsContainer: {
		display: 'inline',
		marginTop: 8,
	},
	btn: {
		padding: 8,
		margin: '0 2px',
	},
}, { name: '404' });

const Error404 = () => {
	const classes = useStyles();
	const { t } = useTranslation();

	if (typeof window !== 'undefined') {
		const goBack = () => window.history.back();
		const goHome = () => navigate('/');

		return (
			<Layout>
				<div className={classes.root}>
					<h1 className={classes.heading}>404</h1>
					<span>{t('pageNotFound')}</span>
					<code className={classes.path}>{window.location.pathname}</code>
					<div className={classes.buttonsContainer}>
						<button
							className={classes.btn}
							onClick={goBack}
							onKeyDown={goBack}
							aria-label={t('goBackToRecentPage')}
							type="button"
							children={t('goBack')}
						/>
						<button
							className={classes.btn}
							onClick={goHome}
							onKeyDown={goHome}
							aria-label={t('goToHomePage')}
							type="button"
							children={t('goToHomePage')}
						/>
					</div>
				</div>
			</Layout>
		);
	}
	return null;
};

export default Error404;
