import { FluidObject } from 'gatsby-image';

export interface IFrontmatter {
	templateKey: string;
	date?: Date | string;
	title: string;
	tags?: string[];
	featuredImage?: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
}
