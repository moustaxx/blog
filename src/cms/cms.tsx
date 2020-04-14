import React from 'react';
import CMS from 'netlify-cms-app';

import PreviewTemplate from './previewTemplate';
// import { IndexTemplate } from '../templates/indexTemplate';
import { PostTemplate } from '../templates/postTemplate';
import { CustomPageTemplate } from '../templates/customPageTemplate';

interface IPreviewComponentProps {
	entry: {
		getIn: (name: string[]) => {
			toJS: () => any;
		};
	};
	getAsset: (name: any) => any;
	widgetFor: (name: any) => any;
}

const Pages: React.FC<IPreviewComponentProps> = ({ entry, widgetFor }) => {
	const { title } = entry.getIn(['data']).toJS();
	const body = widgetFor('body');

	return (
		<PreviewTemplate>
			<CustomPageTemplate title={title} body={body} isPreview />
		</PreviewTemplate>
	);
};
CMS.registerPreviewTemplate('pages', Pages as any);


const Blog: React.FC<IPreviewComponentProps> = ({ entry, widgetFor, getAsset }) => {
	const { title, date } = entry.getIn(['data']).toJS();
	const body = widgetFor('body');

	const featuredImage = entry.getIn(['data', 'featuredImage']);
	const imageURL = getAsset(featuredImage);

	return (
		<PreviewTemplate>
			<PostTemplate
				title={title}
				date={date}
				body={body}
				imageURL={imageURL}
				isPreview
			/>
		</PreviewTemplate>
	);
};
CMS.registerPreviewTemplate('blog', Blog as any);
