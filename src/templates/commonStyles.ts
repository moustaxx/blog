import { makeStyles } from '@material-ui/styles';
import bg from '../../static/images/daylight-environment-forest.jpg';

const useCommonStyles = makeStyles({
	content: {
		maxWidth: 1024,
		margin: '0px auto',
		padding: 32,
	},
	pageTitle: {
		fontSize: '2.5rem',
	},
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
}, { name: 'Page' });

export default useCommonStyles;
