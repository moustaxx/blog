import React from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

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

	const goBack = () => window.history.back();
	const goHome = () => navigate('/');

	return (
		<Layout>
			<div className={classes.root}>
				<h1 className={classes.heading}>404</h1>
				<span>Page not found</span>
				<code className={classes.path}>{window.location.pathname}</code>
				<div className={classes.buttonsContainer}>
					<button
						className={classes.btn}
						onClick={goBack}
						onKeyDown={goBack}
						type="button"
						children="Go back"
					/>
					<button
						className={classes.btn}
						onClick={goHome}
						onKeyDown={goHome}
						type="button"
						children="Go to homepage"
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Error404;
