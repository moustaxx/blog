import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';

import './styles.css';
import 'typeface-roboto';
import 'typeface-roboto-slab';
import config from '../../website';
import TopBar from './TopBar';
import Footer from './Footer';

const useStyles = makeStyles({
	root: {
	},
}, { name: 'Layout' });

const Layout: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Helmet title={config.siteTitle}>
				<link rel="icon" type="image/png" sizes="32x32" href={config.siteLogo} />
				<meta name="description" content={config.siteDescription} />
				<meta property="og:url" content={config.siteUrl} />
				<meta property="og:title" content={config.siteTitle} />
				<meta property="og:description" content={config.siteDescription} />
				<meta property="og:type" content="website" />
			</Helmet>
			<TopBar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
