import React from 'react';
import { makeStyles } from '@material-ui/styles';
import config from '../../website';

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: '32px 0',
		backgroundColor: 'black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
}, { name: 'Footer' });


const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.root}>
			<div>Created by</div>
			<a href={config.gitAccount} className={classes.link}>moustaxx</a>
		</footer>
	);
};

export default Footer;
