import { FluidObject } from 'gatsby-image';

export interface IFrontmatter {
	templateKey: string;
	date?: string;
	title: string;
	featuredImage?: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
}
