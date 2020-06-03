/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider, createClient } from 'urql';

const client = createClient({
	url: 'https://personal-blogg.herokuapp.com/graphql',
});

export const wrapRootElement = ({ element }) => {
	return (
		<Provider value={client}>
			{element}
		</Provider>
	);
};
