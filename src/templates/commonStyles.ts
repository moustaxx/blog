import { makeStyles } from '@material-ui/styles';

const useCommonStyles = makeStyles({
	content: {
		maxWidth: 1024,
		margin: '0px auto',
		padding: 32,
	},
	pageTitle: {
		fontSize: '2.5rem',
	},
}, { name: 'Page' });

export default useCommonStyles;
