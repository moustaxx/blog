import { FluidObject } from 'gatsby-image';

export interface IStrapiCustomPage {
	data: {
		strapiCustomPages: {
			title: string;
			content: string;
			title_pl?: string;
			content_pl?: string;
		};
	};
}

export interface ICustomPageTemplate {
	title: string;
	body: string;
	title_pl?: string;
	content_pl?: string;
}

export type TStrapiArticle = {
	id: string;
	author: string;
	title: string;
	content: string;
	slug: string;
	created_at: string;
	tags: {
		name: string;
	}[];
	image?: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
	title_pl?: string;
	content_pl?: string;
};

export interface IGetPosts {
	allStrapiArticles: {
		totalCount: string;
		edges: {
			node: TStrapiArticle;
		}[];
	};
}
