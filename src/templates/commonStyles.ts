import { makeStyles } from '@material-ui/styles';
import jumbotron from '../../static/images/jumbotron.jpg';

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
		height: 400,
		backgroundImage: `url(${jumbotron})`,
		backgroundAttachment: 'fixed',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgText: {
		backgroundColor: 'blueviolet',
		color: 'white',
		fontSize: '2.3rem',
		fontWeight: 600,
		padding: 24,
	},
}, { name: 'Page' });

export default useCommonStyles;
