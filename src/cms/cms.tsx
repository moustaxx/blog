import React from 'react';
import CMS from 'netlify-cms-app';

import PreviewTemplate from './previewTemplate';
// import { IndexTemplate } from '../templates/indexTemplate';
import { PostTemplate } from '../templates/postTemplate';
import { CustomPageTemplate } from '../templates/customPageTemplate';

CMS.registerPreviewTemplate('pages', ({ entry, widgetFor }) => {
	const { title } = entry.getIn(['data']).toJS();
	const body = widgetFor('body');

	return (
		<PreviewTemplate>
			<CustomPageTemplate title={title} body={body} isPreview />
		</PreviewTemplate>
	);
});

CMS.registerPreviewTemplate('blog', ({ entry, widgetFor, getAsset }) => {
	const { title } = entry.getIn(['data']).toJS();
	const body = widgetFor('body');

	const featuredImage = entry.getIn(['data', 'featuredImage']);
	const imageURL = getAsset(featuredImage);

	return (
		<PreviewTemplate>
			<PostTemplate
				title={title}
				body={body}
				imageURL={imageURL}
				isPreview
			/>
		</PreviewTemplate>
	);
});
