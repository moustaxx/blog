declare module 'netlify-cms-app' {
	import { Element } from 'react';

	interface IPreviewComponentProps {
		entry: {
			getIn: (name: string[]) => {
				toJS: () => any;
			};
		};
		getAsset: (name: any) => any;
		widgetFor: (name: any) => any;
	}
	const CMS = {
		registerPreviewTemplate: (
			name: string,
			component: (props: IPreviewComponentProps) => Element,
		) => {},

		getBackend: () => {},
		getEditorComponents: () => {},
		getMediaLibrary: () => {},
		getPreviewStyles: () => {},
		getPreviewTemplate: () => {},
		getWidget: () => {},
		getWidgetValueSerializer: () => {},
		init: () => {},
		registerBackend: () => {},
		registerEditorComponent: () => {},
		registerMediaLibrary: () => {},
		registerPreviewStyle: () => {},
		registerWidget: () => {},
		registerWidgetValueSerializer: () => {},
		resolveWidget: () => {},
	};
	export default CMS;
}
