/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { Provider, createClient } = require('urql');

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
