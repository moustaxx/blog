import React from 'react';
import { makeStyles } from '@material-ui/styles';
import bg from '../../static/images/daylight-environment-forest.jpg';

const useStyles = makeStyles({
	img: {
		height: 512,
		backgroundImage: `url(${bg})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgText: {
		color: 'white',
		fontSize: '2.8rem',
		fontWeight: 600,
		padding: 24,
	},
}, { name: 'HeaderImg' });

interface IHeaderImgProps {
	title: string;
}

const HeaderImg = ({ title }: IHeaderImgProps) => {
	const classes = useStyles();
	return (
		<div className={classes.img}>
			<span className={classes.imgText}>{title}</span>
		</div>
	);
};

export default HeaderImg;
