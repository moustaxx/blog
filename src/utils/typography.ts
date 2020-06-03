import Typography, { VerticalRhythm } from 'typography';
import { IThemeInterface } from './theme';

const createTypography = (theme: IThemeInterface) => {
	return new Typography({
		baseFontSize: '19px',
		baseLineHeight: 1.58,
		headerFontFamily: ['Roboto Slab', 'serif'],
		bodyFontFamily: ['Roboto', 'sans-serif'],
		headerColor: theme.fontColors.header,
		bodyColor: theme.fontColors.body,
		headerWeight: 700,
		bodyWeight: 400,
		boldWeight: 700,
		overrideStyles: ({ rhythm }: VerticalRhythm) => ({
			a: {
				textDecoration: 'none',
			},
			blockquote: {
				fontStyle: 'italic',
				paddingLeft: rhythm(13 / 16),
				marginLeft: 0,
				borderLeft: `${rhythm(3 / 16)} solid ${theme.accentColor}`,
			},
			'blockquote cite:before': {
				content: '"— "',
			},
			'@media only screen and (max-width:480px)': {
				blockquote: {
					marginRight: 0,
					marginLeft: rhythm(-3 / 4),
					paddingLeft: rhythm(9 / 16),
				},
			},
		}),
	});
};

export default createTypography;
