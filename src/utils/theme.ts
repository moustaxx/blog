export interface IThemeInterface {
	themeType: 'light' | 'dark';
	background: {
		primary: string;
		secondary: string;
		topBarAndFooter: string;
		textBox: string;
	};
	fontColors: {
		header: string;
		body: string;
	};
	accentColor: string;
}

export const darkTheme: IThemeInterface = {
	themeType: 'dark',
	background: {
		primary: 'hsl(228, 12%, 14%)',
		secondary: 'hsl(228, 12%, 14%)',
		topBarAndFooter: 'hsl(228, 10%, 10%)',
		textBox: 'hsla(0, 0%, 100%, 0.05)',
	},
	fontColors: {
		header: 'hsla(36, 16%, 94%, 0.9)',
		body: 'hsla(36, 16%, 94%, 0.73)',
	},
	accentColor: 'crimson',
};

export const lightTheme: IThemeInterface = {
	themeType: 'light',
	background: {
		primary: 'hsl(0, 0%, 100%)',
		secondary: 'hsl(210, 19%, 88%)',
		topBarAndFooter: 'hsl(228, 10%, 10%)',
		textBox: 'hsla(0, 0%, 0%, 0.05)',
	},
	fontColors: {
		header: 'hsla(0,0%,0%,0.9)',
		body: 'hsla(0,0%,0%,0.73)',
	},
	accentColor: 'crimson',
};
