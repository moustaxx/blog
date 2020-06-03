import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { TypographyStyle } from 'react-typography';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import '../styles.css';
import 'typeface-roboto-slab';
import config from '../../website';
import TopBar from './TopBar';
import Footer from './Footer';
import SetThemeContext from '../contexts/SetThemeContext';
import createTypography from '../utils/typography';
import { IThemeInterface, darkTheme, lightTheme } from '../utils/theme';

const isWindowExist = typeof window !== 'undefined';

const Layout: React.FC = ({ children }) => {
	const savedThemeType = (isWindowExist && localStorage.getItem('theme')) || 'light';
	const [theme, changeTheme] = React.useState(savedThemeType === 'dark' ? darkTheme : lightTheme);
	const [themeType, setThemeType] = React.useState(savedThemeType);

	const setNewTheme = () => {
		if (themeType === 'light') {
			changeTheme(darkTheme);
			setThemeType('dark');
			if (isWindowExist) localStorage.setItem('theme', 'dark');
		} else {
			changeTheme(lightTheme);
			setThemeType('light');
			if (isWindowExist) localStorage.setItem('theme', 'light');
		}
	};
	const typography = createTypography(theme);
	const { t } = useTranslation();

	return (
		<ThemeProvider theme={theme}>
			<SetThemeContext.Provider value={setNewTheme}>
				<Helmet title={t('title')}>
					<link rel="icon" type="image/png" sizes="32x32" href={config.siteLogo} />
					<meta name="description" content={config.siteDescription} />
					<meta property="og:url" content={config.siteUrl} />
					<meta property="og:title" content={config.siteTitle} />
					<meta property="og:description" content={config.siteDescription} />
					<meta property="og:type" content="website" />
				</Helmet>
				<TypographyStyle typography={typography} />
				<LayoutCnt>{children}</LayoutCnt>
			</SetThemeContext.Provider>
		</ThemeProvider>
	);
};

const useStyles = makeStyles((theme: IThemeInterface) => ({
	root: {
		backgroundColor: theme.background.primary,
		transition: '.2s background-color',
	},
}), { name: 'Layout' });

const LayoutCnt: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TopBar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
