import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: '64px 0',
		backgroundColor: '#2b2523',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	heading: {
		fontSize: '3rem',
		color: 'grey',
	},
}, { name: 'Footer' });


const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.root}>
			<span className={classes.heading}>Footer</span>
		</footer>
	);
};

export default Footer;
