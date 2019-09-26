import { makeStyles } from '@material-ui/styles';

const useCommonStyles = makeStyles({
	content: {
		maxWidth: 1024,
		margin: '0px auto',
		padding: '48px 32px',
	},
	pageTitle: {
		fontSize: '2.5rem',
	},
}, { name: 'Page' });

export default useCommonStyles;
