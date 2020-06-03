/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { Namespace, useTranslation, UseTranslationOptions } from 'react-i18next';
import { useContext } from 'react';
import { navigate as gatsbyNavigate } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavigateOptions } from '@reach/router';
import { I18nextContext } from 'gatsby-plugin-react-i18next/dist/i18nextContext';
import { LANGUAGE_KEY } from 'gatsby-plugin-react-i18next/dist/types';

declare let __BASE_PATH__: string | undefined;
declare let __PATH_PREFIX__: string | undefined;

export const useI18next = (ns?: Namespace, options?: UseTranslationOptions) => {
	const { i18n, t, ready } = useTranslation(ns, options);
	const context = useContext(I18nextContext);

	const { routed, defaultLanguage } = context;

	const getUrlLanguage = (language: string) => {
		return language !== defaultLanguage ? language : '';
	};

	const removePrefix = (pathname: string) => {
		let pathname2 = pathname;
		const base = typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : __PATH_PREFIX__;
		if (base && pathname.indexOf(base) === 0) {
			pathname2 = pathname.slice(base.length);
		}
		return pathname2;
	};

	const removeLocalePart = (pathname: string) => {
		if (!routed) return pathname;
		const i = pathname.indexOf('/', 1);
		return pathname.substring(i);
	};

	const navigate = (to: string, options2?: NavigateOptions<{}>) => {
		const urlLanguage = getUrlLanguage(context.language);
		const link = routed ? `/${urlLanguage}${to}` : `${to}`;
		return gatsbyNavigate(link, options2);
	};

	const changeLanguage = (language: string, to?: string, options2?: NavigateOptions<{}>) => {
		// const urlLanguage = getUrlLanguage(language);
		const pathname = to || removeLocalePart(removePrefix(window.location.pathname));
		const link = `/${language}${pathname}${window.location.search}`;
		localStorage.setItem(LANGUAGE_KEY, language);
		return gatsbyNavigate(link, options2);
	};

	return {
		...context,
		i18n,
		t,
		ready,
		navigate,
		changeLanguage,
	};
};
