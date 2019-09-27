import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { create, Jss } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/styles';

import { lightTheme } from '../utils/theme';
import createTypography from '../utils/typography';

const typography = createTypography(lightTheme);

const PreviewTemplate: React.FC = ({ children }) => {
	const ref = React.useRef<null | HTMLDivElement>(null);
	const [state, setState] = React.useState<{
		ready: boolean;
		jss?: Jss;
		sheetsManager?: Map<any, any>;
	}>({
		ready: false,
		jss: undefined,
		sheetsManager: undefined,
	});

	React.useEffect(() => {
		const ownerDocument = ref.current && ref.current.ownerDocument;
		const insertionPoint = (ownerDocument && ownerDocument.getElementById('demo-frame-jss')) || undefined;

		setState({
			ready: true,
			jss: create({
				...jssPreset(),
				insertionPoint,
			}),
			sheetsManager: new Map(),
		});
	}, [/* only on mount */]);

	return (
		<>
			<div id="demo-frame-jss" ref={ref} />
			{state.ready && (
				<StylesProvider jss={state.jss} sheetsManager={state.sheetsManager}>
					<style id="typography.js">{typography.toString()}</style>
					{children}
				</StylesProvider>
			)}
		</>
	);
};

export default PreviewTemplate;
